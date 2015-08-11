// defines an FS collection called projectfiles
// will come up in mongoDB as cfs.projectFiles.filerecord
var projectFiles = new FS.Collection("projectfiles",{
  stores: [new FS.Store.FileSystem("images", {path: "Lancer/lib/projectfiles"})]
});



