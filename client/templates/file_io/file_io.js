// defines an FS File STORE called projectFilesStore
// will come up in mongoDB as cfs.projectFiles.filerecord
var projectFilesStore = new FS.Collection("projectFiles",{
  path: "Lancer/lib/projectfiles"})
});

// defines a new FS COLLECTION named called projectFiles
var projectFiles = new FS.Collection('projectFiles', {
  stores: [projectFilesStore]
});


// template helpers for the upload form

  Template.uploadForm.events({
    "submit form": function(e){
      debugger
      var file = $("#file").get(0).files[0]
      var fileObj = projectFiles.insert(file)
      console.log(e)
    }
  });

