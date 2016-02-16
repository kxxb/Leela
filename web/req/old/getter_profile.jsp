<%@ page import="java.sql.Types, oracle.jdbc.OracleConnection, oracle.jdbc.OracleResultSet, net.sf.json.*,  java.sql.*, oracle.jdbc.OracleCallableStatement"
contentType="text/html;charset=windows-1251"  %>
<jsp:useBean id="Lela_util" class="Leela.core.Util" scope="session" />
<jsp:useBean id="db_conn" class="Leela.db.Conn" scope="session" />
<%

  try{
        String v_result ="";
        OracleConnection conn = null;
        conn = db_conn.GetConnect();
          String v_menu_sql =  " select t.name,  "+
                               "        t.email,  "+
                               "        t.tel_cellular,  "+
                               "        t.tel_internal,  "+
                               "        t.work_position from tl_users t  "+
                               " where t.user_id = ?   ";

         PreparedStatement pstmt = conn.prepareStatement(v_menu_sql);
         pstmt.setString(1, request.getParameter("uid"));
         //pstmt.setString(1, g_user_id);
         JSONObject store = new JSONObject();
         JSONArray json_a = new JSONArray();
         ResultSet rs =  pstmt.executeQuery();

         while (rs.next()){
               v_result = v_result + "<font face='Verdana' size='1'><table>";
               v_result = v_result + "<tr><td>Имя:</td><td>"+ Lela_util.nvl(rs.getString(1), "пусто")+"</td></tr>";
               v_result = v_result + "<tr><td>email:</td><td>"+ Lela_util.nvl(rs.getString(2), "пусто")+"</td></tr>";
               v_result = v_result + "<tr><td>Мобильный:</td><td>"+ Lela_util.nvl(rs.getString(3), "пусто")+"</td></tr>";
               v_result = v_result + "<tr><td>Внутренний:</td><td>"+ Lela_util.nvl(rs.getString(4), "пусто")+"</td></tr>";
               v_result = v_result + "<tr><td>Должность:</td><td>"+ Lela_util.nvl(rs.getString(5), "пусто")+"</td></tr>";
               v_result = v_result + "<table></font>";
               
         }
                out.println(v_result);
                //out.print(store);
                out.flush();
                db_conn.CloseConnect();
                } catch (Exception e) {
                   out.println(e.toString());
                }

        %>
