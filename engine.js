// Info needed 
// project_name,
// project_description,
// project_start_date, 
// project_due_date,
// client_id,
// contract_amount,
// {milestone_date, milestone_invoice?, invoice_precentage}
//SEED DATA
 project_name= "Lancer";
 project_description = "Project Mangement for freelancers";
 project_start_date = "2015-08-06";
 project_due_date = "2015-08-17";
 client_id = "dkgdfg243t48fer8";
 contract_amount = 600
 milestones = [ 
 {milestone_date : "2015-08-09", milestone_invoice: true, invoice_percentage: 0.5},
 {milestone_date : "2015-08-13", milestone_invoice: false },
 {milestone_date : "2015-08-15", milestone_invoice: true}
 
 ];

 // ============= Seed Data Finish Here

 //Initiate Project Object
 var Project = {name: project_name,
 								description: project_description,
 								start_date: project_start_date,
 								due_date: project_due_date,
 								createdAt: new Date(),
 								project_finished: false,
 								client_id: client_id,
 								owner_id: '123',
 								contract_amount: contract_amount,
 								events: [],
 								milestones: [],
 								invoices: []}

processMilestone(milestones); // This is DESIGNED to run after iproject is initiated.


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

	console.log(amount_sum);
	if (amount_sum !== 1 && empty_count == 0){
		console.log("Sum of percentage < 1 and you didn't leave any field empty..., Aborted, Try again .");
		return false;
	} else if (amount_sum !== 1){
	var default_pct = (1 - amount_sum) / empty_count;
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
	Project.invoices = (invoices); // Display all invoices generated
	Project.events = (events); // Display all invoices generated
	Project.milestones = (milestones); // Display all invoices generated
	console.log(Project);
};

function newMilestone(date, index){
	var title = "Milestone" + (index + 1);
return{
	title: title,
	requirement:[],
	completed:false,
	comments:[],
	due_date:date,
};
};

function newMeeting(date, index){
 var title = "Event" + (index + 1);
 return{
		title: title,
		notes: '',
		location:'',
		date_time:date,
		completed:false
		 }
};


function newInvoice(date,pct_amount,total_amount){
	var amount = pct_amount * total_amount;
	amount = amount.toPrecision(3);
	var invoice_no = date;
	return { amount: amount,
		date: date,
		invoice_no: invoice_no,
		paid: false
	};
};
