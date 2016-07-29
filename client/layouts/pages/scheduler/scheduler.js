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
   resources: ()=> {
     return Resources.find(); 
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
      if (datetime){
         return moment(datetime).locale("nl").format('LLL');
      } else {
         return false;
      }
   },
   rtsettings: { fields: [
      { key: 'appointment', label: 'Appointment', tmpl: Template.appointmenthelper },
      { key: 'terminalname', label: 'Terminal name' },
      { key: 'modality', label: 'Modality' },
      { key: 'resourcename', label: 'Resource name' },
      { key: 'status', label: 'Status' },
      { key: 'arrivaltime', label: 'Arrival', tmpl: Template.arrivaltimehelper },      
      { key: 'departuretime', label: 'Departure', tmpl: Template.departuretimehelper },
      { key: 'archivedbyresource', label: 'Done' },
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
   'click .archivecall': function() {
     Calls.update(this._id, {$set: {archivedbyplanner: true}});
   },
   
   'submit #updateCall': function(e) {
      e.preventDefault();
      Session.set('editmode', false);
   }
});