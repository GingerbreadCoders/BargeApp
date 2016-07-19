// Home route
FlowRouter.route('/', {
   name: 'home',
   action() {
      BlazeLayout.render('HomeLayout');
   }
});

// Defining FlowRouter groups
var adminRoutes = FlowRouter.group({
   prefix:'/admin',
   name:'admin'
});

var plannerRoutes = FlowRouter.group({
   prefix:'/planning',
   name:'planning'
});


// Routes for the planners
plannerRoutes.route('/scheduler', {
   name: 'scheduler',
   action() {
      if (Meteor.user()) {
         BlazeLayout.render('MainLayout', {yield: 'Scheduler'});
      } else {
         BlazeLayout.render('MainLayout', {yield: 'noAccess'});
      }
   }
});

// Routes for the administrators
adminRoutes.route('/users', {
   name: 'users',
   action() {
      if (Roles.userIsInRole(Meteor.user(), 'admin')) {
         BlazeLayout.render('MainLayout', {yield: 'Users'});
      } else {
         BlazeLayout.render('MainLayout', {yield: 'noAccess'});
      }
   }
});

// Route for when there is no route
FlowRouter.notFound = {
    // Subscriptions registered here don't have Fast Render support.
    subscriptions: function() {

    },
    action: function() {
      BlazeLayout.render('MainLayout', {yield: 'NotFound'});
    }
};