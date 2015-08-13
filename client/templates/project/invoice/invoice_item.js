Template.invoiceItem.helpers ({
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

Template.invoiceItem.events({
  "click .delete-invoice-item": function(e) {
    var projectId = Session.get("projectId");
    var event_index = Session.get("event_index")
    var item_index = e.currentTarget.parentElement.dataset.index;

    var objRemove = {};
    var itemRemove = "events." + event_index + ".items." + item_index;

    objRemove[itemRemove] = 1

    Projects.update({_id: projectId}, {$unset: objRemove})

    var objClear = {};
    var itemClear = "events." + event_index + ".items";

    objClear[itemClear] = null;

    Projects.update({_id: projectId}, {$pull: objClear})
  },
  "blur .invoice-item-fields": function(e) {
    e.preventDefault

    var service = e.currentTarget.children.item(0).innerText;
    e.currentTarget.children.item(0).innerText = service;

    var description = e.currentTarget.children.item(1).innerText;
    e.currentTarget.children.item(1).innerText = description;

    var quantity = e.currentTarget.children.item(2).innerText;
    e.currentTarget.children.item(2).innerText = quantity;

    var price = e.currentTarget.children.item(3).innerText;
    e.currentTarget.children.item(3).innerText = price;

    var index = e.currentTarget.dataset.index
    var event_index = Session.get("event_index")

    var obj = {};

    var serviceMod = "events." + event_index + ".items." + index + ".service";
    var descriptionMod = "events." + event_index + ".items." + index + ".description";
    var quantityMod = "events." + event_index + ".items." + index + ".qty";
    var priceMod = "events." + event_index + ".items." + index + ".price";

    obj[serviceMod] = service;
    obj[descriptionMod] = description;
    obj[quantityMod] = quantity;
    obj[priceMod] = price;

    var projectId = Session.get("projectId");

    Projects.update({_id: projectId}, {$set: obj})
  },
  "keypress .invoice-item-service": function(e) {
    if (e.which === 13) {
      e.currentTarget.blur()
      return false
    }
  },
  "keypress .invoice-item-description": function(e) {
    if (e.which === 13) {
      e.currentTarget.blur()
      return false
    }
  },
  "keypress .invoice-item-quantity": function(e) {
    if (e.which === 13) {
      e.currentTarget.blur()
      return false
    }
  },
  "keypress .invoice-item-price": function(e) {
    if (e.which === 13) {
      e.currentTarget.blur()
      return false
    }
  }
})