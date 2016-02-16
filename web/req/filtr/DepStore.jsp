<%@ page import="java.sql.Types, java.sql.*, java.util.*, net.sf.json.*"   contentType="text/html;charset=windows-1251"  %>
<jsp:useBean id="db_conn" class="Leela.db.Conn" scope="session" />
<jsp:useBean id="my_utils" class="Leela.core.Util" scope="session" />


<%

            String v_sql = "select * from tl_departments t "+
                            " where t.id not in (9999) "+
                            " order by 1";


            
            try {

                Connection conn = db_conn.GetConnect();
            

                



                java.sql.PreparedStatement pst = conn.prepareStatement(v_sql);
                ResultSet rs = pst.executeQuery();


                JSONObject store = new JSONObject();
                JSONArray json_a = new JSONArray();

                while (rs.next()) {
                    JSONObject obj = new JSONObject();
                    obj.put("dep_id", my_utils.nvl(rs.getString(1), "пусто"));
                    obj.put("dep", my_utils.nvl(rs.getString(2), "пусто"));
                    
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
            }
%>
