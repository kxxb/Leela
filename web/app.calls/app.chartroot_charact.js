/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */


Ext.ns("app");


app.RootChartPanCharact =  Ext.extend(
    Ext.Panel,{
        initComponent: function(){
            var config = {
                    xtype: 'panel',
                    autoScroll : 1,
                    overflow:'auto',
                    layout: 'border',
                    items:[
                        { xtype:'alldepcallschartpan_charact' }
                       ,{xtype:'depcallsgrid_charact' }
                    
                    ]
                    
            }; // eo config object
            
             var config_broker = {
                    plain:true
                ,activeTab: 0

                ,defaults:{
                    autoScroll: true
                }
                ,items:[
                     {xtype:'panel'
                     ,title:'Главная'
                     ,html: 'Раздел в разработке'
                     }
                     
                ]
                    
            }; // eo config object
            
            if (gUserId == 49 | gUserId == 131 | gUserId == 142 | gUserId == 279 | gUserId == 443 | gUserId == 17)  {
            /*начальники секретари
                 *(49, 131, 142)
                 *(279,17)
                 **/
            // apply config
            Ext.apply(this, Ext.apply(this.initialConfig, config));
        } else {
            Ext.apply(this, Ext.apply(this.initialConfig, config_broker));
        }

            
            app.RootChartPanCharact.superclass.initComponent.apply(this, arguments);
            
            
            
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
Ext.reg('rootchartpancharact', app.RootChartPanCharact);