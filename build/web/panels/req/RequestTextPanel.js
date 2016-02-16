/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */




  RequestTextPanel = function(id, htmlText, tpl, tbar, title) {
      config = {
         region: 'west'
         ,height:50
         ,width:350
         ,autoScroll : 1
         ,split: true
         //,id:id
         , title :title
         //,overflow:'auto'
         ,bodyStyle: {background: '#ffffff',
        	      padding: '7px'}
         ,tpl: tpl
         , tbar:tbar
         ,html: htmlText

      };
       Ext.apply(config);
       RequestTextPanel.superclass.constructor.call(this, config);

     };
  Ext.extend(RequestTextPanel, Ext.Panel);



  reqTextTpl1 = function(){
      config = {
       tpl:  '<font face="Verdana" size="1">{request_text}</font>'
   }
      Ext.apply(config);
       reqTextTpl1.superclass.constructor.call(this, config);
  }

  Ext.extend(reqTextTpl1, Ext.Template);

   /*var reqTextTplMarkup = [
             '<font face="Verdana" size="1">',
             '{request_text}</font>'
             ];*/
/*
    var reqTextTpl = new Ext.Template(reqTextTplMarkup);
*/