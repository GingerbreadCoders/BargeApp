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
   name: 'admin',
   action() {
      BlazeLayout.render('MainLayout', {yield: 'Users'});
   }
});
