/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */


Ext.ns("app");


app.ClientRequestRootPanel =  Ext.extend(
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
                           ,title:'Мои заявки'    
                           ,id:'my_req'
                           //,store:store_My_reqclients
                           
                           ,store : new Ext.data.JsonStore({
                                        root: 'results',
                                        totalProperty: 'totalCount',
                                        idProperty: 'ID',
                                        baseParams:{mode:'broker',user_id:gUserId},
                                        fields: Fields_ReqClient,
                                        proxy : proxy_ReqClient
                                })
                           
                           ,cm:new Ext.grid.ColumnModel({columns:MyRequestsColumns})
                         }
                        ,{xtype:'requestsMyrequests'
                         ,title:'Заявки коммерческого отдела'    
                         //,store: store_My_Dep_reqclients
                         ,id:'my_dep'
                         ,store : new Ext.data.JsonStore({
                                        root: 'results',
                                        totalProperty: 'totalCount',
                                        idProperty: 'ID',
                                        baseParams:{mode:'commercial_dep'},
                                        fields: Fields_ReqClient,
                                        proxy : proxy_ReqClient
                                })
                         ,cm:new Ext.grid.ColumnModel({columns:MyRequestsColumns})
                        }
                        
                        ,{xtype:'requestsMyrequests'
                         ,title:'Заявки торговой недвижимости'    
                         //,store: store_My_Dep_reqclients
                         ,id:'retail_dep'
                         ,store : new Ext.data.JsonStore({
                                        root: 'results',
                                        totalProperty: 'totalCount',
                                        idProperty: 'ID',
                                        baseParams:{mode:'retail_dep'},
                                        fields: Fields_ReqClient,
                                        proxy : proxy_ReqClient
                                })
                         ,cm:new Ext.grid.ColumnModel({columns:MyRequestsColumns})
                        }
                        ,{xtype:'requestsMyrequests'
                         ,title:'Заявки офисной недвижимости'    
                         //,store: store_My_Dep_reqclients
                         ,id:'office_dep'
                         ,store : new Ext.data.JsonStore({
                                        root: 'results',
                                        totalProperty: 'totalCount',
                                        idProperty: 'ID',
                                        baseParams:{mode:'office_dep'},
                                        fields: Fields_ReqClient,
                                        proxy : proxy_ReqClient
                                })
                         ,cm:new Ext.grid.ColumnModel({columns:MyRequestsColumns})
                        }
                        
                        ,{xtype:'requestsMyrequests'
                         ,title:'Заявки элитной недвижимости'    
                         ,id:'dep_luxury'
                         ,store : new Ext.data.JsonStore({
                                        root: 'results',
                                        totalProperty: 'totalCount',
                                        idProperty: 'ID',
                                        baseParams:{mode:'luxury_dep'},
                                        fields: Fields_ReqClient,
                                        proxy : proxy_ReqClient
                                })
                         ,cm:new Ext.grid.ColumnModel({columns:MyRequestsColumns})
                        }
                        ,{xtype:'requestsMyrequests'
                         ,title:'Заявки загородной недвижимости'    
                         //,store:store_Suburban_Dep_reqclients
                         ,id:'dep_suburban'
                         ,store : new Ext.data.JsonStore({
                                        root: 'results',
                                        totalProperty: 'totalCount',
                                        idProperty: 'ID',
                                        baseParams:{mode:'suburban_dep'},
                                        fields: Fields_ReqClient,
                                        proxy : proxy_ReqClient
                                })
                         ,cm:new Ext.grid.ColumnModel({columns:MyRequestsColumns})
                        }
                        ,{xtype:'requestsMyrequests'
                         ,title:'Все заявки компании'    
                         //,store:store_All_Company_reqclients
                         ,id:'all_company1'
                         ,store : new Ext.data.JsonStore({
                                        root: 'results',
                                        totalProperty: 'totalCount',
                                        idProperty: 'ID',
                                        baseParams:{mode:'all_company'},
                                        fields: Fields_ReqClient,
                                        proxy : proxy_ReqClient
                                })
                         ,cm:new Ext.grid.ColumnModel({columns:MyRequestsColumns})
                        }
                     ]
                        
                    
            }; // eo config object


            Ext.apply(this, Ext.apply(this.initialConfig, config));
            
            app.ClientRequestRootPanel.superclass.initComponent.apply(this, arguments);
            
            
        }

 });
Ext.reg('client_request_root_panel', app.ClientRequestRootPanel);
// }}}