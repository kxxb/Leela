/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */



/*форма поиска и всё сопутсвующее*/
// display or bring forth the form
  function displayFormWindow(SearchMode){
      gSearchMode =SearchMode;
  if(!SearchWindow.isVisible()){
    SearchWindow.show();
  } else {
    SearchWindow.toFront();
  }
  }

 var CreateDtStart = new Ext.form.DateField({
    id:'CreateDtStart',
    fieldLabel: 'Entering Office',
    xtype:'datefield',      // datefield
                fieldLabel:'с',
                id :'CreateDtStart',
                format: 'd/m/Y',
                name:'CreateDtStart'
    });

 var CreateDtFinish = new Ext.form.DateField({
                xtype:'datefield',      // datefield
                fieldLabel:'по',
                id :'CreateDtFinish',
                format: 'd/m/Y',
                name:'CreateDtFinish'
    });


 var DoneDtStart = new Ext.form.DateField({
                xtype:'datefield',      // datefield
                fieldLabel:'по',
                id :'DoneDtStart',
                format: 'd/m/Y',
                name:'DoneDtStart'
    });
 var DoneDtFinish = new Ext.form.DateField({
                xtype:'datefield',      // datefield
                fieldLabel:'по',
                id :'DoneDtFinish',
                format: 'd/m/Y',
                name:'DoneDtFinish'
    });


 var reqNum = new Ext.form.TextField({
               xtype:'textfield',      // textfield
               fieldLabel:'Номер заявки',
                name:'reqNum' });

 var Aplicant = new Ext.form.ComboBox({
                xtype: 'combo',
                store: AplStore,
                displayField: 'name',
                valueField: 'user_id',
                typeAhead: true,
                editable:true,
                mode: 'local',
                forceSelection: true,
                triggerAction: 'all',
                fieldLabel: 'Заявитель',

                selectOnFocus: true,
                anchor:'95%',
                name:'Aplicant'

 });



 var AplicantDep = new Ext.form.ComboBox({
                xtype: 'combo',
                store: DepStore,
                displayField: 'dep',
                valueField: 'dep',
                typeAhead: true,
                editable:true,
                mode: 'local',
                forceSelection: true,
                triggerAction: 'all',
                fieldLabel: 'Отдел',

                selectOnFocus: true,
                anchor:'95%',
                name:'AplicantDep'

 });


var Request = new Ext.form.TextField({
                xtype:'textfield',      // textfield
                  fieldLabel:'Заявка',
                  name:'Request' });


 var obj = new Ext.form.TextField({
               xtype:'textfield',      // textfield
                  fieldLabel:'Объект',
                  name:'obj'});

var client = new Ext.form.TextField({
               xtype:'textfield',      // textfield
                  fieldLabel:'Клиент',
                  name:'client'});

var Resp = new Ext.form.ComboBox({
             xtype: 'combo',
                store: AplStore,
                displayField: 'name',
                valueField: 'user_id',
                typeAhead: true,
                editable:true,
                mode: 'local',
                forceSelection: true,
                triggerAction: 'all',
                fieldLabel: 'Исполнитель',

                selectOnFocus: true,
                anchor:'95%',
                name:'Resp'
 });


var contragent = new Ext.form.TextField({
               xtype:'textfield',      // textfield
                  fieldLabel:'Контрагент',
                  name:'contragent'});

  SearchForm = new Ext.FormPanel({
        labelAlign: 'center',
        id: 'SearchForm',
        url: 'getCurRequest.jsp',
        bodyStyle:'padding:5px',
        width: 700,
        items:
            [{xtype:'fieldset',
            title: 'Дата заявки',
            autoHeight:true,
            defaults: {width: 210},
            defaultType: 'textfield',
            items :[CreateDtStart,CreateDtFinish]
            },
           {xtype:'fieldset',
            title: 'Дата готовности заявки',
            autoHeight:true,
            defaults: {width: 210},
            defaultType: 'textfield',
            items :[DoneDtStart,DoneDtFinish]


            },
            {xtype:'fieldset',
            title: '',
            id : 'ComonFieldset',
            autoHeight:true,
            defaults: {width: 210},
            defaultType: 'textfield',
            items :[reqNum,
                    Aplicant,
                    AplicantDep,
                    Request,
                    obj,
                    client,
                    Resp,
                    contragent
                ]

            }

    ],
                buttons: [{
                      text: 'Сбросить',
                      handler: function(){
                       CreateDtStart.setValue('');
                       CreateDtFinish.setValue('');
                       DoneDtStart.setValue('');
                       DoneDtFinish.setValue('');
                       reqNum.setValue('');
                       Aplicant.setValue('');
                       AplicantDep.setValue('');
                       Request.setValue('');
                       obj.setValue('');
                       client.setValue('');
                       Resp.setValue('');
                       contragent.setValue('');


                       }
                    },{
                      text: 'Поиск',
                      handler: function(){
                       doSearch();
                       }
                    },{
                      text: 'Закрыть',
                      handler: function(){
                        // because of the global vars, we can only
                        // instantiate one window... so let's just hide it.

                        SearchWindow.hide();
                      }
                    }]

    });
 /*описание формы*/

 function ShowSearchWin(){

                       CreateDtStart.setValue('');
                       CreateDtFinish.setValue('');
                       DoneDtStart.setValue('');
                       DoneDtFinish.setValue('');
                       reqNum.setValue('');
                       Aplicant.setValue('');
                       AplicantDep.setValue('');
                       Request.setValue('');
                       obj.setValue('');
                       client.setValue('');
                       Resp.setValue('');
                       contragent.setValue('');
SearchWindow.show();
 }


  SearchWindow= new Ext.Window({
      id: 'SearchWindow',
      title: 'Поиск',
      closable:false,
      width: 710,
      height: 600,
      plain:true,
      layout: 'fit',
      //items: RequestCreateForm
      items: [SearchForm]

    });



     function doSearch(){
         //

       if (gSearchMode=='app_store_all') {
        app_store_all.reload({params: {
          CreateDtStart:       CreateDtStart.getValue(),
          CreateDtFinish:      CreateDtFinish.getValue(),
          DoneDtStart:         DoneDtStart.getValue(),
          DoneDtFinish:        DoneDtFinish.getValue(),
          reqNum:              reqNum.getValue(),
          Aplicant:            Aplicant.getValue(),
          AplicantDep:         AplicantDep.getValue(),
          Request:             Request.getValue(),
          obj:                 obj.getValue(),
          client:              client.getValue(),
          Resp:                Resp.getValue(),
          contragent:          contragent.getValue()
          ,dep_id : gUserDepId
        }});
    } else if (gSearchMode=='app_store_forme') {
        app_store_forme.reload({params: {
          CreateDtStart:       CreateDtStart.getValue(),
          CreateDtFinish:      CreateDtFinish.getValue(),
          DoneDtStart:         DoneDtStart.getValue(),
          DoneDtFinish:        DoneDtFinish.getValue(),
          reqNum:              reqNum.getValue(),
          Aplicant:            Aplicant.getValue(),
          AplicantDep:         AplicantDep.getValue(),
          Request:             Request.getValue(),
          obj:                 obj.getValue(),
          client:              client.getValue(),
          Resp:                Resp.getValue(),
          contragent:          contragent.getValue()
          ,dep_id : gUserDepId
        }});
    } else if (gSearchMode=='app_store_my_it') {
        app_store_my_it.reload({params: {
          CreateDtStart:       CreateDtStart.getValue(),
          CreateDtFinish:      CreateDtFinish.getValue(),
          DoneDtStart:         DoneDtStart.getValue(),
          DoneDtFinish:        DoneDtFinish.getValue(),
          reqNum:              reqNum.getValue(),
          Aplicant:            Aplicant.getValue(),
          AplicantDep:         AplicantDep.getValue(),
          Request:             Request.getValue(),
          obj:                 obj.getValue(),
          client:              client.getValue(),
          Resp:                Resp.getValue(),
          contragent:          contragent.getValue()
          ,user_id : gUserId
          ,dep_id : 1
        }});

    
    } else if  (gSearchMode=='app_store_my_pr') {
    app_store_my_pr.reload({params: {
          CreateDtStart:       CreateDtStart.getValue(),
          CreateDtFinish:      CreateDtFinish.getValue(),
          DoneDtStart:         DoneDtStart.getValue(),
          DoneDtFinish:        DoneDtFinish.getValue(),
          reqNum:              reqNum.getValue(),
          Aplicant:            Aplicant.getValue(),
          AplicantDep:         AplicantDep.getValue(),
          Request:             Request.getValue(),
          obj:                 obj.getValue(),
          client:              client.getValue(),
          Resp:                Resp.getValue(),
          contragent:          contragent.getValue()
          ,user_id : gUserId
          ,dep_id : 3
        }});
    }else if  (gSearchMode=='app_store_my_ur') {
        app_store_my_ur.reload({params: {
          CreateDtStart:       CreateDtStart.getValue(),
          CreateDtFinish:      CreateDtFinish.getValue(),
          DoneDtStart:         DoneDtStart.getValue(),
          DoneDtFinish:        DoneDtFinish.getValue(),
          reqNum:              reqNum.getValue(),
          Aplicant:            Aplicant.getValue(),
          AplicantDep:         AplicantDep.getValue(),
          Request:             Request.getValue(),
          obj:                 obj.getValue(),
          client:              client.getValue(),
          Resp:                Resp.getValue(),
          contragent:          contragent.getValue()
          ,user_id : gUserId
          ,dep_id : 2
        }});
    }

   }

/*конец формы поиска*/