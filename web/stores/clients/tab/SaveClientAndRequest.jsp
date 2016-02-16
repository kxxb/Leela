<%-- 
    Document   : SaveClientAndRequest
    Created on : 11.11.2011, 11:28:55
    Author     : kxxb

Сохраняю одновременно и клиента и его заявку

--%>
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
         String v_is_subscribe ="0";
         if (request.getParameter("P_IS_SUBSCRIBE").equals("true")){
             v_is_subscribe ="1";
         }
          stmt =  conn.prepareCall(
                "Begin ? := CRM_CLIENT.Create_Client_And_Request(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?); End;"
              );
          
          
          
              stmt.registerOutParameter(1, Types.INTEGER);  // o_Result
          

                /*client */
              
              stmt.setString(2, request.getParameter("P_NAME"));
              stmt.setString(3, request.getParameter("P_TEL_CELLULAR"));
              stmt.setString(4, request.getParameter("P_TEL_STAT"));
              stmt.setString(5, request.getParameter("P_EMAIL"));
              stmt.setString(6, v_is_subscribe);
              stmt.setString(7, request.getParameter("P_CRM_CLIENT_ORGANIZATION"));
              stmt.setString(8, request.getParameter("P_JOB_TITLE"));
              stmt.setString(9, request.getParameter("P_CLIENT_DESCRIPTION"));
              

              /***/
              /*request*/
              
              stmt.setString(10, request.getParameter("P_LOT"));
              stmt.setString(11, request.getParameter("P_OPERATION_ID"));
              stmt.setString(12, request.getParameter("P_BUDGET_START"));
              stmt.setString(13, request.getParameter("P_BUDGET_END"));
              stmt.setString(14, request.getParameter("P_CURRENCY_ID"));
              stmt.setString(15, request.getParameter("P_AREA_START"));
              stmt.setString(16, request.getParameter("P_AREA_END"));
              stmt.setString(17, request.getParameter("P_URGENCY"));
              stmt.setString(18, request.getParameter("P_DESTINATION"));
              stmt.setString(19, request.getParameter("P_READY_ID"));
              stmt.setString(20, request.getParameter("P_ADDITIONAL_INFO"));
              stmt.setString(21, request.getParameter("P_LAST_USER_ID"));
              
              
              /**/
                                         
                                     
              

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
