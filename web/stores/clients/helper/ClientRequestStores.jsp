<%@ page import="java.sql.Types, java.sql.*, java.util.*, net.sf.json.*"   contentType="text/html;charset=windows-1251"  %>
<jsp:useBean id="db_conn" class="Leela.db.Conn" scope="session" />
<jsp:useBean id="my_utils" class="Leela.core.Util" scope="session" />


<%
    PreparedStatement pst = null;
    ResultSet rs = null;
    Connection conn = null;
            String v_sql_currency = "select Id, short_name from crm_s_currency t Order By 1 ";
            
            String v_sql_operations  = "select t.id, t.name from CRM_S_REQUEST_OPERATIONS t "+
                                        "order by 2";
            String v_sql_ready_obj = "select Id, Name from crm_s_obj_ready t Order By 1";
            
            String v_sql_clients_visibility = "select t.id, t.name from crm_clients_s_visibility t  Order By 1";
            
            

            try {

                conn = db_conn.GetConnect();

           if (request.getParameter("mode").equals("operations")){
             pst = conn.prepareStatement(v_sql_operations);
           }    
           if (request.getParameter("mode").equals("currency")){
             pst = conn.prepareStatement(v_sql_currency);
           } 
           if (request.getParameter("mode").equals("ready_obj")){
             pst = conn.prepareStatement(v_sql_ready_obj);
           }                     
           if (request.getParameter("mode").equals("client_visibility")){
             pst = conn.prepareStatement(v_sql_clients_visibility);
           }                          
                
             rs = pst.executeQuery();

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
        if (pst != null) pst.close();
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
