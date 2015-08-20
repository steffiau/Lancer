newEventSchema = new SimpleSchema({
 type: {
    type: String,
    allowedValues: [
       "Meeting",
       "Invoice",
       "Milestone"
    ],
    optional: false,
    label: "Choose an Event Type"
 },
 due_date:{
    type:Date,
    optional:false,
    label:"When should this happen by?",
    min: new Date(),
  }
});

AutoForm.addHooks('newEventForm', {
  onSubmit: function (doc){
    this.event.preventDefault();
    doc.due_date = moment(doc.due_date).format();
    var newEvent = makeEvent(doc);
    Projects.update(
      {_id: Session.get("projectId")},
      {$push: { events: newEvent}}
    );
  }
});

var makeEvent = function(doc){
  var newEvent = {};
  if (doc.type === "Meeting") {
    newEvent = {
      title: "New Meeting",
      location: "",
      date: moment(doc.due_date).format(),
      notes: "",
      completed: false,
      type: "meeting"
    };
  }
  if (doc.type === "Milestone") {
    newEvent = {
      title: "New Milestone",
      type: "milestone",
      date: moment(doc.due_date).format(),
      completed:false,
      requirements:[],
    };
  }
  if (doc.type === "Invoice") {
    newEvent = {
      date: moment(doc.due_date).format("YYYY-MM-DD"),
      type: "invoice",
      invoice_no: moment(doc.due_date).format("YYYYMMDD") + "-" + Session.get("projectId").slice(-4).toUpperCase(),
      completed: false,
      items: [
        {
          service: "Service Title",
          description: "Description Service",
          qty: 0,
          price: 0.00
        }
      ]
    }
  }
  return newEvent;
}
