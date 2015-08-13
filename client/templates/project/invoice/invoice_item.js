Template.invoiceItem.created = function () {
  console.log("happens now")
}

Template.invoiceItem.helpers ({
  subtotal: function() {
    var item = this.value
    console.log(item)
    return (item.qty * item.price)
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
    return this.value.price;
  },
  index: function() {
    return this.index;
  },
})

Template.invoiceItem.events({
  "blur .invoice-item-fields": function(e) {
    e.preventDefault
    var service = e.currentTarget.children.item(0).innerHTML;
    e.currentTarget.children.item(0).innerHTML = service;

    var description = e.currentTarget.children.item(1).innerHTML;
    e.currentTarget.children.item(1).innerHTML = description;

    var quantity = e.currentTarget.children.item(2).innerHTML;
    e.currentTarget.children.item(2).innerHTML = quantity;

    var price = e.currentTarget.children.item(3).innerHTML;
    e.currentTarget.children.item(3).innerHTML = price;

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
  // },
  // "keyup .invoice-item-service": function(e) {
  //   if (e.which === 13) {
  //     e.preventDefault;
  //     e.currentTarget.blur();
  //     console.log('you pressed enter!')
  //   }
  // "blur .invoice-item-price": function (e) {
  //   var price = e.currentTarget.innerText;


  //   var index = e.currentTarget.parentElement.dataset.index
  //   console.log(index)
  //   var event_index = Session.get("event_index")

  //   var obj = {};

  //   var priceMod = "events." + event_index + ".items." + index + ".price";
  //   obj[priceMod] = price;

  //   var projectId = Session.get("projectId");

  //   Projects.update({_id: projectId}, {$set: obj})
    // e.currentTarget.innerHTML = '';
  // }
  // "blur .invoice-item-service": function (e) {
  //   console.log(e)
  //   var service = e.currentTarget.innerText;
  //   console.log(service)
  //   e.currentTarget.innerText = service;

  //   var index = e.currentTarget.parentElement.dataset.index
  //   console.log(index)
  //   var event_index = Session.get("event_index")

  //   var obj = {};

  //   var serviceMod = "events." + event_index + ".items." + index + ".service";
  //   obj[serviceMod] = service;

  //   var projectId = Session.get("projectId");


  //   Projects.update({_id: projectId}, {$set: obj})
  // },

})