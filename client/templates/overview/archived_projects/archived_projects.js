Template.archivedProjects.helpers({
	archived_projects: function(){
		return Projects.find({project_finished:true});
	},
	settings: function(){
		return {fields:[{key: "name",label: "Project Name"},
			{key: "description", label: "Description"},
			{key: "start_date", label: "Started at"},
			{key: "project_finishedAt", label: "Finished at"},
			{key: "client_id", label: "Client Name" ,fn: function(value,object){return clientName(value);}},
			{key: "contract_amount", label: "$$$"}]
		};
	}
});

Template.archivedProjects.events({
	'click .reactive-table tbody tr':function(event){
		var project = this;
		alert("This should be the detail page, client/template/overview/archived_projects/archived_projects.js");
	}

});
