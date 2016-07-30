Terminals = new Mongo.Collection('terminals');

TerminalSchema = new SimpleSchema({
   name: {
      type: String,
      label: 'Terminal name',
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

Terminals.attachSchema(TerminalSchema);


Terminals.allow({
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
