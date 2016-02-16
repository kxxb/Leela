<%-- 
    Document   : index
    Created on : 03.04.2012, 15:22:54
    Author     : kxxb
--%>


<%@ page import="java.sql.Types,
         java.util.Map,
         net.sf.json.*,  java.sql.*"
         contentType="text/html;charset=windows-1251"  
%>
<jsp:useBean id="db_conn" class="Leela.db.Conn" scope="session" />
<jsp:useBean id="Lela_util" class="Leela.core.Util" scope="session" />

        <%
         request.setCharacterEncoding("UTF-8");  
         Connection conn = null;
         ResultSet rs  = null;
         CallableStatement cs = null;
        
          String v_sql="";
         
         v_sql =
          "  select z.code, z.name ||' '||z.socr||'.'  as name from kladr_street_new z "+
          "      where z.code like '77%' "+
          "       order by z.name ";
 
           
         
         try{
         conn = db_conn.GetConnect();
             request.setCharacterEncoding("Cp1251");
             cs = conn.prepareCall(v_sql);
             cs.execute();
             rs = cs.getResultSet();

             JSONObject store = new JSONObject();
             JSONArray json_a = new JSONArray();




          
        while (rs.next()){
           JSONObject obj = new JSONObject();
            obj.put("code", Lela_util.nvl(rs.getString(1), "пусто"));
            obj.put("name", Lela_util.nvl(rs.getString(2), "пусто"));
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



        }catch (Exception e)
        {out.println(e.toString() + v_sql ) ;}
        finally {
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
        
