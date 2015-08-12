FS.debug = true
var projectFilesStore = new FS.Store.FileSystem("projectFiles",{
  path: "~/Lancer/projectfiles"});

// defines a new FS COLLECTION named called projectFiles
var projectFiles = new FS.Collection('projectFiles', {
  stores: [projectFilesStore]
});