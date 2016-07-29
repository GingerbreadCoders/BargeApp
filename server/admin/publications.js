Meteor.publish('allUsers', function(){
   if(Roles.userIsInRole(this.userId,'admin')) {
      return Meteor.users.find({}, {sort:{company:1}});
   }
});

Meteor.publish('allResourceOperators', function(){
   if(Roles.userIsInRole(this.userId,'admin')) {
      return Meteor.users.find({roles:'resource-operator'}, {sort:{company:1}});
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

Meteor.publish('companies', function(){
   if(Roles.userIsInRole(this.userId, ['planner', 'admin'])) {
      return Companies.find({}, {sort:{name:1}});
   }
});

Meteor.publish('resources', function(){
   if(Roles.userIsInRole(this.userId, ['planner', 'admin', 'resource-operator'])) {
      return Resources.find({}, {sort:{name:1}});
   }
});

Meteor.publish('calls', function(){
   if(Roles.userIsInRole(this.userId,['planner', 'admin', 'resource-operator'])) {
      return Calls.find({archivedbyplanner: false}, {sort:{appointment:1}});
   }
});

Meteor.publish('callstoday', function(){
   var start = moment().subtract(24, 'hours').toDate();
   var end = moment().endOf('day').toDate();
   return Calls.find({appointment: {$gte: start, $lt: end}});

});

Meteor.publish('callsfromtoday', function(){
   var start = moment().startOf('day').toDate();
   return Calls.find({appointment: {$gte: start}});
});
