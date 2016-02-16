/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */


            var NewReqFormFields =   [
                              {
                                layout:'column',
                                items:[{
                                    columnWidth:.5,
                                    layout: 'form',
                                    items: [
                                   /**client*/
                                   
                                   {
                                           xtype:'textfield',      // textfield
                                           fieldLabel:'ФИО клиента',
                                           name:'txtName'
                                           ,maxLength: 250
                                           ,allowBlank:false
                                           ,blankText:'Обязательно для заполнения'
                                           ,maxLengthText:'Максимум {0} символов' 
                                        }
                                       ,{
                                           xtype:'textfield',      // textfield
                                           fieldLabel:'Мобильный',
                                           name:'txtTelCellular'
                                           ,allowBlank:false
                                             ,maxLength: 50
                                           ,blankText:'Обязательно для заполнения'
                                           ,maxLengthText:'Максимум {0} символов' 
                                        }
                                       ,{
                                           xtype:'textfield',      // textfield
                                           fieldLabel:'Стационарный',
                                           name:'txtTel'
                                           ,maxLength: 50
                                           ,maxLengthText:'Максимум {0} символов' 
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
                                           ,maxLengthText:'Максимум {0} символов' 
                                           }
                                           ,{
                                               name : 'is_subscribe'
                                               ,xtype: 'checkbox'
                                               ,fieldLabel:'подписан'

                                           }
                                           ,{
                                               xtype: 'displayfield',
                                               value: 'рассылка'
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
                                        ,maxLengthText:'Максимум {0} символов' 
                                      }
                                      ,{
                                           xtype:'textfield',      // textfield
                                           fieldLabel:'Должность',
                                           name:'JOB_TITLE'
                                           ,maxLength: 250
                                           ,maxLengthText:'Максимум {0} символов' 
                                           }
                                       
                                       ,{
                                        xtype: 'combo',
                                        store: ClientSourceStore,
                                        displayField: 'name',
                                        valueField: 'id',
                                        typeAhead: true,
                                        editable:true,
                                        mode: 'local',
                                        value:1,
                                        forceSelection: true,
                                        triggerAction: 'all',
                                        fieldLabel: 'Источник',
                                        selectOnFocus: true,
                                        anchor:'95%'
                                        
                                        ,maxLength: 250
                                        ,maxLengthText:'Максимум {0} символов' 
                                       }
//                                       ,{
//                                        xtype: 'combo',
//                                        store: ClientLoyalStore,
//                                        displayField: 'name',
//                                        valueField: 'id',
//                                        typeAhead: true,
//                                        editable:true,
//                                        mode: 'local',
//                                        value:1,
//                                        forceSelection: true,
//                                        triggerAction: 'all',
//                                        fieldLabel: 'Лояльность',
//                                        selectOnFocus: true,
//                                        anchor:'95%',
//                                        allowBlank:false
//                                       }    
//                                       ,{
//                                        xtype: 'combo',
//                                        store: ClientStatusStore,
//                                        displayField: 'name',
//                                        valueField: 'id',
//                                        typeAhead: true,
//                                        editable:true,
//                                        mode: 'local',
//                                        value:1,
//                                        forceSelection: true,
//                                        triggerAction: 'all',
//                                        fieldLabel: 'Статус клиента',
//                                        selectOnFocus: true,
//                                        anchor:'95%',
//                                        allowBlank:false
//                                       } 
//                                        ,{
//                                        xtype: 'combo',
//                                        store: ClientWarmStore,
//                                        displayField: 'name',
//                                        valueField: 'id',
//                                        typeAhead: true,
//                                        editable:true,
//                                        mode: 'local',
//                                        value:1,
//                                        forceSelection: true,
//                                        triggerAction: 'all',
//                                        fieldLabel: 'Подогретость',
//                                        selectOnFocus: true,
//                                        anchor:'95%',
//                                        allowBlank:false
//                                       }
                                       
                                      
                                      ,{
                                        xtype: 'hidden',
                                        store: ClientVisbilityStore,
                                        displayField: 'name',
                                        valueField: 'id',
                                        typeAhead: true,
                                        editable:true,
                                        mode: 'local',
                                        value:1,
                                        forceSelection: true,
                                        triggerAction: 'all',
                                        fieldLabel: 'Видимость',
                                        selectOnFocus: true,
                                        anchor:'95%'
                                        
                                       }     
                                     ,{
                                        xtype:'htmleditor',
                                        height:100,
                                        fieldLabel: 'Комментарий',
                                        anchor:'98%'
                                        
                                        ,maxLength: 1400
                                        ,maxLengthText:'Максимум {0} символов' 
                                        //,handler:
                                       }
                                       
                                       
                                        
                                    /**client end*/
                                   ]
                                },{
                                    columnWidth:.5,
                                    layout: 'form',
                                    items: [
                                     /*request*/
                                        
                                       {
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
                                        anchor:'95%'
                                       ,allowBlank:false
                                       ,blankText:'Обязательно для заполнения'
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
                                           },
                                           {
                                               xtype: 'displayfield',
                                               value: 'до'
                                           }
                                           ,{
                                               xtype: 'numberfield'
                                               ,width: 48
                                               ,value :0
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
                                            anchor:'95%'
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
                                           },
                                           {
                                               xtype: 'displayfield',
                                               value: 'до'
                                           }
                                           ,{
                                               xtype: 'numberfield'
                                               ,width: 48
                                               ,value :0
                                           }


                                        ]
                                    }
                                    ,{
                                           xtype:'textfield',      // textfield
                                           fieldLabel:'Срочность'
                                           ,maxLength: 250
                                        }
                                        ,{
                                           xtype:'textfield',      // textfield
                                           fieldLabel:'Местоположение'
                                           ,maxLength: 250
                                        }
                                        ,{
                                           xtype:'textfield',      // textfield
                                           fieldLabel:'Лоты'
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
                                            anchor:'95%'
                                           }
                                         ,{
                                            xtype: 'combo',
                                            store: ClRequestStatusStore,
                                            displayField: 'name',
                                            valueField: 'id',
                                            value:1,
                                            typeAhead: true,
                                            editable:true,
                                            mode: 'local',
                                            forceSelection: true,
                                            triggerAction: 'all',
                                            fieldLabel: 'Статус заявки',
                                            selectOnFocus: true,
                                            anchor:'95%'
                                           }  
                                           ,{
                                            xtype: 'combo',
                                            store: DepStore,
                                            displayField: 'dep',
                                            valueField: 'dep_id',
                                            value:gUserDepId,
                                            typeAhead: true,
                                            editable:true,
                                            mode: 'local',
                                            forceSelection: true,
                                            triggerAction: 'all',
                                            fieldLabel: 'Отдел',
                                            selectOnFocus: true,
                                            anchor:'95%'
                                           }  
                                       ,{
                                        xtype:'htmleditor',
                                        height:200,
                                        fieldLabel: 'Дополнительная информация',
                                        anchor:'98%'
                                        
                                        ,maxLength: 1400
                                        ,maxLengthText:'Максимум {0} символов' 
                                        //,handler:
                                       }
                                     /*request end*/
                                    ]
                                }]
                            }
                             ];



var ClientsNewReqFormFields =   [
                              
 /*request*/
                                        
                                       {
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
                                        anchor:'95%'
                                        ,allowBlank:false
                                       ,blankText:'Обязательно для заполнения'
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
                                           },
                                           {
                                               xtype: 'displayfield',
                                               value: 'до'
                                           }
                                           ,{
                                               xtype: 'numberfield'
                                               ,width: 48
                                               ,value :0
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
                                            anchor:'95%'
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
                                           },
                                           {
                                               xtype: 'displayfield',
                                               value: 'до'
                                           }
                                           ,{
                                               xtype: 'numberfield'
                                               ,width: 48
                                               ,value :0
                                           }


                                        ]
                                    }
                                    ,{
                                           xtype:'textfield',      // textfield
                                           fieldLabel:'Срочность'
                                           ,maxLength: 250
                                        }
                                        ,{
                                           xtype:'textfield',      // textfield
                                           fieldLabel:'Местоположение'
                                           ,maxLength: 250
                                        }
                                        ,{
                                           xtype:'textfield',      // textfield
                                           fieldLabel:'Лоты'
                                           
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
                                            anchor:'95%'
                                           }
                                         ,{
                                            xtype: 'combo',
                                            store: ClRequestStatusStore,
                                            displayField: 'name',
                                            valueField: 'id',
                                            value:1,
                                            typeAhead: true,
                                            editable:true,
                                            mode: 'local',
                                            forceSelection: true,
                                            triggerAction: 'all',
                                            fieldLabel: 'Статус заявки',
                                            selectOnFocus: true,
                                            anchor:'95%'
                                           }  
                                           ,{
                                            xtype: 'combo',
                                            store: DepStore,
                                            displayField: 'dep',
                                            valueField: 'dep_id',
                                            value:gUserDepId,
                                            typeAhead: true,
                                            editable:true,
                                            mode: 'local',
                                            forceSelection: true,
                                            triggerAction: 'all',
                                            fieldLabel: 'Отдел',
                                            selectOnFocus: true,
                                            anchor:'95%'
                                           }  
                                       ,{
                                        xtype:'htmleditor',
                                        height:200,
                                        fieldLabel: 'Дополнительная информация',
                                        anchor:'98%'
                                        ,maxLength: 250
                                        //,handler:
                                       }
                                     /*request end*/

                             ];



var RequestFilterFormFields =   [
                              
                                    {
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
                                        ,maxLengthText:'Максимум {0} символов' 
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
                                        anchor:'95%'
                                        ,allowBlank:false
                                       ,blankText:'Обязательно для заполнения'
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
                                           },
                                           {
                                               xtype: 'displayfield',
                                               value: 'до'
                                           }
                                           ,{
                                               xtype: 'numberfield'
                                               ,width: 48
                                               ,value :0
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
                                            anchor:'95%'
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
                                           },
                                           {
                                               xtype: 'displayfield',
                                               value: 'до'
                                           }
                                           ,{
                                               xtype: 'numberfield'
                                               ,width: 48
                                               ,value :0
                                           }


                                        ]
                                    }
                                    ,{
                                           xtype:'textfield',      // textfield
                                           fieldLabel:'Срочность'
                                           ,maxLength: 250
                                        }
                                        ,{
                                           xtype:'textfield',      // textfield
                                           fieldLabel:'Местоположение'
                                           ,maxLength: 250
                                        }
                                        ,{
                                           xtype:'textfield',      // textfield
                                           fieldLabel:'Лоты'
                                           
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
                                            anchor:'95%'
                                           }
                                         ,{
                                            xtype: 'combo',
                                            store: ClRequestStatusStore,
                                            displayField: 'name',
                                            valueField: 'id',
                                            value:1,
                                            typeAhead: true,
                                            editable:true,
                                            mode: 'local',
                                            forceSelection: true,
                                            triggerAction: 'all',
                                            fieldLabel: 'Статус заявки',
                                            selectOnFocus: true,
                                            anchor:'95%'
                                           }  
                                           ,{
                                            xtype: 'combo',
                                            store: DepStore,
                                            displayField: 'dep',
                                            valueField: 'dep_id',
                                            value:gUserDepId,
                                            typeAhead: true,
                                            editable:true,
                                            mode: 'local',
                                            forceSelection: true,
                                            triggerAction: 'all',
                                            fieldLabel: 'Отдел',
                                            selectOnFocus: true,
                                            anchor:'95%'
                                           }  
                                       ,{
                                        xtype:'htmleditor',
                                        height:200,
                                        fieldLabel: 'Дополнительная информация',
                                        anchor:'98%'
                                        ,maxLength: 250
                                        //,handler:
                                       }
                                     /*request end*/

                             ];



