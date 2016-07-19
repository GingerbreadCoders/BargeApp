FlowRouter.route('/', {
   name: 'home',
   action() {
      BlazeLayout.render('HomeLayout');
   }
});

var adminRoutes = FlowRouter.group({
   prefix:'/admin',
   name:'admin'
});

adminRoutes.route('/users', {
   name: 'users',
   action() {
      BlazeLayout.render('MainLayout', {yield: 'Users'});
   }
});

adminRoutes.route('/users/edit/', {
   name: 'editUser',
   action() {
      BlazeLayout.render('MainLayout', {yield: 'EditUser'});
   }
});
