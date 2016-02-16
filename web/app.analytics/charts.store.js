/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */



 var AnalyticsChartStore = new Ext.data.JsonStore({
        root: 'results',
        baseParams: {P_DEPID: 5},
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
 //ChartStore.load();
 
 
 
 
 var SuburbanCallsStore = new Ext.data.JsonStore({
        root: 'results',
        baseParams: {P_DEPID: 6},
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
 SuburbanCallsStore.load();
 
 
 
 var CommercialCallsStore = new Ext.data.JsonStore({
        root: 'results',
        baseParams: {P_DEPID: 5},
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
 CommercialCallsStore.load();
 
 var LuxuryCallsStore = new Ext.data.JsonStore({
        root: 'results',
        baseParams: {P_DEPID: 11},
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
 LuxuryCallsStore.load();
 
 
 
 var RekCallsStore = new Ext.data.JsonStore({
        root: 'results',
        
        fields: [
                {name: 'rek_name', mapping:'rek_name', type: 'string'},
                {name: 'dep_off', mapping:'dep_off', type: 'int'},
                {name: 'dep_zag', mapping:'dep_zag', type: 'int'},
                {name: 'dep_ellite', mapping:'dep_ellite', type: 'int'},
                {name: 'tot', mapping:'tot', type: 'int'}
        ],
        proxy: new Ext.data.ScriptTagProxy({
            url: '../stores/charts/calls/get_chart_rek_dep.jsp'
        })
    });
 RekCallsStore.load();
 
//
//var BrokerChartStore = new Ext.data.JsonStore({
//        root: 'results',
//        baseParams: {P_USERID: gUserId},
//        fields: [
//                {name: 'state', mapping:'state', type: 'string'},
//                {name: 'c', mapping:'c', type: 'string'}
//        ],
//        proxy: new Ext.data.ScriptTagProxy({
//            url: '../stores/charts/calls/get_chart_data.jsp'
//        })
//    });
//
//     BrokerChartStore.load();
     
     