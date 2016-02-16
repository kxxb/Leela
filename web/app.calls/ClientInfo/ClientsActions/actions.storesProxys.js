/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */


proxy_ReqClient = new Ext.data.ScriptTagProxy({
            url: '../stores/clients/grid/GetClientRequests.jsp'
        }); 
        
proxy_CallsClients = new Ext.data.ScriptTagProxy({
            url: '../stores/clients/grid/ClientsCalls.jsp'
            
        });         
        
proxy_VisibilityClient = new Ext.data.ScriptTagProxy({
            url: '../stores/clients/grid/GetClientRequests.jsp'
        });              