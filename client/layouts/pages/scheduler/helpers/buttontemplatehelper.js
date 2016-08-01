Template.buttonhelper.helpers({
   onError: function() {
      return function(error) {
         alert("Record is not deleted!");
      };
   },
   beforeRemove: function() {
      return function(Calls, id) {
         var doc = Calls.findOne(id);
         if (confirm('Really delete "' + doc.locationname + '"?')) {
            this.remove();
         }
      };
   }
});
