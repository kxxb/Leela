/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */


CONTR_LIST_STORE = new Ext.data.JsonStore({
        root: 'results',
        totalProperty: 'totalCount',
        idProperty: 'id',
       
        fields: [
                {name: 'ID', mapping:'ID', type: 'int'},
                {name: 'CONTRACT_NAME', mapping:'CONTRACT_NAME', type: 'string'},
                {name: 'CONTRACT_DATE', mapping:'CONTRACT_DATE', type: 'date', dateFormat: 'd.m.Y H:i'},
                {name: 'CONTRACT_DESC', mapping:'CONTRACT_DESC', type: 'string'},
                {name: 'ORDER_IN_LIST', mapping:'ORDER_IN_LIST', type: 'string'}

        ],

        // load using script tags for cross domain, if the data in on the same domain as
        // this page, an HttpProxy would be better
        proxy: new Ext.data.ScriptTagProxy({
            url: '../stores/app.contrgenerator/select.contrlist.jsp'
        })
    });
    
    CONTR_PARAGRAPH_STORE = new Ext.data.JsonStore({
        root: 'results',
        totalProperty: 'totalCount',
        idProperty: 'id',
       
        fields: [
                {name: 'ID', mapping:'ID', type: 'int'},
                {name: 'LAWYER_CONTRACTS_ID', mapping:'LAWYER_CONTRACTS_ID', type: 'string'},
                {name: 'PARAGRAPH_NAME', mapping:'PARAGRAPH_NAME', type: 'string'},
                {name: 'PARAGRAPH_BODY', mapping:'PARAGRAPH_BODY', type: 'string'},
                {name: 'ORDER_NUMBER', mapping:'ORDER_NUMBER', type: 'string'},
                {name: 'PARAGRAPH_DATE', mapping:'PARAGRAPH_DATE', type: 'date', dateFormat: 'd.m.Y H:i'},
                {name: 'EDIT_DATE', mapping:'EDIT_DATE', type: 'date', dateFormat: 'd.m.Y H:i'},
                {name: 'IS_CHECKED', mapping:'IS_CHECKED', type: 'bool'}

        ],

        // load using script tags for cross domain, if the data in on the same domain as
        // this page, an HttpProxy would be better
        proxy: new Ext.data.ScriptTagProxy({
            url: '../stores/app.contrgenerator/select.contrparagraphs.jsp'
        })
    });