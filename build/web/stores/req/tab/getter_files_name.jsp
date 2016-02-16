<%@page import="javax.sql.DataSource"%>
<%@page import="javax.naming.InitialContext"%>
<%@ page import="java.sql.Types,  java.sql.*"   contentType="text/html;charset=windows-1251"  %>
<jsp:useBean id="db_conn" class="Leela.db.Conn" scope="session" />
<%
            String v_result = "";
            Connection conn = null;
            PreparedStatement pstmt = null;
            ResultSet rs = null;
            try {
                conn = db_conn.GetConnect();
                String v_menu_sql = " Select nvl(Tl_Extcorerq.show_files(?),'Нет файлов') from dual ";
                pstmt = conn.prepareStatement(v_menu_sql);
                pstmt.setString(1, request.getParameter("reqid"));
                //pstmt.setString(1, g_user_id);
                rs = pstmt.executeQuery();
                while (rs.next()) {
                    v_result = rs.getString(1);
                }
                out.println(v_result);
            } catch (Exception e) {
                out.println(e.toString());
            } finally {

                if (pstmt != null) {
                    pstmt.close();
                }
                if (rs != null) {
                    rs.close();
                }
                if (conn != null) {
                    try {
                        conn.rollback();
                    } catch (Exception ex) {
                    }
                    try {
                        conn.close();
                    } catch (Exception ex) {
                    }
                }
            }


%>
