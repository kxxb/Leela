/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */



Ext.ns("charts");


    

var html_main = '<font face="verdana" size="2" >'+
                '<br>&nbsp;&nbsp;&nbsp;Вся аналитика собрана по данным входящих звоноков за период с 27 сентября 2011 по текущее время.'+
                '<br>&nbsp;&nbsp;&nbsp;Три первые вкладки отображают распределение принятых звонокв в разрезе брокеров, и как эти звонки оценивают сами брокеры. '+
                '<br>&nbsp;&nbsp;&nbsp;Вкладка "По источникам рекламы" отображает информацию о распределении звоноков по источникам рекламы в разрезе отделов.'+
                '</font>';
                    

charts.RootChartPan =  Ext.extend(
    Ext.TabPanel,{
        initComponent: function(){
           var config = {
                plain:true
                ,activeTab: 0

                ,defaults:{
                    autoScroll: true
                }
                ,items:[
                     {xtype:'panel'
                     ,title:'Главная'
                     ,html: html_main
                     }
                     ,{xtype:'suburbanchartspan'
                     ,title:'Загородная недвижимость'
                     ,html:'Загородная недвижимость'
                     }
                     ,{xtype:'commercialchartspan'
                     ,title:'Коммерческая недвижимость'
                     ,html:'Коммерческая  недвижимость'
                     }
                     ,{xtype:'luxurychartspan'
                     ,title:'Элитная недвижимость'
                     ,html:'Элитная  недвижимость'
                     }
                     ,{xtype:'reksourcechartspan'
                     ,title:'По источникам рекламы'
                     
                     }
                ]
            }; // eo config object
            var config_others = {
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
            
             
  /*
   *180 - Здрадовский Павел
   *173 - Ольховик Дмитрий
   *87  - Гуськов Владимир Викторович 
   *198   Пузанов Георгий 
   *41	  Бутрина Елена
   **/
        if (gUserId == 1 | gUserId == 180 | gUserId == 173 | gUserId == 87 | gUserId == 198 | gUserId == 41 |   gUserId == 49 |   gUserId == 443 )  {
            Ext.apply(this, Ext.apply(this.initialConfig, config));
        } else {
            Ext.apply(this, Ext.apply(this.initialConfig, config_others));
        }


            //Ext.apply(this, Ext.apply(this.initialConfig, config));    
            charts.RootChartPan.superclass.initComponent.apply(this, arguments);
            
            
      /*      
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
    */

            
            
   } // eo function initComponent

});
Ext.reg('rootchartpan', charts.RootChartPan);