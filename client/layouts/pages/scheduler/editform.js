Template.Scheduler.onCreated(function() {
   this.autorun(() => {
      this.subscribe('calls');
      this.subscribe('terminals');
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
   terminals: function() {
      return Terminals.find();
   },
   resources: ()=> {
     return Resources.find(); 
   }

});

Template.Editform.events({
   'submit': function(e) {
   e.preventDefault();
   Session.set('entrymode', false);
   console.log(Meteor.user().profile.company);
   Calls.insert({
      terminalname: e.target.terminalname.value,
      appointment: e.target.appointment.value,
      modality: e.target.modality.value,
      resourcename: e.target.resource.value,
      status: "expected",
      colorpan: "default",
      archivedbyresource: false,
      archivedbyplanner: false,
      callowner: Meteor.user().username,
      callcompany: Meteor.user().profile.company
   });
   Session.set('entrymode', false);
   }
});
   
