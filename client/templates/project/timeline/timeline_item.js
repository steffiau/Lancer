Template.timelineItem.helpers({
  type: function() {
    var type = this.value.type;
    return type.charAt(0).toUpperCase() + type.slice(1);
  },
  details: function() {
    if (this.value.title) {
      var title = this.value.title;
      return "(" + title + ")";
    } else {
      var items = this.value.items;
      var total = _.reduce(items, function(sum, item){
        return sum + (item.qty * item.price);
      }, 0);
      return "($" + (total *  1.12).toFixed(2) + ")";
    }
  },
  index: function() {
    return this.index;
  }
})

Template.timelineItem.events({
  "click .timeline-item": function(e) {
    var template_type = e.currentTarget.dataset.template;
    var event_index = e.currentTarget.dataset.index;
    Session.set("template", template_type);
    Session.set("event_index", event_index);
  },
  'click .delete-timeline-item': function(){
    var events = Projects.findOne({'_id':Session.get('projectId')}).events;
    var newEvents = events.splice(Session.get('event_index'),1);
    Projects.update({'_id':Session.get('projectId')},
        {$set:{events: events}});
  },
})