<%@ page import="java.sql.Types, net.sf.json.*,  java.sql.*"
         contentType="text/html;charset=windows-1251"  %>
<jsp:useBean id="db_conn" class="Leela.db.Conn" scope="session" />
<jsp:useBean id="util" class="Leela.core.Util" scope="session" />
<%

            String v_group = util.nvl(request.getParameter("group"), "");
            String v_req_id = request.getParameter("reqid");
            String v_result = "";
            String v_menu_sql = "";
            PreparedStatement pstmt = null;
            ResultSet rs = null;
            Connection conn = null;
            try {
                conn = db_conn.GetConnect();


                if (!v_group.equals("")) {
                    v_menu_sql = " Select Tl_Extcorerq.get_comments_new(?, ?) from dual ";
                    pstmt = conn.prepareStatement(v_menu_sql);
                    pstmt.setString(1, v_req_id);
                    pstmt.setString(2, v_group);

                } else {

                    v_menu_sql = " Select Tl_Extcorerq.get_comments(?) from dual ";
                    pstmt = conn.prepareStatement(v_menu_sql);
                    pstmt.setString(1, v_req_id);

                }

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
