/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

Ext.ns("app");

app.FileComentsTab =  Ext.extend(
    Ext.TabPanel,{
        initComponent: function(){
            var config = {
                plain:true
                //,activeTab: 0
                ,defaults:{
                    autoScroll: true
                }
                ,items:[
                     { title: 'Комментарий заявителя'
                      ,xtype: 'reqCommentAplPan'
                     }
                    ,{title: 'Прикрепленные файлы'
                     ,xtype: 'reqFilesPan'
                    }
                    ,{title: 'Комментарий исполнителя'
                      ,xtype: 'reqCommentRespPan'
                     }

                ]
            }; // eo config object

            // Применяем config
            Ext.apply(this, Ext.apply(this.initialConfig, config));

            app.FileComentsTab.superclass.initComponent.call(this, arguments);
            this.on('tabchange', function(){tach.call()});
            
            var tach = function(){
                this.fireEvent('tach');
            }
            tach = tach.createDelegate(this);


        } // e/o function initComponent


 });
Ext.reg('filecomentstab', app.FileComentsTab);
// }}}

app.FileComentsTab_Simple =  Ext.extend(
    Ext.TabPanel,{
        initComponent: function(){
            var config = {
                plain:true
                //,activeTab: 0
                ,defaults:{
                    autoScroll: true
                }
                ,items:[
                     { title: 'Комментарии'
                      ,xtype: 'reqCommentsPan'
                     }
                    ,{title: 'Прикрепленные файлы'
                     ,xtype: 'reqFilesPan'
                    }

                ]
            }; // eo config object

            // Применяем config
            Ext.apply(this, Ext.apply(this.initialConfig, config));

            app.FileComentsTab_Simple.superclass.initComponent.call(this, arguments);
            this.on('tabchange', function(){tach.call()});

            var tach = function(){
                this.fireEvent('tach');
            }
            tach = tach.createDelegate(this);


        } // e/o function initComponent


 });
Ext.reg('filecomentstab_simple', app.FileComentsTab_Simple);
// }}}
