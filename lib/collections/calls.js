Calls = new Mongo.Collection('calls');

CallsSchema = new SimpleSchema({
   terminalname: {
      type: String,
      label: 'Terminal name',
      max: 30
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
