/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

Ext.ns("app");

// {{{

//Ext.ux.GroupTabPanel.superclass.initComponent.call(this);
app.UniversalGrid =  Ext.extend(Ext.grid.EditorGridPanel,{
    initComponent: function(){
        var config ={
              height:300
             ,region: 'north'
             ,loadMask:true
              ,view: new Ext.grid.GridView({
                    forceFit:true,
                    getRowClass : function (row, index) {
                      var cls = '';
                      var data = row.data;
                      cls = setColorGroupGrid (data.Status);

                      return cls;
                   }
                })
             ,split: true

             ,clicksToEdit:1
             ,enableColLock:false
             ,selModel: new Ext.grid.RowSelectionModel({
                  singleSelect:false
              })
              ,tbar:[
                  '-'
                ,{
                 text: 'Создать заявку'
                 ,tooltip: 'Создать заявку'
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
              ,'-'
              ,{
                 text: 'Поиск'
                 ,tooltip: 'Поиск'
                 ,iconCls:'silk-cog'
                 ,handler:  function(){
                     /*вызываю функцию(объект),
                      *у которой область видимости
                      *такая же что и у тулбара.
                      *То есть тулбар и функция находяться на одном уровне видимости
                      **/
                     gridSearchBt.call();
                 }

              }
              ,'-'
              
              ]

        };

     // apply config
    Ext.apply(this, Ext.apply(this.initialConfig, config));

    this.bbar = new Ext.PagingToolbar({
                    pageSize: 100
                    ,store: this.store
                    ,displayInfo: true
                    ,displayMsg: 'Показанно заявок {0} - {1} of {2}'
                    ,emptyMsg: "Нет заявок"

                 });


    var gridAddBt = function(){
        /*Запускаю своё событие, от кнопки с тулбара*/
     this.fireEvent('addTbClick');
    }
    var gridSearchBt = function(){
        /*Запускаю своё событие, от кнопки с тулбара*/
     this.fireEvent('searchTbClick');
    }
    /*обязательно делегирую функцию(объект) на сам родительский грид
     *это необходимо, чтоб запустить событие от имени грида, и ловить его
     * уже в тех местах где присутствует грид
     **/
    gridAddBt = gridAddBt.createDelegate(this);
    gridSearchBt = gridSearchBt.createDelegate(this);


    app.UniversalGrid.superclass.initComponent.apply(this, arguments);
     // load the store at the latest possible moment
        this.on({
            afterlayout:{
                scope:this,
                single:true,
                fn:function() {

                    this.store.load({

                        params:{
                             start:0
                            ,limit:100
                            
                        }
                    });
               }
               
        }
    });


} // eo function initComponent

});
Ext.reg('univgrid', app.UniversalGrid);

//}}}


// {{{


app.UniversalGridWithOutAdd =  Ext.extend(Ext.grid.EditorGridPanel,{
    initComponent: function(){
        var config ={
              height:300
             ,region: 'north'
             ,loadMask:true
             ,view: new Ext.grid.GridView({
                    forceFit:true,
                    getRowClass : function (row, index) {
                      var cls = '';
                      var data = row.data;
                      cls = setColorGroupGrid (data.Status);

                      return cls;
                   }
                })
             ,split: true
             ,clicksToEdit:1
             ,enableColLock:false
             ,selModel: new Ext.grid.RowSelectionModel({
                  singleSelect:false
              })
              ,tbar:[
              '-'
              ,{
                 text: 'Поиск'
                 ,tooltip: 'Поиск'
                 ,iconCls:'silk-cog'
                 ,handler:  function(){
                     /*вызываю функцию(объект),
                      *у которой область видимости
                      *такая же что и у тулбара.
                      *То есть тулбар и функция находяться на одном уровне видимости
                      **/
                     gridSearchBt.call();
                 }

              }
              ,'-'
              ,{
                 text: 'Сохранить'
                 ,tooltip: 'Сохранить изменения'
                 ,iconCls:'silk-accept'

                     /*Пустая кнопка - Мулька
                      *эта функця срабатывает на событие Afterdeit грида
                      **/

              }
              ,'-'
              ]
        };

     // apply config
    Ext.apply(this, Ext.apply(this.initialConfig, config));

    this.bbar = new Ext.PagingToolbar({
                    pageSize: 100
                    ,store: this.store
                    ,displayInfo: true
                    ,displayMsg: 'Показанно заявок {0} - {1} of {2}'
                    ,emptyMsg: "Нет заявок"

                 });


    var gridAddBt = function(){
        /*Запускаю своё событие, от кнопки с тулбара*/
     this.fireEvent('addTbClick');
    }
    var gridSearchBt = function(){
        /*Запускаю своё событие, от кнопки с тулбара*/
     this.fireEvent('searchTbClick');
    }
    /*обязательно делегирую функцию(объект) на сам родительский грид
     *это необходимо, чтоб запустить событие от имени грида, и ловить его
     * уже в тех местах где присутствует грид
     **/
    gridAddBt = gridAddBt.createDelegate(this);
    gridSearchBt = gridSearchBt.createDelegate(this);


    app.UniversalGridWithOutAdd.superclass.initComponent.apply(this, arguments);
     // load the store at the latest possible moment
        this.on({
            afterlayout:{
                scope:this,
                single:true,
                fn:function() {

                    this.store.load({

                        params:{
                            start:0
                            ,limit:100

                        }
                    });
               }

        }
    });


} // eo function initComponent

});
Ext.reg('univgridwithoutadd', app.UniversalGridWithOutAdd);

//}}}



// {{{


app.DealGrid =  Ext.extend(Ext.grid.EditorGridPanel,{
    initComponent: function(){
        var config ={
              height:300
             ,region: 'north'
             ,loadMask:true
              ,view: new Ext.grid.GridView({
                    forceFit:true,
                    getRowClass : function (row, index) {
                      var cls = '';
                      var data = row.data;
                      cls = setColorGroupGrid (data.Status);

                      return cls;
                   }
                })
             ,split: true

             ,clicksToEdit:1
             ,enableColLock:false
             ,selModel: new Ext.grid.RowSelectionModel({
                  singleSelect:false
              })
              ,tbar:[
                  '-'
                ,{
                 text: 'Создать сделку'
                 ,tooltip: 'Создать сделку'
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
              ,'-'
               ,'-'
                ,{
                 text: 'Создать коментарий'
                 ,tooltip: 'Создать коментарий'
                 ,iconCls:'silk-add'
                 ,handler: function(){
                     /*вызываю функцию(объект),
                      *у которой область видимости
                      *такая же что и у тулбара.
                      *То есть тулбар и функция находяться на одном уровне видимости
                      **/
                   gridAddCommentBt.call()
                 }
              }
              ,'-'
//              ,{
//                 text: 'Поиск'
//                 ,tooltip: 'Поиск'
//                 ,iconCls:'silk-cog'
//                 ,handler:  function(){
//                     /*вызываю функцию(объект),
//                      *у которой область видимости
//                      *такая же что и у тулбара.
//                      *То есть тулбар и функция находяться на одном уровне видимости
//                      **/
//                     gridSearchBt.call();
//                 }
//
//              }
//              ,'-'

              ]

        };

     // apply config
    Ext.apply(this, Ext.apply(this.initialConfig, config));

    this.bbar = new Ext.PagingToolbar({
                    pageSize: 100
                    ,store: this.store
                    ,displayInfo: true
                    ,displayMsg: 'Показанно заявок {0} - {1} of {2}'
                    ,emptyMsg: "Нет заявок"

                 });


    var gridAddBt = function(){
        /*Запускаю своё событие, от кнопки с тулбара*/
     this.fireEvent('addDealClick');
    }
    var gridAddCommentBt = function(){
        /*Запускаю своё событие, от кнопки с тулбара*/
     this.fireEvent('addDealCommentClick');
    }
    var gridSearchBt = function(){
        /*Запускаю своё событие, от кнопки с тулбара*/
     this.fireEvent('searchTbClick');
    }
    /*обязательно делегирую функцию(объект) на сам родительский грид
     *это необходимо, чтоб запустить событие от имени грида, и ловить его
     * уже в тех местах где присутствует грид
     **/
    gridAddBt = gridAddBt.createDelegate(this);
    gridAddCommentBt = gridAddCommentBt.createDelegate(this);
    gridSearchBt = gridSearchBt.createDelegate(this);


    app.DealGrid.superclass.initComponent.apply(this, arguments);
     // load the store at the latest possible moment
        this.on({
            afterlayout:{
                scope:this,
                single:true,
                fn:function() {

                    this.store.load({

                        params:{
                             start:0
                            ,limit:100

                        }
                    });
               }

        }
    });


} // eo function initComponent

});
Ext.reg('dealgrid', app.DealGrid);

//}}}


// {{{


app.GroupGridWithOutAdd =  Ext.extend(Ext.grid.GridPanel,{
    initComponent: function(){
        var config ={
              height:300
             ,region: 'north'
             ,loadMask:true
             ,view: new Ext.grid.GroupingView({
                    forceFit:true,
                    getRowClass : function (row, index) {
                      var cls = '';
                      var data = row.data;
                      cls = setColorGroupGrid (data.Status);
                      return cls;
                   },
                    groupTextTpl: '{text} ({[values.rs.length]} {[values.rs.length > 1 ? "Заявок" : "Заявка"]})'
                })
             ,split: true
             ,animCollapse: false
             ,selModel: new Ext.grid.RowSelectionModel({
                  singleSelect:false
              })
              ,tbar:[
              '-'
              ,{
                 text: 'Поиск'
                 ,tooltip: 'Поиск'
                 ,iconCls:'silk-cog'
                 ,handler:  function(){
                     /*вызываю функцию(объект),
                      *у которой область видимости
                      *такая же что и у тулбара.
                      *То есть тулбар и функция находяться на одном уровне видимости
                      **/
                     gridSearchBt.call();
                 }

              }
              ,'-'
              ,{
                 text: 'Сохранить'
                 ,tooltip: 'Сохранить изменения'
                 ,iconCls:'silk-accept'

                     /*Пустая кнопка - Мулька
                      *эта функця срабатывает на событие Afterdeit грида
                      **/

              }
              ,'-'
              ]
        };

     // apply config
    Ext.apply(this, Ext.apply(this.initialConfig, config));

    this.bbar = new Ext.PagingToolbar({
                    pageSize: 100
                    ,store: this.store
                    ,displayInfo: true
                    ,displayMsg: 'Показанно заявок {0} - {1} of {2}'
                    ,emptyMsg: "Нет заявок"

                 });


    var gridAddBt = function(){
        /*Запускаю своё событие, от кнопки с тулбара*/
     this.fireEvent('addTbClick');
    }
    var gridSearchBt = function(){
        /*Запускаю своё событие, от кнопки с тулбара*/
     this.fireEvent('searchTbClick');
    }
    /*обязательно делегирую функцию(объект) на сам родительский грид
     *это необходимо, чтоб запустить событие от имени грида, и ловить его
     * уже в тех местах где присутствует грид
     **/
    gridAddBt = gridAddBt.createDelegate(this);
    gridSearchBt = gridSearchBt.createDelegate(this);


    app.GroupGridWithOutAdd.superclass.initComponent.apply(this, arguments);
     // load the store at the latest possible moment
        this.on({
            afterlayout:{
                scope:this,
                single:true,
                fn:function() {

                    this.store.load({

                        params:{
                            start:0
                            ,limit:100

                        }
                    });
               }

        }
    });


} // eo function initComponent

});
Ext.reg('groupgridwithoutadd', app.GroupGridWithOutAdd);

//}}}