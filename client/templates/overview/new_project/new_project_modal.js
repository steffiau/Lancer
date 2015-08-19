Template.newProjectModal.onRendered( function() {
  this.$('#start-date-picker').datetimepicker({
    inline: true,
  });
  this.$('#end-date-picker').datetimepicker({
    inline: true,
  });
  this.$('.milestone-date-picker').datetimepicker();
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
        results_box.append("<div class='autocomplete-result'>" + value.name + "</div>");
      })
    }
    if (search_term.length == 0) {
      results_box.empty();
    }
  },
  "click .autocomplete-result": function(e) {
    var client = e.currentTarget.innerText;
    $(".client-search").focus().text(client);
  },
  "click #modal-add-milestone":function(){
   Blaze.renderWithData(Template.milestoneForm, {}, $("#project-milestones")[0])
   $('.milestone-date-picker').datetimepicker();
  },
  "click .submit-button": function(e){
    var milestone_arr = [];
    var milestones = $("#project-milestones").children();
    _.each(milestones, function(milestone){
      var milestone_object = {
        invoice_percentage: $($(milestone).children()[1]).children()[1].innerText,
        milestone_date: $($(milestone).children()[2]).children().data("date"),
        milestone_invoice: true,
        milestone_title: $($(milestone).children()[1]).children()[0].innerText
      };
      milestone_arr.push(milestone_object);
    });
    var doc = {
      project_name: $("#project-name")[0].innerText,
      client_name: $("#client")[0].innerText,
      project_description: $("#project-description")[0].innerText,
      contract_amount: $("#project-amount")[0].innerText,
      project_start_date: $("#start-date-picker").data('date'),
      project_due_date: $("#end-date-picker").data('date'),
      milestones: milestone_arr
    };
    console.log(doc);
  }
})





