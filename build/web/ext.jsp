<%-- 
    Document   : ext
    Created on : 19.08.2010, 11:26:30
    Author     : shavrak.ka
--%>

<%@page contentType="text/html" pageEncoding="UTF-8"%>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN"
"http://www.w3.org/TR/html4/loose.dtd">

<html>
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
        <title>ext</title>

        <!-- ** CSS ** -->
        <!-- base library -->
        <link rel="stylesheet" type="text/css" href="js/ext-3.2.1/resources/css/ext-all.css" />

        <!-- overrides to base library -->


        <!-- ** Javascript ** -->
        <!-- base library -->
        <script type="text/javascript" src="js/ext-3.2.1/adapter/ext/ext-base.js"></script>
        <script type="text/javascript" src="js/ext-3.2.1/ext-all-debug.js"></script>



  <script type="text/javascript">
           Ext.onReady(function(){

    // setup an App namespace
    // This is done to prevent collisions in the global namespace
    Ext.ns('App');

    // NOTE: This is an example showing simple state management. During development,
    // it is generally best to disable state management as dynamically-generated ids
    // can change across page loads, leading to unpredictable results.  The developer
    // should ensure that stable state ids are set for stateful components in real apps.
   Ext.state.Manager.setProvider(new Ext.state.CookieProvider());

var myData = [
        ['3m Co',71.72,0.02,0.03,'9/1 12:00am'],
        ['Alcoa Inc',29.01,0.42,1.47,'9/1 12:00am'],
        ['Altria Group Inc',83.81,0.28,0.34,'9/1 12:00am'],
        ['American Express Company',52.55,0.01,0.02,'9/1 12:00am'],
        ['American International Group, Inc.',64.13,0.31,0.49,'9/1 12:00am'],
        ['AT&T Inc.',31.61,-0.48,-1.54,'9/1 12:00am'],
        ['Boeing Co.',75.43,0.53,0.71,'9/1 12:00am'],
        ['Caterpillar Inc.',67.27,0.92,1.39,'9/1 12:00am'],
        ['Citigroup, Inc.',49.37,0.02,0.04,'9/1 12:00am'],
        ['E.I. du Pont de Nemours and Company',40.48,0.51,1.28,'9/1 12:00am'],
        ['Exxon Mobil Corp',68.1,-0.43,-0.64,'9/1 12:00am'],
        ['General Electric Company',34.14,-0.08,-0.23,'9/1 12:00am'],
        ['General Motors Corporation',30.27,1.09,3.74,'9/1 12:00am'],
        ['Hewlett-Packard Co.',36.53,-0.03,-0.08,'9/1 12:00am'],
        ['Honeywell Intl Inc',38.77,0.05,0.13,'9/1 12:00am'],
        ['Intel Corporation',19.88,0.31,1.58,'9/1 12:00am'],
        ['International Business Machines',81.41,0.44,0.54,'9/1 12:00am'],
        ['Johnson & Johnson',64.72,0.06,0.09,'9/1 12:00am'],
        ['JP Morgan & Chase & Co',45.73,0.07,0.15,'9/1 12:00am'],
        ['McDonald\'s Corporation',36.76,0.86,2.40,'9/1 12:00am'],
        ['Merck & Co., Inc.',40.96,0.41,1.01,'9/1 12:00am'],
        ['Microsoft Corporation',25.84,0.14,0.54,'9/1 12:00am'],
        ['Pfizer Inc',27.96,0.4,1.45,'9/1 12:00am'],
        ['The Coca-Cola Company',45.07,0.26,0.58,'9/1 12:00am'],
        ['The Home Depot, Inc.',34.64,0.35,1.02,'9/1 12:00am'],
        ['The Procter & Gamble Company',61.91,0.01,0.02,'9/1 12:00am'],
        ['United Technologies Corporation',63.26,0.55,0.88,'9/1 12:00am'],
        ['Verizon Communications',35.57,0.39,1.11,'9/1 12:00am'],
        ['Wal-Mart Stores, Inc.',45.45,0.73,1.63,'9/1 12:00am']
    ];





 // The action
    var action = new Ext.Action({
        text: 'Добавить файл',
        handler: function(){
            Ext.Msg.alert('Загрузка!', 'Файл загружен');
        },
        iconCls: 'blist'
    });


      var panel = new Ext.Panel({
                title: 'Файлы',
                width:600,
                height:300,
                
                bodyStyle: 'padding:10px;',     // lazy inline style
                 tbar: [
                    action
                ]
            });

       var  CommentPanel = new Ext.Panel({
            title: 'Коментарий',
            width: 500,
            split: true,
            tplMarkup: [
 		   '{Com}<br/>'
	      ],
            startingMarkup: 'Please select a request',
                // override initComponent to create and compile the template
                // apply styles to the body of the panel and initialize
                // html to startingMarkup
                initComponent: function() {
                    this.tpl = new Ext.Template(this.tplMarkup);
                    Ext.apply(this, {
                        bodyStyle: {
                            background: '#ffffff',
                            padding: '7px'
                        },
                        html: this.startingMarkup
                    });
                    // call the superclass's initComponent implementation
                   // CommentPanel.superclass.initComponent.call(this);
                },
                // add a method which updates the details
                updateDetail: function(data) {
                    this.tpl.overwrite(this.body,  {Com:data} );
                }
          
    });


       var  ProfilePanel = new Ext.Panel({
            title: 'Профиль',
            xtype: 'panel',
                        
            
            tplMarkup: [
 		   ' {Name}'
	      ],
            startingMarkup: 'Please select a request',
                // override initComponent to create and compile the template
                // apply styles to the body of the panel and initialize
                // html to startingMarkup
                initComponent: function() {
                    this.tpl = new Ext.Template(this.tplMarkup);
                    Ext.apply(this, {
                        bodyStyle: {
                            background: '#ffffff',
                            padding: '7px'
                        },
                        html: this.startingMarkup
                    });
                    // call the superclass's initComponent implementation
                   // CommentPanel.superclass.initComponent.call(this);
                },
                // add a method which updates the details
                updateDetail: function(data) {
                    
                    this.tpl.overwrite(this.body,  
                     {
                      Name:data
                      

                     } );
                }

    });

  // create the data store
    var store = new Ext.data.ArrayStore({
       url:"requests/getter_grid.jsp",
      fields: [
           {name: 'rid', type: 'float'},
           {name: 'aplicant_user'},
           {name: 'resp_user'},
           {name: 'name'},
           {name: 'Apl_User_Id'},
           {name: 'dt_create', type: 'date', dateFormat: 'd/m/Y'}
           //{name: 'lastChange', type: 'date', dateFormat: 'n/j h:ia'}
        ]
    });



     // example of custom renderer function
    function change(val){
        if(val > 0){
            return '<span style="color:green;">' + val + '</span>';
        }else if(val < 0){
            return '<span style="color:red;">' + val + '</span>';
        }
        return val;
    }

    // example of custom renderer function
    function pctChange(val){
        if(val > 0){
            return '<span style="color:green;">' + val + '%</span>';
        }else if(val < 0){
            return '<span style="color:red;">' + val + '%</span>';
        }
        return val;
    }


        function title_respU_D(val, x, store){
          return '<b>'+val+'</b> ('+store.data.name+')';
        }


        

    // create the data store
    
    var store1 = new Ext.data.Store({
        //proxy: new Ext.ux.data.PagingMemoryProxy(myData),
        remoteSort:true,
        sortInfo: {field:'price', direction:'ASC'},
        reader: new Ext.data.ArrayReader({
            fields: [
               {name: 'company'},
               {name: 'price', type: 'float'},
               {name: 'change', type: 'float'},
               {name: 'pctChange', type: 'float'},
               {name: 'lastChange', type: 'date'}
               
            ]
        })
    });

function saveThePresident(oGrid_event){
    
    Ext.Msg.alert('Error',oGrid_event.record.data.aplicant_user);
}
     


   // create the Grid
    var grid3 = new Ext.grid.GridPanel({
        store: store1,
        columns: [
            {id:'company',header: "Company", width: 160, sortable: true, dataIndex: 'company'},
            {header: "Price", width: 75, sortable: true, renderer: 'usMoney', dataIndex: 'price'},
            {header: "Change", width: 75, sortable: true, renderer: change, dataIndex: 'change'},
            {header: "% Change", width: 75, sortable: true, renderer: pctChange, dataIndex: 'pctChange'},
            {header: "Last Updated", width: 85, sortable: true, renderer: Ext.util.Format.dateRenderer('m/d/Y'), dataIndex: 'lastChange'},
            {
               header: 'Party',
               dataIndex: 'PartyName',
               width: 150,
               editor: new Ext.form.ComboBox({
                     typeAhead: true,
                     triggerAction: 'all',
                     store:new Ext.data.SimpleStore({
                       fields:['partyValue', 'partyName'],
                       data: [['1','No Party'],['2','Federalist'],['3','Democratic-Republican'],['4','Democratic'],['5','Whig'],['6','Republican']]
                            }),
                     mode: 'local',
                     displayField: 'partyName',
                     valueField: 'partyValue',
                     listClass: 'x-combo-list-small'
      })

            }
        ],
        stripeRows: true,
        autoExpandColumn: 'company',
        height:320,
        width:600,
        frame:true,
        title:'Все прекрасные заявки',
/*
        plugins: new Ext.ux.PanelResizer({
            minHeight: 100
        }),*/

        bbar: new Ext.PagingToolbar({
            pageSize: 10,
            store: store1,
            displayInfo: true
            //,

            //plugins: new Ext.ux.ProgressBarPager()
        })
    });
    //store1.load({params:{start:0, limit:10}});
    // manually load local data
    store1.loadData(myData, {params:{start:0, limit:10}});


   var title_edit = new Ext.form.TextField();
   var director_edit = new Ext.form.TextField({vtype: 'name'});
   var release_edit = new Ext.form.DateField({
      format: 'd/m/Y'
    });
    //var grid = new Ext.grid.GridPanel({
    var grid = new Ext.grid.EditorGridPanel({
        store: store,
        clickstoEdit: 1,
        columns: [
            {id:'rid',header: 'ID Заявки', width: 50, renderer: 'rid', sortable: true, dataIndex: 'rid'  },
            {header: 'Apl_User_Id ', width: 50, renderer: 'Apl_User_Id', sortable: true, dataIndex: 'Apl_User_Id'  },
            {header: 'Заявитель', width: 175, sortable: true, renderer:  'aplicant_user', dataIndex: 'aplicant_user'},
            {header: 'Ответсвенный', width: 175, sortable: true, renderer: title_respU_D, dataIndex: 'resp_user'},
            {header: 'Дата заявки', width: 175, sortable: true, 
                  renderer: Ext.util.Format.dateRenderer('d/m/Y'),
                  //renderer: 'dt_create',
                  dataIndex: 'dt_create',
                  editor:release_edit}

        ],
        sm: new Ext.grid.RowSelectionModel({
           singleSelect: true,
         /* listeners: {
             rowselect: {
               fn: function(sm,index,record) {
                  var conn = new Ext.data.Connection();
              
                        conn.request({
                          url: 'requests/getter_comment.jsp',
                          params: {
                             reqid: record.data.rid
                          },
                          success: function(resp,opt) {
                             var Com = Ext.util.JSON.decode(
                               resp.responseText
                             );
                              CommentPanel.updateDetail(Com);
                          },
                          failure: function(resp,opt) {
                             Ext.Msg.alert('Error','Ошибка связи');
                          }
                        });

//                 Ext.Msg.alert('You Selected',record.data.rid);
               }
               
             }
            
           }*/
           listeners:{
            rowselect: {
             fn: function(sm,index,record) {
                var conn1 = new Ext.data.Connection();
                        conn1.request({
                          url: 'requests/getter_profile.jsp',
                          params: {

                             reqid: record.data.rid
                          },
                          success: function(resp,opt) {
                             var Com1 = Ext.util.JSON.decode(
                               resp.responseText
                             );
                              //Ext.Msg.alert('Error',record.Apl_User_Id)
                              ProfilePanel.updateDetail(Com1);
                          },
                          failure: function(resp,opt) {
                             Ext.Msg.alert('Error','Ошибка связи');
                          }
                        })

               }
             }
           }
        }),
        listeners: {
            afteredit: function(e){
              if (e.field == 'aplicant_user' && e.value == 'Mel Gibson'){
                Ext.Msg.alert('Error','Mel Gibson movies not allowed');
                e.record.reject();
              }else{
                e.record.commit();
              }
            }
         },

        autoExpandColumn: 'rid',
        height: 350,
        width: 800,
        title: 'Заявки',
        // config options for stateful behavior
        stateful: true,
        stateId: 'grid'

    });
    store.load();

       grid.on('afteredit', saveThePresident);

    


  /*var reqGrid = new App.MyBeautifull({
      itemId: 'reqGrid'
	});
*/


 var store = new Ext.data.ArrayStore({
        fields: ['month', 'hits'],
        data: generateData()
    });


function generateData(){
    var data = [];
    for(var i = 0; i < 12; ++i){
        data.push([Date.monthNames[i], (Math.floor(Math.random() *  11) + 1) * 100]);
    }
    return data;
}


var storeC = new Ext.data.ArrayStore({
        fields: ['month', 'hits'],
        data: generateData()
    });


   var Chartpan = new Ext.Panel({
        width: 700,
        height: 400,
        //renderTo: document.body,
        title: 'Chart',
        tbar: [{
            text: 'Загрузить данные',
            handler: function(){
                store.loadData(generateData());
            }
        }],
        items: {
            xtype: 'columnchart',
            store: storeC,
            yField: 'hits',
	        url: 'js/ext-3.2.1/resources/charts.swf',
            xField: 'month',
            xAxis: new Ext.chart.CategoryAxis({
                title: 'Месяц'
            }),
            yAxis: new Ext.chart.NumericAxis({
                title: 'Заявки'
            }),
            extraStyle: {
               xAxis: {
                    labelRotation: -90
                } 
            }
        }});


    var viewport = new Ext.Viewport({
          layout: 'border',
          renderTo: Ext.getBody(),
          items: [{
             region: 'north',
             xtype: 'panel',
             height:50,
             html: 'North'
          },
          /*{
              region: 'west',
              xtype: 'panel',
              split: true,
              collapsible: true,
              collapseMode: 'mini',
              title: 'Some Info',
              bodyStyle:'padding:5px;',
              width: 200,
              minSize: 200,
              html: 'West'
          },

          */{
             region: 'center',
             items: [{
                     region: 'North',
                     height: 400,
                     split: true,
                     xtype: 'tabpanel',
                     activeTab: 0,
                     items: [ grid,
                             
                              grid3,
                              {
                             title: 'Резервная станция',
                             html : '<h1>hi</h1>'
                            },
                            Chartpan
                           ]

                    },
                     
                     
                     {
                     xtype: 'panel',
                      title: 'Дополнительные атрибуты',
                     html : '<b>Догвор :</b> Поиск арендатора нежилого помещения <br><b>Клиент :</b> Бенденр Родригез <br><b>Объект :</b> Кукуево<br> <br>'
                     }
                    
                   ]



            }
             /*region: 'east',
             xtype: 'panel',
             collapsible: true,
             collapseMode: 'mini',
             minSize: 200,
             split: true,
             width: 200,
             */
            
             //html: '<h2>Профиль заявителя</h2><b>ФИО :</b> Белов Сигизмундт Мэлсович <br><b>Тел внутр :</b> 777 <br><b>Тел моб :</b> 777 77 77 <br>'
         ,
          /*{
             region: 'south',
             xtype: 'panel',
             height:250,
             html: 'South1'



          }
          */
          
          {
           region: 'south',
           xtype: 'panel',
           height:250,
           layout: 'border',
           border: false,
           items: [
           {
                 title: 'История',
                 html : 'Вся история заявки',
                 region: 'west'
              },
         
          {
             region: 'center',
              xtype: 'tabpanel',
                     activeTab: 0,
                     items: [
                             panel,
                             CommentPanel,
                             ProfilePanel,
                             {
                             title: 'История изменения заявки',
                             html : 'Вся история заявки'
                            }
                           ]
             
          }]
        }
        



          ]
        });

        //viewport.render('viewport-example');
});
        </script>

    </head>
    <body >
       
    </body>
</html>
