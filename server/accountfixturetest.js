if (Meteor.users.find().count() === 0) {
   var users = [
         {name:"Scopus",email:"scopus@example.com",roles:'resource-operator'},
         {name:"Borelli",email:"borelli@example.com",roles:'resource-operator'},
         {name:"Roel",email:"roel@example.com",roles:'planner'},
         {name:"Danny",email:"danny@example.com",roles:'admin', }
       ];
   
   _.each(users, function (user) {
    var id;
   
    id = Accounts.createUser({
       email: user.email,
       password: "hoi",
       profile: { name: user.name }
    });
   
    if (user.roles.length > 0) {
       // Need _id of existing user record so this call must come
       // after `Accounts.createUser` or `Accounts.onCreate`
       Roles.addUsersToRoles(id, user.roles);
    }
   
   });
}
