Template.Locations.onCreated(function() {
   this.autorun(() => {
      this.subscribe('locations');
   });
});

Template.Locations.helpers({
   locations: function() {
         return Locations.find({},{sort: {name: 1}});
   },
   selectedlocation: function () {
      return Locations.findOne(Session.get('selectedlocationid'));
   },
   editlocation: function() {
      return Session.get('editmode');
   }
});

Template.Locations.events({
   'click .toggle-edit': function() {
      if (Session.get('editmode')) {
         Session.set('selectedlocationid', this._id);
      }
      else {
         Session.set('editmode', true);
         Session.set('selectedlocationid', this._id);
      }
   },
   'click .toggle-edit-ne': function() {
      if (Session.get('editmode')) {
         Session.set('editmode', false);
      }
   },
   'click .delete-row': function() {

   },
   'submit #updateLocation': function() {
      Session.set('editmode', false);
   }

});
