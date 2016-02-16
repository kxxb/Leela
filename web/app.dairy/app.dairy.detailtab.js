/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */


Ext.ns("app");

// {{{

app.DairyDetailPanel =  Ext.extend(Ext.Panel,{
    initComponent: function(){
      var config = {
         
          width:350
         ,autoScroll : 1
         ,split: true
         ,tpl:new Ext.XTemplate(

          
                        '<table class="stat" border="0" height="100" cellspacing="0" cellpadding="0">'+
                        '<tr>                                                            '+
                        '  <td width="100" valign="top" >                                             '+
                        '    <img width="100" src="../stores/req/helper/picture.jsp?file_id={user_id}">                                                     '+
                        '  </td>                                                                 '+
                        '  <td width="5">&nbsp;                                                                 '+
                        '  </td>                                                                 '+
                        '  <td><font size=1 face="Verdana" >                             '+
                        '    <b>Имя:</b> {name}<br>                                      '+
                        '    <b>Должность:</b> {rank_name}<br>                           '+
                        '    <b>Email:</b> {email}<br>                                   '+
                        '    <b>Внутренний тел.:</b> {tel_internal}<br>                  '+
                        '    <b>Мобильный тел.:</b> {tel_cellular}<br>                   '+
                        '    <b>Дата рождения:</b> {birth_date}<br>                      '+
                        '    <b>Работает с :</b> {date_work_from}                        '+
                        '</font>                                                         '+
                        '  </td>                                                         '+
                        '</tr>                                                           '+
                        '<tr>                                                           '+
                        '<td >                                                           '+
                        ' <!--<input type="button" value="Редактировать">  -->                                                         '+
                        '</td>                                                           '+
                        '</tr>                                                           '+
                        '</table>                                                        '


                       )
      };
           Ext.apply(this, Ext.apply(this.initialConfig, config));

           var UserEditBt = function(){
            /*Запускаю своё событие, от кнопки с тулбара*/
                 this.fireEvent('editTbClick');
            };
             /*обязательно делегирую функцию(объект) на сам родительский грид
             *это необходимо, чтоб запустить событие от имени грида, и ловить его
             * уже в тех местах где присутствует грид
             **/
            UserEditBt = UserEditBt.createDelegate(this);

         
           app.DairyDetailPanel.superclass.initComponent.apply(this, arguments);


   } // eo function initComponent

});
Ext.reg('dairydetailpan', app.DairyDetailPanel);


/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */


Ext.ns("app");

// {{{

app.DairyITDetailPanel =  Ext.extend(Ext.Panel,{
    initComponent: function(){
      var config = {

          height:550
         ,autoScroll : 1
         ,split: true
         ,tpl:new Ext.XTemplate(


                        '<table class="stat" border="0"  cellspacing="0" cellpadding="0">'+
                        '<tr>                                                            '+
                        '  <td width="100" valign="top" >                                             '+
                        '    <img width="100" src="../stores/req/helper/picture.jsp?file_id={user_id}">                                                     '+
                        '  </td>                                                                 '+
                        '  <td width="5">&nbsp;                                                                 '+
                        '  </td>                                                                 '+
                        '  <td valign="top"><font size=1 face="Verdana" >                             '+
                        '    <b>План на день:</b> {daily_plan}<br>                                      '+
                        
                        '</font>                                                         '+
                        '  </td>                                                         '+
                        '</tr>                                                           '+
                        '<tr>                                                           '+
                        '<td >                                                           '+
                        ' <!--<input type="button" value="Редактировать">  -->                                                         '+
                        '</td>                                                           '+
                        '</tr>                                                           '+
                        '</table>                                                        '


                       )
      };
           Ext.apply(this, Ext.apply(this.initialConfig, config));

           var UserEditBt = function(){
            /*Запускаю своё событие, от кнопки с тулбара*/
                 this.fireEvent('editTbClick');
            };
             /*обязательно делегирую функцию(объект) на сам родительский грид
             *это необходимо, чтоб запустить событие от имени грида, и ловить его
             * уже в тех местах где присутствует грид
             **/
            UserEditBt = UserEditBt.createDelegate(this);


           app.DairyITDetailPanel.superclass.initComponent.apply(this, arguments);


   } // eo function initComponent

});
Ext.reg('dairyitdetailpan', app.DairyITDetailPanel);