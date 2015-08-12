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
      var amount = this.value.amount;
      return "($" + amount + ")";
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
  }
})