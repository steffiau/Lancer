Template.invoice.helpers ({
  user_email: function () {
    return currentUser().profile.email;
  },
  user_name: function (){
    return currentUser().profile.name;
  },
  user_phone: function () {
    return currentUser().profile.phone;
  },
  project: function () {
    return Projects.findOne({_id: Session.get("projectId")});
  },
  invoice: function () {
    var project = Projects.findOne({_id: Session.get("projectId")});
    return project.events[Session.get("event_index")]
  },
	invoice_no: function(){
    var project = Projects.findOne({_id: Session.get("projectId")});
    return project.events[Session.get("event_index")].invoice_no.toUpperCase();
	},
	invoiceCompletedAt: function(){
    var project = Projects.findOne({_id: Session.get("projectId")});
    return moment(project.events[Session.get("event_index")].completedAt).format("YYYY-MM-DD hh:mm");
	},
  invoiceitems: function () {
    var project = Projects.findOne({_id: Session.get("projectId")});
    var invoiceitems = project.events[Session.get("event_index")].items;
    var indexed_items = _.map(invoiceitems, function(value, index){
      return {value: value, index: index};
    })
    return indexed_items;
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

Template.invoice.events({
  "click .add-invoice-item": function(){
    var event_index = Session.get("event_index")

    var obj = {};

    var items_array = "events." + event_index + ".items";

    obj[items_array] = {
      service: "",
      description: "",
      qty: 0,
      price: 0.00,
    };

    var projectId = Session.get("projectId");

    Projects.update({_id: projectId}, {$push: obj})
  },
	'click #sendInvoiceEmail': function(e){
		e.preventDefault();
		console.log("Sending Email!");
		var html = Blaze.toHTMLWithData(function(){ return Template.invoiceEmail;},function(){return _.extend(currentProject(),{"event_index":Session.get('event_index')});});
		Meteor.call("sendEmail",currentClient().email, currentUser().profile.email, "New Invoice From Hammock", html);
		toastr.success("Email Sent!");
	},
})
