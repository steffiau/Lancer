Meteor.startup(function(){
  Session.set('onPage', 'active-projects');
});

Template.layout.events = {
  'click .menu-button': function(e){
    e.preventDefault;
    var clickedPage = e.currentTarget.id;
    console.log(clickedPage);
    Session.set('onPage', clickedPage);
  },
  'click .create-button': function(e){
    e.preventDefault;
    var clickedPage = e.currentTarget.id;
    console.log(clickedPage);
    Session.set('onPage', clickedPage);
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
		return true;
		return _.isUndefined(currentUser().profile.infoComplete);
	}
});

