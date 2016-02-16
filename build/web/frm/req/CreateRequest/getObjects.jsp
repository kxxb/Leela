<%@ page import="java.sql.Types, java.net.*,  net.sf.json.*,  java.sql.*"
contentType="text/html;charset=windows-1251"  %>
<jsp:useBean id="Lela_util" class="Leela.core.Util" scope="session" />
<jsp:useBean id="db_conn" class="Leela.db.Conn" scope="session" />
<jsp:useBean id="Lela_core" class="Leela.core.user_managment" scope="session" />
<%
      String v_menu_sql= "";
  try{

/*        limit	15
        query	tris
        start	0
      /*pager */
         //request.setCharacterEncoding("utf-8");

         //request.setCharacterEncoding("windows-1251");
         String v_limit = request.getParameter("limit");
         String v_start = request.getParameter("start");
          //boolean useBodyEncodingForURI =  connector.getUseBodyEncodingForURI();

        //String v_query = new String(request.getParameter("query").getBytes(), "UTF-8");
         String v_query = Lela_util.nvl(request.getParameter("query"), " ");
         String v_filt_sql = "upper(t.name) like upper('%" +v_query +"%') ";
             v_start = Lela_util.nvl(v_start,"1");
            if (v_start.equals("0")) { v_start ="1";}
            int v_end = Integer.parseInt(v_start) + Integer.parseInt(Lela_util.nvl(v_limit,"20"));
        /*end pager*/
        String v_result ="";
        Connection conn = null;
        conn = db_conn.GetConnect();
        String v_count ="";
        int g_user_id = Lela_core.get_users_by_ip(conn, request.getRemoteAddr());
           v_menu_sql =  " select * from                                          "+
                               "     (select t.*,                                       "+
                               "          Count(t.Id) Over() As c,                      "+
                               "          Row_Number() Over(Order By t.id ) As r    "+
                               "      from tl_objects t " +
                                "where  " + v_filt_sql +
                               " ) where r between ? and ?  ";
         PreparedStatement pstmt = conn.prepareStatement(v_menu_sql);
         //pstmt.setString(1,    Integer.toString(g_user_id) );
         //pstmt.setString(1, g_user_id);
          //pstmt.setString(1,  v_query);
          pstmt.setString(1, v_start);
          pstmt.setInt(2, v_end);
         
         JSONObject store = new JSONObject();
         JSONArray json_a = new JSONArray();
         ResultSet rs =  pstmt.executeQuery();

         while (rs.next()){
               JSONObject obj = new JSONObject();
               obj.put("id", Lela_util.nvl(rs.getString(1), "пусто"));
               obj.put("name", Lela_util.nvl(rs.getString(1)+"-"+rs.getString(2), "пусто"));
               obj.put("object_addres", Lela_util.nvl(rs.getString(3), "пусто"));
               v_count = rs.getString(4);
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
                //out.println(response_string+v_query);

                //out.println(json_string);
                out.flush();
                db_conn.CloseConnect();
                } catch (Exception e) {
                   out.println(e.toString() + v_menu_sql );
                }
/*
         select u.user_id, u.name from tl_request t, tl_users u
where t.responsibly_id = u.user_id
and t.responsibly_department_id = tl_sys_users.Get_Depid(113)
         */
         
        %>
