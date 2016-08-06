Template.Resources.onCreated(function() {
   this.autorun(() => {
      this.subscribe('resources');
      this.subscribe('companies');
      this.subscribe('allResourceOperators');
   });
});

Template.Resources.helpers({
   resources: function() {
      return Resources.find({},{sort:{name:1}});
   },
   selectedresource: function () {
      return Resources.findOne(Session.get('selectedresourceid'));
   },
   editresources: function() {
      return Session.get('editmode');
   }
});

Template.Resources.events({
   'click .toggle-edit': function() {
      if (Session.get('editmode')) {
         console.log(this.id);
         Session.set('selectedresourceid', this._id);
      }
      else {
         Session.set('editmode', true);
         console.log(this.id);
         Session.set('selectedresourceid', this._id);
      }
   },
   'click .toggle-edit-ne': function() {
      if (Session.get('editmode')) {
         Session.set('editmode', false);
      }
   },
   'click .delete-row': function() {

   },
   'submit #updateResource': function() {
      Session.set('editmode', false);
   }

});
