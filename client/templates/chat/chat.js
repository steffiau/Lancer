

Template.messages.helpers({
  messages: function(){
    var id = currentUserId();
    return Messages.find({projectId: Session.get("projectId")});
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
    var date_time = moment().format('MMMM Do YYYY, h:mm:ss a') 
    Messages.insert({
      sender: username,
      date: date_time,
      message: message,
      projectId: projectId
    });
    console.log("username: ", username, "projectId: ", projectId, "message: ", message, "senderId: ", senderId, "date: ", date_time);


  }
});
