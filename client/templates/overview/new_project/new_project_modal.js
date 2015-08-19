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
    next_element.addClass("selected-question").children()[1].focus();
    next_element.siblings().removeClass("selected-question");
    $(".modal-content").animate({
      scrollTop: move
    }, 500);
  },
  "keypress .selected-question": function(e) {
    if (e.which === 13) {
      e.preventDefault;
      var next_element =  $(e.currentTarget).next();
      var move = next_element.parent().scrollTop() + next_element.position().top
      next_element.addClass("selected-question").children()[1].focus();
      next_element.siblings().removeClass("selected-question");
      $(".modal-content").animate({
        scrollTop: move
      }, 500);
      return false
    }
  },
  "keypress .modal-date-picker": function(e) {
    if (e.which === 13) {
      e.preventDefault;
      console.log(e)
      var next_element =  $(e.currentTarget).next();
      var move = next_element.parent().scrollTop() + next_element.position().top
      next_element.addClass("selected-question").children()[1].focus();
      next_element.siblings().removeClass("selected-question");
      $(".modal-content").animate({
        scrollTop: move
      }, 500);
      return false
    }
  },
  "keyup .client-search": function(e) {
    var results_box = $(".client-autocomplete-results")
    var search_term = $(e.target).text();
    if (search_term.length > 0) {
      var results = Clients.find( {name: { $regex: search_term, $options: "i"} } ).fetch();
      results_box.empty();
      _.each(results, function(value){
        results_box.append("<div class='autocomplete-result' tabindex='0'>" + value.name + "</div>");
      })
    }
    if (search_term.length == 0) {
      results_box.empty();
    }
  },
  "click .autocomplete-result": function(e) {
    console.log(e);
  }
})





