/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

Ext.ns("clients");
//
//var depTreeLoader =  new Ext.tree.TreeLoader({
//         dataUrl: '../stores/req/tree/getter_deptree.jsp'
//         });

var ClTreeLoader =  new Ext.tree.TreeLoader({
         dataUrl: '../stores/clients/tree/getter_clcontactstree.jsp'
         });
         
         
var ClRoot = new Ext.tree.AsyncTreeNode({
        text: 'Отделы',
        id: '1'
    });         

clients.ContactsTree =  Ext.extend(
    Ext.tree.TreePanel,{


        initComponent: function(){

            var config_tree = {
                
                 anchor:"100%"
                ,autoScroll: true
                ,containerScroll: true
                ,border: false
                ,rootVisible: false
                //,width : 250
                ,height : 250
                ,animate:true
                ,enableDD:false
                    
                ,dataUrl: '../stores/clients/tree/getter_clcontactstree.jsp?p_user_id='+gUserId
                ,root: {
                
                    nodeType: 'async',
                    text: 'Ext JS',
                    draggable: false,
                    id: 'source'
                }
                ,tbar:[
                  '-'
                ,{
                 text: 'Добавить клиента'
                 ,tooltip: 'Добавить клиента'
                 ,iconCls:'silk-user-add'
                 ,handler: function(){
                     
                   NewClientAdd.call()
                 }
                }
                ,'-'
                ,{
                 text: 'Добавить заявку'
                 ,tooltip: 'Добавить заявку'
                 ,iconCls:'silk-add'
                 ,handler: function(){
                    NewClientRequestAdd.call()
                 }
                }
                ,'-'
                ,{
                 text: 'Обновить список'
                 ,tooltip: 'Обновить список'
                 ,iconCls:'silk-table-refresh'
                 ,handler: function(){
                    RefreshTree.call()
                 }
                }
                ,'-'
                ]
                

            }; // eo config object



            Ext.apply(this, Ext.apply(this.initialConfig, config_tree));
            clients.ContactsTree.superclass.initComponent.call(this, arguments);
            
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
        
        
      } 
          
           

 });
Ext.reg('ClientsContactsTree', clients.ContactsTree);



