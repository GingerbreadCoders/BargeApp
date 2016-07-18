Template.Users.onCreated(function() {
  this.autorun(() => {
    this.subscribe('allUsers');
  });
});

Template.Users.helpers({
  users: function() {
    return Meteor.users.find();
  }
});
