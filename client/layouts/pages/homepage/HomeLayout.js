// reactive variables
var clock = new ReactiveVar(new Date());


// do when the template is created
Template.HomeLayout.onCreated( function() {
   this.autorun(() => {
      this.subscribe('currentcalls');
  });
   Meteor.setInterval( function() {
      clock.set(new Date());
   }, 1000);
});

  
Template.HomeLayout.helpers({
   etafield: function (status, eta, ata, atd) {
      switch(status) {
         case 'expected':
         case 'delayed' :
            if (eta) {
               return moment(eta).locale("nl").format('DD-MM HH:mm');
               break;
            } else {
               return 'not received';
               break;
            }
         case 'arrived'            :
            return moment(ata).locale("nl").format('DD-MM HH:mm');
            break;
         case 'departed':
            return moment(atd).locale("nl").format('DD-MM HH:mm');
            break;
      }
   },
   formattoTime: function(datetime) {
      if (datetime){
         return moment(datetime).locale("nl").format('LT');
      } else {
         return false;
      }
   },
   formattoDatetime: function(datetime) {
      if (datetime){
         return moment(datetime).locale("nl").format('DD-MM HH:mm');
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
   calculateStatus: function(status, appointment) {
      switch (status) {
         case 'arrived':
            return status
            break;
         case 'departed':
            return status
            break;
         case 'expected':
            if (appointment < Date.now()) {
               return 'delayed'
               break;
            } else {
               return status;
         }
      }
   },
   datenow: function() {
      return moment(clock.get()).locale("nl").format('LLL');  
   },
   callsinland: function() {
      return Calls.find({calltype: 'inland'},{sort:{appointment:1}});
   },
   callsseaport: function() {
      return Calls.find({calltype: 'seaport'},{sort:{appointment:1}});
   },
   rtsettingstoday: { fields: [
      
      { key: 'appointment', label: 'Time', fn: function(appointment, object, key){
            return moment(appointment).locale("nl").format('H:mm');
         }
      },
      { key: 'locationname', label: 'Location' },
      { key: 'resourcename', label: 'Resource' },
      { key: 'status', label: 'Status' },
      { key: 'modality', label: '', tmpl: Template.Modalityhelper}
   ]},
   rtsettingstommorow: { fields: [
      
      { key: 'appointment', label: 'Time', fn: function(appointment, object, key){
            return moment(appointment).locale("nl").format('LLL');
         } 
      },
      { key: 'locationname', label: 'Location' },
      { key: 'resourcename', label: 'Resource' },
      { key: 'status', label: 'Status' },
      { key: 'modality', label: '', tmpl: Template.Modalityhelper}
   ]}
});


Template.HomeLayout.rendered = function() {
   $('#carousel').slick({
      dots: true,
      arrows: false,
      slidesToShow: 1,
      slidesToScroll: 1,
      autoplay: true,
      autoplaySpeed: 15000,
      // fade: true,
      // cssEase: 'linear'
      // adaptiveHeight: true
   });
};  