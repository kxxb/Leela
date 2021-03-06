<%-- 
    Document   : comment_deal_save
    Created on : 30.04.2011, 12:34:41
    Author     : kxxb
--%>

<%@ page import="java.sql.Types,
oracle.jdbc.OracleResultSet,
java.sql.*,
Leela.core.Util
"
contentType="text/html;charset=utf-8"

%>

<jsp:useBean id="db_conn" class="Leela.db.Conn" scope="session" />
<jsp:useBean id="Lela_core" class="Leela.core.user_managment" scope="session" />
    <%

    //contentType="text/html;charset=Windows-1251"   contentType="text/html;charset=utf-8"
    Connection conn = null;
    CallableStatement stmt = null;
    CallableStatement menu_stmt = null;
    CallableStatement stmt_acces = null;
    ResultSet menu_rs = null;

    String v_session ="";
    String v_mode ="";
    String s_error_text ="";

    String g_user_id;


    String v_deal_id ="";
    String v_message ="";

    request.setCharacterEncoding("utf-8");


    try{
        v_session = session.getId();

     } catch(Exception e) {
       // error catcher
         s_error_text = e.toString();
     }


          try{
            v_deal_id = request.getParameter("deal_id");
            v_message = request.getParameter("req_comment");
            conn = db_conn.GetConnect();
            g_user_id = request.getParameter("user_id"); //Lela_core.get_users_by_ip(conn, request.getRemoteAddr());
           stmt = conn.prepareCall(
            "Begin ? := TL_DEALS_PKG.Create_Comment_For_Deal(?, ?, ?); End;"
          );

           

          stmt.registerOutParameter(1, Types.INTEGER);  // o_Result
          stmt.setString(2, v_deal_id);
          stmt.setString(3, v_message );
          stmt.setString(4, g_user_id);
          stmt.execute();
          int res = stmt.getInt(1);
          if (res == 1){
              out.println("{success:true}");
          } else {
              out.println("{success:false}");
          }
     }catch (Exception e){
        s_error_text = e.toString();
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