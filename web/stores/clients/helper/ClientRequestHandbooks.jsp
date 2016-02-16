<%@ page import="java.sql.Types, java.sql.*, java.util.*, net.sf.json.*"   contentType="text/html;charset=windows-1251"  %>
<jsp:useBean id="db_conn" class="Leela.db.Conn" scope="session" />
<jsp:useBean id="my_utils" class="Leela.core.Util" scope="session" />


<%
    CallableStatement cs = null;
    ResultSet rs = null;
    Connection conn = null;
            String v_sql = " select t.id, t.name from crm_s_handbooks  t "
                         + " Where t.crm_handbooks_id = ? Order By 1 ";

            try {
                   conn = db_conn.GetConnect();
                   if (request.getParameter("mode").equals("cl_source")){
                     cs = conn.prepareCall(v_sql);
                     cs.setString(1, "1");
                   } 
                   if (request.getParameter("mode").equals("cl_warm")){
                      cs = conn.prepareCall(v_sql);
                      cs.setString(1, "2");
                   }  
                   if (request.getParameter("mode").equals("cl_loyal")){
                      cs = conn.prepareCall(v_sql);
                      cs.setString(1, "3");
                   }  
                   if (request.getParameter("mode").equals("cl_status")){
                      cs = conn.prepareCall(v_sql);
                      cs.setString(1, "4");
                   }  
                   if (request.getParameter("mode").equals("req_status")){
                      cs = conn.prepareCall(v_sql);
                      cs.setString(1, "5");
                   }  
                  if (request.getParameter("mode").equals("call_character")){
                      cs = conn.prepareCall(v_sql);
                      cs.setString(1, "6");
                   }  
                    if (request.getParameter("mode").equals("currency")){
                      cs = conn.prepareCall(v_sql);
                      cs.setString(1, "7");
                   }  
                 cs.execute();   
                 rs =  cs.getResultSet();

                JSONObject store = new JSONObject();
                JSONArray json_a = new JSONArray();

                while (rs.next()) {
                    JSONObject obj = new JSONObject();
                    obj.put("id", my_utils.nvl(rs.getString(1), "пусто"));
                    obj.put("name", my_utils.nvl(rs.getString(2), "пусто"));
                    
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
                conn.close();

            } catch (Exception e) {
                out.println(e.toString());
            }finally {
        if (rs != null) rs.close();
        if (cs != null) cs.close();
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
