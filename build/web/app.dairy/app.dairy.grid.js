/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

Ext.ns("app");

var xg = Ext.grid;


//Ext.ux.GroupTabPanel.superclass.initComponent.call(this);
app.DairyGrid =  Ext.extend(xg.GridPanel,{
    initComponent: function(){
        var config ={
                 store:app_store_dairy
                ,cm:Dairy_cm
                ,height : 300
                ,viewConfig: {
                    forceFit:true
                }
                
                ,loadMask:true

             ,split: true
             ,tbar:[
                  '-'
                ,{
                 text: 'Добавить запись'
                 ,tooltip: 'Добавить запись'
                 ,iconCls:'silk-add'
                 ,handler: function(){
                     /*вызываю функцию(объект),
                      *у которой область видимости
                      *такая же что и у тулбара.
                      *То есть тулбар и функция находяться на одном уровне видимости
                      **/
                   gridAddBt.call()
                 }
              }
              ,'-']
            };

     // apply config
    Ext.apply(this, Ext.apply(this.initialConfig, config));

    this.bbar = new Ext.PagingToolbar({
                    pageSize: 25
                    ,store: this.store
                    ,displayInfo: true
                    ,displayMsg: 'Показанно записей {0} - {1} of {2}'
                    ,emptyMsg: "Нет записей"

                 });

    var gridAddBt = function(){
            /*Запускаю своё событие, от кнопки с тулбара*/
         this.fireEvent('addTbClick');
    }
     /*обязательно делегирую функцию(объект) на сам родительский грид
     *это необходимо, чтоб запустить событие от имени грида, и ловить его
     * уже в тех местах где присутствует грид
     **/
    gridAddBt = gridAddBt.createDelegate(this);
    app.DairyGrid.superclass.initComponent.apply(this, arguments);

// load the store at the latest possible moment
        this.on({
            afterlayout:{
                scope:this,
                single:true,
                fn:function() {

                    this.store.load({

                        params:{
                             start:0
                            ,limit:25
                            ,UserId: gUserId
                            ,UserDepId: gUserDepId
                            ,UserGroupId: gUserGroupId


                        }
                    });
               }

        }
    });

    
    
   } // eo function initComponent

});
Ext.reg('dairygrid', app.DairyGrid);

//}}}


var Dairy_cm = new xg.ColumnModel( [

                    {
                    header: '#',
                    dataIndex: 'id',
                    sortable: true,
                    width: 15
                  }
                    ,{
                    header: 'Сотрудник',
                    readOnly: true,
                    dataIndex: 'user_name', // this is where the mapped name is important!
                    width: 75,
                    sortable: true,
                      hidden: false
                  }
                  
                  ,{header: 'Дата записи', width: 100, sortable: true,
                  renderer: Ext.util.Format.dateRenderer('d.m.Y H:i'),
                  //editor:release_edit1,
                  dataIndex: 'rec_date'
                  }
                  
                  

]);



app_store_dairy = new Ext.data.JsonStore({
        root: 'results',
        totalProperty: 'totalCount',
        idProperty: 'id',
        baseParams: {UserId: gUserId
                    ,UserDepId: gUserDepId
                    ,UserGroupId: gUserGroupId
        },
        fields: [
                {name: 'id', mapping:'id', type: 'int'},
                {name: 'user_id', mapping:'user_id', type: 'int'},
                {name: 'daily_plan', mapping:'daily_plan', type: 'string'},
                {name: 'comm', mapping:'comm', type: 'string'},
                {name: 'rec_date', mapping:'rec_date', type: 'date', dateFormat: 'd.m.Y H:i'},
                {name: 'user_name', mapping:'user_name', type: 'string'},
                {name: 'dep_name', mapping:'dep_name', type: 'string'}

        ],

        // load using script tags for cross domain, if the data in on the same domain as
        // this page, an HttpProxy would be better
        proxy: new Ext.data.ScriptTagProxy({
            url: '../stores/req/grid/GetDairyRecords.jsp'
        })
    });