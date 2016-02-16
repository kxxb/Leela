/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */



app.GuessClientPanel =  Ext.extend(Ext.Panel,{
    initComponent: function(){
      var config = {
          autoScroll : 1
         ,split: true
         ,height:'75'
         ,tpl:new Ext.XTemplate(
                        '{CLIENT_INFO} '
                       )
      };
           Ext.apply(this, Ext.apply(this.initialConfig, config));
           app.GuessClientPanel.superclass.initComponent.apply(this, arguments);
   } // eo function initComponent

});
Ext.reg('guessclientpan', app.GuessClientPanel);


