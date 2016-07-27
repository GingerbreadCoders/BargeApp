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
      return Calls.find({resourcename: ur.name, archivedbyresource: false},{sort:{appointment:1}});
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
      if (datetime){
         return moment(datetime).locale("nl").format('LLL');
      } else {
         return false;
      }
   },
   authInProcess: function() {
      return Meteor.loggingIn();
   },
   canShow: function() {
      return !!Meteor.user();
   }
});

Template.Planning.events({
   
   'shown.bs.tab': function(e){
      var target = $(e.target).attr("id") // activated tab
      Session.set('selectedresource', target);
      Session.set('firstentry', false);
  },
     'click .arrival': function() {
      
      // set the right properties for an arrival
      var callProperties = {
         arrivaltime: Date.now(),
         status: 'arrived',
         colorpan: 'danger'
      };
      console.log(callProperties);
      Calls.update(this._id, {
         $set: callProperties
      });
   },
   'click .departure': function() {
      var callProperties = {
         departuretime: Date.now(),
         status: 'departed',
         colorpan: 'success'

      };
      console.log(callProperties);
      Calls.update(this._id, {
         $set: callProperties
      });
   },
   'click #archiveit': function() {
      Session.set('Archivecall', this._id);
      FlowRouter.go('/resources/callplanning/' + this._id);
   }
   
});