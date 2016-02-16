/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */




/*Окно для создания клиента */
      var ClientWin = new Ext.Window({
                   title: 'Контакты'
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
                            url: '../../stores/clients/tab/CRU_Clients.jsp',
                            method: 'POST',
                            items: [
                               {
                                   xtype:'textfield',      // textfield
                                   fieldLabel:'ФИО клиента',
                                   name:'txtName'
                                   ,maxLength: 250
                                }
                               ,{
                                   xtype:'textfield',      // textfield
                                   fieldLabel:'Мобильный',
                                   name:'txtTelCellular'
                                   ,maxLength: 50
                                }
                               ,{
                                   xtype:'textfield',      // textfield
                                   fieldLabel:'Стационарный',
                                   name:'txtTel'
                                   ,maxLength: 50
                                }

                               ,{
                                xtype: 'compositefield',
                                fieldLabel: 'email',
                                combineErrors: false,
                                items: [
                                   {
                                   xtype:'textfield',      // textfield
                                   fieldLabel:'email',
                                   name:'txtEMAIL'
                                   ,maxLength: 250
                                   }
                                   ,{
                                       name : 'is_subscribe'
                                       ,xtype: 'checkbox'
                                       ,fieldLabel:'подписан'

                                   }
                                   ,{
                                       xtype: 'displayfield',
                                       value: 'подписан'
                                   }
                                ]
                              }

                              ,{
                                xtype: 'combo',

                                store:ClientOrgStore,
                                mode: 'local',
                                displayField: 'ORGANIZATION_NAME',
                                valueField: 'ORGANIZATION_NAME',
                                typeAhead: false,
                                editable:true,
                                mode: 'local',
                                //forceSelection: true,
                                //triggerAction: 'all',
                                fieldLabel: 'Организация',
                                selectOnFocus: true,
                                anchor:'95%'
                                ,maxLength: 250


                              }
                              ,{
                                   xtype:'textfield',      // textfield
                                   fieldLabel:'Должность',
                                   name:'JOB_TITLE'
                                   ,maxLength: 250
                                   }
                             ,{
                                xtype:'htmleditor',
                                height:150,
                                fieldLabel: 'Описание клиента',
                                anchor:'98%',
                                allowBlank: false
                                //,handler:
                                ,maxLength: 1500
                               }
                            ]
                            ,buttons: [{
                                text: 'Сохранить',
                                handler: function() {

                                var theForm                     = ClientWin.items.itemAt(0).getForm();
                                var v_NAME                      = ClientWin.items.itemAt(0).items.itemAt(0).getValue();
                                var v_TEL_CELLULAR              = ClientWin.items.itemAt(0).items.itemAt(1).getValue();
                                var v_TEL_STAT                  = ClientWin.items.itemAt(0).items.itemAt(2).getValue();
                                var v_EMAIL                     = ClientWin.items.itemAt(0).items.itemAt(3).items.itemAt(0).getValue();
                                var v_IS_SUBSCRIBE              = ClientWin.items.itemAt(0).items.itemAt(3).items.itemAt(1).getValue();
                                var v_CRM_CLIENT_ORGANIZATION   = ClientWin.items.itemAt(0).items.itemAt(4).getValue();
                                var v_JOB_TITLE                 = ClientWin.items.itemAt(0).items.itemAt(5).getValue();
                                var v_CLIENT_DESCRIPTION        = ClientWin.items.itemAt(0).items.itemAt(6).getValue();

                                var connComment1 = new Ext.data.Connection();
                                    theForm.submit({
                                    params: {
                                          P_ID:                           0,
                                          P_NAME:                         v_NAME,
                                          P_TEL_CELLULAR:                 v_TEL_CELLULAR,
                                          P_TEL_STAT:                     v_TEL_STAT,
                                          P_EMAIL:                        v_EMAIL,
                                          P_IS_SUBSCRIBE:                 v_IS_SUBSCRIBE,
                                          P_CRM_CLIENT_ORGANIZATION:      v_CRM_CLIENT_ORGANIZATION,
                                          P_JOB_TITLE:                    v_JOB_TITLE,
                                          P_CLIENT_DESCRIPTION:           v_CLIENT_DESCRIPTION,
                                          P_LAST_USER_ID:                 gUserId

                                     },
                                     success: function(){
                                            Ext.MessageBox.alert('Контакты','Данные сохранены');
                                            /*обнови панель*/
                                            app_store_broker_clients.reload();
                                            //OverwritePanels(v_grid_data);

                                            ClientWin.hide();

                                  },
                                  failure: function(response){
                                     var result=response.responseText;
                                     Ext.MessageBox.alert('Контакты','Ошибка сохранения данных');
                                  }
                                })
                              }
                            }, {
                                text: 'Отмена',
                                handler: function(){
                                    ClientWin.items.itemAt(0).items.itemAt(0).setValue('');
                                    ClientWin.items.itemAt(0).items.itemAt(1).setValue('');
                                    ClientWin.items.itemAt(0).items.itemAt(2).setValue('');
                                    ClientWin.items.itemAt(0).items.itemAt(3).items.itemAt(0).setValue('');
                                    ClientWin.items.itemAt(0).items.itemAt(3).items.itemAt(1).setValue('');
                                    ClientWin.items.itemAt(0).items.itemAt(4).setValue('');
                                    ClientWin.items.itemAt(0).items.itemAt(5).setValue('');
                                    ClientWin.items.itemAt(0).items.itemAt(6).setValue('');

                                    ClientWin.hide();
                                }
                            }]
                        })
                    });
               /*Конец окна для создания клиента*/
//////////////////////////////////////////////////////
