

Template.messages.helpers({
  messages: function(){
    var id = currentUserId();
    return Messages.find({projectId: Session.get("projectId")},{$orderby: {"this.date": -1}});
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
//     $("#newMessage").val('');
//     var height = 0;
//     $('div .singleMessage').each(function(i, value){
//     height += parseInt($(this).height());
// });

// height += '';

// $('#allMessages').animate({scrollTop: height});
  // $("#allMessages").scrollTop(9999)
  $("#allMessages").animate({ scrollTop: $('#allMessages')[0].scrollHeight}, 1000);
  },
  "click #toggleChat": function(){
    $("#allMessages").toggleClass("off");
    
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




