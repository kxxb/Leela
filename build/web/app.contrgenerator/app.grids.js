/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */


Ext.ns("app");

var xg = Ext.grid;


//Ext.ux.GroupTabPanel.superclass.initComponent.call(this);
app.ContarctGrid =  Ext.extend(xg.EditorGridPanel,{
    initComponent: function(){
        var config ={
                viewConfig: { forceFit:true}
                ,loadMask:true
               ,split: true
               ,clicksToEdit:1
               ,enableColLock:false
                ,selModel: new Ext.grid.RowSelectionModel({
                  singleSelect:false
                })
               ,tbar:[
                  '-'
                ,{
                 text: 'Добавить'
                 ,tooltip: 'Добавить'
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
              ,'-',{
                 text: 'Изменить'
                 ,tooltip: 'Изменить'
               
                 ,handler: function(){
                     /*вызываю функцию(объект),
                      *у которой область видимости
                      *такая же что и у тулбара.
                      *То есть тулбар и функция находяться на одном уровне видимости
                      **/
                   gridEditBt.call()
                 }
              }
              ,'-',{
                 text: 'Удалить'
                 ,tooltip: 'Удалить'
               
                 ,handler: function(){
                     /*вызываю функцию(объект),
                      *у которой область видимости
                      *такая же что и у тулбара.
                      *То есть тулбар и функция находяться на одном уровне видимости
                      **/
                   gridDelBt.call()
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
/*butons functions*/
    var gridAddBt = function(){   this.fireEvent('addTbClick'); }
    gridAddBt = gridAddBt.createDelegate(this);
    var gridEditBt = function(){   this.fireEvent('editTbClick'); }
    gridEditBt = gridEditBt.createDelegate(this);
    var gridDelBt = function(){   this.fireEvent('delTbClick'); }
    gridDelBt = gridDelBt.createDelegate(this);
/*end butons functions*/    
    
    app.ContarctGrid.superclass.initComponent.apply(this, arguments);

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
                            
                        }
                    });
               }

        }
    });

    
    
   } // eo function initComponent

});
Ext.reg('contractgrid', app.ContarctGrid);

//}}}


var contarct_cm =  [

                    {
                    header: '#',
                    dataIndex: 'ORDER_IN_LIST',
                    sortable: true,
                    width: 15
                  }
                    ,{
                    header: 'Договор',
                    readOnly: true,
                    dataIndex: 'CONTRACT_NAME', // this is where the mapped name is important!
                    width: 155,
                    sortable: true,
                      hidden: false
                  }
                  
                  ,{header: 'Дата', width: 75, sortable: true,
                  renderer: Ext.util.Format.dateRenderer('d.m.Y H:i'),
                  //editor:release_edit1,
                  dataIndex: 'CONTRACT_DATE'
                  }
  ];


 var checkColumn = new Ext.grid.CheckColumn({
       header: 'Выбрать',
       dataIndex: 'IS_CHECKED',
       width: 30
       ,editor: checkColumn
       
    });

var paragraph_cm =  [
             //   checkColumn,
                {
            xtype: 'booleancolumn',
            header: 'Выбран',
            dataIndex: 'IS_CHECKED',
            align: 'center',
            width: 50,
            trueText: 'Да',
            falseText: 'Нет',
            editor: {
                xtype: 'checkbox'
            }},
                   {
                    header: 'Порядковый №',
                    dataIndex: 'ORDER_NUMBER',
                    sortable: true,
                    width: 35
                  }
                    ,{
                    header: 'Параграф',
                    readOnly: true,
                    dataIndex: 'PARAGRAPH_NAME', // this is where the mapped name is important!
                    width: 155,
                    sortable: true,
                      hidden: false
                  }
                  
                  
                  ,{header: 'Дата созданиия', width: 75, sortable: true,
                  renderer: Ext.util.Format.dateRenderer('d.m.Y H:i'),
                  //editor:release_edit1,
                  dataIndex: 'PARAGRAPH_DATE'
                  }
                  ,{header: 'Дата редактирования', width: 75, sortable: true,
                  renderer: Ext.util.Format.dateRenderer('d.m.Y H:i'),
                  dataIndex: 'EDIT_DATE'
                  }
  ];

   
  