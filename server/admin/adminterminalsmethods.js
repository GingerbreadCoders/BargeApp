Meteor.methods ({
   
   addTerminal: function(terminal) {
      check(terminal, Terminal.simpleSchema());
      
   }
   
});
