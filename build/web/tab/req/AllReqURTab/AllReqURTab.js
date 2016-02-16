/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */



// create application
tbAllReqURTab = function(title, grid, pnAdditional,pnReqText, pnURComent, pnFiles, pnUserComent ) {
tbAllReqURTab.superclass.constructor.call(this, {
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
                       ,pnAdditional
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

                            items : [ pnReqText
                                    ,
                                    {region: 'center',
                                      xtype: 'tabpanel',
                                      title: 'Информация',
                                      width:200,
                                      split: true,
                                      activeTab: 0,
                                      items : [
                                          pnURComent
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
                              }
                           
                       // eof region: 'south'
                     ]
     }

  )
  
   
}; // end of app

 

//animal

UniversalAllUrTab = Ext.extend(tbAllReqURTab, Ext.Panel, (function(title, grid, pnAdditional,pnReqText, pnURComent, pnFiles, pnUserComent ) {
    var privateString = 0;

    function privateFn(id) {
        privateString = id;
    }
    function privateFnGetId() {
        return privateString;
    }

    return {

        setValue : function(id){
          privateFn(id);
         //tets = id;
     },
     getValue : function(){
         return privateFnGetId();
     },
        newPublicFn: function() {
       //     console.log("Private string = " + privateString);

//          Invoke the private function as if it were a member. "this" will be this object.
            privateFn.call(this);
        }
    };
}) ());


