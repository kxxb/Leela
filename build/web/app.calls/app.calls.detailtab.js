/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */


Ext.ns("app");




app.CallDetailPanel =  Ext.extend(Ext.Panel,{
    initComponent: function(){
      var config = {
          height:75
         
         ,autoScroll : 1
         ,split: true
         ,tpl:new Ext.XTemplate(

          
                        '<table class="stat" border="0" height="70" cellspacing="0" cellpadding="0">'+
                        '<tr>                                                            '+
                        '  <td valign="top">                                                          '+
                        '    <font size=1 face="Verdana" >                             '+
                        '       <b>Контакт:</b> {input_tel}<br>                                      '+
                        '       <b>Описание:</b> {call_description}<br>                           '+
                        '       <b>Лоты:</b> {call_lots}<br>                           '+
                        '    </font>                                                         '+
                        '  </td>                                                         '+
                        '</tr>                                                           '+
                        '</table>                                                        '
                       )
      };
           Ext.apply(this, Ext.apply(this.initialConfig, config));
           app.CallDetailPanel.superclass.initComponent.apply(this, arguments);
   } // eo function initComponent

});
Ext.reg('calldetailpan', app.CallDetailPanel);

app.CallResultPanel =  Ext.extend(Ext.Panel,{
    initComponent: function(){
      var config = {
          autoScroll : 1
         ,split: true
         ,title:'Результат'
         ,tpl:new Ext.XTemplate(

                        '<table class="stat" border="0" height="70" cellspacing="0" cellpadding="0">'+
                        '<tr>                                                            '+
                        '  <td valign="top">                                                          '+
                        '    <font size=1 face="Verdana" >                             '+
                        '       {CALL_RESULT}<br>                           '+
                        '    </font>                                                         '+
                        '  </td>                                                         '+
                        '</tr>                                                           '+
                        '</table>                                                        '
                       )
      };
           Ext.apply(this, Ext.apply(this.initialConfig, config));
           app.CallResultPanel.superclass.initComponent.apply(this, arguments);
   } // eo function initComponent

});
Ext.reg('callresultpan', app.CallResultPanel);






app.RootCallDetailPanel =  Ext.extend(Ext.Panel,{
    initComponent: function(){
      var config = {
          region: 'west'
         ,layout: 'border'
         ,split: true
         ,width:350
         ,border: false
         ,items:[
              { xtype:'calldetailpan'
               ,region:'north'
              }
             ,{xtype:'guessclientpan'
              ,region:'center'
             }
         ]
      };
           Ext.apply(this, Ext.apply(this.initialConfig, config));
           app.RootCallDetailPanel.superclass.initComponent.apply(this, arguments);
   } // eo function initComponent

});
Ext.reg('rootcalldetailpan', app.RootCallDetailPanel);