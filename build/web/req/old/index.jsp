<%-- 
    Document   : index
    Created on : 27.09.2010, 12:09:11
    Author     : kxxb
Эта страница доступна долько пользователям из групп

1	Admins	Максимальный уровень доступа
--%>


<%@ page import="java.sql.Types, oracle.jdbc.OracleConnection, oracle.jdbc.OracleResultSet, java.sql.*, oracle.jdbc.OracleCallableStatement"
contentType="text/html;charset=UTF-8"  %>
<jsp:useBean id="db_conn" class="Leela.db.Conn" scope="session" />
<jsp:useBean id="Lela_core" class="Leela.core.user_managment" scope="session" />
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN"
"http://www.w3.org/TR/html4/loose.dtd">
<%
OracleConnection conn = db_conn.GetConnect();

try{
  /*conn = db_conn.GetConnect();
 g_user_id = session.getAttribute("g_user_id").toString();
 g_login_id = session.getAttribute("g_login_id").toString();

   */
if (Lela_core.users_sys_queit_login(conn, session.getId(), request.getRemoteAddr()) == 1) {
  int g_user_id = Lela_core.get_users_by_ip(conn, request.getRemoteAddr());



//if (Lela_core.Check_User_Session(conn, session.getId(), g_user_id, g_login_id)==1){
int group_id = Lela_core.Check_Users_Group(conn, g_user_id);


if (group_id == 4 | group_id == 5){

%>
             <html>
             <body>
              <script>
              <%
                out.println("parent.location = 'index_app.jsp';");
              %>
              </script>
             </body>
             </html>

<%
}else if (group_id == 2 | group_id == 3){

%>
             <html>
             <body>
              <script>
              <%
                out.println("parent.location = 'index_resp.jsp';");
              %>
              </script>
             </body>
             </html>

<%
}
else if (group_id == 1){

%>
<html>
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
        <title>Заявки административный доступ</title>

        <!-- ** CSS ** -->
        <!-- base library -->

        <link rel="stylesheet" type="text/css" href="../js/ext-3.2.1/resources/css/ext-all.css" />


        <!-- overrides to base library -->


        <!-- ** Javascript ** -->
        <!-- base library -->
        <script type="text/javascript" src="../js/ext-3.2.1/adapter/ext/ext-base.js"></script>
        <script type="text/javascript" src="../js/ext-3.2.1/ext-all-debug.js"></script>
        <script type="text/javascript" src="MyjsExt/GridRequestOther.js"></script>

    </head>
    <body>
    <script type="text/javascript">
        <%@include file="../frm/req/CreateRequest/createReq.js" %>
    var ReqGridDataStore;
    var ReqGridColumnModel;
    var ReqGridListingEditorGrid;
    var ReqGridListingWindow;



    Ext.onReady(function(){

    /*Ext.reg('personnelgrid', Application.PersonnelGrid);
    var pg = new Application.PersonnelGrid();
*/

       function saveTheRequest(oGrid_event){

           Ext.Ajax.request({

              url: 'CUrequest.jsp',
              params: {
                 reqid: oGrid_event.record.data.reqid,
                 //responsibly_id: oGrid_event.record.data.Responsibly_Id,
                 responsibly_id: oGrid_event.record.data.responsibly_id,
                 dt_execute: oGrid_event.record.data.dt_execute.format('Y-m-d'),
                 //status: oGrid_event.record.data.Status,
                 Status_Name: oGrid_event.record.data.Status_Name,
                 //status_name: Done,
                 //contract_number: oGrid_event.record.data.Contract_Number, // this time we'll format it thanks to ext
                 contract_number: 31337, // this time we'll format it thanks to ext
                 contract_date: oGrid_event.record.data.Contract_Date.format('Y-m-d'),
                 contacrt_return_date: oGrid_event.record.data.Contract_Date.format('Y-m-d'),
                 Contragent: oGrid_event.record.data.Contragent
              },
              success: function(response){

                 var result=eval(response.responseText);
                 switch(result){
                 case 1:
                    store_j.commitChanges();   // changes successful, get rid of the red triangles
                    store_j.reload();          // reload our datastore.
                    break;
                 default:
                    Ext.MessageBox.alert('Uh uh...','We couldn\'t save him...');
                    store_j.reload();          // reload our datastore.
                    break;
                 }
              },
              failure: function(response){
                 var result=response.responseText;
                 Ext.MessageBox.alert('error','could not connect to the database. retry later');
              }
           });
          }


    // create the Data Store
    var store_j = new Ext.data.JsonStore({
        root: 'results',
        totalProperty: 'totalCount',
        idProperty: 'id',
        baseParams: {mode: 'AllRequests'},

        fields: [
                {name: 'reqid', mapping:'reqid', type: 'int'},
                {name: 'applicant_id', mapping:'applicant_id', type: 'string'},
                {name: 'apl_user_name', mapping:'apl_user_name', type: 'string'},
                {name: 'apl_dep', mapping:'apl_dep', type: 'string'},
                {name: 'resp_user_name', mapping:'resp_user_name', type: 'string'},

                {name: 'resp_dep',mapping:'resp_dep', type: 'string'},
                {name: 'responsibly_department_id', mapping:'responsibly_department_id', type: 'string'},
                {name: 'dt_create', mapping:'dt_create', type: 'date', dateFormat: 'd/m/Y'},

                {name: 'dt_execute', mapping:'dt_execute', type: 'date', dateFormat: 'd/m/Y'},
                {name: 'Status', mapping:'Status', type: 'int'},
                {name: 'Status_Name', mapping:'Status_Name', type: 'string'},
                {name: 'Tl_Contract_Template_Id', mapping:'Tl_Contract_Template_Id', type: 'string'},

                {name: 'Contract_Number', mapping:'Contract_Number', type: 'string'},
                {name: 'Contract_Date', mapping:'Contract_Date', type: 'date', dateFormat: 'd/m/Y'},
                {name: 'Contacrt_Return_Date',mapping:'Contacrt_Return_Date', type: 'date', dateFormat: 'd/m/Y'},
                {name: 'Obj',mapping:'Obj', type: 'string'},
                {name: 'Client', mapping:'Client',type: 'string'},
                {name: 'Cl_Email', mapping:'Cl_Email',type: 'string'},
                {name: 'Cost_Of_Service',mapping:'Cost_Of_Service', type: 'string'},
                {name: 'Contragent',mapping:'Contragent', type: 'string'},
                {name: 'responsibly_id',mapping:'responsibly_id', type: 'int'},
                {name: 'apl_user_email',mapping:'apl_user_email', type: 'string'},
                {name: 'apl_user_cellular',mapping:'apl_user_cellular', type: 'string'},
                {name: 'apl_user_internal',mapping:'apl_user_internal', type: 'string'},
                {name: 'apl_user_work_position',mapping:'apl_user_work_position', type: 'string'}

        ],

        // load using script tags for cross domain, if the data in on the same domain as
        // this page, an HttpProxy would be better
        proxy: new Ext.data.ScriptTagProxy({
            url: 'GetReqGrid.jsp'
        })
    });



   // create the Data Store
    var store_j_my = new Ext.data.JsonStore({
        root: 'results',
        totalProperty: 'totalCount',
        idProperty: 'id',
         baseParams: {mode: 'MyRequests'},

        fields: [
                {name: 'reqid', mapping:'reqid', type: 'int'},
                {name: 'applicant_id', mapping:'applicant_id', type: 'string'},
                {name: 'apl_user_name', mapping:'apl_user_name', type: 'string'},
                {name: 'apl_dep', mapping:'apl_dep', type: 'string'},
                {name: 'resp_user_name', mapping:'resp_user_name', type: 'string'},

                {name: 'resp_dep',mapping:'resp_dep', type: 'string'},
                {name: 'responsibly_department_id', mapping:'responsibly_department_id', type: 'string'},
                {name: 'dt_create', mapping:'dt_create', type: 'date', dateFormat: 'd/m/Y'},

                {name: 'dt_execute', mapping:'dt_execute', type: 'date', dateFormat: 'd/m/Y'},
                {name: 'Status', mapping:'Status', type: 'int'},
                {name: 'Status_Name', mapping:'Status_Name', type: 'string'},
                {name: 'Tl_Contract_Template_Id', mapping:'Tl_Contract_Template_Id', type: 'string'},

                {name: 'Contract_Number', mapping:'Contract_Number', type: 'string'},
                {name: 'Contract_Date', mapping:'Contract_Date', type: 'date', dateFormat: 'd/m/Y'},
                {name: 'Contacrt_Return_Date',mapping:'Contacrt_Return_Date', type: 'date', dateFormat: 'd/m/Y'},
                {name: 'Obj',mapping:'Obj', type: 'string'},
                {name: 'Client', mapping:'Client',type: 'string'},
                {name: 'Cl_Email', mapping:'Cl_Email',type: 'string'},
                {name: 'Cost_Of_Service',mapping:'Cost_Of_Service', type: 'string'},
                {name: 'Contragent',mapping:'Contragent', type: 'string'},
                {name: 'responsibly_id',mapping:'responsibly_id', type: 'int'},
                {name: 'apl_user_email',mapping:'apl_user_email', type: 'string'},
                {name: 'apl_user_cellular',mapping:'apl_user_cellular', type: 'string'},
                {name: 'apl_user_internal',mapping:'apl_user_internal', type: 'string'},
                {name: 'apl_user_work_position',mapping:'apl_user_work_position', type: 'string'}


        ],

        // load using script tags for cross domain, if the data in on the same domain as
        // this page, an HttpProxy would be better
        proxy: new Ext.data.ScriptTagProxy({
            url: 'GetReqGrid.jsp'
        })
    });


         function title_respU_D(val, x, store_j){
           return '<b>'+val+'</b> ('+store_j.data.resp_dep+')';
         }

          function title_aplU_D(val, x, store_j){
              return '<b>'+val+'</b> ('+store_j.data.apl_dep+')';
        }


    var release_edit = new Ext.form.DateField({
          format: 'd/m/Y'
        });

            ReqGridColumnModel = new Ext.grid.ColumnModel(
            [{
                header: '#',
                readOnly: true,
                dataIndex: 'reqid', // this is where the mapped name is important!
                width: 50,
                sortable: true,
                hidden: false
              },{
                header: 'Заявитель',
                sortable: true,
                dataIndex: 'apl_user_name',
                renderer:title_aplU_D,
                width: 150

              },
               {header: 'Ответственный',
                width: 175,
                sortable: true,
                renderer: title_respU_D,
                dataIndex: 'resp_user_name'},

               {header: 'Дата заявки', width: 100, sortable: true,
                  renderer: Ext.util.Format.dateRenderer('d/m/Y'),
                  dataIndex: 'dt_create'
                  },
              {header: 'К дате', width: 100, sortable: true,
                  renderer: Ext.util.Format.dateRenderer('d/m/Y'),
                  editor:release_edit,
                  dataIndex: 'dt_execute'

              },

              {
                header: 'Статус',
                dataIndex: 'Status_Name',
                width: 150,
                editor: new Ext.form.ComboBox({
                       typeAhead: true,
                       triggerAction: 'all',
                       store:new Ext.data.SimpleStore({
                        fields:[ 'Status_Name'],
                         data: [[ 'Принято (в процессе)'],['Выполнено'],['Отказано'],['Отложено'],['Снято']]
                                        }),
                       mode: 'local',


                       valueField: 'Status_Name',
                       displayField: 'Status_Name',
                       listClass: 'x-combo-list-small'
            })

              },
          {
                header: 'Номер договора',
                dataIndex: 'Contract_Number',
                width: 50,
                hidden: true                      // we don't necessarily want to see this...
              },
              {header: 'Дата договора', width: 100, sortable: true,
                  renderer: Ext.util.Format.dateRenderer('d/m/Y'),
                  //renderer: 'dt_create',
                  editor:release_edit,
                  dataIndex: 'Contract_Date'},
              {
                header: 'Контрагент',
                dataIndex: 'Contragent',
                width: 150,

                editor: new Ext.form.TextField({
                  allowBlank: false,
                  maxLength: 20
                  })

              }]
      );

      ReqGridColumnModel.defaultSortable= true;

  function createRequest(){
      displayFormCreate();
         // window.location = 'createRequest.jsp?dep=0';
        }

  ReqGridListingEditorGrid =  new Ext.grid.EditorGridPanel({
      id: 'ReqGridListingEditorGrid',
      title : 'Заявки',
      //store: ReqGridDataStore,     // the datastore is defined here
      store: store_j,     // the datastore is defined here
      cm: ReqGridColumnModel,      // the columnmodel is defined here
      enableColLock:false,
      clicksToEdit:1,

      selModel: new Ext.grid.RowSelectionModel({
          singleSelect:false
      }),
      bbar: new Ext.PagingToolbar({
            pageSize: 20,
            store: store_j,
            displayInfo: true,
            displayMsg: 'Показанно заявок  {0} - {1} из {2}',
            emptyMsg: "Нет заявок для показа"
          
        }),
      tbar: [{
         text: 'Создать заявку',
         tooltip: 'Great Tooltip',
         iconCls:'add',    // this is defined in our styles.css
         handler: createRequest //displayFormWindow
      }]

    } );
   store_j.load({params: {start: 0, limit: 20}});

  


  ReqGridListingEditorGrid.on('afteredit',saveTheRequest);

   ReqGridListingEditorGrid.getSelectionModel().on('rowselect', function(sm, rowIdx, r) {
        var detailAdditionalPanel = Ext.getCmp('AdditionalPanel');
        AdditionalTpl.overwrite(detailAdditionalPanel.body, r.data);
        var pPanel = Ext.getCmp('p');
        bookTpl.overwrite(pPanel.body, r.data);

        var detailProfileTpl = Ext.getCmp('ProfilePanel');
        ProfileTpl.overwrite(detailProfileTpl.body, r.data);


        
        var CommPanel = Ext.getCmp('CommentPanel');
        var File_Panel = Ext.getCmp('FilePanel');
        var connFile = new Ext.data.Connection();
        var conn2 = new Ext.data.Connection();
  /*      var conn3 = new Ext.data.Connection();
                         conn3.request({
                          url: 'getter_req.jsp',
                          params: {
                             reqid: r.data.reqid
                          },
                          success: function(resp,opt) {
                             var Com = Ext.util.JSON.decode(
                               resp.responseText
                             );
                              bookTpl.overwrite(detailPanel.body, {request:Com});
                          },
                          failure: function(resp,opt) {
                             Ext.Msg.alert('Error','Ошибка связи');
                          }
                        })
*/
                       conn2.request({
                          url: 'getter_comment.jsp',
                          params: {

                             reqid: r.data.reqid
                          },
                          success: function(resp,opt) {
                             var Com = Ext.util.JSON.decode(
                               resp.responseText
                             );
                              CommentTpl.overwrite(CommPanel.body, {comment:Com});
                          },
                          failure: function(resp,opt) {
                             Ext.Msg.alert('Error','Ошибка связи');
                          }
                        })

                          connFile.request({
                          url: 'getter_files_name.jsp',
                          params: {
                             reqid: r.data.reqid
                          },
                          success: function(resp,opt) {
                               var Com = resp.responseText
                              FileTpl.overwrite(FilePanel.body, {Name:Com});
                          },
                          failure: function(resp,opt) {
                             Ext.Msg.alert('Error','Ошибка связи');
                          }
                        })

	});



   /**Мои заявки */
     MyReqGridListingEditorGrid =  new Ext.grid.EditorGridPanel({
      id: 'MyReqGridListingEditorGrid',
      title : 'Мои заявки',
      //store: ReqGridDataStore,     // the datastore is defined here
      store: store_j_my,     // the datastore is defined here
      cm: ReqGridColumnModel,      // the columnmodel is defined here
      enableColLock:false,
      clicksToEdit:1,

      selModel: new Ext.grid.RowSelectionModel({
          singleSelect:false
      }),
      bbar: new Ext.PagingToolbar({
            pageSize: 20,
            store: store_j,
            displayInfo: true,
            displayMsg: 'Показанно заявок  {0} - {1} из {2}',
            emptyMsg: "Нет заявок для показа"

        })

    } );
   store_j_my.load({params: {start: 0, limit: 20}});




  MyReqGridListingEditorGrid.on('afteredit',saveTheRequest);

   MyReqGridListingEditorGrid.getSelectionModel().on('rowselect', function(sm, rowIdx, r) {
        var detailAdditionalPanel = Ext.getCmp('AdditionalPanel');
        AdditionalTpl.overwrite(detailAdditionalPanel.body, r.data);

        var pPanel = Ext.getCmp('p');
        bookTpl.overwrite(pPanel.body, r.data);

        var detailProfileTpl = Ext.getCmp('ProfilePanel');
        ProfileTpl.overwrite(detailProfileTpl.body, r.data);


        //var detailPanel = Ext.getCmp('p');
        var CommPanel = Ext.getCmp('CommentPanel');
        var File_Panel = Ext.getCmp('FilePanel');
        var connFile = new Ext.data.Connection();
        var conn2 = new Ext.data.Connection();
        /*var conn3 = new Ext.data.Connection();
                         conn3.request({
                          url: 'getter_req.jsp',
                          params: {
                             reqid: r.data.reqid
                          },
                          success: function(resp,opt) {
                             var Com = Ext.util.JSON.decode(
                               resp.responseText
                             );
                              bookTpl.overwrite(detailPanel.body, {request:Com});
                          },
                          failure: function(resp,opt) {
                             Ext.Msg.alert('Error','Ошибка связи');
                          }
                        })
*/
                       conn2.request({
                          url: 'getter_comment.jsp',
                          params: {

                             reqid: r.data.reqid
                          },
                          success: function(resp,opt) {
                             var Com = Ext.util.JSON.decode(
                               resp.responseText
                             );
                              CommentTpl.overwrite(CommPanel.body, {comment:Com});
                          },
                          failure: function(resp,opt) {
                             Ext.Msg.alert('Error','Ошибка связи');
                          }
                        })

                          connFile.request({
                          url: 'getter_files_name.jsp',
                          params: {
                             reqid: r.data.reqid
                          },
                          success: function(resp,opt) {
                               var Com = resp.responseText
                              FileTpl.overwrite(FilePanel.body, {Name:Com});
                          },
                          failure: function(resp,opt) {
                             Ext.Msg.alert('Error','Ошибка связи');
                          }
                        })

	});

        /**Мои заявки end*/

    var p = new Ext.Panel({
        region: 'west',
        xtype: 'panel',
        title: 'Заявка',
        width: 500,
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

        xtype: 'panel',
        title: 'Информация',

        autoScroll : 1,
        overflow:'auto',
        id: 'AdditionalPanel',

         bodyStyle: {
                background: '#ffffff',
                padding: '7px'
        },
        html: 'Выберите заявку из списка'

     });

 // define a template to use for the detail view
	var AdditionalTplMarkup = [
		   '<font face="Verdana" size="1">',
           '<table width="100%" cellpading="0" cellspacing="0">',
           ' <tr>                                              ',
           '     <td><b>Договор:</b>{Contract}</td>            ',
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
	var AdditionalTpl = new Ext.Template(AdditionalTplMarkup);

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

         bodyStyle: {
                background: '#ffffff',
                padding: '7px'
        },
        html: 'Выберите заявку из списка'

     });


    var FileTplMarkup = [  '{Name}'	];
    var FileTpl = new Ext.Template(FileTplMarkup);
            var action = new Ext.Action({
                text: 'Добавить файл',
                handler: function(){
                    Ext.Msg.alert('Загрузка!', 'Файл загружен');
                },
                iconCls: 'blist'
            });

    var FilePanel = new Ext.Panel({
        xtype: 'tabpanel',
        title: 'Прикрепленные файлы ',
        autoScroll : 1,
        overflow:'auto',
        id: 'FilePanel',
        tbar: [ action ],
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

   function onMainClick(item){
               window.location = '../portal.jsp';
           }
           function onExitClick(item){
               window.location = '../logout.jsp';
           }
           function onMyProfilClick(item){
               window.location = 'MyProfile.jsp';
           }
           function onMySettingsClick(item){
               window.location = 'MySettings.jsp';
           }


            var tb = new Ext.Toolbar();
            var menu = new Ext.menu.Menu({
                    id: 'mainMenu',
                    style: {
                        overflow: 'visible'     // For the Combo popup
                    },
                    items: [
                        {
                            text: 'Главная',
                            handler: onMainClick
                        }, '-',  {
                            text: 'Выход',
                            handler: onExitClick
                        }
                    ]
                });


            var menu1 = new Ext.menu.Menu({
                    id: 'MenuSettings',
                    style: {
                        overflow: 'visible'     // For the Combo popup
                    },
                    items: [
                        {
                            text: 'Мой профиль',
                            handler: onMyProfilClick

                        }, '-',  {
                            text: 'Мои настройки',
                            handler: onMySettingsClick
                        }
                    ]
                });
        tb.add({
            text:'Задачи',
            iconCls: 'bmenu',  // <-- icon
            menu: menu  // assign menu by instance
        });

        /*tb.add({
            text:'Настройки',
            iconCls: 'bmenu',  // <-- icon
            menu: menu1  // assign menu by instance
        });
*/
            var viewport = new Ext.Viewport({
                layout: 'border',
                renderTo: Ext.getBody(),
                items: [{
                        region: 'north',
                        xtype: 'panel',
                        height:28,
                        tbar:tb
                    },
                    {
                        region: 'center',
                        items: [{
                                region: 'North',
                                height: 400,
                                split: true,
                                xtype: 'tabpanel',
                                activeTab: 0,
                                items: [ ReqGridListingEditorGrid,
                                       MyReqGridListingEditorGrid
                                ]

                            },
                            AdditionalPanel
                        ]
                    },
                    {
                         region: 'east'
                         ,xtype: 'panel'
                         ,split: true
                         ,width: 255
                         ,collapsible: true
                         ,collapseMode: 'mini'
                         ,         items:[ProfilePanel]

                     },
                    {
                        region: 'south',
                        xtype: 'panel',
                        height: 250,
                        layout: 'border',
                        border: false,
                        items:  [ p,
                            {
                                region: 'center',
                                xtype: 'tabpanel',
                                activeTab: 0,
                                items: [
                                    
                                    CommentPanel,
                                    FilePanel
                                ]
                            }
                        ]
                    }
                ]
            });
        });
    </script>
    <body ><font face="Verdana"></font>
    </body>
<%} else {%>
  <body>
      нет доступа
  </body>
  </html>
 <%}
} else {%>
<html>
     <body>
      <script>
      <%
        out.println("parent.location = '../index.jsp';");
      %>
      </script>
     </body>
     </html>
      <%}%>

 <%

} catch (Exception e) {
  %>
  <html>
             <body>
              <script>
              <%
                out.println("parent.location = '../index.jsp';");
              %>
              </script>
             </body>
             </html>
<%
}

%>