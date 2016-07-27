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
      { key: 'modality', label: '' }
   ]},
   rtsettingstommorow: { fields: [
      
      { key: 'appointment', label: 'Time', fn: function(appointment, object, key){
            return moment(appointment).locale("nl").format('LLL');
         } 
         
      },
      { key: 'terminalname', label: 'Location' },
      { key: 'resourcename', label: 'Resource' },
      { key: 'status', label: 'Status' },
      { key: 'modality', label: '' }
   ]}
});


