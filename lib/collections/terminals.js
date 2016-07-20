Terminals = new Mongo.Collection('terminals');

TerminalSchema = new SimpleSchema({
   name: {
      type: String,
      label: 'Terminal name',
      max: 30
   } 
});

Terminals.attachSchema(TerminalSchema);


Terminals.allow({
	insert(userId, doc){
		return !!Roles.userIsInRole(userId, 'admin');
	}
});
