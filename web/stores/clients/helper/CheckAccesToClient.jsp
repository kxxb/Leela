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
                "Begin ? := Crm_Client.check_visibility_right(?,?); End;"
              );
              stmt.registerOutParameter(1, Types.INTEGER);  // o_Result
              stmt.setString(2, request.getParameter("P_USER_ID"));
              stmt.setString(3, request.getParameter("P_CLIENT_ID"));
              
         
          stmt.execute();
          int res = stmt.getInt(1);
          out.println("{success:true,errors:{result:"+res+"}}");
          
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

