<%@ page import="java.sql.Types,  java.sql.*"
         contentType="text/html;charset=utf-8"  %>
<jsp:useBean id="db_conn" class="Leela.db.Conn" scope="session" />
<jsp:useBean id="Lela_core" class="Leela.core.user_managment" scope="session" />
<%
        String v_result ="";
        Connection conn = null;
        CallableStatement stmt = null;
    try {
        conn = db_conn.GetConnect();
        //int g_user_id = Lela_core.get_users_by_ip(conn, request.getRemoteAddr());


         request.setCharacterEncoding("utf-8");
         stmt =  conn.prepareCall(
            "Begin ? := CRM_CORE.find_call(?); End;"
          );

          stmt.registerOutParameter(1, Types.VARCHAR);  // o_Result
          stmt.setString(2, request.getParameter("p_input_tel"));
          //stmt.setString("responsibly", request.getParameter("responsibly"));
          


          stmt.execute();
          String res = stmt.getString(1);

         //out.println("<xml version='1.0' encoding='utf-8'>"); windows-1251
         out.println(res);
         } catch (Exception e) {
                out.println(e.toString());
            }finally {

            if (stmt != null) stmt.close();
            if (conn != null) {
              try {
                conn.rollback();
              } catch(Exception ex) {}
              try {
                conn.close();
              } catch(Exception ex) {}
            }
           }
%>

