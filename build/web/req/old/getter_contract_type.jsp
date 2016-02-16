<%-- 
    Document   : GetReqGrid
    Created on : 26.08.2010, 15:15:01
    Author     : shavrak.ka
--%>
<%@ page import="java.sql.Types, oracle.jdbc.OracleConnection, oracle.jdbc.OracleResultSet, net.sf.json.*,  java.sql.*, oracle.jdbc.OracleCallableStatement"
contentType="text/html;charset=windows-1251"  %>
<jsp:useBean id="db_conn" class="Leela.db.Conn" scope="session" />
<jsp:useBean id="Lela_util" class="Leela.core.Util" scope="session" />

<%
        String v_result ="";
        OracleConnection conn = null;
        OracleCallableStatement cs = null;
        String v_sql = " select t.id, t.template_name from tl_contract_template t "+
                       "where t.id <> 0 ";




        try{
         conn = db_conn.GetConnect();
             request.setCharacterEncoding("Cp1251");
             cs = (OracleCallableStatement) conn.prepareCall(v_sql);
             cs.execute();
             ResultSet rs = cs.getResultSet();

             JSONObject store = new JSONObject();
             JSONArray json_a = new JSONArray();


        while (rs.next()){
           JSONObject obj = new JSONObject();
           obj.put("id", Lela_util.nvl(rs.getString(1), "пусто"));
           obj.put("name", Lela_util.nvl(rs.getString(2), "пусто"));
           json_a.add(obj);

        }

                store.put("makes", json_a);

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
        {out.println(e.toString());}
        /*finally {
        if (cs != null) cs.close();

         db_conn.CloseConnect();
       }*/

        %>
