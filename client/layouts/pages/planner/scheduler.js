Template.Scheduler.onCreated(function() {
   this.autorun(() => {
      this.subscribe('calls');
      this.subscribe('terminals');
   });
});

Template.Scheduler.helpers({
   calls: function() {
      return Calls.find();
   },
   terminals: function() {
      return Terminals.find();
   }

});