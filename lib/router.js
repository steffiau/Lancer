// Router.configure({
// 	layoutTemplate: 'layout'
// });

Router.route('/', function () {
  this.render('layout');
});

Router.route('/project/new',function(){
	Session.set("onPage","add-new-project");
  this.render('layout');
});

Router.route('/project/:id', function () {
  Session.set('projectId', this.params.id);
  this.render("projectView");
});


Router.route('/invoice/:invoice_no', function () {
	var project_id ;
	var event_index;
	var invoice_no = this.params.invoice_no;
	var thisroute = this;
	var current_project;
	var current_user;
	var current_client;
	var return_data;
	Meteor.call("findProjectIdFromInvoice",invoice_no,function(err,data){
		project_id = data;
		current_project = {"project": Projects.findOne({"_id": data})};
		current_user = {"user": Meteor.users.findOne({"_id": current_project.project.owner_id })};
		current_client = {"client": Clients.findOne({"_id": current_project.project.client_id})};
		Meteor.call("findInvoiceIndexFromInvoiceId",project_id,invoice_no, function(err,data){
			event_index = {"event_index": data};
			return_data = {event: Projects.findOne({"_id": project_id}).events[event_index.event_index]}
			return_data = _.extend(return_data, event_index);
			return_data = _.extend(return_data, current_user);
			return_data = _.extend(return_data, current_client);
			return_data = _.extend(return_data, current_project);

			thisroute.render("invoice-route",{data: return_data});
			//successfully found the invoice
		});
	});
	//Did not find data
  this.render('invoice-route');
});
// This Route was set up as an endpoint for stripe connect.
Router.route('/stripeConnect', function(){
	if (! this.params.query.error){
		this.render('getStripeUserSecret');
	} else{
		console.log("Stripe authenication error" + this.params.query.error);
	}; 
});


Router.route('/Tom',function(){
	//this.render('newProject'); // Just setting this up as my testing route
	this.render('newProject');
});

Router.route('/Steffi',function(){
  this.render('singleMilestone')
});

Router.route('/wes', {
  name: 'tomTemplate',
  data: function () { return Projects.findOne(); },
});

Router.route('/Siv',function(){

  this.render('meeting')
});
