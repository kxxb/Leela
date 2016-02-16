/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

Ext.ns("app");    // extablish a namespace for all my component parts


        
        Ext.BLANK_IMAGE_URL = '../js/ext-3.2.1/resources/images/default/s.gif';
        Ext.onReady(function(){
        Ext.state.Manager.setProvider(new Ext.state.CookieProvider());
        Ext.QuickTips.init();

         
         <%=sys_menu.get_menu_js(db_conn.GetConnect())%>
            var tb = new Ext.Toolbar();
            tb.add({
                text:'Задачи',
                iconCls: 'bmenu',  
                menu: menu  
            });




    




        var viewport = new Ext.Viewport({
                layout: 'border',
                renderTo: Ext.getBody(),
                items: [{
                        region: 'north',
                        xtype: 'panel',
                        height:28,
                        tbar:tb
                    }// eof    region: 'north',
                   ,{region: 'center'
                        /*здесь будут все табы*/
                           ,xtype :'callstab'


                    } // eof region: 'center'
                    ,{region: 'south',
                        /*пустое пространство*/
                        height:28,
                        items: [{
                          html: "&nbsp;&nbsp;&nbsp;Paul's Yard &copy; 2011  "
                        }
                        ]
                    } // eof region: 'south'
                 ] //eof viewport items
            });//eof viewport

        });


