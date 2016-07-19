
Meteor.publish('terminals', function(){
   if(Roles.userIsInRole(this.userId,'admin')) {
      return Terminals.find({});
   }
});
