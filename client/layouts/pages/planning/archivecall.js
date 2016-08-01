Template.Archivecall.onCreated(function() {
   this.autorun(() => {
      this.subscribe('calls');
      this.subscribe('resources');
   });
});

Template.Archivecall.helpers({
   formatDatetime: function(datetime) {
      if (datetime){
         return moment(datetime).locale("nl").format('LLL');
      } else {
         return false;
      }
   },
   call: function() {
      return Calls.findOne(Session.get('Archivecall'));
   }
});

Template.Archivecall.events({
   'submit': function() {
      Calls.update(Session.get('Archivecall'), {
         $set: {
            archivedbyresource: true
         }
      });
      FlowRouter.go('/resources/callplanning');
   }
});
