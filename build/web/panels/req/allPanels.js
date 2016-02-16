/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */


   var p = new Ext.Panel({
        region: 'west',
        xtype: 'panel',
        title: 'Заявка',
        width: 500,
        //height:300,
        autoScroll : 1,
        overflow:'auto',
        id: 'p',

         bodyStyle: {
                    background: '#ffffff',
                    padding: '7px'
            },
            html: 'Выберите заявку из списка'

     });



 // define a template to use for the detail view
	var bookTplMarkup = [
		'<font face="Verdana" size="1">{request_text}</font >   <br/>'
	];
	var bookTpl = new Ext.Template(bookTplMarkup);

    var AdditionalPanel = new Ext.Panel({

        xtype: 'panel'
        ,title: 'Информация'
         ,split: true
         ,collapsible: true
         ,collapseMode: 'mini'
         ,autoScroll : 1
         ,overflow:'auto'
         ,id: 'AdditionalPanel'
          ,bodyStyle: {
					background: '#ffffff',
					padding: '7px'
				},
				html: 'Выберите заявку из списка'

     });

 // define a template to use for the detail view
 	var AdditionalTplMarkup = [
 '<font face="Verdana" size="2">									',
'<table border="0" width ="100%">                               ',
'<tr>															',
'	<td><b>	 тел внутр. 35 дом. нет моб. 968-98-98	</b></td>   ',
'</tr>															',
'<tr>															',
'	<td>														',
'	<table border="0" width ="85%">								',
'		<tr>													',
'			<td><b> Договор:</b> <u> <a href="file_contr.jsp?file_id={Tl_Contract_Template_Id}">{CONTR}</a></u>	</td> ',
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

	/*var AdditionalTplMarkup = [
		   '<font face="Verdana" size="1">',
           '<table width="100%" cellpading="0" cellspacing="0">',
           ' <tr>                                              ',
           '     <td><b>Договор:</b><a href="file_contr.jsp?file_id={Tl_Contract_Template_Id}">{CONTR}</a></td>            ',
          '  </tr>                                            ',
           '  <tr>                                             ',
          '     <td><b>email:</b>{Cl_Email}</td>              ',
           '  </tr>                                            ',
           '  <tr>                                             ',
           '     <td><b>Клиент:</b>{Client}</td>               ',
          '  </tr>                                            ',
           '  <tr>                                             ',
          '     <td><b>Контрагент:</b>{Contragent}</td>       ',
           '  </tr>                                            ',
           '  <tr>                                             ',
           '     <td><b>Объект:</b>{Obj}</td>                  ',
           '  </tr>                                            ',
           '  <tr>                                             ',

          '     <td><b>Стоимость услуги:</b>{Cost_Of_Service}</td> ',
           '  </tr>                                                 ',
           '</table>            </font >                                '
	];
*/	var AdditionalTpl = new Ext.Template(AdditionalTplMarkup);


 // define a template to use for the detail view
	var CommentTplMarkup = [
		   '<font face="Verdana" size="1">',
           '{comment} </font >      '
	];
	var CommentTpl = new Ext.Template(CommentTplMarkup);


    var CommentPanel = new Ext.Panel({

        xtype: 'tabpanel',
        title: 'Коментарий ',

        autoScroll : 1,
        overflow:'auto',
        id: 'CommentPanel',
        tbar: [ {
         text: 'Добавить коментарий',
         tooltip: 'Добавить коментарий',
          handler: displayFormComment
      }],

         bodyStyle: {
                    background: '#ffffff',
                    padding: '7px'
            },
            html: 'Выберите заявку из списка'

     });


  // define a template to use for the detail view
	/*var FileTplMarkup = [
		   '<font face="Verdana" size="1">',
           ' {name}</font>'
	];

    */


    var FileTplMarkup = [ '{Name}'];

    var FileTpl = new Ext.Template(FileTplMarkup);

    var FilePanel = new Ext.Panel({
        xtype: 'tabpanel',
        title: 'Прикрепленные файлы ',
        autoScroll : 1,
        overflow:'auto',
        id: 'FilePanel',
        tbar: [ {
         text: 'Добавить файл',
         tooltip: 'Добавить файл',
          handler: displayFormFile
        },
        {
         text: 'Удалить файл',
         tooltip: 'Удалить файл'
      }

                ],

         bodyStyle: {
             background: '#ffffff',
             padding: '7px'
           },
	html: 'Выберите заявку из списка'

     });



 /*про пользователя*/

    var ProfileTplMarkup = [ '<font face="Verdana" size="1"><table>'+
               '<tr><td>Имя:</td><td>{apl_user_name}</td></tr>'+
               '<tr><td>email:</td><td>{apl_user_email}</td></tr>'+
               '<tr><td>Мобильный:</td><td>{apl_user_cellular}</td></tr>'+
               '<tr><td>Внутренний:</td><td>{apl_user_internal}</td></tr>'+
               '<tr><td>Должность:</td><td>{apl_user_work_position}</td></tr>'+
               '<table></font>'];

    var ProfileTpl = new Ext.Template(ProfileTplMarkup);

    var ProfilePanel = new Ext.Panel({

        xtype: 'tabpanel',

        autoScroll : 1,
        overflow:'auto',
        id: 'ProfilePanel',

         bodyStyle: {
             background: '#ffffff',
             padding: '7px'
           },
	html: 'Выберите заявку из списка'

     });



