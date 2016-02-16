/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

/*
 *Коммерческая недвижимость и её графики
 ***/


charts.CommercialChartsPan =  Ext.extend(
    Ext.Panel,{
        initComponent: function(){
            var config = {
                    xtype: 'panel',
                    autoScroll : 1,
                    overflow:'auto',
                    layout: 'border',
                    items:[
                        {xtype:'commercialcallschart' }
                       ,{xtype:'commercialcallsgrid' }
                    
                    ]
                    
            }; // eo config object
            
            Ext.apply(this, Ext.apply(this.initialConfig, config));
            charts.CommercialChartsPan.superclass.initComponent.apply(this, arguments);
             
            
            
            
   } // eo function initComponent

});
Ext.reg('commercialchartspan', charts.CommercialChartsPan);




Ext.chart.Chart.CHART_URL = '../js/ext-3.2.1/resources/charts.swf';
var xg = Ext.grid;

charts.CommercialCallsChart =  Ext.extend(
    Ext.Panel,{
        initComponent: function(){
            var config = {
                    width: 600,
                    height: 590,
                    region:'west'
                    ,items: {
                        xtype: 'stackedbarchart',
                        store: CommercialCallsStore,
                        
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
            charts.CommercialCallsChart.superclass.initComponent.apply(this, arguments);

   } // eo function initComponent

});
Ext.reg('commercialcallschart', charts.CommercialCallsChart);



var summary_commercial = new Ext.ux.grid.GridSummary();

//Ext.ux.GroupTabPanel.superclass.initComponent.call(this);
charts.CommercialCallsGrid =  Ext.extend(xg.GridPanel,{
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
                 store:CommercialCallsStore
                ,cm:depcalls_commercial
                ,region:'center'
                ,height : 450
                ,selModel: new Ext.grid.RowSelectionModel({
                  singleSelect:false
                }),
                
                loadMask:true
                ,stripeRows: true
              ,plugins: [summary_commercial]  
             ,split: true
            };

     // apply config
    Ext.apply(this, Ext.apply(this.initialConfig, config));
    charts.CommercialCallsGrid.superclass.initComponent.apply(this, arguments);
     var gDateRangeFrm = function(){
            /*Запускаю своё событие, от кнопки с тулбара*/
         RangeWin1.show();
        }
    
    /////////////////////////////////////////////////////////////////////////
    var RangeWin1 = new Ext.Window({
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

                                var theForm = RangeWin1.items.itemAt(0).getForm();
                                
                                var start_dt   = RangeWin1.items.itemAt(0).items.itemAt(0).getValue();
                                var end_dt     = RangeWin1.items.itemAt(0).items.itemAt(1).getValue();
                                 start_dt = Ext.util.Format.date(start_dt, 'd.m.Y');
                                 end_dt = Ext.util.Format.date(end_dt, 'd.m.Y');
                                
                                
                                
                                // Ext.MessageBox.alert('Звонки','Данные '+ start_dt+' '+end_dt);
                                CommercialCallsStore.reload({params: {start_dt:start_dt, end_dt:end_dt}});

                              }
                            }, {
                                text: 'Отмена',
                                handler: function(){
                                    
                                    RangeWin1.items.itemAt(0).items.itemAt(0).setValue('');
                                    RangeWin1.items.itemAt(0).items.itemAt(1).setValue('');
                                   
                                    RangeWin1.hide();}
                            }]
              })
    });
    ////



   } // eo function initComponent

});
Ext.reg('commercialcallsgrid', charts.CommercialCallsGrid);



//}}}

function title_result(val, x, store){
         var res='';
           res='<b>'+val+'</b>';
          return res;
        }


 depcalls_commercial = new xg.ColumnModel( [

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

