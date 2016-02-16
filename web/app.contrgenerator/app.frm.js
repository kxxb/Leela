/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */


Ext.ns("app");

app.frmRequest =  Ext.extend(
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
            app.frmRequest.superclass.initComponent.apply(this, arguments);
            
            
              var frmRequestCancel = function(){
                    /*Запускаю своё событие, от кнопки с тулбара*/
                 this.fireEvent('frmCancel');
                }
              frmRequestCancel = frmRequestCancel.createDelegate(this);
           
             var frmRequestSave = function(){
                    /*Запускаю своё событие, от кнопки с тулбара*/
                 this.fireEvent('frmSave');
                }
              frmRequestSave = frmRequestSave.createDelegate(this);
           
   } // eo function initComponent
});
Ext.reg('frmRequest', app.frmRequest);



app.winRequest =  Ext.extend(
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
            app.winRequest.superclass.initComponent.apply(this, arguments);
            
            var frmReq = this.items.itemAt(0);
            var win = this;
            
            
             frmReq.on('frmCancel',function(){
                 win.hide();
                // frmRequestCancel.call();
             });
             
             frmReq.on('frmSave',function(){
                 frmRequestSave.call();
             });
             
              var frmRequestCancel = function(){
                    /*Запускаю своё событие, от кнопки с тулбара*/
                 this.fireEvent('frmCancel');
                }
              frmRequestCancel = frmRequestCancel.createDelegate(this);
           
             var frmRequestSave = function(){
                    /*Запускаю своё событие, от кнопки с тулбара*/
                 this.fireEvent('frmSave');
                }
              frmRequestSave = frmRequestSave.createDelegate(this);
           
   } // eo function initComponent
});
Ext.reg('winRequest', app.winRequest);

/*
  {name: 'ID', mapping:'ID', type: 'int'},
                {name: 'CONTRACT_NAME', mapping:'CONTRACT_NAME', type: 'string'},
                {name: 'CONTRACT_DATE', mapping:'CONTRACT_DATE', type: 'date', dateFormat: 'd.m.Y H:i'},
                {name: 'CONTRACT_DESC', mapping:'CONTRACT_DESC', type: 'string'},
                {name: 'ORDER_IN_LIST', mapping:'ORDER_IN_LIST', type: 'string'}

 **/
var ContractFormFields =   [
{
    xtype:'textfield',      // textfield
    fieldLabel:'Порядок'
    ,
    maxLength: 250
},
                                    
{
    xtype:'textfield',      // textfield
    fieldLabel:'Договор'
    ,
    maxLength: 250
},
{
                                            
    fieldLabel: 'Дата договра',
    xtype:'datefield',      // datefield
    format: 'd/m/Y',
    allowBlank:false
//,value:new Date()
}
                                      
,{
    xtype:'htmleditor',
    height:200,
    fieldLabel: 'Описание',
    anchor:'98%'
    ,
    maxLength: 250
//,handler:
}
                                      
                                        
];
    /*
      stmt.setString(4, request.getParameter("PARAGRAPH_NAME"));
              stmt.setString(5, request.getParameter("PARAGRAPH_BODY"));
              stmt.setString(6, request.getParameter("ORDER_NUMBER"));
              stmt.setString(7, request.getParameter("PARAGRAPH_DATE"));
          
     **/         
var ContractParagrapFormFields =   [
{
    xtype:'textfield',      // textfield
    fieldLabel:'Порядок',
    maxLength: 250
},
                                    
{
    xtype:'textfield',      // textfield
    fieldLabel:'Заголовок параграфа',
    maxLength: 2000
},
{
                                            
    fieldLabel: 'Дата параграфа',
    xtype:'datefield',      // datefield
    format: 'd/m/Y',
    allowBlank:false
//,value:new Date()
}
                                      
,{
    xtype:'htmleditor',
    height:200,
    fieldLabel: 'Содержание параграфа',
    anchor:'98%'
//,handler:
}
                                      
                                        
];