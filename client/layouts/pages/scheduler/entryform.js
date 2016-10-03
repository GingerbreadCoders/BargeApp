
Template.Entryform.onRendered(function() {
    this.$('.datetimepicker').datetimepicker({
       format: 'LLL',
       locale: 'nl'
   });
});

Template.Entryform.helpers({

   calls: function() {
      return Calls.find({},{sort:{appointment:1}});
   },
   locations: function() {
      return Locations.find({},{sort:{name:1}});
   },
   resources: ()=> {
     return Resources.find({},{sort:{name:1}});
   }
});

Template.Entryform.events({
   'submit #submitnewentry': function(e, template) {
      e.preventDefault();
      var datetbc = e.target.appointment.value;
      // var formatted = moment(datetbc).format('LLL');
      console.log(datetbc);

      var it = Locations.findOne({name: e.target.locationname.value});

      console.log(it.type);

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

