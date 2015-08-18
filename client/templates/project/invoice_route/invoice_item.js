Template.invoiceItemRoute.helpers ({
  subtotal: function() {
    var item = this.value
    return (item.qty * item.price).toFixed(2)
  },
  service: function () {
    return this.value.service;
  },
  description: function () {
    return this.value.description;
  },
  qty: function () {
    return this.value.qty;
  },
  price: function () {
    return this.value.price
  },
  index: function() {
    return this.index;
  }
})

