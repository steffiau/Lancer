Template.project.onRendered(function() {
  this.$('.datetimepicker1').datetimepicker({
    format: "MMM/DD/YYYY",
    viewMode: "days",
  });

  $(".datetimepicker1").on("dp.change", function(e){
   var selectedDate = $("#startDateDrop").val();
   var date = moment(selectedDate).format("MMM Do, YYYY");
   var isoDate = moment(selectedDate).format();
   console.log(isoDate);
   Projects.update({_id: Session.get("projectId")},{$set: {start_date: isoDate}}) 
 })  
    // code to  edit start date  ^
    // code to edit due date v
    this.$('.datetimepicker2').datetimepicker({
      format: "MMM/DD/YYYY",
      viewMode: "days",
    });

    $(".datetimepicker2").on("dp.change", function(e){
     var selectedDate = $("#dueDateDrop").val();
     var date = moment(selectedDate).format("MMM Do, YYYY");
     var isoDate = moment(selectedDate).format();
     console.log(isoDate);
     Projects.update({_id: Session.get("projectId")},{$set: {due_date: isoDate}}) 
   })  

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
  }
  // "click body": function(e){
  //   var selectedDate = $("#startDateDrop").val();
  //   var date = moment(selectedDate).format("MMM Do, YYYY");
  //   var isoDate = moment(selectedDate).format();
  //   console.log(isoDate, Session.get("projectId"));
  //   Projects.update({_id: Session.get("projectId")},{$set: {start_date: isoDate}}) 
  // },
});



