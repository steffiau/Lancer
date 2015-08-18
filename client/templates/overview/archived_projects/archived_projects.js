Template.archivedProjects.helpers({
	archived_projects: function(){
		return Projects.find({project_finished:true});
	},
	settings: function(){
		return {fields:[{key: "name",label: "Project Name"},
			{key: "description", label: "Description"},
			{key: "start_date", label: "Started at" ,fn: function(value){return moment(value).format("YYYY-MM-DD")}},
			{key: "project_finishedAt", label: "Finished at", fn: function(value){return moment(value).format("YYYY-mm-DD")}},
			{key: "client_id", label: "Client Name" ,fn: function(value,object){return clientName(value);}},
			{key: "contract_amount", label: "$$$"},
			{key: "_id", label:"Unarchive Project", fn: function(value,object){ 
				return new Spacebars.SafeString("<a href=\"javascript:Projects.update({_id: \'" + value + "\'},{$set:{project_finished: false}});toastr.success('Successfully unarchived project!');\"> Unarchive </a>"); }}]
		};
	}
});

//Template.archivedProjects.events({
//	'click .reactive-table tbody tr':function(event){
//		var project = this;
//		alert("This should be the detail page, client/template/overview/archived_projects/archived_projects.js");
//	}
//
//});
//Projects.update({_id:id},{$set:{project_finished:false}})

