/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */


object_store_search = new Ext.data.JsonStore({
        root: 'results',
        idProperty: 'call_id',
        totalProperty: 'totalCount',
        baseParams: { sq_m_from:1
                     ,sq_m_to:100
                    },
        fields: [
                {name: 'id', mapping:'id', type: 'string'},
                {name: 'sq_m_cost_numb', mapping:'sq_m_cost_numb', type: 'string'},
                {name: 'object_title', mapping:'object_title', type: 'string'},
                {name: 'land_info', mapping:'land_info', type: 'string'},
                {name: 'block_sales', mapping:'block_sales', type: 'string'}

        ],

        // load using script tags for cross domain, if the data in on the same domain as
        // this page, an HttpProxy would be better
        proxy: new Ext.data.ScriptTagProxy({
            url: '../stores/object_search/GetObjects.jsp'
        })
    });
  
    object_store_search.load();