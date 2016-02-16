<%--
    Document   : main
    Created on : 21.06.2010, 13:46:25
    Author     : shavrak.ka
--%>

<%@ page import="java.sql.Types, oracle.jdbc.OracleConnection, oracle.jdbc.OracleCallableStatement"
  contentType="text/html;charset=windows-1251"
%>

<jsp:useBean id="db_conn" class="Leela.db.Conn" scope="session" />
<jsp:useBean id="sys_util" class="Leela.core.Util" scope="session" />
<jsp:useBean id="sys_auth" class="sys.auth.auth" scope="session" />
<html>
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
        <title>main</title>
    </head>
    <body>
    <%
String V_LOGIN_ID = "0";
String V_APP_NAME = "crm.sys.auth.portal";
String V_USER_IP = request.getRemoteAddr();
String s_error_text = "";
int v_res = 0;
            try {
                Cookie[] cookies = request.getCookies();

                for (int i = 0; i < cookies.length; i++) {
                    if (cookies[i].getName().equals("crm.leela.auth")) {
                        V_LOGIN_ID = sys_util.nvl(cookies[i].getValue(), "0");
                    }
                }

                v_res = sys_auth.Logout(
                        db_conn.GetConnect(),
                        V_LOGIN_ID
                        );
            } catch (Exception e) {
                s_error_text = e.toString();
            } finally {

                db_conn.CloseConnect();
            }

          if (v_res >0){


                      %>
             <html><body>Good bye...<script>
              <%
              out.println("parent.location = '../index.jsp';");
              //out.println("parent.location = '"+ g_base_url +"neo/index.html';");
              %>
             </script></body></html>

              <%


    } else {
        s_error_text = s_error_text + " пустая сессия / нужно войти <a href='index.jsp'>Login</a> ";
    }
    %>
    <%= s_error_text%>
    </body>
</html>
