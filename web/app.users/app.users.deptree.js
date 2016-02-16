/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

Ext.ns("app");

var depTreeLoader =  new Ext.tree.TreeLoader({
         dataUrl: '../stores/req/tree/getter_deptree.jsp'
         });

var depRoot = new Ext.tree.AsyncTreeNode({
        text: 'Отделы',
        id: 'src'
    });

app.DepTree =  Ext.extend(
    Ext.tree.TreePanel,{


        initComponent: function(){

            var config_tree = {
                autoScroll:true
                ,animate:true
                ,split: true
                ,region: 'west'
                ,width:200
                ,enableDD:false
                ,containerScroll: true
                ,rootVisible: false
                ,loader: new Ext.tree.TreeLoader({
                     dataUrl: '../stores/req/tree/getter_deptree.jsp'
                 })
                 ,root: {
                    text: 'Pauls Yard'
                    //id: 'source'
                }

            }; // eo config object



            Ext.apply(this, Ext.apply(this.initialConfig, config_tree));


            app.DepTree.superclass.initComponent.call(this, arguments);

            this.getSelectionModel().on('selectionchange', function(tree, node){
              app_store_users.reload({params: {
                    dep_id:       node.id}});
                    //Ext.Msg.alert('Сообщение.','Отдел '+node.id);
             })

          } // e/o function initComponent


 });
Ext.reg('deptree', app.DepTree);

//app.DepTree.setRootNode(depRoot);
// }}}
