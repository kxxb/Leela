<%@ page import="java.sql.Types, java.sql.*, java.util.*, net.sf.json.*"   contentType="text/html;charset=windows-1251"  %>
<jsp:useBean id="db_conn" class="Leela.db.Conn" scope="session" />
<jsp:useBean id="my_utils" class="Leela.core.Util" scope="session" />
<jsp:useBean id="Lela_util" class="Leela.core.Util" scope="session" />

<%

        String v_result ="";
        Connection conn = null;
        ResultSet rs  = null;
        CallableStatement cs = null;
        
        String v_sql = "";
        String v_filter_params = "";
        
        String v_search_param = Lela_util.nvl(request.getParameter("search_param"),"");
        String v_search_sql = "   And (                                      "+
                                 "  upper(t.input_tel) Like upper('%"+v_search_param+"%') Or         "+                               
                                 "  upper(t.call_description)  Like upper('%"+v_search_param+"%') Or       "+         
                                 "  upper(tu.name) Like upper('%"+v_search_param+"%') Or "+             
                                 "      )    ";
        
          String v_sql_end  = "            )                                         "+
                            "     Where r Between ? And ?                          ";



          v_sql = 
            
            "             Select *                                                                            "+
"                  from (                                                                         "+
"               select t.id,                                                                      "+
"                   Nvl(To_Char(t.call_date_time, 'dd/mm/yyyy hh24:mi'), '-') As call_date_time,  "+                            
"                   rs.name as rek_s_source,                                                      "+  
"                   sek.name as sekretar,                                                         "+
"                   t.input_tel,                                                                  "+
"                   t.call_description,                                                           "+
"                   t.transfer_id,                                                                "+
"                   tu.name as transfer_user,                                                     "+
"                   tud.id as transfer_user_dep_id,                                               "+
"                   tud.name as transfer_user_dep_name,                                           "+
"                   t.secretar_flag,                                                              "+
"                   Count(T.Id) Over() As C,                                                      "+
"                   Row_Number() Over(Order By t.id Desc) As r,                                   "+
"             Row_Number() Over(partition by trunc(t.call_date_time)                              "+
"                    order by t.call_date_time) As r_day,                                         "+
"                    t.CALL_RESULT,                                                               "+
"                    nvl(t.RESULT_STATUS, -1) as  RESULT_STATUS,                                  "+
"                    t.crm_rek_s_source_id,                                                       "+
"                    t.rec_secretar                                                               "+
"            from crm_calls t, crm_rek_s_source rs,                                               "+
"                 tl_users sek, tl_users tu, tl_departments tud, Crm_Clients cl                   "+
"            where t.crm_rek_s_source_id = rs.id                                                  "+
"              and t.rec_secretar = sek.user_id                                                   "+
"              and t.transfer_id = tu.user_id                                                     "+
"              and tu.tl_departmenst_id = tud.id                                                  "+
"              And                                                                                "+  
"              (Nvl(Substr(Replace(Replace(cl.Tel_Cellular, '-'), Chr(32)), -10, 10),  cl.Tel_Cellular) = "+
"             Nvl(Substr(Replace(Replace(t.Input_Tel, '-'), Chr(32)), -10, 10), t.Input_Tel) Or           "+
"             Nvl(Substr(Replace(Replace(cl.Tel_Stat, '-'), Chr(32)), -10, 10), cl.Tel_Stat) =            "+
"             Nvl(Substr(Replace(Replace(t.Input_Tel, '-'), Chr(32)), -10, 10), t.Input_Tel))             "+
"             And cl.id = ?                                                                              ";

          
          String v_client_id = request.getParameter("cid");
            try {

                 conn = db_conn.GetConnect();
                 String v_count = "";
                 String v_limit = request.getParameter("limit");
                 String v_start = request.getParameter("start");


                    /*pager*/


            v_start = Lela_util.nvl(v_start,"1");
            if (v_start.equals("0")) { v_start ="1";}
            int v_end = Integer.parseInt(v_start) + Integer.parseInt(Lela_util.nvl(v_limit,"20"));
        /*end pager*/

            
            //v_sql = v_sql +" "+ v_filter_params +" "+ v_search_sql + v_sql_end;
            v_sql = v_sql +" "+ v_sql_end;
                cs = conn.prepareCall(v_sql);
                cs.setString(1, v_client_id);
                cs.setString(2, v_start);
                cs.setInt(3, v_end);
                cs.execute();
                rs = cs.getResultSet();

                JSONObject store = new JSONObject();
                JSONArray json_a = new JSONArray();

                while (rs.next()) {
                   JSONObject obj = new JSONObject();
                   obj.put("call_id", Lela_util.nvl(rs.getString(1), "пусто"));
                   obj.put("call_date_time", Lela_util.nvl(rs.getString(2), "пусто"));
                   obj.put("rek_s_source", Lela_util.nvl(rs.getString(3), "пусто"));
                   obj.put("sekretar", Lela_util.nvl(rs.getString(4), "пусто"));
                   obj.put("input_tel", Lela_util.nvl(rs.getString(5), "пусто"));
                   obj.put("call_description", Lela_util.nvl(rs.getString(6), "пусто"));
                   obj.put("transfer_id", Lela_util.nvl(rs.getString(7), "пусто"));
                   obj.put("transfer_user", Lela_util.nvl(rs.getString(8), "пусто"));
                   obj.put("transfer_user_dep_id", Lela_util.nvl(rs.getString(9), "пусто"));
                   obj.put("transfer_user_dep_name", Lela_util.nvl(rs.getString(10), "пусто"));
                   obj.put("secretar_flag", Lela_util.nvl(rs.getString(11), "пусто"));
                   obj.put("r_day", Lela_util.nvl(rs.getString(14), "пусто"));
                   obj.put("CALL_RESULT", Lela_util.nvl(rs.getString(15), "пусто"));
                   obj.put("RESULT_STATUS", Lela_util.nvl(rs.getString(16), "пусто"));
                   obj.put("crm_rek_s_source_id", Lela_util.nvl(rs.getString(17), "пусто"));
                   obj.put("rec_secretar", Lela_util.nvl(rs.getString(18), "пусто"));

                    
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
        if (cs != null) cs.close();
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
