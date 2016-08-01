Template.Scheduler.onCreated(function() {
   this.autorun(() => {
      this.subscribe('calls');
      this.subscribe('locations');
      this.subscribe('resources');
   });
});

Template.Editform.onRendered(function() {
    this.$('.datetimepicker').datetimepicker({
       format: 'LLL',
       language: 'nl'
    });
});

Template.Editform.helpers({

   calls: function() {
      return Calls.find({},{sort:{appointment:1}});
   },
   locations: function() {
      return Locations.find();
   },
   resources: ()=> {
     return Resources.find(); 
   }

});

Template.Editform.events({
   'submit': function(e) {
   e.preventDefault();
   Session.set('entrymode', false);
   var it = Locations.findOne({name: e.target.locationname.value});
   Calls.insert({
      locationname: e.target.locationname.value,
      appointment: e.target.appointment.value,
      modality: e.target.modality.value,
      resourcename: e.target.resource.value,
      status: "expected",
      colorpan: "default",
      archivedbyresource: false,
      archivedbyplanner: false,
      callowner: Meteor.user().username,
      callcompany: Meteor.user().profile.company,
      calltype: it.type
   });
   Session.set('entrymode', false);
   }
});
   
