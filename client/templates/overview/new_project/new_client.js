AutoForm.addHooks('newClientForm', {
	onSubmit: function(doc){
		this.event.preventDefault();
		//var error = new Error("aaaaaaa");
		//console.log(error);		// How to throw error
		// if scafold success, write to db
		_.extend(doc,{owner_id: currentUser()._id})
			Clients.insert(doc,function(error,id){
				if (id){
					toastr.success("Successfully created new client!");
					Session.set('onPage','clients');}
				if (error){
					toaste.error(error.reason);
				};
			});	
	}		
});
