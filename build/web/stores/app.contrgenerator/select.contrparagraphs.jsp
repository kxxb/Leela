<%-- 
    Document   : select.contrcontent
    Created on : 24.08.2012, 15:40:13
    Author     : kxxb
--%>
<%-- 
    Document   : select.contrlist
    Created on : 24.08.2012, 15:39:55
    Author     : kxxb
--%>
<%@ page import="java.sql.Types, java.sql.*, java.util.*, net.sf.json.*"   contentType="text/html;charset=windows-1251"  %>
<jsp:useBean id="db_conn" class="Leela.db.Conn" scope="session" />
<jsp:useBean id="my_utils" class="Leela.core.Util" scope="session" />


<%
Connection conn = null;
PreparedStatement pst = null;
ResultSet rs = null;

/*
   "         CASE     WHEN IS_CHECKED = 1 THEN  'true'                                  "+ 
                           "             ELSE 'false'  END CASE,                                                                 "+     
                        
*/

            String v_sql = "SELECT *                                            "+
                           " FROM                                               "+    
                           "   (SELECT ID,                                      "+
                           "     LAWYER_CONTRACTS_ID,                           "+
                           "     PARAGRAPH_NAME,                                "+
                           "     PARAGRAPH_BODY,                                "+
                           "     ORDER_NUMBER,                                  "+
                           "     NVL(TO_CHAR(T.PARAGRAPH_DATE, 'dd.mm.yyyy hh24:mi'), '-') AS PARAGRAPH_DATE, "+
                           "     NVL(TO_CHAR(T.EDIT_DATE, 'dd.mm.yyyy hh24:mi'), '-')      AS EDIT_DATE,       "+ 
                          "         CASE     WHEN IS_CHECKED = 1 THEN  'true'                                  "+ 
                           "             ELSE 'false'  END CASE,                                                                 "+     
                              "     COUNT(T.Id) Over()                    AS C ,                                  "+ 
                           "     Row_Number() Over(Order By t.id DESC) AS r                                    "+ 
                           "   FROM lawyer_contracts_paragraphs t                                              "+         
                           "   where t.LAWYER_CONTRACTS_ID = ?                                                    "+ 
                           "   )                                                                               "+                            
                           " WHERE r BETWEEN ? AND ? order by ORDER_NUMBER                                                        ";
            try {

                conn = db_conn.GetConnect();
                 String v_count = "";
                String v_limit = request.getParameter("limit");
                String v_start = request.getParameter("start");
                String v_LAWYER_CONTRACTS_ID = my_utils.nvl(request.getParameter("LAWYER_CONTRACTS_ID"), "0");
                
         /*pager*/


            v_start = my_utils.nvl(v_start,"1");
            if (v_start.equals("0")) { v_start ="1";}
            int v_end = Integer.parseInt(v_start) + Integer.parseInt(my_utils.nvl(v_limit,"20"));
        /*end pager*/

             request.setCharacterEncoding("Cp1251");

                pst = conn.prepareStatement(v_sql);
                 pst.setString(1, v_LAWYER_CONTRACTS_ID);
                 pst.setString(2, v_start);
                 pst.setInt(3, v_end);
                rs = pst.executeQuery();


                JSONObject store = new JSONObject();
                JSONArray json_a = new JSONArray();

                while (rs.next()) {
                    JSONObject obj = new JSONObject();


                    obj.put("ID", my_utils.nvl(rs.getString(1), "пусто"));
                    obj.put("LAWYER_CONTRACTS_ID", my_utils.nvl(rs.getString(2), "пусто"));
                    obj.put("PARAGRAPH_NAME", my_utils.nvl(rs.getString(3), "пусто"));
                    obj.put("PARAGRAPH_BODY", my_utils.nvl(rs.getString(4), "пусто"));
                    obj.put("ORDER_NUMBER", my_utils.nvl(rs.getString(5), "пусто"));
                    obj.put("PARAGRAPH_DATE", my_utils.nvl(rs.getString(6), "пусто"));
                    obj.put("EDIT_DATE", my_utils.nvl(rs.getString(7), "пусто"));
                    obj.put("IS_CHECKED", my_utils.nvl(rs.getString(8), "пусто"));
                  
                    v_count = rs.getString(9);
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
