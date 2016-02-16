/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */


Ext.ns("app");

var xg = Ext.grid;


//Ext.ux.GroupTabPanel.superclass.initComponent.call(this);
app.ClientsGrid =  Ext.extend(xg.EditorGridPanel,{
    initComponent: function(){
        var config_broker ={
                 store:app_store_broker_clients
                ,cm:Clients_cm

                ,height : 445
                ,view: new Ext.grid.GroupingView({
                    forceFit:true,
                    groupTextTpl: '{text} ({[values.rs.length]} {[values.rs.length > 1 ? "Сотрудников" : "Сотрудник"]})'
                })
                
                ,loadMask:true

             ,split: true
            };

       var config_dep ={
                 store:app_store_dep_clients
                ,cm:Clients_cm

                ,height : 445
                ,view: new Ext.grid.GroupingView({
                    forceFit:true,
                    groupTextTpl: '<b>{text}</b> ({[values.rs.length]} {[values.rs.length > 1 ? "Сотрудников" : "Сотрудник"]})'
                })

                ,loadMask:true

             ,split: true
            };



        if (gUserId == 49 | gUserId == 131 | gUserId == 142 | gUserId == 279 | gUserId == 17)  {
            /*начальники секретари
                 *(49, 131, 142)
                 *(279,17)
                 **/
            // apply config
            Ext.apply(this, Ext.apply(this.initialConfig, config_dep));
        } else {
            Ext.apply(this, Ext.apply(this.initialConfig, config_broker));
        }


        // apply config
    


    var gridAddBt = function(){
            /*Запускаю своё событие, от кнопки с тулбара*/
         this.fireEvent('addTbClick');
    }
    gridAddBt = gridAddBt.createDelegate(this);
    app.ClientsGrid.superclass.initComponent.apply(this, arguments);

// load the store at the latest possible moment
        this.on({
            afterlayout:{
                scope:this,
                single:true,
                fn:function() {
                    this.store.load({
                        params:{
                             start:0
                            ,limit:250
                        }
                    });
               }
        }
    });

    
    
   } // eo function initComponent

});
Ext.reg('clientsgrid', app.ClientsGrid);

//}}}


var Clients_cm = new xg.ColumnModel( [

                    {
                    header: '#',
                    dataIndex: 'CLIENT_ID',
                    sortable: true,
                    width: 25
                  }
                    ,{
                    header: 'ФИО',
                    readOnly: true,
                    dataIndex: 'CLIENT_NAME', // this is where the mapped name is important!
                    width: 75,
                    sortable: true,
                      hidden: false
                  },{
                    header: 'Мобильный',
                    readOnly: true,
                    dataIndex: 'TEL_CELLULAR', // this is where the mapped name is important!
                    width: 75,
                    sortable: true,
                      hidden: false
                  },{
                    header: 'Email',
                    readOnly: true,
                    dataIndex: 'EMAIL', // this is where the mapped name is important!
                    width: 75,
                    sortable: true,
                      hidden: false
                  },{
                    header: 'Организация',
                    readOnly: true,
                    dataIndex: 'org_name', // this is where the mapped name is important!
                    width: 75,
                    sortable: true,
                      hidden:  true
                  }


                  
                  

]);


app_store_broker_clients = new Ext.data.GroupingStore({
        
        groupField:'org_name',
        baseParams: {user_id: gUserId
                    ,Dep_id: gUserDepId
                    ,mode: 'broker_clients'
                    ,TEL_CELLULAR :'998989'
                    ,TEL_STAT:'998989'

        },
        reader: new Ext.data.ArrayReader({
            root: 'results',
            totalProperty: 'totalCount',
            idProperty: 'CLIENT_ID',

        fields: [
                {name: 'CLIENT_ID', mapping:'CLIENT_ID', type: 'int'},
                {name: 'CLIENT_NAME', mapping:'CLIENT_NAME', type: 'string'},
                {name: 'TEL_CELLULAR', mapping:'TEL_CELLULAR', type: 'string'},
                {name: 'TEL_STAT', mapping:'TEL_STAT', type: 'string'},
                {name: 'EMAIL', mapping:'EMAIL', type: 'string'},
                {name: 'IS_SUBSCRIBE', mapping:'IS_SUBSCRIBE', type: 'string'},
                {name: 'crm_client_s_organization_id', mapping:'crm_client_s_organization_id', type: 'string'},
                {name: 'org_name', mapping:'org_name', type: 'string'},
                {name: 'job_title', mapping:'job_title', type: 'string'},
                {name: 'client_description', mapping:'client_description', type: 'string'},
                {name: 'last_user_id', mapping:'last_user_id', type: 'string'},
                {name: 'broker_name', mapping:'broker_name', type: 'string'}
        ]}),

        // load using script tags for cross domain, if the data in on the same domain as
        // this page, an HttpProxy would be better
        proxy: new Ext.data.ScriptTagProxy({
            url: '../stores/clients/grid/GetClients.jsp'
        })
    });

    app_store_dep_clients = new Ext.data.GroupingStore({

        groupField:'org_name',
        baseParams: {user_id: gUserId
                    ,Dep_id: gUserDepId
                    ,mode: 'dep_clients'
                    ,TEL_CELLULAR :'998989'
                    ,TEL_STAT:'998989'

        },
        reader: new Ext.data.ArrayReader({
            root: 'results',
            totalProperty: 'totalCount',
            idProperty: 'CLIENT_ID',

        fields: [
                {name: 'CLIENT_ID', mapping:'CLIENT_ID', type: 'int'},
                {name: 'CLIENT_NAME', mapping:'CLIENT_NAME', type: 'string'},
                {name: 'TEL_CELLULAR', mapping:'TEL_CELLULAR', type: 'string'},
                {name: 'TEL_STAT', mapping:'TEL_STAT', type: 'string'},
                {name: 'EMAIL', mapping:'EMAIL', type: 'string'},
                {name: 'IS_SUBSCRIBE', mapping:'IS_SUBSCRIBE', type: 'string'},
                {name: 'crm_client_s_organization_id', mapping:'crm_client_s_organization_id', type: 'string'},
                {name: 'org_name', mapping:'org_name', type: 'string'},
                {name: 'job_title', mapping:'job_title', type: 'string'},
                {name: 'client_description', mapping:'client_description', type: 'string'},
                {name: 'last_user_id', mapping:'last_user_id', type: 'string'},
                {name: 'broker_name', mapping:'broker_name', type: 'string'}
        ]}),

        // load using script tags for cross domain, if the data in on the same domain as
        // this page, an HttpProxy would be better
        proxy: new Ext.data.ScriptTagProxy({
            url: '../stores/clients/grid/GetClients.jsp'
        })
    });