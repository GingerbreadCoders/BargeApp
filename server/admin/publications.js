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

Meteor.publish('terminals', function(){
   if(Roles.userIsInRole(this.userId, ['planner', 'admin'])) {
      return Terminals.find({});
   }
});

Meteor.publish('calls', function(){
   if(Roles.userIsInRole(this.userId,['planner', 'admin'])) {
      return Calls.find({});
   }
});

