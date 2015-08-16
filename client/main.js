Meteor.subscribe('projects');
Meteor.subscribe('clients');
Meteor.subscribe('projectFiles');
Meteor.subscribe('allUsers');
Meteor.subscribe('messages', Session.get("projectId"));