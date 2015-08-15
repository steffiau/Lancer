Template.milestone.helpers({
  // targets a single event in the array
  singleEvent: function(){
    var project = Projects.findOne({_id: Session.get("projectId")});
    return project.events[Session.get("event_index")]
  },
  milestoneCompleted: function() {
    if(Session.get("milestoneCompleted")){
      return true
    }
  },
  requirements: function() {
    var project = Projects.findOne({_id: Session.get("projectId")});
    var reqItems = project.events[Session.get("event_index")].requirements;
    var indexedReqItems = _.map(reqItems, function(value, index){
      return {object: value, index: index};
    });
    return indexedReqItems;
  },
});

Template.milestone.events({
  "click .event-completed button": function(e){
    var project = Projects.findOne({_id: Session.get("projectId")});
    var projectId = project._id;
    var events = project.events;
    var index = Session.get("event_index");
    console.log("before change completed is", events[5].completed);

    var obj = {};
    var completeMod = 'events.' + index + '.completed';

    if(events[index].completed){
      obj[completeMod] = false;
      Projects.update({_id: projectId}, {$set: obj });
    } else {
      obj[completeMod] = true;
      Projects.update({_id: projectId}, {$set: obj });
    }
    //   Session.set("eventCompleted", !event.target.checked)
    var project = Projects.findOne({_id: Session.get("projectId")});
    var projectId = project._id;
    var events = project.events;
    console.log("after change completed: ", events[5].completed)
  },
  "blur .single-event-details li": function(e){

    var currentProject = Projects.findOne()._id
    // variables below grab changes to the event-details by the user
    // these are meant to be sent to mongo to update on server-side

    var title = document.getElementById("single-event-title").innerText
    var date = document.getElementById("single-event-date").innerText
    var notes = document.getElementById("single-event-notes").innerText

    var index = Session.get("event_index");
    var obj = {};
    var titleMod = 'events.' + index + '.title';
    var dateMod = 'events.' + index + '.date';
    var notesMod = 'events.' + index + '.notes';
    obj[titleMod] = title;
    obj[dateMod] = date;
    obj[notesMod] = notes;
    Projects.update({_id: currentProject},{$set: obj })
  },
  "submit #new-requirement": function(e) {
    e.preventDefault();

    var newText = e.currentTarget[0].value;
    console.log(newText);
    // Get value from form element
    var newRequirement = {
      name: newText,
    }

    var index = Session.get("event_index");
    var reqMod = 'events.' + index + '.requirements';
    var obj = {};
    obj[reqMod] = newRequirement;

    Projects.update({ _id : Session.get("projectId")}, {
      $push: obj
    });

    e.currentTarget[0].value = "";
  },
  "submit #new-comment": function(e) {
    e.preventDefault();

    var newText = e.currentTarget[0].value;
    console.log(newText);
    var username = Meteor.user().profile.name;
    // Get value from form element
    var newComment = {
      text: newText,
      user_name: username
    }

    var index = Session.get("event_index");
    var commentMod = 'events.' + index + '.comments';
    var obj = {};
    obj[commentMod] = newComment;

    Projects.update({ _id : Session.get("projectId")}, {
      $addToSet: obj
    });

    e.currentTarget[0].value = "";
  },
  "click #delete-req": function(e) {
    var projectId = Session.get("projectId");
    var index = Session.get("event_index");
    var reqIndex = e.currentTarget.parentElement.dataset.index;

    var objRemove = {};
    var reqItem = "events." + index + ".requirements." + reqIndex;
    objRemove[reqItem] = 1;
    Projects.update({_id: projectId}, {$unset: objRemove})

    var objClear = {};
    var reqArray = "events." + index + ".requirements";
    objClear[reqArray] = null;
    Projects.update({_id: projectId}, {$pull: objClear})
  }
});
