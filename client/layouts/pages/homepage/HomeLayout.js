// reactive variables
var clock = new ReactiveVar(new Date());

// do when the template is created
Template.HomeLayout.onCreated( function() {
   this.autorun(() => {
      this.subscribe('callstoday');
      this.subscribe('callsfromtoday');
   });
   
Meteor.setInterval( function() {
      clock.set(new Date());
   }, 1000);
});

Template.HomeLayout.helpers({
   formattoTime: function(datetime) {
      if (datetime){
         return moment(datetime).locale("nl").format('LT');
      } else {
         return false;
      }
   },
   formattoDatetime: function(datetime) {
      if (datetime){
         return moment(datetime).locale("nl").format('DD-MM hh:mm');
      } else {
         return false;
      }
   },
   modalityicon: function(modality) {
      switch (modality) {
         case 'barge':
            return 'fa fa-ship';
            break;
         case 'rail':
            return 'fa fa-train';
            break;
            case 'truck':
            return 'fa fa-truck';
            break;
      }
   },
   datenow: function() {
      return moment(clock.get()).locale("nl").format('LLL');  
   },
   callstoday: function() {
      var start = moment().startOf('day').toDate();
      var end = moment().endOf('day').toDate();
      return Calls.find({appointment: {$gte: start, $lt: end}},{sort:{appointment:1}});
   },
   callstommorow: function() {
      var start = moment().endOf('day').toDate();
      return Calls.find({appointment: {$gte: start}},{sort:{appointment:1}});
   },
   rtsettingstoday: { fields: [
      
      { key: 'appointment', label: 'Time', fn: function(appointment, object, key){
            return moment(appointment).locale("nl").format('H:mm');
         }
      },
      { key: 'terminalname', label: 'Location' },
      { key: 'resourcename', label: 'Resource' },
      { key: 'status', label: 'Status' },
      { key: 'modality', label: '', tmpl: Template.Modalityhelper}
   ]},
   rtsettingstommorow: { fields: [
      
      { key: 'appointment', label: 'Time', fn: function(appointment, object, key){
            return moment(appointment).locale("nl").format('LLL');
         } 
      },
      { key: 'terminalname', label: 'Location' },
      { key: 'resourcename', label: 'Resource' },
      { key: 'status', label: 'Status' },
      { key: 'modality', label: '', tmpl: Template.Modalityhelper}
   ]}
});
