Template.invoiceRoute.helpers ({
	returndata: function(){
		console.log(this);
		return this;
	},
  user_email: function () {
    return this.user.profile.email;
  },
  project: function () {
    return this.project;
  },
  invoice: function () {
    return this.event;
  },
	paid: function(){
		return this.event.completed;
	},
	invoice_no: function(){
		return this.event.invoice_no.toUpperCase()
	},
	user: function(){
		return this.user;
	},
  invoiceitems: function () {
    return  _.map(this.event.items, function(value, index){
      return {value: value, index: index};
    });
  },
  client: function () {
    return this.client;
  },
  subtotal: function () {
    var subtotal = _.reduce(this.event.items, function(sum, num) {
      return sum + (num.qty * num.price);
    }, 0);
    return "$" + subtotal.toFixed(2);
  },
  tax: function () {
    var subtotal = _.reduce(this.event.items, function(sum, num) {
      return sum + (num.qty * num.price);
    }, 0);
    return "$" + (subtotal * 0.12).toFixed(2);
  },
  grandtotal: function () {
    var subtotal = _.reduce(this.event.items, function(sum, num) {
      return sum + (num.qty * num.price);
    }, 0);
    return "$" + (subtotal * 1.12).toFixed(2);
  }
});

Template.invoiceRoute.events({
 });
