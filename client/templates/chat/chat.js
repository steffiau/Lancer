
Deps.autorun(function(){
  if(Meteor.userId()){
   Session.set("chatToggleStatus", "off")
   Session.set("chatButtonStatus", "closed")
  }
});

Template.messages.helpers({
messages: function(){
    var id = currentUserId();
    var allMessages =  Messages.find({projectId: Session.get("projectId")},{$orderby: {"this.date": -1}})
    allMessages.observe(
     {
         added: function(){
            $("#allMessages").animate({ scrollTop: $('#allMessages')[0].scrollHeight}, 1000);
       }
     })
    return allMessages;
  },
  projectName: function(){
    return currentProject().name;
  },
  chatToggleStatus: function(){
   return Session.get("chatToggleStatus")
  },
  chatButtonStatus: function(){
    return Session.get("chatButtonStatus")
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
    console.log(completeMessage);
    $("#allMessages").animate({ scrollTop: $('#allMessages')[0].scrollHeight}, 1000);
    $("#newMessage").val('');



  },
  "click #toggleChat": function(){
    // this logic toggles the status of the chatbox as hidden or not based on a user's click event
    if(Session.get("chatToggleStatus") === "off"){
      Session.set("chatToggleStatus", "")
    } else {
     Session.set("chatToggleStatus", "off")
    }
    if(Session.get("chatButtonStatus") === "closed"){
      Session.set("chatButtonStatus", "")
    } else {
      Session.set("chatButtonStatus", "closed")
    }
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




