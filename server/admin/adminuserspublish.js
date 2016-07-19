Meteor.publish('allUsers', function(){
   if(Roles.userIsInRole(this.userId,'admin')) {
      return Meteor.users.find({});
   }
});

Meteor.publish('allRoles', function(){
   if(Roles.userIsInRole(this.userId,'admin')) {
      return Meteor.roles.find({});
   }
});
