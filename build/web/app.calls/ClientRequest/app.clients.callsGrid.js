/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */


Ext.ns("app");

var xg = Ext.grid;

function setColorCallGrid (status){
      var cls ='';
      switch (status) {
         case -1 :
            cls = 'grid-row-Green-Letters'
            break;
         case 0 :
            cls = 'grid-row-Light-Blue'
            break;
         case 1 :
            cls = 'grid-row-Dark-Purple'
            break;

        }//end switch
      return cls;
  }

function title_broker(val, x, store_j){
          return '<b>'+val+'</b> ('+ store_j.data.transfer_user_dep_name +')';
        }

function title_result(val, x, store){
         var res='Пассив';
         if (val==1) {res='Актив'} else if (val==-1) {res='Не обработан'} ;
          return res;
        }
        
        
        

app.ClientCallsGrid =  Ext.extend(xg.EditorGridPanel,{
    initComponent: function(){
        

             var config2 ={

                 store:this.store
                ,height:300
                ,cm:Client_Calls_cm
                
                ,view: new Ext.grid.GridView({
                    forceFit:true,
                    getRowClass : function (row, index) {
                      var cls = '';
                      var data = row.data;
                      cls = setColorCallGrid (data.RESULT_STATUS);
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
                     
                   gridAddBt.call()
                 }
                }
                ,'-'
                ,{
                 text: 'Результат'
                 ,tooltip: 'Результат'
                 ,iconCls:'silk-application-view-list'
                 ,handler: function(){
                     
                   gridResultBt.call()
                 }
               }
               
                ]
                
            };

            

           
                /*брокер*/
               Ext.apply(this, Ext.apply(this.initialConfig, config2));
           

       var gridAddBt = function(){
            /*Запускаю своё событие, от кнопки с тулбара*/
         this.fireEvent('addTbClick');
        }
      gridAddBt = gridAddBt.createDelegate(this);


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
   
    app.ClientCallsGrid.superclass.initComponent.apply(this, arguments);


    app.ClientCallsGrid.superclass.initComponent.apply(this, arguments);
     // load the store at the latest possible moment
//        this.on({
//            afterlayout:{
//                scope:this,
//                single:true,
//                fn:function() {
//
//                    this.store.load({
//
//                        params:{
//                             start:0
//                            ,limit:100
//
//                        }
//                    });
//               }
//
//        }
//    });
    
   } // eo function initComponent

});
Ext.reg('clientcallsgrid', app.ClientCallsGrid);


//}}}
      
      Client_Calls_cm = new xg.ColumnModel( [
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



app_store_Client_calls = new Ext.data.JsonStore({
        root: 'results',
        idProperty: 'call_id',
        baseParams: {start:0
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
                {name: 'rec_secretar',mapping:'rec_secretar', type: 'string'}

        ],

        // load using script tags for cross domain, if the data in on the same domain as
        // this page, an HttpProxy would be better
        proxy: new Ext.data.ScriptTagProxy({
            url: '../stores/clients/grid/ClientsCalls.jsp'
        })
    });