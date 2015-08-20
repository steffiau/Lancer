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
    var client_name = $("#client")[0].innerText;
    var client_obj = {};
    client_obj["name"] = client_name;
    var client = Clients.findOne(client_obj);
    var doc = {
      project_name: $("#project-name")[0].innerText,
      client_id: client._id,
      project_description: $("#project-description")[0].innerText,
      contract_amount: $("#project-amount")[0].innerText,
      project_start_date: $("#start-date-picker").data('date'),
      project_due_date: $("#end-date-picker").data('date'),
      milestones: milestone_arr
    };
    if (project = scafold(doc)) {
      Projects.insert(project, function(err, id) {
        var events =  processMilestone(doc.milestones, id, doc.contract_amount);
        Projects.update({_id: id}, {
          $set:{events: events}
        });
        // When this is done, create google projects
        if (id) {
          var events = Projects.findOne({_id: id}).events;
          events.forEach(function(eventObj) {
            // iterating each event here
            // Google Calendar Here
            var start_time = moment(eventObj.date).add(1, 'd');
            var end_time = moment(eventObj.date).add(12, 'h');
            var title = eventObj.title;
            var location = "Home";
            var description = eventObj.title;

            if (eventObj.type == "meeting") {
              var location = eventObj.location;
            }

            if (eventObj.type == "invoice") {
              var title = eventObj.service;
              var description = eventObj.description;
            }

            writeToGoogleCalendar(start_time, end_time,title,title,location);
          });

          Router.go('/project/' + id);
          $('#create-project-modal').modal('hide');
        };
      });
    } else {
      var error = new Error("Scafold failed, please check data");
      toastr.error("Failed");

      return false;
    }
  }
})

function scafold(doc) {
  var Project = {
    name: doc.project_name,
    description: doc.project_description,
    start_date: doc.project_start_date,
    due_date: doc.project_due_date,
    createdAt: moment().toISOString(),
    project_finished: false,
    client_id: doc.client_id,
    owner_id: Meteor.userId(),
    contract_amount: doc.contract_amount,
    events: [],
    collabid: []
  };
  return Project;
}

function writeToGoogleCalendar(start_time, end_time,summary, description, location){
  var data = {
    "end": {
      "dateTime": start_time.toISOString(),
    },
    "start": {
      "dateTime": end_time.toISOString(),
    },
    "summary": summary,
    "description":description,
    "location":location
  }
  GoogleApi.post('calendar/v3/calendars/primary/events?key=' + Meteor.settings.public.GooglePublicAPIKey, {data: data});
}

function processMilestone(project_milestone_array, project_id, contract_amount){
  var id4 = project_id.substr(-4,4);
  var events = [],
  milestones = [],
  invoices = [];
  var amount_sum = 0; // This Variable is used to check if user amount in equal to 100%
  var empty_count = 0;

  project_milestone_array.forEach( function(milestone) {
    if ( !_.isEmpty(milestone.invoice_percentage) && !isNaN(milestone.invoice_percentage) ) {
      amount_sum += parseInt(milestone.invoice_percentage);
    }
    if (_.isEmpty(milestone.invoice_percentage) || isNaN(milestone.invoice_percentage)) {
      // When user do not specify percentage
      empty_count ++;
      milestone.milestone_date = moment(milestone.milestone_date).toISOString();
    };
  });

  if (amount_sum !== 100 && empty_count == 0){
    toastr.error("Sum of percentage < 100% and you didn't leave any field empty..., Aborted, Try again .");
    return false;
  }

  if (amount_sum !== 100){
    var default_pct = (100 - amount_sum) / empty_count;
  };

  for( var i = 0; i < project_milestone_array.length; i ++ ){
    // Handle invoice here
    if (project_milestone_array[i].milestone_invoice == true){
      if (_.isEmpty(project_milestone_array[i].invoice_percentage) ||  isNaN(project_milestone_array[i].invoice_percentage)) {
        var invoice_percentage = default_pct;
      } else {
        var invoice_percentage = project_milestone_array[i].invoice_percentage;
      };
      invoices.push(
        newInvoice(project_milestone_array[i], invoice_percentage, contract_amount, i, id4)
      ); // Generate invoice object and push to array
    };
    // Handle meetings and milestones here
    events.push(newMeeting(project_milestone_array[i], i));
    milestones.push(newMilestone(project_milestone_array[i], i));
  };

  return  invoices.concat(events.concat(milestones));// Return all the events so that I can just push them to the newly generated project

};

function newMilestone(milestone, index) {
  return {
    title: milestone.milestone_title,
    type: 'milestone',
    requirement:[],
    completed: false,
    comments: [],
    date: moment(milestone.milestone_date).toISOString(),
  };
};

function newMeeting(milestone, index) {
  var title = "Meeting for " + milestone.milestone_title;
  return {
    title: title,
    type:'meeting',
    notes: '',
    location: 'Location TBD',
    date: moment(milestone.milestone_date).subtract(2,'d').toISOString(),
    completed: false
  }
};

function newInvoice(milestone, pct_amount, total_amount, index, id4){
  //milestone_num is 0 indexed
  var service = milestone.milestone_title;
  var description = "";
  var amount = pct_amount * total_amount / 100;
  amount = amount.toPrecision(3);
  var invoice_no = moment(milestone.milestone_date).format("YYYYMMDD") + "-" + id4;
  return {
    date: moment(milestone.milestone_date).add(1,'h').toISOString(),
    title: 'Invoice',
    invoice_no: invoice_no,
    type: 'invoice',
    completed: false,
    items: [
      {
        service: service,
        description: description,
        qty: 1,
        price: Number(amount)
      }
    ]
  };
};




