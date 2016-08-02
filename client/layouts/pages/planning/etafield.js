
Template.Etafield.onRendered(function() {
    this.$('.datetimepicker').datetimepicker({
       format: 'LLL',
       language: 'nl'
    });
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

Template.Etafield.events({

});