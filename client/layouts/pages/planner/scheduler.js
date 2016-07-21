Template.Scheduler.onCreated(function() {
   this.autorun(() => {
      this.subscribe('calls');
      this.subscribe('terminals');
      this.subscribe('resources');
   });
});

Template.Scheduler.helpers({
   calls: function() {
      return Calls.find({},{sort:{appointment:1}});
   },
   terminals: function() {
      return Terminals.find();
   },
   selectedcall: function () {
    return Calls.findOne(Session.get('selectedcallid'));
   },
   editcalls: function() {
      return Session.get('editmode');
   },
   formatDatetime: function(datetime) {
      return moment(datetime).format('DD-MM-YYYY HH:mm');
   }

});

Template.Scheduler.events({
   'click .toggle-edit': function() {
      if (Session.get('editmode')) {
         Session.set('selectedcallid', this._id);
      }
      else {
         Session.set('editmode', true);
         Session.set('selectedcallid', this._id);
      }
   },
   'click .toggle-edit-ne': function() {
      if (Session.get('editmode')) {
         Session.set('editmode', false);
      }
   },
   'click .delete-row': function() {
      
   },
   'submit #updateCall': function() {
      Session.set('editmode', false);
   }
     
});
