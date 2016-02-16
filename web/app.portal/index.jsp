<%-- 
    Document   : portal
    Created on : 26.08.2010, 12:23:29
    Author     : shavrak.ka
--%>


<%@page contentType="text/html" pageEncoding="UTF-8"%>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN"
   "http://www.w3.org/TR/html4/loose.dtd">
<jsp:useBean id="db_conn" class="Leela.db.Conn" scope="session" />
<jsp:useBean id="Lela_core" class="Leela.core.user_managment" scope="session" />

<jsp:useBean id="sys_auth" class="sys.auth.auth" scope="session" />
<jsp:useBean id="sys_util" class="Leela.core.Util" scope="session" />
<jsp:useBean id="sys_menu" class="Leela.core.menu_builder" scope="session" />
<jsp:useBean id="sys_content" class="Leela.core.GetContetnt" scope="session" />
<%

String V_LOGIN_ID = "0";
String V_APP_NAME = "portal";
String V_USER_IP = request.getRemoteAddr();
String v_content =   "";
String s_error_text = "";
int v_user_id = 0;
            try {
                Cookie[] cookies = request.getCookies();

                for (int i = 0; i < cookies.length; i++) {
                    if (cookies[i].getName().equals("crm.leela.auth")) {
                        V_LOGIN_ID = sys_util.nvl(cookies[i].getValue(), "0");
                    }
                }

                v_user_id = sys_auth.Check_Login(
                        db_conn.GetConnect(),
                        V_LOGIN_ID,
                        V_APP_NAME,
                        V_USER_IP);
                
            } catch (Exception e) {
                s_error_text = e.toString();
            } finally {

                db_conn.CloseConnect();
            }
         v_content =   sys_content.get_content(db_conn.GetConnect(), 1, v_user_id);
 if (v_user_id == 0) {
     
    %>
<html>
    <head>
      <script>
        function Open() {
          window.location = 'index.jsp';
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
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
        <title>Paul's Yard Portal</title>

        <!-- ** CSS ** -->
        <!-- base library -->
        <link rel="stylesheet" type="text/css" href="../js/ext-3.2.1/resources/css/ext-all.css" />
        <link href="styles/style.css" rel="stylesheet" type="text/css">
        <!-- overrides to base library -->

     <script type="text/javascript" >
       var g_username = "<%=Lela_core.get_username(db_conn.GetConnect(), v_user_id)%>";

    </script>
        <!-- ** Javascript ** -->
        <!-- base library -->
        <script type="text/javascript" src="../js/ext-3.2.1/adapter/ext/ext-base.js"></script>
        <script type="text/javascript" src="../js/ext-3.2.1/ext-all-debug.js"></script>
        <script type="text/javascript">
         Ext.onReady(function(){

   



         var tb = new Ext.Toolbar();
    
       
         <%=sys_menu.get_menu_js(db_conn.GetConnect())%>

        tb.add({
            text:'Задачи',
            iconCls: 'bmenu',  // <-- icon
            menu: menu  // assign menu by instance
        });
/*
        tb.add({
            text:'Настройки',
            iconCls: 'bmenu',  // <-- icon
            menu: menu1  // assign menu by instance
        });
*/


/***********************************/
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
				html: 'Please select request!'

     });

 // define a template to use for the detail view
	var AdditionalTplMarkup = [
          '<font face="Verdana" size="3">',
           '<table width="100%" cellpading="0" cellspacing="0">',
           ' <tr>                                              ',
           '     <td><b>Договор:</b>{Contract}</td>            ',
           '     <td><b>email:</b>{Cl_Email}</td>              ',
           '  </tr>                                            ',
           '  <tr>                                             ',
           '     <td><b>Клиент:</b>{Client}</td>               ',
           '     <td><b>Контрагент:</b>{Contragent}</td>       ',
           '  </tr>                                            ',
           '  <tr>                                             ',
           '     <td><b>Объект:</b>{Obj}</td>                  ',
           '     <td><b>Стоимость услуги:</b>{Cost_Of_Service}</td> ',
           '  </tr>                                                 ',
           '</table>            </font >                                '
	];
	var AdditionalTpl = new Ext.Template(AdditionalTplMarkup);
    /***********************************/
            var viewport = new Ext.Viewport({
                  layout: 'border',
                  //renderTo: Ext.getBody(),
                  renderTo: Ext.Element.get('top_m'),
                  items: [{
                     region: 'north',
                     xtype: 'panel',
                     height:28,
                     tbar:tb}
                     
                  ]
                });
                
        });
                </script>
    </head>
    <body>
        <div id="top_m"></div>
        <%=v_content%>
    </body>
</html>
<%}%>