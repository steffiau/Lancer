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
		alert("Successfully Archived Project!");
		Router.go('/');

	},
	'click #deleteNode': function(){
		var events = Projects.findOne({'_id':Session.get('projectId')}).events;
		var newEvents = events.splice(Session.get('event_index'),1);
		Projects.update({'_id':Session.get('projectId')},
				{$set:{events: events}});
	},
	'click #sendInvoiceEmail': function(e){
		e.preventDefault();
		console.log("Sending Email!");
		var html = Blaze.toHTML(function(){ return Template.invoice;});
		Meteor.call("sendEmail","lmd0209@msn.com", currentUser().profile.email, "Project Invoice", html);
	},
  'click .mini-menu-button': function(e){
    var clickedPage = e.currentTarget.id;
    console.log(clickedPage);
    Session.set('onPage', clickedPage);
  },
  "click #createEvent": function (){
    console.log("new event")
    Session.set("template", "createEvent")
  }

});
