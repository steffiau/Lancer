FS.debug = true
var projectFilesStore = new FS.Store.FileSystem("projectFiles");

var projectFilesStoreS3 = new FS.Store.S3("projectFilesS3", {
  region: "us-west-2", //optional in most cases
  accessKeyId: "AKIAJXIHI56WTNHWCZUA", //required if environment variables are not set
  secretAccessKey: "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", //required if environment variables are not set
  bucket: "lancerlhl", //required
  // ACL: "public", //optional, default is 'private', but you can allow public or secure access routed through your app URL
  // folder: "files/", //optional, which folder (key prefix) in the bucket to use 
  // The rest are generic store options supported by all storage adapters
  maxTries: 999 //optional, default 5
});





// defines a new FS COLLECTION named called projectFiles
var projectFiles = new FS.Collection('projectFiles', {
  stores: [projectFilesStoreS3]
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