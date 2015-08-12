Template.invoice.helpers ({
  user_email: function () {
    var user = Meteor.user();
    return user.emails[0].address
  },
  project: function () {
    return Projects.findOne({_id: Session.get("projectId")});
  },
  invoice: function () {
    var project = Projects.findOne({_id: Session.get("projectId")});
    return project.events[Session.get("event_index")]
  },
  client: function () {
    var project = Projects.findOne({_id: Session.get("projectId")});
    return Clients.findOne({_id: project.client_id})
  }
});