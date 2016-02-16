/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */


Ext.ns("myclients");

myclients.frmRequest =  Ext.extend(
    Ext.FormPanel,{
        initComponent: function(){

           var config = {
                    frame: true,
                    bodyStyle: 'padding:5px'
                    //width: 850,
                    ,anchor:'95%'
                    ,buttons: [{
                        text: 'Сохранить',
                        handler: function(){
                           frmRequestSave.call();
                            
                         }
                     }
                   , {
                        text: 'Отмена',
                        handler: function(){
                           frmRequestCancel.call();
//                            NewRequestWin.items.itemAt(0).getForm().reset();
//                            NewRequestWin.hide();
//                            StoreClRequests.reload();
                        }
                    }]
                }; // eo config object
            // Применяем config
            
            Ext.apply(this, Ext.apply(this.initialConfig, config));
            myclients.frmRequest.superclass.initComponent.apply(this, arguments);
            
            
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
Ext.reg('myclientsfrmRequest', myclients.frmRequest);


