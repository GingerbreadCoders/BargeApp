Template.Users.onCreated(function() {
  this.autorun(() => {
    this.subscribe('allUsers');
    this.subscribe('allRoles');
  });
});

Template.Users.helpers({
  users: function() {
    return Meteor.users.find();
  },
  userRole: function(){
    return this.roles[0];
  },
  dateFormat: function() {
    return moment(this.createdAt).format('D MMMM YYYY, hh:mm:ss')
  },
  selectedUser: function() {
    return Meteor.users.findOne(Session.get('selecteduserdata'));
  }
  
});

Template.Users.events({

  'click .edit-user': function() {
    Session.set('selecteduserdata', this._id);
    Session.set('edittoggle', true);
  },

  'submit form': function(e) {
    e.preventDefault();
    var currentUserId = Session.get('selecteduserdata');
    const targetCompany = e.company;
    console.log (e.target.company.value);
    var postProperties = {
        company: e.target.company.value,
        role: e.target.role.value
      };
      
    Meteor.call('updateUser', currentUserId, postProperties);

  }
});
