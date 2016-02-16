/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */





/*Окно для запроса*/
      var RequestClientWin = new Ext.Window({
                   title: 'Заявка'
                  ,closable:true
                  ,iconCls:'win'
                  ,closeAction: "hide"
                  ,width: 550
                  ,height: 400
                  ,plain:true
                  ,layout: 'fit'
                  ,items:  new Ext.FormPanel({
                            frame: true,
                            bodyStyle: 'padding:5px',
                            width: 550,
                            //layout: 'column',
                            url: '../../stores/clients/tab/SaveClientRequest.jsp',
                            method: 'POST',
                            items: [
                                {
                                   xtype:'textfield',      // textfield
                                   fieldLabel:'Лоты'
                                }
                               ,{
                                xtype: 'combo',
                                store: RequestOperationStore,
                                displayField: 'name',
                                valueField: 'id',
                                typeAhead: true,
                                editable:true,
                                mode: 'local',
                                forceSelection: true,
                                triggerAction: 'all',
                                fieldLabel: 'Операция',
                                selectOnFocus: true,
                                anchor:'95%',
                                allowBlank:false
                               }
                               ,{
                                xtype: 'compositefield',
                                fieldLabel: 'Бюджет',
                                combineErrors: false,
                                items: [
                                   {
                                       xtype: 'displayfield',
                                       value: 'от'
                                   }, 
                                   {
                                       xtype: 'numberfield'
                                       ,width: 48
                                       ,value :0
                                       ,allowBlank: false
                                   },
                                   {
                                       xtype: 'displayfield',
                                       value: 'до'
                                   }
                                   ,{
                                       xtype: 'numberfield'
                                       ,width: 48
                                       ,value :0
                                       ,allowBlank: false
                                   }
                                   ,{
                                       xtype: 'displayfield',
                                       value: 'валюта'
                                   }
                                   ,{
                                    xtype: 'combo',
                                    store: CurrencyStore,
                                    displayField: 'name',
                                    valueField: 'id',
                                    typeAhead: true,
                                    mode: 'local',
                                    forceSelection: true,
                                    triggerAction: 'all',
                                    selectOnFocus: true,
                                    width:70,
                                    anchor:'95%',
                                    allowBlank:false
                                   }
                                   
                                ]
                            },
                            {
                                xtype: 'compositefield',
                                fieldLabel: 'Площадь',
                                combineErrors: false,
                                items: [
                                   {
                                       xtype: 'displayfield',
                                       value: 'от'
                                   }, 
                                   {
                                        xtype: 'numberfield'
                                       ,width: 48
                                       ,value :0
                                       ,allowBlank: false
                                   },
                                   {
                                       xtype: 'displayfield',
                                       value: 'до'
                                   }
                                   ,{
                                       xtype: 'numberfield'
                                       ,width: 48
                                       ,value :0
                                       ,allowBlank: false
                                   }
                                   
                                   
                                ]
                            }
                            ,{
                                   xtype:'textfield',      // textfield
                                   fieldLabel:'Срочность'
                                }
                                ,{
                                   xtype:'textfield',      // textfield
                                   fieldLabel:'Местоположение'
                                }
                                ,{
                                    xtype: 'combo',
                                    store: ReadyObjectStore,
                                    displayField: 'name',
                                    valueField: 'id',
                                    typeAhead: true,
                                    editable:true,
                                    mode: 'local',
                                    forceSelection: true,
                                    triggerAction: 'all',
                                    fieldLabel: 'Готовность',
                                    selectOnFocus: true,
                                    anchor:'95%',
                                    allowBlank:false
                                   }
                               ,{
                                xtype:'htmleditor',
                                height:200,
                                fieldLabel: 'Дополнительная информация',
                                anchor:'98%',
                                allowBlank: false
                                //,handler:
                               }


                            ]
                            ,buttons: [{
                                text: 'Сохранить',
                                handler: function() {

                                var theForm       = RequestClientWin.items.itemAt(0).getForm();
                                var v_lots        = theForm.items.itemAt(0).getValue();
                                var v_operation   = theForm.items.itemAt(1).getValue();
                                var v_budget_from = theForm.items.itemAt(2).items.itemAt(1).getValue();
                                var v_budget_to   = theForm.items.itemAt(2).items.itemAt(3).getValue();
                                var v_budget_cur  = theForm.items.itemAt(2).items.itemAt(5).getValue();
                                
                                var v_area_from   = theForm.items.itemAt(3).items.itemAt(1).getValue();
                                var v_area_to     = theForm.items.itemAt(3).items.itemAt(3).getValue();
                                
                                var v_URGENCY     = theForm.items.itemAt(4).getValue();
                                var v_destination = theForm.items.itemAt(5).getValue();
                                var v_obj_ready   = theForm.items.itemAt(6).getValue();
                                var v_additional  = theForm.items.itemAt(7).getValue();

                                    theForm.submit({
                                    params: {
                                      
                                         P_LOT              : v_lots
                                        ,P_OPERATION_ID     : v_operation 
                                        ,P_BUDGET_START     : v_budget_from
                                        ,P_BUDGET_END       : v_budget_to
                                        ,P_CURRENCY_ID      : v_budget_cur
                                        ,P_AREA_START       : v_area_from
                                        ,P_AREA_END         : v_area_to
                                        ,P_URGENCY          : v_URGENCY 
                                        ,P_DESTINATION      : v_destination
                                        ,P_READY_ID         : v_obj_ready 
                                        ,P_ADDITIONAL_INFO  : v_additional
                                        ,P_LAST_USER_ID     : gUserId
                                        ,P_CLIENT_ID        : vClientId 


                                     },
                                     success: function(){
                                            Ext.MessageBox.alert('Запрос клиента','Данные сохранены');
                                            /*обнови панель*/
                                            app_store_reqclients.reload();
                                            //OverwritePanels(v_grid_data);
                                            RequestClientWin.items.itemAt(0).getForm().reset();
                                            RequestClientWin.hide();

                                  },
                                  failure: function(response){
                                     var result=response.responseText;
                                     Ext.MessageBox.alert('Запрос клиента','Ошибка сохранения данных');
                                  }
                                })
                              }
                            }, {
                                text: 'Отмена',
                                handler: function(){
                                    RequestClientWin.items.itemAt(0).getForm().reset();
                                    
                                    RequestClientWin.hide();
                                }
                            }]
                        })
                    });
               /*Конец окна для запроса*/
//////////////////////////////////////////////////////



/*Окно для  результата запроса*/
      var ReqResultClientWin = new Ext.Window({
                   title: 'Ре апрос'
                  ,closable:true
                  ,iconCls:'win'
                  ,closeAction: "hide"
                  ,width: 550
                  ,height: 200
                  ,plain:true
                  ,layout: 'fit'
                  ,items:  new Ext.FormPanel({
                            frame: true,
                            bodyStyle: 'padding:5px',
                            width: 550,
                            //layout: 'column',
                            url: '../../stores/clients/tab/SaveClientReqResult.jsp',
                            method: 'POST',
                            items: [

                                {
                                xtype: 'combo',

                                store: new Ext.data.SimpleStore({
                                fields:[ 'RESULT_ID','RESULT_NAME'],

                                 data: [['0', 'Пассив'],['1', 'Актив'],['2', 'В работе'],['-1', 'Не обработан']]
                                                }),
                                mode: 'local',
                                displayField: 'RESULT_NAME',
                                valueField: 'RESULT_ID',
                                typeAhead: true,
                                editable:true,
                                mode: 'local',
                                forceSelection: true,
                                triggerAction: 'all',
                                fieldLabel: 'Статус',
                                selectOnFocus: true,
                                anchor:'95%',

                                allowBlank:false

                              }
                                ,{
                                xtype:'htmleditor',
                                height:200,
                                fieldLabel: 'Описание',
                                anchor:'98%',
                                allowBlank: false
                                //,handler:
                               }


                            ]
                            ,buttons: [{
                                text: 'Сохранить',
                                handler: function() {

                                var theForm = ReqResultClientWin.items.itemAt(0).getForm();
                                var v_request_res = ReqResultClientWin.items.itemAt(0).items.itemAt(0).getValue();
                                var v_request__res_desc = ReqResultClientWin.items.itemAt(0).items.itemAt(1).getValue();

                                    theForm.submit({
                                    params: {
                                       P_ID : vRequestId
                                      ,P_REQEUST_RESULT :v_request__res_desc
                                      ,P_REQUEST_STATUS : v_request_res
                                      ,P_LAST_USER_ID:      gUserId


                                     },
                                     success: function(){
                                            Ext.MessageBox.alert('Запрос клиента','Данные сохранены');
                                            /*обнови панель*/
                                            app_store_reqclients.reload();

                                            //OverwritePanels(v_grid_data);

                                            ReqResultClientWin.hide();

                                  },
                                  failure: function(response){
                                     var result=response.responseText;
                                     Ext.MessageBox.alert('Запрос клиента','Ошибка сохранения данных');
                                  }
                                })
                              }
                            }, {
                                text: 'Отмена',
                                handler: function(){
                                    ReqResultClientWin.items.itemAt(0).items.itemAt(0).setValue('');

                                    ReqResultClientWin.hide();
                                }
                            }]
                        })
                    });
               /*Конец окна для результата запроса*/
//////////////////////////////////////////////////////



/*Окно для видимости*/
      var AccessClientWin = new Ext.Window({
                   title: 'Видимость'
                  ,closable:true
                  ,iconCls:'win'
                  ,closeAction: "hide"
                  ,width: 550
                  ,height: 200
                  ,plain:true
                  ,layout: 'fit'
                  ,items:  new Ext.FormPanel({
                            frame: true,
                            bodyStyle: 'padding:5px',
                            width: 550,
                            //layout: 'column',
                            url: '../../stores/clients/tab/U_Clients_acces.jsp',
                            method: 'POST',
                            items: [

                                 {
                                xtype: 'combo',
                                store: AplStore,
                                displayField: 'name',
                                valueField: 'user_id',
                                typeAhead: true,
                                editable:true,
                                mode: 'local',
                                forceSelection: true,
                                triggerAction: 'all',
                                fieldLabel: 'Брокер',
                                selectOnFocus: true,
                                anchor:'95%',
                                
                                allowBlank:false

                              }
                              ,{xtype: 'checkbox'
                                ,fieldLabel: 'Виден'
                                ,checked:true
                               }


                            ]
                            ,buttons: [{
                                text: 'Сохранить',
                                handler: function() {

                                var theForm = AccessClientWin.items.itemAt(0).getForm();
                                var v_user_id = AccessClientWin.items.itemAt(0).items.itemAt(0).getValue();
                                var v_status = AccessClientWin.items.itemAt(0).items.itemAt(1).getValue();

                                    theForm.submit({
                                    params: {
                                       P_CRM_CLIENTS_ID :vClientId
                                      ,P_BROKER_ID :gUserId
                                      ,P_REQUEST_TEXT : v_request_desc
                                      ,P_LAST_USER_ID:      gUserId
                                      

                                     },
                                     success: function(){
                                            Ext.MessageBox.alert('Запрос клиента','Данные сохранены');
                                            /*обнови панель*/
                                            app_store_reqclients.reload();
                                            //OverwritePanels(v_grid_data);

                                            AccessClientWin.hide();

                                  },
                                  failure: function(response){
                                     var result=response.responseText;
                                     Ext.MessageBox.alert('Запрос клиента','Ошибка сохранения данных');
                                  }
                                })
                              }
                            }, {
                                text: 'Отмена',
                                handler: function(){
                                    AccessClientWin.items.itemAt(0).items.itemAt(0).setValue('');
                                    
                                    AccessClientWin.hide();
                                }
                            }]
                        })
                    });
                    
               /*Конец окна для видимости*/

//////////////////////////////////////////////////////