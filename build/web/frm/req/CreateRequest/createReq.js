/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
    var DepId;
    var ContrTypeId;
    var cb1 = 2;
    var cb2 = 2;

//    Ext.QuickTips.init();


 function createRequest(){
          displayFormCreate();
          //window.location = 'createRequest.jsp';
        }


    //data sources


    var dsDepartments = new Ext.data.JsonStore({
        root: 'results',
        fields: [
                {name: 'id', mapping:'id', type: 'string'},
                {name: 'name', mapping:'name', type: 'string'}
        ],
        proxy: new Ext.data.ScriptTagProxy({
            url: '../frm/req/CreateRequest/getDep.jsp'
        })
    });
    dsDepartments.load();

    var dsReqType = new Ext.data.JsonStore({
        root: 'results',
        fields: [
                {name: 'id', mapping:'id', type: 'string'},
                {name: 'type_name', mapping:'type_name', type: 'string'},
                {name: 'type_desc', mapping:'type_desc', type: 'string'}
        ],
        proxy: new Ext.data.ScriptTagProxy({
            url: '../frm/req/CreateRequest/getReqType.jsp'
        })
    });

    var dsContractType = new Ext.data.JsonStore({
        root: 'results',
        fields: [
                {name: 'id', mapping:'id', type: 'string'},
                {name: 'template_name', mapping:'template_name', type: 'string'}
        ],
        proxy: new Ext.data.ScriptTagProxy({
            url: '../frm/req/CreateRequest/getContractType.jsp'
        })
    });


    var dsObjects = new Ext.data.Store({

        proxy: new Ext.data.ScriptTagProxy({
            url: '../frm/req/CreateRequest/getObjects.jsp'
            
        }),
        reader: new Ext.data.JsonReader({
            root: 'results',
            totalProperty: 'totalCount',
            id: 'id'
        }, [
            {name: 'id', mapping: 'id'},
            {name: 'name', mapping: 'name'},
            {name: 'object_addres', mapping: 'object_addres'}
        ])
    });


    var dsClients = new Ext.data.Store({
        proxy: new Ext.data.ScriptTagProxy({
            url: '../frm/req/CreateRequest/getClients.jsp'
        }),
        reader: new Ext.data.JsonReader({
            root: 'results',
            totalProperty: 'totalCount',
            id: 'id'
        }, [
            {name: 'id', mapping: 'id'},
            {name: 'client_name', mapping: 'client_name'},
            {name: 'email', mapping: 'email'},
            {name: 'addres', mapping: 'addres'}
        ])
    });

 //eof data sources


     var fldsRequest = {
        xtype: 'fieldset',
        title: 'Заявка',
        autoHeight: true,
        layout: 'form',
        collapsed: false,   // initially collapse the group
        collapsible: false,
        items: [
                {
                xtype:'datefield',      // datefield
                fieldLabel:'К дате',
                
                format: 'd/m/Y',
                name:'DtReqExe',
                allowBlank:false
                }
                 ,{
                xtype: 'combo',
                store: dsReqType,
                displayField: 'type_name',
                valueField: 'id',
                typeAhead: true,
                editable:true,
                mode: 'local',
                forceSelection: true,
                triggerAction: 'all',
                fieldLabel: 'Тип заявки',
                selectOnFocus: true,
                anchor:'95%',
                name:'cbReqType',
                allowBlank:false
              }
                 ,{
                        xtype:'htmleditor',
                        name: 'txaRequestText',
                        fieldLabel:'Описание заявки',
                        height:100,
                        anchor:'98%',
	                allowBlank: false}
               ]
    };


 var fldsContractType = {
        xtype: 'fieldset',
        title: 'Договор',
        autoHeight: true,
        layout: 'form',
        collapsed: true,   // initially collapse the group
        collapsible: true,
        items: [ {
                xtype: 'combo',
                store: dsContractType,
                displayField: 'template_name',
                valueField: 'id',
                typeAhead: true,
                editable:true,
                mode: 'remote',
                forceSelection: true,
                triggerAction: 'all',
                fieldLabel: 'Договор',
                selectOnFocus: true,
                anchor:'95%',
                name:'cbContractType',
                allowBlank:false,
                listeners: {
                select: function(f,r,i){
                         ContrTypeId = this.getValue();
                    }
               }
            }
         ]
     };

   var fldsObjects = {
        xtype: 'fieldset',
        title: 'Объект',
        autoHeight: true,
        layout: 'form',
        collapsed: true,   // initially collapse the group
        collapsible: true,
        items: [ {
                 xtype: 'combo'
                 ,store: dsObjects
                ,mode: 'remote'
                ,displayField: 'name'
                ,valueField: 'id'
                ,typeAhead: false
                ,fieldLabel: 'Объект'
                ,loadingText: 'Поиск объекта...'
                ,width: 570
                ,pageSize:20
                ,forceSelection: true
                ,triggerAction: 'all'
                ,minChars: 1
                ,name:'cbObjects'
                ,allowBlank:false

                }

              ]
     };

 var fldsClient = {
        xtype: 'fieldset',
        title: 'Клиент',
        autoHeight: true,
        layout: 'form',
        collapsed: true,   // initially collapse the group
        collapsible: true,
        items: [ {
                 xtype: 'combo'
                ,store: dsClients
                ,mode: 'remote'
                ,fieldLabel: 'Клиент'
                ,displayField: 'client_name'
                ,valueField: 'id'
                ,typeAhead: false
                ,loadingText: 'Поиск клиента...'
                ,width: 570
                ,pageSize:20
                ,forceSelection: true
                ,triggerAction: 'all'
                ,minChars: 1
                ,name:'cbClients'
                ,allowBlank:false


                }

              ]
     };



   var fldsCostOfService = {
        xtype: 'fieldset',
        layout: 'form',
        title: 'Стоимость услуг',
        autoHeight: true,
        collapsed: true,   // initially collapse the group
        collapsible: true,
        items: [
          {
           xtype:'textfield',      // textfield
           fieldLabel:'Стоимость',
           name:'txtCost'

        },
          {
            xtype: 'radiogroup',
            fieldLabel: 'НДС',
            items: [
                {boxLabel: 'С учетом НДС', name: 'rb-nds', inputValue: 1},
                {boxLabel: 'Без учета НДС', name: 'rb-nds', inputValue: 2}
            ]
        }
    ]
   };


var txtCost = new Ext.form.TextField(  {
           xtype:'textfield',      // textfield
           fieldLabel:'Стоимость',
           name:'txtCost',
           id :'txtCost',
           value:'0'
        });


var rgCost = new Ext.form.RadioGroup( {
            xtype: 'radiogroup',
            fieldLabel: 'НДС',
            name:'rgCost',
            items: [
                {boxLabel: 'С учетом НДС', name: 'rb-nds', inputValue: 1},
                {boxLabel: 'Без учета НДС', name: 'rb-nds', inputValue: 2}
            ]
        });

   var fldsUrRequest = {
        xtype: 'fieldset',
        layout: 'form',
        autoHeight: true,
        collapsed: false,   // initially collapse the group
        collapsible: false,
        items: [
            {
                xtype: 'combo',
                store: dsContractType,
                displayField: 'template_name',
                valueField: 'id',
                typeAhead: true,
                editable:true,
                mode: 'remote',
                forceSelection: true,
                triggerAction: 'all',
                fieldLabel: 'Договор',
                selectOnFocus: true,
                anchor:'95%',
                name:'cbContractType',
                allowBlank:false,
                listeners: {
                select: function(f,r,i){
                         ContrTypeId = this.getValue();
                    }
               }
               ,emptyText:'Обязательное поле'
            },
            {
                 xtype: 'combo'
                 ,store: dsObjects
                ,mode: 'remote'
                ,displayField: 'name'
                ,valueField: 'id'
                ,typeAhead: false
                ,fieldLabel: 'Объект'
                ,loadingText: 'Поиск объекта...'
                ,width: 570
                ,pageSize:20
                ,forceSelection: true
                ,triggerAction: 'all'
                ,minChars: 1
                ,name:'cbObjects'
                ,allowBlank:false
               ,emptyText:'Обязательное поле'

                },
                {
                 xtype: 'combo'
                ,store: dsClients
                ,mode: 'remote'
                ,fieldLabel: 'Клиент'
                ,displayField: 'client_name'
                ,valueField: 'id'
                ,typeAhead: false
                ,loadingText: 'Поиск клиента...'
                ,width: 570
                ,pageSize:20
                ,forceSelection: true
                ,triggerAction: 'all'
                ,minChars: 1
                ,name:'cbClients'
                ,allowBlank:false
                ,emptyText:'Обязательное поле'



                },txtCost,rgCost

          /*{
           xtype:'textfield',      // textfield
           fieldLabel:'Стоимость',
           name:'txtCost',
           emptyText:'Не обязательное поле'

        },
          {
            xtype: 'radiogroup',
            fieldLabel: 'НДС',
            items: [
                {boxLabel: 'С учетом НДС', name: 'rb-nds', inputValue: 1},
                {boxLabel: 'Без учета НДС', name: 'rb-nds', inputValue: 2}
            ]
        }*/
    ]
   };

  var txaCondition1 = new Ext.form.TextArea( {
                        xtype:'TextArea',
                           id:'txaCondition1',
                        name: 'txaCondition1',
                        height:70,
                        //,allowBlank: false
                        emptyText:'Пусто...',
                        anchor:'98%'});

var txaCondition2 = new Ext.form.TextArea( {
                        xtype:'TextArea',
                           id:'txaCondition2',
                        name: 'txaCondition2',
                        //fieldLabel:'Условие',
                        emptyText:'Пусто...',
                        height:70,
                        anchor:'98%'
	                //,allowBlank: false
                        });


var chCond1 = new Ext.form.CheckboxGroup({
             xtype: 'checkboxgroup',
             fieldLabel: 'Условие 1',
             items: [
                {boxLabel: 'Если «Оплата Вознаграждения Компании производиться после получения\n\
                            продавцом/арендатором первого платежа по заключенному договору отчуждения/аренды» \n\
                            то поставьте галочку. Если достигнуты иные договоренности, то опишите их ниже:'
                            ,
                  name: 'cb-auto-1'
                  //checkbox.addListener(Events.OnClick, yourListener),
                  ,listeners: {
                    'check': function(){
                            if (this.checked){
                            cb1 =1;
                            txaCondition1.readOnly  = true;
                            txaCondition1.setValue( 'Оплата Вознаграждения Компании производиться после получения'+
                            'продавцом/арендатором первого платежа по заключенному договору отчуждения/аренды');
                            //Ext.Msg.alert('cb-auto-1 ', 'cheked');
                            //windRequestCreate.frmCreateRequest.fldsCondition.disable;
                           } else {
                               cb1 =2;
                               txaCondition1.readOnly  = false;
                               txaCondition1.setValue('Пусто...');
                              // Ext.Msg.alert('cb-auto-1 ', 'uncheked');
                           }

                        }
                   }
              }
          ]});

var chCond2 = new Ext.form.CheckboxGroup({
             xtype: 'checkboxgroup',
             fieldLabel: 'Условие 2',
             items: [
                {boxLabel: 'Если «Оплата Вознаграждения Компании производиться после получения\n\
                            продавцом/арендатором первого платежа по заключенному договору отчуждения/аренды» \n\
                            то поставьте галочку. Если достигнуты иные договоренности, то опишите их ниже:'
                            ,
                  name: 'cb-auto-1'
                  //checkbox.addListener(Events.OnClick, yourListener),
                  ,listeners: {
                    'check': function(){
                            if (this.checked){
                            cb2 =1;
                            txaCondition2.readOnly  = true;
                            txaCondition2.setValue( 'Оплата Вознаграждения Компании производиться после получения'+
                            'продавцом/арендатором первого платежа по заключенному договору отчуждения/аренды');
                            //Ext.Msg.alert('cb-auto-1 ', 'cheked');
                            //windRequestCreate.frmCreateRequest.fldsCondition.disable;
                           } else {
                               cb2 =2;
                               txaCondition2.readOnly  = false;
                               txaCondition2.setValue('Пусто...');
                              // Ext.Msg.alert('cb-auto-1 ', 'uncheked');
                           }

                        }
                   }
              }
          ]});


    var fldsCondition = {
        xtype: 'fieldset',
        title: 'Обязательные условия о создании договора оказания услуг',
        autoHeight: true,
        layout: 'form',
        collapsed: false,   // initially collapse the group
        collapsible: false,
        items: [/*{
             xtype: 'checkboxgroup',
             fieldLabel: 'Условие 1',
             items: [
                {boxLabel: 'Если «Оплата Вознаграждения Компании производиться после получения\n\
                            продавцом/арендатором первого платежа по заключенному договору отчуждения/аренды» \n\
                            то поставьте галочку. Если достигнуты иные договоренности, то опишите их ниже:'
                            ,
                  name: 'cb-auto-1'
                  //checkbox.addListener(Events.OnClick, yourListener),
                  ,listeners: {
                    'check': function(){
                            if (this.checked){
                            cb1 =1;
                            txaCondition1.readOnly  = true;
                            txaCondition1.setValue( 'Оплата Вознаграждения Компании производиться после получения'+
                            'продавцом/арендатором первого платежа по заключенному договору отчуждения/аренды');
                            //Ext.Msg.alert('cb-auto-1 ', 'cheked');
                            //windRequestCreate.frmCreateRequest.fldsCondition.disable;
                           } else {
                               cb1 =2;
                               txaCondition1.readOnly  = false;
                               txaCondition1.setValue('Пусто...');
                              // Ext.Msg.alert('cb-auto-1 ', 'uncheked');
                           }

                        }
                   }
              }
          ]}*/
      chCond1,txaCondition1
                /*{
                        xtype:'htmleditor',
                           id:'txaCondition1',
                        name: 'txaCondition1',
                        //fieldLabel:'Условие',
                        allowBlank:false,
                        height:70,
                        anchor:'98%',
	                allowBlank: false}*/
       ,{
             xtype: 'checkboxgroup',
             fieldLabel: 'Условие 2',
             items: [
                {boxLabel: 'Если «Услуга считается оказанной Компанией после заключения клиентами \n\
                            договора отчуждения/договора аренды» то поставьте галочку. \n\
                            Если достигнуты иные договоренности, то опишите их ниже: '
                            , name: 'cb-auto-2',
                            listeners: {
                            'check': function(){
                                    if (this.checked){
                                    cb2 =1;
                                    txaCondition2.setValue( 'Услуга считается оказанной Компанией после заключения клиентами '+
                                    'договора отчуждения/договора аренды');
                                   } else {
                                       cb2 =2;
                                       txaCondition2.setValue('Пусто...');
                                   }

                        }
                   }
               }]},txaCondition2
                /*{
                        xtype:'htmleditor',
                        id:'txaCondition2',
                        name: 'txaCondition2',
                      //  fieldLabel:'Условие',
                        allowBlank:false,
                        height:70,
                        anchor:'98%',
	                allowBlank: false}*/

   ]
  };



  var cbDepartments = {
    xtype: 'combo',
    store: dsDepartments,
    displayField: 'name',
    valueField: 'id',
    typeAhead: true,
    editable:false,
    mode: 'local',
    name:'cbDepartments',
    forceSelection: true,
    triggerAction: 'all',
    fieldLabel: 'Отдел',
    emptyText: 'Выберите отдел...',
    selectOnFocus: true,
    anchor:'95%',
    listeners: {
        select: function(f,r,i){
        //Ext.MessageBox.alert('ee', 'f '+ f +' r '+ r);
           DepId = this.getValue();
           DrawForm();
           
        }
    }
 }




///create window and form

var BlancPanel = new Ext.Panel({
        xtype: 'panel',
        title: 'выбор отдела',
        autoScroll : 1,
        overflow:'auto',
        id: 'BlancPanel',
         bodyStyle: {
                    background: '#ffffff',
                    padding: '7px'
            },
            html: 'Выбирите отдел из списка'

     });
/*
 var frmCbDepartments = new Ext.FormPanel({
        labelAlign: 'center',
        bodyStyle:'padding:5px',
        width: 700,
        items: [cbDepartments]
    });
*/
 var frmCreateRequest = new Ext.FormPanel({
        labelAlign: 'center',
        method : 'GET',
        //baseParams: { DepdId: DepId },
        
        url:'../frm/req/CreateRequest/SaveRequest.jsp',
        bodyStyle:'padding:5px',
        width: 800,
        monitorValid:true,
        items: [cbDepartments]
        /*,
        buttons: [{
                          text: 'Отмена',
                          handler: function(){
                            // because of the global vars, we can only
                            // instantiate one window... so let's just hide it.
                            windRequestCreate.hide();
                          }
                        }]*/

    });

 var windRequestCreate= new Ext.Window({

      id: 'windRequestCreate',
      title: 'Создание заявки',
      closable:false,
      autoScroll : 1,
      width: 840,
      height: 450,
      plain:true,
      layout : 'form',
      layoutConfig : {
          animate : true
      },
      //items: RequestCreateForm
      items: [frmCreateRequest]



    });


function displayFormCreate(){
    //Ext.MessageBox.alert('Uh uh...','нуу и файл');
//if(!windRequestCreate.isVisible()){
  if(!windRequestCreate.isVisible()){
        frmCreateRequest.removeAll();  // удаляем элементы формы панели созданные ранее
        frmCreateRequest.add({          // добавляем новые  элементы на панеле формы
                        layout:'form',
                        items:[cbDepartments]});
        frmCreateRequest.doLayout();  // типа перерисовка или перекалкуляция  :)
        //windRequestCreate.show();
      }/* else {
        frmCreateRequest.removeAll();  // удаляем элементы формы панели созданные ранее
        frmCreateRequest.add({          // добавляем новые  элементы на панеле формы
                        layout:'form',
                        items:[cbDepartments]});
        frmCreateRequest.doLayout();  // типа перерисовка или перекалкуляция  :)
        windRequestCreate.toFront();
      }*/
     windRequestCreate.show();
  }
///eof полезные  функции


 var ErrorPanel = new Ext.Panel({
        xtype: 'panel',
        title: 'Ошибка выбора отдела',
        autoScroll : 1,
        overflow:'auto',
        id: 'ErrorPanel',
         bodyStyle: {
                    background: '#ffffff',
                    padding: '7px'
            },
            html: 'Отдел не определ для подачи заявок'

     });




  function DrawForm(){
  //Ext.MessageBox.alert('Создание', DepId);
      
      dsReqType.load({params: {dep_id:DepId}});

      if (DepId == 1){
       fldsRequest.title='Заявка в отдел IT ';

       frmCreateRequest.removeAll();  // удаляем элементы формы панели созданные ранее
        frmCreateRequest.add({          // добавляем новые  элементы на панеле формы
                        layout:'form',
                        items:[{
                                xtype:'hidden',
                                id :'DepId',
                                name :'DepId',
                                value:'1'

                                }
                               ,cbDepartments,
                               fldsRequest
                        ],
                    buttons: [
                        {
                          text: 'Отмена',
                          handler: function(){
                            // because of the global vars, we can only
                            // instantiate one window... so let's just hide it.
                            windRequestCreate.hide();
                          }
                        },
                        {
                          text: 'Отправить заявку',
                          handler: CreateRequest
                        }]
                    });
         frmCreateRequest.doLayout();  // типа перерисовка или перекалкуляция  :)
         
         } else if (DepId == 2){
        fldsRequest.title='Заявка в юридический отдел ';
        fldsRequest.collapsed = false;
        /*fldsContractType.collapsed = false;
        fldsObjects.collapsed = false;
        fldsClient.collapsed = false;
        fldsCostOfService.collapsed = false;*/

        //dsObjects.load();
        //dsContractType.load();
        frmCreateRequest.removeAll();  // удаляем элементы формы панели созданные ранее

        frmCreateRequest.add({          // добавляем новые  элементы на панеле формы
                        layout:'column',
                        items:[
                        {
                            columnWidth:1,
                            layout: 'form',

                            items: [{
                                xtype:'hidden',
                                id :'DepId',
                                name :'DepId',
                                value:'2'

                                }
                               ,cbDepartments
                         ]
                     }
                     , 
                        {
                            columnWidth:1,
                            layout: 'form',

                            items: [fldsRequest
                         ]
                     },
                     {columnWidth:1,
                            layout: 'form',

                            items: [fldsUrRequest  ]
                     }, {columnWidth:1,
                            layout: 'form',

                            items: [fldsCondition  ]
                     }
                     /*
                     {columnWidth:1,
                            layout: 'form',

                            items: [fldsContractType  ]
                     }
                     ,{columnWidth:1,
                            layout: 'form',

                            items: [fldsCondition  ]
                     }
                     ,
                    {columnWidth:1,
                            layout: 'form',

                            items: [fldsObjects  ]
                     }
                     ,{columnWidth:1,
                            layout: 'form',

                            items: [fldsClient  ]
                     }
                     ,

                     {columnWidth:1,
                            layout: 'form',

                            items: [fldsCostOfService
                         ]}*/
                        ],
                    buttons: [
                        {
                          text: 'Отмена',
                          handler: function(){
                            // because of the global vars, we can only
                            // instantiate one window... so let's just hide it.
                            windRequestCreate.hide();
                          }
                        },
                        {
                          text: 'Отправить заявку',
                          handler: CreateRequest
                        
                        }]
                    });
         frmCreateRequest.doLayout();  // типа перерисовка или перекалкуляция  :)
         
         } else if (DepId == 3){
         fldsRequest.title='Заявка в отдел маркетинга и рекламы';
         frmCreateRequest.removeAll();  // удаляем элементы формы панели созданные ранее
          frmCreateRequest.add({          // добавляем новые  элементы на панеле формы
                        layout:'form',
                        items:[{
                                xtype:'hidden',
                                id :'DepId',
                                name :'DepId',
                                value:'3'

                                }
                               ,cbDepartments,fldsRequest
                        ],
                    buttons: [
                        {
                          text: 'Отмена',
                          handler: function(){
                            // because of the global vars, we can only
                            // instantiate one window... so let's just hide it.
                            windRequestCreate.hide();
                          }
                        },
                        {
                          text: 'Отправить заявку',
                          handler: CreateRequest
                        }]
                    });

         frmCreateRequest.doLayout();  // типа перерисовка или перекалкуляция  :)
         
         }

         else {
        frmCreateRequest.removeAll();  // удаляем элементы формы панели созданные ранее
         frmCreateRequest.add({          // добавляем новые  элементы на панеле формы
                           layout:'form',
                        items:[cbDepartments,ErrorPanel

                        ]
                    });
         frmCreateRequest.doLayout();  // типа перерисовка или перекалкуляция  :)

         }


 }

///eof window and form

///полезные  функции
function testTogle(){
    frmCreateRequest.getForm().callFieldMethod(fldsRequest,collapsed=true);
    //fldsRequest.collapse = true;

}
function CreateRequest(){
  chekcUrConditions();


                    frmCreateRequest.getForm().submit({
                        method:'POST',
                       // waitTitle:'Сохранение',
                        //waitMsg:'Отправляю данные...',

                        success:function(){
                        Ext.Msg.alert('Статус', 'Заявка направлена!', function(btn, text){
                                       store_j.reload();
                                       store_j_my.reload();
                                       store_j_forme.reload();
				        if (btn == 'ok'){
		                          windRequestCreate.hide();
                                   }
			        });
                        },

			// Failure function, see comment above re: success and failure.
			// You can see here, if login fails, it throws a messagebox
			// at the user telling him / her as much.

                        failure:function(form, action){
                            if(action.failureType == 'server'){
                                obj = Ext.util.JSON.decode(action.response.responseText);
                                Ext.Msg.alert('Ошибка создания заявки!', obj.errors.reason);
                            }else{
                                if ( action.response.responseText == 'code2') {

                                    ldsRequest.title='Заявка в юридический отдел ';
                                    fldsRequest.collapsed = true;
                                    fldsContractType.collapsed = true;
                                    fldsObjects.collapsed = true;
                                    fldsClient.collapsed = true;
                                    fldsCostOfService.collapsed = true;
                                    fldsCondition.collapsed = false;
                                    //dsObjects.load();
                                    //dsContractType.load();
                                    frmCreateRequest.removeAll();  // удаляем элементы формы панели созданные ранее

                                    frmCreateRequest.add({          // добавляем новые  элементы на панеле формы
                                                    layout:'column',
                                                    items:[
                                                    {
                                                        columnWidth:1,
                                                        layout: 'form',

                                                        items: [cbDepartments
                                                     ]
                                                 }
                                                 ,
                                                    {
                                                        columnWidth:1,
                                                        layout: 'form',

                                                        items: [fldsRequest
                                                     ]
                                                 },
                                                 {columnWidth:1,
                                                        layout: 'form',

                                                        items: [fldsContractType  ]
                                                 }
                                                 ,{columnWidth:1,
                                                        layout: 'form',

                                                        items: [fldsCondition  ]
                                                 }
                                                 ,
                                                {columnWidth:1,
                                                        layout: 'form',

                                                        items: [fldsObjects  ]
                                                 }
                                                 ,{columnWidth:1,
                                                        layout: 'form',

                                                        items: [fldsClient  ]
                                                 }
                                                 ,

                                                 {columnWidth:1,
                                                        layout: 'form',

                                                        items: [fldsCostOfService
                                                     ]}
                                                    ],
                                                buttons: [{
                                                      text: 'Отправить заявку',
                                                      handler: CreateRequest

                                                    }]
                                                });
                                          frmCreateRequest.doLayout();  // типа перерисовка или перекалкуляция  :)
                                          frmCreateRequest.getForm().load(action.response);

                                }
                                else{
                                  Ext.Msg.alert('Внимание!', 'Произошла лажа ' + action.response.responseText);
                                }
                                //Ext.Msg.alert('Внимание!', 'Сервер не доступен : ' + action.response.responseText);
                            }
                            //login.getForm().reset();
                        }
                    });


//  Ext.MessageBox.alert('Создание', 'заявку создал'+ContrTypeId);

}






 function chekcUrConditions(){
  /*   Ext.Msg.alert('Внимание!', 'Не указан порядок расчета НДС. \n\
                                 rg '+rgCost.getValue() +' \n\
                                 dd '+txtCost.getValue()+' v') ;
*/
   if (txtCost.getValue()!=0 && rgCost.getValue()==null){
      Ext.Msg.alert('Внимание!', 'Не указан порядок расчета НДС.');
   }
  if ((ContrTypeId  == 2 | ContrTypeId  == 3)& (gUserDepId!=6) ) {
   //проверяем по полной
     //Ext.Msg.alert('Внимание!', txaCondition1.getValue());
          if (cb1==2 & txaCondition1.getValue()=='') {
          Ext.Msg.alert('Внимание!', 'Уважаемый заявитель, \n\
                                      Вами не были указаны обязательные условия, для заключения договора оказания услуг,которые, \n\
                                      в соответствии с распоряжением ген. Директора № 127  от 8 апреля 2010 года, \n\
                                      должны быть согласованы Вами, для подачи заявки в юридический отдел. \n\
                                      При  необходимости, с порядком согласования, Вы можете ознакомиться в выше указанном распоряжении  \n');
        }
        if (cb2==2 & txaCondition2.getValue()=='') {
          Ext.Msg.alert('Внимание!', 'Уважаемый заявитель, \n\
                                      Вами не были указаны обязательные условия, для заключения договора оказания услуг,которые, \n\
                                      в соответствии с распоряжением ген. Директора № 127  от 8 апреля 2010 года, \n\
                                      должны быть согласованы Вами, для подачи заявки в юридический отдел. \n\
                                      При  необходимости, с порядком согласования, Вы можете ознакомиться в выше указанном распоряжении  \n');
        }
  }
 }

