Template.invoice.helpers ({
  project: function () {
    var project = Projects.findOne();
    var invoice = project.invoices[0];
    return invoice
  },
});