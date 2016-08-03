Template.Submitetacall.onCreated(function() {
  this.autorun(() => {
      this.subscribe('calls');
  });
});

Template.Submitetacall.helpers({
   formatDatetime: function(datetime) {
      if (datetime){
         return moment(datetime).locale("nl").format('LLL');
      } else {
         return false;
      }
   },
   call: function() {
      return Calls.findOne(Session.get('submitETAcall'));
   }
});

Template.Submitetacall.events({
   'submit': function() {
      FlowRouter.go('/resources/callplanning');
   }
});
