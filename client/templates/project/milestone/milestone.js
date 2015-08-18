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
  comments: function() {
    var project = Projects.findOne({_id: Session.get("projectId")});
    var comItems = project.events[Session.get("event_index")].comments;
    var indexedComItems = _.map(comItems, function(value, index){
      return {object: value, index: index};
    });
    return indexedComItems;
  }
});

Template.milestone.events({
  "blur .single-event-details li": function(e){
    var title = $("#single-event-title").text();
    var date = $("#single-event-date").text();
    // var notes = $("#single-event-notes").text();
    // console.log(e)
    // $("#single-event-notes").html("" + notes)
    var index = Session.get("event_index");
    var obj = {};
    var titleMod = 'events.' + index + '.title';
    var dateMod = 'events.' + index + '.date';
    // var notesMod = 'events.' + index + '.notes';
    obj[titleMod] = title;
    obj[dateMod] = date;
    // obj[notesMod] = notes;
    Projects.update({_id: Session.get("projectId")},{$set: obj });
  },
  "submit #new-requirement": function(e) {
    e.preventDefault();

    var newText = e.currentTarget[0].value;
    console.log(newText);
    // Get value from form element
    var newRequirement = {
      name: newText,
      checkValue: false
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
  "click .delete-req": function(e) {
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
  },
  "click .delete-com": function(e) {
    var projectId = Session.get("projectId");
    var index = Session.get("event_index");
    console.log(e);
    var comIndex = e.currentTarget.parentElement.parentElement.dataset.index;

    var objRemove = {};
    var comItem = "events." + index + ".comments." + comIndex;
    console.log(comItem);
    objRemove[comItem] = 1;
    Projects.update({_id: projectId}, {$unset: objRemove})

    var objClear = {};
    var comArray = "events." + index + ".comments";
    objClear[comArray] = null;
    Projects.update({_id: projectId}, {$pull: objClear})
  },
  "change .req-item input:checkbox": function(e) {
    var projectId = Session.get("projectId");
    var index = Session.get("event_index");
    var reqItems = Projects.findOne({_id: projectId}).events[Session.get("event_index")].requirements;
    var reqIndex = e.currentTarget.parentElement.dataset.index;

    var obj = {};
    var reqItemCheckValue = "events." + index + ".requirements." + reqIndex + ".checkValue";
    
    if (reqItems[reqIndex].checkValue) {
      obj[reqItemCheckValue] = false;
    } else {
      obj[reqItemCheckValue] = true;
    };

    Projects.update({_id: projectId}, {$set: obj});
  }
    // "click .event-completed button": function(e){
  //   var project = Projects.findOne({_id: Session.get("projectId")});
  //   var projectId = Session.get("projectId");
  //   var events = project.events;
  //   var index = Session.get("event_index");

  //   var obj = {};
  //   var completeMod = 'events.' + index + '.completed';

  //   if(events[index].completed){
  //     obj[completeMod] = false;
  //     Projects.update({_id: projectId}, {$set: obj });
  //   } else {
  //     obj[completeMod] = true;
  //     Projects.update({_id: projectId}, {$set: obj });
  //   }
  //   //   Session.set("eventCompleted", !event.target.checked)
  //   var project = Projects.findOne({_id: Session.get("projectId")});
  //   var projectId = project._id;
  //   var events = project.events;
  // },
});
