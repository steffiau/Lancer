

Template.messages.helpers({
  messages: function(){
    var id = currentUserId();
    return Messages.find({_id: Session.get("projectId")});
  }
});

Template.messages.events({
  "click h1": function(e){
    e.preventDefault;
    console.log('clicked')
    var projectId = Session.get("projectId")
    var username = currentUser().profile.name;
    var message = $("#newMessage").val();
    var senderId = currentUserId();
    var date = moment().format('h:mm:ss a'); 
    // Messages.insert({
    //   sender: username,
    //   date: date,
    //   message: message,
    //   projectId: projectId
    // })
    console.log("username: ", username, "projectId: ", projectId, "message: ", message, "senderId: ", senderId, "date: ", date)
    

  }
});
