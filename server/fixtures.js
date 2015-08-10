if (Projects.find().count() === 0) {

  client = Clients.insert ({
    name: "Steffi Au",
    company: "Steffo Inc.",
    phone: "514-244-0001",
    email: "steffi@gamil.com",
    skype: "@steffi",
    notes: "This customer is not happy with their last logo"
  })

  Projects.insert ({
    client_id: client._id,
    name: "Steffo Logo Design",
    description: "A logo nice ",
    start_date: "2015-09-01",
    due_date: "2015-09-30",
    createdAt: "2015-08-30",
    finished: false,
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
        amount: 700.00,
        completed: false
      },

      {
        date:"2015-09-30",
        type: "invoice",
        invoice_number: "20150930",
        amount: 700.00,
        completed: false
      },
    ]
  })
}

