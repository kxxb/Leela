/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */


/**
 *
 * Custom Tree, with my typical defaults, a TreeSorter
 * and custom events to pass on to other components
 */
Ext.ns("req");    // extablish a namespace for all my component parts


wcc.tree = Ext.extend(Ext.tree.TreePanel, {
  initComponent: function() {
    // component configuration code here!
    this.rootID = this.rootID ? this.rootID : Ext.id();
    Ext.apply(this,  {
        // default config params here
      animate:true,
      autoScroll:true,
      enableDD:true,
      containerScroll: true,
        // custom tree loader
      loader: new Ext.tree.TreeLoader( {
        url : this.url,
        requestMethod : "GET",
        createNode : function( attr ) {
            // what type of custom event should we fire?
          var NodeEvent = attr.leaf ? "clickLeaf" : "clickBranch";

          attr.listeners = {
            click : function( obj, evt, scope) {
                // fire the custom event
              this.ownerTree.fireEvent(NodeEvent, this, attr, attr.text);
            }
          };
            // Perform default method
          return Ext.tree.TreeLoader.prototype.createNode.call(this, attr);
        }
      }),

      root : new Ext.tree.AsyncTreeNode({
        text: this.rootID,
        id : this.rootID,
        expanded : true,
        draggable : false
      })
    });
    wcc.tree.superclass.initComponent.apply(this, arguments);
    new Ext.tree.TreeSorter(this, {folderSort:true});

      // Add 2 new events to the tree component which will be fired by clicking on a node
    this.addEvents( 'clickLeaf', 'clickBranch');
  }
});
Ext.reg('wccTree', wcc.tree);