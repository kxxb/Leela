<%@ page import="java.sql.Types,  net.sf.json.*,
          java.sql.*"   contentType="text/html;charset=windows-1251"  %>
<jsp:useBean id="db_conn" class="Leela.db.Conn" scope="session" />
<%
        String v_result ="";
        Connection conn = null;
        conn = db_conn.GetConnect();
         String v_menu_sql = " Select Tl_Extcorerq.get_comments(?) from dual ";
         PreparedStatement pstmt = conn.prepareStatement(v_menu_sql);
         pstmt.setString(1, request.getParameter("reqid"));
         //pstmt.setString(1, g_user_id);
         ResultSet rs =  pstmt.executeQuery();
         while (rs.next()){
             v_result = rs.getString(1);
         }
         //out.println("<xml version='1.0' encoding='utf-8'>");
         out.println(v_result);

      /*  String v_menu_sql = " Select  To_Char(t.message_date, 'dd.mm.yy hh24:mi' ) ||' '|| u.Name ||'('|| d.name ||')'  || '->' || To_Char(t.Message_Text) As com, "+
                         "   Count(t.id) over () As c, t.message_date   "+
                         " From Tl_Request_Comments t,  Tl_Request r, Tl_Users u, tl_departments d "+
                         "  Where t.User_Id = u.User_Id "+
                         "  And r.Id      = t.Request_Id "+
                         "  And u.tl_departmenst_id = d.id "+
                         "  And t.request_id = ? "+
                          " Order By t.message_date Desc ";
         PreparedStatement pstmt = conn.prepareStatement(v_menu_sql);
         pstmt.setString(1, request.getParameter("reqid"));
         //pstmt.setString(1, g_user_id);
         JSONObject store = new JSONObject();
         JSONArray json_a = new JSONArray();

         ResultSet rs =  pstmt.executeQuery();
         while (rs.next()){
             JSONObject obj = new JSONObject();
               obj.put("comment", rs.getString(1));
               json_a.add(obj);
             
         }

                store.put("result", json_a);

                // stream JSON Object
                String json_string = json_a.toString();
                String callback_function_name = request.getParameter("callback");
                String response_string = "";
                if (!"".equals(callback_function_name)) {
                    response_string = callback_function_name + "(" + json_string + ")";
                } else {
                    response_string = json_string;
                }
                out.println(response_string);
                
                out.flush();
                db_conn.CloseConnect();
*/
         
        %>
