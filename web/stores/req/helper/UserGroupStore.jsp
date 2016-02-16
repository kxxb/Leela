<%@ page import="java.sql.Types, java.sql.*, java.util.*, net.sf.json.*"   contentType="text/html;charset=windows-1251"  %>
<jsp:useBean id="db_conn" class="Leela.db.Conn" scope="session" />
<jsp:useBean id="my_utils" class="Leela.core.Util" scope="session" />


<%
Connection conn = null;
PreparedStatement pst = null;
ResultSet rs = null;

            String v_sql = "select t.id, t.group_desc from tl_s_groups t "+
                           " order by 1";
            try {

                conn = db_conn.GetConnect();
                pst = conn.prepareStatement(v_sql);
                rs = pst.executeQuery();


                JSONObject store = new JSONObject();
                JSONArray json_a = new JSONArray();

                while (rs.next()) {
                    JSONObject obj = new JSONObject();
                    obj.put("group_id", my_utils.nvl(rs.getString(1), "пусто"));
                    obj.put("group_desc", my_utils.nvl(rs.getString(2), "пусто"));
                    
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

                if (pst != null) pst.close();
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
%>
