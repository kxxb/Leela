/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */


Ext.ns("app");

// {{{

app.UrAdditionalPanel =  Ext.extend(Ext.Panel,{
    initComponent: function(){
      var config = {
         region: 'center'
         ,height:75
         ,autoScroll : 1
         //,split: true
        // ,id:id
         //,overflow:'auto'
         //,bodyStyle: {background: '#ffffff',padding: '7px'}
          ,tpl:new Ext.XTemplate(
                                            '									',
                                            '<table class="stat" border="0" width ="100%">                               ',
                                            '<tr>															',
                                            '	<td><b>	 Тел внутр. {apl_user_internal}  моб. {apl_user_cellular} </b></td>   ',
                                            '</tr>															',
                                            '<tr>															',
                                            '	<td>														',
                                            '	<table border="0" width ="100%">								',
                                            '		<tr>													',
                                            '			<td width ="50%"><b> Договор:</b> <u> <a href="file_contr.jsp?file_id={Tl_Contract_Template_Id}">{CONTR}</a></u>	</td> ',
                                            '			<td width ="50%">&nbsp;&nbsp;&nbsp;<b> email:  </b><u>	{Cl_Email}	</u></td> 			',
                                            '		</tr>													',
                                            '		<tr>													',
                                            '			<td width ="50%">   <b> Клиент:	</b><u>	{Client}		</u></td>   ',
                                            '			<td width ="50%">&nbsp;&nbsp;&nbsp;  <b> Ставка:</b><u> {Cost_Of_Service}	</u></td>		',
                                            '		</tr>													',
                                            '		<tr>													',
                                            '			<td width ="50%">   <b> Объект:</b><u>	{Obj}		</u>	</td>		',
                                            '			<td width ="50%">&nbsp;&nbsp;&nbsp;   <b> Контрагент:</b><u>	{Contragent}	</u></td>	',

                                            '		</tr>													',
                                            '	</table>													',
                                            '	</td>														',
                                           '</tr>															',
                                            '</table>													'

                       )

      };
           Ext.apply(this, Ext.apply(this.initialConfig, config));
           app.UrAdditionalPanel.superclass.initComponent.apply(this, arguments);


   } // eo function initComponent

});
Ext.reg('addpan', app.UrAdditionalPanel);
// }}}


// {{{

app.ReqTextPanel =  Ext.extend(Ext.Panel,{
    initComponent: function(){
      var config = {
         //region: 'west'
         height:50
         ,width:400
         ,autoScroll : 1
         ,split: true
        // ,id:id
         //,overflow:'auto'
         ,bodyStyle: {background: '#ffffff',
        	      padding: '7px'}
         ,tpl:new Ext.XTemplate('<font face="Verdana" size="2">{request_text}</font>')
      };
           Ext.apply(this, Ext.apply(this.initialConfig, config));
           app.ReqTextPanel.superclass.initComponent.apply(this, arguments);


   } // eo function initComponent

});
Ext.reg('reqtexpan', app.ReqTextPanel);
// }}}


// {{{

app.ReqCommentAplPanel =  Ext.extend(Ext.Panel,{
    initComponent: function(){
      var config = {
         //region: 'west'
         height:50
         ,width:200
         ,autoScroll : 1
         ,split: true
        ,tbar: [ {
             text: 'Добавить коментарий',
             tooltip: 'Добавить коментарий',
              handler:function(){ addComentsRun.call()}
          }]
         ,bodyStyle: {background: '#ffffff',
        	      padding: '7px'}
         ,tpl:new Ext.XTemplate('<font face="Verdana" size="1">{comment}</font>')
       };
       var config123 = {
         //region: 'west'
         height:50
         ,width:200
         ,autoScroll : 1
         ,split: true
         ,bodyStyle: {background: '#ffffff',
        	      padding: '7px'}
         ,tpl:new Ext.XTemplate('<font face="Verdana" size="1">{comment}</font>')
       };

       if (gUserGroupId == 1  | gUserGroupId == 2 | gUserGroupId == 3) {
           Ext.apply(this, Ext.apply(this.initialConfig, config123));
     } else if (gUserGroupId == 4  | gUserGroupId == 5 | gUserGroupId == 6) {
         Ext.apply(this, Ext.apply(this.initialConfig, config));
     }

       
           app.ReqCommentAplPanel.superclass.initComponent.apply(this, arguments);

        var addComentsRun = function(){
            this.fireEvent('addComment');
            
        };
        addComentsRun = addComentsRun.createDelegate(this);

   } // eo function initComponent

});
Ext.reg('reqCommentAplPan', app.ReqCommentAplPanel);
// }}}

// {{{

app.ReqCommentRespPanel =  Ext.extend(Ext.Panel,{
    initComponent: function(){
      var config123 = {
         //region: 'west'
         height:50
         ,width:200
         ,autoScroll : 1
         ,split: true
        ,tbar: [ {
             text: 'Добавить коментарий',
             tooltip: 'Добавить коментарий',
              handler:function(){ addComentsRun.call()}
          }]
         ,bodyStyle: {background: '#ffffff',
        	      padding: '7px'}
         ,tpl:new Ext.XTemplate('<font face="Verdana" size="1">{comment}</font>')
      };

      var config = {
         //region: 'west'
         height:50
         ,width:200
         ,autoScroll : 1
         ,split: true
         ,bodyStyle: {background: '#ffffff',
        	      padding: '7px'}
         ,tpl:new Ext.XTemplate('<font face="Verdana" size="1">{comment}</font>')
      };


     if (gUserGroupId == 1  | gUserGroupId == 2 | gUserGroupId == 3) {
           Ext.apply(this, Ext.apply(this.initialConfig, config123));
     } else if (gUserGroupId == 4  | gUserGroupId == 5 | gUserGroupId == 6) {
         Ext.apply(this, Ext.apply(this.initialConfig, config));
     }

         
           app.ReqCommentRespPanel.superclass.initComponent.apply(this, arguments);

        var addComentsRun = function(){
            this.fireEvent('addComment');

        };
        addComentsRun = addComentsRun.createDelegate(this);

   } // eo function initComponent

});
Ext.reg('reqCommentRespPan', app.ReqCommentRespPanel);
// }}}

// {{{

app.ReqCommentPanel =  Ext.extend(Ext.Panel,{
    initComponent: function(){
      var config123 = {
         //region: 'west'
         height:50
         ,width:200
         ,autoScroll : 1
         ,split: true
        ,tbar: [ {
             text: 'Добавить коментарий',
             tooltip: 'Добавить коментарий',
              handler:function(){ addComentsRun.call()}
          }]
         ,bodyStyle: {background: '#ffffff',
        	      padding: '7px'}
         ,tpl:new Ext.XTemplate('<font face="Verdana" size="1">{comment}</font>')
      };



          Ext.apply(this, Ext.apply(this.initialConfig, config123));


           app.ReqCommentPanel.superclass.initComponent.apply(this, arguments);

        var addComentsRun = function(){
            this.fireEvent('addComment');

        };
        addComentsRun = addComentsRun.createDelegate(this);

   } // eo function initComponent

});
Ext.reg('reqCommentsPan', app.ReqCommentPanel);
// }}}



// {{{

app.ReqFilesPanel =  Ext.extend(Ext.Panel,{
    initComponent: function(){
      var config = {
         //region: 'west'
         height:50
         ,width:200
         
         ,autoScroll : 1
         ,split: true
         ,tbar: [ {
             text: 'Добавить файл',
             tooltip: 'Добавить файл',
              handler:function(){ addFilesRun.call()}
          }]
         ,bodyStyle: {background: '#ffffff',
        	      padding: '7px'}
         ,tpl:new Ext.XTemplate('<font face="Verdana" size="1">{Name}</font>')
         
      };

        
           Ext.apply(this, Ext.apply(this.initialConfig, config));
           app.ReqFilesPanel.superclass.initComponent.apply(this, arguments);
    
    
        var addFilesRun = function(){
            this.fireEvent('addFiles');

        };
        addFilesRun = addFilesRun.createDelegate(this);

   } // eo function initComponent

});
Ext.reg('reqFilesPan', app.ReqFilesPanel);
// }}}


// {{{

app.DealTextPanel =  Ext.extend(Ext.Panel,{
    initComponent: function(){
      var config = {
         //region: 'west'
         height:50
         ,width:400
         ,autoScroll : 1
         ,split: true
        // ,id:id
         //,overflow:'auto'
         ,bodyStyle: {background: '#ffffff',
        	      padding: '7px'}
         ,tpl:new Ext.XTemplate('<font face="Verdana" size="2">{deal_text}</font>')
      };
           Ext.apply(this, Ext.apply(this.initialConfig, config));
           app.DealTextPanel.superclass.initComponent.apply(this, arguments);


   } // eo function initComponent

});
Ext.reg('dealtexpan', app.DealTextPanel);
// }}}