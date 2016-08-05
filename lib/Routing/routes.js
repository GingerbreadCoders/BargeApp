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
   action: function() {
         BlazeLayout.render('MainLayout', {yield: 'Planning'});
   }
});

resourceRoutes.route('/callplanning/archive/:_id', {
   name: 'archivecall',
   action: function() {
         BlazeLayout.render('MainLayout', {yield: 'Archivecall'});
   }
});

resourceRoutes.route('/callplanning/submitETA/:_id', {
   name: 'submitetacall',
   action: function() {
         BlazeLayout.render('MainLayout', {yield: 'Submitetacall'});
   }
});

resourceRoutes.route('/archive', {
   name: 'archive',
   action: function() {
         BlazeLayout.render('MainLayout', {yield: 'Archive'});
   }
});

// Routes for the planners
plannerRoutes.route('/scheduler', {
   name: 'scheduler',
   action: function() {
         BlazeLayout.render('MainLayout', {yield: 'Scheduler'});
   }
});

// Routes for the administrators
adminRoutes.route('/users', {
   name: 'users',
   action: function() {
         BlazeLayout.render('MainLayout', {yield: 'Users'});
   }
});

adminRoutes.route('/locations', {
   name: 'locations',
   action: function() {
         BlazeLayout.render('MainLayout', {yield: 'Locations'});
   }
});

adminRoutes.route('/companies', {
   name: 'companies',
   action: function() {
         BlazeLayout.render('MainLayout', {yield: 'Companies'});
   }
});

adminRoutes.route('/resources', {
   name: 'resources',
   action: function() {
         BlazeLayout.render('MainLayout', {yield: 'Resources'});
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