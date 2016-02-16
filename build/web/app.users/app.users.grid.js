/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

Ext.ns("app");

var xg = Ext.grid;


    ////////////////////////////////////////////////////////////////////////////////////////
    // Grid 1 app.UserGrid =  Ext.extend(Ext.grid.GridPanel,{
    ////////////////////////////////////////////////////////////////////////////////////////
    // row expander
//    
//            var expander = new Ext.ux.grid.RowExpander({
//                tpl : new Ext.Template(
//                    '<table  border="1" height="100" cellspacing="0" cellpadding="0">'+
//                    '<tr>                                                            '+
//                    '  <td width="100" >                                             '+
//                    '    picture                                                     '+
//                    '  </td>                                                         '+
//                    '  <td><font size=1 face="Verdana" >                             '+
//                    '    <b>Имя:</b> {name}<br>                                      '+
//                    '    <b>Должность:</b> {rank_name}<br>                           '+
//                    '    <b>Email:</b> {email}<br>                                   '+
//                    '    <b>Внутренний тел.:</b> {tel_internal}<br>                  '+
//                    '    <b>Мобильный тел.:</b> {tel_cellular}<br>                   '+
//                    '    <b>Дата рождения:</b> {birth_date}<br>                      '+
//                    '    <b>Работает с :</b> {date_work_from}                        '+
//                    '</font>                                                         '+
//                    '  </td>                                                         '+
//                    '</tr>                                                           '+
//                    '</table>                                                        '
//                )
//            });

    


//Ext.ux.GroupTabPanel.superclass.initComponent.call(this);
app.UserGrid =  Ext.extend(xg.GridPanel,{
    initComponent: function(){
        var config1 ={
                 store:app_store_users
                ,cm:Users_cm
                ,viewConfig: {
                    forceFit:true
                }
                
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
                   gridAddBt.call()
                 }
              }
              ,'-',{
                 text: 'Редактировать сотрудника'
                 ,tooltip: 'Редактировать сотрудника'
                 ,iconCls:'silk-add'
                 ,handler: function(){
                     /*вызываю функцию(объект),
                      *у которой область видимости
                      *такая же что и у тулбара.
                      *То есть тулбар и функция находяться на одном уровне видимости
                      **/
                   gridEditBt.call()
                 }
              }
              /*доделаю после отпуска
               *,'-'
               ,{
                 text: 'Редактировать фото'
                 ,tooltip: 'Редактировать фото'
                 ,iconCls:'silk-add'
                 ,handler: function(){
                     
                   gridEditFotoBt.call()
                 }
              }*/
              ,'-']
            };


             var config ={
                 store:app_store_users
                ,cm:Users_cm
                ,viewConfig: {
                    forceFit:true
                }

                ,loadMask:true

             ,split: true

            };

     // apply config

            if (gUserDepId == 1) {
                  Ext.apply(this, Ext.apply(this.initialConfig, config1));
               }else {

                  Ext.apply(this, Ext.apply(this.initialConfig, config));

               }



    var gridAddBt = function(){
            /*Запускаю своё событие, от кнопки с тулбара*/
         this.fireEvent('addTbClick');
    }
     /*обязательно делегирую функцию(объект) на сам родительский грид
     *это необходимо, чтоб запустить событие от имени грида, и ловить его
     * уже в тех местах где присутствует грид
     **/
    gridAddBt = gridAddBt.createDelegate(this);


    var gridEditBt = function(){
            /*Запускаю своё событие, от кнопки с тулбара*/
         this.fireEvent('editTbClick');
    }
     /*обязательно делегирую функцию(объект) на сам родительский грид
     *это необходимо, чтоб запустить событие от имени грида, и ловить его
     * уже в тех местах где присутствует грид
     **/
    gridEditBt = gridEditBt.createDelegate(this);


    var gridEditFotoBt = function(){
            /*Запускаю своё событие, от кнопки с тулбара*/
         this.fireEvent('editFotoTbClick');
    }
     /*обязательно делегирую функцию(объект) на сам родительский грид
     *это необходимо, чтоб запустить событие от имени грида, и ловить его
     * уже в тех местах где присутствует грид
     **/
    gridEditFotoBt = gridEditFotoBt.createDelegate(this);
    app.UserGrid.superclass.initComponent.apply(this, arguments);


    
    
   } // eo function initComponent

});
Ext.reg('usergrid', app.UserGrid);

//}}}


var Users_cm = new xg.ColumnModel( [
       
                    {
                    header: 'Сотрудник',
                    readOnly: true,
                    dataIndex: 'name', // this is where the mapped name is important!
                    width: 75,
                    sortable: true,

                    hidden: false
                  }
                  
                  ,{
                    header: 'Статус',
                    dataIndex: 'St',
                    sortable: true,
                    width: 50

                  }
                  ,{
                    header: 'Вн.тел',
                    dataIndex: 'tel_internal',
                    sortable: true,
                    width: 50
                  }
                  ,{
                    header: 'Мобильный',
                    dataIndex: 'tel_cellular',
                    sortable: true,
                    width: 75
                  }

]);

app_store_users = new Ext.data.JsonStore({
        root: 'results',
        idProperty: 'id',
        fields: [
                {name: 'user_id', mapping:'user_id', type: 'int'},
                {name: 'login', mapping:'login', type: 'string'},
                {name: 'name', mapping:'name', type: 'string'},
                {name: 'pass', mapping:'pass', type: 'string'},

                {name: 'St', mapping:'St', type: 'string'},
                {name: 'rank_name', mapping:'rank_name', type: 'string'},
                {name: 'email', mapping:'email', type: 'string'},
                {name: 'tel_internal',mapping:'tel_internal', type: 'string'},
                {name: 'tel_cellular', mapping:'tel_cellular', type: 'string'},
                {name: 'birth_date', mapping:'birth_date', type: 'date', dateFormat: 'd/m/Y '},
                {name: 'date_work_from', mapping:'date_work_from', type: 'date', dateFormat: 'd/m/Y'},

                {name: 'tl_users_rank_id', mapping:'tl_users_rank_id', type: 'string'},
                {name: 'status', mapping:'status', type: 'string'},
                {name: 'work_position',mapping:'work_position', type: 'string'},
                {name: 'tl_departmenst_id', mapping:'tl_departmenst_id', type: 'string'},
                {name: 'groupid', mapping:'groupid', type: 'string'},
                {name: 'user_local_ip', mapping:'user_local_ip', type: 'string'}
        ],

        // load using script tags for cross domain, if the data in on the same domain as
        // this page, an HttpProxy would be better
        proxy: new Ext.data.ScriptTagProxy({
            url: '../stores/req/grid/GetUsers.jsp'
        })
    });