<%-- 
    Document   : test
    Created on : 01.02.2013, 11:48:46
    Author     : kxxb
--%>
<%@page contentType="text/html" pageEncoding="UTF-8"%>

<!DOCTYPE html>
<html>
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
        <title>JSP Page</title>
    </head>
    <body>
        <%
            int G_User_Id =70;
           if (G_User_Id == 295 | G_User_Id == 663 | G_User_Id == 703){ %>
           <h1>Hello reception!</h1>
           <%} else {%>
           <h1>Hello World!</h1>
           <%} %>
        
    </body>
</html>
