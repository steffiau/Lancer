
// This schema is used to validate new_project forms data and we could consider move it somewhere else in the future.

newProjectSchema = new SimpleSchema({
	project_name: {
		type:String
	},
	project_description:{
		type:String,
		min:20,
		max:1000,
		autoform:{
			rows:5
		}
	},
	project_start_date:{
		type:Date,
		optional:false,
		label:"Project Start Date",
		min: moment().subtract(1,'d').toDate(),
		autoform:{
			value: new Date()
		}
	},
	project_due_date:{
		type:Date,
		optional:false,
		label:"Project Due Date",
		min: new Date(),
	},
	client_id:{
		type:String,   // This definitely needs to be changed when we have client side of things done.
		autoform:{
			placeholder:"Client_id here, need to work on this "	
		}
	},
	contract_amount:{
		type:Number,
		min:1,
		decimal:true,
		autoform:{
			placeholder:"$$$"
		}
	},
	milestones:{
		type: Array,
		optional: true
	},
	'milestones.$':{
		type:Object
	},
	'milestones.$.milestone_date':{
		type: Date,
		optional: false,
		label: "Milestone due date",
		min: new Date()
	},
	'milestones.$.milestone_invoice':{
		type: Boolean,
		defaultValue: true,
		label: "Invoice?"
	},
	'milestones.$.invoice_percentage':{
		type:Number,
		optional:true,
		decimal: true,
		label: "Invoice Percentage in terms of % (Ex. 50 as 50%)",
		autoform:{
		placeholder:"Leave this field empty and we will calculate a percentage for you by milestone."
		}
	},
});

AutoForm.addHooks('newProjectForm', {
	onSubmit: function(doc){
		this.event.preventDefault();
		//var error = new Error("aaaaaaa");
		//console.log(error);		// How to throw error
		if (project = scafold(doc)){
			// if scafold success, write to db
			Projects.insert(project, function(err,id){
				// once inserted, now populate google calenar
				if (id) {
					var events = Projects.findOne({_id: id}).events;
					events.forEach(function(eventObj){
						// iterating each event here
						// Google Calendar Here
						var start_time = moment(eventObj.date).add(1,'d');
						var end_time = moment(eventObj.date).add(12,'h');
						if (eventObj.type == "meeting"){
							var title = eventObj.title;
							var location = eventObj.location;
							var description = eventObj.title; 
						} else if (eventObj.type == "invoice"){
							var title = eventObj.title;
							var location = "Home";
							var description = eventObj.title; 
						} else if (eventObj.type == "milestone"){
							var title = eventObj.title;
							var location = "Home";
							var description = eventObj.title; 
						}
						writeToGoogleCalendar(start_time, end_time,title,title,location);
					});
				};
			});	
		}else{
			var error = new Error("Scafold failed, please check data");
			alert("Failed");
			return false;
		};
	}		
});


function writeToGoogleCalendar(start_time, end_time,summary, description, location){
	var data = {
		"end": {
			"dateTime": start_time.toISOString(),
		},
		"start": {
			"dateTime": end_time.toISOString(),
		},
		"summary": summary,
		"description":description,
		"location":location}
	console.log(data)
		GoogleApi.post('calendar/v3/calendars/primary/events?key=AIzaSyDyFVciOLzGriMnI8UTicaHzx-KseU6JBY',{
			data: data});
	console.log('google request sent');
}


var scafold = function(doc){

	//Initiate Project Object
	var Project = {name: doc.project_name,
		description: doc.project_description,
		start_date: doc.project_start_date,
		due_date: doc.project_due_date,
		createdAt: new Date(),
		project_finished: false,
		client_id: doc.client_id,
		owner_id: '123',
		contract_amount: doc.contract_amount,
		events: []}

	 if (processMilestone(doc.milestones) == false) {
		 return false
	 } else{
		 return Project
	 };
	
//========================================================
//=======Under this are my helper methods================
	function processMilestone(argv){
		//takes an js object as input
		var events = [],
		milestones = [],
		invoices = [];
		var amount_sum = 0; // This Variable is used to check if user amount in equal to 100%
		var empty_count = 0;
		argv.forEach(function(milestone){
			if (milestone.milestone_invoice == true && !isNaN(milestone.invoice_percentage)){ amount_sum += milestone.invoice_percentage;
			} else if (milestone.milestone_invoice == true && isNaN(milestone.invoice_percentage)) {
				// When user do not specify percentage	
				empty_count ++;
			};
		});
		if (amount_sum !== 100 && empty_count == 0){
			alert("Sum of percentage < 100% and you didn't leave any field empty..., Aborted, Try again .");
			return false;
		} else if (amount_sum !== 100){
			var default_pct = (100 - amount_sum) / empty_count;
		};
		for( var i = 0; i < argv.length; i ++ ){
			// Handle invoice here
			if (argv[i].milestone_invoice == true){
				if (typeof argv[i].invoice_percentage == "undefined"){
					var invoice_percentage = default_pct // Need to implement calcualtion here
				} else {
					var invoice_percentage = argv[i].invoice_percentage;	
				};
				invoices.push(newInvoice(argv[i].milestone_date,invoice_percentage, Project.contract_amount)); // Generate invoice object and push to array
			};
			// Handle meetings and milestones here
			events.push(newMeeting(argv[i].milestone_date - 2, i));
			milestones.push(newMilestone(argv[i].milestone_date, i));

		};
		var events_array = invoices.concat(events.concat(milestones));
		Project.events = events_array; // Display all invoices generated
		console.log(Project);
	};

	function newMilestone(date, index){
		var title = "Milestone" + (index + 1);
		
		return{
			title: title,
			type:'milestone',
			requirement:[],
			completed:false,
			comments:[],
			date:date,
		};

	};

	function newMeeting(date, index){
		var title = "Event" + (index + 1);
		return{
			title: title,
			type:'meeting',
			notes: '',
			location:'',
			date:moment(date).subtract(2,'d').toDate(),
			completed:false
		}
	};

	function newInvoice(date,pct_amount,total_amount){
		var amount = pct_amount * total_amount / 100;
		amount = amount.toPrecision(3);
		var invoice_no = date;
		return { amount: Number(amount),
			date: date,
			title:'Invoice',
			invoice_no: invoice_no,
			type:'invoice',
			completed: false
		};
	};

}
