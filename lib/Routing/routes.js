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

var resourceRoutes = FlowRouter.group({
   prefix:'/resources',
   name:'resources'
});

// Routes for the resource operators
resourceRoutes.route('/callplanning', {
   name: 'callplanning',
   action() {
      if (Roles.userIsInRole(Meteor.user(), ['admin', 'planner', 'resource-operator'])) {
         BlazeLayout.render('MainLayout', {yield: 'Planning'});
      } else {
         BlazeLayout.render('MainLayout', {yield: 'noAccess'});
      }
   }
});

// Routes for the planners
plannerRoutes.route('/scheduler', {
   name: 'scheduler',
   action() {
      if (Roles.userIsInRole(Meteor.user(), ['admin', 'planner'])) {
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

adminRoutes.route('/terminals', {
   name: 'terminals',
   action() {
      if (Roles.userIsInRole(Meteor.user(), 'admin')) {
         BlazeLayout.render('MainLayout', {yield: 'Terminals'});
      } else {
         BlazeLayout.render('MainLayout', {yield: 'noAccess'});
      }
   }
});

adminRoutes.route('/companies', {
   name: 'companies',
   action() {
      if (Roles.userIsInRole(Meteor.user(), 'admin')) {
         BlazeLayout.render('MainLayout', {yield: 'Companies'});
      } else {
         BlazeLayout.render('MainLayout', {yield: 'noAccess'});
      }
   }
});

adminRoutes.route('/resources', {
   name: 'resources',
   action() {
      if (Roles.userIsInRole(Meteor.user(), 'admin')) {
         BlazeLayout.render('MainLayout', {yield: 'Resources'});
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