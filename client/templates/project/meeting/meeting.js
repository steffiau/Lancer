
Template.meeting.helpers({
  singleEvent: function(){
    var project = Projects.findOne({_id: Session.get("projectId")});
    return project.events[Session.get("event_index")]
  }
});

Template.meeting.events({
  "click .event-completed button": function(e){
    var project = Projects.findOne()
    var projectId = project._id
    var events = project.events
    if(events[Session.get("event_index")].completed){
      Projects.update({_id: projectId}, {$set:  {'events.0.completed': false }})
    } else {
       Projects.update({_id: projectId}, {$set:  {'events.0.completed': true }})
    }
    //   Session.set("eventCompleted", !event.target.checked)
    var project = Projects.findOne()
    var projectId = project._id
    var events = project.events
   
  },
  "blur .single-event-details li": function(e){

    var currentProject = Projects.findOne()._id
    // variables below grab changes to the event-details by the user
    // these are meant to be sent to mongo to update on server-side

    var title = document.getElementById("single-event-title").innerText
    var location = document.getElementById("single-event-location").innerText
    var date = document.getElementById("single-event-date").innerText
    var notes = document.getElementById("single-event-notes").innerText
		var index = Session.get("event_index");
		var obj = {};
		var titleMod = 'events.' + index + '.title';
		var dateMod = 'events.' + index + '.date';
		var notesMod = 'events.' + index + '.notes';
		var locationMod = 'events.' + index + '.location';
		obj[titleMod] = title;
		obj[dateMod] = date;
		obj[notesMod] = notes;
		obj[locationMod] = location;
    Projects.update({_id: currentProject},{$set: 
			obj
    }) 
  }
})
// helpers required for all changes to events page being reflected in the database


