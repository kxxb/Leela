<%--
    Document   : main
    Created on : 21.06.2010, 13:46:25
    Author     : shavrak.ka
--%>
<%@ page import="java.sql.Types, oracle.jdbc.OracleConnection,
oracle.jdbc.OracleResultSet,
java.sql.*,
java.net.*,
oracle.jdbc.OracleCallableStatement"
contentType="text/html;charset=Windows-1251"
%>
<jsp:useBean id="db_conn" class="Leela.db.Conn" scope="session" />
  <%
    OracleConnection conn = null;
    OracleCallableStatement stmt = null;
    OracleCallableStatement menu_stmt = null;
    OracleCallableStatement stmt_acces = null;
    OracleResultSet menu_rs = null;
    request.setCharacterEncoding("Cp1251");
    String v_session ="";
    String s_error_text ="";
    String g_user_id ="";
    String g_login_id ="";
    String g_base_url ="";
    String v_term ="";
    String v_sql = "";

    int v_show_coment = 0;
    String v_request_id = "";


    
          try{
          String v_res_str ="";
          conn = db_conn.GetConnect();
            v_sql = " select t.type_desc  from tl_request_type t Where t.id =  ? ";
               
               //request.setCharacterEncoding("utf-8");
               //v_term = request.getParameter("term");
               v_term = request.getParameter("reqTypeid");
                         PreparedStatement pstmt = conn.prepareStatement(v_sql);
                         pstmt.setString(1,  v_term );
                         ResultSet rs =  pstmt.executeQuery();
                         v_res_str ="[";
                         while (rs.next()){
                           v_res_str = v_res_str + "\"" +rs.getString(1)+"\"";
                           // v_res_str = v_res_str + rs.getString(1);
                          }
                         v_res_str = v_res_str + " ]";
                         out.print(v_res_str);
                         pstmt.close();

     }catch (Exception e){
        s_error_text = e.toString();
     }
     finally {
      if (stmt != null) stmt.close();
      

      db_conn.CloseConnect();
     }
    %>
