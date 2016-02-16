/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */


Ext.ns("app");

//Ext.extend(UniversalReqGrid, Ext.grid.EditorGridPanel);
//var store_it = new app.store_j1({baseParams: {mode: 'AllRequests'}});

app.calls_tab =  Ext.extend(
    Ext.TabPanel,{
        initComponent: function(){

           var config = {
                plain:true
                ,activeTab: 0

                ,defaults:{
                    autoScroll: true
                }
                ,items:[
                    
                    { xtype:'tabpanel'
                     ,plain:true   
                     ,activeTab: 0
                     ,title:'Входящие звонки'
                     ,items:[
                         {xtype:'callstab'
                         ,title:'Звонки'

                         }
                         ,{xtype:'rootchartpan'
                         ,title:'Сводная информация'

                         }
//                         ,{xtype:'rootchartpancharact'
//                         ,title:'Сводная информация по характеру'
//
//                         }
                         
                        ]
                     }
                     
                     ,{xtype:'client_request_root_panel'
                      ,title:'Заявки клиентов'   
                      }
                     ,{xtype:'myclientsroot'
                     ,title:'Мои клиенты'
                     }
                     
                     
                ]
            }; // eo config object


            Ext.apply(this, Ext.apply(this.initialConfig, config));
            app.calls_tab.superclass.initComponent.apply(this, arguments);

        }

 });
Ext.reg('calls_root_tab', app.calls_tab);
// }}}