/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */


/*!
 * Ext JS Library 3.3.0
 * Copyright(c) 2006-2010 Ext JS, Inc.
 * licensing@extjs.com
 * http://www.extjs.com/license
 */
//Ext.namespace("Application1");
var pg = new Application1.Grid();
var pg2 = new Application2.Grid();

pg.getSelectionModel().on('rowselect', function(sm, rowIdx, r) {
    Ext.Msg.alert('cool','cool man'+r.data.reqid);
});


Ext.onReady(function() {
	Ext.QuickTips.init();

    // create some portlet tools using built in Ext tool ids
    var tools = [{
        id:'gear',
        handler: function(){
            Ext.Msg.alert('Message', 'The Settings tool was clicked.');
        }
    },{
        id:'close',
        handler: function(e, target, panel){
            panel.ownerCt.remove(panel, true);
        }
    }];




   function onMainClick(item){
               window.location = '../portal.jsp';
           }
           function onExitClick(item){
               window.location = '../logout.jsp';
           }
           function onMyProfilClick(item){
               window.location = 'MyProfile.jsp';
           }
           function onMySettingsClick(item){
               window.location = 'MySettings.jsp';
           }


            var tb = new Ext.Toolbar();
            var menu = new Ext.menu.Menu({
                    id: 'mainMenu',
                    style: {
                        overflow: 'visible'     // For the Combo popup
                    },
                    items: [
                        {
                            text: 'Главная',
                            handler: onMainClick
                        }, '-',  {
                            text: 'Выход',
                            handler: onExitClick
                        }
                    ]
                });


            var menu1 = new Ext.menu.Menu({
                    id: 'MenuSettings',
                    style: {
                        overflow: 'visible'     // For the Combo popup
                    },
                    items: [
                        {
                            text: 'Мой профиль',
                            handler: onMyProfilClick

                        }, '-',  {
                            text: 'Мои настройки',
                            handler: onMySettingsClick
                        }
                    ]
                });
        tb.add({
            text:'Задачи',
            iconCls: 'bmenu',  // <-- icon
            menu: menu  // assign menu by instance
        });


/*

var viewport = new Ext.Viewport({
layout: 'border',
                renderTo: Ext.getBody(),
                items: [{
                        region: 'north',
                        xtype: 'panel',
                        height:28,
                        tbar:tb
                    } ]    
});
*/

    var viewport1 = new Ext.Viewport({
        layout:'fit',
        items:[
               {
                xtype: 'grouptabpanel',
    		tabWidth: 130,
    		activeGroup: 0,
    		items: [{
    			mainItem: 1,
    			items: [{
                        title: 'Заявки',
                        layout: 'fit',
                        iconCls: 'x-icon-tickets',
                        tabTip: 'Tickets tabtip',
                        name: 'tasks',
                        style: 'padding: 10px;',
                        items: [{
                                height: 400,
                                split: true,
                                name: 'requ',
                                xtype: 'tabpanel',
                                activeTab: 0,
                                items :[
                                    {
                                    title:'Заявки',
                                    split: false,
                                    name: 'requ1',
                                    xtype: 'panel',
                                    activeTab: 0,
                                    items :[pg]
                                 },
                                       pg2]
                             }
                    ]
    		},
                {
                    xtype: 'portal',
                    title: 'Главная',
                    tabTip: 'Главная',
                    
                    items:[{html: '&nbsp;&nbsp;&nbsp;<img src="img/logo.JPG"><br>'+
                                  '&nbsp;&nbsp;&nbsp;<font face="Arial">Добро пожаловать в информационный портал компании Paul\'s Yard</font>'}]
                    /*   */
                }]
            }, {
                expanded: true,
                items: [{
                    title: 'Мониторинг',
                    iconCls: 'x-icon-configuration',
                    tabTip: 'Configuration tabtip',
                    style: 'padding: 10px;',
                    items : [{
                            title: 'Panel 3',
                            tools: tools,
                            html: Ext.example.shortBogusMarkup
                        },
                        {
                            title: 'Panel 555',
                            tools: tools,
                            html: '<hr>panel<hr>'
                        }

                    ]
                }, {
                    title: 'Статистика входа',
                    iconCls: 'x-icon-templates',
                    tabTip: 'Templates tabtip',
                    style: 'padding: 10px;',
                    html: '<h1>Входы</h1>'
                }]
            }, {
                expanded: true,
                items: [{
                    title: 'Пользователи',
                    iconCls: 'x-icon-configuration',
                    tabTip: 'Configuration tabtip',
                    style: 'padding: 10px;',
                    html: 'text'
                },
                {
                    title: 'IT отдел',
                    iconCls: 'x-icon-users',
                    tabTip: 'IT отдел',
                    style: 'padding: 10px;',
                    html: '<h1>My template</h1>'
                },
                {
                    title: 'PR отдел',
                    iconCls: 'x-icon-users',
                    tabTip: 'PR отдел',
                    style: 'padding: 10px;',
                    xtype: 'portal',
                    tabTip: 'PR отдел',
                    items:[{
                        columnWidth:.33,
                        style:'padding:10px 0 10px 10px',
                        items:[{
                            title: 'Panel 2',
                            tools: tools,
                            html: Ext.example.UsersTpl
                        },{
                            title: 'Another Panel 2',
                            tools: tools,
                            html: Ext.example.UsersTpl
                        }]
                    },{
                        columnWidth:.33,
                        style:'padding:10px 0 10px 10px',
                        items:[{
                            title: 'Panel 2',
                            tools: tools,
                            html: Ext.example.UsersTpl
                        },{
                            title: 'Another Panel 2',
                            tools: tools,
                            html: Ext.example.UsersTpl
                        }]
                    },{
                        columnWidth:.33,
                        style:'padding:10px',
                        items:[{
                            title: 'Panel 3',
                            tools: tools,
                            html: Ext.example.UsersTpl
                        },{
                            title: 'Another Panel 3',
                            tools: tools,
                            html: Ext.example.UsersTpl
                        }]
                    }]
                }
           ]
            }]
       }]
    }
  );


});
