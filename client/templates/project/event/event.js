Meteor.startup(function(){


Template.singleEvent.helpers({
  // find all projects
  projects: function(){
    return Projects.find()
  },

  // finds the events of a project (an array)
  events: function(){
    return Projects.findOne().events
  },

   // targets a single event in the array
  singleEvent: function(){
    var events = Projects.findOne().events
    return events[0]
  },

  eventCompleted: function(){
    if(Session.get("eventCompleted")){
      return true
    }
  },
});

Template.singleEvent.events({
  "change .event-completed input": function(e){
    e.stopPropagation
    var project = Projects.findOne()
    var projectId = project._id
    var events = Projects.findOne().events
    var currentEvent = events[0]
    Session.set("eventCompleted", event.target.checked)
    var completeStatus = Session.get("eventCompleted")
    Projects.update({_id: projectId}, {$set:  {'events.0.completed': completeStatus }})
    console.log(events[0].completed)
   
  },
  "blur .single-event-details li": function(e){
    var currentProject = Projects.findOne()._id
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
  },

  "click .single-event-details button": function(){
    var editable = $('li').attr('contenteditable')
    
    if(editable == 'false')
    {
      $('li').attr('contenteditable', 'true')
    }
    else
    {
       $('li').attr('contenteditable', 'false')
    }
  }
})
});


// Meter.methods({
//   updateEvent: function(attributes){
//     var currentProject = Projects.find(this._id)
//     Projects.update({currentProject}, {$set: {}})
//   },
// })
// helpers required for all changes to events page being reflected in the database


