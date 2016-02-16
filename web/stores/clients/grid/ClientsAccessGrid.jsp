<%@ page import="java.sql.Types, java.sql.*, java.util.*, net.sf.json.*"   contentType="text/html;charset=windows-1251"  %>
<jsp:useBean id="db_conn" class="Leela.db.Conn" scope="session" />
<jsp:useBean id="my_utils" class="Leela.core.Util" scope="session" />


<%
    PreparedStatement pst = null;
    ResultSet rs = null;
    Connection conn = null;
     String v_cid = request.getParameter("client_id");
            String v_sql = 
            
            "select  ua.name, t.status,  "+
            "Nvl(To_Char(t.last_rec_date, 'dd/mm/yyyy hh24:mi'), '-') As last_rec_date, "+
            " lu.name, t.id  from crm_clients_access t, tl_users ua, tl_users lu "+
            "   "+        
            "Where t.user_id = ua.user_id "+
            "And t.last_user_id = lu.user_id "+
            "And t.client_id = ? "+ 
            "Order By last_rec_date Desc ";

            try {

                conn = db_conn.GetConnect();
                    
                pst = conn.prepareStatement(v_sql);
                pst.setString(1, v_cid);
                rs = pst.executeQuery();

                JSONObject store = new JSONObject();
                JSONArray json_a = new JSONArray();

                while (rs.next()) {
                    JSONObject obj = new JSONObject();
                    obj.put("u_name", my_utils.nvl(rs.getString(1), "пусто"));
                    obj.put("status", my_utils.nvl(rs.getString(2), "пусто"));
                    obj.put("last_date", my_utils.nvl(rs.getString(3), "пусто"));
                    obj.put("last_u_name", my_utils.nvl(rs.getString(4), "пусто"));
                    obj.put("rec_id", my_utils.nvl(rs.getString(5), "пусто"));
                    
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
