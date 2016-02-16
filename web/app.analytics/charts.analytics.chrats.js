/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
Ext.ns("charts");
Ext.chart.Chart.CHART_URL = '../js/ext-3.2.1/resources/charts.swf';
var xg = Ext.grid;

charts.AllDepCallsChartPan =  Ext.extend(
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
            charts.AllDepCallsChartPan.superclass.initComponent.apply(this, arguments);

   } // eo function initComponent

});
Ext.reg('alldepcallschartpan', charts.AllDepCallsChartPan);


charts.BrokerCallsChartPan =  Ext.extend(
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
            charts.AllDepCallsChartPan.superclass.initComponent.apply(this, arguments);

   } // eo function initComponent

});
Ext.reg('brokercallschartpan', charts.BrokerCallsChartPan);





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


