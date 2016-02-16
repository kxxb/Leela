<%@ page import="java.sql.Types, oracle.jdbc.OracleConnection, oracle.jdbc.OracleResultSet, java.sql.*, oracle.jdbc.OracleCallableStatement"   contentType="text/html;charset=windows-1251"  %>
<jsp:useBean id="db_conn" class="Leela.db.Conn" scope="session" />
<%
        String v_result ="";
        OracleConnection conn = null;
        conn = db_conn.GetConnect();
          String v_menu_sql = " Select Tl_Extcorerq.get_req(?) from dual ";
         PreparedStatement pstmt = conn.prepareStatement(v_menu_sql);
         pstmt.setString(1, request.getParameter("reqid"));
         //pstmt.setString(1, g_user_id);
         ResultSet rs =  pstmt.executeQuery();
         while (rs.next()){
             v_result = rs.getString(1);
         }
         //out.println("<xml version='1.0' encoding='utf-8'>");
         out.println(v_result);
 

         
        %>
