/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

Ext.ns("app");

app.TotalCallsPan =  Ext.extend(Ext.Panel,{
    initComponent: function(){
      
        this.items =  new Ext.DataView({
         
         emptyText: 'No images to display',
         store: ChartStore,
         tpl:new Ext.XTemplate(
                 '<table class="stat" border="1"  cellspacing="0" cellpadding="0">'+
                        '<tr>                                                            '+
                        '  <td valign="top" align="center" colspan="2" >  Сводная по отделу                                         '+
                        '  </td>                                                         '+
                        '</tr>                                                           '+
                        '<tr>                                                            '+
                        '  <td valign="top"  >                               '+
                        '   Всего не обработанно                    '+
                        '  </td>                                                         '+
                        '  <td valign="top"  >                               '+
                        '   {Not_Proced_t}                   '+
                        '  </td>                                                         '+
                        '</tr>                                                           '+
                        '<tr>                                                            '+
                        '  <td valign="top"  >                               '+
                        '   Всего актив                    '+
                        '  </td>                                                         '+
                        '  <td valign="top" >                               '+
                        '   {Active_t}                    '+
                        '  </td>                                                         '+
                        '</tr>                                                           '+
                        '<tr>                                                            '+
                        '  <td valign="top"  >                               '+
                        '   Всего пассив                    '+
                        '  </td>                                                         '+
                        '  <td valign="top" >                               '+
                        '   {Passive_t}                    '+
                        '  </td>                                                         '+
                        '</tr>                                                           '+
                        '<tr>                                                            '+
                        '  <td valign="top" >                               '+
                        '   Всего                    '+
                        '  </td>                                                         '+
                        '  <td valign="top" >                               '+
                        '   {Total_t}                    '+
                        '  </td>                                                         '+
                        '</tr>                                                           '+
                        
                        '</table>                                                        '
                       )
                     })
             
         
             
             
      
      //     Ext.apply(this, Ext.apply(this.initialConfig, config));
           app.TotalCallsPan.superclass.initComponent.call(this, arguments);
          
   } // eo function initComponent

});
Ext.reg('totalcallspan', app.TotalCallsPan);