if (Meteor.users.find().count() === 0) {
   var users = [
         {name:"Scopus",email:"scopus@example.com", company: 'CTT', roles:'resource-operator'},
         {name:"Borelli",email:"borelli@example.com", company: 'CTT', roles:'resource-operator'},
         {name:"Roel",email:"roel@example.com", company: 'CTT', roles:'planner'},
         {name:"Danny",email:"danny.otter@gingerbreadcoders.com", company: 'Gingerbread',roles:'admin'}
       ];
   
   _.each(users, function (user) {
    var id;
   
    id = Accounts.createUser({
       password: "hoi",
       username: user.name,
       profile: {company: user.company}
    });
   
    if (user.roles.length > 0) {
       // Need _id of existing user record so this call must come
       // after `Accounts.createUser` or `Accounts.onCreate`
       Roles.addUsersToRoles(id, user.roles);
    }
   
   });
}
