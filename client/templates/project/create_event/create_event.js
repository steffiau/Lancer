newEventSchema = new SimpleSchema({
 choose: {
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

AutoForm.addHooks('newEventForm') {
  onSubmit: function (doc){
    this.event.preventDefault();
    console.log(doc)
    var project = Project.findOne({_id: Session.get("projectId")});

  }
}
