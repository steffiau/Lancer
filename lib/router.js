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
  this.render('invoice');
});
// This Route was set up as an endpoint for stripe connect.
Router.route('/stripeConnect', function(){
	if (! this.params.query.error){
		this.render('getStripeUserSecret');
	} else{
		console.log("Stripe authenication error" + this.params.query.error);
	}; 
	console.log(this.params.query.scope);
	console.log(this.params.query.code);
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
