/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

Ext.namespace('req');
// {{{

req.RootTab =  Ext.extend(
    Ext.TabPanel,{


        initComponent: function(){

            var config = {
                plain:true,
                activeTab: 0,
                defaults:{
                    autoScroll: true
                }
                //,items:[
                    
                    //this.grid
                    /*{xtype:'univtab'
                     ,title:'new '

                    },
                    {xtype:'univtab'
                     ,title:'new alll'
                    },*/



                /* ,{title:'new all'
                     ,xtype:'univgrid'
                     ,store: store_j
                     ,cm: AllITColumns}
                    */

                //]
            }; // eo config object

            // Применяем config
            Ext.apply(this, Ext.apply(this.initialConfig, config));

            req.RootTab.superclass.initComponent.call(this, arguments);





        } // e/o function initComponent


 });
Ext.reg('roottab', req.RootTab);
// }}}
