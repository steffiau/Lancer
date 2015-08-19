Template.project.onRendered(function() {
    this.$('.datetimepicker').datetimepicker({
      format: "MMM/DD/YYYY",
      viewMode: "days",

    });
});

Template.project.helpers({
  project: function(){
    return Projects.findOne({ _id : Session.get("projectId") });
  },

  collabUser: function(){
    var project = Projects.findOne({ _id : Session.get("projectId") });
    return Meteor.users.find( { _id: { $in: project.collabId }});
  },
  dateFormat: function(){
   var project =  Projects.findOne({ _id : Session.get("projectId") });
    return moment(project.start_date).format("MMM Do, YYYY")+" to "+ moment(project.due_date).format("MMM Do, YYYY")
  }
});

Template.project.events({
  "blur .single-event-details li": function(e) {
    var obj = {};
    obj["name"] = $("#project-header").text();
    obj["description"] = $("#project-desc").text();

    Projects.update({_id: Session.get("projectId")},{$set: obj })
  },
  "submit #add-project-user": function(e){
    e.preventDefault();
    var userEmail = e.currentTarget[0].value;
    var newUserId = Meteor.users.findOne({"profile.email":userEmail})._id;
    Projects.update({_id: Session.get("projectId")}, {$addToSet: {"collabId":newUserId}});
  },
  "click .delete-collab": function(e) {
    var projectId = Session.get("projectId");
    var collabId = e.currentTarget.dataset.id;

    // var objRemove = {};
    // var reqItem = "events." + index + ".requirements." + reqIndex;
    // objRemove[reqItem] = 1;
    // Projects.update({_id: projectId}, {$unset: objRemove})

    var objClear = {};
    // var reqArray = "events." + index + ".requirements";
    objClear["collabId"] = collabId;
    Projects.update({_id: projectId}, {$pull: objClear})
  },
  "click i": function(e){
    var selectedDate = $("#submittedDate").val();
    var isoDate = moment(selectedDate).format();
    console.log(isoDate)
  }






});