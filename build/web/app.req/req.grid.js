/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

Ext.namespace('req');

//form.relayEvents(tree, ['nodeSelected', 'rootSelected']);


// {{{
req.UniversalGrid =  Ext.extend(Ext.grid.EditorGridPanel,{
    initComponent: function(){
        var config ={


             //,id: Grid_id
              height:300
             ,region: 'north'
             ,split: true
             ,clicksToEdit:1
             ,enableColLock:false
             ,selModel: new Ext.grid.RowSelectionModel({
                  singleSelect:false
              })

             
        };

     // apply config
    Ext.apply(this, Ext.apply(this.initialConfig, config));

    



    this.bbar = new Ext.PagingToolbar({
                    pageSize: 100
                    ,store: this.store
                    ,displayInfo: true
                    ,displayMsg: 'Показанно заявок {0} - {1} of {2}'
                    ,emptyMsg: "Нет заявок"

                 });


    


    req.UniversalGrid.superclass.initComponent.apply(this, arguments);

     // load the store at the latest possible moment
        this.on({
            afterlayout:{
                scope:this,
                single:true,
                fn:function() {
                    this.store.load({
                        params:{
                            start:0,
                            limit:10
                        }
                    });
            }
        }
    });

// add custom events
    this.addEvents('btnSearchClick');

} // eo function initComponent



});
Ext.reg('univgrid', req.UniversalGrid);

// }}}
