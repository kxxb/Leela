/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */


/*
 *Мои заявки 
 ***/
Ext.ns("actions");
Ext.ns("myclients");

var MyRStore;
var RequestsRowIndex = -1;

actions.ClientsRequests =  Ext.extend(Ext.Panel,{
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
               ,items:[ {xtype:'clientreqgridall'
                         ,height:200
                         ,width:300
                         ,region:'center'
                         ,store: StoreClRequests
                         ,cm:this.cm
                         }
                     ]} 
              ,{xtype:'panel'
               ,region:'center'
               ,layout: 'border'
               ,items:[
                    
                 {xtype:'panel'
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
         ,tbar:[   
//                    {
//                     text: 'Новая заявка'
//                     ,tooltip: 'Новая заявка'
//                     ,iconCls:'silk-add'
//                     ,handler: function(){
//                         /*вызываю функцию(объект),
//                          *у которой область видимости
//                          *такая же что и у тулбара.
//                          *То есть тулбар и функция находяться на одном уровне видимости
//                          **/
//                       NewRequest().call;
//                     }
//                    },
                    '-',
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

                    ]
                     
      };
        
        
         Ext.apply(this, Ext.apply(this.initialConfig, config));
         actions.ClientsRequests.superclass.initComponent.apply(this, arguments);
           

         var lGrid = this.items.itemAt(0).items.itemAt(0);
         var lReqPan = this.items.itemAt(1).items.itemAt(0);
        
         var v_req_id;
         var pan_id = this.id; 
         var l_store  = StoreClRequests;
           
         
          
          var RequestSearch = function(){
              
               SearchRequestWin.show();
               SearchRequestWin.items.itemAt(0).items.itemAt(0).items.itemAt(0).items.itemAt(0).setValue(pan_id);
              
          };
          
          function QuicSearch(param){
              l_store.reload({params: {search_param:param, cid:myclients.ClId}})  
          }
          
          
          lGrid.getSelectionModel().on('rowselect', function(sm, rowIdx, r) {
                                    SetGridData(r.data);
                                    v_req_id = r.data.ID;
                                    RequestsSetRowClickIndex(rowIdx);
                                    OverwritePanels();
    			});
                        
        lGrid.on('afteredit',function(oGrid_event){
                       Ext.Ajax.request({
                        url: '../stores/client_request/win/U_ReqClient.jsp',
                          params: {

                               P_REQ_ID :v_req_id
                              ,P_REQ_STATUS_ID  : oGrid_event.record.data.req_status_name
                              ,P_LAST_USER_ID: gUserId
                              ,P_MODE : 'U_STATUS'

                          },
                          success: function(response){
                                Ext.MessageBox.alert('Заявка','Данные сохранены');
                                    lGrid.store.reload();
                             
                          },
                          failure: function(response){
                             var result=response.responseText;
                             Ext.MessageBox.alert('Ошибка','Ошибка сохранения данных');
                          }
                       });

                  });                                 
   
    function OverwritePanels(){
        lReqPan.tpl.overwrite(lReqPan.body, v_grid_data);                                     
    }
  
  
  
   var v_grid_data;
   function SetGridData(data){
          v_grid_data = data;
      };

   

   function RequestsSetRowClickIndex(rInd){
       RequestsRowIndex = rInd;
      }; 
  
  l_store.on('load',function(v_grid_data){
                if (RequestsRowIndex == -1){
                    lReqPan.tpl.overwrite(lReqPan.body, '');
                } else {
                    /*Нахожу ту строку на которй стоял перед редактированием
                      *и вновь выделяю её
                      **/                    
                     lGrid.getSelectionModel().selectRow(RequestsRowIndex);
                     lGrid.getView().focusRow(RequestsRowIndex);
                     OverwritePanels();
                }
                  
                   
            });               
   
         
          
          
          

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
    ClientsNewRequestWin.close();
 })
 
 ClientsNewRequestWin.on('frmRequestSave',function(){
    ClientsNewRequestWin.close();
 })
//////////////////////////////////////////////////////
          
 function fn_submitNewRequestForm(){
   var theForm = ClientsClientsNewRequestWin.items.itemAt(0).getForm();

//   if( theForm.isValid() == true)
//   {
       
       Ext.Ajax.request({
                  url: '../stores/client_request/win/SaveReqClient.jsp',
                  method: 'POST',
                  params: {search_param:param
                          ,p_cl_name            :ClientsNewRequestWin.items.itemAt(0).items.itemAt(0).items.itemAt(0).items.itemAt(0).getValue()
                          ,p_cl_cell            :ClientsNewRequestWin.items.itemAt(0).items.itemAt(0).items.itemAt(0).items.itemAt(1).getValue()
                          ,p_cl_tel             :ClientsNewRequestWin.items.itemAt(0).items.itemAt(0).items.itemAt(0).items.itemAt(2).getValue()
                          ,p_cl_email           :ClientsNewRequestWin.items.itemAt(0).items.itemAt(0).items.itemAt(0).items.itemAt(3).items.itemAt(0).getValue()
                          ,p_cl_is_subscribe    :ClientsNewRequestWin.items.itemAt(0).items.itemAt(0).items.itemAt(0).items.itemAt(3).items.itemAt(1).getValue()
                          ,p_cl_org             :ClientsNewRequestWin.items.itemAt(0).items.itemAt(0).items.itemAt(0).items.itemAt(4).getValue()
                          ,p_cl_position        :ClientsNewRequestWin.items.itemAt(0).items.itemAt(0).items.itemAt(0).items.itemAt(5).getValue()
                          ,p_cl_visibility      :ClientsNewRequestWin.items.itemAt(0).items.itemAt(0).items.itemAt(0).items.itemAt(6).getValue()
                          ,p_cl_add_info        :ClientsNewRequestWin.items.itemAt(0).items.itemAt(0).items.itemAt(0).items.itemAt(7).getValue()
                          /*request coll*/
                          ,p_req_operation      :ClientsNewRequestWin.items.itemAt(0).items.itemAt(0).items.itemAt(1).items.itemAt(0).getValue()
                          ,p_req_budj_from      :ClientsNewRequestWin.items.itemAt(0).items.itemAt(0).items.itemAt(1).items.itemAt(1).items.itemAt(1).getValue()
                          ,p_req_budj_to        :ClientsNewRequestWin.items.itemAt(0).items.itemAt(0).items.itemAt(1).items.itemAt(1).items.itemAt(3).getValue()
                          ,p_req_currency       :ClientsNewRequestWin.items.itemAt(0).items.itemAt(0).items.itemAt(1).items.itemAt(1).items.itemAt(5).getValue()
                          ,p_req_area_from      :ClientsNewRequestWin.items.itemAt(0).items.itemAt(0).items.itemAt(1).items.itemAt(2).items.itemAt(1).getValue()
                          ,p_req_area_to        :ClientsNewRequestWin.items.itemAt(0).items.itemAt(0).items.itemAt(1).items.itemAt(2).items.itemAt(3).getValue()
                          ,p_req_urgency        :ClientsNewRequestWin.items.itemAt(0).items.itemAt(0).items.itemAt(1).items.itemAt(3).getValue()
                          ,p_req_destination    :ClientsNewRequestWin.items.itemAt(0).items.itemAt(0).items.itemAt(1).items.itemAt(4).getValue()
                          ,p_req_lots           :ClientsNewRequestWin.items.itemAt(0).items.itemAt(0).items.itemAt(1).items.itemAt(5).getValue()
                          ,p_req_ready_id       :ClientsNewRequestWin.items.itemAt(0).items.itemAt(0).items.itemAt(1).items.itemAt(6).getValue()
                          ,p_req_add_info       :ClientsNewRequestWin.items.itemAt(0).items.itemAt(0).items.itemAt(1).items.itemAt(7).getValue()
                          ,p_last_user_id       :gUserId

                                     },

                  success: function ( result, request ) {
                      var jsonData = Ext.util.JSON.decode(result.responseText);
                      var resultMessage = jsonData.errors.reason;
                      Ext.MessageBox.alert('Заявка',resultMessage);
                      l_store.reload();
               },
                  failure: function ( result, request ) {
                   var jsonData = Ext.util.JSON.decode(result.responseText);
                   var resultMessage = jsonData.errors.reason;
                   Ext.MessageBox.alert('Заявка',resultMessage);
                   l_store.reload();
               }
       });
//   }else{
//    alert("Форма не валидна!");
//   }
   };          
   
   
         
           
   } // eo function initComponent

});
Ext.reg('actionsClientsRequests', actions.ClientsRequests);

