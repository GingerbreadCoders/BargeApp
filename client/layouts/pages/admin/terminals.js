Template.Terminals.onCreated(function() {
   this.autorun(() => {
      this.subscribe('terminals');
   });
});

Template.Terminals.helpers({
   terminals: function() {
      return Terminals.find();
   }

});
