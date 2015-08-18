Meteor.startup(function(){
  Session.set('onPage', 'active-projects');
});

Template.layout.events = {
  'click .menu-button': function(e){
    e.preventDefault;
    var clickedPage = e.currentTarget.id;
    Session.set('onPage', clickedPage);
  },
  'click .create-button': function(e){
    e.preventDefault;
    var clickedPage = e.currentTarget.id;
    Modal.show("newProjectModal");
    // Session.set('onPage', clickedPage);
  },
  'click #profile-pic': function(){
    Session.set('onPage', 'userSetting');
  }
}

Template.layout.helpers({
  pageIs: function(page){
    return Session.get('onPage') == page;
  },
  time: function(){
    return moment(TimeSync.serverTime(null, 1000)).format("hh:mm A");
  },
  date: function(){
    return moment(TimeSync.serverTime(null, 1000)).format("ddd, MMM DD").toUpperCase()
  },
	firstTimeLogin: function(){
		//return true; // just leave this one here for development
		return _.isUndefined(currentUser().profile.infoComplete);
	}
});

