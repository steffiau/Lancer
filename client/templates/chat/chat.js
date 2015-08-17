

Template.messages.helpers({
  messages: function(){
    var id = currentUserId();
    return Messages.find({projectId: Session.get("projectId")},{$orderby: {"this.date": -1}});
  },
  projectName: function(){
    return currentProject().name;
  }
});
// events for messages template (where all messages appear)
Template.messages.events({
  "submit form": function(e){
    e.preventDefault();
    var projectId = Session.get("projectId");
    var username = currentUser().profile.name;
    var userId = currentUserId();
    var message = $("#newMessage").val();
    var senderId = currentUserId();
    var date_time = moment().format('MMMM Do YYYY, h:mm:ss a');
    var completeMessage = {
      sender: username,
      userId: userId,
      date: date_time,
      message: message, 
      projectId: projectId,
      collaborators: collaborators()
    }
    Meteor.call("insertMessage", completeMessage)
    // console.log("username: ", username, "projectId: ", projectId, "message: ", message, "senderId: ", senderId, "date: ", date_time);
     $("#allMessages").animate({ scrollTop: $('#allMessages')[0].scrollHeight}, 1000);
    $("#newMessage").val('');


 
  },
  "click #toggleChat": function(){
    $("#chatBox").toggleClass("off");
    $("#toggleChat").toggleClass("closed")
    
  }

});

// helpers for message template (a single message)
Template.message.helpers({
  checkLocalUser: function(){
    if(this.userId === currentUserId()){
      return "myMessage"
    } else {
      return "collabMessage"
    }
  }
});

// CRUD permissions




