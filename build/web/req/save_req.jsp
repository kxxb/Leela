<%-- 
    Document   : save_req
    Created on : 28.06.2010, 18:14:09
    Author     : shavrak.ka
--%>


<%@ page import="java.sql.Types, 
         oracle.jdbc.OracleResultSet,
         java.sql.*,
         Leela.core.Util
         "
         contentType="text/html;charset=windows-1251"
         %>

<jsp:useBean id="db_conn" class="Leela.db.Conn" scope="session" />
<jsp:useBean id="Lela_core" class="Leela.core.user_managment" scope="session" />

<%
            Connection conn = db_conn.GetConnect();
            CallableStatement stmt = null;
            CallableStatement menu_stmt = null;
            CallableStatement stmt_acces = null;
            ResultSet menu_rs = null;

            String v_session = "";
            String s_error_text = "";
            int g_user_id = Lela_core.get_users_by_ip(conn, request.getRemoteAddr());
            String g_login_id = "";
            String g_base_url = "";


            String v_respDep = "";


            String v_request_text = "";
            String v_RESPONSIBLY_DEPARTMENT_ID = "";
            String v_dt_execute = "";
            String v_contr_tepl = "";
            String v_object = "";
            String v_object_addres = "";
            String v_client = "";
            String v_client_email = "";
            String v_cost_of_service = "";

            request.setCharacterEncoding("Cp1251");
            int v_show_coment = 0;
            String v_request_id = "";
            try {
                /*
                g_login_id = session.getAttribute("g_login_id").toString();
                g_base_url = session.getAttribute("g_base_url").toString();
                v_session = session.getId();
                 */

                /* приём параметров*/
                v_request_text = v_request_text + request.getParameter("reqTypeDesc");
                v_request_text = v_request_text + "<br><br>";
                v_request_text = v_request_text + request.getParameter("txtReqDesc");
                v_request_text = v_request_text + "<br><br>";

                v_request_text = v_request_text + Util.nvl(request.getParameter("txtFirst"), "");
                v_request_text = v_request_text + Util.nvl(request.getParameter("txtFirsthd"), "");
                v_request_text = v_request_text + "<br><br>";
                v_request_text = v_request_text + Util.nvl(request.getParameter("txtSecond"), "");
                v_request_text = v_request_text + Util.nvl(request.getParameter("txtSecondhd"), "");


                v_RESPONSIBLY_DEPARTMENT_ID = request.getParameter("respDep");
                v_dt_execute = request.getParameter("dt_exec");
                v_contr_tepl = Util.nvl(request.getParameter("slContract"), "0");

                v_object = request.getParameter("cbObject");
                //v_object_addres =request.getParameter("txObjectAddrers");

                v_client = request.getParameter("cbClient");
                //  v_client_email =request.getParameter("txClemail");

                v_cost_of_service = request.getParameter("txCost");


                if (Util.nvl(request.getParameter("rNds"), "-1").equals("1")) {
                    v_cost_of_service = v_cost_of_service + " Включая НДС";
                } else if (Util.nvl(request.getParameter("rNds"), "-1").equals("2")) {
                    v_cost_of_service = v_cost_of_service + " Не включая НДС";
                }
                ;




            } catch (Exception e) {
                // error catcher
                s_error_text = e.toString();
            }




            try {



                stmt = conn.prepareCall(
                        "Begin ? := tl_requests.request_save( "
                        + " ?,                     "
                        + " ?,              "
                        + " ?, "
                        + " ?,                "
                        + " ?,               "
                        + " ?,                   "
                        + //     " :p_object_addres,            "+
                        " ?,                   "
                        + //" :p_client_email,             "+
                        " ?          "
                        + " );end;           ");




                stmt.registerOutParameter(1, Types.INTEGER);  // o_Result

                stmt.setInt(2, g_user_id);
                stmt.setString(3, v_request_text);
                stmt.setString(4, v_RESPONSIBLY_DEPARTMENT_ID);
                stmt.setString(5, v_dt_execute);

                stmt.setString(6, v_contr_tepl);

                stmt.setString(7, v_object);
                //stmt.setStringAtName("p_object_addres", v_object_addres);

                stmt.setString(8, v_client);
                //stmt.setStringAtName("p_client_email", v_client_email);

                stmt.setString(9, v_cost_of_service);



                stmt.execute();
                int res = stmt.getInt(1);

            } catch (Exception e) {
                s_error_text = e.toString();
            } finally {

                if (stmt != null) {
                    stmt.close();
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



<%=s_error_text%>


<html>
    <body>Redirecting...<script>
            <%

                        out.println("parent.location = 'index.jsp';");
            %>
        </script></body></html>
