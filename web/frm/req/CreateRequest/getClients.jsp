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
        String v_limit = request.getParameter("limit");
         String v_start = request.getParameter("start");
          //boolean useBodyEncodingForURI =  connector.getUseBodyEncodingForURI();

        //String v_query = new String(request.getParameter("query").getBytes(), "UTF-8");
         String v_query = Lela_util.nvl(request.getParameter("query"), " ");
         String v_filt_sql = "upper(t.client_name) like upper('%" +v_query +"%') ";
        v_start = Lela_util.nvl(v_start,"1");
            if (v_start.equals("0")) { v_start ="1";}
            int v_end = Integer.parseInt(v_start) + Integer.parseInt(Lela_util.nvl(v_limit,"20"));
        /*end pager*/
        int g_user_id = Lela_core.get_users_by_ip(conn, request.getRemoteAddr());
          String v_menu_sql =  " select * from "+
                               " (select t.id, "+
                               "        t.client_name, "+
                               "        t.email, "+
                               "        t.addres, "+
                               "      Count(t.Id) Over() As c, "+
                               "      Row_Number() Over(Order By t.id Desc) As r "+
                               "  from tl_clients t where "  + v_filt_sql +
                               ") where r between ? and ?   ";
         PreparedStatement pstmt = conn.prepareStatement(v_menu_sql);
          pstmt.setString(1, v_start);
          pstmt.setInt(2, v_end);
         //pstmt.setString(1,    Integer.toString(g_user_id) );
         //pstmt.setString(1, g_user_id);
         JSONObject store = new JSONObject();
         JSONArray json_a = new JSONArray();
         ResultSet rs =  pstmt.executeQuery();

         while (rs.next()){
               JSONObject obj = new JSONObject();
               obj.put("id", Lela_util.nvl(rs.getString(1), "пусто"));
               obj.put("client_name", Lela_util.nvl(rs.getString(1)+"-"+rs.getString(2), "Имя не определенно"));
               obj.put("email", Lela_util.nvl(rs.getString(3), "Не определен email"));
               obj.put("addres", Lela_util.nvl(rs.getString(4), "Адрес не определен"));
               v_count = rs.getString(5);
               json_a.add(obj);
         }

                store.put("totalCount", v_count);
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
