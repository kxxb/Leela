/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */



Ext.namespace('app');

//form.relayEvents(tree, ['nodeSelected', 'rootSelected']);

//app.eventManager = new Ext.util.Observable();
//app.eventManager.addEvents('btnSearchClick');
 // in a tree click listener: MyApp.eventManager.fireEvent('selectnode', node); 
 // after a grid is defined - wire it up to the tree: MyApp.eventManager.on('selectnode', grid.loadNodeData.createDelegate(grid));

var gActiveTab =0;
function gCurActiveTab(tabIndex){
    gActiveTab = tabIndex;
};

function getActiveTab(){
    return gActiveTab;
}

 app.ExampleBus = new Ext.util.Observable();
 app.ExampleBus.addEvents('message');



// {{{

//Ext.ux.GroupTabPanel.superclass.initComponent.call(this);
app.UniversalGrid =  Ext.extend(Ext.grid.EditorGridPanel,{
    initComponent: function(){
        var config ={
              

             //,id: Grid_id
              height:300
             ,region: 'north'
             ,split: true
             ,clicksToEdit:1
             ,enableColLock:false
             ,selModel: new Ext.grid.RowSelectionModel({
                  singleSelect:false
              })

             
        };

     // apply config
    Ext.apply(this, Ext.apply(this.initialConfig, config));

    this.tbar = new Ext.Toolbar({
    items: [{
             text: 'Создать заявку'
             ,tooltip: 'Создать заявку'
             ,iconCls:'silk-add'
            // ,handler: createRequest
          }
          ,'-'
          ,{
             text: 'Поиск'
             ,tooltip: 'Поиск'
             ,iconCls:'silk-cog'
             ,handler:  function(){Ext.Msg.alert('ap','test '+getActiveTab());}

          }
          ,'-'
          ]

    });

    this.bbar = new Ext.PagingToolbar({
                    pageSize: 100
                    ,store: this.store
                    ,displayInfo: true
                    ,displayMsg: 'Показанно заявок {0} - {1} of {2}'
                    ,emptyMsg: "Нет заявок"

                 });


    
     
    app.UniversalGrid.superclass.initComponent.apply(this, arguments);

     // load the store at the latest possible moment
        this.on({
            afterlayout:{
                scope:this,
                single:true,
                fn:function() {
                    this.store.load({
                        params:{
                            start:0,
                            limit:10
                        }
                    });
            }
        }
    });
   
    
// add custom events


} // eo function initComponent
//,constructor: function(){
//         app.UniversalGrid.superclass.constructor.apply(this, arguments);
//
//         this.addEvents(
//        {"btnSearchClick": true},
//        {"event2": true},
//        {"eventXXX": true}
//        );
//     }

});
Ext.reg('univgrid', app.UniversalGrid);

// }}}



MyObservableSingleton = function(ColumModel, Store){
     var UniversalReqGrid = function(ColumModel, Store){ // this is your class
         // your constructor



    UniversalReqGrid.superclass.constructor.call(this, {
      store: Store
     ,cm: ColumModel

     //,id: Grid_id
     ,height:300
     ,region: 'north'
     ,split: true
     ,clicksToEdit:1
     ,enableColLock:false
     ,selModel: new Ext.grid.RowSelectionModel({
          singleSelect:false
      })

     ,bbar: new Ext.PagingToolbar({
            pageSize: 100
            ,store: Store
            ,displayInfo: true
            ,displayMsg: 'Показанно заявок {0} - {1} of {2}'
            ,emptyMsg: "Нет заявок"

         }),tbar: [{
             text: 'Создать заявку'
             ,tooltip: 'Создать заявку'
             ,iconCls:'silk-add'
            // ,handler: createRequest
          }
          ,'-'
          ,{
             text: 'Поиск'
             ,tooltip: 'Поиск'
             ,iconCls:'silk-cog'
             ,srch:  function(){return}

          }
          ,'-'
          ]
    } );
    //this.addEvent('FireClickSrch');







     };
     Ext.extend(UniversalReqGrid, Ext.util.Observable, {
        srch: function(){
            //fire the event:
            this.fireEvent('FireClickSrch');
        }

     });

     return new UniversalReqGrid();
}();


// {{{

app.UrAdditionalPanel =  Ext.extend(Ext.Panel,{
    initComponent: function(){
      var config = {
         region: 'center'
         ,height:50
         ,autoScroll : 1
         ,split: true
        // ,id:id
         //,overflow:'auto'
         ,bodyStyle: {background: '#ffffff',
        	      padding: '7px'}
          ,tpl:new Ext.XTemplate(
                                            '<font face="Verdana" size="1">									',
                                            '<table border="0" width ="100%">                               ',
                                            '<tr>															',
                                            '	<td><b>	 тел внутр. {apl_user_internal}  моб. {apl_user_cellular} email: {apl_user_email}</b></td>   ',
                                            '</tr>															',
                                            '<tr>															',
                                            '	<td>														',
                                            '	<table border="0" width ="100%">								',
                                            '		<tr>													',
                                            '			<td ><b> Договор:</b> <u> <a href="file_contr.jsp?file_id={Tl_Contract_Template_Id}">{CONTR}</a></u>	</td> ',
                                            '			<td><b> email:  </b><u>	{Cl_Email}	</u></td> 			',
                                            '		</tr>													',
                                            '		<tr>													',
                                            '			<td>   <b> Клиент:	</b><u>	{Client}		</u></td>   ',
                                            '			<td>  <b> Ставка:</b><u> {Cost_Of_Service}	</u></td>		',
                                            '		</tr>													',
                                            '		<tr>													',
                                            '			<td>   <b> Объект:</b><u>	{Obj}		</u>	</td>		',
                                            '			<td>   <b> Контрагент:</b><u>	{Contragent}	</u></td>	',

                                            '		</tr>													',
                                            '	</table>													',
                                            '	</td>														',
                                            '</tr>															',
                                            '</table>	</font>												'

                       )
        
      };
           Ext.apply(this, Ext.apply(this.initialConfig, config));
           app.UrAdditionalPanel.superclass.initComponent.apply(this, arguments);
       

   } // eo function initComponent

});
Ext.reg('addpan', app.UrAdditionalPanel);
// }}}


// {{{

app.ReqTextPanel =  Ext.extend(Ext.Panel,{
    initComponent: function(){
      var config = {
         //region: 'west'
         height:50
         ,width:200
         ,autoScroll : 1
         ,split: true
        // ,id:id
         //,overflow:'auto'
         ,bodyStyle: {background: '#ffffff',
        	      padding: '7px'}
         ,tpl:new Ext.XTemplate('<font face="Verdana" size="1">{request_text}</font>')
      };
           Ext.apply(this, Ext.apply(this.initialConfig, config));
           app.ReqTextPanel.superclass.initComponent.apply(this, arguments);


   } // eo function initComponent

});
Ext.reg('reqtexpan', app.ReqTextPanel);
// }}}


// {{{

app.ReqCommentAplPanel =  Ext.extend(Ext.Panel,{
    initComponent: function(){
      var config = {
         //region: 'west'
         height:50
         ,width:200
         ,autoScroll : 1
         ,split: true
        // ,id:id
         //,overflow:'auto'
         ,bodyStyle: {background: '#ffffff',
        	      padding: '7px'}
         ,tpl:new Ext.XTemplate('<font face="Verdana" size="1">{apl_user_internal}</font>')
      };
           Ext.apply(this, Ext.apply(this.initialConfig, config));
           app.ReqCommentAplPanel.superclass.initComponent.apply(this, arguments);


   } // eo function initComponent

});
Ext.reg('reqCommentAplPan', app.ReqCommentAplPanel);
// }}}


// {{{

app.ReqFilesPanel =  Ext.extend(Ext.Panel,{
    initComponent: function(){
      var config = {
         //region: 'west'
         height:50
         ,width:200
         ,autoScroll : 1
         ,split: true
        // ,id:id
         //,overflow:'auto'
         ,bodyStyle: {background: '#ffffff',
        	      padding: '7px'}
         ,tpl:new Ext.XTemplate('<font face="Verdana" size="1">{apl_user_email}</font>')
      };
           Ext.apply(this, Ext.apply(this.initialConfig, config));
           app.ReqFilesPanel.superclass.initComponent.apply(this, arguments);


   } // eo function initComponent

});
Ext.reg('reqFilesPan', app.ReqFilesPanel);
// }}}


// {{{

app.UniversalTab =  Ext.extend(
    Ext.Panel,{
        initComponent: function(){

            var config = {
                   xtype: 'panel',
                    //title: title,
                    autoScroll : 1,
                    overflow:'auto',
                   // frame: true,
                   layout: 'border',
                    
                    //height:680,
                    //id: 'tbAllReqITTab',
                    items: [
                        //new MyObservableSingleton(store_j,AllITColumns)
                        {
                         xtype:'univgrid'
                         ,store: store_j
                        ,cm:  AllITColumns
                         }
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

                            ,items : [ {
                                            xtype: 'reqtexpan'
                                    //        ,id:'reqText'
                                            ,region: 'west'
                                        //    ,scope:this
                                            //,html: "west blanc"
                                        }
                                    ,
                                    {region: 'center',
                                      xtype: 'tabpanel',
                                      title: 'Информация',
                                      width:200,
                                      split: true,
                                      activeTab: 0,
                                      items : [
                                         // pnURComent
                                          {
                                            title: 'Информация'
                                            ,xtype: 'reqCommentAplPan'
                                            
                                        }
                                      ,{title: 'Информация File'
                                            ,xtype: 'reqFilesPan'
                                            
                                        }
                                  ]
                                 }
                                   ]
                              }

                       // eof region: 'south'
                     ]
            }; // eo config object
            

            // Применяем config

            Ext.apply(this, Ext.apply(this.initialConfig, config));

            
            app.UniversalTab.superclass.initComponent.apply(this, arguments);
            /**
             *ВНИМАНИЕ!!!
             *Зубодробильный код 
             **/
            /*обращение к панелям по их айтем индексу */
            var UniversalGrid = this.items.itemAt(0);
         
            var additionalPanel= this.items.itemAt(1);
            /*Здесь переход на второй уровень иерархии индексов,
             *так как панель текста коментариев находиться в в панеле ЮГ */
            var SouthRegion = this.items.itemAt(2);
            var reqTextPanel  = SouthRegion.items.itemAt(0);
            /*Переход на третий уровень иерархии, 
             *так как вкладки находятся в панеле ЦЕНТР*/
            var CommentFilesPanel = SouthRegion.items.itemAt(1);
            var CommentApl = CommentFilesPanel.items.itemAt(0);
            var FilePan    = CommentFilesPanel.items.itemAt(1);
            /*Конец
             *Зубодробильный код.
             **/
            
            UniversalGrid.on({
			 scope:this
			,render:function() {
				UniversalGrid.getSelectionModel().on('rowselect', function(sm, rowIdx, r) {
                                    OverwritePanels(r.data);
				});
                          
                              }
                         //,btnSearchClick :function(){  Ext.Msg.alert('test','tbclick1')}
                         
		});

                        //tbSer.handler.call(Ext.Msg.alert('test','tbclick1'));

//additionalPanel.relayEvents(this.UniversalGrid, ['srchClick']);
            //app.ExampleBus.on('message', function(messag){Ext.Msg.alert('app.ExampleBus','test '+messag)});
       

            function OverwritePanels (data){
               additionalPanel.tpl.overwrite(additionalPanel.body, data);
               reqTextPanel.tpl.overwrite(reqTextPanel.body, data);
               
               CommentApl.tpl.overwrite(CommentApl.body, data);
               
               FilePan.tpl.overwrite(FilePan.body, data);

            
            }
            

    } // e/o function initComponent
//    ,afterRender:function(){
//        app.UniversalTab.superclass.afterRender.apply(this, arguments);
//        Ext.util.Observable.capture(app.exGridTbar, function(eventName)
//         {
//             Ext.Msg.alert('test',eventName)
//
//           //this.items.itemAt(1).tpl.overwrite(additionalPanel.body, eventName);
//
//        });
//
//    }

 });
Ext.reg('univtab', app.UniversalTab);
// }}}

// {{{

app.RootTab =  Ext.extend(
    Ext.TabPanel,{


        initComponent: function(){

            var config = {
                plain:true
                ,activeTab: 0
                ,defaults:{
                    autoScroll: true
                }
                 /*,stateEvents:['tabchange']
                ,getState:function() {
                            return {
                            activeTab:this.items.indexOf(this.getActiveTab())
                   };
                 }*/
                ,items:[
                    {xtype:'univtab'
                     ,title:'new '
                     //,layout: 'border'
                     
                    },
                    {xtype:'univtab'
                     ,title:'new alll'
                     //,layout: 'border'

                    },
                    
                    
                    
                /* ,{title:'new all'
                     ,xtype:'univgrid'
                     ,store: store_j
                     ,cm: AllITColumns}
                    */

                ]
            }; // eo config object

            // Применяем config
            Ext.apply(this, Ext.apply(this.initialConfig, config));

            app.RootTab.superclass.initComponent.call(this, arguments);
            this.on('tabchange', function(){
                gCurActiveTab(this.items.indexOf(this.getActiveTab()));
            //    Ext.Msg.alert('test','tbclick '+this.items.indexOf(this.getActiveTab()))
            })

            


        } // e/o function initComponent
        

 });
Ext.reg('roottab', app.RootTab);
// }}}



//{{ appl
app.applTab = function(){

   var grid;
   var rootPan;
   var buildApplTab = function(){
       var gridParams = Ext.apply({
            store: store_j
           ,cm:  AllITColumns
       })

     var MyGrid = new app.UniversalGrid(
       Ext.apply(gridParams)
      );

    var myPan  = new Ext.Panel(Ext.apply({
      title : "Content",
      region : "center",
      frame : true
    } ));


    rootPan =  new Ext.Panel(Ext.apply({
         autoScroll : 1
        ,overflow:'auto'
        ,layout: 'border'
        ,items: [
          MyGrid, myPan  
        ]
      }));

     rootPan.relayEvents(MyGrid, ['btnSearchClick']);

     rootPan.on({'btnSearchClick':function(){
               myPan.body.update("Hello World... Loading Text from Leaf: ");
              }
     })
   }; //end buildApplTab



    // Public Area
  return {
    init : function() {
     this.curFunc = this.name + ".init()";
     buildApplTab();
    }
   };// End Public Return
}();



//}}





        Ext.state.Manager.setProvider(new Ext.state.CookieProvider());

        Ext.BLANK_IMAGE_URL = '../js/ext-3.2.1/resources/images/default/s.gif';





        Ext.onReady(function(){




        var tb = new Ext.Toolbar();
                var menu = new Ext.menu.Menu({
                        id: 'mainMenu',
                        style: {
                            overflow: 'visible'     // For the Combo popup
                        },
                        items: [
                            {
                                text: 'Главная'
                                //,handler: onMainClick

                            },
                            {
                                text: 'Шаблоны'
                                //,handler: onTemplateClick

                            }
                        ]
                    });


            tb.add({
                text:'Задачи',
                iconCls: 'bmenu',  // <-- icon
                menu: menu  // assign menu by instance
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
                           ,xtype :'roottab'



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

