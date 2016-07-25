Template.Planning.onCreated(function() {
   this.autorun(() => {
      this.subscribe('calls');
      // this.subscribe('terminals');
      this.subscribe('resources');
   });
});


Template.Planning.helpers({
   calls: function() {
      var ur = Resources.findOne({owner: Meteor.user().username});
      console.log(ur.name);
      return Calls.find({resourcename: ur.name},{sort:{appointment:1}});
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
   activetab: function() {
      
   }
   
});

Template.Planning.events({
   
   'shown.bs.tab': function(e){
      var target = $(e.target).attr("id") // activated tab
      Session.set('selectedresource', target);
      Session.set('firstentry', false);
  }
   
});

