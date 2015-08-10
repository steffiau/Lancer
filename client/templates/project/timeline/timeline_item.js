Template.timelineItem.helpers({
  type: function() {
    var type = this.type;
    return type.charAt(0).toUpperCase() + type.slice(1);
  },
  details: function() {
    if (this.title) {
      var title = this.title;
      return "(" + title + ")";
    } else {
      var amount = this.amount;
      return "($" + amount + ")";
    }
  }
})