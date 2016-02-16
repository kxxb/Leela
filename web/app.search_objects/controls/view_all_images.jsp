<%-- 
    Document   : view_all_images
    Created on : 16.04.2012, 12:57:55
    Author     : kxxb
--%>


<%@ page import="
         java.sql.*"
         contentType="text/html;charset=windows-1251"
         %>

<jsp:useBean id="db_conn" class="Leela.db.Conn" scope="session" />
<html>
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
        <title>JSP Page</title>
    </head>
    <body>
        <h1>Hello World!</h1>
        <%

        Connection conn = null;
        CallableStatement cs = null;


        String s_error_text = "";
        String v_file_name = "";


        try {
            conn = db_conn.GetConnect();

//45580
            request.setCharacterEncoding("Cp1251");
            cs =  conn.prepareCall("select id from pictures t Where t.object_id_ = 68451");
            //cs =  conn.prepareCall("select t.picture from pictures t where t.id = 45580");
            //cs.setString(1, request.getParameter("object_id"));
            cs.execute();
            ResultSet rs = cs.getResultSet();
            while (rs.next()) {  
                  %>
                  
                    <img src="load_files.jsp?pic_id=<%=rs.getString(1)%>" ><br>
                    <%
                      
               
                           }
         } catch (Exception e) {
            s_error_text = e.toString();
        } finally {
            if (cs != null) {
                cs.close();
            }
            db_conn.CloseConnect();
        }

        %>
    </body>
</html>
