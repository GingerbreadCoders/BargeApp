if (Meteor.users.find().count() === 0) {
   var users = [
         {name:"Danny Otter",email:"d.otter@ctt-twente.nl",roles:'admin'},
         {name:"Ruben Vogel",email:"scopusvogel@hotmail.com",roles:'resource-operator'},
         {name:"Patrick Hut",email:"patick@theblueworld.com",roles:'resource-operator'},
         {name:"Sven Oomens", email:"svenoomens@vaart.net", roles:'resource-operator'},
         {name:"Rein Schut", email:"r.schut@vaart.net", roles:'resource-operator'},
         {name:"Roel Cloosterman",email:"r.cloosterman@ctt-twente.nl",roles:'planner'},
         {name:"Mitchell Sikma", email:"m.sikma@ctt-twente.nl", roles: 'planner'}
       ];
   
   _.each(users, function (user) {
    var id;
   
    id = Accounts.createUser({
       password: "hoi",
       username: user.name,
       profile: {company: user.company, email: user.email}
    });
   
    if (user.roles.length > 0) {
       // Need _id of existing user record so this call must come
       // after `Accounts.createUser` or `Accounts.onCreate`
       Roles.addUsersToRoles(id, user.roles);
    }
   
   });
}
