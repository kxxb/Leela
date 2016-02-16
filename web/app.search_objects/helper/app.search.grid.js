/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

Ext.ns("app");

var xg = Ext.grid;


 function setColorCallGrid (grav){
      var cls ='';
      switch (grav) {
         case 'Важный' :
            cls = 'grid-row-Light-Blue'
            break;
         

        }//end switch
      return cls;
  }

function title_broker(val, x, store_j){
          return '<b>'+val+'</b> ('+ store_j.data.transfer_user_dep_name +')';
        }

function call_gravity_color(val, x, store_j){
       var res = val;
          if (val =='Важный') {
            res =  '<font color ="red"><b>'+val+'</b></font>';
          }
          if (val =='Не важный') {
            res =  '<font color ="green">'+val+'</font>';
          }
          return res;
        }

function title_result(val, x, store){
         var res='Пассив';
         if (val==1) {res='Актив'} else if (val==-1) {res='Не обработан'} ;
          return res;
        }



app.SearchGrid =  Ext.extend(xg.EditorGridPanel,{
    initComponent: function(){
        var config ={

                 store:app_store_search
                ,height:600
                ,cm:Search_cm
                //,cm:Calls_cm_edit
                ,view: new Ext.grid.GridView({
                    forceFit:true,
                    getRowClass : function (row, index) {
                      var cls = '';
                      var data = row.data;
                      cls = setColorCallGrid (data.CALL_GRAVITY);
                      return cls;
                   }
                })
                ,selModel: new Ext.grid.RowSelectionModel({
                  singleSelect:false
                })
                
                ,loadMask:true
                ,split: true
                ,tbar:[
                    '-'
                    ,'Площадь от: ', ' ',
                     new Ext.form.TextField({
                        fieldLabel:'Поиск'
                        ,width:50
                        ,value:20
                        ,enableKeyEvents:true
                        ,listeners: {
                          keyup: function(t,e){ 
                            f_price_from('area_from='+this.getValue())
                          }
                        }
                       })
                    ,'до: ', ' ',
                     new Ext.form.TextField({
                        fieldLabel:'Поиск'
                        ,width:50
                        ,value:200
                        ,enableKeyEvents:true
                        ,listeners: {
                          keyup: function(t,e){ 
                            f_price_to('area_to='+this.getValue())
                          }
                        }
                       })
                    ,'-'
                    ,'Цена от: ', ' ',
                     new Ext.form.TextField({
                        fieldLabel:'Поиск'
                        ,width:50
                        ,value:0
                        ,enableKeyEvents:true
                        ,listeners: {
                          keyup: function(t,e){ 
                             QuicSearch('price_from='+this.getValue())
                          }
                        }
                       })
                    ,'до: ', ' ',
                     new Ext.form.TextField({
                        fieldLabel:'Поиск'
                        ,width:50
                        ,value:1000
                        ,enableKeyEvents:true
                        ,listeners: {
                          keyup: function(t,e){ 
                            QuicSearch('price_to='+this.getValue())
                          }
                        }
                       })
                    ,'-'
                    ,'Улица ', ' ',
                     new Ext.form.ComboBox({
                        
                                //the width of this field in the HBox layout is set directly
                                //the other 2 items are given flex: 1, so will share the rest of the space
                                width:          250,
                                //xtype:          'combo',
                                mode:           'local',
                                value:          'Вавилова',
                                triggerAction:  'all',
                                loadingText: 'Поиск...',
                                forceSelection: true,
                                editable:       true,
                                minChars: 3,
                                displayField:   'name',
                                valueField:     'code',
                                store:  kladr_store
                                 ,listeners: {
                                      keyup: function(t,e){ 
                                        //Ext.Msg.alert('street ', this.getValue());  
                                        f_street(this.getValue())
                                      }
                               }
                            
                       })
                    ,'-'
                    ,'Метро ', ' ',
                     new Ext.form.ComboBox({
                        
                                //the width of this field in the HBox layout is set directly
                                //the other 2 items are given flex: 1, so will share the rest of the space
                                width:          250,
                                //xtype:          'combo',
                                mode:           'remote',
                                value:          '1',
                                triggerAction:  'all',
                                forceSelection: true,
                                editable:       true,
                                fieldLabel:     'Title',
                                name:           'title',
                                hiddenName:     'title',
                                displayField:   'station_name',
                                valueField:     'id',
                                store:          metro_store
                                ,listeners: {
                                      keyup: function(t,e){ 
                                       
                                        f_metro(this.getValue())
                                      }
                               }
                                
                            
                       })
                    ,'-'
                ]
              
            
            };


     // apply config

            
                /*брокер*/
               Ext.apply(this, Ext.apply(this.initialConfig, config));
            


     this.bbar = new Ext.PagingToolbar({
                    pageSize: 15
                    ,store: this.store
                    ,displayInfo: true
                    ,displayMsg: 'Показанно звонков {0} - {1} из {2}'
                    ,emptyMsg: "Нет звонков"

                 });
                 
   
    app.SearchGrid.superclass.initComponent.apply(this, arguments);


    app.SearchGrid.superclass.initComponent.apply(this, arguments);
     // load the store at the latest possible moment
//        this.on({
//            afterlayout:{
//                scope:this,
//                single:true,
//                fn:function() {
//
//                    this.store.load({
//
//                        params:{
//                             start:0
//                            ,limit:15
//                            
//
//                        }
//                    });
//               }
//
//        }
//    });
    
    var street='0';
    //var metro='1,2,4';
    
    var price_from=20;
    var price_to=200;
    
    function f_street(param){
        street = param;
        f(); 
//         app_store_search.reload(
//                    {params: 
//                          {
//                           search_param:'street='+street+';metroid='+metro+';', 
//                           Dep_id:gUserDepId,
//                           user_id:gUserId
//                           }
//                       })  
        }
        
    function f_metro(param){
        metro = param;
       // Ext.Msg.alert('gridCombo ', 'cheked'+param);
       // f();   
        
        app_store_search.reload(
                    {params: 
                          {
                           search_param:'metroid='+metro+';', 
                           Dep_id:gUserDepId,
                           user_id:gUserId
                           }
                       }) 
        }    
    
    function f_price_from(param){
        price_from = param;
        f();   
        }
    function f_price_to(param){
        price_to = param;
        f();
        }        
    var v_search_param = 'metro='+metro+';street='+street+';price_from='+price_from+'; price_to='+price_to+';';
    function f(){
          app_store_search.reload(
                    {params: 
                          {
                           search_param:v_search_param, 
                           limit:5, start:0, 
                           Dep_id:gUserDepId,
                           user_id:gUserId
                           }
                       })  

           //Ext.Msg.alert('QuicSearch', 'price_from='+price_from+' price_to='+price_to);
           //Ext.Msg.alert('gridCombo ', 'cheked'+p_transfer_id);
          }
          
          
   } // eo function initComponent

});
Ext.reg('searchsgrid', app.SearchGrid);


//}}}



 Search_cm = new xg.ColumnModel( [
                   {
                    header: 'Лот',
                    readOnly: true,
                    dataIndex: 'lot',
                    width: 15,
                    sortable: true,
                    hidden: false
                  }
                  ,
                  {
                    header: 'Лот старый',
                    readOnly: true,
                    dataIndex: 'old_lot',
                    width: 20,
                    sortable: true,
                    hidden: false
                  }
                  ,
                   {
                    header: 'Название',
                    readOnly: true,
                    dataIndex: 'object_title',
                    width: 90,
                    sortable: true,
                    hidden: false
                  }
                  ,
                    {
                    header: 'Дата объекта',
                    readOnly: true,
                    dataIndex: 'object_date',
                    renderer: Ext.util.Format.dateRenderer('d.m.Y H:i'),
                    width: 50,
                    sortable: true,
                    hidden: false
                  }
                  ,{
                    header: 'Метро',
                    dataIndex: 'station_name',
                    sortable: true,
                    width: 75
                  }
                  
                  ,{
                    header: 'Минут пешком',
                    dataIndex: 'walk_metro_minutes',
                    sortable: true,
                    width: 45
                  }
                 
                  ,{
                    header: 'Минут на авто',
                    dataIndex: 'auto_metro_minutes',
                    sortable: true,
                    width: 45
                  }
                  ,{
                    header: 'Улица',
                    dataIndex: 'street_name',
                    sortable: true,
                    width: 50
                  },
                  { header: 'Номер дома',
                    dataIndex: 'house_numb',
                    sortable: true
                    ,width: 50}
                 ,{
                    header: 'Направление',
                    dataIndex: 'direction_name',
                     hidden: false,
                    width: 75
                  }
]);





app_store_search = new Ext.data.JsonStore({
        root: 'results',
        //idProperty: 'call_id',
        totalProperty: 'totalCount',
        baseParams: { start:0
                     ,limit:17
                    },
        fields: [
                {name: 'OBJ_ID', mapping:'OBJ_ID', type: 'string'},
                {name: 'object_title', mapping:'OBJECT_TITLE', type: 'string'},
                {name: 'obj_status', mapping:'OBJ_STATUS', type: 'string'},
                {name: 'project_cost', mapping:'PROJECT_COST', type: 'string'},
                {name: 'nds', mapping:'NDS', type: 'string'},
                {name: 'land_info', mapping:'LAND_INFO', type: 'string'},
                {name: 'object_owner', mapping:'OBJECT_OWNER', type: 'string'},
                
                {name: 'agency', mapping:'AGENCY', type: 'string'},
                {name: 'elabor', mapping:'ELABOR', type: 'string'},
                {name: 'Priority', mapping:'PRIORITY', type: 'string'},
                {name: 'best_offer', mapping:'BEST_OFFER', type: 'string'},
                {name: 'lot', mapping:'LOT', type: 'string'},
                {name: 'old_lot', mapping:'OLD_LOT', type: 'string'},
                {name: 'old_obj_id', mapping:'OLD_OBJ_ID', type: 'string'},
                
                
                {name: 'object_date', mapping:'OBJECT_DATE', type: 'date', dateFormat: 'd/m/Y H:i'},
                
                {name: 'contract_work', mapping:'CONTRACT_WORK', type: 'string'},
                {name: 'active_passive', mapping:'ACTIVE_PASSIVE', type: 'string'},
                {name: 'proposed', mapping:'PROPOSED', type: 'string'},
                {name: 'for_lease', mapping:'FOR_LEASE', type: 'string'},
                {name: 'for_sale', mapping:'FOR_SALE', type: 'string'},
                {name: 'for_sublease',mapping:'FOR_SUBLEASE', type: 'string'},
                {name: 'for_lease_sale', mapping:'FOR_LEASE_SALE', type: 'string'},
                {name: 'developer_name',mapping:'DEVELOPER_NAME', type: 'string'},
                {name: 'dev_contact',mapping:'DEV_CONTACT', type: 'string'},
                {name: 'dev_tel',mapping:'DEV_TEL', type: 'string'},
                {name: 'investor_name',mapping:'INVESTOR_NAME', type: 'string'},
                {name: 'location_name',mapping:'LOCATION_NAME', type: 'string'},
                {name: 'direction_name',mapping:'DIRECTION_NAME', type: 'string'},
                {name: 'bis_district',mapping:'BIS_DISTRICT', type: 'string'},
                
                {name: 'station_name',mapping:'STATION_NAME', type: 'string'},
                {name: 'walk_metro_minutes',mapping:'WALK_METRO_MINUTES', type: 'string'},
                {name: 'auto_metro_minutes',mapping:'AUTO_METRO_MINUTES', type: 'string'},
                {name: 'outside_mkad',mapping:'OUTSIDE_MKAD', type: 'string'},
                {name: 'discripton_of_location',mapping:'DISCRIPTON_OF_LOCATION', type: 'string'},
                
                {name: 'street_name',mapping:'STREET_NAME', type: 'string'},
                {name: 'house_numb',mapping:'HOUSE_NUMB', type: 'string'}
                

        ],

        // load using script tags for cross domain, if the data in on the same domain as
        // this page, an HttpProxy would be better
        proxy: new Ext.data.ScriptTagProxy({
            //url: 'in.jsp'
            url: '../stores/object_search/GetObjects.jsp'
        })
    });
  
  
  kladr_store = new Ext.data.JsonStore({
        root: 'results',
        //idProperty: 'call_id',
        
        fields: [
                {name: 'code', mapping:'code', type: 'string'},
                {name: 'name', mapping:'name', type: 'string'}
        ],

        // load using script tags for cross domain, if the data in on the same domain as
        // this page, an HttpProxy would be better
        proxy: new Ext.data.ScriptTagProxy({
            //url: 'in.jsp'
            url: '../stores/object_search/kladr_select.jsp'
        })
    });
  kladr_store.load();
  
  metro_store = new Ext.data.JsonStore({
        root: 'results',
        //idProperty: 'call_id',
        
        fields: [
                {name: 'id', mapping:'id', type: 'string'},
                {name: 'station_name', mapping:'station_name', type: 'string'}
        ],

        // load using script tags for cross domain, if the data in on the same domain as
        // this page, an HttpProxy would be better
        proxy: new Ext.data.ScriptTagProxy({
            //url: 'in.jsp'
            url: '../stores/object_search/metro_select.jsp'
        })
    });
  metro_store.load();
  
  
   room_store = new Ext.data.JsonStore({
        root: 'results',
        //idProperty: 'call_id',
        
        fields: [
                {name: 'CONTRACT_FORM_NAME', mapping:'CONTRACT_FORM_NAME', type: 'string'},
                {name: 'STATUS_NAME', mapping:'STATUS_NAME', type: 'string'},
                {name: 'ID', mapping:'ID', type: 'string'},
                {name: 'RE_OBJECTS_OLD_ID', mapping:'RE_OBJECTS_OLD_ID', type: 'string'},
                {name: 'BUILDING', mapping:'BUILDING', type: 'string'},
                {name: 'FLOOR', mapping:'FLOOR', type: 'string'},
                {name: 'CONDITION', mapping:'CONDITION', type: 'string'},
                {name: 'READY_ID', mapping:'READY_ID', type: 'string'},
                {name: 'LEASE_RATE', mapping:'LEASE_RATE', type: 'string'},
                {name: 'PRICE_SQ_M', mapping:'PRICE_SQ_M', type: 'string'},
                {name: 'CONTRACT_FORM', mapping:'CONTRACT_FORM', type: 'string'},
                {name: 'STATUS', mapping:'STATUS', type: 'string'},
                {name: 'BROKER', mapping:'BROKER', type: 'string'},
                {name: 'AREA_SQ_M', mapping:'AREA_SQ_M', type: 'string'},
                {name: 'OBJ_PARENT_ID', mapping:'OBJ_PARENT_ID', type: 'string'},
                {name: 'AREA_SQ_M_NUM', mapping:'AREA_SQ_M_NUM', type: 'string'},
                {name: 'PRICE_SQ_M_NUM', mapping:'PRICE_SQ_M_NUM', type: 'string'},
                {name: 'RE_OBJECTS_ID', mapping:'RE_OBJECTS_ID', type: 'string'},
        ],

        // load using script tags for cross domain, if the data in on the same domain as
        // this page, an HttpProxy would be better
        proxy: new Ext.data.ScriptTagProxy({
            //url: 'in.jsp'
            url: '../stores/object_search/GetObjects_rooms.jsp'
        })
    });
    
    room_cm = new xg.ColumnModel( [
                   {
                    header: 'Договор',
                    readOnly: true,
                    dataIndex: 'CONTRACT_FORM_NAME',
                    width: 75,
                    sortable: true,
                    hidden: false
                  }
                  ,
                  {
                    header: 'Статус',
                    readOnly: true,
                    dataIndex: 'STATUS_NAME',
                    width: 75,
                    sortable: true,
                    hidden: false
                  }
                  ,
                   {
                    header: 'Цена за кв. м',
                    readOnly: true,
                    dataIndex: 'PRICE_SQ_M',
                    width: 100,
                    sortable: true,
                    hidden: false
                  }
                  
                  ,{
                    header: 'Площадь',
                    dataIndex: 'AREA_SQ_M',
                    sortable: true,
                    width: 75
                  }
                  
                  ,{
                    header: 'Брокер',
                    dataIndex: 'BROKER',
                    sortable: true,
                    width: 170
                  }
                 
                  
]);



app.RoomGrid =  Ext.extend(xg.EditorGridPanel,{
    initComponent: function(){
        var config ={

                 store:room_store
                
                ,cm:room_cm
                ,selModel: new Ext.grid.RowSelectionModel({
                  singleSelect:false
                  })
                
                ,enableColLock:false
                ,loadMask:true
                ,split: true
                
              
            
            };
     Ext.apply(this, Ext.apply(this.initialConfig, config));
     this.bbar = new Ext.PagingToolbar({
                    pageSize: 15
                    ,store: this.store
                    ,displayInfo: true
                    ,displayMsg: 'Показанно  {0} - {1} из {2}'
                    ,emptyMsg: "Нет помещений"

                 });
                 
   
    app.RoomGrid.superclass.initComponent.apply(this, arguments);
    app.RoomGrid.superclass.initComponent.apply(this, arguments);
     // load the store at the latest possible moment
        this.on({
            afterlayout:{
                scope:this,
                single:true,
                fn:function() {

                    this.store.load({

                        params:{
                             start:0
                            ,limit:15
                            

                        }
                    });
               }

        }
    });
    
    
          
          
   } // eo function initComponent

});
Ext.reg('roomgrid', app.RoomGrid);