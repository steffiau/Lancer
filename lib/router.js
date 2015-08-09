Router.configure({
});

Router.route('/', function () {
  this.render('overviewLayout');
});

Router.route('/project/:id', function () {
  this.render('projectLayout');
});

Router.route('/Tom',function(){
	this.render('TomTemplate'); // Just setting this up as my testing route 
});


