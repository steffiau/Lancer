Template.invoiceEmail.helpers({
	currentProject: function(){
		return this;
	},
	client: function(){
		return Clients.findOne({"_id": this.client_id})
	},
	invoice_no: function(){
		return this.events[this.event_index].invoice_no;
	},
	user: function(){
		return Meteor.users.findOne({"_id": this.owner_id});
	}
});
