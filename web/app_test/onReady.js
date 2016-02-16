/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

Ext.ns("wcc");    // extablish a namespace for all my component parts


Ext.onReady( function() {
  console.log("App running...");
  wcc.app.init({
    url : "../stores/req/tree/getter_templates.jsp",
    rootID : "examples"  // This is also the folder name to show
  });
}, wcc.app, true);
console.log("App Ready to run...");
