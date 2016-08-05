Template.etatimehelper.helpers({
   formatDatetime: function(datetime) {
      if (datetime){
         return moment(datetime).locale("nl").format('D-M-YYYY H:mm');
      } else {
         return false;
      }
   }
});