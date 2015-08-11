Template.allProjects.helpers({
  projects: function(){
    return Projects.find();
  },

  count: function(){
    return Projects.find().count();
  },
});

Template.allProjects.events({
  "click .overview-project": function(e) {
    var projectId = e.currentTarget.parentElement.dataset.project_id
    console.log(projectId)
    Session.set('projectId', projectId);
    Router.go("/project")
  }
});

Template.projectListing.helpers({
  timeline: function(){
    var events = this.events
    return _.sortBy(events, 'date');
  },
});

Template.overviewTimelineItem.helpers({
  type: function() {
    var type = this.type;
    return type.charAt(0).toUpperCase() + type.slice(1);
  },
  details: function() {
    if (this.title) {
      var title = this.title;
      return "(" + title + ")";
    } else {
      var amount = this.amount;
      return "($" + amount + ")";
    }
  }
});

Template.overviewTimelineItem.events({
  "click .timeline-item": function(e) {
    var template_type = e.currentTarget.dataset.template;
    Session.set("template", template_type)
  },

  "mouseenter .overview-node": function(e) {
    $(e.target).css("background-color", "#6BBD5D");
    $(e.target).parent().parent().prev().css("display", "inline-block");
  },

  "mouseleave .overview-node": function(e) {
    $(e.target).css("background-color", "#75ce66");
    $(e.target).parent().parent().prev().css("display", "none");
  }
});

