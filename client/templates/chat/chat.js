

Template.messages.helpers({
  messages: function(){
    var id = currentUserId();
    return Messages.find({projectId: Session.get("projectId")},{$orderby: {"this.date": -1}});
  }
});

Template.messages.events({
  "submit form": function(e){
    e.preventDefault();
  
    var projectId = Session.get("projectId");
    var username = currentUser().profile.name;
    var userId = currentUserId();
    var message = $("#newMessage").val();
    var senderId = currentUserId();
    var date_time = moment().format('MMMM Do YYYY, h:mm:ss a') 
    console.log(collaborators())
    Messages.insert({
      sender: username,
      userId: userId,
      date: date_time,
      message: message,
      projectId: projectId,
      collaborators: collaborators()
    });
    // console.log("username: ", username, "projectId: ", projectId, "message: ", message, "senderId: ", senderId, "date: ", date_time);
    $("#newMessage").val('');

  }
});


Template.message.helpers({
  checkLocalUser: function(){
    if(this.userId === currentUserId()){
      return "myMessage"
    } else {
      return "collabMessage"
    }
  }
});

