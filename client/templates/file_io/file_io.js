// defines an FS File STORE called projectFilesStore
// will come up in mongoDB as cfs.projectFiles.filerecord
var projectFilesStore = new FS.Collection("projectfiles",{
  stores: [new FS.Store.FileSystem("images", {path: "Lancer/lib/projectfiles"})]
});

// defines a new FS COLLECTION named called projectFiles
var projectFiles = new FS.Collection('projectFiles', {
  stores: [projectFilesStore]
});


// template helpers for the upload form
// helper is specific to client as collectionFS suggests functionality is problematic when running on server side

// if(Meteor.isClient){
  Template.uploadForm.events({
    "click h1": function(e){
      var file = $("#file").get(0).files[0]
     
     
    }
  });

// }