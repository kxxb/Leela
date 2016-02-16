<%-- 
    Document   : login
    Created on : 30.06.2010, 18:22:35
    Author     : shavrak.ka
--%>
<%@page import="java.sql.CallableStatement"%>
<%@page import="java.sql.Connection"%>
<%@ page import="java.sql.Types "
  contentType="text/html;charset=windows-1251"
%>

<jsp:useBean id="db_conn" class="Leela.db.Conn" scope="session" />
<jsp:useBean id="sys_auth" class="sys.auth.auth" scope="session" />




<%
  String s_login = request.getParameter("login");
  String s_pass = request.getParameter("pass");

  String s_error_text = "";

  Connection conn = null;
  CallableStatement stmt = null;


  if (s_login != null & s_pass != null) {
   // db conect and veryfy user
    try{


          //int res = sys_auth.Logon(db_conn.GetConnect(), s_login, s_pass, request.getRemoteAddr());
          int res = sys_auth.LdapLogon(db_conn.GetConnect(), s_login, s_pass, request.getRemoteAddr());

           if (res > 0  ) {

               Cookie cookie1 = new Cookie("crm.leela.auth", Integer.toString(res));
               cookie1.setMaxAge(24 * 60 * 60);
               response.addCookie(cookie1);

              s_error_text = "{success:true}";

          }else {
              s_error_text = "{success:false,errors:{reason:'Неправильный логин или пароль!'}}" ;
          }



     }catch (Exception e){
        s_error_text = e.toString();
     }
     finally {
      if (stmt != null) stmt.close();
      db_conn.CloseConnect();
     }
  }
  else {
      s_error_text = "{success:false,errors:{reason:'Пустой пароль'}}";
      };

 %>
<%=s_error_text %>