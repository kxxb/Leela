<%--
    Document   : main
    Created on : 21.06.2010, 13:46:25
    Author     : shavrak.ka
--%>
<%@ page import="java.sql.Types, oracle.jdbc.OracleConnection,
oracle.jdbc.OracleResultSet,
java.sql.*,
java.net.*,
net.sf.json.*,
oracle.jdbc.OracleCallableStatement"
contentType="text/html;charset=Windows-1251"
%>
<jsp:useBean id="db_conn" class="Leela.db.Conn" scope="session" />
  <%
    OracleConnection conn = null;
    OracleCallableStatement stmt = null;
    OracleCallableStatement menu_stmt = null;
    OracleCallableStatement stmt_acces = null;
    OracleResultSet menu_rs = null;
    request.setCharacterEncoding("Cp1251");
    String v_session ="";
    String s_error_text ="";

    String g_login_id ="";
    String g_base_url ="";
    String v_term ="";
    String v_sql = "";

    int v_show_coment = 0;
    String v_request_id = "";


    
          try{
          String v_res_str ="";
          conn = db_conn.GetConnect();
            v_sql = " Select t.name from tl_objects t where t.name like ? ";
               
               //request.setCharacterEncoding("utf-8");
               v_term = request.getParameter("q");
                         PreparedStatement pstmt = conn.prepareStatement(v_sql);
                         pstmt.setString(1, "%"+ v_term +"%");
                         ResultSet rs =  pstmt.executeQuery();
                         //v_res_str ="[";
                         JSONObject store = new JSONObject();
                         JSONArray json_a = new JSONArray();

                         while (rs.next()){
                           JSONObject obj = new JSONObject();
                            obj.put("name", rs.getString(1));
                            json_a.add(obj);

                            //v_res_str = v_res_str + rs.getString(1)+"\n";
                          }
                         //v_res_str = v_res_str + " ]";

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
                        pstmt.close();
                        conn.close();

     }catch (Exception e){
        s_error_text = e.toString();
     }
     finally {
      if (stmt != null) stmt.close();
      

      db_conn.CloseConnect();
     }
    %>
