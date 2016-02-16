/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */


Ext.namespace('Req', 'Req.rootTab');


//var prtabs = new Req.tbAllReqITTab();

Req.tbAllReqITTab = Ext.extend(

         Ext.Panel,{

         

         initComponent: function(){
          

          var config = {
             xtype: 'panel',
             title: 'все заявки в отдел it',
                    autoScroll : 1,
                    overflow:'auto',
            //        frame: true,
                    layout: 'border',
                    //height:680,
                   // id: 'tbAllReqITTab',
                    items: [
                        new UniversalReqGrid(AllITColumns, store_j)
                        /*{
                            region: 'north',
                            xtype: 'panel',
                            split: true,
                            //height:300,
                            items : [{
                                xtype: 'panel',
                                items : [ {
                                   html: "grid<br><br><br><br><hr>"
                                }]
                            }
                         ]

                        }*/// eof    region: 'north',
                       ,{region: 'center',
                          xtype: 'panel',
                          height:150,
                          layout: 'border',
                          split: true,
                          border: false,
                         items : [

                             new RequestTextPanel('ITREQPanel1','выберите заявку',  '<font face="Verdana" size="1">{request_text}</font>', null, null)
                                    ,
                                    {region: 'center',
                                      xtype: 'tabpanel',
                                      title: 'Информация',
                                      width:200,
                                      split: true,
                                      activeTab: 0,
                                      items : [
                                          new RequestTextPanel(
                                             'ComentITpanel1'
                                             ,'Для просмотра коментария выберите заявку'
                                             ,'<font face="Verdana" size="1">{comment}</font>'
                                             ,new tbarURComent('tbITComent1')
                                             ,'коментарий'
                                          )
                                         /* {
                                        title: 'Информация',
                                        xtype: 'tabpanel',
                                        html: "east blanc"
                                      }*/,
                                        {title: 'Информация',
                                            xtype: 'tabpanel',
                                         html: "east blanc"
                                        }
                                  ]
                                 }
                                   ]

                        } // eof region: 'center'
                        
                       /* ,{region: 'south',
                          xtype: 'panel',
                          height:200,
                          split: true,
                            items : [ {
                                   html: "blanc"
                                }]
                      } // eof region: 'center'
                      */
                     ]
            }; // eo config object

            // Применяем config
             Ext.apply(this, Ext.apply(this.initialConfig, config));
             Req.tbAllReqITTab.superclass.initComponent.call(this, arguments);
          }
          ,onRender: function() {
             var my_it_id = '0';
             Req.tbAllReqITTab.superclass.onRender.apply
                                           (this, arguments);
         }
          ,setValue:function(id){
           my_it_id = id;
          }
          ,getValue:function(){
              return my_it_id;
          }

     }
  );

Ext.reg('reqItTab',Req.tbAllReqITTab);




