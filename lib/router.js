// Router.configure({
// 	layoutTemplate: 'layout'
// });

Router.route('/', function () {
  this.render('layout');
});

Router.route('/project/?:id', function () {
  this.render('projectLayout');
});
Router.route('/invoice/:invoice_no', function () {
  this.render('invoice');
});


Router.route('/Tom',function(){
	//this.render('newProject'); // Just setting this up as my testing route
	this.render('newProject');
});

Router.route('/Steffi',function(){
  this.render('')
});

Router.route('/wes', {
  name: 'tomTemplate',
  data: function () { return Projects.findOne(); },
});

Router.route('/Siv',function(){

  this.render('singleEvent')
});
