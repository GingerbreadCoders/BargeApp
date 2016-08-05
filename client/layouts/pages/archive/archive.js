Template.Archive.onCreated(function() {
   this.autorun(() => {
      this.subscribe('archivedresourcecalls');
   });
});


Template.Archive.helpers({

   archivedcalls: () => {
      return Calls.find({});
   },
   rtsettings: { fields: [
      { key: 'appointment', label: 'Appointment', tmpl: Template.appointmenthelper },
      { key: 'locationname', label: 'Location name' },
      { key: 'modality', label: 'Modality' },
      { key: 'resourcename', label: 'Resource name' },
      { key: 'status', label: 'Status' },
      { key: 'arrivaltime', label: 'Arrival', tmpl: Template.arrivaltimehelper },      
      { key: 'departuretime', label: 'Departure', tmpl: Template.departuretimehelper },
      { key: 'etafromresource', label: 'ETA', tmpl: Template.etatimehelper }
   ]}
});