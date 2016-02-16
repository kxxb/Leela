/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */


/*
 *Мои заявки 
 ***/
Ext.ns("requests");

var MyRStore;

requests.MyRequests =  Ext.extend(Ext.Panel,{
    initComponent: function(){
      var config = {
          
          autoScroll : 1
         ,overflow:'auto'
         ,layout: 'border'
         //,height:500
         //,tbar:this.tbar
         
         ,items:[
            {xtype:'panel'
               ,region:'north'
               ,layout: 'border'
               ,height:250
               ,items:[ 
            {xtype:'clientreqgridall'
             ,height:200
             ,width:300
             ,region:'center'
             ,store: this.store
             ,cm:this.cm
             }
             
         ]} 
              ,{xtype:'panel'
               ,region:'center'
               ,layout: 'border'
               ,items:[
                 {xtype:'guessclientpan'
                 ,region:'west'
                 ,width:300
                 ,split: true
                 ,html:'Клиент'

                }   
                 ,{xtype:'panel'
                   ,region:'center'
                   ,width:350
                   ,split: true
                   ,html:'Детали заявки'
                   ,tpl:new Ext.XTemplate(

                        '<table class="stat" border="0" height="70" cellspacing="0" cellpadding="0">'+
                        '<tr>                                                            '+
                        '  <td valign="top">                                                          '+
                        '    <font size=3 face="Verdana" >                             '+
                        '       <b>Дата обновления:</b> {Date_Update} <br>                           '+
                    '       <b>Операция:</b> {OP_NAME} <br>                           '+
                    '       <b>Бюджет :</b> от {BUDGET_START}  до {BUDGET_END} {CUR_NAME}<br>                                      '+
                        '       <b>Площадь:</b> от {AREA_START}  до {AREA_END}<br>                           '+
                        '       <b>Срочность:</b> {URGENCY} <br>                           '+
                        '       <b>Местоположение:</b> {DESTINATION} <br>                           '+
                        '       <b>Готовность:</b> {READY_NAME} <br>                           '+
                        '       <b>Описание:</b> {ADDITIONAL_INFO} <br>                           '+
                        '    </font>                                                         '+
                        '  </td>                                                         '+
                        '</tr>                                                           '+
                        '</table>   '                       )
                }
              
              ] 
              
             }
         ]
         ,tbar:[   '-'
                    ,{
                     text: 'Новая заявка'
                     ,tooltip: 'Новая заявка'
                     ,iconCls:'silk-add'
                     ,handler: function(){
                         /*вызываю функцию(объект),
                          *у которой область видимости
                          *такая же что и у тулбара.
                          *То есть тулбар и функция находяться на одном уровне видимости
                          **/
                       NewRequest();
                     }
                    }
                    ,'-',
                    'Поиск: ', ' ',
                     new Ext.form.TextField({
                        fieldLabel:'Поиск'
                        ,width:320
                        ,enableKeyEvents:true
                        ,listeners: {
                          keyup: function(t,e){ 
                            QuicSearch(this.getValue())
                          }
                        }
                       })
                    ,'-'
//                    ,{
//                     text: 'Фильтр'
//                     ,tooltip: 'Фильтр'
//                     //,iconCls:'silk-add'
//                     ,handler: function(){
//                         /*вызываю функцию(объект),
//                          *у которой область видимости
//                          *такая же что и у тулбара.
//                          *То есть тулбар и функция находяться на одном уровне видимости
//                          **/
//                       FiltrRequest();
//                     }
//                    }   

                    ]
                     
      };
        
        
         Ext.apply(this, Ext.apply(this.initialConfig, config));
        requests.MyRequests.superclass.initComponent.apply(this, arguments);
           

        var lGrid = this.items.itemAt(0).items.itemAt(0);
        var lClientPan = this.items.itemAt(1).items.itemAt(0);
        var lReqPan = this.items.itemAt(1).items.itemAt(1);
        
        
           var pan_id = this.id; 
           var l_store  = this.store;
           
           var NewRequest = function(){
               //Ext.MessageBox.alert('local','local event '+ pan_id);  
              //this.fireEvent('eventNewRequest');
              AllReqNewRequestWin.show();
              
          };
          
          var FiltrRequest = function(){
              Ext.MessageBox.alert('Заявка','pan '+pan_id );
               //FiltrRequestWin.show();
               //SearchRequestWin.items.itemAt(0).items.itemAt(0).items.itemAt(0).items.itemAt(0).setValue(pan_id);
              
          };
          
          function QuicSearch(param){
              l_store.reload({params: {search_param:param}})  
          }
          function QuicSearchReset(param){
              l_store.reload({params: {search_param:param, limit:100, start:1, Dep_id:gUserDepId,user_id:gUserId}})  
          }
          
          
/*Окно фильтра*/          
 FiltrRequestWin = new  myclients.winRequest({
      title:'Фильтр по заявкам'
     ,width: 550
     ,height: 500
     ,items:[{xtype:'myclientsfrmRequest'
           ,items: RequestFilterFormFields  
         }]
 });
 FiltrRequestWin.on('frmRequestSave',function(){
   Ext.MessageBox.alert('Заявка','pan'+pan_id );
   //fn_DoFilter();
   
 })
 

/*Окно для создания клиента и его заявки*/

 AllReqNewRequestWin = new  myclients.winRequest({
      title:'Новый клиент и его заявка'
     ,width: 850
     ,height: 500
     ,items:[{xtype:'myclientsfrmRequest'
           ,items: NewReqFormFields  
         }]
 });
 
 
 
 AllReqNewRequestWin.on('frmRequestCancel',function(){
    AllReqNewRequestWin.close();
 })
 
 AllReqNewRequestWin.on('frmRequestSave',function(){
    fn_submitForm();
 })



function fn_DoFilter(){
   var theForm = FiltrRequestWin.items.itemAt(0).getForm();
//   if( theForm.isValid() == true)
//   {

    l_store.reload({params: {  
                               p_cl_org             :FiltrRequestWin.items.itemAt(0).items.itemAt(0).getValue()
                              ,p_req_operation      :FiltrRequestWin.items.itemAt(0).items.itemAt(1).getValue()
                              ,p_req_budj_from      :FiltrRequestWin.items.itemAt(0).items.itemAt(2).items.itemAt(1).getValue()
                              ,p_req_budj_to        :FiltrRequestWin.items.itemAt(0).items.itemAt(2).items.itemAt(3).getValue()
                              ,p_req_currency       :FiltrRequestWin.items.itemAt(0).items.itemAt(2).items.itemAt(5).getValue()
                              ,p_req_area_from      :FiltrRequestWin.items.itemAt(0).items.itemAt(3).items.itemAt(1).getValue()
                              ,p_req_area_to        :FiltrRequestWin.items.itemAt(0).items.itemAt(3).items.itemAt(3).getValue()
                              ,p_req_urgency        :FiltrRequestWin.items.itemAt(0).items.itemAt(4).getValue()
                              ,p_req_destination    :FiltrRequestWin.items.itemAt(0).items.itemAt(5).getValue()
                              ,p_req_lots           :FiltrRequestWin.items.itemAt(0).items.itemAt(6).getValue()
                              ,p_req_ready_id       :FiltrRequestWin.items.itemAt(0).items.itemAt(7).getValue()
                              ,p_req_staus_id       :FiltrRequestWin.items.itemAt(0).items.itemAt(8).getValue()
                              ,p_req_dep_id         :FiltrRequestWin.items.itemAt(0).items.itemAt(9).getValue()                          
                              ,p_mode         : pan_id


    }});  
      
//   }else{
//    Ext.MessageBox.alert('Заявка','Проверьте правильность заполнения формы');
//   }
   }; 


//          
 function fn_submitForm(){
   var theForm = AllReqNewRequestWin.items.itemAt(0).getForm();
   if( theForm.isValid() == true)
   {
       
       Ext.Ajax.request({
                  url: '../stores/client_request/win/SaveReqClient.jsp',
                  method: 'POST',
                  params: {
                           
                          
                          p_cl_name            : AllReqNewRequestWin.items.itemAt(0).items.itemAt(0).items.itemAt(0).items.itemAt(0).getValue()
                          ,p_cl_cell            :AllReqNewRequestWin.items.itemAt(0).items.itemAt(0).items.itemAt(0).items.itemAt(1).getValue()
                          ,p_cl_tel             :AllReqNewRequestWin.items.itemAt(0).items.itemAt(0).items.itemAt(0).items.itemAt(2).getValue()
                          ,p_cl_email           :AllReqNewRequestWin.items.itemAt(0).items.itemAt(0).items.itemAt(0).items.itemAt(3).items.itemAt(0).getValue()
                          ,p_cl_is_subscribe    :AllReqNewRequestWin.items.itemAt(0).items.itemAt(0).items.itemAt(0).items.itemAt(3).items.itemAt(1).getValue()
                          ,p_cl_org             :AllReqNewRequestWin.items.itemAt(0).items.itemAt(0).items.itemAt(0).items.itemAt(4).getValue()
                          ,p_cl_position        :AllReqNewRequestWin.items.itemAt(0).items.itemAt(0).items.itemAt(0).items.itemAt(5).getValue()
                          
                          ,p_cl_source          :AllReqNewRequestWin.items.itemAt(0).items.itemAt(0).items.itemAt(0).items.itemAt(6).getValue()
                          ,p_cl_loyality        :1 //AllReqNewRequestWin.items.itemAt(0).items.itemAt(0).items.itemAt(0).items.itemAt(7).getValue()
                          ,p_cl_status          :1 //AllReqNewRequestWin.items.itemAt(0).items.itemAt(0).items.itemAt(0).items.itemAt(8).getValue()
                          ,p_cl_warm            :1 //AllReqNewRequestWin.items.itemAt(0).items.itemAt(0).items.itemAt(0).items.itemAt(9).getValue()
                          
                          ,p_cl_visibility      :AllReqNewRequestWin.items.itemAt(0).items.itemAt(0).items.itemAt(0).items.itemAt(7).getValue()
                          ,p_cl_add_info        :AllReqNewRequestWin.items.itemAt(0).items.itemAt(0).items.itemAt(0).items.itemAt(8).getValue()
                          /*request coll*/
                          ,p_req_operation      :AllReqNewRequestWin.items.itemAt(0).items.itemAt(0).items.itemAt(1).items.itemAt(0).getValue()
                          ,p_req_budj_from      :AllReqNewRequestWin.items.itemAt(0).items.itemAt(0).items.itemAt(1).items.itemAt(1).items.itemAt(1).getValue()
                          ,p_req_budj_to        :AllReqNewRequestWin.items.itemAt(0).items.itemAt(0).items.itemAt(1).items.itemAt(1).items.itemAt(3).getValue()
                          ,p_req_currency       :AllReqNewRequestWin.items.itemAt(0).items.itemAt(0).items.itemAt(1).items.itemAt(1).items.itemAt(5).getValue()
                          ,p_req_area_from      :AllReqNewRequestWin.items.itemAt(0).items.itemAt(0).items.itemAt(1).items.itemAt(2).items.itemAt(1).getValue()
                          ,p_req_area_to        :AllReqNewRequestWin.items.itemAt(0).items.itemAt(0).items.itemAt(1).items.itemAt(2).items.itemAt(3).getValue()
                          ,p_req_urgency        :AllReqNewRequestWin.items.itemAt(0).items.itemAt(0).items.itemAt(1).items.itemAt(3).getValue()
                          ,p_req_destination    :AllReqNewRequestWin.items.itemAt(0).items.itemAt(0).items.itemAt(1).items.itemAt(4).getValue()
                          ,p_req_lots           :AllReqNewRequestWin.items.itemAt(0).items.itemAt(0).items.itemAt(1).items.itemAt(5).getValue()
                          ,p_req_ready_id       :AllReqNewRequestWin.items.itemAt(0).items.itemAt(0).items.itemAt(1).items.itemAt(6).getValue()
                          
                          ,p_req_staus_id       :AllReqNewRequestWin.items.itemAt(0).items.itemAt(0).items.itemAt(1).items.itemAt(7).getValue()
                          ,p_req_dep_id         :AllReqNewRequestWin.items.itemAt(0).items.itemAt(0).items.itemAt(1).items.itemAt(8).getValue()
                          
                          ,p_req_add_info       :AllReqNewRequestWin.items.itemAt(0).items.itemAt(0).items.itemAt(1).items.itemAt(9).getValue()
                          ,p_last_user_id       :gUserId
                          ,p_client_id          :0

                         },

                  success: function ( result, request ) {
                      var jsonData = Ext.util.JSON.decode(result.responseText);
                      var resultMessage = jsonData.errors.reason;
                      Ext.MessageBox.alert('Заявка',resultMessage);
                      StoreClRequests.reload();
                      theForm.reset();
                      AllReqNewRequestWin.hide();
               },
                  failure: function ( result, request ) {
                   var jsonData = Ext.util.JSON.decode(result.responseText);
                   var resultMessage = jsonData.errors.reason;
                   Ext.MessageBox.alert('Заявка',resultMessage);
                   StoreClRequests.reload();
                   theForm.reset();
                   AllReqNewRequestWin.hide();
               }
       });
   }else{
    Ext.MessageBox.alert('Заявка','Проверьте правильность заполнения формы');
   }
   };          
     
   
   
   lGrid.getSelectionModel().on('rowselect', function(sm, rowIdx, r) {
                                    DetectClientInfo(r.data.cl_id);
                                    lReqPan.tpl.overwrite(lReqPan.body, r.data);   
    			});
                        
                 
   
   function DetectClientInfo(client_id){
               var guess_client_conn = new Ext.data.Connection();
                   guess_client_conn.request({
                      url: '../stores/client_request/helper/Detect_Client.jsp',
                      params: {
                          p_client_id:client_id
                         ,p_user_id: gUserId
                      },
                      success: function(resp,opt) {
                         
                        lClientPan.tpl.overwrite(lClientPan.body, {CLIENT_INFO:resp.responseText});   
                      

                      },
                      failure: function(resp,opt) {
                         Ext.Msg.alert('Error','Ошибка связи');
                      }
                    });
                
                
            }
   
         
         
           
   } // eo function initComponent

});
Ext.reg('requestsMyrequests', requests.MyRequests);


requests.AddSearchTb =  Ext.extend(Ext.Toolbar,{
    initComponent: function(){
        var config ={items : [
                    '-'
                    ,{
                     text: 'Новая заявка'
                     ,tooltip: 'Новая заявка'
                     ,iconCls:'silk-add'
                     ,handler: function(){
                         /*вызываю функцию(объект),
                          *у которой область видимости
                          *такая же что и у тулбара.
                          *То есть тулбар и функция находяться на одном уровне видимости
                          **/
                       NewRequest();
                     }
                    }
                    ,'-'
                  ,{
                     text: 'Поиск'
                     ,tooltip: 'Поиск'
                     ,iconCls:'silk-cog'
                     ,handler: function(){
                         /*вызываю функцию(объект),
                          *у которой область видимости
                          *такая же что и у тулбара.
                          *То есть тулбар и функция находяться на одном уровне видимости
                          **/
                      RequestSearch().call; 
                     }
                    }
                    ,'-'
                     
                   ]
        }
        
        
        
         Ext.apply(this, Ext.apply(this.initialConfig, config));
         requests.AddSearchTb.superclass.initComponent.apply(this, arguments);
         
         var NewRequest = function(){
               Ext.MessageBox.alert('local','local event ');  
        
        //    this.fireEvent('eventNewRequest');
          };
        NewRequest = NewRequest.createDelegate(this);
    } // eo function initComponent

});


         
              