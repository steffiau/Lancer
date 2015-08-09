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
		min: new Date(),
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

