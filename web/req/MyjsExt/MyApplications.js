/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */



Ext.onReady(function(){





var ProfilePanel = new Ext.Panel({

        xtype: 'tabpanel',

        autoScroll : 1,
        overflow:'auto',
        id: 'ProfilePanel',

         bodyStyle: {
             background: '#ffffff',
             padding: '7px'
           },
	html: 'Выберите заявку из списка'

     });


var treeLoader = new Ext.tree.TreeLoader({
       dataUrl:'getter_grid_1.jsp'
     });

     var rootNode = new Ext.tree.AsyncTreeNode({
        text: 'Root'
      });


    var tree = Ext.tree.TreePanel({
            xtype: 'treepanel',
             loader: treeLoader,
             root: rootNode    
     }

    );


            var viewport = new Ext.Viewport({
                layout: 'border',
                renderTo: Ext.getBody(),
                items: [{
                        region: 'north',
                        xtype: 'panel',
                        height:28,
                        items :[ tree ]
                    }]

            });
        });

