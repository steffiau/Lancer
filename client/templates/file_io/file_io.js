// defines an FS File STORE called projectFilesStore
// will come up in mongoDB as cfs.projectFiles.filerecord
var projectFilesStore = new FS.Store.FileSystem("projectFiles",{
  path: "~/projectfiles"});

// defines a new FS COLLECTION named called projectFiles
var projectFiles = new FS.Collection('projectFiles', {
  stores: [projectFilesStore]
});


projectFiles.allow({
  insert: function () {
    return true;
  },
  update: function () {
    return true;
  },
  remove: function () {
    return true;
  },
  download: function () {
    return true;
  }
});


// Template.uploadForm.helpers({
//   var project = Projects.findOne({_id: Session.get("projectId")});
//     return project.events[Session.get("event_index")]
//   }
// })


// template helpers for the upload form
Template.uploadForm.events({
  "click h1": function(e){
    var project = Projects.findOne({_id: Session.get("projectId")})
    var projectId =  Session.get("projectId")
    var file = $("#file").get(0).files[0];
    var index = Session.get("event_index");
    var fileObj = projectFiles.insert(file);
    var currentEvent = project.events[Session.get("event_index")];
    var milestone = Projects.findOne({"events.$": Session.get("event_index")});
    var attachmentMod = 'events.' + index + '.attachments';

    var object = {}
    object[attachmentMod] = fileObj
    console.log(object)
    console.log(fileObj)
    Projects.update(
      {_id: projectId},
      {
        $addToSet: object
      }
    )
  }
});





