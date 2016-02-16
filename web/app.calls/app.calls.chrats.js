/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
Ext.ns("app");

Ext.apply(Ext.form.VTypes, {
    daterange : function(val, field) {
        var date = field.parseDate(val);

        if(!date){
            return false;
        }
        if (field.startDateField && (!this.dateRangeMax || (date.getTime() != this.dateRangeMax.getTime()))) {
            var start = Ext.getCmp(field.startDateField);
            start.setMaxValue(date);
            start.validate();
            this.dateRangeMax = date;
        }
        else if (field.endDateField && (!this.dateRangeMin || (date.getTime() != this.dateRangeMin.getTime()))) {
            var end = Ext.getCmp(field.endDateField);
            end.setMinValue(date);
            end.validate();
            this.dateRangeMin = date;
        }
        /*
         * Always return true since we're only using this vtype to set the
         * min/max allowed values (these are tested for after the vtype test)
         */
        return true;
    },

    password : function(val, field) {
        if (field.initialPassField) {
            var pwd = Ext.getCmp(field.initialPassField);
            return (val == pwd.getValue());
        }
        return true;
    },

    passwordText : 'Passwords do not match'
});




Ext.chart.Chart.CHART_URL = '../js/ext-3.2.1/resources/charts.swf';
var xg = Ext.grid;

app.AllDepCallsChartPan =  Ext.extend(
    Ext.Panel,{
        initComponent: function(){
            var config = {
                    width: 600,
                    height: 590,
                    region:'west'
                    ,items: {
                        xtype: 'stackedbarchart',
                        store: ChartStore,
                        
                        yField: 'br_name',
                        xAxis: new Ext.chart.NumericAxis({
                            stackingEnabled: true

                        }),
                        series: [{
                            xField: 'Not_Proced',
                            displayName: 'Не обработанно'
                        },{
                            xField: 'Active',
                            displayName: 'Актив'
                        },{
                            xField: 'IN_WORK',
                            displayName: 'В работе'
                        },{
                            xField: 'Passive',
                            displayName: 'Пассив'
                        }]
                        ,extraStyle:
                        {
                            legend:
                            {
                                display: 'top',
                                padding: 5,
                                font: { family: 'Tahoma',
                                        size: 13 
                                }
                                ,html:'text'
                            }
                        }
                    }
            }; // eo config object
            // Применяем config

            Ext.apply(this, Ext.apply(this.initialConfig, config));
            app.AllDepCallsChartPan.superclass.initComponent.apply(this, arguments);

   } // eo function initComponent

});
Ext.reg('alldepcallschartpan', app.AllDepCallsChartPan);


/*Аналогичная панель но теперь уже по характеру звонка*/
//app.AllDepCallsChartPan_charact =  Ext.extend(
//    Ext.Panel,{
//        initComponent: function(){
//            var config = {
//                    width: 600,
//                    height: 590,
//                    region:'west'
//                    ,items: {
//                        xtype: 'stackedbarchart',
//                        store: ChartStore,
//                        
//                        yField: 'br_name',
//                        xAxis: new Ext.chart.NumericAxis({
//                            stackingEnabled: true
//
//                        }),
//                        series: [{
//                            xField: 'Not_Proced',
//                            displayName: 'Не обработанно'
//                        },{
//                            xField: 'Active',
//                            displayName: 'Актив'
//                        },{
//                            xField: 'IN_WORK',
//                            displayName: 'В работе'
//                        },{
//                            xField: 'Passive',
//                            displayName: 'Пассив'
//                        }]
//                        ,extraStyle:
//                        {
//                            legend:
//                            {
//                                display: 'top',
//                                padding: 5,
//                                font: { family: 'Tahoma',
//                                        size: 13 
//                                }
//                                ,html:'text'
//                            }
//                        }
//                    }
//            }; // eo config object
//            // Применяем config
//
//            Ext.apply(this, Ext.apply(this.initialConfig, config));
//            app.AllDepCallsChartPan_charact.superclass.initComponent.apply(this, arguments);
//
//   } // eo function initComponent
//
//});
//Ext.reg('alldepcallschartpan_charact', app.AllDepCallsChartPan_charact);
/*Конец панели по характеру звонка*/

app.BrokerCallsChartPan =  Ext.extend(
    Ext.Panel,{
        initComponent: function(){
            var config = {
                    width: 600,
                    height: 590,
                    region:'west',
                    items: {
                      
                        store: BrokerChartStore,
                        xtype: 'piechart',
                        dataField: 'c',
                        categoryField: 'state',
                        //extra styles get applied to the chart defaults
                        extraStyle:
                        {
                            legend:
                            {
                                display: 'bottom',
                                padding: 5,
                                font:
                                {
                                    family: 'Tahoma',
                                    size: 13
                                }
                                ,html:'text'
                            }
                        }
                    }
            }; // eo config object
            // Применяем config

            Ext.apply(this, Ext.apply(this.initialConfig, config));
            app.AllDepCallsChartPan.superclass.initComponent.apply(this, arguments);

   } // eo function initComponent

});
Ext.reg('brokercallschartpan', app.BrokerCallsChartPan);


var summary = new Ext.ux.grid.GridSummary();

//Ext.ux.GroupTabPanel.superclass.initComponent.call(this);
app.DepCallsGrid =  Ext.extend(xg.GridPanel,{
    initComponent: function(){
        var config ={
              tbar:[
                  {
                 text: 'Задать период'
                 ,tooltip: 'Задать период'
                 ,iconCls:'silk-add'
                 ,handler: function(){
                     /*вызываю функцию(объект),
                      *у которой область видимости
                      *такая же что и у тулбара.
                      *То есть тулбар и функция находяться на одном уровне видимости
                      **/
                   gDateRangeFrm.call()
                 }
               }],
                 store:ChartStore
                ,cm:depcalls_cm1
                ,region:'center'
                ,height : 450
                ,selModel: new Ext.grid.RowSelectionModel({
                  singleSelect:false
                })
                ,loadMask:true
                ,stripeRows: true
              ,plugins: [summary]  
             ,split: true
            };

     // apply config
    Ext.apply(this, Ext.apply(this.initialConfig, config));
    app.DepCallsGrid.superclass.initComponent.apply(this, arguments);

    var gDateRangeFrm = function(){
            /*Запускаю своё событие, от кнопки с тулбара*/
         RangeWin.show();
        }
    
    /////////////////////////////////////////////////////////////////////////
    var RangeWin = new Ext.Window({
                   title: 'Период'
                  ,closable:true
                  ,iconCls:'win'
                  ,closeAction: "hide"
                  ,width: 455
                  ,height: 200
                  ,plain:true
                  ,layout: 'fit'
                  ,items:  new Ext.FormPanel({

                            labelWidth: 125,
                            frame: true,
                            title: 'Период',
                            bodyStyle:'padding:5px 5px 0',
                            width: 450,
                            defaults: {width: 175},
                            defaultType: 'datefield',
                            items: [{
                              fieldLabel: 'Start Date',
                              name: 'startdt',
                              
                              vtype: 'daterange',
                              endDateField: 'enddt' // id of the end date field
                            },{
                              fieldLabel: 'End Date',
                              name: 'enddt',
                              
                              vtype: 'daterange',
                              startDateField: 'startdt' // id of the start date field
                            }]
                    ,buttons: [{
                                text: 'Применить',
                                handler: function() {

                                var theForm = RangeWin.items.itemAt(0).getForm();
                                
                                var start_dt   = RangeWin.items.itemAt(0).items.itemAt(0).getValue();
                                var end_dt     = RangeWin.items.itemAt(0).items.itemAt(1).getValue();
                               start_dt = Ext.util.Format.date(start_dt, 'd.m.Y');
                               end_dt = Ext.util.Format.date(end_dt, 'd.m.Y');
                                
                                
                                
                                // Ext.MessageBox.alert('Звонки','Данные '+ start_dt+' '+end_dt);
                                ChartStore.reload({params: {start_dt:start_dt, end_dt:end_dt}});

                              }
                            }, {
                                text: 'Отмена',
                                handler: function(){
                                    
                                    RangeWin.items.itemAt(0).items.itemAt(0).setValue('');
                                    RangeWin.items.itemAt(0).items.itemAt(1).setValue('');
                                   
                                    RangeWin.hide();}
                            }]
              })
    });
    ////
        


// load the store at the latest possible moment
        this.on({
            afterlayout:{
                scope:this,
                single:true,
                fn:function() {
                    this.store.load({
                           params:{
                             start:0
                            ,limit:150
                        }
                    
                    });
                    
               }

        }
    });



   } // eo function initComponent

});
Ext.reg('depcallsgrid', app.DepCallsGrid);

///Грид с отображением характера звонка

//var summary_charact = new Ext.ux.grid.GridSummary();
//
////Ext.ux.GroupTabPanel.superclass.initComponent.call(this);
//app.DepCallsGrid_charact =  Ext.extend(xg.GridPanel,{
//    initComponent: function(){
//        var config ={
//              tbar:[
//                  {
//                 text: 'Задать период'
//                 ,tooltip: 'Задать период'
//                 ,iconCls:'silk-add'
//                 ,handler: function(){
//                     /*вызываю функцию(объект),
//                      *у которой область видимости
//                      *такая же что и у тулбара.
//                      *То есть тулбар и функция находяться на одном уровне видимости
//                      **/
//                   gDateRangeFrm.call()
//                 }
//               }],
//                 store:ChartStore
//                ,cm:charalls_cm1
//                ,region:'center'
//                ,height : 450
//                ,selModel: new Ext.grid.RowSelectionModel({
//                  singleSelect:false
//                })
//                ,loadMask:true
//                ,stripeRows: true
//              ,plugins: [summary_charact]  
//             ,split: true
//            };
//
//     // apply config
//    Ext.apply(this, Ext.apply(this.initialConfig, config));
//    app.DepCallsGrid_charact.superclass.initComponent.apply(this, arguments);
//
//    var gDateRangeFrm = function(){
//            /*Запускаю своё событие, от кнопки с тулбара*/
//         RangeWin.show();
//        }
//    
//    /////////////////////////////////////////////////////////////////////////
//    var RangeWin = new Ext.Window({
//                   title: 'Период'
//                  ,closable:true
//                  ,iconCls:'win'
//                  ,closeAction: "hide"
//                  ,width: 455
//                  ,height: 200
//                  ,plain:true
//                  ,layout: 'fit'
//                  ,items:  new Ext.FormPanel({
//
//                            labelWidth: 125,
//                            frame: true,
//                            title: 'Период',
//                            bodyStyle:'padding:5px 5px 0',
//                            width: 450,
//                            defaults: {width: 175},
//                            defaultType: 'datefield',
//                            items: [{
//                              fieldLabel: 'Start Date',
//                              name: 'startdt',
//                              id: 'startdt',
//                              vtype: 'daterange',
//                              endDateField: 'enddt' // id of the end date field
//                            },{
//                              fieldLabel: 'End Date',
//                              name: 'enddt',
//                              id: 'enddt',
//                              vtype: 'daterange',
//                              startDateField: 'startdt' // id of the start date field
//                            }]
//                    ,buttons: [{
//                                text: 'Применить',
//                                handler: function() {
//
//                                var theForm = RangeWin.items.itemAt(0).getForm();
//                                
//                                var start_dt   = RangeWin.items.itemAt(0).items.itemAt(0).getValue();
//                                var end_dt     = RangeWin.items.itemAt(0).items.itemAt(1).getValue();
//                               start_dt = Ext.util.Format.date(start_dt, 'd.m.Y');
//                               end_dt = Ext.util.Format.date(end_dt, 'd.m.Y');
//                                
//                                
//                                
//                                // Ext.MessageBox.alert('Звонки','Данные '+ start_dt+' '+end_dt);
//                                ChartStore.reload({params: {start_dt:start_dt, end_dt:end_dt}});
//
//                              }
//                            }, {
//                                text: 'Отмена',
//                                handler: function(){
//                                    
//                                    RangeWin.items.itemAt(0).items.itemAt(0).setValue('');
//                                    RangeWin.items.itemAt(0).items.itemAt(1).setValue('');
//                                   
//                                    RangeWin.hide();}
//                            }]
//              })
//    });
//    ////
//        
//
//
//// load the store at the latest possible moment
//        this.on({
//            afterlayout:{
//                scope:this,
//                single:true,
//                fn:function() {
//                    this.store.load({
//                           params:{
//                             start:0
//                            ,limit:150
//                        }
//                    
//                    });
//                    
//               }
//
//        }
//    });
//
//
//
//   } // eo function initComponent
//
//});
//Ext.reg('depcallsgrid_charact', app.DepCallsGrid_charact);
///Конец грида с характером

//}}}

function title_result(val, x, store){
         var res='';
           res='<b>'+val+'</b>';
          return res;
        }


 depcalls_cm1 = new xg.ColumnModel( [

                  {
                    header: 'Брокер',
                    readOnly: true,
                    dataIndex: 'br_name',
                    width: 170,
                    sortable: true,
                    hidden: false
                  }

                  ,{
                    header: 'Не обработанно',
                    readOnly: true,
                    dataIndex: 'Not_Proced',
                    width: 100,
                    sortable: true,
                    hidden: false,
                    summaryType: 'sum'
                  }
                  ,
                  {header: 'Актив',
                    dataIndex: 'Active',
                    sortable: true
                    ,width: 70
                    ,summaryType: 'sum'
                   }
                   ,
                  {header: 'В работе',
                    dataIndex: 'IN_WORK',
                    sortable: true
                    ,width: 70
                    ,summaryType: 'sum'
                   }
                  ,{
                    header: 'Пассив',
                    readOnly: true,
                    dataIndex: 'Passive', // this is where the mapped name is important!
                    width: 70,
                    sortable: true,
                      hidden: false
                     ,summaryType: 'sum' 
                  }
                  ,{
                    header: 'Всего',
                    readOnly: true,
                    dataIndex: 'Total', // this is where the mapped name is important!
                    width: 70,
                    renderer:title_result
                    ,sortable: true,
                      hidden: false
                      ,summaryType: 'sum'
                  }

]);


charalls_cm1 = new xg.ColumnModel( [

                  {
                    header: 'Брокер',
                    readOnly: true,
                    dataIndex: 'br_name',
                    width: 170,
                    sortable: true,
                    hidden: false
                  }

                  ,{
                    header: 'Не обработанно',
                    readOnly: true,
                    dataIndex: 'Not_Proced',
                    width: 100,
                    sortable: true,
                    hidden: false,
                    summaryType: 'sum'
                  }
                  ,
                  {header: 'Актив',
                    dataIndex: 'Active',
                    sortable: true
                    ,width: 70
                    ,summaryType: 'sum'
                   }
                   ,
                  {header: 'В работе',
                    dataIndex: 'IN_WORK',
                    sortable: true
                    ,width: 70
                    ,summaryType: 'sum'
                   }
                  ,{
                    header: 'Пассив',
                    readOnly: true,
                    dataIndex: 'Passive', // this is where the mapped name is important!
                    width: 70,
                    sortable: true,
                      hidden: false
                     ,summaryType: 'sum' 
                  }
                  ,{
                    header: 'Всего',
                    readOnly: true,
                    dataIndex: 'Total', // this is where the mapped name is important!
                    width: 70,
                    renderer:title_result
                    ,sortable: true,
                      hidden: false
                      ,summaryType: 'sum'
                  }

]);


 var ChartStore = new Ext.data.JsonStore({
        root: 'results',
        baseParams: {P_DEPID: gUserDepId},
        fields: [
                {name: 'br_name', mapping:'br_name', type: 'string'},
                {name: 'Not_Proced', mapping:'Not_Proced', type: 'int'},
                {name: 'Active', mapping:'Active', type: 'int'},
                {name: 'IN_WORK', mapping:'IN_WORK', type: 'int'},
                {name: 'Passive', mapping:'Passive', type: 'int'},
                {name: 'Total', mapping:'Total', type: 'string'},
                {name: 'Not_Proced_t', mapping:'Not_Proced_t', type: 'string'},
                {name: 'Active_t', mapping:'Active_t', type: 'string'},
                {name: 'IN_WORK_t', mapping:'IN_WORK_t', type: 'int'},
                {name: 'Passive_t', mapping:'Passive_t', type: 'string'},
                {name: 'Total_t', mapping:'Total_t', type: 'string'}
        ],
        proxy: new Ext.data.ScriptTagProxy({
            url: '../stores/charts/calls/get_chart_dep.jsp'
        })
    });

     ChartStore.load();

var BrokerChartStore = new Ext.data.JsonStore({
        root: 'results',
        baseParams: {P_USERID: gUserId},
        fields: [
                {name: 'state', mapping:'state', type: 'string'},
                {name: 'c', mapping:'c', type: 'string'}
        ],
        proxy: new Ext.data.ScriptTagProxy({
            url: '../stores/charts/calls/get_chart_data.jsp'
        })
    });

     BrokerChartStore.load();
     
     