<%@ page import="java.sql.Types, oracle.jdbc.OracleConnection, oracle.jdbc.OracleResultSet, java.sql.*, oracle.jdbc.OracleCallableStatement"   contentType="text/html;charset=windows-1251"  %>
<jsp:useBean id="db_conn" class="Leela.db.Conn" scope="session" />
<%
        String v_result ="";
        Connection conn = null;
        CallableStatement stmt = null;
        ResultSet rs = null;
        try{
         conn = db_conn.GetConnect();
         stmt =  conn.prepareCall(
                "Begin ? := crm_client.get_ClContactsTree(?); End;"
              );
              stmt.registerOutParameter(1, Types.CLOB);  // o_Result
              stmt.setString(2, request.getParameter("p_user_id"));
              

         
          stmt.execute();
          String res = stmt.getString(1);
         
         out.println(res);
         } catch (Exception e) {
                out.println(e.toString());
            } finally {

                if (stmt != null) {
                    stmt.close();
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