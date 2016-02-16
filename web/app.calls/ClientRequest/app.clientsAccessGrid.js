/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */


Ext.ns("app");

var xg = Ext.grid;

function title_status(val, x, store){
         var res='Не виден';
         if (val==1) {res='Виден'} else if (val==-1) {res='Не обработан'} ;
          return res;
        }





ClientAccess_cm = new xg.ColumnModel( [
                   
                   {
                    header: 'Пользователь',
                    dataIndex: 'u_name',
                    sortable: true,
                    width: 120

                  }
                  ,{header: 'Статус',
                    dataIndex: 'status',
                    sortable: true,
                    renderer:title_status
                    ,width: 150}
                ,{
                    header: 'Дата',
                    readOnly: true,
                    dataIndex: 'last_date',
                    renderer: Ext.util.Format.dateRenderer('d.m.Y H:i'),
                    width: 120,
                    sortable: true,
                    hidden: false
                  }
                ,{
                    header: 'Пользователь редактир.',
                    dataIndex: 'last_u_name',
                    sortable: true,
                    width: 120

                  }
]);


clientAccessStore = new Ext.data.JsonStore({
        root: 'results',
        fields: [
                {name: 'u_name', mapping:'u_name', type: 'string'},
                {name: 'status', mapping:'status', type: 'string'},
                {name: 'last_date', mapping:'last_date', type: 'date', dateFormat: 'd/m/Y H:i'},
                {name: 'last_u_name', mapping:'last_u_name', type: 'string'},
                {name: 'rec_id', mapping:'rec_id', type: 'string'}
                
        ],

        // load using script tags for cross domain, if the data in on the same domain as
        // this page, an HttpProxy would be better
        proxy: new Ext.data.ScriptTagProxy({
            url: '../stores/clients/grid/ClientsAccessGrid.jsp'
        })
    });
    
    
    
    
app.ClAccessGrid =  Ext.extend(xg.EditorGridPanel,{
    initComponent: function(){
        var config ={
                 store:clientAccessStore
                ,height:600
                ,cm:ClientAccess_cm
                ,selModel: new Ext.grid.RowSelectionModel({
                  singleSelect:false
                })
                ,loadMask:true
                ,split: true
                ,tbar:[
                  '-'
                ,{
                 text: 'Добавить сотрудника'
                 ,tooltip: 'Добавить сотрудника'
                 ,iconCls:'silk-add'
                 ,handler: function(){
                     /*вызываю функцию(объект),
                      *у которой область видимости
                      *такая же что и у тулбара.
                      *То есть тулбар и функция находяться на одном уровне видимости
                      **/
                   gridAddVisibilityBt.call()
                 }
               }
                ,'-'
                ,{
                 text: 'Редактировать сотрудника'
                 ,tooltip: 'Редактировать сотрудника'
                 ,iconCls:'silk-cog'
                 ,handler: function(){
                     /*вызываю функцию(объект),
                      *у которой область видимости
                      *такая же что и у тулбара.
                      *То есть тулбар и функция находяться на одном уровне видимости
                      **/
                   gridEditVisibilityBt.call()
                 }
               }
               ,'-'
               ]
            
            };


       Ext.apply(this, Ext.apply(this.initialConfig, config));
       app.ClAccessGrid.superclass.initComponent.apply(this, arguments);     
      
       var RecId = 0;
            
          this.getSelectionModel().on('rowselect', function(sm, rowIdx, r) {
                                    RecId = r.data.rec_id;
                                    SetVisibilityId.call();
     
    			});
       
       var gridAddVisibilityBt = function(){
            /*Запускаю своё событие, от кнопки с тулбара*/
         
         this.fireEvent('addUserToClient');
        }
      gridAddVisibilityBt = gridAddVisibilityBt.createDelegate(this);


        var gridEditVisibilityBt = function(){
            /*Запускаю своё событие, от кнопки с тулбара*/
         this.fireEvent('editUserToClient');
        }
       gridEditVisibilityBt = gridEditVisibilityBt.createDelegate(this);
   
    
       var SetVisibilityId = function(){
            /*Запускаю своё событие, от кнопки с тулбара*/
         this.fireEvent('SetVisibilityId',RecId);
        }
       SetVisibilityId = SetVisibilityId.createDelegate(this);
    
    
   } // eo function initComponent
});
Ext.reg('clientaccessgrid', app.ClAccessGrid);