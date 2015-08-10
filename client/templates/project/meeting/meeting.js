
Template.singleEvent.helpers({
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
Template.singleEvent.events({
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
    var title = document.getElementById("single-event-title").innerHTML
    var location = document.getElementById("single-event-location").innerHTML
    var date = document.getElementById("single-event-date").innerHTML
    var notes = document.getElementById("single-event-notes").innerHTML
    var eventAttributes = {
      title: title,
      location: location,
      date: date,
      notes: notes 
    }   
  }
})
// helpers required for all changes to events page being reflected in the database


