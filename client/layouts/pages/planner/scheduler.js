Template.Scheduler.onCreated(function() {
   this.autorun(() => {
      this.subscribe('calls');
      this.subscribe('terminals');
   });
});

Template.Scheduler.helpers({
   calls: function() {
      return Calls.find();
   },
   terminals: function() {
      return Terminals.find();
   }

});

// $.fn.datetimepicker.defaults = {
//     pickDate: true,                 //en/disables the date picker
//     pickTime: true,                 //en/disables the time picker
//     useMinutes: true,               //en/disables the minutes picker
//     useSeconds: false,               //en/disables the seconds picker
//     useCurrent: true,               //when true, picker will set the value to the current date/time     
//     minuteStepping:1,               //set the minute stepping
//     minDate:`1/1/1900`,               //set a minimum date
//     maxDate: '1/1/2100',     //set a maximum date (defaults to today +100 years)
//     showToday: true,                 //shows the today indicator
//     language:'ru',                  //sets language locale
//     defaultDate:"",                 //sets a default date, accepts js dates, strings and moment objects
//     disabledDates:[],               //an array of dates that cannot be selected
//     enabledDates:[],                //an array of dates that can be selected
//     icons : {
//        time: 'glyphicon glyphicon-time',
//        date: 'glyphicon glyphicon-calendar',
//        up:   'glyphicon glyphicon-chevron-up',
//        down: 'glyphicon glyphicon-chevron-down'
//     },
//     useStrict: false,               //use "strict" when validating dates  
//     sideBySide: false,              //show the date and time picker side by side
//     daysOfWeekDisabled:[]          //for example use daysOfWeekDisabled: [0,6] to disable weekends 
// };