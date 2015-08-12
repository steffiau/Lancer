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
  },
  subtotal: function () {
    var project = Projects.findOne({_id: Session.get("projectId")});
    var invoice = project.events[Session.get("event_index")]
    var subtotal = _.reduce(invoice.items, function(sum, num) {
      return sum + (num.qty * num.price);
    }, 0);
    return "$" + subtotal.toFixed(2);
  },
  tax: function () {
    var project = Projects.findOne({_id: Session.get("projectId")});
    var invoice = project.events[Session.get("event_index")]
    var subtotal = _.reduce(invoice.items, function(sum, num) {
      return sum + (num.qty * num.price);
    }, 0);
    return "$" + (subtotal * 0.12).toFixed(2);
  },
  grandtotal: function () {
    var project = Projects.findOne({_id: Session.get("projectId")});
    var invoice = project.events[Session.get("event_index")]
    var subtotal = _.reduce(invoice.items, function(sum, num) {
      return sum + (num.qty * num.price);
    }, 0);
    return "$" + (subtotal * 1.12).toFixed(2);
  }
});