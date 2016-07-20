Calls = new Mongo.Collection('calls');

console.log(function(){Terminals.find();});

CallsSchema = new SimpleSchema({
   terminalname: {
      type: String,
      label: 'Terminal name',
      autoform:{
         type: 'select',
         options: function() {
            return Terminals.find({},{sort: {name:1}}).map(function(t){
               return {label: t.name, value: t.name};
            });
         }
         
      }
   },
   appointment: {
      type: Date,
      autoform: {
         afFieldInput: {
            type: "bootstrap-datetimepicker",
            dateTimePickerOptions: {
               format: 'DD-MM-YYYY HH:mm',
               today: true,
               timezoneId: 'Europe/Amsterdam'
            }
         }
      }
   },
   modality: {
      type: String,
      allowedValues: ['barge', 'rail', 'truck'],
      autoform: {
         type: 'select',
         options: [{
            label: "barge",
            value: "barge"
         }, {
            label: "rail",
            value: "rail"
         }, {
            label: "truck",
            value: "truck"
         }]
      }
   }
});

Calls.attachSchema(CallsSchema);


Calls.allow({
   insert(userId, doc) {
      return !!Roles.userIsInRole(userId, ['planner', 'admin']);
   }
});
