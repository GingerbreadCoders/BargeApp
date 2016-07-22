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
   entercalls: function() {
      return Session.get('entrymode');
   },
   formatDatetime: function(datetime) {
      return moment(datetime).format('DD-MM-YYYY HH:mm');
   },
   rtsettings: { fields: [
      { key: 'terminalname', label: 'Terminal name' },
      { key: 'appointment', label: 'Appointment', fn: function(appointment, object, key){
            return moment(appointment).format('DD-MM-YYYY HH:mm');
         } 
         
      },
      { key: 'modality', label: 'Modality' },
      { key: 'resourcename', label: 'Resource name' },
      { key: 'status', label: 'Status' },
      { key: 'buttons', label: 'Buttons', tmpl: Template.buttonhelper },
   ]}

});

Template.Scheduler.events({
   'click .toggle-edit': function() {
      if (Session.get('editmode')) {
         Session.set('selectedcallid', this._id);
      }
      else {
         Session.set('editmode', true);
         Session.set('entrymode', false);
         Session.set('selectedcallid', this._id);
      }
   },
   'click .newentry-btn': function() {
      if (Session.get('editmode')) {
         Session.set('editmode', false);
         Session.set('entrymode', true);
      } else {
         if (Session.get('entrymode')) {
            Session.set('entrymode', false);
         } else {
            Session.set('entrymode', true);
         }
      }
   },
   'submit #updateCall': function() {
      Session.set('editmode', false);
   },
   'submit #insertCall': function() {
      Session.set('entrymode', false);
   }
});


Template.buttonhelper.helpers({
   onError: function() {
      return function(error) {
         alert("Record is not deleted!");
         console.log(error);
      };
   },
   beforeRemove: function() {
      return function(Calls, id) {
         var doc = Calls.findOne(id);
         if (confirm('Really delete "' + doc.terminalname + '"?')) {
            this.remove();
         }
      };
   }
});
