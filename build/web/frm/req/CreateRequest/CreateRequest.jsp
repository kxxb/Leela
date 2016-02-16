<%-- 
    Document   : CreateRequest
    Created on : 28.11.2010, 10:27:48
    Author     : kxxb
--%>
<%@ page import="java.sql.Types, oracle.jdbc.OracleConnection, oracle.jdbc.OracleResultSet, java.sql.*, oracle.jdbc.OracleCallableStatement"
contentType="text/html;charset=windows-1251"  %>

<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN"
"http://www.w3.org/TR/html4/loose.dtd">

<html>
<head>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
        <title>Создание заявки</title>

        <!-- ** CSS ** -->
        <!-- base library -->

       

        <link rel="stylesheet" type="text/css" href="../js/ext-3.2.1/resources/css/ext-all.css" />
        <link rel="stylesheet" type="text/css" href="combos.css" />


        <!-- overrides to base library -->


        <!-- ** Javascript ** -->
        <!-- base library -->
        <script type="text/javascript" src="../js/ext-3.2.1/adapter/ext/ext-base.js"></script>
        <script type="text/javascript" src="../js/ext-3.2.1/ext-all-debug.js"></script>
<script type="text/javascript">
    var ReqGridDataStore;
    var ReqGridColumnModel;
    var ReqGridListingEditorGrid;
    var ReqGridListingWindow;
    var ReqId = '-7';
    var DepId;
    var ContrTypeId;


    Ext.QuickTips.init();





    //data sources


    var dsDepartments = new Ext.data.JsonStore({
        root: 'results',
        fields: [
                {name: 'id', mapping:'id', type: 'string'},
                {name: 'name', mapping:'name', type: 'string'}
        ],
        proxy: new Ext.data.ScriptTagProxy({
            url: 'getDep.jsp'
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
            url: 'getReqType.jsp'
        })
    });

    var dsContractType = new Ext.data.JsonStore({
        root: 'results',
        fields: [
                {name: 'id', mapping:'id', type: 'string'},
                {name: 'template_name', mapping:'template_name', type: 'string'}
        ],
        proxy: new Ext.data.ScriptTagProxy({
            url: 'getContractType.jsp'
        })
    });


    var dsObjects = new Ext.data.Store({
        
        proxy: new Ext.data.ScriptTagProxy({
            url: 'getObjects.jsp',
            method : 'POST'
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
            url: 'getClients.jsp'
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
        collapsible: true,
        items: [ {
                xtype:'datefield',      // datefield
                fieldLabel:'К дате',
                id :'DtReqExe',
                format: 'd/m/Y',
                name:'DtReqExe'
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
                name:'cbReqType'
              }
                 ,{
                        xtype:'htmleditor',
                        id:'txaRequestText',
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
                ,loadingText: 'Поиск объекта...'
                ,width: 570
                ,pageSize:20
                ,forceSelection: true
                ,triggerAction: 'all'
                ,minChars: 1
                
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
                
                ,displayField: 'client_name'
                ,valueField: 'id'
                ,typeAhead: false
                ,loadingText: 'Поиск клиента...'
                ,width: 570
                ,pageSize:20
                ,forceSelection: true
                ,triggerAction: 'all'
                ,minChars: 1
                

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
       name:'txtCost' },
          {
            xtype: 'radiogroup',
            fieldLabel: 'НДС',
            items: [
                {boxLabel: 'С учетом НДС', name: 'rb-auto', inputValue: 1},
                {boxLabel: 'Без учета НДС', name: 'rb-auto', inputValue: 2}
            ]
        }
    ]
   };

    var fldsCondition = {
        xtype: 'fieldset',
        title: 'Обязательные условия о создании договора оказания услуг',
        autoHeight: true,
        layout: 'form',
        collapsed: true,   // initially collapse the group
        collapsible: true,
        items: [{
             xtype: 'checkboxgroup',
             fieldLabel: 'Условие 1',
             items: [
                {boxLabel: 'Если «Оплата Вознаграждения Компании производиться после получения\n\
                            продавцом/арендатором первого платежа по заключенному договору отчуждения/аренды» \n\
                            то поставьте галочку. Если достигнуты иные договоренности, то опишите их ниже:'
                            ,
                  name: 'cb-auto-1'}]},
                {
                        xtype:'htmleditor',
                        id:'txaCondition1',
                        name: 'txaCondition1',
                        //fieldLabel:'Условие',
                        height:100,
                        anchor:'98%',
	                allowBlank: false}
       ,
        {
             xtype: 'checkboxgroup',
             fieldLabel: 'Условие 2',
             items: [
                {boxLabel: 'Если «Услуга считается оказанной Компанией после заключения клиентами \n\
                            договора отчуждения/договора аренды» то поставьте галочку. \n\
                            Если достигнуты иные договоренности, то опишите их ниже: '
                            , name: 'cb-auto-2'}]},
                {
                        xtype:'htmleditor',
                        id:'txaCondition2',
                        name: 'txaCondition2',
                      //  fieldLabel:'Условие',
                        height:100,
                        anchor:'98%',
	                allowBlank: false}
 
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
        method : 'POST',
        bodyStyle:'padding:5px',
        width: 840,
        items: [cbDepartments]

    });

 var windRequestCreate= new Ext.Window({

      id: 'windRequestCreate',
      title: 'Создание заявки',
      closable:false,
      width: 860,
      height: 700,
      plain:true,
      layout : 'form',
      layoutConfig : {
      animate : true
  },
      //items: RequestCreateForm
      items: [frmCreateRequest]

    });

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
                        items:[cbDepartments,
                               fldsRequest
                        ],
                    buttons: [{
                          text: 'Отправить заявку',
                          handler: CreateRequest
                        },{
                          text: 'Отмена',
                          handler: function(){
                            // because of the global vars, we can only
                            // instantiate one window... so let's just hide it.
                            windRequestCreate.hide();
                          }
                        }]
                    });
         frmCreateRequest.doLayout();  // типа перерисовка или перекалкуляция  :)
       
         } else if (DepId == 2){
        fldsRequest.title='Заявка в юридический отдел ';
        fldsRequest.collapsed = false;
        fldsContractType.collapsed = false;
        fldsObjects.collapsed = false;
        fldsClient.collapsed = false;
        fldsCostOfService.collapsed = false;

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
                     , {     columnWidth:1,
                            layout: 'form',
                            
                            items: [fldsContractType  ]
                     }
                     ,{     columnWidth:1,
                            layout: 'form',
                            
                            items: [fldsCondition  ]
                     }
                     ,
                        {
                            columnWidth:1,
                            layout: 'form',
                            
                            items: [fldsRequest
                         ]
                     },
                    {     columnWidth:1,
                            layout: 'form',
                            
                            items: [fldsObjects  ]
                     }
                     ,{     columnWidth:1,
                            layout: 'form',
                            
                            items: [fldsClient  ]
                     }
                     ,

                     {  columnWidth:1,
                            layout: 'form',
                            
                            items: [fldsCostOfService
                         ]}
                        ],
                    buttons: [{
                          text: 'Отправить заявку',
                          handler: CreateRequest
                        },{
                          text: 'Отмена',
                          handler: function(){
                            // because of the global vars, we can only
                            // instantiate one window... so let's just hide it.
                            windRequestCreate.hide();
                          }
                        }]
                    });
         frmCreateRequest.doLayout();  // типа перерисовка или перекалкуляция  :)
         
         } else if (DepId == 3){
         fldsRequest.title='Заявка в отдел маркетинга и рекламы';
         frmCreateRequest.removeAll();  // удаляем элементы формы панели созданные ранее
          frmCreateRequest.add({          // добавляем новые  элементы на панеле формы
                        layout:'form',
                        items:[cbDepartments,fldsRequest
                        ],
                    buttons: [{
                          text: 'Отправить заявку',
                          handler: CreateRequest
                        },{
                          text: 'Отмена',
                          handler: function(){
                            // because of the global vars, we can only
                            // instantiate one window... so let's just hide it.
                            windRequestCreate.hide();
                          }
                        }]
                    });
        
         frmCreateRequest.doLayout();  // типа перерисовка или перекалкуляция  :)
         
         }

         else {
        frmCreateRequest.removeAll();  // удаляем элементы формы панели созданные ранее
         frmCreateRequest.add({          // добавляем новые  элементы на панеле формы
                           layout:'form',
                        items:[cbDepartments,ErrorPanel

                        ],
                     buttons: [{
                          text: 'Отмена',
                          handler: function(){
                            // because of the global vars, we can only
                            // instantiate one window... so let's just hide it.
                            windRequestCreate.hide();
                          }
                        }]
                    });
         frmCreateRequest.doLayout();  // типа перерисовка или перекалкуляция  :)
        
         }
      
     
 }

///eof window and form

///полезные  функции
function CreateRequest(){
  chekcUrConditions();
  Ext.MessageBox.alert('Создание', 'заявку создал'+ContrTypeId);

}



function displayFormCreate(){
    //Ext.MessageBox.alert('Uh uh...','нуу и файл');

  if(!windRequestCreate.isVisible()){
        frmCreateRequest.removeAll();  // удаляем элементы формы панели созданные ранее
        frmCreateRequest.add({          // добавляем новые  элементы на панеле формы
                        layout:'form',
                        items:[cbDepartments]});
        frmCreateRequest.doLayout();  // типа перерисовка или перекалкуляция  :)
        windRequestCreate.show();
      } else {
        frmCreateRequest.removeAll();  // удаляем элементы формы панели созданные ранее
        frmCreateRequest.add({          // добавляем новые  элементы на панеле формы
                        layout:'form',
                        items:[cbDepartments]});
        frmCreateRequest.doLayout();  // типа перерисовка или перекалкуляция  :)
        windRequestCreate.toFront();
      }
  }
///eof полезные  функции


 function chekcUrConditions(){
  
  if (ContrTypeId  == 2) {
        fldsRequest.collapsed = true;
        fldsObjects.collapsed = true;
        fldsClient.collapsed = true;
        fldsCostOfService.collapsed = true;
        fldsCondition.collapsed = false;
        fldsContractType.collapsed = false;
        frmCreateRequest.doLayout();  // типа перерисовка или перекалкуляция  :)
  }
 }

/*
  Ext.onReady(function(){
    var tb = new Ext.Toolbar();
    var menu = new Ext.menu.Menu({
            id: 'mainMenu',
            style: {
                overflow: 'visible'     // For the Combo popup
            },
            items: [{ text: 'Создать', handler: displayFormCreate }
            ]
        });

        tb.add({
            text:'Задачи',
            iconCls: 'bmenu',  // <-- icon
            menu: menu  // assign menu by instance
        });

       var viewport = new Ext.Viewport({
                layout: 'border',
                renderTo: Ext.getBody(),
                items: [{
                        region: 'north',
                        xtype: 'panel',
                        height:28,
                        tbar:tb
                    }, {
                        region: 'center',
                        xtype: 'panel',
                        items :[BlancPanel]
                    }
                ]
            });


 
        });

        */
</script>

    </head>    <body>
        
    </body>
</html>
