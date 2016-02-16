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
<%

String V_LOGIN_ID = "0";
String V_APP_NAME = "portal";
String V_USER_IP = request.getRemoteAddr();
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
      <script>
        function Open() {
          window.location = 'app.portal/';
          //window.open('portal.jsp', '', 'scrollbars=auto,directories=no,location=no,menubar=no,resizable=yes,status=yes,titlebar=yes,toolbar=no,top=0,left=0,width='+(screen.availWidth-10)+',height='+(screen.availHeight-50));
          //window.opener = this;
          //window.close(self);
        }
      </script>
    </head>
    <body onload="Open()">
    </body></html>
<%}%>