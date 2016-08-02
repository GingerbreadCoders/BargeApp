
Template.Etafield.onRendered(function() {
    this.$('.datetimepicker').datetimepicker();
});

Template.Etafield.helpers({
   formatDatetime: function(datetime) {
      if (datetime){
         return moment(datetime).locale("nl").format('LLL');
      } else {
         return false;
      }
   }
});