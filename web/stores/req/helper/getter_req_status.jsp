<%@ page import="java.sql.Types, oracle.jdbc.OracleConnection, oracle.jdbc.OracleResultSet, net.sf.json.*,  java.sql.*, oracle.jdbc.OracleCallableStatement"
contentType="text/html;charset=windows-1251"  %>
<jsp:useBean id="Lela_util" class="Leela.core.Util" scope="session" />
<jsp:useBean id="db_conn" class="Leela.db.Conn" scope="session" />
<jsp:useBean id="Lela_core" class="Leela.core.user_managment" scope="session" />
<%
       
  
        String v_result ="";
        Connection conn = null;
        PreparedStatement pstmt = null;
        ResultSet rs = null;
        try{
        conn = db_conn.GetConnect();
          String v_menu_sql =  " select u.user_id, u.name from  tl_users u "+
                                " where  u.tl_departmenst_id = tl_sys_users.Get_Depid(?) "+
                                " and u.user_id not in (3,4) "+
                                " order by 2 ";
         pstmt = conn.prepareStatement(v_menu_sql);
         pstmt.setInt(1,  Lela_core.get_users_by_ip(conn, request.getRemoteAddr()));
         //pstmt.setString(1, g_user_id);
         JSONObject store = new JSONObject();
         JSONArray json_a = new JSONArray();
         rs =  pstmt.executeQuery();

         while (rs.next()){
               JSONObject obj = new JSONObject();
               obj.put("responsibly_id", Lela_util.nvl(rs.getString(1), "�����"));
               obj.put("resp_user_name", Lela_util.nvl(rs.getString(2), "�����"));
               json_a.add(obj);
         }

                store.put("results", json_a);

                // stream JSON Object
                String json_string = store.toString();
                String callback_function_name = request.getParameter("callback");
                String response_string = "";
                if (!"".equals(callback_function_name)) {
                    response_string = callback_function_name + "(" + json_string + ")";
                } else {
                    response_string = json_string;
                }
                out.println(response_string);
                //out.print(store);
                out.flush();
                
                } catch (Exception e) {
                   out.println(e.toString());
                }finally {

            if (pstmt != null) pstmt.close();
            if (rs != null) rs.close();
            if (conn != null) {
              try {
                conn.rollback();
              } catch(Exception ex) {}
              try {
                conn.close();
              } catch(Exception ex) {}
            }
           }
/*
         select u.user_id, u.name from tl_request t, tl_users u
where t.responsibly_id = u.user_id
and t.responsibly_department_id = tl_sys_users.Get_Depid(113)
         */
         
        %>
