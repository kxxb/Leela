/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */


Ext.ns("myclients");

myclients.RootActions =  Ext.extend(
    Ext.TabPanel,{
        initComponent: function(){

           var config = {
                         region: 'center'
                         ,activeTab: 0
                         ,items: [
                            {xtype:'actionsClientsRequests'
                                       ,title:'Заявки по клиенту'    
                                       ,store : this.store
                                       ,id:'ClRequests'
                                       ,cm:new Ext.grid.ColumnModel({columns:MyRequestsColumns})
                                     }
                             ,{ 
                               title:'Звонки клиента' 
                               ,id:'ClCalls'
                               ,xtype:'actionsClientsCalls'
                            }
                            ,{ xtype: 'panel'
                               ,title:'Видимость клиента' 
                               ,items : [{xtype:'clientaccessgrid'}]
                            }
                            /*,{ xtype: 'panel'
                               ,title:'История изменения' 
                               ,html:'rights'
                            }*/
                        ] 
            }; // eo config object
            // Применяем config

            Ext.apply(this, Ext.apply(this.initialConfig, config));
            myclients.RootActions.superclass.initComponent.apply(this, arguments);

            var lMyClientsVisibilityAction = this.items.itemAt(2).items.itemAt(0);
            var lRecId = 0;
    
            lMyClientsVisibilityAction.on('addUserToClient',function(){
                 gridAddVisibility.call();
            })    
            
           lMyClientsVisibilityAction.on('editUserToClient',function(){
                 
                 gridEditVisibility.call();
            })    
            
            lMyClientsVisibilityAction.on('SetVisibilityId',function(rec_id){
                 lRecId = rec_id;
                 SetVisibilityId.call();
            })    
            
            var SetVisibilityId = function(){
             this.fireEvent('SetVisibilityId',lRecId);
            }
           SetVisibilityId = SetVisibilityId.createDelegate(this);

            
               var gridAddVisibility = function(){
                    /*Запускаю своё событие, от кнопки с тулбара*/
                 this.fireEvent('addUserToClient');
                }
              gridAddVisibility = gridAddVisibility.createDelegate(this);


            
        var gridEditVisibility = function(){
            /*Запускаю своё событие, от кнопки с тулбара*/
         this.fireEvent('editUserToClient');
        }
       gridEditVisibility = gridEditVisibility.createDelegate(this);
   
       
    
            
           
   } // eo function initComponent
});
Ext.reg('myclientsrootAction', myclients.RootActions);


