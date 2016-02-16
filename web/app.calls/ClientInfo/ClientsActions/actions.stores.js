/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */


 StoreClRequests =  new Ext.data.JsonStore({
                    root: 'results',
                    totalProperty: 'totalCount',
                    idProperty: 'ID',
                    baseParams:{mode:'clients'},
                    fields: Fields_ReqClient,
                    proxy : proxy_ReqClient
                    
                  });
                  
StoreClCalls =  new Ext.data.JsonStore({
                    root: 'results',
                    totalProperty: 'totalCount',
                    idProperty: 'ID',
                    //baseParams:{cid:lCid},
                    fields: Fields_CallsClient,
                    proxy : proxy_CallsClients
                  });                  
                  
StoreClVisibility =  new Ext.data.JsonStore({
                     root: 'results',
                     totalProperty: 'totalCount',
                     idProperty: 'ID',
                     //baseParams:{mode:'clients'},
                     fields: Fields_ReqClient,
                     proxy : proxy_VisibilityClient
                  });                                    
                  
