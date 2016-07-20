Resources = new Mongo.Collection('resources');

ResourceSchema = new SimpleSchema({
   name: {
      type: String,
      label: 'Resource name',
      max: 30
   },
   owner: {
      type: 'String',
      label: 'Resource Operator',
      autoform:{
         type: 'select',
         options: function() {
            return Meteor.users.find({roles:'resource-operator'},{sort: {username:1}}).map(function(t){
               return {label: t.username, value: t.username};
            });
         }
         
      }
   },
   forcompany: {
      type: 'String',
      label: 'Operated for Company',
      autoform:{
         type: 'select',
         options: function() {
            return Companies.find({},{sort: {name:1}}).map(function(t){
               return {label: t.name, value: t.name};
            });
         }
         
      }
   }
});

Resources.attachSchema(ResourceSchema);


Resources.allow({
	insert(userId, doc){
		return !!Roles.userIsInRole(userId, 'admin');
	},
	update(userId, doc){
		return !!Roles.userIsInRole(userId, 'admin');
	},
	remove(userId, doc){
		return !!Roles.userIsInRole(userId, 'admin');
	}
});
