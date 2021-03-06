Template.Users.onCreated(function() {
  this.autorun(() => {
    this.subscribe('allUsers');
    this.subscribe('allRoles');
    this.subscribe('companies');
  });
});

Template.Users.helpers({
  users: function() {
    return Meteor.users.find({},{sort:{username:1}});
  },
  roles: function() {
    return Roles.getAllRoles();
  },  
  userRole: function(){
    return this.roles[0];
  },
  dateFormat: function() {
    return moment(this.createdAt).format('D MMMM YYYY, hh:mm:ss')
  },
  selectedUser: function() {
    return Meteor.users.findOne(Session.get('selecteduserdata'));
  },
  companies: function() {
    return Companies.find();
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
    var postProperties = {
        company: e.target.company.value,
        role: e.target.role.value
      };
      
    Meteor.call('updateUser', currentUserId, postProperties);

  }
});
