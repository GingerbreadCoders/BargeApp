Meteor.publish('allUsers', function(){
   if(Roles.userIsInRole(this.userId,'admin')) {
      return Meteor.users.find({}, {sort:{company:1}});
   }
});

Meteor.publish('allRoles', function(){
   if(Roles.userIsInRole(this.userId,'admin')) {
      return Meteor.roles.find({});
   }
});

Meteor.publish('terminals', function(){
   if(Roles.userIsInRole(this.userId, ['planner', 'admin'])) {
      return Terminals.find({}, {sort:{name:1}});
   }
});

Meteor.publish('calls', function(){
   if(Roles.userIsInRole(this.userId,['planner', 'admin'])) {
      return Calls.find({});
   }
});

