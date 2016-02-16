/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

Ext.ns("app");


app.Callstab =  Ext.extend(
    Ext.Panel,{
        initComponent: function(){

            var config = {
                    xtype: 'panel',
                    autoScroll : 1,
                    overflow:'auto',
                    layout: 'border',
                    items: [
                        {
                         region: 'north',
                         xtype:'callsgrid'
                         ,height:250
                         
                         }
                      // eof    region: 'north'
                       ,{
                          region: 'center'
                          ,layout: 'border'
                          ,split: true
                          ,border: false
                          ,items : [
                                /*{xtype: 'calldetailpan'
                                  ,region: 'west'
                                }*/
                               
                                {xtype:'rootcalldetailpan' }
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

            app.Callstab.superclass.initComponent.apply(this, arguments);

            var UniversalGrid  = this.items.itemAt(0);
            var additionalPanel= this.items.itemAt(1).items.itemAt(0).items.itemAt(0);
            var guessClientPanel= this.items.itemAt(1).items.itemAt(0).items.itemAt(1);
            var resultPanel    = this.items.itemAt(1).items.itemAt(1);
        //    var ClientPanel    = this.items.itemAt(2).items.itemAt(0);
        //    var ClientRequestPanel    = this.items.itemAt(2).items.itemAt(1);

                function reload_all_stores() {
                                            app_store_calls.reload();
                                            app_store_broker_calls.reload();
                                            app_store_dep_calls.reload();
                }
          var task = {
            run: function(){
                reload_all_stores();
            },
            interval: 240000 //1000 //1 second
        }
        Ext.TaskMgr.start(task);
  
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
                                   xtype:'textfield',      // textfield
                                   fieldLabel:'Лоты',
                                   name:'txtLots'

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
                                var lots = CallWin.items.itemAt(0).items.itemAt(3).getValue();
                                var broker = CallWin.items.itemAt(0).items.itemAt(4).getValue();
                                var descripton = CallWin.items.itemAt(0).items.itemAt(5).getValue();
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
                                      ,P_LOTS : lots
                                      
                                     },
                                     success: function(){
                                            Ext.MessageBox.alert('Звонок','Данные сохранены');
                                            app_store_calls.reload();
                                            app_store_broker_calls.reload();
                                            app_store_dep_calls.reload();
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
                                    CallWin.items.itemAt(0).items.itemAt(5).setValue('');
                                    CallWin.hide();}
                            }]
                        })
                    });
               /*Конец окна для создания звонка*/
//////////////////////////////////////////////////////

/*Окно для создания звонка */
            var CallWinSek = new Ext.Window({
                   title: 'Звонок'
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
                                xtype: 'compositefield',
                                fieldLabel: 'Телефон',
                                combineErrors: false,
                                items: [
                                    {
                                   xtype:'textfield',      // textfield
                                   //fieldLabel:'Телефон',
                                   name:'txtCost'
                                   ,enableKeyEvents:true
                                   ,listeners: {
                                    keyup: function(t,e){ 
                                            //Ext.MessageBox.alert('Сотрудник','Данные сохранены '+ this.getValue());
                                           
                                        //CallWinSek.items.itemAt(0).items.itemAt(2).items.itemAt(1).setText(this.getValue());
                                        CallWinSek.items.itemAt(0).items.itemAt(2).items.itemAt(1).html.update(this.getValue());   
                                       // tnis.qtip.show();
                                        //QuicSearch(this.getValue())
                                      }
                                }
                                
                                }
                                ,{xtype:'label'
                                  ,value:'test'
                                 
                                 
                                    }
                                ]}
                               
                              
                                 ,{
                                   xtype:'textfield',      // textfield
                                   fieldLabel:'Лоты',
                                   name:'txtLots'

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
                                        CallWinSek.items.itemAt(0).items.itemAt(5).setValue(CallWinSek.items.itemAt(0).items.itemAt(5).getValue() + '<br><b>Брокер не снял трубку</b>');
                                    }

                                }
                               }
                               ,{
                                xtype: 'compositefield',
                                fieldLabel: 'Характер ',
                                combineErrors: false,
                                items: [
                                   {
                                        xtype: 'combo',

                                        store: CharacterStore,
                                        mode: 'local',
                                        displayField: 'name',
                                        valueField: 'id',
                                        typeAhead: true,
                                        editable:true,
                                        mode: 'local',
                                        forceSelection: true,
                                        triggerAction: 'all',
                                        fieldLabel: 'Характер',
                                        selectOnFocus: true,
                                        anchor:'95%',
                                        width: 118,
                                        allowBlank:true,
                                        value : 1

                                      }
                                      ,
                                   {
                                       xtype: 'displayfield',
                                       value: 'Бюджет'
                                   }
                                   ,{
                                       name : 'budjet'
                                       ,xtype: 'textfield'
                                       ,width: 98
                                      // ,value :new Date().getHours()
                                       ,allowBlank: true,
                                       value : 0
                                   },
                                   {
                                        xtype: 'combo',

                                        store: CurrencyStore,
                                        mode: 'local',
                                        displayField: 'name',
                                        valueField: 'id',
                                        typeAhead: true,
                                        editable:true,
                                        mode: 'local',
                                        forceSelection: true,
                                        triggerAction: 'all',
                                        fieldLabel: 'Валюта',
                                        selectOnFocus: true,
                                        anchor:'95%',
                                        width: 58,
                                        allowBlank:true,
                                        value : 1

                                      }
                                ]
                            }
                            ]
                            ,buttons: [{
                                text: 'Сохранить',
                                handler: function() {

                                var theForm    = CallWinSek.items.itemAt(0).getForm();
                                var DatePic    = CallWinSek.items.itemAt(0).items.itemAt(0).items.itemAt(0).getValue();
                                var HourPic    = CallWinSek.items.itemAt(0).items.itemAt(0).items.itemAt(1).getValue();
                                var MinPic     = CallWinSek.items.itemAt(0).items.itemAt(0).items.itemAt(3).getValue();
                                var RekSource  = CallWinSek.items.itemAt(0).items.itemAt(1).getValue();

                                var tel        = CallWinSek.items.itemAt(0).items.itemAt(2).items.itemAt(0).getValue();
                                var lots       = CallWinSek.items.itemAt(0).items.itemAt(3).getValue();
                                var broker     = CallWinSek.items.itemAt(0).items.itemAt(4).getValue();
                                var descripton = CallWinSek.items.itemAt(0).items.itemAt(5).getValue();
                                var callid     = CallWinSek.items.itemAt(0).items.itemAt(6).getValue();
                                var mode       = CallWinSek.items.itemAt(0).items.itemAt(7).getValue();
                                
                                var character_id  = CallWinSek.items.itemAt(0).items.itemAt(9).items.itemAt(0).getValue();
                                var budjet        = CallWinSek.items.itemAt(0).items.itemAt(9).items.itemAt(2).getValue();
                                var currency_id   = CallWinSek.items.itemAt(0).items.itemAt(9).items.itemAt(3).getValue();
                                

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
                                      ,P_LOTS : lots
                                      ,P_BUDJET : budjet
                                      ,P_CHARACTER_ID : character_id
                                      ,P_CURRENCY_ID:currency_id

                                     },
                                     success: function(){
                                            Ext.MessageBox.alert('Звонок','Данные сохранены');
                                            app_store_calls.reload();
                                            app_store_broker_calls.reload();
                                            app_store_dep_calls.reload();
                                            
                                            CallWinSek.items.itemAt(0).items.itemAt(0).items.itemAt(0).setValue('');
                                            CallWinSek.items.itemAt(0).items.itemAt(0).items.itemAt(1).setValue('');
                                            CallWinSek.items.itemAt(0).items.itemAt(0).items.itemAt(3).setValue('');
                                            CallWinSek.items.itemAt(0).items.itemAt(1).setValue('');
                                            CallWinSek.items.itemAt(0).items.itemAt(2).items.itemAt(0).setValue('');
                                            CallWinSek.items.itemAt(0).items.itemAt(3).setValue('');
                                            CallWinSek.items.itemAt(0).items.itemAt(4).setValue('');
                                            CallWinSek.items.itemAt(0).items.itemAt(5).setValue('');
                                            CallWinSek.items.itemAt(0).items.itemAt(6).setValue('');
                                            CallWinSek.items.itemAt(0).items.itemAt(7).setValue('');
//                                            CallWinSek.items.itemAt(0).items.itemAt(9).items.itemAt(0).setValue('');
//                                            CallWinSek.items.itemAt(0).items.itemAt(9).items.itemAt(2).setValue('');
//                                            CallWinSek.items.itemAt(0).items.itemAt(9).items.itemAt(3).setValue('');
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
                                    CallWinSek.items.itemAt(0).items.itemAt(2).items.itemAt(0).setValue('');
                                    CallWinSek.items.itemAt(0).items.itemAt(3).setValue('');
                                    CallWinSek.items.itemAt(0).items.itemAt(4).setValue('');
                                    CallWinSek.items.itemAt(0).items.itemAt(5).setValue('');
                                    CallWinSek.items.itemAt(0).items.itemAt(6).setValue('');
                                    CallWinSek.items.itemAt(0).items.itemAt(7).setValue('');
//                                    CallWinSek.items.itemAt(0).items.itemAt(9).items.itemAt(0).setValue('');
//                                    CallWinSek.items.itemAt(0).items.itemAt(9).items.itemAt(2).setValue('');
//                                    CallWinSek.items.itemAt(0).items.itemAt(9).items.itemAt(3).setValue('');
                                    CallWinSek.hide();}
                            }]
                        })
                    });

               /*Конец окна для создания звонка*/
//////////////////////////////////////////////////////

/*Окно для результата*/
      var CallWinResult = new Ext.Window({
                   title:'Результат'
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
                                            app_store_calls.reload();
                                            app_store_broker_calls.reload();
                                            app_store_dep_calls.reload();
                                            OverwritePanels(v_grid_data);

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




              var v_input_tel = 0; 
              var v_call_id = 0;

            function SetCallId(p){
                  v_call_id = p;
              };

           var v_grid_data;
           function SetGridData(data){
                  v_grid_data = data;
              };
           

            UniversalGrid.getSelectionModel().on('rowselect', function(sm, rowIdx, r) {
                                    OverwritePanels(r.data);
                                    SetCallId(r.data.call_id);
                                    SetGridData(r.data);

    			});

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
                              ,P_TRANSFER_ID: oGrid_event.record.data.transfer_id
                              ,P_TRANSFER_USER: oGrid_event.record.data.transfer_user
                              ,P_CALL_GRAVITY: oGrid_event.record.data.CALL_GRAVITY
                              ,P_LAST_USER_ID: gUserId
                              ,P_MODE : 'CRU'


                          },
                          success: function(response){

                                Ext.MessageBox.alert('Звонок','Данные сохранены');
                                            app_store_calls.reload();
                                            app_store_broker_calls.reload();
                                            app_store_dep_calls.reload();

                             
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
                  
                  CallWinSek.items.itemAt(0).items.itemAt(6).setValue('0');
                  CallWinSek.items.itemAt(0).items.itemAt(7).setValue('CRU');
                  
//                  CallWinSek.items.itemAt(0).items.itemAt(9).items.itemAt(0).setValue(1);
//                  CallWinSek.items.itemAt(0).items.itemAt(9).items.itemAt(2).setValue('пусто');
//                  CallWinSek.items.itemAt(0).items.itemAt(9).items.itemAt(3).setValue(1);

                } else { 
                    CallWin.show();
                    CallWin.items.itemAt(0).items.itemAt(0).items.itemAt(0).setValue(new Date());
                    CallWin.items.itemAt(0).items.itemAt(0).items.itemAt(1).setValue(new Date().getHours());
                    CallWin.items.itemAt(0).items.itemAt(0).items.itemAt(3).setValue(new Date().getMinutes());
//                    
//                  CallWinSek.items.itemAt(0).items.itemAt(9).items.itemAt(0).setValue(1);
//                  CallWinSek.items.itemAt(0).items.itemAt(9).items.itemAt(2).setValue('пусто');
//                  CallWinSek.items.itemAt(0).items.itemAt(9).items.itemAt(3).setValue(1);

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
                    CallWinSek.items.itemAt(0).items.itemAt(2).items.itemAt(0).setValue(v_grid_data.input_tel);//телефон
                    CallWinSek.items.itemAt(0).items.itemAt(3).setValue(v_grid_data.call_lots);//телефон
                    CallWinSek.items.itemAt(0).items.itemAt(4).setValue(v_grid_data.transfer_id);//на кого переведён
                    CallWinSek.items.itemAt(0).items.itemAt(5).setValue(v_grid_data.call_description);//описание
                    CallWinSek.items.itemAt(0).items.itemAt(6).setValue(v_call_id);
                    
                    
                               CallWinSek.items.itemAt(0).items.itemAt(9).items.itemAt(0).setValue(v_grid_data.character_id);
                              CallWinSek.items.itemAt(0).items.itemAt(9).items.itemAt(2).setValue(v_grid_data.budjet);
                              CallWinSek.items.itemAt(0).items.itemAt(9).items.itemAt(3).setValue(v_grid_data.currency_id);
                               
                    
                    CallWinSek.items.itemAt(0).items.itemAt(7).setValue('U');


                }

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
            
            var v_res_info = "";
            

            function OverwriteGuessPanel(input_tel){
               var guess_client_conn = new Ext.data.Connection();
                   guess_client_conn.request({
                      url: '../stores/clients/tab/Guess_Client.jsp',
                      params: {
                          p_input_tel:input_tel
                         ,p_user_id: gUserId
                      },
                      success: function(resp,opt) {
                         /*v_res_info = Ext.util.JSON.decode(
                           resp.responseText

                         );*/
                        guessClientPanel.tpl.overwrite(guessClientPanel.body, {CLIENT_INFO:resp.responseText});   
                      //CommentResp.tpl.overwrite(CommentResp.body, {comment:pRespCommBody});

                      },
                      failure: function(resp,opt) {
                         Ext.Msg.alert('Error','Ошибка связи');
                      }
                    });
                
                
            }
            
            
            function OverwritePanels(data){
                additionalPanel.tpl.overwrite(additionalPanel.body, data);
                resultPanel.tpl.overwrite(resultPanel.body, data);
                OverwriteGuessPanel(data.input_tel);
              
            }
    }

 });
Ext.reg('callstab', app.Callstab);
// }}}




app.CallstabReception =  Ext.extend(
    Ext.Panel,{
        initComponent: function(){

            var config = {
                   xtype: 'panel',
                    autoScroll : 1,
                    overflow:'auto',
                    layout: 'border',
                    items: [
                        {
                            region: 'north',
                            height:1,
                            html:'<hr>'
                        }
                        ,
                        {
                            region: 'center',
                            //height:600,
                            xtype:'callsgrid'
                        }
                      // eof    region: 'north'

                    ]
            }; // eo config object





            // Применяем config


            Ext.apply(this, Ext.apply(this.initialConfig, config));
            app.CallstabReception.superclass.initComponent.apply(this, arguments);
            var UniversalGrid  = this.items.itemAt(1);



/*Окно для создания звонка*/
            var CallWinSek = new Ext.Window({
                   title: 'Звонок'
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
                                   xtype:'textfield',      // textfield
                                   fieldLabel:'Лоты',
                                   name:'txtLots'

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
                                        CallWinSek.items.itemAt(0).items.itemAt(5).setValue(CallWinSek.items.itemAt(0).items.itemAt(5).getValue() + '<br><b>Брокер не снял трубку</b>');
                                    }

                                }
                               }
                               ,{
                                xtype: 'compositefield',
                                fieldLabel: 'Характер ',
                                combineErrors: false,
                                items: [
                                   {
                                        xtype: 'combo',

                                        store: CharacterStore,
                                        mode: 'local',
                                        displayField: 'name',
                                        valueField: 'id',
                                        typeAhead: true,
                                        editable:true,
                                        mode: 'local',
                                        forceSelection: true,
                                        triggerAction: 'all',
                                        fieldLabel: 'Характер',
                                        selectOnFocus: true,
                                        anchor:'95%',
                                        width: 118,
                                        allowBlank:true,
                                        value : 1

                                      }
                                      ,
                                   {
                                       xtype: 'displayfield',
                                       value: 'Бюджет'
                                   }
                                   ,{
                                       name : 'budjet'
                                       ,xtype: 'textfield'
                                       ,width: 98
                                      // ,value :new Date().getHours()
                                       ,allowBlank: true,
                                       value : 0
                                   },
                                   {
                                        xtype: 'combo',

                                        store: CurrencyStore,
                                        mode: 'local',
                                        displayField: 'name',
                                        valueField: 'id',
                                        typeAhead: true,
                                        editable:true,
                                        mode: 'local',
                                        forceSelection: true,
                                        triggerAction: 'all',
                                        fieldLabel: 'Валюта',
                                        selectOnFocus: true,
                                        anchor:'95%',
                                        width: 58,

                                        allowBlank:true,
                                        value : 1

                                      }
                                ]
                            }
                            ]
                            ,buttons: [{
                                text: 'Сохранить',
                                handler: function() {

                                var theForm = CallWinSek.items.itemAt(0).getForm();
                                var DatePic = CallWinSek.items.itemAt(0).items.itemAt(0).items.itemAt(0).getValue();
                                var HourPic = CallWinSek.items.itemAt(0).items.itemAt(0).items.itemAt(1).getValue();
                                var MinPic = CallWinSek.items.itemAt(0).items.itemAt(0).items.itemAt(3).getValue();
                                var RekSource   = CallWinSek.items.itemAt(0).items.itemAt(1).getValue();
                                var tel         = CallWinSek.items.itemAt(0).items.itemAt(2).getValue();
                                var lots         = CallWinSek.items.itemAt(0).items.itemAt(3).getValue();
                                var broker      = CallWinSek.items.itemAt(0).items.itemAt(4).getValue();
                                var descripton  = CallWinSek.items.itemAt(0).items.itemAt(5).getValue();
                                var callid      = CallWinSek.items.itemAt(0).items.itemAt(6).getValue();
                                var mode        = CallWinSek.items.itemAt(0).items.itemAt(7).getValue();
 
                                var character_id  = CallWinSek.items.itemAt(0).items.itemAt(9).items.itemAt(0).getValue();
                                var budjet        = CallWinSek.items.itemAt(0).items.itemAt(9).items.itemAt(2).getValue();
                                var currency_id   = CallWinSek.items.itemAt(0).items.itemAt(9).items.itemAt(3).getValue();
                                
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
                                      ,P_LOTS : lots
                                       ,P_BUDJET : budjet
                                      ,P_CHARACTER_ID : character_id
                                      ,P_CURRENCY_ID:currency_id

                                     },
                                     success: function(){
                                            Ext.MessageBox.alert('Звонок','Данные сохранены');
                                            app_store_calls.reload();
                                            app_store_broker_calls.reload();
                                            app_store_dep_calls.reload();
                                            CallWinSek.hide();
                                  },
                                  failure: function(response){CallWinSek.items.itemAt(0).items.itemAt(6).setValue('');
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
                                    CallWinSek.items.itemAt(0).items.itemAt(7).setValue('');
                                    CallWinSek.items.itemAt(0).items.itemAt(9).items.itemAt(0).setValue('');
                                    CallWinSek.items.itemAt(0).items.itemAt(9).items.itemAt(2).setValue('');
                                    CallWinSek.items.itemAt(0).items.itemAt(9).items.itemAt(3).setValue('');
                                    CallWinSek.hide();}
                            }]
                        })
                    });
               /*Конец окна для создания звонка*/
//////////////////////////////////////////////////////


            function reload_all_stores() {
                app_store_calls.reload();
                app_store_broker_calls.reload();
                app_store_dep_calls.reload();
            }
            var task = {
                run: function(){
                    reload_all_stores();
                },
                interval: 60000 //1000 //1 second
            }
            Ext.TaskMgr.start(task);

              var v_call_id = 0;

            function SetCallId(p){
                  v_call_id = p;
              };

           var v_grid_data;
           function SetGridData(data){
                  v_grid_data = data;
              };

            UniversalGrid.getSelectionModel().on('rowselect', function(sm, rowIdx, r) {
                                    
                                    SetCallId(r.data.call_id);
                                    SetGridData(r.data);

    			});



            

            UniversalGrid.on('addTbClick', function(){
                
                  CallWinSek.show();
                  CallWinSek.items.itemAt(0).items.itemAt(0).items.itemAt(0).setValue(new Date());
                  CallWinSek.items.itemAt(0).items.itemAt(0).items.itemAt(1).setValue(new Date().getHours());
                  CallWinSek.items.itemAt(0).items.itemAt(0).items.itemAt(3).setValue(new Date().getMinutes());
                  CallWinSek.items.itemAt(0).items.itemAt(6).setValue('0');
                  CallWinSek.items.itemAt(0).items.itemAt(7).setValue('CRU');
                  
                  CallWinSek.items.itemAt(0).items.itemAt(9).items.itemAt(0).setValue(1);
                  CallWinSek.items.itemAt(0).items.itemAt(9).items.itemAt(2).setValue('пусто');
                  CallWinSek.items.itemAt(0).items.itemAt(9).items.itemAt(3).setValue(1);

                
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
                    CallWinSek.items.itemAt(0).items.itemAt(3).setValue(v_grid_data.call_lots);//лоты
                    CallWinSek.items.itemAt(0).items.itemAt(4).setValue(v_grid_data.transfer_id);//на кого переведён
                    CallWinSek.items.itemAt(0).items.itemAt(5).setValue(v_grid_data.call_description);//описание
                    CallWinSek.items.itemAt(0).items.itemAt(6).setValue(v_call_id);
                    CallWinSek.items.itemAt(0).items.itemAt(9).items.itemAt(0).setValue(v_grid_data.character_id);
                    CallWinSek.items.itemAt(0).items.itemAt(9).items.itemAt(2).setValue(v_grid_data.budjet);
                    CallWinSek.items.itemAt(0).items.itemAt(9).items.itemAt(3).setValue(v_grid_data.currency_id);
                      
                    CallWinSek.items.itemAt(0).items.itemAt(7).setValue('U');


                }

            });




    }

 });
Ext.reg('callstabreception', app.CallstabReception);