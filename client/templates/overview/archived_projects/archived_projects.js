Template.archivedProjects.helpers({
	archived_projects: function(){
		return Projects.find({project_finished:true});
	}

});
