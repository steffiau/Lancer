Template.tomTemplate.helpers({
	projects: function(){return Projects.find();}
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
    console.log(this)
  }
})
