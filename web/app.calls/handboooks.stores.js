/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */



var Handbooksfields = [
        {name: 'id', mapping:'id', type: 'string'},
        {name: 'name', mapping:'name', type: 'string'}
];
/*Источник клиента*/
 var ClientSourceStore = new Ext.data.JsonStore({
        root: 'results',
        fields:Handbooksfields,
        proxy: new Ext.data.ScriptTagProxy({
            url: '../stores/clients/helper/ClientRequestHandbooks.jsp?mode=cl_source'
        })
    });
ClientSourceStore.load();        


/*Подогретость клиента*/
 var ClientWarmStore = new Ext.data.JsonStore({
        root: 'results',
        fields:Handbooksfields,
        proxy: new Ext.data.ScriptTagProxy({
            url: '../stores/clients/helper/ClientRequestHandbooks.jsp?mode=cl_warm'
        })
    });
ClientWarmStore.load();  

/*Лояльность клиента*/
 var ClientLoyalStore = new Ext.data.JsonStore({
        root: 'results',
        fields:Handbooksfields,
        proxy: new Ext.data.ScriptTagProxy({
            url: '../stores/clients/helper/ClientRequestHandbooks.jsp?mode=cl_loyal'
        })
    });
ClientLoyalStore.load();

/*Статус клиента*/
 var ClientStatusStore = new Ext.data.JsonStore({
        root: 'results',
        fields:Handbooksfields,
        proxy: new Ext.data.ScriptTagProxy({
            url: '../stores/clients/helper/ClientRequestHandbooks.jsp?mode=cl_status'
        })
    });
ClientStatusStore.load();

/*Статус заявки*/
 var ClRequestStatusStore = new Ext.data.JsonStore({
        root: 'results',
        fields:Handbooksfields,
        proxy: new Ext.data.ScriptTagProxy({
            url: '../stores/clients/helper/ClientRequestHandbooks.jsp?mode=req_status'
        })
    });

ClRequestStatusStore.load();


/*Характер звонка*/
 var CharacterStore = new Ext.data.JsonStore({
        root: 'results',
        fields:Handbooksfields,
        proxy: new Ext.data.ScriptTagProxy({
            url: '../stores/clients/helper/ClientRequestHandbooks.jsp?mode=call_character'
        })
    });

CharacterStore.load();

/*Валюта*/
 var CurrencyStore = new Ext.data.JsonStore({
        root: 'results',
        fields:Handbooksfields,
        proxy: new Ext.data.ScriptTagProxy({
            url: '../stores/clients/helper/ClientRequestHandbooks.jsp?mode=currency'
        })
    });

CurrencyStore.load();