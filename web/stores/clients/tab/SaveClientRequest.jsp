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
                "Begin ? := CRM_CLIENT.Create_Client_Request(?,?,?,?,?,?,?,?,?,?,?,?,?,?); End;"
              );
              stmt.registerOutParameter(1, Types.INTEGER);  // o_Result
              stmt.setString(2, "0");
              stmt.setString(3, request.getParameter("P_LOT"));
              stmt.setString(4, request.getParameter("P_OPERATION_ID"));
              stmt.setString(5, request.getParameter("P_BUDGET_START"));
              stmt.setString(6, request.getParameter("P_BUDGET_END"));
              stmt.setString(7, request.getParameter("P_CURRENCY_ID"));
              stmt.setString(8, request.getParameter("P_AREA_START"));
              stmt.setString(9, request.getParameter("P_AREA_END"));
              stmt.setString(10, request.getParameter("P_URGENCY"));
              stmt.setString(11, request.getParameter("P_DESTINATION"));
              stmt.setString(12, request.getParameter("P_READY_ID"));
              stmt.setString(13, request.getParameter("P_ADDITIONAL_INFO"));
              stmt.setString(14, request.getParameter("P_LAST_USER_ID"));
              stmt.setString(15, request.getParameter("P_CLIENT_ID"));

              
                                         
                                     
              

          stmt.execute();
          int res = stmt.getInt(1);

          if (res == 1){
              out.println("{success:true}");
          } else {
              out.println("{success:false}");
          }

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

