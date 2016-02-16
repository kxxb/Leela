/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

Ext.ns("app");


var app_store_all = new Ext.data.JsonStore({
        root: 'results',
        totalProperty: 'totalCount',
        idProperty: 'id',
        baseParams: {mode: 'AllRequests',user_id : gUserId
                    },

        fields: [
                {name: 'reqid', mapping:'reqid', type: 'int'},
                {name: 'request_text', mapping:'request_text', type: 'string'},
                {name: 'applicant_id', mapping:'applicant_id', type: 'string'},
                {name: 'apl_user_name', mapping:'apl_user_name', type: 'string'},
                {name: 'apl_dep', mapping:'apl_dep', type: 'string'},
                {name: 'resp_user_name', mapping:'resp_user_name', type: 'string'},

                {name: 'resp_dep',mapping:'resp_dep', type: 'string'},
                {name: 'responsibly_department_id', mapping:'responsibly_department_id', type: 'string'},
                {name: 'dt_create', mapping:'dt_create', type: 'date', dateFormat: 'd/m/Y H:i'},

                {name: 'dt_execute', mapping:'dt_execute', type: 'date', dateFormat: 'd/m/Y'},
                {name: 'Status', mapping:'Status', type: 'int'},
                {name: 'Status_Name', mapping:'Status_Name', type: 'string'},
                {name: 'Tl_Contract_Template_Id', mapping:'Tl_Contract_Template_Id', type: 'string'},

                {name: 'Contract_Number', mapping:'Contract_Number', type: 'string'},
                {name: 'Contract_Date', mapping:'Contract_Date', type: 'date', dateFormat: 'd/m/Y'},
                {name: 'Contacrt_Return_Date',mapping:'Contacrt_Return_Date', type: 'date', dateFormat: 'd/m/Y'},
                {name: 'Obj',mapping:'Obj', type: 'string'},
                {name: 'Client', mapping:'Client',type: 'string'},
                {name: 'Cl_Email', mapping:'Cl_Email',type: 'string'},
                {name: 'Cost_Of_Service',mapping:'Cost_Of_Service', type: 'string'},
                {name: 'Contragent',mapping:'Contragent', type: 'string'},
                {name: 'Contract',mapping:'Contract', type: 'string'},
                {name: 'CONTR',mapping:'CONTR', type: 'string'},
                {name: 'responsibly_id',mapping:'responsibly_id', type: 'int'},
                {name: 'request_control',mapping:'request_control', type: 'string'},
                {name: 'apl_user_email',mapping:'apl_user_email', type: 'string'},
                {name: 'apl_user_cellular',mapping:'apl_user_cellular', type: 'string'},
                {name: 'apl_user_internal',mapping:'apl_user_internal', type: 'string'},
                {name: 'apl_user_work_position',mapping:'apl_user_work_position', type: 'string'}



        ],

        // load using script tags for cross domain, if the data in on the same domain as
        // this page, an HttpProxy would be better
        proxy: new Ext.data.ScriptTagProxy({
            url: '../stores/req/grid/GetReqGrid.jsp'
        })
    });


 var app_store_forme = new Ext.data.JsonStore({
        root: 'results',
        totalProperty: 'totalCount',
        idProperty: 'id',
        baseParams: {mode: 'ForMeRequests'
                     ,user_id : gUserId
                    },

        fields: [
                {name: 'reqid', mapping:'reqid', type: 'int'},
                {name: 'request_text', mapping:'request_text', type: 'string'},
                {name: 'applicant_id', mapping:'applicant_id', type: 'string'},
                {name: 'apl_user_name', mapping:'apl_user_name', type: 'string'},
                {name: 'apl_dep', mapping:'apl_dep', type: 'string'},
                {name: 'resp_user_name', mapping:'resp_user_name', type: 'string'},

                {name: 'resp_dep',mapping:'resp_dep', type: 'string'},
                {name: 'responsibly_department_id', mapping:'responsibly_department_id', type: 'string'},
                {name: 'dt_create', mapping:'dt_create', type: 'date', dateFormat: 'd/m/Y H:i'},

                {name: 'dt_execute', mapping:'dt_execute', type: 'date', dateFormat: 'd/m/Y'},
                {name: 'Status', mapping:'Status', type: 'int'},
                {name: 'Status_Name', mapping:'Status_Name', type: 'string'},
                {name: 'Tl_Contract_Template_Id', mapping:'Tl_Contract_Template_Id', type: 'string'},

                {name: 'Contract_Number', mapping:'Contract_Number', type: 'string'},
                {name: 'Contract_Date', mapping:'Contract_Date', type: 'date', dateFormat: 'd/m/Y'},
                {name: 'Contacrt_Return_Date',mapping:'Contacrt_Return_Date', type: 'date', dateFormat: 'd/m/Y'},
                {name: 'Obj',mapping:'Obj', type: 'string'},
                {name: 'Client', mapping:'Client',type: 'string'},
                {name: 'Cl_Email', mapping:'Cl_Email',type: 'string'},
                {name: 'Cost_Of_Service',mapping:'Cost_Of_Service', type: 'string'},
                {name: 'Contragent',mapping:'Contragent', type: 'string'},
                {name: 'Contract',mapping:'Contract', type: 'string'},
                {name: 'CONTR',mapping:'CONTR', type: 'string'},
                {name: 'responsibly_id',mapping:'responsibly_id', type: 'int'},
                {name: 'request_control',mapping:'request_control', type: 'string'},
                {name: 'apl_user_email',mapping:'apl_user_email', type: 'string'},
                {name: 'apl_user_cellular',mapping:'apl_user_cellular', type: 'string'},
                {name: 'apl_user_internal',mapping:'apl_user_internal', type: 'string'},
                {name: 'apl_user_work_position',mapping:'apl_user_work_position', type: 'string'}



        ],

        // load using script tags for cross domain, if the data in on the same domain as
        // this page, an HttpProxy would be better
        proxy: new Ext.data.ScriptTagProxy({
            url: '../stores/req/grid/GetReqGrid.jsp'
        })
    });


var app_store_my_it = new Ext.data.JsonStore({
        root: 'results',
        totalProperty: 'totalCount',
        idProperty: 'id',
        baseParams: {mode: 'MyRequests',user_id : gUserId,dep_id : 1
                    },

        fields: [
                {name: 'reqid', mapping:'reqid', type: 'int'},
                {name: 'request_text', mapping:'request_text', type: 'string'},
                {name: 'applicant_id', mapping:'applicant_id', type: 'string'},
                {name: 'apl_user_name', mapping:'apl_user_name', type: 'string'},
                {name: 'apl_dep', mapping:'apl_dep', type: 'string'},
                {name: 'resp_user_name', mapping:'resp_user_name', type: 'string'},

                {name: 'resp_dep',mapping:'resp_dep', type: 'string'},
                {name: 'responsibly_department_id', mapping:'responsibly_department_id', type: 'string'},
                {name: 'dt_create', mapping:'dt_create', type: 'date', dateFormat: 'd/m/Y H:i'},

                {name: 'dt_execute', mapping:'dt_execute', type: 'date', dateFormat: 'd/m/Y'},
                {name: 'Status', mapping:'Status', type: 'int'},
                {name: 'Status_Name', mapping:'Status_Name', type: 'string'},
                {name: 'Tl_Contract_Template_Id', mapping:'Tl_Contract_Template_Id', type: 'string'},

                {name: 'Contract_Number', mapping:'Contract_Number', type: 'string'},
                {name: 'Contract_Date', mapping:'Contract_Date', type: 'date', dateFormat: 'd/m/Y'},
                {name: 'Contacrt_Return_Date',mapping:'Contacrt_Return_Date', type: 'date', dateFormat: 'd/m/Y'},
                {name: 'Obj',mapping:'Obj', type: 'string'},
                {name: 'Client', mapping:'Client',type: 'string'},
                {name: 'Cl_Email', mapping:'Cl_Email',type: 'string'},
                {name: 'Cost_Of_Service',mapping:'Cost_Of_Service', type: 'string'},
                {name: 'Contragent',mapping:'Contragent', type: 'string'},
                {name: 'Contract',mapping:'Contract', type: 'string'},

                {name: 'responsibly_id',mapping:'responsibly_id', type: 'int'},
                {name: 'request_control',mapping:'request_control', type: 'string'},
                {name: 'apl_user_email',mapping:'apl_user_email', type: 'string'},
                {name: 'apl_user_cellular',mapping:'apl_user_cellular', type: 'string'},
                {name: 'apl_user_internal',mapping:'apl_user_internal', type: 'string'},
                {name: 'apl_user_work_position',mapping:'apl_user_work_position', type: 'string'}



        ],

        // load using script tags for cross domain, if the data in on the same domain as
        // this page, an HttpProxy would be better
        proxy: new Ext.data.ScriptTagProxy({
            url: '../stores/req/grid/GetReqGrid.jsp'
        })
    });

var app_store_my_pr = new Ext.data.JsonStore({
        root: 'results',
        totalProperty: 'totalCount',
        idProperty: 'id',
        baseParams: {mode: 'MyRequests'
                    ,user_id : gUserId
                     ,dep_id:3
                    },

        fields: [
                {name: 'reqid', mapping:'reqid', type: 'int'},
                {name: 'request_text', mapping:'request_text', type: 'string'},
                {name: 'applicant_id', mapping:'applicant_id', type: 'string'},
                {name: 'apl_user_name', mapping:'apl_user_name', type: 'string'},
                {name: 'apl_dep', mapping:'apl_dep', type: 'string'},
                {name: 'resp_user_name', mapping:'resp_user_name', type: 'string'},

                {name: 'resp_dep',mapping:'resp_dep', type: 'string'},
                {name: 'responsibly_department_id', mapping:'responsibly_department_id', type: 'string'},
                {name: 'dt_create', mapping:'dt_create', type: 'date', dateFormat: 'd/m/Y H:i'},

                {name: 'dt_execute', mapping:'dt_execute', type: 'date', dateFormat: 'd/m/Y'},
                {name: 'Status', mapping:'Status', type: 'int'},
                {name: 'Status_Name', mapping:'Status_Name', type: 'string'},
                {name: 'Tl_Contract_Template_Id', mapping:'Tl_Contract_Template_Id', type: 'string'},

                {name: 'Contract_Number', mapping:'Contract_Number', type: 'string'},
                {name: 'Contract_Date', mapping:'Contract_Date', type: 'date', dateFormat: 'd/m/Y'},
                {name: 'Contacrt_Return_Date',mapping:'Contacrt_Return_Date', type: 'date', dateFormat: 'd/m/Y'},
                {name: 'Obj',mapping:'Obj', type: 'string'},
                {name: 'Client', mapping:'Client',type: 'string'},
                {name: 'Cl_Email', mapping:'Cl_Email',type: 'string'},
                {name: 'Cost_Of_Service',mapping:'Cost_Of_Service', type: 'string'},
                {name: 'Contragent',mapping:'Contragent', type: 'string'},
                {name: 'Contract',mapping:'Contract', type: 'string'},

                {name: 'responsibly_id',mapping:'responsibly_id', type: 'int'},
                {name: 'request_control',mapping:'request_control', type: 'string'},
                {name: 'apl_user_email',mapping:'apl_user_email', type: 'string'},
                {name: 'apl_user_cellular',mapping:'apl_user_cellular', type: 'string'},
                {name: 'apl_user_internal',mapping:'apl_user_internal', type: 'string'},
                {name: 'apl_user_work_position',mapping:'apl_user_work_position', type: 'string'}



        ],

        // load using script tags for cross domain, if the data in on the same domain as
        // this page, an HttpProxy would be better
        proxy: new Ext.data.ScriptTagProxy({
            url: '../stores/req/grid/GetReqGrid.jsp'
        })
    });


var app_store_my_ur = new Ext.data.JsonStore({
        root: 'results',
        totalProperty: 'totalCount',
        idProperty: 'id',
        baseParams: {mode: 'MyRequests'
                    ,user_id : gUserId
                     ,dep_id : 2
                    },

        fields: [
                {name: 'reqid', mapping:'reqid', type: 'int'},
                {name: 'request_text', mapping:'request_text', type: 'string'},
                {name: 'applicant_id', mapping:'applicant_id', type: 'string'},
                {name: 'apl_user_name', mapping:'apl_user_name', type: 'string'},
                {name: 'apl_dep', mapping:'apl_dep', type: 'string'},
                {name: 'resp_user_name', mapping:'resp_user_name', type: 'string'},

                {name: 'resp_dep',mapping:'resp_dep', type: 'string'},
                {name: 'responsibly_department_id', mapping:'responsibly_department_id', type: 'string'},
                {name: 'dt_create', mapping:'dt_create', type: 'date', dateFormat: 'd/m/Y H:i'},

                {name: 'dt_execute', mapping:'dt_execute', type: 'date', dateFormat: 'd/m/Y'},
                {name: 'Status', mapping:'Status', type: 'int'},
                {name: 'Status_Name', mapping:'Status_Name', type: 'string'},
                {name: 'Tl_Contract_Template_Id', mapping:'Tl_Contract_Template_Id', type: 'string'},

                {name: 'Contract_Number', mapping:'Contract_Number', type: 'string'},
                {name: 'Contract_Date', mapping:'Contract_Date', type: 'date', dateFormat: 'd/m/Y'},
                {name: 'Contacrt_Return_Date',mapping:'Contacrt_Return_Date', type: 'date', dateFormat: 'd/m/Y'},
                {name: 'Obj',mapping:'Obj', type: 'string'},
                {name: 'Client', mapping:'Client',type: 'string'},
                {name: 'Cl_Email', mapping:'Cl_Email',type: 'string'},
                {name: 'Cost_Of_Service',mapping:'Cost_Of_Service', type: 'string'},
                {name: 'Contragent',mapping:'Contragent', type: 'string'},
                {name: 'Contract',mapping:'Contract', type: 'string'},
                {name: 'CONTR',mapping:'CONTR', type: 'string'},
                {name: 'responsibly_id',mapping:'responsibly_id', type: 'int'},
                {name: 'request_control',mapping:'request_control', type: 'string'},
                {name: 'apl_user_email',mapping:'apl_user_email', type: 'string'},
                {name: 'apl_user_cellular',mapping:'apl_user_cellular', type: 'string'},
                {name: 'apl_user_internal',mapping:'apl_user_internal', type: 'string'},
                {name: 'apl_user_work_position',mapping:'apl_user_work_position', type: 'string'}

        ],

        // load using script tags for cross domain, if the data in on the same domain as
        // this page, an HttpProxy would be better
        proxy: new Ext.data.ScriptTagProxy({
            url: '../stores/req/grid/GetReqGrid.jsp'
        })
    });



var storeAllDepRequests_Secr = new Ext.data.GroupingStore({
        proxy: new Ext.data.ScriptTagProxy({
            url: '../stores/req/grid/GetReqGrid.jsp'
        }),
        groupField: 'resp_dep',
        baseParams: {mode: 'allDepRequests_Secr'
                     ,dep_id : gUserDepId
                    },
        reader: new Ext.data.ArrayReader({
            root: 'results',
            totalProperty: 'totalCount',
            idProperty: 'reqid',


            fields: [
                    {name: 'reqid', mapping:'reqid', type: 'int'},
                    {name: 'request_text', mapping:'request_text', type: 'string'},
                    {name: 'applicant_id', mapping:'applicant_id', type: 'string'},
                    {name: 'apl_user_name', mapping:'apl_user_name', type: 'string'},
                    {name: 'apl_dep', mapping:'apl_dep', type: 'string'},
                    {name: 'resp_user_name', mapping:'resp_user_name', type: 'string'},

                    {name: 'resp_dep',mapping:'resp_dep', type: 'string'},
                    {name: 'responsibly_department_id', mapping:'responsibly_department_id', type: 'string'},
                    {name: 'dt_create', mapping:'dt_create', type: 'date', dateFormat: 'd/m/Y H:i'},

                    {name: 'dt_execute', mapping:'dt_execute', type: 'date', dateFormat: 'd/m/Y'},
                    {name: 'Status', mapping:'Status', type: 'int'},
                    {name: 'Status_Name', mapping:'Status_Name', type: 'string'},
                    {name: 'Tl_Contract_Template_Id', mapping:'Tl_Contract_Template_Id', type: 'string'},

                    {name: 'Contract_Number', mapping:'Contract_Number', type: 'string'},
                    {name: 'Contract_Date', mapping:'Contract_Date', type: 'date', dateFormat: 'd/m/Y'},
                    {name: 'Contacrt_Return_Date',mapping:'Contacrt_Return_Date', type: 'date', dateFormat: 'd/m/Y'},
                    {name: 'Obj',mapping:'Obj', type: 'string'},
                    {name: 'Client', mapping:'Client',type: 'string'},
                    {name: 'Cl_Email', mapping:'Cl_Email',type: 'string'},
                    {name: 'Cost_Of_Service',mapping:'Cost_Of_Service', type: 'string'},
                    {name: 'Contragent',mapping:'Contragent', type: 'string'},
                    {name: 'Contract',mapping:'Contract', type: 'string'},
                    {name: 'CONTR',mapping:'CONTR', type: 'string'},
                    {name: 'responsibly_id',mapping:'responsibly_id', type: 'int'},
                    {name: 'request_control',mapping:'request_control', type: 'string'},
                    {name: 'apl_user_email',mapping:'apl_user_email', type: 'string'},
                    {name: 'apl_user_cellular',mapping:'apl_user_cellular', type: 'string'},
                    {name: 'apl_user_internal',mapping:'apl_user_internal', type: 'string'},
                    {name: 'apl_user_work_position',mapping:'apl_user_work_position', type: 'string'}



            ]})


    });


var storeAllDepRequests = new Ext.data.GroupingStore({
        proxy: new Ext.data.ScriptTagProxy({
            url: '../stores/req/grid/GetReqGrid.jsp'
        }),
        groupField: 'resp_dep',
        baseParams: {mode: 'AllDepRequests'
                     //,dep_id : gUserDepId
                    },
        reader: new Ext.data.ArrayReader({
            root: 'results',
            totalProperty: 'totalCount',
            idProperty: 'reqid',


            fields: [
                    {name: 'reqid', mapping:'reqid', type: 'int'},
                    {name: 'request_text', mapping:'request_text', type: 'string'},
                    {name: 'applicant_id', mapping:'applicant_id', type: 'string'},
                    {name: 'apl_user_name', mapping:'apl_user_name', type: 'string'},
                    {name: 'apl_dep', mapping:'apl_dep', type: 'string'},
                    {name: 'resp_user_name', mapping:'resp_user_name', type: 'string'},

                    {name: 'resp_dep',mapping:'resp_dep', type: 'string'},
                    {name: 'responsibly_department_id', mapping:'responsibly_department_id', type: 'string'},
                    {name: 'dt_create', mapping:'dt_create', type: 'date', dateFormat: 'd/m/Y H:i'},

                    {name: 'dt_execute', mapping:'dt_execute', type: 'date', dateFormat: 'd/m/Y'},
                    {name: 'Status', mapping:'Status', type: 'int'},
                    {name: 'Status_Name', mapping:'Status_Name', type: 'string'},
                    {name: 'Tl_Contract_Template_Id', mapping:'Tl_Contract_Template_Id', type: 'string'},

                    {name: 'Contract_Number', mapping:'Contract_Number', type: 'string'},
                    {name: 'Contract_Date', mapping:'Contract_Date', type: 'date', dateFormat: 'd/m/Y'},
                    {name: 'Contacrt_Return_Date',mapping:'Contacrt_Return_Date', type: 'date', dateFormat: 'd/m/Y'},
                    {name: 'Obj',mapping:'Obj', type: 'string'},
                    {name: 'Client', mapping:'Client',type: 'string'},
                    {name: 'Cl_Email', mapping:'Cl_Email',type: 'string'},
                    {name: 'Cost_Of_Service',mapping:'Cost_Of_Service', type: 'string'},
                    {name: 'Contragent',mapping:'Contragent', type: 'string'},
                    {name: 'Contract',mapping:'Contract', type: 'string'},
                    {name: 'CONTR',mapping:'CONTR', type: 'string'},
                    {name: 'responsibly_id',mapping:'responsibly_id', type: 'int'},
                    {name: 'request_control',mapping:'request_control', type: 'string'},
                    {name: 'apl_user_email',mapping:'apl_user_email', type: 'string'},
                    {name: 'apl_user_cellular',mapping:'apl_user_cellular', type: 'string'},
                    {name: 'apl_user_internal',mapping:'apl_user_internal', type: 'string'},
                    {name: 'apl_user_work_position',mapping:'apl_user_work_position', type: 'string'}



            ]})


    });

app_responsibleStore = new Ext.data.JsonStore({
        root: 'results'
        
        ,fields: [
                {name: 'responsibly_id', mapping:'responsibly_id', type: 'int'},
                {name: 'resp_user_name', mapping:'resp_user_name', type: 'string'}
        ],
        proxy: new Ext.data.ScriptTagProxy({
            url: '../stores/req/helper/getter_responsible.jsp?user_id='+gUserId
            //url: '../stores/req/helper/getter_responsible.jsp'
        })
        });


 app_dsReqTypeIT = new Ext.data.JsonStore({
        root: 'results',
        fields: [
                {name: 'id', mapping:'id', type: 'string'},
                {name: 'type_name', mapping:'type_name', type: 'string'},
                {name: 'type_desc', mapping:'type_desc', type: 'string'}
        ],
        proxy: new Ext.data.ScriptTagProxy({
            url: '../frm/req/CreateRequest/getReqType.jsp?dep_id=1'
        })
    });
   app_dsReqTypeIT.load();



 app_dsReqType = new Ext.data.JsonStore({
        root: 'results',
        fields: [
                {name: 'id', mapping:'id', type: 'string'},
                {name: 'type_name', mapping:'type_name', type: 'string'},
                {name: 'type_desc', mapping:'type_desc', type: 'string'}
        ],
        proxy: new Ext.data.ScriptTagProxy({
            //url: '../frm/req/CreateRequest/getReqType.jsp?dep_id=3'
            url: '../frm/req/CreateRequest/getReqType.jsp'
        })
    });
 //app_dsReqTypePR.load();


app_dsReqTypeUR = new Ext.data.JsonStore({
        root: 'results',
        fields: [
                {name: 'id', mapping:'id', type: 'string'},
                {name: 'type_name', mapping:'type_name', type: 'string'},
                {name: 'type_desc', mapping:'type_desc', type: 'string'}
        ],
        proxy: new Ext.data.ScriptTagProxy({
            url: '../frm/req/CreateRequest/getReqType.jsp?dep_id=2'
        })
    });
 app_dsReqTypeUR.load();

/*Статус заявки*/
 app_ReqStatusStore = new Ext.data.JsonStore({
        root: 'results',
        fields: [
                {name: 'Status', mapping:'Status', type: 'string'},
                {name: 'Status_Name', mapping:'Status_Name', type: 'string'}
        ],
        proxy: new Ext.data.ScriptTagProxy({
            url: '../stores/req/helper/ReqStatusStore.jsp'
        })
    });
    app_ReqStatusStore.load();





    app_dsContractType = new Ext.data.JsonStore({
        root: 'results',
        fields: [
                {name: 'id', mapping:'id', type: 'string'},
                {name: 'template_name', mapping:'template_name', type: 'string'}
        ],
        proxy: new Ext.data.ScriptTagProxy({
            url: '../frm/req/CreateRequest/getContractType.jsp'
        })
    });


    app_dsObjects = new Ext.data.Store({

        proxy: new Ext.data.ScriptTagProxy({
            url: '../frm/req/CreateRequest/getObjects.jsp'

        }),
        reader: new Ext.data.JsonReader({
            root: 'results',
            totalProperty: 'totalCount',
            id: 'id'
        }, [
            {name: 'id', mapping: 'id'},
            {name: 'name', mapping: 'name'},
            {name: 'object_addres', mapping: 'object_addres'}
        ])
    });


    app_dsClients = new Ext.data.Store({
        proxy: new Ext.data.ScriptTagProxy({
            url: '../frm/req/CreateRequest/getClients.jsp'
        }),
        reader: new Ext.data.JsonReader({
            root: 'results',
            totalProperty: 'totalCount',
            id: 'id'
        }, [
            {name: 'id', mapping: 'id'},
            {name: 'client_name', mapping: 'client_name'},
            {name: 'email', mapping: 'email'},
            {name: 'addres', mapping: 'addres'}
        ])
    });

