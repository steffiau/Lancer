
Template.meeting.helpers({
  events: function(){
    return Projects.findOne().events
  },

   // targets a single event in the array
  singleEvent: function(){
    var events = Projects.findOne().events
    return events[0]
  }

});


// singleEvent event helpers
Template.meeting.events({
  "click .event-completed button": function(e){

    var project = Projects.findOne()
    var projectId = project._id
    var events = project.events
    console.log("before change completed is", events[0].completed);
    if(events[0].completed){

      Projects.update({_id: projectId}, {$set:  {'events.0.completed': false }})
    } else {
       Projects.update({_id: projectId}, {$set:  {'events.0.completed': true }})
    }
    //   Session.set("eventCompleted", !event.target.checked)
    var project = Projects.findOne()
    var projectId = project._id
    var events = project.events
    console.log("after change completed: ", events[0].completed)
  },
  "blur .single-event-details li": function(e){
    
    var currentProject = Projects.findOne()._id
    // variables below grab changes to the event-details by the user
    // these are meant to be sent to mongo to update on server-side

    var title = document.getElementById("single-event-title").innerText
    var location = document.getElementById("single-event-location").innerText
    var date = document.getElementById("single-event-date").innerText
    var notes = document.getElementById("single-event-notes").innerText
    Projects.update({_id: currentProject},{$set: {
      'events.0.title': title,
      'events.0.location': location,
      'events.0.date': date,
      'events.0.notes': notes
    }})

  }
})
// helpers required for all changes to events page being reflected in the database


