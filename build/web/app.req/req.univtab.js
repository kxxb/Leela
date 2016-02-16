/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

Ext.namespace('req','req.univtab', 'req.store', 'req.cm');


req.univtab.tabUR = function() {
    //private
    var grid;
    var pan_additional;
    var pan_reqtext;
    var pan_comm_aplicant;
    var pan_comm_responcible;
    var pan_file;

    var win_create_begin;
    //......
    var taaab;

    var   buildTabUr = function(){

       buildTabUr.superclass.constructor.call(this,
       {
                   //xtype: 'tabpanel'
                    //title: title,
                   autoScroll : 1
                    ,overflow:'auto'
                   // frame: true,
                   ,layout: 'border'

                    //height:680,
                    //id: 'tbAllReqITTab',
                    ,items: [
                        grid
                      // eof    region: 'north'
                       ,{
                          xtype: 'addpan'
                          ,scope:this
                        }
                          // eof region: 'center'

                        ,{region: 'south'
                          ,xtype: 'panel'
                          ,height:100
                          ,layout: 'border'
                          ,split: true
                          ,border: false

                            ,items : [//content,
                                      {
                                            xtype: 'panel'
                                    //        ,id:'reqText'
                                            //,region: 'west'
                                        //    ,scope:this
                                            ,html: "west blanc"
                                        }
                                    ,
                                    {region: 'center',
                                      xtype: 'tabpanel',
                                      title: 'Информация',
                                      width:200,
                                      split: true,
                                      activeTab: 0,
                                      html: "west blanc"
                                     }
                                   ]
                              }

                       // eof region: 'south'
                     ]
        }
    )
    };




     //Ext.extend(buildTabUr, Ext.TabPanel);
    

    return new buildTabUr();
      
        
    
}();


