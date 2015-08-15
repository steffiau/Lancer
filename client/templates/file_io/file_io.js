// defines an FS File STORE called projectFilesStore
// will come up in mongoDB as cfs.projectFiles.filerecord
var projectFilesStore = new FS.Store.FileSystem("projectFiles");

var projectFilesStoreS3 = new FS.Store.S3("projectFilesS3");


// defines a new FS COLLECTION named called projectFiles
var projectFiles = new FS.Collection('projectFiles', {
  stores: [projectFilesStoreS3]
});

// Template.uploadForm.helpers({
//   var project = Projects.findOne({_id: Session.get("projectId")});
//     return project.events[Session.get("event_index")]
//   }
// })

Template.uploadForm.helpers({
  attachments: function(){
    var project = Projects.findOne({_id: Session.get("projectId")});
    return project.events[Session.get("event_index")].attachments;
  },
  uploads: function(){
   return projectFiles.find();
 },
 downloadURL: function(){
   return "https://s3-us-west-2.amazonaws.com/lancerlhl/projectFiles/"
 }
});

// template helpers for the upload form
Template.uploadForm.events({
  "submit form": function(e){
    e.preventDefault();
    var project = Projects.findOne({_id: Session.get("projectId")});
    var projectId =  Session.get("projectId");
    var file = $("#file").get(0).files[0];
    var index = Session.get("event_index");
    var fileObj = projectFiles.insert(file);
    var currentEvent = project.events[Session.get("event_index")];
    var milestone = Projects.findOne({"events.$": Session.get("event_index")});
    var attachmentMod = 'events.' + index + '.attachments';
    var object = {};
    object[attachmentMod] = fileObj
    Projects.update(
      {_id: projectId},
      {
        $addToSet: object
      }
      )
  }
});


projectFiles.allow({
  insert: function (userId, fileObj) {
    return true;
  },
  update: function (userId, fileObj) {
    return true;
  },
  remove: function (userId, fileObj) {
    return true;
  },
  download: function (userId, fileObj) {
    return true;
  }
});




