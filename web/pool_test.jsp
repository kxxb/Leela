<%-- 
    Document   : pool_test
    Created on : 22.09.2010, 15:59:33
    Author     : shavrak.ka
--%>
<%@ page import="java.sql.Types, javax.naming.*,  javax.sql.DataSource,  oracle.jdbc.OracleConnection, oracle.jdbc.OracleResultSet, java.sql.*, oracle.jdbc.OracleCallableStatement"     %>
<%@page contentType="text/html" pageEncoding="UTF-8"%>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN"
   "http://www.w3.org/TR/html4/loose.dtd">

<html>
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
        <title>JSP Page</title>
    </head>
    <body>
        <h1>Hello World!</h1>
        <%

     //try{
    Context initContext = new InitialContext();
           Context envContext  = (Context)initContext.lookup("java:/comp/env");
           
           DataSource ds = (DataSource)envContext.lookup("newDS");
           Connection conn = ds.getConnection();

    String v_result ="";
       String v_menu_sql = " Select sysdate from dual ";
         PreparedStatement pstmt = conn.prepareStatement(v_menu_sql);

         //pstmt.setString(1, g_user_id);
         ResultSet rs =  pstmt.executeQuery();
         while (rs.next()){
             v_result = rs.getString(1);
         }
         //out.println("<xml version='1.0' encoding='utf-8'>");
         out.println(v_result);
    /*} catch (Exception e){
             out.println(e.toString());
    }*/
%>
    </body>
</html>
