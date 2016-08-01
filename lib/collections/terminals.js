Locations = new Mongo.Collection('locations');

LocationSchema = new SimpleSchema({
   name: {
      type: String,
      label: 'Location name',
      max: 30
   },
   type: {
   	type: String,
   	label: 'type',
		allowedValues: ['inland', 'seaport'],
   	autoform: {
         type: 'select',
         options: [{
            label: 'inland',
            value: 'inland'
         }, {
            label: 'seaport',
            value: 'seaport'
         }]
      }      
   }
});

Locations.attachSchema(LocationSchema);


Locations.allow({
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
