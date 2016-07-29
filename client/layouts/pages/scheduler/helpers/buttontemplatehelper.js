Template.buttonhelper.helpers({
   onError: function() {
      return function(error) {
         alert("Record is not deleted!");
         console.log(error);
      };
   },
   beforeRemove: function() {
      return function(Calls, id) {
         var doc = Calls.findOne(id);
         if (confirm('Really delete "' + doc.terminalname + '"?')) {
            this.remove();
         }
      };
   }
});
