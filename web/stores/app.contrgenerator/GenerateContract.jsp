<%-- 
    Document   : GenerateContract
    Created on : 24.08.2012, 17:53:10
    Author     : kxxb
--%>

 <%@ page import="java.sql.Types, java.sql.*, java.util.*, net.sf.json.*"   contentType="text/html;charset=windows-1251"  %>
<jsp:useBean id="db_conn" class="Leela.db.Conn" scope="session" />
<jsp:useBean id="my_utils" class="Leela.core.Util" scope="session" />

<!DOCTYPE html>
<html>
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
        <title>Договор</title>
    </head>
    <body>
        
   

<%
Connection conn = null;
PreparedStatement pst = null;
ResultSet rs = null;
String response_string = "";

/*
   "         CASE     WHEN IS_CHECKED = 1 THEN  'true'                                  "+ 
                           "             ELSE 'false'  END CASE,                                                                 "+     
                        
*/

            String v_sql = 
                           "   SELECT ID,                                      "+
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
                           "   where t.LAWYER_CONTRACTS_ID = ?   and  IS_CHECKED = 1    order by ORDER_NUMBER                                            ";
                           
            try {

                conn = db_conn.GetConnect();
                 String v_count = "";
                 
                String v_LAWYER_CONTRACTS_ID = my_utils.nvl(request.getParameter("LAWYER_CONTRACTS_ID"), "0");
                
        

                request.setCharacterEncoding("Cp1251");

                 pst = conn.prepareStatement(v_sql);
                 pst.setString(1, v_LAWYER_CONTRACTS_ID);
                
                rs = pst.executeQuery();


                JSONObject store = new JSONObject();
                JSONArray json_a = new JSONArray();

                while (rs.next()) {
                response_string = response_string + "<h2>"+rs.getString(3)+"</h2><br>";
                response_string = response_string + rs.getString(4);

/*
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
*/
        }

            
            
               
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
        
        <h1>Hello World!</h1>
        <%=response_string%>
    </body>
</html>
