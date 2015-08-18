
Template.newProjectModal.helpers({
  selected: function(e){
    console.log(e);
    return true
  }
})

Template.newProjectModal.onRendered( function() {
  this.$('#start-date-picker').datetimepicker({
    inline: true,
  });
  this.$('#end-date-picker').datetimepicker({
    inline: true,
  });
});

Template.newProjectModal.events({
  "click .next-button": function(e) {
    var next_element =  $(e.currentTarget).parent().next();
    var move = next_element.parent().scrollTop() + next_element.position().top
    console.log(move)
    next_element.addClass("selected-question").children()[1].focus();
    next_element.siblings().removeClass("selected-question");
    console.log(next_element);
    $(".modal-content").animate({
      scrollTop: move
    }, 500);
  }
})

// -(next_element[0].offsetHeight)




