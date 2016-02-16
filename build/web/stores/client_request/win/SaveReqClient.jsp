<%@ page import="java.sql.Types,  java.sql.*"
         contentType="text/html;charset=utf-8"  %>
<jsp:useBean id="db_conn" class="Leela.db.Conn" scope="session" />
<jsp:useBean id="Lela_core" class="Leela.core.user_managment" scope="session" />
<%
        String v_result ="Критическая ошибка";
        int res = 0;
        String v_cid  = request.getParameter("p_client_id");
        Connection conn = null;
        CallableStatement stmt = null;
    try {
        conn = db_conn.GetConnect();
        //int g_user_id = Lela_core.get_users_by_ip(conn, request.getRemoteAddr());
         request.setCharacterEncoding("utf-8");
         String v_is_subscribe ="0";
         if (v_cid.equals("true")){
             v_is_subscribe ="1";
         }
         
         
         if (v_cid.equals("0")){
        
             stmt =  conn.prepareCall(
                "Begin ? := CRM_Client.Create_Client_And_Request(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?); End;"
              );
              stmt.registerOutParameter(1, Types.INTEGER);  // o_Result
              stmt.registerOutParameter(2, Types.CHAR);  // o_Result

              stmt.setString(3, request.getParameter("p_cl_name"));
              stmt.setString(4, request.getParameter("p_cl_cell"));
              stmt.setString(5, request.getParameter("p_cl_tel"));
              stmt.setString(6, request.getParameter("p_cl_email"));
              stmt.setString(7, v_is_subscribe);
              stmt.setString(8, request.getParameter("p_cl_org"));
              stmt.setString(9, request.getParameter("p_cl_position"));
              
              stmt.setString(10, request.getParameter("p_cl_source"));
              stmt.setString(11, request.getParameter("p_cl_loyality"));
              stmt.setString(12, request.getParameter("p_cl_status"));
              stmt.setString(13, request.getParameter("p_cl_warm"));
              
              
              stmt.setString(14, request.getParameter("p_cl_visibility"));
              stmt.setString(15, request.getParameter("p_cl_add_info"));
              
              /*req*/
              stmt.setString(16, request.getParameter("p_req_operation"));
              stmt.setString(17, request.getParameter("p_req_budj_from"));
              stmt.setString(18, request.getParameter("p_req_budj_to"));
              stmt.setString(19, request.getParameter("p_req_currency"));
              stmt.setString(20, request.getParameter("p_req_area_from"));
              stmt.setString(21, request.getParameter("p_req_area_to"));
              stmt.setString(22, request.getParameter("p_req_urgency"));
              stmt.setString(23, request.getParameter("p_req_destination"));
              stmt.setString(24, request.getParameter("p_req_lots"));
              stmt.setString(25, request.getParameter("p_req_ready_id"));
              
              stmt.setString(26, request.getParameter("p_req_staus_id"));
              stmt.setString(27, request.getParameter("p_req_dep_id"));
              
              stmt.setString(28, request.getParameter("p_req_add_info"));
              stmt.setString(29, request.getParameter("p_last_user_id"));
              
              stmt.execute();
              res = stmt.getInt(1);
              v_result = stmt.getString(2);
              
           }
          else {
             stmt =  conn.prepareCall(
                "Begin ? := CRM_Client.Create_Clients_Request(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?); End;"
              );
             
              stmt.registerOutParameter(1, Types.INTEGER);  // o_Result
              stmt.registerOutParameter(2, Types.CHAR);  // o_Result
                /*req*/
             
              stmt.setString(3, v_cid); 
              stmt.setString(4, request.getParameter("p_req_operation"));
              stmt.setString(5, request.getParameter("p_req_budj_from"));
              stmt.setString(6, request.getParameter("p_req_budj_to"));
              stmt.setString(7, request.getParameter("p_req_currency"));
              stmt.setString(8, request.getParameter("p_req_area_from"));
              stmt.setString(9, request.getParameter("p_req_area_to"));
              stmt.setString(10, request.getParameter("p_req_urgency"));
              stmt.setString(11, request.getParameter("p_req_destination"));
              stmt.setString(12, request.getParameter("p_req_lots"));
              stmt.setString(13, request.getParameter("p_req_ready_id"));
              
              stmt.setString(14, request.getParameter("p_req_staus_id"));
              stmt.setString(15, request.getParameter("p_req_dep_id"));
              
              stmt.setString(16, request.getParameter("p_req_add_info"));
              stmt.setString(17, request.getParameter("p_last_user_id"));
             
              stmt.execute();
              res = stmt.getInt(1);
              v_result = stmt.getString(2);
              
          }    
              
         
          
          if (res == 1){
              out.println("{success:true,errors:{reason:'"+v_result+"'}}");
          } else {
              out.println("{success:false,errors:{reason:'"+v_result+"'}}");
          }
         
         } catch (Exception e) {
             out.println("{success:false,errors:{reason:'Ошибка в хэлпере! "+ v_result+"  "+ e.toString()+"   v_cid:"+ v_cid+"'}}"); 
             //out.println(e.toString());
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

