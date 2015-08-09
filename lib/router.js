// Router.configure({
// 	layoutTemplate: 'layout'
// });

Router.route('/', function () {
  this.render('overviewLayout');
});

Router.route('/project/?:id', function () {
  this.render('projectLayout');
});
Router.route('/invoice/?:invoice_no', function () {
  this.render('invoiceLayout');
});


Router.route('/Tom',function(){
	this.render('TomTemplate'); // Just setting this up as my testing route 
});

Router.route('/Steffi',function(){
  this.render('')
});


Router.route('/Siv',function(){
  this.render('newEvent')
});
