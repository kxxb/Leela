/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */


// create application
tbAllReqPRTab = function(title, grid, pmAdditional) {

tbAllReqPRTab.superclass.constructor.call(this, {


                 //xtype: 'panel',
                 title: title,
                    autoScroll : 1,
                    overflow:'auto',
            //        frame: true,
                    layout: 'border',
                    //height:680,
                    //id: 'tbAllReqITTab',
                    items: [
                        grid// eof    region: 'north',
                       ,pmAdditional
                       /*{region: 'center',
                          xtype: 'panel',
                          height:50,
                            items : [UrAdditionalPanel  

                                   ]

                        }*/
                          // eof region: 'center'
                        ,{region: 'south',
                          xtype: 'panel',
                          height:150,
                          layout: 'border',
                          split: true,
                          border: false,

                            items : [ {
                                    region: 'west',
                                    xtype: 'panel',
                                      width:350,
                                      height:150,
                                      split: true,
                                      html: "west blanc"
                                    }
                                    ,
                                    {region: 'center',
                                      xtype: 'tabpanel',
                                      title: 'Информация',
                                      width:200,
                                      split: true,
                                      items : [{
                                        title: 'Информация',
                                        xtype: 'tabpanel',
                                        html: "east blanc"
                                      },
                                        {title: 'Информация',
                                            xtype: 'tabpanel',
                                         html: "east blanc"
                                        }
                                  ]
                                 }
                                   ]
                              }
                           
                       // eof region: 'south'
                     ]






});
   
}; // end of app

Ext.extend(tbAllReqPRTab, Ext.Panel);


