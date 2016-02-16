/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

/*
 *Сводный отчет по источникам рекламы
 **/


charts.RekSourceChartsPan =  Ext.extend(
    Ext.Panel,{
        initComponent: function(){
            var config = {
                    xtype: 'panel',
                    autoScroll : 1,
                    overflow:'auto',
                    layout: 'border',
                    items:[
                        {xtype:'reksourcecallschart' }
                       ,{xtype:'reksourcecallsgrid' }
                    
                    ]
                    
            }; // eo config object
            
            Ext.apply(this, Ext.apply(this.initialConfig, config));
            charts.RekSourceChartsPan.superclass.initComponent.apply(this, arguments);
             
            
            
            
   } // eo function initComponent

});
Ext.reg('reksourcechartspan', charts.RekSourceChartsPan);




Ext.chart.Chart.CHART_URL = '../js/ext-3.2.1/resources/charts.swf';
var xg = Ext.grid;

charts.RekSourceCallsChart =  Ext.extend(
    Ext.Panel,{
        initComponent: function(){
            var config = {
                    width: 600,
                    height: 590,
                    region:'west'
                    ,items: {
                        xtype: 'stackedbarchart',
                        store: RekCallsStore,
                        
                        yField: 'rek_name',
                        xAxis: new Ext.chart.NumericAxis({
                            stackingEnabled: true

                        }),
                        series: [{
                            xField: 'dep_zag',
                            displayName: 'Загородная'
                        },{
                            xField: 'dep_off',
                            displayName: 'Коммерческая'
                        },{
                            xField: 'dep_ellite',
                            displayName: 'Элитная'
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
            charts.RekSourceCallsChart.superclass.initComponent.apply(this, arguments);

   } // eo function initComponent

});
Ext.reg('reksourcecallschart', charts.RekSourceCallsChart);



var summary_reksource = new Ext.ux.grid.GridSummary();

//Ext.ux.GroupTabPanel.superclass.initComponent.call(this);
charts.RekSourceCallsGrid =  Ext.extend(xg.GridPanel,{
    initComponent: function(){
        var config ={
                 store:RekCallsStore
                ,cm:depcalls_reksource
                ,region:'center'
                ,height : 450
                ,selModel: new Ext.grid.RowSelectionModel({
                  singleSelect:false
                })
                ,loadMask:true
                ,stripeRows: true
              ,plugins: [summary_reksource]  
             ,split: true
             ,
                        tbar:[
                         '-'   
                        
                         ,{
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
                          }
                        ]
            };

     // apply config
    Ext.apply(this, Ext.apply(this.initialConfig, config));
    charts.RekSourceCallsGrid.superclass.initComponent.apply(this, arguments);

      var gDateRangeFrm = function(){
            /*Запускаю своё событие, от кнопки с тулбара*/
         var dep_combo = RangeWin5.items.itemAt(0).items.itemAt(2); 
         dep_combo.setValue('777');
         RangeWin5.show();
        }
    
    /////////////////////////////////////////////////////////////////////////
    var RangeWin5 = new Ext.Window({
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
                            },
                            {
                           xtype:'combo',
                           fieldLabel: 'Отдел',
                           typeAhead: true,
                           triggerAction: 'all',
                           store: new Ext.data.SimpleStore({
                                fields:[ 'DEP_ID','DEP_NAME'],
                                 data: [['777','Все отделы'],['5', 'Коммерческая'],['6', 'Загородная'],['11', 'Элитная']]
                                                }),
                           mode: 'local',
                           defaultValue:'Все отделы',
                           valueField: 'DEP_ID',
                           displayField: 'DEP_NAME',
                           listClass: 'x-combo-list-small'
//                           ,listeners: {
//                              select: function(f,r,i){
//                                gridCombo(r.data.DEP_ID).call;
//                              }
//                            }
                         }
                        ]
                    ,buttons: [{
                                text: 'Применить',
                                handler: function() {

                                var theForm = RangeWin5.items.itemAt(0).getForm();
                                
                                var start_dt   = RangeWin5.items.itemAt(0).items.itemAt(0).getValue();
                                var end_dt     = RangeWin5.items.itemAt(0).items.itemAt(1).getValue();
                                var dep_id     = RangeWin5.items.itemAt(0).items.itemAt(2).getValue();
                               start_dt = Ext.util.Format.date(start_dt, 'd.m.Y');
                               end_dt = Ext.util.Format.date(end_dt, 'd.m.Y');
                                
                                
                                
                                // Ext.MessageBox.alert('Звонки','Данные '+ start_dt+' '+end_dt);
                                RekCallsStore.reload({params: {dep_id:dep_id, start_dt:start_dt, end_dt:end_dt}});

                              }
                            }, {
                                text: 'Отмена',
                                handler: function(){
                                    
                                    RangeWin5.items.itemAt(0).items.itemAt(0).setValue('');
                                    RangeWin5.items.itemAt(0).items.itemAt(1).setValue('');
                                   
                                    RangeWin5.hide();}
                            }]
              })
    });
    ////
    
     // load the store at the latest possible moment
     var gridCombo = function(dep_id){
          RekCallsStore.reload({params: {dep_id:dep_id}});
     }
        
        
        
   } // eo function initComponent

});
Ext.reg('reksourcecallsgrid', charts.RekSourceCallsGrid);



//}}}

function title_result(val, x, store){
         var res='';
           res='<b>'+val+'</b>';
          return res;
        }


 depcalls_reksource = new xg.ColumnModel( [

                  {
                    header: 'Источник рекламы',
                    readOnly: true,
                    dataIndex: 'rek_name',
                    width: 170,
                    sortable: true,
                    hidden: false
                  }

                  ,{
                    header: 'Загородная',
                    readOnly: true,
                    dataIndex: 'dep_zag',
                    width: 100,
                    sortable: true,
                    hidden: false,
                    summaryType: 'sum'
                  }
                  ,
                  {header: 'Коммерческая',
                    dataIndex: 'dep_off',
                    sortable: true
                    ,width: 70
                    ,summaryType: 'sum'
                   }
                  ,{
                    header: 'Элитная',
                    readOnly: true,
                    dataIndex: 'dep_ellite', // this is where the mapped name is important!
                    width: 70,
                    sortable: true,
                      hidden: false
                     ,summaryType: 'sum' 
                  }
                  ,{
                    header: 'Всего',
                    readOnly: true,
                    dataIndex: 'tot', // this is where the mapped name is important!
                    width: 70,
                    renderer:title_result
                    ,sortable: true,
                      hidden: false
                      ,summaryType: 'sum'
                  }
                  

]);


