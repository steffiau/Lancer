Template.tomTemplate.helpers({
	projects: function(){
    return Projects.find();
  },
  template: function(){
    Session.set("template", "invoice")
    console.log (Session.get("template"))
    return Session.get("template")
  }
});

Template.project.helpers({
	invoice: function(){
		return this.invoices;
	},
  client: function(){
    return Clients.findOne({"_id": this.client_id});
  }
});

Template.invoice1.helpers({
  name: function(){
  }
})


