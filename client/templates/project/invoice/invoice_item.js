Template.invoiceItem.helpers ({
  subtotal: function() {
    return (this.qty * this.price)
  }
})