<%-- 
    Document   : CRUD.contarct
    Created on : 24.08.2012, 16:07:04
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
     
             
         
         /*
          obj.put("ID", my_utils.nvl(rs.getString(1), "пусто"));
                    obj.put("CONTRACT_NAME", my_utils.nvl(rs.getString(2), "пусто"));
                    obj.put("CONTRACT_DATE", my_utils.nvl(rs.getString(3), "пусто"));
                    obj.put("CONTRACT_DESC", my_utils.nvl(rs.getString(4), "пусто"));
                    obj.put("ORDER_IN_LIST", my_utils.nvl(rs.getString(5), "пусто"));
                    
         **/
                
             stmt =  conn.prepareCall(
                "Begin ? := CRM_CONTRACTGENERARTOR.CRUD_contarct(?,?,?,?,?,?); End;"
              );
              stmt.registerOutParameter(1, Types.INTEGER);  // o_Result
              stmt.setString(2, request.getParameter("ID"));
              stmt.setString(3, request.getParameter("CONTRACT_NAME"));
              stmt.setString(4, request.getParameter("CONTRACT_DATE"));
              stmt.setString(5, request.getParameter("CONTRACT_DESC"));
              stmt.setString(6, request.getParameter("ORDER_IN_LIST"));
              stmt.setString(7, request.getParameter("V_MODE"));
             
         
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