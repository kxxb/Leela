/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

Ext.ns("app");

var xg = Ext.grid;


 function setColorCallGrid (grav){
      var cls ='';
      switch (grav) {
         case 'Важный' :
            cls = 'grid-row-Light-Blue'
            break;
         

        }//end switch
      return cls;
  }

function title_broker(val, x, store_j){
          return '<b>'+val+'</b> ('+ store_j.data.transfer_user_dep_name +')';
        }

function call_gravity_color(val, x, store_j){
       var res = val;
          if (val =='Важный') {
            res =  '<font color ="red"><b>'+val+'</b></font>';
          }
          if (val =='Не важный') {
            res =  '<font color ="green">'+val+'</font>';
          }
          return res;
        }

function title_result(val, x, store){
         var res='Пассив';
         if (val==1) {res='Актив'} 
         else if (val==0) {res='Пассив'}
         else if (val==2) {res='В работе'} 
         else if (val==-1) {res='Не обработан'} ;
          return res;
        }


function title_CHARACTER(val, x, store){
         var res='Не определён';
         /*
          
	1	Не определён
	2	Купить
	3	Продать
	4	Снять
	5	Сдать
	6	Посредник
          **/
         if (val==1) {res='Не определён'} 
         else if (val==2) {res='Купить'}
         else if (val==3) {res='Продать'}
         else if (val==4) {res='Снять'}
         else if (val==5) {res='Сдать'}
         else if (val==6) {res='Посредник'} ;
          return res;
        }

function title_CURRENCY(val, x, store){
    /*
     
25	7	1	нет
26	7	2	РУБ.
27	7	3	USD.
28	7	4	EUR.
     **/
         var res='нет';
         if (val==1) {res='нет'} 
         else if (val==2) {res='РУБ.'}
         else if (val==3) {res='USD.'}
         else if (val==4) {res='EUR.'} ;
          return res;
        }


app.CallsGrid =  Ext.extend(xg.EditorGridPanel,{
    initComponent: function(){
        var config1 ={

                 store:app_store_calls
                ,height:600
                ,cm:Calls_cm
                //,cm:Calls_cm_edit
                ,view: new Ext.grid.GridView({
                    forceFit:true,
                    getRowClass : function (row, index) {
                      var cls = '';
                      var data = row.data;
                      cls = setColorCallGrid (data.CALL_GRAVITY);
                      return cls;
                   }
                })
                ,selModel: new Ext.grid.RowSelectionModel({
                  singleSelect:false
                })
                
                ,loadMask:true
                ,split: true
                ,tbar:[
                  '-'
                ,{
                 text: 'Новый звонок'
                 ,tooltip: 'Новый звонок'
                 ,iconCls:'silk-add'
                 ,handler: function(){
                     /*вызываю функцию(объект),
                      *у которой область видимости
                      *такая же что и у тулбара.
                      *То есть тулбар и функция находяться на одном уровне видимости
                      **/
                   gridAddBt.call()
                 }
               }
                ,'-'
                ,{
                 text: 'Редактировать звонок'
                 ,tooltip: 'Редактировать звонок'
                 ,iconCls:'silk-cog'
                 ,handler: function(){
                     /*вызываю функцию(объект),
                      *у которой область видимости
                      *такая же что и у тулбара.
                      *То есть тулбар и функция находяться на одном уровне видимости
                      **/
                   gridEditBt.call()
                 }
               }
               ,'-'
               
                ]
            
            };


             var config2 ={

                 store:app_store_broker_calls
                //,height:200
                ,cm:Calls_cm
                ,view: new Ext.grid.GridView({
                    forceFit:true,
                    getRowClass : function (row, index) {
                      var cls = '';
                      var data = row.data;
                      cls = setColorCallGrid (data.CALL_GRAVITY);
                      return cls;
                   }
                })
                ,selModel: new Ext.grid.RowSelectionModel({
                  singleSelect:false
                })
                ,loadMask:true
                ,split: true
                ,tbar:[
                  '-'
                ,{
                 text: 'Новый звонок'
                 ,tooltip: 'Новый звонок !'
                 ,iconCls:'silk-add'
                 ,handler: function(){
                     /*вызываю функцию(объект),
                      *у которой область видимости
                      *такая же что и у тулбара.
                      *То есть тулбар и функция находяться на одном уровне видимости
                      **/
                   gridAddBt.call()
                 }
                }
                ,'-'
                ,{
                 text: 'Результат'
                 ,tooltip: 'Результат'
                 ,iconCls:'silk-application-view-list'
                 ,handler: function(){
                     /*вызываю функцию(объект),
                      *у которой область видимости
                      *такая же что и у тулбара.
                      *То есть тулбар и функция находяться на одном уровне видимости
                      **/
                   gridResultBt.call()
                 }
               }
               
                ]
            };

             var config3 ={

                 store:app_store_dep_calls
               // ,height:200
                ,cm:Calls_cm_edit
                ,view: new Ext.grid.GridView({
                    forceFit:true,
                    getRowClass : function (row, index) {
                      var cls = '';
                      var data = row.data;
                      cls = setColorCallGrid (data.CALL_GRAVITY);
                      return cls;
                   }
                })
                ,loadMask:true
                ,clicksToEdit:1
                ,enableColLock:false
                ,split: true
                ,selModel: new Ext.grid.RowSelectionModel({
                  singleSelect:false
                })
                ,tbar:[
                  '-'
                ,{
                 text: 'Новый звонок'
                 ,tooltip: 'Новый звонок'
                 ,iconCls:'silk-add'
                 ,handler: function(){
                     /*вызываю функцию(объект),
                      *у которой область видимости
                      *такая же что и у тулбара.
                      *То есть тулбар и функция находяться на одном уровне видимости
                      **/
                   gridAddBt.call()
                 }
               },'-'
                ,{
                 text: 'Результат'
                 ,tooltip: 'Результат'
                 ,iconCls:'silk-application-view-list'
                 ,handler: function(){
                     /*вызываю функцию(объект),
                      *у которой область видимости
                      *такая же что и у тулбара.
                      *То есть тулбар и функция находяться на одном уровне видимости
                      **/
                   gridResultBt.call()
                 }
               }
               ,'-'
                ,{
                 text: 'Редактировать звонок'
                 ,tooltip: 'Редактировать звонок'
                 ,iconCls:'silk-cog'
                 ,handler: function(){
                     /*вызываю функцию(объект),
                      *у которой область видимости
                      *такая же что и у тулбара.
                      *То есть тулбар и функция находяться на одном уровне видимости
                      **/
                   gridEditBt.call()
                 }
               }
               ,
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
//                    ,'-'
//                    ,{
//                        xtype:'combo',
//                        typeAhead: true,
//                        triggerAction: 'all',
//                        store: CharacterStore,
//                        mode: 'remote',
//                        emptyText:'Характер',
//                        valueField: 'id',
//                        displayField: 'name',
//                        listClass: 'x-combo-list-small'
//                        ,listeners: {
//                           select: function(f,r,i){
//                             gridCombo(r.data.character_id);
//                           }
//                         }
//                    }   
//                    ,'-'
//                    ,{
//                        xtype:'combo',
//                        typeAhead: true,
//                        triggerAction: 'all',
//                        store: CurrencyStore,
//                        mode: 'remote',
//                        emptyText:'Валюта',
//                        valueField: 'id',
//                        displayField: 'name',
//                        listClass: 'x-combo-list-small'
//                        ,listeners: {
//                           select: function(f,r,i){
//                             gridCombo(r.data.currency_id);
//                           }
//                         }
//                    }   
                    ,'-'
                    
                ]
            };
     // apply config

            if (gUserDepId== 8) {
                /*все звонки*/
                  Ext.apply(this, Ext.apply(this.initialConfig, config1));
            } else if (gUserId == 49 | gUserId == 131 | gUserId == 142 | gUserId == 279 | gUserId == 17| gUserId == 46 | gUserId == 12)  {
                /*начальники секретари
                 *(49, 131, 142)
                 *(279,17)
                 *(46,12) Дабсон Артемьева
                 **/

                  Ext.apply(this, Ext.apply(this.initialConfig, config3));

             } else 
              {
                /*брокер*/
               Ext.apply(this, Ext.apply(this.initialConfig, config2));
              }

       var gridAddBt = function(){
            /*Запускаю своё событие, от кнопки с тулбара*/
         this.fireEvent('addTbClick');
        }
      gridAddBt = gridAddBt.createDelegate(this);


        function QuicSearch(param){
              app_store_dep_calls.reload({params: {search_param:param, limit:100, start:1}})  
          }

        var gridEditBt = function(){
            /*Запускаю своё событие, от кнопки с тулбара*/
         this.fireEvent('editTbClick');
        }
       gridEditBt = gridEditBt.createDelegate(this);



       var gridResultBt = function(){
            /*Запускаю своё событие, от кнопки с тулбара*/
         this.fireEvent('resultTbClick');
        }
      gridResultBt = gridResultBt.createDelegate(this);

     var gridCombo = function(p_transfer_id){
            /*Запускаю своё событие, от кнопки с тулбара*/
         this.fireEvent('gridCombo',p_transfer_id);
         //Ext.Msg.alert('gridCombo ', 'cheked'+p_transfer_id);

        }
      gridCombo = gridCombo.createDelegate(this);

     this.bbar = new Ext.PagingToolbar({
                    pageSize: 100
                    ,store: this.store
                    ,displayInfo: true
                    ,displayMsg: 'Показанно звонков {0} - {1} из {2}'
                    ,emptyMsg: "Нет звонков"

                 });
   
    app.CallsGrid.superclass.initComponent.apply(this, arguments);


    app.CallsGrid.superclass.initComponent.apply(this, arguments);
     // load the store at the latest possible moment
        this.on({
            afterlayout:{
                scope:this,
                single:true,
                fn:function() {

                    this.store.load({

                        params:{
                             start:0
                            ,limit:100

                        }
                    });
               }

        }
    });
    
   } // eo function initComponent

});
Ext.reg('callsgrid', app.CallsGrid);


//}}}



 Calls_cm = new xg.ColumnModel( [
                   {
                    header: '№',
                    readOnly: true,
                    dataIndex: 'r_day',
                    width: 15,
                    sortable: true,
                    h2idden: false
                  }
                  ,
                    {
                    header: 'Дата звонка',
                    readOnly: true,
                    dataIndex: 'call_date_time',
                    renderer: Ext.util.Format.dateRenderer('d.m.Y H:i'),
                    width: 50,
                    sortable: true,
                    hidden: false
                  }
                  ,{
                    header: 'Кто принял',
                    dataIndex: 'sekretar',
                    sortable: true,
                    width: 50

                  }
                  
                  ,{
                    header: 'Источник',
                    dataIndex: 'rek_s_source',
                    sortable: true,
                    width: 75
                  }
                 
                  ,{
                    header: 'Контактный тел',
                    dataIndex: 'input_tel',
                    sortable: true,
                    width: 75
                  }
                  ,{
                    header: 'Переключен',
                    dataIndex: 'transfer_user',
                    sortable: true,
                    renderer:title_broker,
                    width: 75
                  },
                  { header: 'Статус',
                    dataIndex: 'RESULT_STATUS',
                    sortable: true,
                    renderer:title_result
                    ,width: 50}
                 ,{
                    header: 'отдел',
                    dataIndex: 'transfer_user_dep_name',
                     hidden: true,
                    width: 75
                  }
]);


Calls_cm_edit = new xg.ColumnModel( [
                   {
                    header: '№',
                    readOnly: true,
                    dataIndex: 'r_day',
                    width: 15,
                    sortable: true,
                    hidden: false
                  }
                  ,
                    {
                    header: 'Дата звонка',
                    readOnly: true,
                    dataIndex: 'call_date_time',
                    renderer: Ext.util.Format.dateRenderer('d.m.Y H:i'),
                    width: 50,
                    sortable: true,
                    hidden: false
                  }
                  ,{
                    header: 'Кто принял',
                    dataIndex: 'sekretar',
                    sortable: true,
                    width: 50

                  }

                  ,{
                    header: 'Источник',
                    dataIndex: 'rek_s_source',
                    sortable: true,
                    width: 75
                    
                  }

                  ,{
                    header: 'Контактный тел',
                    dataIndex: 'input_tel',
                    sortable: true,
                    width: 75
                    
                  }
                  ,{
                     header: 'Переключен'
                    ,dataIndex: 'transfer_user'
                    ,sortable: true
                    ,renderer:title_broker
                    ,width: 75
                    ,editor: new Ext.form.ComboBox({
                                   typeAhead: true,
                                   triggerAction: 'all',
                                   store: transferStore,
                                   mode: 'remote',
                                   valueField: 'TRANSFER_ID',
                                   displayField: 'transfer_user',
                                   listClass: 'x-combo-list-small'
                        })
                  },
                  { header: 'Статус',
                    dataIndex: 'RESULT_STATUS',
                    sortable: true,
                    renderer:title_result
                    ,width: 50}
                ,
                  { header: 'Характер',
                    dataIndex: 'character_id',
                    sortable: true,
                    renderer:title_CHARACTER
                    ,width: 50},
                  { header: 'Бюджет',
                    dataIndex: 'budjet',
                    sortable: true
                    ,width: 50},
                  { header: 'Валюта',
                    dataIndex: 'currency_id',
                    sortable: true,
                    renderer:title_CURRENCY
                    ,width: 50}
                
                ,{
                     header: 'Важность'
                    ,dataIndex: 'CALL_GRAVITY'
                    ,sortable: true
                    ,width: 75
                    ,renderer:call_gravity_color
                    ,editor: new Ext.form.ComboBox({
                                   typeAhead: true,
                                   triggerAction: 'all',
                                   store: new Ext.data.JsonStore({
                                            fields : [ 'CALL_GRAVITY'],
                                            data   : [
                                                { CALL_GRAVITY: 'Важный'},
                                                { CALL_GRAVITY: 'Не важный'},
                                                { CALL_GRAVITY: 'Не определено'}
                                            ]
                                        }),
                                   mode:           'local',
                                   valueField: 'CALL_GRAVITY',
                                   displayField: 'CALL_GRAVITY',
                                   listClass: 'x-combo-list-small'
                        })
                        
                        
                  }
]);



app_store_calls = new Ext.data.JsonStore({
        root: 'results',
        idProperty: 'call_id',
        totalProperty: 'totalCount',
        baseParams: {mode: 'all_calls'
                     ,start:0
                     ,limit:100
                    },
        fields: [
                {name: 'call_id', mapping:'call_id', type: 'int'},
                {name: 'call_date_time', mapping:'call_date_time', type: 'date', dateFormat: 'd/m/Y H:i'},
                {name: 'rek_s_source', mapping:'rek_s_source', type: 'string'},
                {name: 'sekretar', mapping:'sekretar', type: 'string'},
                {name: 'input_tel', mapping:'input_tel', type: 'string'},
                {name: 'call_description', mapping:'call_description', type: 'string'},
                {name: 'transfer_id', mapping:'transfer_id', type: 'string'},
                {name: 'transfer_user', mapping:'transfer_user', type: 'string'},
                {name: 'transfer_user_dep_id',mapping:'transfer_user_dep_id', type: 'string'},
                {name: 'transfer_user_dep_name', mapping:'transfer_user_dep_name', type: 'string'},
                {name: 'secretar_flag',mapping:'secretar_flag', type: 'string'},
                {name: 'r_day',mapping:'r_day', type: 'string'},
                {name: 'CALL_RESULT',mapping:'CALL_RESULT', type: 'string'},
                {name: 'RESULT_STATUS',mapping:'RESULT_STATUS', type: 'string'},
                {name: 'crm_rek_s_source_id',mapping:'crm_rek_s_source_id', type: 'string'},
                {name: 'rec_secretar',mapping:'rec_secretar', type: 'string'},
                {name: 'CALL_GRAVITY',mapping:'CALL_GRAVITY', type: 'string'},
                {name: 'call_lots',mapping:'call_lots', type: 'string'},
                {name: 'character_id',mapping:'character_id', type: 'string'},
                {name: 'budjet',mapping:'budjet', type: 'string'},
                {name: 'currency_id',mapping:'currency_id', type: 'string'}
                

        ],

        // load using script tags for cross domain, if the data in on the same domain as
        // this page, an HttpProxy would be better
        proxy: new Ext.data.ScriptTagProxy({
            url: '../stores/calls/grid/GetCalls.jsp'
        })
    });
    
app_store_broker_calls = new Ext.data.JsonStore({
        root: 'results',
        idProperty: 'call_id',
         totalProperty: 'totalCount',
        baseParams: {mode: 'broker_calls'
                     ,user_id : gUserId
                    },
        fields: [
                {name: 'call_id', mapping:'call_id', type: 'int'},
                {name: 'call_date_time', mapping:'call_date_time', type: 'date', dateFormat: 'd/m/Y H:i'},
                {name: 'rek_s_source', mapping:'rek_s_source', type: 'string'},
                {name: 'sekretar', mapping:'sekretar', type: 'string'},
                {name: 'input_tel', mapping:'input_tel', type: 'string'},

                {name: 'call_description', mapping:'call_description', type: 'string'},
                {name: 'transfer_id', mapping:'transfer_id', type: 'string'},
                {name: 'transfer_user', mapping:'transfer_user', type: 'string'},
                {name: 'transfer_user_dep_id',mapping:'transfer_user_dep_id', type: 'string'},
                {name: 'transfer_user_dep_name', mapping:'transfer_user_dep_name', type: 'string'},
                {name: 'secretar_flag',mapping:'secretar_flag', type: 'string'},
                {name: 'r_day',mapping:'r_day', type: 'string'},
                {name: 'CALL_RESULT',mapping:'CALL_RESULT', type: 'string'},
                {name: 'RESULT_STATUS',mapping:'RESULT_STATUS', type: 'string'},
                {name: 'crm_rek_s_source_id',mapping:'crm_rek_s_source_id', type: 'string'},
                {name: 'rec_secretar',mapping:'rec_secretar', type: 'string'},
                {name: 'CALL_GRAVITY',mapping:'CALL_GRAVITY', type: 'string'},
                {name: 'call_lots',mapping:'call_lots', type: 'string'},
                {name: 'character_id',mapping:'character_id', type: 'string'},
                {name: 'budjet',mapping:'budjet', type: 'string'},
                {name: 'currency_id',mapping:'currency_id', type: 'string'}

        ],

        // load using script tags for cross domain, if the data in on the same domain as
        // this page, an HttpProxy would be better
        proxy: new Ext.data.ScriptTagProxy({
            url: '../stores/calls/grid/GetCalls.jsp'
        })
    });

app_store_dep_calls = new Ext.data.JsonStore({
        root: 'results',
        idProperty: 'call_id',
         totalProperty: 'totalCount',
        baseParams: {mode: 'dep_calls'
                     ,Dep_id : gUserDepId
                    },
        fields: [
                {name: 'call_id', mapping:'call_id', type: 'int'},
                {name: 'call_date_time', mapping:'call_date_time', type: 'date', dateFormat: 'd/m/Y H:i'},
                {name: 'rek_s_source', mapping:'rek_s_source', type: 'string'},
                {name: 'sekretar', mapping:'sekretar', type: 'string'},
                {name: 'input_tel', mapping:'input_tel', type: 'string'},

                {name: 'call_description', mapping:'call_description', type: 'string'},
                {name: 'transfer_id', mapping:'transfer_id', type: 'string'},
                {name: 'transfer_user', mapping:'transfer_user', type: 'string'},
                {name: 'transfer_user_dep_id',mapping:'transfer_user_dep_id', type: 'string'},
                {name: 'transfer_user_dep_name', mapping:'transfer_user_dep_name', type: 'string'},
                {name: 'secretar_flag',mapping:'secretar_flag', type: 'string'},
                {name: 'r_day',mapping:'r_day', type: 'string'},
                {name: 'CALL_RESULT',mapping:'CALL_RESULT', type: 'string'},
                {name: 'RESULT_STATUS',mapping:'RESULT_STATUS', type: 'string'},
                {name: 'crm_rek_s_source_id',mapping:'crm_rek_s_source_id', type: 'string'},
                {name: 'rec_secretar',mapping:'rec_secretar', type: 'string'},
                {name: 'CALL_GRAVITY',mapping:'CALL_GRAVITY', type: 'string'},
               {name: 'call_lots',mapping:'call_lots', type: 'string'},
                {name: 'character_id',mapping:'character_id', type: 'string'},
                {name: 'budjet',mapping:'budjet', type: 'string'},
                {name: 'currency_id',mapping:'currency_id', type: 'string'}


        ],

        // load using script tags for cross domain, if the data in on the same domain as
        // this page, an HttpProxy would be better
        proxy: new Ext.data.ScriptTagProxy({
            url: '../stores/calls/grid/GetCalls.jsp'
        })
    });


   