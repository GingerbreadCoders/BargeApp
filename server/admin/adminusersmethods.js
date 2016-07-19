Meteor.methods({
  /**
   * delete a user from a specific group
   *
   * @method updateUser
   * @param {String} targetUserId _id of user to update
   * @param {Object} targetProperties are properties to update
   */
  updateUser: function (targetUserId, targetProperties) {
    var loggedInUser = Meteor.user()

    if (!loggedInUser ||
        !Roles.userIsInRole(loggedInUser,
                            ['admin'])) {
      throw new Meteor.Error(403, "Access denied");
    }

    // update the user fields
    Meteor.users.update({_id: targetUserId}, {$set: {"profile.company": targetProperties.company}});
    Roles.setUserRoles(targetUserId, targetProperties.role);
  
  }
  
});