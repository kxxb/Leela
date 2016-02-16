<%-- 
    Document   : index
    Created on : 27.09.2010, 12:09:11
    Author     : kxxb
Эта страница доступна долько пользователям из групп

1	Admins	Максимальный уровень доступа
--%>


<%@ page import="java.sql.Types,  java.sql.*"
contentType="text/html;charset=windows-1251" pageEncoding="Cp1251"   %>
<jsp:useBean id="db_conn" class="Leela.db.Conn" scope="session" />
<jsp:useBean id="Lela_core" class="Leela.core.user_managment" scope="session" />
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN"
"http://www.w3.org/TR/html4/loose.dtd">

<%
Connection conn = db_conn.GetConnect();

try{
if (Lela_core.users_sys_queit_login(conn, session.getId(), request.getRemoteAddr()) == 1) {
  int g_user_id = Lela_core.get_users_by_ip(conn, request.getRemoteAddr());
//if (Lela_core.Check_User_Session(conn, session.getId(), g_user_id, g_login_id)==1){
 int group_id = Lela_core.Get_Users_Group(conn, g_user_id);
 int dep_id = Lela_core.get_user_depid_by_ip(conn, request.getRemoteAddr());





%>
<html>
    <head>
        <meta http-equiv="Content-Type" >
        <title>Шаблоны</title>

        <!-- ** CSS ** -->
        <!-- base library -->

        <link rel="stylesheet" type="text/css" href="../js/ext-3.2.1/resources/css/ext-all.css" />
        <style type="text/css">
            .red-row {
                background-color:#dc143c !important;
            }
            .green-row {
                background-color:#3caa3c !important;
            }
/*
            .x-grid3-row-selected {
               background-color: red !important;
            }*/

        </style>



        <!-- overrides to base library -->


        <!-- ** Javascript ** -->
        <!-- base library -->
        <script type="text/javascript" src="../js/ext-3.2.1/adapter/ext/ext-base.js"></script>
        <script type="text/javascript" src="../js/ext-3.2.1/ext-all-debug.js"></script>
        <script type="text/javascript" src="MyjsExt/MyApplications.js"></script>
        
        

    </head>
    <script type="text/javascript">
    
    
    var ReqGridDataStore;
    var ReqGridColumnModel;
    var ReqGridListingEditorGrid;
    var ReqGridListingWindow;
    var ReqId = '-7';
    var docId ='-7';
    var gUserDepId = <%=dep_id%>

 

Ext.onReady(function(){




    <%@include file="../frm/req/AddTemplateDoc/FilesUpload.js" %>
  <%@include file="../tree/req/UrTemplate.js" %>
    

   Ext.state.Manager.setProvider(new Ext.state.CookieProvider());
           function onMainClick(item){
               window.location = '../portal.jsp';
           }
           function onReqClick(item){
               window.location = '../app.requests/index.jsp';
           }
           function onExitClick(item){
               window.location = '../logout.jsp';
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

                        },
                        {
                            text: 'Заявки',
                            handler: onReqClick

                        }

                    ]
                });


        tb.add({
            text:'Задачи',
            iconCls: 'bmenu',  // <-- icon
            menu: menu  // assign menu by instance
        });

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
                                height: 850,
                                split: true,
                                xtype: 'tabpanel',
                                activeTab: 0,

                                items: [  tree  ]

                            }
                        ]
                    },
                    {
                        region: 'east',
                        width: 800,
                        autoScroll : 1,
                                overflow:'auto',
                        items:[
                            {   xtype: 'tabpanel',
                                title: 'Тело документа',
                                autoScroll : 1,
                                overflow:'auto',
                                id: 'DocPanel',
                                bodyStyle:{
                                     background: '#ffffff',
                                     padding: '7px'
                                   },
                                html: 'Выберите документ из дерева'

                             }
                        ]
                        
                        //items: [     ]
                    }

                ]
            });
  
    });
    </script>
    <body>

    
    <body ><font face="Verdana"></font>
    </body>
<%
} else {%>
<html>
     <body>
              <script>
                parent.location = '../index.jsp';
              </script>
     </body>
     </html>
      <%}

} catch (Exception e) {
  %>
  <html>
             <body>
              <script>
                parent.location = '../index.jsp';
              </script>
             </body>
             </html>
<%
}

%>

