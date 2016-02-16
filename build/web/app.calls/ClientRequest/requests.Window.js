/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */


Ext.ns("myclients");

myclients.winRequest =  Ext.extend(
    Ext.Window,{
        initComponent: function(){

           var config = {
                   closable:true
                  ,closeAction: "hide"
                  ,plain:true
                  ,layout: 'fit'
                  
                }; // eo config object
            // Применяем config
            
            Ext.apply(this, Ext.apply(this.initialConfig, config));
            myclients.winRequest.superclass.initComponent.apply(this, arguments);
            
            var frmReq = this.items.itemAt(0);
            var win = this;
            
            
             frmReq.on('frmRequestCancel',function(){
                 win.hide();
                // frmRequestCancel.call();
             });
             
             frmReq.on('frmRequestSave',function(){
                 frmRequestSave.call();
             });
             
              var frmRequestCancel = function(){
                    /*Запускаю своё событие, от кнопки с тулбара*/
                 this.fireEvent('frmRequestCancel');
                }
              frmRequestCancel = frmRequestCancel.createDelegate(this);
           
             var frmRequestSave = function(){
                    /*Запускаю своё событие, от кнопки с тулбара*/
                 this.fireEvent('frmRequestSave');
                }
              frmRequestSave = frmRequestSave.createDelegate(this);
           
   } // eo function initComponent
});
Ext.reg('myclientswinRequest', myclients.winRequest);


