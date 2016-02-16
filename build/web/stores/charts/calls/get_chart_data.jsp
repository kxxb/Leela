<%@ page import="java.sql.Types, java.sql.*, java.util.*, net.sf.json.*"   contentType="text/html;charset=windows-1251"  %>
<jsp:useBean id="db_conn" class="Leela.db.Conn" scope="session" />
<jsp:useBean id="my_utils" class="Leela.core.Util" scope="session" />


<%
    PreparedStatement pst = null;
    ResultSet rs = null;
    Connection conn = null;
      String v_sql =    "select state, c                                                    "+
                        "  from (select 1 as state_id, 'Актив' as state, count(*) as c      "+
                        "          from crm_calls t                                         "+
                        "         where t.transfer_id = ?                                 "+
                        "           and t.result_status = 1                                 "+
                        "        union                                                      "+
                        "        select 2 as state_id, 'Пассив' as state, count(*) as c     "+
                        "          from crm_calls t                                         "+
                        "         where t.transfer_id = ?                                 "+
                        "           and t.result_status = 0                                 "+
                        "        union                                                      "+
                        "        select 4 as state_id, 'В работе' as state, count(*) as c     "+
                        "          from crm_calls t                                         "+
                        "         where t.transfer_id = ?                                 "+
                        "           and t.result_status = 2                                 "+

                        "        union                                                      "+
                        "        select 3 as state_id,                                      "+
                        "               'Не обработанно' as state,                          "+
                        "               count(*) as c                                       "+
                        "          from crm_calls t                                         "+
                        "         where t.transfer_id = ?                                 "+
                        "           and t.result_status is null                             ";

             
                            

      String v_date_range = "   and trim(w.call_date_time) between to_date('19.01.2013', 'dd.mm.yyyy') and to_date('19.02.2013','dd.mm.yyyy') ";
      
      String v_order_by ="        )                                                          "+
                        " order by state_id                                                 ";
         
       
      
       v_sql = v_sql + v_order_by;
            try {

                conn = db_conn.GetConnect();

                pst = conn.prepareStatement(v_sql);
                pst.setString(1, request.getParameter("P_USERID"));
                pst.setString(2, request.getParameter("P_USERID"));
                pst.setString(3, request.getParameter("P_USERID"));
                rs = pst.executeQuery();

                JSONObject store = new JSONObject();
                JSONArray json_a = new JSONArray();

                while (rs.next()) {
                    JSONObject obj = new JSONObject();
                    obj.put("state", my_utils.nvl(rs.getString(1), "пусто"));
                    obj.put("c", my_utils.nvl(rs.getString(2), "пусто"));

                    json_a.add(obj);

                }
                store.put("results", json_a);
                // stream JSON Object
                String json_string = store.toString();
                String callback_function_name = request.getParameter("callback");
                String response_string = "";
                if (!"".equals(callback_function_name)) {
                    response_string = callback_function_name + "(" + json_string + ")";
                } else {
                    response_string = json_string;
                }
                out.println(response_string);
                //out.print(store);
                out.flush();
                conn.close();

            } catch (Exception e) {
                out.println(e.toString());
            }finally {
        if (rs != null) rs.close();
        if (pst != null) pst.close();
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
