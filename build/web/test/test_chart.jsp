<%-- 
    Document   : test_chart
    Created on : 14.10.2011, 13:23:23
    Author     : kxxb
--%>


<%@ page import="java.sql.Types,
         net.sf.json.*,  java.sql.*"
         contentType="text/html;charset=windows-1251"  
%>
<jsp:useBean id="db_conn" class="Leela.db.Conn" scope="session" />
<jsp:useBean id="Lela_util" class="Leela.core.Util" scope="session" />

<%
        request.setCharacterEncoding("UTF-8");
        Connection conn = null;
        ResultSet rs  = null;
        CallableStatement cs = null;
        String v_search_param =request.getParameter("search_param");
       //String v_search_param =request.getParameter("search_param");
        String v_out="";
        String v_obj ="";
        String v_sql =  "  "+
                 "   Select t.Object_Id_,  "+
                 "      s.Sort_Id,  "+
                 "      s.Name,  "+
                 "      Case  "+
                 "        When s.List_Id Is Not Null Then  "+
                 "         Nvl((Select Lv.Valu_e  "+
                 "               From List_Val Lv  "+
                "               Where To_Char(Lv.Id) = To_Char(t.Value)  "+
                "                 And To_Char(Lv.List_Id) = To_Char(s.List_Id)),  "+
                "              To_Char(t.Value))  "+
                "         Else  "+
                "          To_Char(t.Value)  "+
                "       End As Val,  "+
               "        s.List_Id,  "+
               "        s.Id  "+
               "   From Ren_Values t, Ren_Shema s, Ren_Obj_Lots Rol  "+
               "  Where t.Object_Id_ = Rol.Object_Id  "+
               "    And t.Shema_Id = s.Id  "+
               "    And rol.shemas_id = 2  "+
               
               "    And Rol.Lot =  "+ v_search_param +
               "  Order By Object_Id_, Sort_Id  ";
               
      try{
         conn = db_conn.GetConnect();
 cs = conn.prepareCall(v_sql);
 cs.execute();
             rs = cs.getResultSet();
         while (rs.next()){
             
           if( !rs.getString(1).equals(v_obj)){
            v_obj = rs.getString(1);
            v_out = v_out+ "<tr><td colspan=2 bgcolor=000000>############</td></tr>";
           } 
           v_out = v_out+ "<tr><td>"+Lela_util.nvl(rs.getString(3), "пусто")+
                      "</td><td>"+Lela_util.nvl(rs.getString(4), "пусто")+"</td></tr>";
            
           
           

        }

    
    

                //out.print(store);
                out.flush();
                conn.close();



        }catch (Exception e)
        {out.println(e.toString() + "***** " + v_sql);}
        finally {
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




<html>
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
        <title>JSP Page</title>

        <!-- ** CSS ** -->
        <!-- base library -->

        <link rel="stylesheet" type="text/css" href="../js/ext-3.2.1/resources/css/ext-all.css" />
        <link rel="stylesheet" type="text/css" href="../js/ext-3.2.1/resources/shared/icons/silk.css" />
        <link rel="stylesheet" type="text/css" href="LeelaStyle.css" />


        <!-- ** Javascript ** -->
        <!-- base library -->


        <script type="text/javascript" src="../js/ext-3.2.1/adapter/ext/ext-base.js"></script>
        <script type="text/javascript" src="../js/ext-3.2.1/ext-all-debug-w-comments.js"></script>


        <!-- My extensions -->
        
    </head>
    <body>

<table border="1" width="500">
    <%=v_out%>
</table>    



</div>

    </body>
</html>
