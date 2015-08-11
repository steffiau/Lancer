Meteor.startup(function(){
  Session.set('onPage', 'active-projects');
});

Template.layout.events = {
  'click .nav-button': function(e){
    e.preventDefaut;
    var clickedPage = e.currentTarget.id;
    console.log(clickedPage);
    Session.set('onPage', clickedPage);
  }
}

Template.layout.helpers({
  pageIs: function(page){
    return Session.get('onPage') == page;
  },
});

