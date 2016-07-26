Calls = new Mongo.Collection('calls');

CallsSchema = new SimpleSchema({
   terminalname: {
      type: String,
      label: 'Terminal name*',
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
      label: 'Appointment*',
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
      label: 'Modality*',
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
   },
   resourcename: {
      type: String,
      label: 'Resource name',
      optional: true,
      autoform:{
         type: 'select',
         options: function() {
            return Resources.find({},{sort: {name:1}}).map(function(t){
               return {label: t.name, value: t.name};
            });
         }
      }
   },
   arrivaltime:{
      type: Date,
      label: 'Arrival',
      optional: true,
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
   departuretime:{
      type: Date,
      label: 'Departure',
      optional: true,
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
   status: {
      type: String,
      label: 'Status',
      optional: true,
      allowedValues: ['expected', 'arrived', 'departed'],
      autoform: {
         type: 'select',
         options: [{
            label: "expected",
            value: "expected"
         }, {
            label: "arrived",
            value: "arrived"
         }, {
            label: "departed",
            value: "departed"
         }]
      }
   },
   colorpan: {
      type: String,
      label: 'colorpanel',
      optional: true,
      allowedValues: ['default', 'danger', 'success'],
      autoform: {
         type: 'select',
         options: [{
            label: "default",
            value: "default"
         }, {
            label: "danger",
            value: "danger"
         }, {
            label: "success",
            value: "success"
         }]
      }
   }
   
});

Calls.attachSchema(CallsSchema);


Calls.allow({
   insert(userId, doc) {
      return !!Roles.userIsInRole(userId, ['planner', 'admin']);
   },
	update(userId, doc){
		return !!Roles.userIsInRole(userId, ['planner','resource-operator','admin']);
	},
	remove(userId, doc){
		return !!Roles.userIsInRole(userId, ['planner','admin']);
	}
});