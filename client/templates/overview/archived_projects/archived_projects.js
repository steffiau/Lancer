Template.archivedProjects.helpers({
	archived_projects: function(){
		return Projects.find({project_finished:true});
	},
	settings: function(){
	return {fields:[{key: "name",label: "Project Name"},
	{key: "description", label: "Description"},
	{key: "start_date", label: "Started at"},
	{key: "project_finishedAt", label: "Finished at"},
	{key: "client_id", label: "client_id", fn: function(value,object},
	{key: "contract_amount", label: "$$$"}]
	};
	}

});
