/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

Ext.ns('Ext.ux');


var treeLoader = new Ext.tree.TreeLoader({
       dataUrl:'getter_grid_1.jsp'
     });

     var rootNode = new Ext.tree.AsyncTreeNode({
        text: 'Root'
      });


     Ext.ux.tree = Ext.extend( Ext.tree.TreePanel,{
         initComponent:function() {
             var config = {
             loader: treeLoader,
             root: rootNode    }; // eo config object
       // Применяем config
      Ext.apply(this, Ext.apply(this.initialConfig, config));

      Ext.ux.tree.superclass.initComponent.apply(this, arguments);
     } // eo function initComponent
     }
    
    );

    Ext.reg('tree', Ext.ux.tree);
