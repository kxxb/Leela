/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */


Ext.ns("app");


app.RootChartPan =  Ext.extend(
    Ext.Panel,{
        initComponent: function(){
            var config = {
                    xtype: 'panel',
                    autoScroll : 1,
                    overflow:'auto',
                    layout: 'border',
                    items:[
                        { xtype:'alldepcallschartpan' }
                       ,{xtype:'depcallsgrid' }
                    
                    ]
                    
            }; // eo config object
            
             var config_broker = {
                    xtype: 'panel',
                    autoScroll : 1,
                    overflow:'auto',
                    layout: 'border',
                    items:[
                        { xtype:'brokercallschartpan' }
                    
                    ]
                    
            }; // eo config object
            
            if (gUserId == 49 | gUserId == 131 | gUserId == 142 | gUserId == 279 | gUserId == 17| gUserId == 46 | gUserId == 12 | gUserId == 443)  {
            /*начальники секретари
                 *(49, 131, 142)
                 *(279,17)
                 *(46,12) Дабсон Артемьева
                 **/
            // apply config
            Ext.apply(this, Ext.apply(this.initialConfig, config));
        } else {
            Ext.apply(this, Ext.apply(this.initialConfig, config_broker));
        }

            
            app.RootChartPan.superclass.initComponent.apply(this, arguments);
            
            
            
            function reload_all_stores() {
                       ChartStore.reload();
                                            
                }
                var task = {
                run: function(){
                    reload_all_stores();
                },
                interval: 60000 //1000 //1 second
            }
            Ext.TaskMgr.start(task);
    

            
            
   } // eo function initComponent

});
Ext.reg('rootchartpan', app.RootChartPan);