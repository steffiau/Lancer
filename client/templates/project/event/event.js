Template.newEvent.helpers({
  projects: function(){
    return Projects.find()
  },
  events: function(){
    return Projects.findOne().events
  },

  singleEvent: function(){
   var events = Projects.findOne().events
   console.log(events[0])
   return events[0]
  }

});