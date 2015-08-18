Template.projectView.onCreated( function() {
	Session.set('template', 'Project');
});

Template.projectView.helpers({
	template: function(){
		return Session.get("template")
	}
});

Template.projectView.events({
	'click #archiveProject': function(){
		Projects.update({'_id':Session.get('projectId')
		},{$set:{ project_finished: true,
				project_finishedAt: moment().toISOString()}
		});
		toastr.success("Successfully Archived Project!");
		Router.go('/');
	},
	'click #deleteNode': function(){
		var events = Projects.findOne({'_id':Session.get('projectId')}).events;
		var newEvents = events.splice(Session.get('event_index'),1);
		Projects.update({'_id':Session.get('projectId')},
				{$set:{events: events}});
	},
  'click .mini-menu-button': function(e){
    var clickedPage = e.currentTarget.id;
    console.log(clickedPage);
    Session.set('onPage', clickedPage);
  },
  'click #mini-profile-pic': function(){
    Session.set('onPage', 'userSetting');
  },
  "click #createEvent": function (){
    console.log("new event")
    Session.set("template", "createEvent")
  }

});
