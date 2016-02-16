<%@ page import="java.sql.Types,  net.sf.json.*,  java.sql.*"
contentType="text/html;charset=windows-1251"  %>
<jsp:useBean id="Lela_util" class="Leela.core.Util" scope="session" />
<jsp:useBean id="db_conn" class="Leela.db.Conn" scope="session" />
<jsp:useBean id="Lela_core" class="Leela.core.user_managment" scope="session" />
<%
       
  try{
        String v_result ="";
        Connection conn = null;
        conn = db_conn.GetConnect();
        String v_count ="";
        int g_user_id = Lela_core.get_users_by_ip(conn, request.getRemoteAddr());
          String v_menu_sql =   " select t.*                     "+
                               "      from tl_request_type t" +
                               " where t.dep_id = ? " +
                               " order by 1 ";
         PreparedStatement pstmt = conn.prepareStatement(v_menu_sql);
         pstmt.setString(1,    request.getParameter("dep_id") );
         //pstmt.setString(1, g_user_id);
         JSONObject store = new JSONObject();
         JSONArray json_a = new JSONArray();
         ResultSet rs =  pstmt.executeQuery();

         while (rs.next()){
               JSONObject obj = new JSONObject();
               obj.put("id", Lela_util.nvl(rs.getString(1), "�����"));
               obj.put("type_name", Lela_util.nvl(rs.getString(3), "�����"));
               obj.put("type_desc", Lela_util.nvl(rs.getString(4), "�����"));
               
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
                db_conn.CloseConnect();
                } catch (Exception e) {
                   out.println(e.toString());
                }
/*
         select u.user_id, u.name from tl_request t, tl_users u
where t.responsibly_id = u.user_id
and t.responsibly_department_id = tl_sys_users.Get_Depid(113)
         */
         
        %>
