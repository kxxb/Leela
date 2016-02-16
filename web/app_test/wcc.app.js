/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

Ext.ns("wcc");    // extablish a namespace for all my component parts


wcc.app = function() {
  // Private Variables...
  var win;
  var button;

  // Private Methods...
  var buildApp = function( cfg ) {
      // set up the common config params for both panels
    var dfltCfgParams = {
      split : true,
      collapsible : true,
      margins : "3 0 3 3",
      cmargins : "3 3 3 3"
    };

      // set up the config params for the navigation tree panel
    var treeParams = Ext.apply( {
      region : "west",
      width : 200,
      frame : true,
      title : "Navigation"
    }, cfg );

      // create the tree panel
    var tree = new wcc.tree(
      Ext.apply( treeParams, dfltCfgParams )
    );

      // create the content panel
    var content = new Ext.Panel(Ext.apply({
      title : "Content",
      region : "center",
      frame : true
    }, dfltCfgParams ));

      // create the window with a border layout
      // using the tree and content panels
    win = new Ext.Window({
      title    : 'Layout Window',
      closable : true,
      width    : 600,
      height   : 350,
      plain    : true,
      layout   : 'border',
      items    : [ tree, content ]
    });

      // Tell the window to handle the custom 'clickLeaf' and
      // 'clickBranch' events from the tree/navigation panel
    win.relayEvents(tree, ['clickLeaf', 'clickBranch']);

      // here's the handlers for the custom TreePanel events
      // nothing fancy for the example but lots more could be done.
    win.on( {
      'clickLeaf' : function (nodeObj, nodeAttr, nodeText) {
        console.log("Window - NodeClick - " + nodeText);
        content.body.update("Hello World... Loading Text from Leaf: " + nodeObj.id);
      },
      'clickBranch' : function(nodeObj, nodeAttr, nodeText) {
        console.log("Window - BranchClick - " + nodeText);
        content.body.update("Hello World... Loading Text from Branch: " + nodeObj.id);
      },
      scope : this
    });
  };


    // Public Area
  return {
    myTree : {},
    root : {},

      // I like to have information about my classes
      // embedded in the class mostly for debugging purposes
      // and documentation, but they're not needed in production
    name : "wcc:App",
    desc : "Generic App Class in private Namespace",

    init : function(cfg) {
      this.curFunc = this.name + ".init()";
        buildApp( cfg );
        win.show(button);
/*
      button = Ext.get("theBtn");
      button.on("click" , function() {
        buildApp( cfg );
        win.show(button);
      });*/
    }
  };	// End Public Return
}();