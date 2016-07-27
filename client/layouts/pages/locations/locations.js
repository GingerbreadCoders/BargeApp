Template.Locations.onCreated(function() {
   this.autorun(() => {
      this.subscribe('terminals');
   });
});

Template.Locations.helpers({
   terminals: function() {
      return Terminals.find();
   },
   selectedterminal: function () {
      return Terminals.findOne(Session.get('selectedterminalid'));
   },
   editterminal: function() {
      return Session.get('editmode');
   }
});

Template.Locations.events({
   'click .toggle-edit': function() {
      if (Session.get('editmode')) {
         Session.set('selectedterminalid', this._id);
      }
      else {
         Session.set('editmode', true);
         Session.set('selectedterminalid', this._id);
      }
   },
   'click .toggle-edit-ne': function() {
      if (Session.get('editmode')) {
         Session.set('editmode', false);
      }
   },
   'click .delete-row': function() {
      
   },
   'submit #updateTerminal': function() {
      Session.set('editmode', false);
   }
     
});
