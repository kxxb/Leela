<%-- 
    Document   : search
    Created on : 02.05.2012, 17:33:11
    Author     : kxxb
--%>

<%@page import="sun.swing.PrintColorUIResource"%>
<%@page contentType="text/html" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
        <title>JSP Page</title>
    </head>
    <body>
        
        <h1>Hello World!</h1>
<%
request.setCharacterEncoding("UTF-8");  

out.println("<p>idlist "+request.getParameter("idlist"));
out.println("<p>arend  "+request.getParameter("arend"));
out.println("<p>prod "+request.getParameter("prod"));
%>
    </body>
</html>
