var start = new ReactiveVar(moment().subtract(24, 'hours').toDate());
var end = new ReactiveVar(moment().add(36, 'hours').toDate());

Meteor.setInterval( function() {
   start.set(moment().subtract(24, 'hours').toDate());
   end.set(moment().add(36, 'hours').toDate());
}, 60000);

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

Meteor.publish('locations', function(){
   if(Roles.userIsInRole(this.userId, ['planner', 'admin'])) {
      return Locations.find({}, {sort:{name:1}});
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

Meteor.publish('currentcalls', function() {
   this.autorun(function (computation) {
      return Calls.find({appointment: {$gte: start.get(), $lt: end.get()}});
  });
});


