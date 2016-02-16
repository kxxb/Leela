<%-- 
    Document   : getter_deal_comment
    Created on : 26.04.2011, 13:38:38
    Author     : kxxb
--%>
<%@ page import="java.sql.Types,

         net.sf.json.*,  java.sql.*"
         contentType="text/html;charset=windows-1251"
%>
<jsp:useBean id="db_conn" class="Leela.db.Conn" scope="session" />
<jsp:useBean id="Lela_util" class="Leela.core.Util" scope="session" />

<%

        String v_deal_id =request.getParameter("deal_id");
        String v_result ="";
        String v_menu_sql = "";
        PreparedStatement pstmt = null;
        String s_error_text ="";
            Connection conn = null;

            try {
            conn = db_conn.GetConnect();

              v_menu_sql = " Select TL_DEALS_PKG.Get_Comments(?) from dual ";
              pstmt = conn.prepareStatement(v_menu_sql);
              pstmt.setString(1, v_deal_id);
             ResultSet rs =  pstmt.executeQuery();
             while (rs.next()){
                 v_result = rs.getString(1);
             }
             

        out.println(v_result);

        }catch (Exception e){
        s_error_text = e.toString();
         }finally {

                if (pstmt != null) pstmt.close();
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