/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

Ext.ns("myclients");
myclients.ClId = 0;

myclients.RootClientsInfo =  Ext.extend(
    Ext.Panel,{
        initComponent: function(){

           var config = {
                //plain:true
                layout: 'border'
                ,region: 'west'
                ,split: true
                ,height:300
                ,width:400
                ,items:[
                   
                   {
                    xtype:'ClientsContactsTree'
                   ,region:'north'
                   }
                   ,{ xtype:'clientdescpan'
                    ,title:'Карточка клиента'    
                   }  
                   
                ]
            }; // eo config object
            // Применяем config

            Ext.apply(this, Ext.apply(this.initialConfig, config));
            myclients.RootClientsInfo.superclass.initComponent.apply(this, arguments);


             var lClientTree= this.items.itemAt(0); 
             var clientDescPanel= this.items.itemAt(1); 
             
             lClientTree.expandAll();
             lClientTree.getSelectionModel().on('selectionchange', function(tree, node){
                                    clientAccessStore.load({params:{client_id: node.id}});
                                    app_store_Client_calls.load({params:{start:0,limit:100,client_id: node.id}});
                                    DetectClientInfo(node.id);
                                    setLCid(node.id);
                                    myclients.ClId = node.id;
                    //Ext.Msg.alert('Сообщение.','Клиент '+node.id);
             })

                   

              var setLCid = function(p_cid){
                    /*Запускаю своё событие, от кнопки с тулбара*/
                 this.fireEvent('setLCid',p_cid);
                 //Ext.Msg.alert('Error','Ошибка связи '+p_cid);
                }
              setLCid = setLCid.createDelegate(this);

            
            var NewClientAdd = function(){
                    /*Запускаю своё событие, от кнопки с тулбара*/
                 this.fireEvent('NewClient');
                 
                }
              NewClientAdd = NewClientAdd.createDelegate(this);
            
            var NewClientRequestAdd = function(){
                    /*Запускаю своё событие, от кнопки с тулбара*/
                 this.fireEvent('NewClientsRequest');
                }
              NewClientRequestAdd = NewClientRequestAdd.createDelegate(this);  
            
            
            var RefreshTree = function(){
                    /*Запускаю своё событие, от кнопки с тулбара*/
                 this.fireEvent('RefreshTree');
                 
                }
              RefreshTree = RefreshTree.createDelegate(this);
            
            lClientTree.on('NewClientsRequest',function(){
                NewClientRequestAdd.call();
            });
            
            
            lClientTree.on('NewClient',function(){
                NewClientAdd.call();
            });
            
            
            lClientTree.on('RefreshTree',function(){
                RefreshTree.call();
            });
            
             function DetectClientInfo(client_id){
               var detect_client_conn = new Ext.data.Connection();
                   detect_client_conn.request({
                      url: '../stores/client_request/helper/Detect_Client.jsp',
                      params: {
                          p_client_id:client_id
                         ,p_user_id: gUserId
                      },
                      success: function(resp,opt) {
                         
                        clientDescPanel.tpl.overwrite(clientDescPanel.body, {CLIENT_INFO:resp.responseText}); 
                        //lClientPan.tpl.overwrite(lClientPan.body, {CLIENT_INFO:resp.responseText});   
                      

                      },
                      failure: function(resp,opt) {
                         Ext.Msg.alert('Error','Ошибка связи');
                      }
                    });
                
                
            }
            
   } // eo function initComponent

});
Ext.reg('myclientsRootClientsInfo', myclients.RootClientsInfo);


app.ClientDescPanel =  Ext.extend(Ext.Panel,{
    initComponent: function(){
      var config = {
          region:'center'
         //,autoScroll : 1
         //,split: true 
         ,tpl:new Ext.XTemplate('{CLIENT_INFO}')
      };
           Ext.apply(this, Ext.apply(this.initialConfig, config));
           app.ClientDescPanel.superclass.initComponent.apply(this, arguments);
   } // eo function initComponent

});
Ext.reg('clientdescpan', app.ClientDescPanel);

app.ClientsTreePanel =  Ext.extend(Ext.Panel,{
    initComponent: function(){
      var config = {
          height:350
         ,autoScroll : 1
          ,split: true
         ,region:'north'
         ,tbar: [ {
             text: 'Добавить клиента',
             tooltip: 'Добавить клиента',
             iconCls:'silk-user-add',
              handler:function(){addClient.call()}
          }]
         ,items:[ {xtype:'clientsgrid'} ]
      };
           Ext.apply(this, Ext.apply(this.initialConfig, config));
           app.ClientsTreePanel.superclass.initComponent.apply(this, arguments);
           
          var addClient = function(){
              this.fireEvent('addClient');
          };
          addClient = addClient.createDelegate(this);
   } // eo function initComponent

});
Ext.reg('clientstreecpan', app.ClientsTreePanel);