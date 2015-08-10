AutoForm.addHooks('newClientForm', {
		onSubmit: function(doc){
		this.event.preventDefault();
		//var error = new Error("aaaaaaa");
		//console.log(error);		// How to throw error
		// if scafold success, write to db
			Clients.insert(doc);	
		}		
});
