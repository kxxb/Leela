<%-- 
    Document   : CRUD.contractparagraph
    Created on : 24.08.2012, 16:07:19
    Author     : kxxb
--%>
<%@ page import="java.sql.Types,  java.sql.*"
         contentType="text/html;charset=utf-8"  %>
<jsp:useBean id="db_conn" class="Leela.db.Conn" scope="session" />
<jsp:useBean id="Lela_core" class="Leela.core.user_managment" scope="session" />
<%
        String v_result ="";
        Connection conn = null;
        CallableStatement stmt = null;
    try {
        conn = db_conn.GetConnect();
        //int g_user_id = Lela_core.get_users_by_ip(conn, request.getRemoteAddr());
         request.setCharacterEncoding("utf-8");
     
             
            
             stmt =  conn.prepareCall(
                "Begin ? := CRM_CONTRACTGENERARTOR.crud_contracts_paragraphs(?,?,?,?,?,?,?,?); End;"
              );
   
              stmt.registerOutParameter(1, Types.INTEGER);  // o_Result
              stmt.setString(2, request.getParameter("ID"));
              stmt.setString(3, request.getParameter("LAWYER_CONTRACTS_ID"));
              stmt.setString(4, request.getParameter("PARAGRAPH_NAME"));
              stmt.setString(5, request.getParameter("PARAGRAPH_BODY"));
              stmt.setString(6, request.getParameter("ORDER_NUMBER"));
              stmt.setString(7, request.getParameter("PARAGRAPH_DATE"));
              
              stmt.setString(8, request.getParameter("IS_CHECKED"));
              stmt.setString(9, request.getParameter("V_MODE"));
             
         
          stmt.execute();
          int res = stmt.getInt(1);
          
          if (res == 1){
              out.println("{success:true}");
          } else {
              out.println("{success:false}");
          }
         
         } catch (Exception e) {
                out.println(e.toString());
            }finally {

            if (stmt != null) stmt.close();
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