/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */


Ext.ns("app");

//Ext.extend(UniversalReqGrid, Ext.grid.EditorGridPanel);
//var store_it = new app.store_j1({baseParams: {mode: 'AllRequests'}});

app.search_tab =  Ext.extend(
    Ext.Panel,{
        initComponent: function(){
           var config = {
                    xtype: 'panel',
                    autoScroll : 1,
                    overflow:'auto',
                    layout: 'border',
                    items: [
//                        {region:'east'
//                          ,xtype:'panel'
//                          ,split:true
//                          ,preventBodyReset: true
//                          ,collapsible: true
//                          ,collapsed: true
//                          ,autoScroll:true
//                          ,width :640
//                          //,title:'Поиск'
//                          ,items:frmSearch
//                          
//                                
//                        },
                        
                       {
                          region: 'center'
                          ,layout: 'border'
                          ,split: true
                          ,border: false
                          ,items : [
                              
//                              {
//                                
//                                layout: 'fit',
//                                xtype:'panel',
//                                region: 'center',
//                                items : dataview,
//                                height: 615,
//                                //width : 800,
//                                tbar  : [
//                                    'Фильтр стоимости:', ' ',
//                                       priceField
//                                      //phoneSlider
//                                ]
//                            }
                              
                                {
                                    region: 'center',
                                    //xtype:'panel'
                                     xtype:'searchsgrid'
                                    //,height:150
                                    //,html:'search grid'
                                    ,autoScroll : 1
                                    ,split: true

                                 }
                                 ,{region: 'south'
                                    ,layout: 'border'
                                    ,split: true
                                    ,height:350
                                    ,border: false
                                    ,items : [
                                       
                                       {xtype:'addresspan'
                                        ,region:'west'
                                        ,width :440
                                        ,autoScroll : 1
                                        ,split: true
                                        }
                                     ,{xtype: 'roomgrid'
                                       ,region: 'center'
                                        }
                                      ,{xtype:'panel'
                                        ,region:'east'
                                        ,width :240
                                        ,autoScroll : 1
                                        ,split: true
                                        ,html:'pics'
                                        }
                                    ]
                                     
                                 }
                         
                         
                               
                                
                            ]
                          //,scope:this
                        }
                        
                       
                    ]
            }; // eo config object


            Ext.apply(this, Ext.apply(this.initialConfig, config));
            app.search_tab.superclass.initComponent.apply(this, arguments);
            
            var UniversalGrid  = this.items.itemAt(0).items.itemAt(0);
            var additionalPanel= this.items.itemAt(0).items.itemAt(1).items.itemAt(0);
            var RoomGrid= this.items.itemAt(0).items.itemAt(1).items.itemAt(1);
            var obj_id=0;
            
            UniversalGrid.getSelectionModel().on('rowselect', function(sm, rowIdx, r) {
                                    OverwritePanels(r.data);
                                    obj_id = r.data.OBJ_ID;
                                    //Ext.Msg.alert('gridCombo ', obj_id);
                     room_store.reload({params: {search_param:obj_id}})
                 });
            
             RoomGrid.getSelectionModel().on('click', function(sm, rowIdx, r) {
                                    Ext.Msg.alert('gridCombo ', obj_id);
                     //room_store.reload({params: {search_param:obj_id}})
                 });
            function OverwritePanels(data){
                additionalPanel.tpl.overwrite(additionalPanel.body, data);
                
              
            }

        }

 });
Ext.reg('search_root', app.search_tab);
// }}}



