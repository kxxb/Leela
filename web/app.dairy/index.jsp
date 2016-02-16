<%-- 
    Document   : index
    Created on : 06.06.2011, 17:19:17
    Author     : kxxb
--%>

<%@page contentType="text/html" pageEncoding="UTF-8"%>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN"
   "http://www.w3.org/TR/html4/loose.dtd">

<%@ page import="java.sql.Types, oracle.jdbc.OracleConnection, oracle.jdbc.OracleResultSet, java.sql.*, oracle.jdbc.OracleCallableStatement"
     %>
    <jsp:useBean id="db_conn" class="Leela.db.Conn" scope="session" />
    <jsp:useBean id="Lela_core" class="Leela.core.user_managment" scope="session" />



<jsp:useBean id="sys_auth" class="sys.auth.auth" scope="session" />
<jsp:useBean id="sys_util" class="Leela.core.Util" scope="session" />
<jsp:useBean id="sys_menu" class="Leela.core.menu_builder" scope="session" />
<%

String V_LOGIN_ID = "0";
String V_APP_NAME = "diary";
String V_USER_IP = request.getRemoteAddr();
String s_error_text = "";
int G_User_Id = 0;
            try {
                Cookie[] cookies = request.getCookies();

                for (int i = 0; i < cookies.length; i++) {
                    if (cookies[i].getName().equals("crm.leela.auth")) {
                        V_LOGIN_ID = sys_util.nvl(cookies[i].getValue(), "0");
                    }
                }

                G_User_Id = sys_auth.Check_Login(
                        db_conn.GetConnect(),
                        V_LOGIN_ID,
                        V_APP_NAME,
                        V_USER_IP);
            } catch (Exception e) {
                s_error_text = e.toString();
            } finally {

                db_conn.CloseConnect();
            }


   int G_Userd_Dep_Id = Lela_core.get_user_depid(db_conn.GetConnect(), G_User_Id);
   int G_User_Group_Id = Lela_core.Get_Users_Group(db_conn.GetConnect(), G_User_Id);
   if (G_User_Id == 0) {
    %>
<html>
    <head>
      <script>
        function Open() {
          window.location = '../index.jsp';
          //window.open('portal.jsp', '', 'scrollbars=auto,directories=no,location=no,menubar=no,resizable=yes,status=yes,titlebar=yes,toolbar=no,top=0,left=0,width='+(screen.availWidth-10)+',height='+(screen.availHeight-50));
          //window.opener = this;
          //window.close(self);
        }
      </script>
    </head>
    <body onload="Open()">
    </body></html>
<%
} else {

%>

<html>
  <head>
    <title>Дневник</title>


    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">

        <!-- ** CSS ** -->
        <!-- base library -->

        <link rel="stylesheet" type="text/css" href="../js/ext-3.2.1/resources/css/ext-all.css" />
        <link rel="stylesheet" type="text/css" href="../js/ext-3.2.1/resources/shared/icons/silk.css" />
        <link rel="stylesheet" type="text/css" href="LeelaStyle.css" />


        <!-- ** Javascript ** -->
        <!-- base library -->


        <script type="text/javascript" src="../js/ext-3.2.1/adapter/ext/ext-base.js"></script>
        <script type="text/javascript" src="../js/ext-3.2.1/ext-all-debug-w-comments.js"></script>


        <!-- My extensions -->
        <script language="javascript" >
            var flag_debug = 0;
            if (flag_debug == 0){
            var gUserId = <%=G_User_Id%>;
            var gUserDepId = <%=G_Userd_Dep_Id%>;

            /*GROUPS
             *1  Admins                  Максимальный уровень доступа
              2  Resp Users              Работник исполнительного отдела
              3  Resp Department  Chief  Начальник исполнительного отдела
              4  Aplicant User           Работник  заявительного отдела
              5  Aplicant Dep Chief	     Начальник заявительного отдела
              6  Department Secretar     Секретарь отдела
             *
             **/
            var gUserGroupId = <%=G_User_Group_Id%>;
} else {
            var gUserId = 113;
            var gUserDepId = 2;

            /*GROUPS
             *1  Admins                  Максимальный уровень доступа
              2  Resp Users              Работник исполнительного отдела
              3  Resp Department  Chief  Начальник исполнительного отдела
              4  Aplicant User           Работник  заявительного отдела
              5  Aplicant Dep Chief	     Начальник заявительного отдела
              6  Department Secretar     Секретарь отдела
             *
             **/
            var gUserGroupId = 1;
}


        </script>
        <script type="text/javascript" >
          Ext.ns("app");    // extablish a namespace for all my component parts

        Ext.BLANK_IMAGE_URL = '../js/ext-3.2.1/resources/images/default/s.gif';
        Ext.onReady(function(){
        Ext.state.Manager.setProvider(new Ext.state.CookieProvider());
        Ext.QuickTips.init();

        <%=sys_menu.get_menu_js(db_conn.GetConnect())%>
        var tb = new Ext.Toolbar();
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
                    }// eof    region: 'north',
                   ,{region: 'center'
                        /*здесь будут все табы*/
                           ,xtype :'dairytab'

                    } // eof region: 'center'
                    ,{region: 'south',
                        /*пустое пространство*/
                        height:28,
                        items: [{
                          html: "&nbsp;&nbsp;&nbsp;Paul's Yard &copy; 2011  "
                        }
                        ]
                    } // eof region: 'south'
                 ] //eof viewport items
            });//eof viewport

        });

        </script>
        <script type="text/javascript" src="app.dairy.frm.js"></script>
        <script type="text/javascript" src="app.dairy.tab.js"></script>
        <script type="text/javascript" src="app.dairy.detailtab.js"></script>
        
        <script type="text/javascript" src="app.dairy.grid.js"></script>
        
        <script type="text/javascript" src="../stores/req/Store.js"></script>
        









  </head>
  <body >

    Подгружаю данные!

  </body>
</html>

<%}%>