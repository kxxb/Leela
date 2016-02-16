/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */


Ext.ns("actions");

var CallsRowIndex = -1;

actions.ClientsCalls =  Ext.extend(

    Ext.Panel,{
        initComponent: function(){

            var config = {
                   xtype: 'panel',
                    autoScroll : 1,
                    overflow:'auto',
                    layout: 'border',
                    items: [
                        {
                         region: 'north'
                         ,store:StoreClCalls
                         ,xtype:'clientcallsgrid'
                         ,height:250
                         
                         }
                      // eof    region: 'north'
                       ,{
                           region: 'center'
                          ,layout: 'border'
                          ,xtype:'panel'
                          ,split: true
                          ,border: false
                          ,items : [
                                /*{xtype: 'calldetailpan'
                                  ,region: 'west'
                                }*/
                               
                                {xtype:'calldetailpan'
                                 ,region:'north'   
                                }
                               ,{xtype: 'callresultpan'
                                 ,region: 'center'
                                  }
                            ]
                          //,scope:this
                        }
                       
                    ]
            }; // eo config object

            // Применяем config


            Ext.apply(this, Ext.apply(this.initialConfig, config));

            actions.ClientsCalls.superclass.initComponent.apply(this, arguments);

            var UniversalGrid  = this.items.itemAt(0);
            var additionalPanel= this.items.itemAt(1).items.itemAt(0);
            var resultPanel    = this.items.itemAt(1).items.itemAt(1);
        //    var ClientPanel    = this.items.itemAt(2).items.itemAt(0);
        //    var ClientRequestPanel    = this.items.itemAt(2).items.itemAt(1);
        
        //var StoreClCalls = StoreClCalls;

//        function reload_all_stores() {
//               StoreClCalls.reload();
//               v_grid_data = StoreClCalls.data;
//        }
//          var task = {
//            run: function(){
//                reload_all_stores();
//            },
//            interval: 15000 //1000 //1 second
//        }
//        Ext.TaskMgr.start(task);
//  
  
              var v_input_tel = 0; 
              var v_call_id = 0;

            function SetCallId(p){
                  v_call_id = p;
              };

           var v_grid_data;
           function SetGridData(data){
                  v_grid_data = data;
              };
           
           var v_res_info = "";
           
           function CallsSetRowClickIndex(rInd){
               CallsRowIndex = rInd;
              }; 

            UniversalGrid.getSelectionModel().on('rowselect', function(sm, rowIdx, r) {
                                    //OverwritePanels(r.data);
                                    SetCallId(r.data.call_id);
                                    SetGridData(r.data);
                                    CallsSetRowClickIndex(rowIdx);
                                    OverwritePanels();

    			});
                        
                        
                        
         
            UniversalGrid.on('gridCombo', function(p_transfer_id){
                app_store_dep_calls.reload(
                 {params: {
                    transfer_id:  p_transfer_id
                    }
                 }
             );

                //Ext.MessageBox.alert('Звонок','новый звонок '+p_transfer_id);
            });
            
            
            function OverwritePanels(){
                additionalPanel.tpl.overwrite(additionalPanel.body, v_grid_data);
                resultPanel.tpl.overwrite(resultPanel.body, v_grid_data);
             
            }
            
            
            
            
            StoreClCalls.on('load',function(){
                
                if (CallsRowIndex == -1){
                    
                   additionalPanel.tpl.overwrite(additionalPanel.body, '');
                   resultPanel.tpl.overwrite(resultPanel.body, '');
                } else {
                     /*Нахожу ту строку на которй стоял перед редактированием
                      *и вновь выделяю её
                      **/          
                     UniversalGrid.getSelectionModel().selectRow(CallsRowIndex);
                     UniversalGrid.getView().focusRow(CallsRowIndex);
                     OverwritePanels();
                }
                  
                   
            });               
  
             /*Окно для создания звонка*/
            var CallWin = new Ext.Window({
                   title: 'Звонок'
                  ,closable:true
                  ,iconCls:'win'
                  ,closeAction: "hide"
                  ,width: 550
                  ,height: 300
                  ,plain:true
                  ,layout: 'fit'
                  ,items:  new Ext.FormPanel({
                            frame: true,
                            bodyStyle: 'padding:5px',
                            width: 550,
                            //layout: 'column',
                            url: '../stores/calls/tab/CRU_Calls.jsp',
                            method: 'POST',
                            items: [

                                {
                                xtype: 'compositefield',
                                fieldLabel: 'Дата время',
                                combineErrors: false,
                                items: [
                                   {
                                    xtype:'datefield',      // datefield
                                    format: 'd/m/Y',
                                    allowBlank:false
                                    //,value:new Date()
                                    }
                                   ,{
                                       name : 'hours'
                                       ,xtype: 'numberfield'
                                       ,width: 48
                                      // ,value :new Date().getHours()
                                       ,allowBlank: false
                                   },
                                   {
                                       xtype: 'displayfield',
                                       value: 'часы'
                                   },
                                   {
                                       name : 'minutes'
                                       ,xtype: 'numberfield'
                                       ,width: 48
                                      // ,value :new Date().getMinutes()
                                       ,allowBlank: false
                                   },
                                   {
                                       xtype: 'displayfield',
                                       value: 'минуты'
                                   }
                                ]
                            }
                                
                                ,{
                                xtype: 'combo',
                                
                                store: RekSourceStore,
                                displayField: 'name',
                                valueField: 'id',
                                typeAhead: true,
                                editable:true,
                                mode: 'local',
                                forceSelection: true,
                                triggerAction: 'all',
                                fieldLabel: 'Источник',
                                selectOnFocus: true,
                                anchor:'95%',
                                
                                allowBlank:false

                              }
                              ,{
                                   xtype:'textfield',      // textfield
                                   fieldLabel:'Телефон',
                                   name:'txtCost'

                                }
                              ,{
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
                             ,{
                                xtype:'htmleditor',
                                height:100,
                                fieldLabel: 'Описание',
                                anchor:'98%',
                                allowBlank: false
                                //,handler:
                               }
                            ]
                            ,buttons: [{
                                text: 'Сохранить',
                                handler: function() {

                                var theForm = CallWin.items.itemAt(0).getForm();
                                var DatePic = CallWin.items.itemAt(0).items.itemAt(0).items.itemAt(0).getValue();
                                var HourPic = CallWin.items.itemAt(0).items.itemAt(0).items.itemAt(1).getValue();
                                var MinPic = CallWin.items.itemAt(0).items.itemAt(0).items.itemAt(3).getValue();
                                var RekSource = CallWin.items.itemAt(0).items.itemAt(1).getValue();
                                var tel = CallWin.items.itemAt(0).items.itemAt(2).getValue();
                                var broker = CallWin.items.itemAt(0).items.itemAt(3).getValue();
                                var descripton = CallWin.items.itemAt(0).items.itemAt(4).getValue();
                                var connComment1 = new Ext.data.Connection();
                                    theForm.submit({
                                    params: {
                                       P_ID :0
                                      ,P_CALL_DATE_TIME : DatePic.getDate()+'.'+ ((DatePic.getMonth()) + 1) +'.'+DatePic.getFullYear()+' '+HourPic+':'+MinPic
                                      ,P_CRM_REK_S_SOURCE_ID :RekSource
                                      ,P_REC_SECRETAR : gUserId
                                      ,P_INPUT_TEL : tel
                                      ,P_CALL_DESCRIPTION:descripton
                                      ,P_TRANSFER_ID:broker
                                      ,P_LAST_USER_ID:      gUserId
                                      ,P_MODE : 'CRU'
                                      
                                     },
                                     success: function(){
                                            Ext.MessageBox.alert('Звонок','Данные сохранены');
                                         StoreClCalls.reload();
                                         CallWin.hide();

                                  },
                                  failure: function(response){
                                     var result=response.responseText;
                                     Ext.MessageBox.alert('Звонок','Ошибка сохранения данных');
                                  }
                                })
                              }
                            }, {
                                text: 'Отмена',
                                handler: function(){
                                    CallWin.items.itemAt(0).items.itemAt(0).items.itemAt(0).setValue('');
                                    CallWin.items.itemAt(0).items.itemAt(0).items.itemAt(1).setValue('');
                                    CallWin.items.itemAt(0).items.itemAt(0).items.itemAt(3).setValue('');
                                    CallWin.items.itemAt(0).items.itemAt(1).setValue('');
                                    CallWin.items.itemAt(0).items.itemAt(2).setValue('');
                                    CallWin.items.itemAt(0).items.itemAt(3).setValue('');
                                    CallWin.items.itemAt(0).items.itemAt(4).setValue('');
                                    CallWin.hide();}
                            }]
                        })
                    });
               /*Конец окна для создания звонка*/
//////////////////////////////////////////////////////

/*Окно для создания звонка */
            var CallWinSek = new Ext.Window({
                   title: 'Звонок Секретарь'
                  ,closable:true
                  ,iconCls:'win'
                  ,closeAction: "hide"
                  ,width: 550
                  ,height: 350
                  ,plain:true
                  ,layout: 'fit'
                  ,items:  new Ext.FormPanel({
                            frame: true,
                            bodyStyle: 'padding:5px',
                            width: 550,
                            //layout: 'column',
                            url: '../stores/calls/tab/CRU_Calls.jsp',
                            method: 'POST',
                            items: [

                                {
                                xtype: 'compositefield',
                                fieldLabel: 'Дата время',
                                combineErrors: false,
                                items: [
                                   {
                                    xtype:'datefield',      // datefield
                                    format: 'd/m/Y',
                                    allowBlank:false
                                    //,value:new Date()
                                    }
                                   ,{
                                       name : 'hours'
                                       ,xtype: 'numberfield'
                                       ,width: 48
                                      // ,value :new Date().getHours()
                                       ,allowBlank: false
                                   },
                                   {
                                       xtype: 'displayfield',
                                       value: 'часы'
                                   },
                                   {
                                       name : 'minutes'
                                       ,xtype: 'numberfield'
                                       ,width: 48
                                      // ,value :new Date().getMinutes()
                                       ,allowBlank: false
                                   },
                                   {
                                       xtype: 'displayfield',
                                       value: 'минуты'
                                   }
                                ]
                            }

                                ,{
                                xtype: 'combo',

                                store: RekSourceStore,
                                displayField: 'name',
                                valueField: 'id',
                                typeAhead: true,
                                editable:true,
                                mode: 'local',
                                forceSelection: true,
                                triggerAction: 'all',
                                fieldLabel: 'Источник',
                                selectOnFocus: true,
                                anchor:'95%',

                                allowBlank:false

                              }

                              ,{
                                   xtype:'textfield',      // textfield
                                   fieldLabel:'Телефон',
                                   name:'txtCost'

                                }
                              ,{
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

                             ,{
                                xtype:'htmleditor',
                                height:100,
                                fieldLabel: 'Описание!',
                                anchor:'98%',
                                allowBlank: false
                                //,handler:
                               }
                               ,{
                                xtype:'hidden',
                                allowBlank: false
                                //,handler:
                               }
                               ,{
                                xtype:'hidden',
                                allowBlank: false
                                //,handler:
                               },
                               {xtype: 'checkbox'
                                ,fieldLabel: 'Нет ответа'
                                ,listeners: {
                                    check: function() {
                                        CallWinSek.items.itemAt(0).items.itemAt(4).setValue(CallWinSek.items.itemAt(0).items.itemAt(4).getValue() + '<br><b>Брокер не снял трубку</b>');
                                    }

                                }
                               }
                            ]
                            ,buttons: [{
                                text: 'Сохранить',
                                handler: function() {

                                var theForm = CallWinSek.items.itemAt(0).getForm();
                                var DatePic = CallWinSek.items.itemAt(0).items.itemAt(0).items.itemAt(0).getValue();
                                var HourPic = CallWinSek.items.itemAt(0).items.itemAt(0).items.itemAt(1).getValue();
                                var MinPic = CallWinSek.items.itemAt(0).items.itemAt(0).items.itemAt(3).getValue();
                                var RekSource  = CallWinSek.items.itemAt(0).items.itemAt(1).getValue();

                                var tel        = CallWinSek.items.itemAt(0).items.itemAt(2).getValue();
                                var broker     = CallWinSek.items.itemAt(0).items.itemAt(3).getValue();
                                var descripton = CallWinSek.items.itemAt(0).items.itemAt(4).getValue();
                                var callid     = CallWinSek.items.itemAt(0).items.itemAt(5).getValue();
                                var mode       = CallWinSek.items.itemAt(0).items.itemAt(6).getValue();

                                var connComment1 = new Ext.data.Connection();
                                    theForm.submit({
                                    params: {
                                       P_ID :callid
                                      ,P_CALL_DATE_TIME : DatePic.getDate()+'.'+ ((DatePic.getMonth()) + 1) +'.'+DatePic.getFullYear()+' '+HourPic+':'+MinPic
                                      ,P_CRM_REK_S_SOURCE_ID :RekSource
                                      ,P_REC_SECRETAR : gUserId
                                      ,P_INPUT_TEL : tel
                                      ,P_CALL_DESCRIPTION:descripton
                                      ,P_TRANSFER_ID:broker
                                      ,P_LAST_USER_ID:      gUserId
                                      ,P_MODE : mode

                                     },
                                     success: function(){
                                            Ext.MessageBox.alert('Звонок','Данные сохранены');
                                           StoreClCalls.reload();
                                           
                                            CallWinSek.items.itemAt(0).items.itemAt(0).items.itemAt(0).setValue('');
                                            CallWinSek.items.itemAt(0).items.itemAt(0).items.itemAt(1).setValue('');
                                            CallWinSek.items.itemAt(0).items.itemAt(0).items.itemAt(3).setValue('');
                                            CallWinSek.items.itemAt(0).items.itemAt(1).setValue('');
                                            CallWinSek.items.itemAt(0).items.itemAt(2).setValue('');
                                            CallWinSek.items.itemAt(0).items.itemAt(3).setValue('');
                                            CallWinSek.items.itemAt(0).items.itemAt(4).setValue('');
                                            CallWinSek.items.itemAt(0).items.itemAt(5).setValue('');
                                            CallWinSek.items.itemAt(0).items.itemAt(6).setValue('');
                                            CallWinSek.hide();
                                  },
                                  failure: function(response){
                                     var result=response.responseText;
                                     Ext.MessageBox.alert('Звонок','Ошибка сохранения данных');
                                  }
                                })
                              }
                            }, {
                                text: 'Отмена',
                                handler: function(){
                                    CallWinSek.items.itemAt(0).items.itemAt(0).items.itemAt(0).setValue('');
                                    CallWinSek.items.itemAt(0).items.itemAt(0).items.itemAt(1).setValue('');
                                    CallWinSek.items.itemAt(0).items.itemAt(0).items.itemAt(3).setValue('');
                                    CallWinSek.items.itemAt(0).items.itemAt(1).setValue('');
                                    CallWinSek.items.itemAt(0).items.itemAt(2).setValue('');
                                    CallWinSek.items.itemAt(0).items.itemAt(3).setValue('');
                                    CallWinSek.items.itemAt(0).items.itemAt(4).setValue('');
                                    CallWinSek.items.itemAt(0).items.itemAt(5).setValue('');
                                    CallWinSek.items.itemAt(0).items.itemAt(6).setValue('');
                                    CallWinSek.hide();}
                            }]
                        })
                    });

               /*Конец окна для создания звонка*/
//////////////////////////////////////////////////////

/*Окно для результата*/
      var CallWinResult = new Ext.Window({
                   title: 'Результат'
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
                            url: '../stores/calls/tab/CRU_Calls.jsp',
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
                                height:100,
                                fieldLabel: 'Описание',
                                anchor:'98%',
                                allowBlank: false
                                //,handler:
                               }
                                
                               
                            ]
                            ,buttons: [{
                                text: 'Сохранить',
                                handler: function() {

                                var theForm = CallWinResult.items.itemAt(0).getForm();
                                var v_result =      CallWinResult.items.itemAt(0).items.itemAt(0).getValue();
                                var v_result_desc = CallWinResult.items.itemAt(0).items.itemAt(1).getValue();

                                var connComment1 = new Ext.data.Connection();
                                    theForm.submit({
                                    params: {
                                       P_ID :v_call_id
                                      ,P_RESULT_ID :v_result
                                      ,P_RESULT_DESC : v_result_desc
                                      ,P_LAST_USER_ID:      gUserId
                                      ,P_MODE : 'RES'

                                     },
                                     success: function(){
                                            Ext.MessageBox.alert('Результат звонка','Данные сохранены');
                                            /*обнови панель*/
                                            StoreClCalls.reload();
                                           // OverwritePanels(v_grid_data);

                                            CallWinResult.hide();

                                  },
                                  failure: function(response){
                                     var result=response.responseText;
                                     Ext.MessageBox.alert('Результат звонка','Ошибка сохранения данных');
                                  }
                                })
                              }
                            }, {
                                text: 'Отмена',
                                handler: function(){
                                    CallWinResult.items.itemAt(0).items.itemAt(0).setValue('');
                                    CallWinResult.items.itemAt(0).items.itemAt(1).setValue('');
                                    CallWinResult.hide();
                                }
                            }]
                        })
                    });
               /*Конец окна для создания звонка*/
//////////////////////////////////////////////////////





            UniversalGrid.on('afteredit',function(oGrid_event){
                       Ext.Ajax.request({

                          url: '../stores/calls/tab/CRU_Calls.jsp',
                          params: {

                               P_ID :v_call_id
                              ,P_CALL_DATE_TIME : oGrid_event.record.data.CALL_DATE_TIME
                              ,P_CRM_REK_S_SOURCE_ID :oGrid_event.record.data.CRM_REK_S_SOURCE_ID
                              ,P_REC_SECRETAR : oGrid_event.record.data.CRM_REK_S_SOURCE_ID
                              ,P_INPUT_TEL : oGrid_event.record.data.CRM_REK_S_SOURCE_ID
                              ,P_CALL_DESCRIPTION:oGrid_event.record.data.CALL_DESCRIPTION
                              ,P_TRANSFER_ID: oGrid_event.record.data.transfer_user
                              ,P_LAST_USER_ID: gUserId
                              ,P_MODE : 'CRU'


                          },
                          success: function(response){

                                Ext.MessageBox.alert('Звонок','Данные сохранены');
                                            StoreClCalls.reload();
                                            

                             
                          },
                          failure: function(response){
                             var result=response.responseText;
                             Ext.MessageBox.alert('Ошибка','Ошибка сохранения данных');
                          }
                       });

                  });



            UniversalGrid.on('resultTbClick', function(){
              if (v_call_id ==0 ){
                  Ext.MessageBox.alert('Результат по звонку','Выберите звонок из таблицы, затем опишите его результат.');
              } else {
               CallWinResult.show();
               CallWinResult.items.itemAt(0).items.itemAt(0).setValue(v_grid_data.RESULT_STATUS);
               CallWinResult.items.itemAt(0).items.itemAt(1).setValue('');
              }

            });
            UniversalGrid.on('addTbClick', function(){
                if (gUserId == 49 | gUserId == 131 | gUserId == 142 | gUserId == 279 | gUserId == 17) {
                  CallWinSek.show();
                  CallWinSek.items.itemAt(0).items.itemAt(0).items.itemAt(0).setValue(new Date());
                  CallWinSek.items.itemAt(0).items.itemAt(0).items.itemAt(1).setValue(new Date().getHours());
                  CallWinSek.items.itemAt(0).items.itemAt(0).items.itemAt(3).setValue(new Date().getMinutes());
                  CallWinSek.items.itemAt(0).items.itemAt(5).setValue('0');
                  CallWinSek.items.itemAt(0).items.itemAt(6).setValue('CRU');

                } else { 
                    CallWin.show();
                    CallWin.items.itemAt(0).items.itemAt(0).items.itemAt(0).setValue(new Date());
                    CallWin.items.itemAt(0).items.itemAt(0).items.itemAt(1).setValue(new Date().getHours());
                    CallWin.items.itemAt(0).items.itemAt(0).items.itemAt(3).setValue(new Date().getMinutes());

                }
                //Ext.MessageBox.alert('Звонок','новый звонок ');
            });

        UniversalGrid.on('editTbClick', function(){
                if (v_call_id==0){
                Ext.MessageBox.alert('Звонок','Неновый звонок');
                } else {
                    CallWinSek.show();
                    CallWinSek.items.itemAt(0).items.itemAt(0).items.itemAt(0).setValue(new Date());
                    CallWinSek.items.itemAt(0).items.itemAt(0).items.itemAt(1).setValue(new Date().getHours());
                    CallWinSek.items.itemAt(0).items.itemAt(0).items.itemAt(3).setValue(new Date().getMinutes());
                    CallWinSek.items.itemAt(0).items.itemAt(1).setValue(v_grid_data.crm_rek_s_source_id);//источник релама
                    CallWinSek.items.itemAt(0).items.itemAt(2).setValue(v_grid_data.input_tel);//телефон
                    CallWinSek.items.itemAt(0).items.itemAt(3).setValue(v_grid_data.transfer_id);//на кого переведён
                    CallWinSek.items.itemAt(0).items.itemAt(4).setValue(v_grid_data.call_description);//описание
                    CallWinSek.items.itemAt(0).items.itemAt(5).setValue(v_call_id);
                    CallWinSek.items.itemAt(0).items.itemAt(6).setValue('U');


                }

            });



    }

 });
Ext.reg('actionsClientsCalls', actions.ClientsCalls);
// }}}

