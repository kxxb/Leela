/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

Ext.ns("app");

            


app.CommentWindow =  Ext.extend(Ext.Window,{
    initComponent: function(){
        var config ={
           title: 'Коментарий'
          ,closable:true
          ,iconCls:'win'
          ,closeAction: "hide"
          ,width: 550
          ,height: 300
          ,plain:true
          ,layout: 'fit'
    
        };
         Ext.apply(this, Ext.apply(this.initialConfig, config));
         app.CommentWindow.superclass.initComponent.apply(this, arguments);

} // eo function initComponent

});
Ext.reg('commentwindow', app.CommentWindow);


app.DealWindow =  Ext.extend(Ext.Window,{
    initComponent: function(){
        var config ={
           title: 'Создать сделку'
          ,closable:true
          ,iconCls:'win'
          ,closeAction: "hide"
          ,width: 550
          ,height: 300
          ,plain:true
          ,layout: 'fit'

        };
         Ext.apply(this, Ext.apply(this.initialConfig, config));
         app.DealWindow.superclass.initComponent.apply(this, arguments);

} // eo function initComponent

});
Ext.reg('Dealwindow', app.DealWindow);

app.fileWindow =  Ext.extend(Ext.Window,{
    initComponent: function(){
        var config ={
           title: 'Загрузка файла'
          ,closable:true
          ,iconCls:'win'
          ,closeAction: "hide"
          ,width: 400
          ,height: 200
          ,plain:true
          ,layout: 'fit'

        };
         Ext.apply(this, Ext.apply(this.initialConfig, config));
         app.fileWindow.superclass.initComponent.apply(this, arguments);

} // eo function initComponent

});
Ext.reg('filewindow', app.fileWindow);


      var lbDepartmentName =   new Ext.form.Label({
          
      });

       var hDepId =   new Ext.form.Hidden({
                                xtype:'hidden',
                                name :'DepId'
                               });
       var hUser_Id =   new Ext.form.Hidden({
                                xtype:'hidden',
                                name :'User_Id'
                               });



       var dtCreate = new Ext.form.DateField({
                    xtype:'datefield',      // datefield
                    id:'dtCreate',
                    fieldLabel:'К дате',
                    format: 'd/m/Y',
                    name:'DtReqExe',
                    allowBlank:false
                    });
       var cbReqType = new Ext.form.ComboBox({
                    xtype: 'combo',
                    id:'cbReqType',
                    store: app_dsReqType,
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
                    ,listeners: {
                      select: function(f,r,i){
                        reqText.setValue(r.data.type_desc);
                      }
                    }
                  });
                  
            var hiddenReqType = new Ext.form.Hidden({
                    xtype: 'hiden',
                    value:'1'
                    
                  }); 
                  
                  
      var reqText   = new Ext.form.HtmlEditor({
                            id:'reqText',
                            xtype:'htmleditor',
                            name: 'txaRequestText',
                            fieldLabel:'Описание заявки',
                            height:100,
                            anchor:'98%',
                            allowBlank: false});

   var fsITPRReq = new Ext.form.FieldSet({
                xtype: 'fieldset',
                autoHeight: true,
                layout: 'form',
                collapsed: false,   // initially collapse the group
                collapsible: false,
                items: [hUser_Id,hDepId,lbDepartmentName,dtCreate,hiddenReqType,reqText]
        });


var frmCreateRequest_ITPR = new Ext.FormPanel({
        labelAlign: 'center',
        method : 'POST',
        //baseParams: { DepId: lCreateReq_DepId },
        url:'../frm/req/CreateRequest/SaveRequest.jsp',
        bodyStyle:'padding:5px',
        //width: 800,
        monitorValid:true,
        items: [fsITPRReq]
        ,buttons: [{      text: 'Отмена',
                          handler: function(){
                            windRequestCrITPR.hide();
                          }
                        },{
                          text: 'Отправить заявку'
                          ,handler: function(){

                            var theForm = frmCreateRequest_ITPR.getForm();
                            //var connComment1 = new Ext.data.Connection();
                                theForm.submit({
                                 success: function(){
                                     Ext.MessageBox.alert('Заявка','Заявка создана');
                                     windRequestCrITPR.hide();
                                     app_store_my_pr.reload();
                                     app_store_my_it.reload();

                              },
                              failure: function(response){
                                 var result=response.responseText;
                                 Ext.MessageBox.alert('Заявка','Ошибка создания заявки');

                              }
                             })
                          
                          }
                        }]

    });






 var windRequestCrITPR= new Ext.Window({
      id:'windRequestCrTPR'
      ,closable:false
      ,autoScroll : 1
      ,width: 720
      //,height: 300
      ,plain:true
      ,layout : 'form'
      ,layoutConfig : {animate : true}
      ,items: [frmCreateRequest_ITPR]
    });


////////////ЮРИДИЧЕСКИЙ



        var lbDepartmentName_ur =   new Ext.form.Label({

         });

       var hDepId_ur =   new Ext.form.Hidden({
                                xtype:'hidden',
                                name :'DepId'
                               });
       var hUser_Id_ur =   new Ext.form.Hidden({
                                xtype:'hidden',
                                name :'User_Id'
                               });



       var dtCreate_ur = new Ext.form.DateField({
                    xtype:'datefield',      // datefield

                    fieldLabel:'К дате',
                    format: 'd/m/Y',
                    name:'DtReqExe',
                    allowBlank:false
                    });
       var cbReqType_ur = new Ext.form.ComboBox({
                    xtype: 'combo',

                    store: app_dsReqType,
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
                    ,listeners: {
                      select: function(f,r,i){
                        reqText_ur.setValue(r.data.type_desc);
                      }
                    }
                  });
      var reqText_ur   = new Ext.form.HtmlEditor({

                            xtype:'htmleditor',
                            name: 'txaRequestText',
                            fieldLabel:'Описание заявки',
                            height:100,
                            anchor:'98%',
                            allowBlank: false});




 var fldsContractType = {
        xtype: 'fieldset',
        title: 'Договор',
        autoHeight: true,
        layout: 'form',
        collapsed: false,   // initially collapse the group
        collapsible: false,
        items: [ {
                xtype: 'combo',
                store: app_dsContractType,
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
        collapsed: false,   // initially collapse the group
        collapsible: false,
        items: [ {
                 xtype: 'combo'
                 ,store: app_dsObjects
                ,mode: 'remote'
                ,displayField: 'name'
                ,valueField: 'id'
                ,typeAhead: false
                ,fieldLabel: 'Объект'
                ,loadingText: 'Поиск объекта...'
                ,width: 500
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
        collapsed: false,   // initially collapse the group
        collapsible: false,
        items: [ {
                 xtype: 'combo'
                ,store: app_dsClients
                ,mode: 'remote'
                ,fieldLabel: 'Клиент'
                ,displayField: 'client_name'
                ,valueField: 'id'
                ,typeAhead: false
                ,loadingText: 'Поиск клиента...'
                ,width: 500
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
        collapsed: false,   // initially collapse the group
        collapsible: false,
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




var txaCondition1 = new Ext.form.TextArea( {
                        xtype:'TextArea',
                           
                        name: 'txaCondition1',
                        height:70,
                        //,allowBlank: false
                        emptyText:'Пусто...',
                        anchor:'98%'});

var txaCondition2 = new Ext.form.TextArea( {
                        xtype:'TextArea',
                           
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
                {boxLabel: 'Если «Услуга считается оказанной Компанией после заключения клиентами \n\
                            договора отчуждения/договора аренды» то поставьте галочку. \n\
                            Если достигнуты иные договоренности, то опишите их ниже: '
                            ,
                  name: 'cb-auto-1'
                  //checkbox.addListener(Events.OnClick, yourListener),
                  ,listeners: {
                    'check': function(){
                            if (this.checked){
                            cb2 =1;
                            txaCondition2.readOnly  = true;
                            txaCondition2.setValue( 'Услуга считается оказанной Компанией после заключения клиентами '+
                                    'договора отчуждения/договора аренды');
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
        items: [
                chCond1,txaCondition1
                ,chCond2,txaCondition2
   ]
  };





 var fsURReq = new Ext.form.FieldSet({
                xtype: 'fieldset',
                autoHeight: true,
                layout: 'form',
                collapsed: false,   // initially collapse the group
                collapsible: false,
                items: [hUser_Id_ur,hDepId_ur,lbDepartmentName_ur
                       ,dtCreate_ur,cbReqType_ur,reqText_ur, fldsCostOfService
                        ,fldsObjects, fldsClient]
        });




var frmCreateRequest_UR = new Ext.FormPanel({
        labelAlign: 'center',
        method : 'POST',
        //baseParams: { DepId: lCreateReq_DepId },
        url:'../frm/req/CreateRequest/SaveRequest.jsp',
        bodyStyle:'padding:5px',
        //width: 800,
        monitorValid:true,
         items: {
            xtype:'tabpanel',
            activeTab: 0,
            defaults:{autoHeight:true, bodyStyle:'padding:10px'},
            items:[{
                title:'1 Шаг - Выбор договора',
                layout:'form',
                //defaults: {width: 230},
                defaultType: 'textfield',

                items: [fldsContractType,fldsCondition]}
            , {
                title:'2 Шаг - Параметры',
                layout:'form',
                //defaults: {width: 230},
                defaultType: 'textfield',

                items: [fsURReq]}
            ]}

        //items: [fsURReq]
        ,buttons: [{      text: 'Отмена',
                          handler: function(){
                            windRequestCrUr.hide();
                          }
                        },{
                          text: 'Отправить заявку'
                          ,handler: function(){
                            var theForm = frmCreateRequest_UR.getForm();
                                theForm.submit({
                                 success: function(){
                                     Ext.MessageBox.alert('Заявка','Заявка создана');
                                     windRequestCrUr.hide();
                                     app_store_my_ur.reload();
                              },
                              failure: function(response){
                                 var result=response.responseText;
                                 Ext.MessageBox.alert('Заявка','Ошибка создания заявки');

                              }
                             })

                          }
                        }]

    });


    var windRequestCrUr= new Ext.Window({
      id:'windRequestCrUr'
      ,closable:false
      ,autoScroll : 1
      ,width: 720
      //,height: 300
      ,plain:true
      ,layout : 'form'
      ,layoutConfig : {animate : true}
      ,items: [frmCreateRequest_UR]
    });

    var windRequestCrUr1= new Ext.Window({
      id:'windRequestCrUr'
      ,closable:false
      ,autoScroll : 1
      ,width: 720
      //,height: 300
      ,plain:true
      ,layout : 'form'
      ,layoutConfig : {animate : true}
      ,items: [frmCreate_UR1]
    });


    var frmCreate_UR1 = new Ext.FormPanel({
        labelAlign: 'center',
        method : 'POST',
        //baseParams: { DepId: lCreateReq_DepId },
        //url:'../frm/req/CreateRequest/SaveRequest.jsp',
        bodyStyle:'padding:5px',
        //width: 800,
        monitorValid:true,
        items: [fsURReq]
        ,buttons: [{      text: 'Отмена',
                          handler: function(){
                            windRequestCrUr.hide();
                          }
                        },{
                          text: 'Отправить заявку'
                          ,handler: function(){
                            var theForm = frmCreate_UR1.getForm();
                                theForm.submit({
                                 success: function(){
                                     Ext.MessageBox.alert('Заявка','Заявка создана');
                                     
                              },
                              failure: function(response){
                                 var result=response.responseText;
                                 Ext.MessageBox.alert('Заявка','Ошибка создания заявки');

                              }
                             })

                          }
                        }]

    });