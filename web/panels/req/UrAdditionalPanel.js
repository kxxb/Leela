/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */


  

  UrAdditionalPanel = function(id, htmlText) {
      config = {
         region: 'center'
         ,height:50
         ,autoScroll : 1
         ,split: true
        // ,id:id
         //,overflow:'auto'
         ,bodyStyle: {background: '#ffffff',
        	      padding: '7px'}
         ,html: htmlText
      };
       Ext.apply(config);
       UrAdditionalPanel.superclass.constructor.call(this, config);

     };
  Ext.extend(UrAdditionalPanel, Ext.Panel);

   var urAdditionalTplMarkup = [
             '<font face="Verdana" size="1">									',
            '<table border="0" width ="100%">                               ',
            '<tr>															',
            '	<td><b>	 тел внутр. {apl_user_internal}  моб. {apl_user_cellular} email: {apl_user_email}</b></td>   ',
            '</tr>															',
            '<tr>															',
            '	<td>														',
            '	<table border="0" width ="100%">								',
            '		<tr>													',
            '			<td ><b> Договор:</b> <u> <a href="file_contr.jsp?file_id={Tl_Contract_Template_Id}">{CONTR}</a></u>	</td> ',
            '			<td><b> email:  </b><u>	{Cl_Email}	</u></td> 			',
            '		</tr>													',
            '		<tr>													',
            '			<td>   <b> Клиент:	</b><u>	{Client}		</u></td>   ',
            '			<td>  <b> Ставка:</b><u> {Cost_Of_Service}	</u></td>		',
            '		</tr>													',
            '		<tr>													',
            '			<td>   <b> Объект:</b><u>	{Obj}		</u>	</td>		',
            '			<td>   <b> Контрагент:</b><u>	{Contragent}	</u></td>	',

            '		</tr>													',
            '	</table>													',
            '	</td>														',
            '</tr>															',
            '</table>	</font>												'
             ];

    var urAdditionalTpl = new Ext.Template(urAdditionalTplMarkup);