Companies = new Mongo.Collection('companies');

CompanySchema = new SimpleSchema({
   name: {
      type: String,
      label: 'Company name',
      max: 30
   }
});

Companies.attachSchema(CompanySchema);


Companies.allow({
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
