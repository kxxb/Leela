<%@ page import="java.sql.Types,  java.sql.*"
         contentType="text/html;charset=utf-8"  %>
<jsp:useBean id="db_conn" class="Leela.db.Conn" scope="session" />
<jsp:useBean id="Lela_core" class="Leela.core.user_managment" scope="session" />
<%
        String v_result ="";
        Connection conn = null;
        int transfer_uid = 0;
        int charcter_id = 99;
        int currency_id = 99;
                
        CallableStatement stmt = null;
    try {
       
        conn = db_conn.GetConnect();
        //int g_user_id = Lela_core.get_users_by_ip(conn, request.getRemoteAddr());
         request.setCharacterEncoding("utf-8");
         if (request.getParameter("P_MODE").equals("CRU")){
             try {
               transfer_uid = Integer.parseInt(request.getParameter("P_TRANSFER_USER"));
             charcter_id =Integer.parseInt(request.getParameter("P_CHARACTER_ID"));
               currency_id = Integer.parseInt(request.getParameter("P_CURRENCY_ID"));

              } catch (NumberFormatException ex) {
               transfer_uid = Integer.parseInt(request.getParameter("P_TRANSFER_ID"));
               charcter_id =Integer.parseInt(request.getParameter("P_CHARACTER_ID"));
               currency_id = Integer.parseInt(request.getParameter("P_CURRENCY_ID"));

            }
             stmt =  conn.prepareCall(
                "Begin ? := CRM_CORE.save_call(?,?,?,?,?,?,?,?,?,?,?,?,?); End;"
              );
              stmt.registerOutParameter(1, Types.INTEGER);  // o_Result
              stmt.setString(2, request.getParameter("P_ID"));
              stmt.setString(3, request.getParameter("P_CALL_DATE_TIME"));
              stmt.setString(4, request.getParameter("P_CRM_REK_S_SOURCE_ID"));
              stmt.setString(5, request.getParameter("P_REC_SECRETAR"));
              stmt.setString(6, request.getParameter("P_INPUT_TEL"));
              stmt.setString(7, request.getParameter("P_CALL_DESCRIPTION"));
              stmt.setInt(8, transfer_uid);
              stmt.setString(9, request.getParameter("P_LAST_USER_ID"));
              stmt.setString(10, request.getParameter("P_CALL_GRAVITY"));
              stmt.setString(11, request.getParameter("P_LOTS"));
              stmt.setInt(12, charcter_id);
              stmt.setString(13, request.getParameter("P_BUDJET"));
              stmt.setInt(14, currency_id);

          } else if (request.getParameter("P_MODE").equals("RES")){
              stmt =  conn.prepareCall(
                "Begin ? := CRM_CORE.call_result(?,?,?,?); End;"
              );

              stmt.registerOutParameter(1, Types.INTEGER);  // o_Result
              stmt.setString(2, request.getParameter("P_ID"));
              stmt.setString(3, request.getParameter("P_RESULT_DESC"));
              stmt.setString(4, request.getParameter("P_RESULT_ID"));
              stmt.setString(5, request.getParameter("P_LAST_USER_ID"));


          } else if (request.getParameter("P_MODE").equals("U")){
              
              
              try {
               transfer_uid = Integer.parseInt(request.getParameter("P_TRANSFER_USER"));
             charcter_id =Integer.parseInt(request.getParameter("P_CHARACTER_ID"));
               currency_id = Integer.parseInt(request.getParameter("P_CURRENCY_ID"));

              } catch (NumberFormatException ex) {
               transfer_uid = Integer.parseInt(request.getParameter("P_TRANSFER_ID"));
               charcter_id =Integer.parseInt(request.getParameter("P_CHARACTER_ID"));
               currency_id = Integer.parseInt(request.getParameter("P_CURRENCY_ID"));

            }
              stmt =  conn.prepareCall(
                "Begin ? := CRM_CORE.edit_call(?,?,?,?,?,?,?,?,?,?,?,?,?); End;"
              );
              stmt.registerOutParameter(1, Types.INTEGER);  // o_Result
              stmt.setString(2, request.getParameter("P_ID"));
              stmt.setString(3, request.getParameter("P_CALL_DATE_TIME"));
              stmt.setString(4, request.getParameter("P_CRM_REK_S_SOURCE_ID"));
              stmt.setString(5, request.getParameter("P_REC_SECRETAR"));
              stmt.setString(6, request.getParameter("P_INPUT_TEL"));
              stmt.setString(7, request.getParameter("P_CALL_DESCRIPTION"));
              stmt.setString(8, request.getParameter("P_TRANSFER_ID"));
              stmt.setString(9, request.getParameter("P_LAST_USER_ID"));
              stmt.setString(10, request.getParameter("P_call_gravity"));
              stmt.setString(11, request.getParameter("P_LOTS"));
              stmt.setInt(12, charcter_id);
              stmt.setString(13, request.getParameter("P_BUDJET"));
              stmt.setInt(14, currency_id);

          }
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

