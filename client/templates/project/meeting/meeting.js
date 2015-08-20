Template.meeting.onRendered(function() {
  this.$('.datetimepickerMeeting').datetimepicker({
    format: "MMM/DD/YYYY",
    viewMode: "days",
    defaultDate: new Date (currentProject().events[Session.get("event_index")].date)
  });

  $(".datetimepickerMeeting").on("dp.change", function(e){
   var selectedDate = $("#meetingDateInput").val();
   var index = Session.get("event_index")
   var date = moment(selectedDate).format("MMM Do, YYYY");
   var isoDate = moment(selectedDate).format();
   var obj = {}
   var dateMod = 'events.' + index + '.date';
   obj[dateMod] = isoDate
   Projects.update({_id: Session.get("projectId")},{$set: obj}) 
 });  
});

Template.meeting.helpers({
  singleEvent: function(){
    var project = Projects.findOne({_id: Session.get("projectId")});
    return project.events[Session.get("event_index")]
  },
  dateFormat: function(){

    return moment(this.date).format("MMM Do, YYYY")
  }
});

Template.meeting.events({
  // "click .event-completed button": function(e){
  //   var project = Projects.findOne({_id: Session.get("projectId")});
  //   var projectId = Session.get("projectId")
  //   var events = project.events;
  //   var object = {};
  //   var index = Session.get("event_index");
  //   var completedMod = 'events.' + index + '.completed';

  //   if(events[Session.get("event_index")].completed){
  //     object[completedMod] = false
  //     Projects.update({_id: projectId}, {$set: object})
  //   } else {
  //     object[completedMod] = true
  //      Projects.update({_id: projectId}, {$set:  object})
  //   }
  // },
  "blur .single-event-details li": function(e){
    // variables below grab changes to the event-details by the user
    // these are meant to be sent to mongo to update on server-side

    var title = $("#single-event-title").text();
    var location = $("#single-event-location").text();
    // var date = $("#single-event-date").text();
    var notes = $("#single-event-notes").text();
    var index = Session.get("event_index");

    var obj = {};
    var titleMod = 'events.' + index + '.title';
    // var dateMod = 'events.' + index + '.date';
    var notesMod = 'events.' + index + '.notes';
    var locationMod = 'events.' + index + '.location';

    obj[titleMod] = title;
    // obj[dateMod] = date;
    obj[notesMod] = notes;
    obj[locationMod] = location;
    Projects.update({_id: Session.get("projectId")},{$set: obj });
  }
});

// helpers required for all changes to events page being reflected in the database


