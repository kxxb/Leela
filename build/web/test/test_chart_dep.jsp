<%-- 
    Document   : test_chart
    Created on : 14.10.2011, 13:23:23
    Author     : kxxb
--%>

<%@page contentType="text/html" pageEncoding="UTF-8"%>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN"
   "http://www.w3.org/TR/html4/loose.dtd">

<html>
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
        <title>Отдел</title>

        <!-- ** CSS ** -->
        <!-- base library -->

        <link rel="stylesheet" type="text/css" href="../js/ext-3.2.1/resources/css/ext-all.css" />
        <link rel="stylesheet" type="text/css" href="../js/ext-3.2.1/resources/shared/icons/silk.css" />
        <link rel="stylesheet" type="text/css" href="LeelaStyle.css" />


        <!-- ** Javascript ** -->
        <!-- base library -->


        <script type="text/javascript" src="../js/ext-3.2.1/adapter/ext/ext-base.js"></script>
        <script type="text/javascript" src="../js/ext-3.2.1/ext-all-debug-w-comments.js"></script>


        <!-- My extensions -->
        
    </head>
    <body>


<script language="javascript" >
            Ext.chart.Chart.CHART_URL = '../js/ext-3.2.1/resources/charts.swf';

Ext.onReady(function(){

    var ChartStore = new Ext.data.JsonStore({
        root: 'results',
        fields: [
                {name: 'br_name', mapping:'br_name', type: 'string'},
                {name: 'Not_Proced', mapping:'Not_Proced', type: 'int'},
                {name: 'Active', mapping:'Active', type: 'int'},
                {name: 'Passive', mapping:'Passive', type: 'int'},
                {name: 'Total', mapping:'Total', type: 'string'},
                {name: 'Not_Proced_t', mapping:'Not_Proced_t', type: 'string'},
                {name: 'Active_t', mapping:'Active_t', type: 'string'},
                {name: 'Passive_t', mapping:'Passive_t', type: 'string'},
                {name: 'Total_t', mapping:'Total_t', type: 'string'}
        ],
        proxy: new Ext.data.ScriptTagProxy({
            url: '../stores/charts/calls/get_chart_dep.jsp'
        })
    });

     ChartStore.load();



     new Ext.Panel({
        width: 600,
        height: 600,
        renderTo: 'container',
        //title: 'Stacked Bar Chart - Movie Takings by Genre',
        items: {
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
        }
    });
    
   var p2 =  new Ext.Panel({
        title: 'XTemplate',
        width: 300,
        height: 300,
        items : dataview,

        renderTo: 'tab_con'
    });
    
      var dataview = new Ext.DataView({
        store: ChartStore,
        tpl  : new Ext.XTemplate(
            '<tpl for="br_name" >',
              '<tpl ><p>{br_name} | {Not_Proced} | {Active} |{Passive} </p></tpl>',
              '</tpl></p>',
             '<p><b>Всего | {Not_Proced_t} | {Active_t} |{Passive_t} </b></p>'
        ),
        
        id: 'results',
        
        autoScroll  : true
    });
    
});
        </script>


<div id="container">
</div>

 <div id="tab_con">
</div>

    </body>
</html>
