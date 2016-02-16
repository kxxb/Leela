/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

Ext.ns("app");
// {{{

app.RootTab =  Ext.extend(
    Ext.TabPanel,{


        initComponent: function(){

             var config1 = {
                plain:true
                ,activeTab: 0

                ,defaults:{
                    autoScroll: true
                }
                ,items:[

                    {xtype:'group_adm_tab'
                     ,title:'Все заявки'
                     }
                     ,
                     {xtype:'it_read_tab'
                     ,title:'Заявки в отдел маркетинга'
                     }
                     ,{xtype:'pr_read_tab'
                     ,title:'Заявки в отдел PR'
                     }
                     ,{xtype:'urtab_my'
                     ,title:'Заявки в юридический отдел'
                     }
                     ,{xtype:'deals_all'
                     ,title:'Сделки'

                     }
                ]
            }; // eo config object

            var config23_ur = {
                plain:true
                ,activeTab: 0
                
                ,defaults:{
                    autoScroll: true
                }
                ,items:[
                     {xtype:'urtab_all'
                     ,title:'Заявки '
                    }
                    ,{xtype:'urtab_for_me'
                     ,title:'Мои заявки'

                     }

                    ,{xtype:'it_read_tab'
                     ,title:'Заявки в отдел IT'
                     }
                     ,{xtype:'pr_read_tab'
                     ,title:'Заявки в отдел маркетинга'
                     }
                     ,{xtype:'urtab_my'
                     ,title:'Заявки в юридический отдел'
                     }
                     ,{xtype:'deals_all'
                     ,title:'Сделки'

                     }


                ]
            }; // eo config object

             var config23_ITPR = {
                plain:true
                ,activeTab: 0

                ,defaults:{
                    autoScroll: true
                }
                ,items:[
                    {xtype:'itpr_all_tab'
                     ,title:'Заявки '
                    }
                    ,{xtype:'itpr_forme_tab'
                     ,title:'Мои заявки'
                     }
                    ,{xtype:'it_read_tab'
                     ,title:'Заявки в отдел IT'
                     }
                     ,{xtype:'pr_read_tab'
                     ,title:'Заявки в отдел маркетинга'
                     }
                     ,{xtype:'urtab_my'
                     ,title:'Заявки в юридический отдел'
                     }
                     
                     
                ]
            }; // eo config object

            var config4 = {
                plain:true
                ,activeTab: 0

                ,defaults:{
                    autoScroll: true
                }
                ,items:[
                     {xtype:'it_read_tab'
                     ,title:'Заявки в отдел IT'
                     }
                     ,{xtype:'pr_read_tab'
                     ,title:'Заявки в отдел маркетинга'
                     }
                     ,{xtype:'urtab_my'
                     ,title:'Заявки в юридический отдел'
                     }
                ]
            }; // eo config object

             var config4_Secr = {
                plain:true
                ,activeTab: 0

                ,defaults:{
                    autoScroll: true
                }
                ,items:[
                    {xtype:'group_secr_tab'
                     ,title:'Все заявки моего отдела'
                     }
                     ,{xtype:'it_read_tab'
                     ,title:'Заявки в отдел IT'
                     }
                     ,{xtype:'pr_read_tab'
                     ,title:'Заявки в отдел маркетинга'
                     }
                     ,{xtype:'urtab_my'
                     ,title:'Заявки в юридический отдел'
                     }
                     
                ]
            }; // eo config object

            var config_er = {
                plain:true
                ,activeTab: 0

                ,defaults:{
                    autoScroll: true
                }
                ,items:[{title:'Ошибка'
                         ,html: "Не определена группа пользователя.<br>Обратитесь в отдел IT "
                        }
                ]
            }; // eo config object

            // Применяем config согласно группе
            if (gUserGroupId ==1) {
               Ext.apply(this, Ext.apply(this.initialConfig, config1));
            } else if (gUserGroupId ==2 | gUserGroupId ==3 ) {
               if (gUserDepId == 2) {
                  Ext.apply(this, Ext.apply(this.initialConfig, config23_ur));
               }else if(gUserDepId == 1 |gUserDepId == 3 ){
                  
                  Ext.apply(this, Ext.apply(this.initialConfig, config23_ITPR));
                  
               }

           } else if (gUserGroupId ==4) {
                if (gUserId == 131){ // 131 - Кучерова Наталья
                      Ext.apply(this, Ext.apply(this.initialConfig, config4_Secr));

                  } else {
                    Ext.apply(this, Ext.apply(this.initialConfig, config4));
                  }
            } else {
                Ext.apply(this, Ext.apply(this.initialConfig, config_er));

            }

            app.RootTab.superclass.initComponent.call(this, arguments);
//            this.on('tabchange', function(){
//                gCurActiveTab(this.items.indexOf(this.getActiveTab()));
//
//            })

//            var firstTab = this.items.itemAt(0);
//            var ComentWin = new app.CommentWindow({
//                items: new Ext.form.HtmlEditor({
//                        xtype:'htmleditor',
//                        fieldLabel:'Коментарий',
//                        height:200,
//                        anchor:'98%',
//	                 allowBlank: false})
//            });
//
//
//             function TestCall(){
//                firstTab.lTest.call();
//
//             }
//
//            firstTab.on('g',function(g){
//                TestCall();
//                //ComentWin.items.itemAt(0).setValue('test '+ g);
//                //ComentWin.show();
//
//                //Ext.Msg.alert('Error','Глобальное Добавление коментария '+ g)
//              })
//            this.items.itemAt(4).on('g',function(g){
//                ComentWin.show();
//                ComentWin.items.itemAt(0).setValue('test '+ g);
//                 //Ext.Msg.alert('Error','Глобальное Добавление коментария '+ g)
//             })


        } // e/o function initComponent


 });
Ext.reg('roottab', app.RootTab);
// }}}

