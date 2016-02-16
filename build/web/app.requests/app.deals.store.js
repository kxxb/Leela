/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

Ext.ns("app");

var deals_all = new Ext.data.JsonStore({
        root: 'results',
        totalProperty: 'totalCount',
        idProperty: 'id',
        baseParams: {mode: 'AllDeals'},

        fields: [
                {name: 'deal_id', mapping:'deal_id', type: 'int'},
                {name: 'Date_Open', mapping:'Date_Open', type: 'string'},
                {name: 'Date_Close', mapping:'Date_Close', type: 'string'},
                {name: 'Addres', mapping:'Addres', type: 'string'},
                {name: 'Broker_Dep', mapping:'Broker_Dep', type: 'string'},
                {name: 'Broker_Sobstv', mapping:'Broker_Sobstv', type: 'string'},
                {name: 'Broker_Client', mapping:'Broker_Client', type: 'string'},


                {name: 'User_Dep',mapping:'User_Dep', type: 'string'},
                {name: 'User_Name', mapping:'User_Name', type: 'string'},

                {name: 'Sdelka', mapping:'Sdelka', type: 'string'},
                {name: 'Is_Close', mapping:'Is_Close', type: 'string'}

        ],

        proxy: new Ext.data.ScriptTagProxy({
            url: '../stores/req/grid/GetDeal.jsp'
        })
    });