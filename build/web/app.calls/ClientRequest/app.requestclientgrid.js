/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

Ext.ns("app");

var xg = Ext.grid;


function title_result(val, x, store){
         var res='Пассив';
         if (val==1) {res='Актив'} else if (val==-1) {res='Не обработан'} ;
          return res;
        }

function Dep_Color(val, x, store){
         var l_color = '#ffffff';
         
         if (val == 'Офисная недвижимость'){
             l_color = '#2911a6';
         }
         else if (val == 'Отдел IT') {
             l_color = '#a60c0c';
         }
         else { 
             l_color = '#33a611';
         }
         return '<font color="'+l_color+'">&nbsp;' + val + '</font>';
        }


function Req_Status_Color(val, x, store){
         var l_color = '#000000';
         
         if (val == 'Актив'){
             l_color = '#00c400';
         }
         else if (val == 'Пассив') {
             l_color = '#ff0505';
         }
         else { 
             l_color = '#6bff66';
         }
         return '<font color="'+l_color+'">&nbsp;' + val + '</font>';
        }

app.ClientReqGridAll =  Ext.extend(xg.EditorGridPanel,{
    initComponent: function(){
        var config ={
                 selModel: new Ext.grid.RowSelectionModel({
                  singleSelect:false
                })
                ,loadMask:true
                ,split: true
            };

     // apply config
    Ext.apply(this, Ext.apply(this.initialConfig, config));
    
    this.bbar = new Ext.PagingToolbar({
                    pageSize: 25
                    ,store: this.store
                    ,displayInfo: true
                    ,displayMsg: 'Показанно записей {0} - {1} of {2}'
                    ,emptyMsg: "Нет записей"

                 });
                 

    
    app.ClientReqGridAll.superclass.initComponent.apply(this, arguments);

// load the store at the latest possible moment
        this.on({
            afterlayout:{
                scope:this,
                single:true,
                fn:function() {

                    this.store.load({

                        params:{
                             start:0
                            ,limit:25
                        }
                    });
               }

        }
    });
   } // eo function initComponent

});
Ext.reg('clientreqgridall', app.ClientReqGridAll);

//}}}




var ClientRequest_cm = new xg.ColumnModel( [
                  {
                    header: '№ Заявки',
                    readOnly: true,
                    dataIndex: 'ID', // this is where the mapped name is important!
                    width: 75,
                    sortable: true,
                      hidden: false
                  }
                  ,
                  {
                    header: 'Организация',
                    readOnly: true,
                    dataIndex: 'ORG_NAME', // this is where the mapped name is important!
                    width: 120,
                    sortable: true,
                      hidden: false
                  }
                  ,{
                    header: 'Брокер',
                    readOnly: true,
                    dataIndex: 'USER_NAME', // this is where the mapped name is important!
                    width: 100,
                    sortable: true,
                      hidden: false
                  }
                  ,{
                    header: 'ID Клиента',
                    readOnly: true,
                    dataIndex: 'cl_id', // this is where the mapped name is important!
                    width: 75,
                    sortable: true,
                      hidden: false
                  }
                    ,{
                    header: 'Дата',
                    readOnly: true,
                    dataIndex: 'DATE_REC',
                    renderer: Ext.util.Format.dateRenderer('d.m.Y H:i'),
                    width: 100,
                    sortable: true,
                    hidden: false
                  }
                  ,
                  { header: 'Лоты',
                    dataIndex: 'LOT',
                    sortable: true
                    //renderer:title_result
                    ,width: 100}
                  ,{
                    header: 'Операция',
                    readOnly: true,
                    dataIndex: 'OP_NAME', // this is where the mapped name is important!
                    width: 75,
                    sortable: true,
                      hidden: false
                  }
                  ,{
                    header: 'Бюджет от',
                    readOnly: true,
                    dataIndex: 'BUDGET_START', // this is where the mapped name is important!
                    width: 75,
                    sortable: true,
                      hidden: false
                  }
                  ,{
                    header: 'Бюджет до',
                    readOnly: true,
                    dataIndex: 'BUDGET_END', // this is where the mapped name is important!
                    width: 75,
                    sortable: true,
                      hidden: false
                  }
                  ,{
                    header: 'Валюта',
                    readOnly: true,
                    dataIndex: 'SHORT_NAME', // this is where the mapped name is important!
                    width: 75,
                    sortable: true,
                      hidden: false
                  }
                  ,{
                    header: 'Площадь от',
                    readOnly: true,
                    dataIndex: 'AREA_START', // this is where the mapped name is important!
                    width: 75,
                    sortable: true,
                      hidden: false
                  }
                  ,{
                    header: 'Площадь до',
                    readOnly: true,
                    dataIndex: 'AREA_END', // this is where the mapped name is important!
                    width: 75,
                    sortable: true,
                      hidden: false
                  }
                  ,{
                    header: 'Срочность',
                    readOnly: true,
                    dataIndex: 'URGENCY', // this is where the mapped name is important!
                    width: 75,
                    sortable: true,
                      hidden: false
                  }
                  ,{
                    header: 'Место',
                    readOnly: true,
                    dataIndex: 'DESTINATION', // this is where the mapped name is important!
                    width: 75,
                    sortable: true,
                      hidden: false
                  }
                  ,{
                    header: 'Готовность',
                    readOnly: true,
                    dataIndex: 'READY_NAME', // this is where the mapped name is important!
                    width: 75,
                    sortable: true,
                      hidden: false
                  }
                  

]);


var MyRequestsColumns =  [
                    {
                    header: '№ Заявки',
                    readOnly: true,
                    dataIndex: 'ID', // this is where the mapped name is important!
                    width: 75,
                    sortable: true,
                      hidden: false
                  }
                  ,{
                    header: 'Организация',
                    readOnly: true,
                    dataIndex: 'ORG_NAME', // this is where the mapped name is important!
                    width: 150,
                    sortable: true,
                      hidden: false
                  }
                  ,{
                    header: 'Брокер',
                    readOnly: true,
                    dataIndex: 'USER_NAME', // this is where the mapped name is important!
                    width: 150,
                    sortable: true,
                      hidden: false
                  }
//                  ,{
//                    header: 'ID Клиента',
//                    readOnly: true,
//                    dataIndex: 'cl_id', // this is where the mapped name is important!
//                    width: 75,
//                    sortable: true,
//                      hidden: false
//                  }
                 ,{header: 'Статус',
                            width: 100,
                            sortable: true,
                            dataIndex: 'req_status_name'
                            ,renderer:Req_Status_Color
                            ,editor: new Ext.form.ComboBox({
                                   typeAhead: true,
                                   triggerAction: 'all',
                                   store: ClRequestStatusStore,
                                   mode: 'remote',
                                   valueField: 'id',
                                   displayField: 'name',
                                   listClass: 'x-combo-list-small'
                        })
                 }
                    ,{
                    header: 'Дата',
                    readOnly: true,
                    dataIndex: 'DATE_REC',
                    renderer: Ext.util.Format.dateRenderer('d.m.Y H:i'),
                    width: 100,
                    sortable: true,
                    hidden: false
                  }
                  ,{
                    header: 'Отдел',
                    readOnly: true,
                    dataIndex: 'req_dep_name', // this is where the mapped name is important!
                    width: 125,
                    sortable: true,
                      hidden: false,
                      renderer:Dep_Color
                  }
                 
//                  ,
//                  { header: 'Лоты',
//                    dataIndex: 'LOT',
//                    sortable: true
//                    //renderer:title_result
//                    ,width: 100}
                  ,{
                    header: 'Операция',
                    readOnly: true,
                    dataIndex: 'OP_NAME', // this is where the mapped name is important!
                    width: 75,
                    sortable: true,
                      hidden: false
                  }
                  ,{
                    header: 'Бюджет от',
                    readOnly: true,
                    dataIndex: 'BUDGET_START', // this is where the mapped name is important!
                    width: 75,
                    sortable: true,
                      hidden: false
                  }
                  ,{
                    header: 'Бюджет до',
                    readOnly: true,
                    dataIndex: 'BUDGET_END', // this is where the mapped name is important!
                    width: 75,
                    sortable: true,
                      hidden: false
                  }
                  ,{
                    header: 'Валюта',
                    readOnly: true,
                    dataIndex: 'SHORT_NAME', // this is where the mapped name is important!
                    width: 75,
                    sortable: true,
                      hidden: false
                  }
                  ,{
                    header: 'Площадь от',
                    readOnly: true,
                    dataIndex: 'AREA_START', // this is where the mapped name is important!
                    width: 75,
                    sortable: true,
                      hidden: false
                  }
                  ,{
                    header: 'Площадь до',
                    readOnly: true,
                    dataIndex: 'AREA_END', // this is where the mapped name is important!
                    width: 75,
                    sortable: true,
                      hidden: false
                  }
                  ,{
                    header: 'Срочность',
                    readOnly: true,
                    dataIndex: 'URGENCY', // this is where the mapped name is important!
                    width: 100,
                    sortable: true,
                      hidden: false
                  }
//                  ,{
//                    header: 'Место',
//                    readOnly: true,
//                    dataIndex: 'DESTINATION', // this is where the mapped name is important!
//                    width: 75,
//                    sortable: true,
//                      hidden: false
//                  }
//                  ,{
//                    header: 'Готовность',
//                    readOnly: true,
//                    dataIndex: 'READY_NAME', // this is where the mapped name is important!
//                    width: 75,
//                    sortable: true,
//                      hidden: false
//                  }
                  ];






        
      

    app_store_reqclients_all = new Ext.data.JsonStore({
        root: 'results',
        totalProperty: 'totalCount',
        idProperty: 'ID',
        baseParams:{mode:'all'},
        fields: [
                {name: 'ID', mapping:'ID', type: 'int'},
                {name: 'LOT', mapping:'LOT', type: 'string'},
                {name: 'OPERATION_ID', mapping:'OPERATION_ID', type: 'string'},
                {name: 'OP_NAME', mapping:'OP_NAME', type: 'string'},
                {name: 'BUDGET_START', mapping:'BUDGET_START', type: 'string'},
                {name: 'BUDGET_END', mapping:'BUDGET_END', type: 'string'},
                
                {name: 'CURRENCY_ID', mapping:'CURRENCY_ID', type: 'string'},
                {name: 'CUR_NAME', mapping:'CUR_NAME', type: 'string'},
                {name: 'SHORT_NAME', mapping:'SHORT_NAME', type: 'string'},
                {name: 'AREA_START', mapping:'AREA_START', type: 'string'},
                {name: 'AREA_END', mapping:'AREA_END', type: 'string'},
                {name: 'URGENCY', mapping:'URGENCY', type: 'string'},
                {name: 'DESTINATION', mapping:'DESTINATION', type: 'string'},
                {name: 'READY_ID', mapping:'READY_ID', type: 'string'},
                {name: 'READY_NAME', mapping:'READY_NAME', type: 'string'},
                
                {name: 'ADDITIONAL_INFO', mapping:'ADDITIONAL_INFO', type: 'string'},
                {name: 'ORG_NAME', mapping:'ORG_NAME', type: 'string'},
                {name: 'USER_NAME', mapping:'USER_NAME', type: 'string'},
                {name: 'cl_id', mapping:'cl_id', type: 'string'},
                
                
                {name: 'DATE_REC', mapping:'DATE_REC',  type: 'date', dateFormat: 'd.m.Y H:i'},
                {name: 'LAST_USER_ID',mapping:'LAST_USER_ID', type: 'string'}

        ],

        // load using script tags for cross domain, if the data in on the same domain as
        // this page, an HttpProxy would be better
        proxy: new Ext.data.ScriptTagProxy({
            url: '../stores/clients/grid/GetClientRequests.jsp'
        })
    });
    
    
    
    app_store_reqclients_old = new Ext.data.JsonStore({
        root: 'results',
        idProperty: 'ID',
        fields: [
                {name: 'ID', mapping:'ID', type: 'int'},
                {name: 'CRM_CLIENTS_ID', mapping:'CRM_CLIENTS_ID', type: 'string'},
                {name: 'BROKER_ID', mapping:'BROKER_ID', type: 'string'},
                {name: 'REQUEST_TEXT', mapping:'REQUEST_TEXT', type: 'string'},
                {name: 'REQEUST_RESULT', mapping:'REQEUST_RESULT', type: 'string'},
                {name: 'REQUEST_STATUS', mapping:'REQUEST_STATUS', type: 'string'},
                {name: 'REQUEST_DATE', mapping:'REQUEST_DATE',  type: 'date', dateFormat: 'd.m.Y H:i'},
                {name: 'LAST_USER_ID',mapping:'LAST_USER_ID', type: 'string'}

        ],

        // load using script tags for cross domain, if the data in on the same domain as
        // this page, an HttpProxy would be better
        proxy: new Ext.data.ScriptTagProxy({
            url: '../stores/clients/grid/GetClientRequests.jsp'
        })
    });
