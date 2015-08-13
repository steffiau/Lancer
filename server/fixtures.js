if (Projects.find().count() === 0 && Meteor.users.find().count() === 1) {

  user = Meteor.users.findOne();

  steffi = Clients.insert ({
    owner_id: user._id,
    name: "Steffi Au",
    company: "Steffo Inc.",
    phone: "514-244-0001",
    email: "steffi@gamil.com",
    skype: "@steffi",
    notes: "This customer is not happy with their last logo"
  })

  don = Clients.insert ({
    owner_id: user._id,
    name: "Don Burks",
    company: "Dong Inc.",
    phone: "250-888-2222",
    email: "don@gamil.com",
    skype: "@don",
    notes: "You have way bigger problems than this"
  })

  Projects.insert ({
    owner_id: user._id,
    client_id: steffi,
    name: "Steffo Logo Design",
    description: "A logo nice ",
    start_date: "2015-09-01",
    due_date: "2015-09-30",
    createdAt: "2015-08-30",
    project_finished: false,
    events: [
      {
        title: "Inital Meeting",
        location: "Lighthouse Labs - 128 W Hastings",
        date: "2015-09-02 12:30:00",
        notes: "Cusomter was not happy",
        completed: false,
        type: "meeting"
      },

      {
        title: "Coffee Touch Base",
        location: "Lighthouse Labs - 128 W Hastings",
        date: "2015-09-16 14:30:00",
        notes: "This meeting is to go over the mockups.",
        completed: false,
        type: "meeting"
      },

      {
        title: "Logo Delivery Meeting",
        location: "Lighthouse Labs - 128 W Hastings",
        date: "2015-09-29 15:30:00",
        notes: "This meeting is to go over the mockups.",
        completed: false,
        type: "meeting"
      },
      {
        title: "Logo Mockup",
        type: "milestone",
        date: "2015-09-17",
        completed:false,
        requirements:[
          {
            name:"Pen and Paper Sketchs",
            completed:false
          },

          {
            name:"Photoshop Renders",
            completed:false
          }
        ],
        comments: [
          {
            user_name:"Wesley",
            text: "You better not screw this up <3"
          },

          {
            user_name:"Tom",
            text: "Make the customer happy! :)"
          }
        ]
      },
      {
        title: "Logo Development",
        type: "milestone",
        date: "2015-09-28",
        completed:false,
        requirements:[
          {
            name: "Create Vector File",
            completed:false
          },

          {
            name: "Create Logo Branding Guide",
            completed:false
          }
        ],
        comments: [
          {
            user_name: "Siv",
            text: "FYI: My favourite color is aqua ;)"
          },

          {
            user_name: "Tom",
            text: "Remember: Make the customer happy :)"
          }
        ]
      },
      {
        date:"2015-09-18",
        type: "invoice",
        invoice_number: "20150918",
        completed: false,
        items: [
          {
            service: "Logo Mockup",
            description: "",
            qty: 1,
            price: 700
          }
        ]
      },

      {
        date:"2015-09-30",
        type: "invoice",
        invoice_number: "20150930",
        completed: false,
        items: [
          {
            service: "Logo Development",
            description: "",
            qty: 1,
            price: 700
          }
        ]
      },
    ]
  });

  Projects.insert({
  	name : "Lancer",
  	description : "Project Management app for freelancers",
  	start_date : "2015-08-10",
  	due_date : "2015-08-20",
  	createdAt : "2015-08-10",
    project_finished : false,
  	client_id : don,
  	owner_id: user._id,
  	contract_amount : 900,
  	events : [
    	{
    		date : "2015-08-14",
    		invoice_no : "20150814",
    		type : "invoice",
    		completed : false,
        items: [
          {
            service: "Initial Planning",
            description: "",
            qty: 1,
            price: 300
          }
        ]
    	},
    	{
    		date : "2015-08-17",
    		invoice_no : "20150817",
    		type : "invoice",
    		completed : false,
        items: [
          {
            service: "Software Development",
            description: "",
            qty: 1,
            price: 300
          }
        ]
    	},
    	{
    		date : "2015-08-20",
    		invoice_no : "20150820",
    		type : "invoice",
    		completed : false,
        items: [
          {
            service: "Deployment",
            description: "",
            qty: 1,
            price: 300
          }
        ]
    	},
    	{
    		title : "Event1",
    		type : "meeting",
    		notes : "",
    		location : "",
    		date : "2015-08-11",
    		completed : false
    	},
    	{
    		title : "Event2",
    		type : "meeting",
    		notes : "",
    		location : "",
    		date : "2015-08-14",
    		completed : false
    	},
    	{
    		title : "Event3",
    		type : "meeting",
    		notes : "",
    		location : "",
    		date : "2015-08-17",
    		completed : false
    	},
    	{
    		title : "Milestone1",
    		type : "milestone",
    		requirement : [ ],
    		completed : false,
    		comments : [ ],
    		date : "2015-08-14"
    	},
    	{
    		title : "Milestone2",
    		type : "milestone",
    		requirement : [ ],
    		completed : false,
    		comments : [ ],
    		date : "2015-08-17T00:00:00Z"
    	},
    	{
    		title : "Milestone3",
    		type : "milestone",
    		requirement : [ ],
    		completed : false,
    		comments : [ ],
    		date : "2015-08-20T00:00:00Z"
    	}
  	]
  });
}
