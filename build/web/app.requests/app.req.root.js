/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 * 
 * Новая корневая оптимизированная вкладка для ИТ и PR отделов
 * 
 */

Ext.ns("app");


app.RequestRootPanel =  Ext.extend(
    Ext.TabPanel,{
        initComponent: function(){

           var config = {
                 plain:true
                ,activeTab: 0
                ,defaults:{
                    autoScroll: true
                }
                     
                     
                     ,items:[
                         {xtype:'requestsMyrequests'
                           ,title:'Заявки'    
                           ,id:'my_dep_req'
                           //,store:store_My_reqclients
                           
                           ,store : new Ext.data.JsonStore({
                                        root: 'results',
                                        totalProperty: 'totalCount',
                                        idProperty: 'ID',
                                        baseParams:{mode: 'AllRequests',user_id : gUserId},
                                        fields: fields_req,
                                        proxy : proxy_req
                                })
                           
                           ,cm:new Ext.grid.ColumnModel({columns:it_edit_all})
                         }
                        ,{xtype:'requestsMyrequests'
                         ,title:'Заявки для меня'    
                         //,store: store_My_Dep_reqclients
                         ,id:'req_for_me'
                         ,store : new Ext.data.JsonStore({
                                        root: 'results',
                                        totalProperty: 'totalCount',
                                        idProperty: 'ID',
                                        baseParams:{mode:'ForMeRequests',user_id:gUserId},
                                        fields: fields_req,
                                        proxy : proxy_req
                                })
                         ,cm:new Ext.grid.ColumnModel({columns:it_edit_for_me})
                        }
                        
                        ,{xtype:'requestsMyrequests'
                         ,title:'Заявки в отдел IT'    
                         //,store: store_My_Dep_reqclients
                         ,id:'it_dep_req'
                         ,store : new Ext.data.JsonStore({
                                        root: 'results',
                                        totalProperty: 'totalCount',
                                        idProperty: 'ID',
                                        baseParams:{mode: 'MyRequests',user_id : gUserId,dep_id : 1},
                                        fields: fields_req,
                                        proxy : proxy_req
                                })
                         ,cm:new Ext.grid.ColumnModel({columns:it_view})
                        }
                        ,{xtype:'requestsMyrequests'
                         ,title:'Заявки в отдел маркетинга'    
                         //,store: store_My_Dep_reqclients
                         ,id:'pr_dep_req'
                         ,store : new Ext.data.JsonStore({
                                        root: 'results',
                                        totalProperty: 'totalCount',
                                        idProperty: 'ID',
                                        baseParams:{mode: 'MyRequests',user_id : gUserId,dep_id : 3},
                                        fields: fields_req,
                                        proxy : proxy_req
                                })
                         ,cm:new Ext.grid.ColumnModel({columns:it_view})
                        }
                        /*
                         *Здесь старая вкладка для юридического отдела
                         **/
                        
                     ]
                        
                    
            }; // eo config object


            Ext.apply(this, Ext.apply(this.initialConfig, config));
            
            app.RequestRootPanel.superclass.initComponent.apply(this, arguments);
            
            
        }

 });
Ext.reg('root_panel', app.RequestRootPanel);
// }}}
