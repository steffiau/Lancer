Router.route('/', function () {
  this.render('overviewLayout');
});

Router.route('/project/:id', function () {
  this.render('projectLayout');
});