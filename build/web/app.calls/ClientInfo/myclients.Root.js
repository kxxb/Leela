/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */


Ext.ns("myclients");



myclients.RootTab =  Ext.extend(
    Ext.Panel,{
        initComponent: function(){

           var config = {
                  //region: 'south'
                   split: true
                  ,layout: 'border'
                  //,height:200
                  ,items : [
                       /*client info */
                        {xtype: 'myclientsRootClientsInfo'}
                       /*clients actions**/
                       ,{xtype:'myclientsrootAction'
                          
                       }
                ]
            }; // eo config object
            // Применяем config

            Ext.apply(this, Ext.apply(this.initialConfig, config));
            myclients.RootTab.superclass.initComponent.apply(this, arguments);

            var lMyClientsRootClientInfo = this.items.itemAt(0);
            var lMyClientsRootAction = this.items.itemAt(1);
            var lcid="0";
             lVisibilityRecId =0;
            var e; 
            var lClTree = lMyClientsRootClientInfo.items.itemAt(0)
            
            
            lMyClientsRootAction.on('addUserToClient',function(){
                    if (e==0) {
                        Ext.Msg.alert('Root','Нет прав для редактирования данного клиента');  
                       } else {
                        Ext.Msg.alert('Root','Edit user to client '+lVisibilityRecId);  
                       }  
            })
            
            
            lMyClientsRootAction.on('SetVisibilityId',function(rec_id){
                   SetVisbility(rec_id);
            })
            
            lMyClientsRootAction.on('editUserToClient',function(){
                
                   if (lVisibilityRecId == 0) {
                       Ext.Msg.alert('Редактирование видимости клиента','Выбирите сотрудника из таблицы ниже');  
                   } else {
                      
                       if (e==0) {
                        Ext.Msg.alert('Root','Нет прав для редактирования данного клиента ');  
                       } else {
                        Ext.Msg.alert('Root','Edit user to client ' +e+' u '+ gUserId+' c '+lcid);  
                       }  
                   }
                   
            })
            
            
            
            lMyClientsRootClientInfo.on('setLCid',function(cid){
                fn_checkAccesToClient(gUserId, cid);
                lcid = cid;
                SetVisbility(0);
                CallsRowIndex = -1;
                RequestsRowIndex = -1;
                StoreClRequests.reload({params: {mode:'clients',cid:cid}});  
                StoreClCalls.reload({params: {cid:cid}});  
                
                
                
                //lMyClientsRootAction.items.itemAt(1).items.itemAt(0).tpl.overwrite(lMyClientsRootAction.items.itemAt(1).items.itemAt(0).body, '');
                
            })
            
            lMyClientsRootClientInfo.on('NewClient',function(){
                NewRequestWin.show();
                
            });
            lMyClientsRootClientInfo.on('NewClientsRequest',function(){
                
                if (lcid == "0") {
                    Ext.Msg.alert('Клиент','Выбирите клиента из списка.');
                } else 
                {
                    ClientsNewRequestWin.show();
                }
            }); 

      lMyClientsRootClientInfo.on('RefreshTree',function(){
                RefreshTree();
                
            });


    function RefreshTree(){
        lClTree.getRootNode().reload();
        lClTree.expandAll();	

    }
      
    function SetVisbility(n){
        lVisibilityRecId = n;
    }      

/*Окно для создания клиента и его заявки*/

 NewRequestWin = new  myclients.winRequest({
      title:'Новый клиент и его заявка'
     ,width: 850
     ,height: 500
     ,items:[{xtype:'myclientsfrmRequest'
           ,items: NewReqFormFields  
         }]
 });
 
 NewRequestWin.on('frmRequestCancel',function(){
    NewRequestWin.hide();
 })
 
 NewRequestWin.on('frmRequestSave',function(){
    fn_submitForm();
 })


function fn_checkAccesToClient(pUID,pCID){
   
   Ext.Ajax.request({
              url: '../stores/clients/helper/CheckAccesToClient.jsp',
              method: 'POST',
              params: {
                       P_USER_ID       :pUID
                      ,P_CLIENT_ID     :pCID
                     },

              success: function ( result, request ) {
                      var jsonData = Ext.util.JSON.decode(result.responseText);
                      e = jsonData.errors.result;
           },
              failure: function ( result, request ) {
               e=0;}
   });
   
};          

//          
 function fn_submitForm(){
   var theForm = NewRequestWin.items.itemAt(0).getForm();
   
   
   if( theForm.isValid() == true)
   {
       
       Ext.Ajax.request({
                  url: '../stores/client_request/win/SaveReqClient.jsp',
                  method: 'POST',
                  params: {
                           p_cl_name            :NewRequestWin.items.itemAt(0).items.itemAt(0).items.itemAt(0).items.itemAt(0).getValue()
                          ,p_cl_cell            :NewRequestWin.items.itemAt(0).items.itemAt(0).items.itemAt(0).items.itemAt(1).getValue()
                          ,p_cl_tel             :NewRequestWin.items.itemAt(0).items.itemAt(0).items.itemAt(0).items.itemAt(2).getValue()
                          ,p_cl_email           :NewRequestWin.items.itemAt(0).items.itemAt(0).items.itemAt(0).items.itemAt(3).items.itemAt(0).getValue()
                          ,p_cl_is_subscribe    :NewRequestWin.items.itemAt(0).items.itemAt(0).items.itemAt(0).items.itemAt(3).items.itemAt(1).getValue()
                          ,p_cl_org             :NewRequestWin.items.itemAt(0).items.itemAt(0).items.itemAt(0).items.itemAt(4).getValue()
                          ,p_cl_position        :NewRequestWin.items.itemAt(0).items.itemAt(0).items.itemAt(0).items.itemAt(5).getValue()
                          
                          ,p_cl_source          :NewRequestWin.items.itemAt(0).items.itemAt(0).items.itemAt(0).items.itemAt(6).getValue()
                          ,p_cl_loyality        :1 //NewRequestWin.items.itemAt(0).items.itemAt(0).items.itemAt(0).items.itemAt(7).getValue()
                          ,p_cl_status          :1 //NewRequestWin.items.itemAt(0).items.itemAt(0).items.itemAt(0).items.itemAt(8).getValue()
                          ,p_cl_warm            :1 //NewRequestWin.items.itemAt(0).items.itemAt(0).items.itemAt(0).items.itemAt(9).getValue()
                          
                          ,p_cl_visibility      :NewRequestWin.items.itemAt(0).items.itemAt(0).items.itemAt(0).items.itemAt(7).getValue()
                          ,p_cl_add_info        :NewRequestWin.items.itemAt(0).items.itemAt(0).items.itemAt(0).items.itemAt(8).getValue()
                          /*request coll*/
                          ,p_req_operation      :NewRequestWin.items.itemAt(0).items.itemAt(0).items.itemAt(1).items.itemAt(0).getValue()
                          ,p_req_budj_from      :NewRequestWin.items.itemAt(0).items.itemAt(0).items.itemAt(1).items.itemAt(1).items.itemAt(1).getValue()
                          ,p_req_budj_to        :NewRequestWin.items.itemAt(0).items.itemAt(0).items.itemAt(1).items.itemAt(1).items.itemAt(3).getValue()
                          ,p_req_currency       :NewRequestWin.items.itemAt(0).items.itemAt(0).items.itemAt(1).items.itemAt(1).items.itemAt(5).getValue()
                          ,p_req_area_from      :NewRequestWin.items.itemAt(0).items.itemAt(0).items.itemAt(1).items.itemAt(2).items.itemAt(1).getValue()
                          ,p_req_area_to        :NewRequestWin.items.itemAt(0).items.itemAt(0).items.itemAt(1).items.itemAt(2).items.itemAt(3).getValue()
                          ,p_req_urgency        :NewRequestWin.items.itemAt(0).items.itemAt(0).items.itemAt(1).items.itemAt(3).getValue()
                          ,p_req_destination    :NewRequestWin.items.itemAt(0).items.itemAt(0).items.itemAt(1).items.itemAt(4).getValue()
                          ,p_req_lots           :NewRequestWin.items.itemAt(0).items.itemAt(0).items.itemAt(1).items.itemAt(5).getValue()
                          ,p_req_ready_id       :NewRequestWin.items.itemAt(0).items.itemAt(0).items.itemAt(1).items.itemAt(6).getValue()
                          
                          ,p_req_staus_id       :NewRequestWin.items.itemAt(0).items.itemAt(0).items.itemAt(1).items.itemAt(7).getValue()
                          ,p_req_dep_id         :NewRequestWin.items.itemAt(0).items.itemAt(0).items.itemAt(1).items.itemAt(8).getValue()
                          
                          ,p_req_add_info       :NewRequestWin.items.itemAt(0).items.itemAt(0).items.itemAt(1).items.itemAt(9).getValue()
                          ,p_last_user_id       :gUserId
                          ,p_client_id          :0
                         },

                  success: function ( result, request ) {
                      var jsonData = Ext.util.JSON.decode(result.responseText);
                      var resultMessage = jsonData.errors.reason;
                      Ext.MessageBox.alert('Заявка',resultMessage);
                      theForm.reset();
                      StoreClRequests.reload();
                      RefreshTree();
                      NewRequestWin.hide();
               },
                  failure: function ( result, request ) {
                   var jsonData = Ext.util.JSON.decode(result.responseText);
                   var resultMessage = jsonData.errors.reason;
                   Ext.MessageBox.alert('Заявка',resultMessage);
                   theForm.reset();
                   StoreClRequests.reload();
                   RefreshTree();
                   NewRequestWin.hide();
               }
       });
   }else{
    Ext.MessageBox.alert('Заявка','Проверьте правильность заполнения формы');
   }
   };          

  


/*Окно для создания заявки, если клиент выделен*/
     
 ClientsNewRequestWin = new  myclients.winRequest({
      title:'Заявка клиента'
     ,width: 450
     ,height: 500
     ,items:[{xtype:'myclientsfrmRequest'
           ,items: ClientsNewReqFormFields  
         }]
 });
 
 ClientsNewRequestWin.on('frmRequestCancel',function(){
    ClientsNewRequestWin.hide();
 })
 
 ClientsNewRequestWin.on('frmRequestSave',function(){
    fn_submitNewRequestForm();
 })
//////////////////////////////////////////////////////
          
 function fn_submitNewRequestForm(){
   //Ext.MessageBox.alert('Заявка','New' + ClientsNewRequestWin.items.itemAt(0).items.itemAt(3).getValue() );  
   
   var theForm = ClientsNewRequestWin.items.itemAt(0).getForm();

   if( theForm.isValid() == true)
   {
       
       Ext.Ajax.request({
                  url: '../stores/client_request/win/SaveReqClient.jsp',
                  method: 'POST',
                  params: {                      
                          /*request coll*/
                                                 
                           p_req_operation      :ClientsNewRequestWin.items.itemAt(0).items.itemAt(0).getValue()
                          ,p_req_budj_from      :ClientsNewRequestWin.items.itemAt(0).items.itemAt(1).items.itemAt(1).getValue()
                          ,p_req_budj_to        :ClientsNewRequestWin.items.itemAt(0).items.itemAt(1).items.itemAt(3).getValue()
                          ,p_req_currency       :ClientsNewRequestWin.items.itemAt(0).items.itemAt(1).items.itemAt(5).getValue()
                          ,p_req_area_from      :ClientsNewRequestWin.items.itemAt(0).items.itemAt(2).items.itemAt(1).getValue()
                          ,p_req_area_to        :ClientsNewRequestWin.items.itemAt(0).items.itemAt(2).items.itemAt(3).getValue()
                          ,p_req_urgency        :ClientsNewRequestWin.items.itemAt(0).items.itemAt(3).getValue()
                          ,p_req_destination    :ClientsNewRequestWin.items.itemAt(0).items.itemAt(4).getValue()
                          ,p_req_lots           :ClientsNewRequestWin.items.itemAt(0).items.itemAt(5).getValue()
                          ,p_req_ready_id       :ClientsNewRequestWin.items.itemAt(0).items.itemAt(6).getValue()
                          ,p_req_staus_id       :ClientsNewRequestWin.items.itemAt(0).items.itemAt(7).getValue()
                          ,p_req_dep_id         :ClientsNewRequestWin.items.itemAt(0).items.itemAt(8).getValue()                          
                          ,p_req_add_info       :ClientsNewRequestWin.items.itemAt(0).items.itemAt(9).getValue()
                          ,p_last_user_id       :gUserId
                          ,p_client_id          :lcid

                                     },

                  success: function ( result, request ) {
                      var jsonData = Ext.util.JSON.decode(result.responseText);
                      var resultMessage = jsonData.errors.reason;
                      Ext.MessageBox.alert('Заявка',resultMessage);
                      StoreClRequests.reload();
                      theForm.reset();
                      ClientsNewRequestWin.hide();
               },
                  failure: function ( result, request ) {
                   var jsonData = Ext.util.JSON.decode(result.responseText);
                   var resultMessage = jsonData.errors.reason;
                   Ext.MessageBox.alert('Заявка',resultMessage);
                   StoreClRequests.reload();
                   theForm.rest();
                   ClientsNewRequestWin.hide();
               }
       });
   }else{
    Ext.MessageBox.alert('Заявка','Проверьте правильность заполнения формы');
   }
   };          
   


           
   } // eo function initComponent
});
Ext.reg('myclientsroot', myclients.RootTab);


