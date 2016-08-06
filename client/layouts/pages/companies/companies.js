// var sorting = new ReactiveVar(1);

Template.Companies.onCreated(function() {
   this.autorun(() => {
      this.subscribe('companies');
   });
});

Template.Companies.helpers({
   companies: function() {
      return Companies.find({},{sort: {name: 1}});
   },
   selectedcompany: function () {
      return Companies.findOne(Session.get('selectedcompanyid'));
   },
   editcompany: function() {
      return Session.get('editmode');
   }
});

Template.Companies.events({
   'click .toggle-edit': function() {
      if (Session.get('editmode')) {
         Session.set('selectedcompanyid', this._id);
      }
      else {
         Session.set('editmode', true);
         Session.set('selectedcompanyid', this._id);
      }
   },
   'click .toggle-edit-ne': function() {
      if (Session.get('editmode')) {
         Session.set('editmode', false);
      }
   },
   'click .delete-row': function() {

   },
   'submit #updateCompany': function() {
      Session.set('editmode', false);
      // sorting.set(-1);
      // sorting.set(1);
   }

});
