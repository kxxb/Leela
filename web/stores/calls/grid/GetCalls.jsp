<%--
    Document   : GetReqGrid
    Created on : 26.08.2010, 15:15:01
    Author     : shavrak.ka
--%>
<%@ page import="java.sql.Types,
         
         net.sf.json.*,  java.sql.*"
         contentType="text/html;charset=windows-1251"  
%>
<jsp:useBean id="db_conn" class="Leela.db.Conn" scope="session" />
<jsp:useBean id="Lela_util" class="Leela.core.Util" scope="session" />

<%
request.setCharacterEncoding("UTF-8");  
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
                                 "  upper(t.call_result)  Like upper('%"+v_search_param+"%') Or       "+         
                                 "  upper(rs.name)  Like upper('%"+v_search_param+"%') Or       "+         
                                 "  upper(tu.name) Like upper('%"+v_search_param+"%') Or "+             
                                 "  upper(t.call_lots) Like upper('%"+v_search_param+"%') "+             
                                 "      )    ";
        String v_sql_end  = "            )                                         "+
                            "     Where r Between ? And ?                          ";


        String v_sql_all_calls = " /*все звонки*/ "+
            "Select *                                              "+
            "      from (                                          "+
            "   select t.id,                                       "+
            "       Nvl(To_Char(t.call_date_time, 'dd/mm/yyyy hh24:mi'), '-') As call_date_time,                              "+
            "       rs.name as rek_s_source,                       "+
            "       sek.name as sekretar,                          "+
            "       t.input_tel,                                   "+
            "       t.call_description,                            "+
            "       t.transfer_id,                                 "+
            "       tu.name as transfer_user,                      "+
            "       tud.id as transfer_user_dep_id,                "+
            "       tud.name as transfer_user_dep_name,            "+
            "       t.secretar_flag,                               "+
            "       Count(T.Id) Over() As C,                       "+
            "       Row_Number() Over(Order By t.id Desc) As r,     "+
            " Row_Number() Over(partition by trunc(t.call_date_time)    "+
            "        order by t.call_date_time) As r_day,                "+
            "        t.CALL_RESULT,                "+
            "        nvl(t.RESULT_STATUS, -1) as  RESULT_STATUS,                "+
            "        t.crm_rek_s_source_id,                 "+
            "        t.rec_secretar,                 "+
            " nvl(t.call_gravity,'Ќе определено') As call_gravity,              "+
            "        t.call_lots,                 "+
            "         t.character_id,                     "+
            "         t.budjet,                          "+
            "         t.currency_id                       "+               
            "from crm_calls t, crm_rek_s_source rs,                "+
            "     tl_users sek, tl_users tu, tl_departments tud    "+
            "where t.crm_rek_s_source_id = rs.id                   "+
            "  and t.rec_secretar = sek.user_id                    "+
            "  and t.transfer_id = tu.user_id                      "+
            "  and sek.tl_departmenst_id = 8                      "+
            "  and tu.tl_departmenst_id = tud.id                   ";
          


        String v_sql_dep_calls = " /*все звонки отдела*/ "+
               "Select *                                              "+
            "      from (                                          "+
            "   select t.id,                                       "+
            "       Nvl(To_Char(t.call_date_time, 'dd/mm/yyyy hh24:mi'), '-') As call_date_time,                              "+
            "       rs.name as rek_s_source,                       "+
            "       sek.name as sekretar,                          "+
            "       t.input_tel,                                   "+
            "       t.call_description,                            "+
            "       t.transfer_id,                                 "+
            "       tu.name as transfer_user,                      "+
            "       tud.id as transfer_user_dep_id,                "+
            "       tud.name as transfer_user_dep_name,            "+
            "       t.secretar_flag,                               "+
            "       Count(T.Id) Over() As C,                       "+
            "       Row_Number() Over(Order By t.id Desc) As r,     "+
            " Row_Number() Over(partition by trunc(t.call_date_time)    "+
            "        order by t.call_date_time) As r_day,                "+
            "        t.CALL_RESULT,                "+
            "        nvl(t.RESULT_STATUS, -1) as  RESULT_STATUS,                "+
            "        t.crm_rek_s_source_id,                 "+
            "        t.rec_secretar,                 "+
            " nvl(t.call_gravity,'Ќе определено') As call_gravity, "+
            "        t.call_lots,                 "+
            "         t.character_id,                     "+
            "         t.budjet,                          "+
            "         t.currency_id                       "+               
            "from crm_calls t, crm_rek_s_source rs,                "+
            "     tl_users sek, tl_users tu, tl_departments tud    "+
            "where t.crm_rek_s_source_id = rs.id                   "+
            "  and t.rec_secretar = sek.user_id                    "+
            "  and t.transfer_id = tu.user_id                      "+
            "  and tu.tl_departmenst_id = tud.id                   "+
            "  and  tud.id = ?                        ";
            


        String v_sql_broker_calls = " /*все звонки*/ "+
                           "Select *                                              "+
            "      from (                                          "+
            "   select t.id,                                       "+
            "       Nvl(To_Char(t.call_date_time, 'dd/mm/yyyy hh24:mi'), '-') As call_date_time,                              "+
            "       rs.name as rek_s_source,                       "+
            "       sek.name as sekretar,                          "+
            "       t.input_tel,                                   "+
            "       t.call_description,                            "+
            "       t.transfer_id,                                 "+
            "       tu.name as transfer_user,                      "+
            "       tud.id as transfer_user_dep_id,                "+
            "       tud.name as transfer_user_dep_name,            "+
            "       t.secretar_flag,                               "+
            "       Count(T.Id) Over() As C,                       "+
            "       Row_Number() Over(Order By t.id Desc) As r,     "+
            " Row_Number() Over(partition by trunc(t.call_date_time)    "+
            "        order by t.call_date_time) As r_day,                "+
            "        t.CALL_RESULT,                "+
            "        nvl(t.RESULT_STATUS, -1) as  RESULT_STATUS,                "+
            "        t.crm_rek_s_source_id,                 "+
            "        t.rec_secretar,                 "+
            " nvl(t.call_gravity,'Ќе определено') As call_gravity,              "+
            "        t.call_lots,                 "+
            "         t.character_id,                     "+
            "         t.budjet,                          "+
            "         t.currency_id                       "+               
            
            "from crm_calls t, crm_rek_s_source rs,                "+
            "     tl_users sek, tl_users tu, tl_departments tud    "+
            "where t.crm_rek_s_source_id = rs.id                   "+
            "  and t.rec_secretar = sek.user_id                    "+
            "  and t.transfer_id = tu.user_id                      "+
            "  and tu.tl_departmenst_id = tud.id                   "+
            "  and  t.transfer_id = ?                        ";
       



      String v_Dep_id = request.getParameter("Dep_id");
      String v_User_id = request.getParameter("user_id");
        try{
         conn = db_conn.GetConnect();

         String v_count = "";
         String v_limit = request.getParameter("limit");
         String v_start = request.getParameter("start");


    if (request.getParameter("limit")==null) {
        
         if ( !request.getParameter("transfer_id").equals("")){
             v_filter_params = v_filter_params + " and t.transfer_id = '"
                     + request.getParameter("transfer_id") +"' ";
         }

    }
         

         if (request.getParameter("mode").equals("all_calls")){
           v_sql = v_sql_all_calls +" "+ v_filter_params +" "+  v_sql_end;
         } else if (request.getParameter("mode").equals("dep_calls")){

           v_sql = v_sql_dep_calls +" "+ v_filter_params +" "+ v_search_sql +  v_sql_end;
         }else if (request.getParameter("mode").equals("broker_calls")){

           v_sql = v_sql_broker_calls +" "+ v_filter_params +" "+  v_sql_end;
         };

         /*pager*/


            v_start = Lela_util.nvl(v_start,"1");
            if (v_start.equals("0")) { v_start ="1";}
            int v_end = Integer.parseInt(v_start) + Integer.parseInt(Lela_util.nvl(v_limit,"20"));
        /*end pager*/

             request.setCharacterEncoding("Cp1251");

             cs = conn.prepareCall(v_sql);
             if (request.getParameter("mode").equals("all_calls")) {
                 cs.setString(1, v_start);
                 cs.setInt(2, v_end);
             } else if (request.getParameter("mode").equals("dep_calls")) {
                 cs.setString(1, v_Dep_id);
                 cs.setString(2, v_start);
                 cs.setInt(3, v_end);
                 
             }else if (request.getParameter("mode").equals("broker_calls")) {
                 cs.setString(1, v_User_id);
                 cs.setString(2, v_start);
                 cs.setInt(3, v_end);
                 
             }
             cs.execute();
             rs = cs.getResultSet();

             JSONObject store = new JSONObject();
             JSONArray json_a = new JSONArray();




          
        while (rs.next()){
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
           obj.put("CALL_GRAVITY", Lela_util.nvl(rs.getString(19), "пусто"));
           obj.put("call_lots", Lela_util.nvl(rs.getString(20), "пусто"));
           obj.put("character_id", Lela_util.nvl(rs.getString(21), "1"));
           obj.put("budjet", Lela_util.nvl(rs.getString(22), "пусто"));
           obj.put("currency_id", Lela_util.nvl(rs.getString(23), "1"));

           v_count = rs.getString(12);
           json_a.add(obj);

        }

                store.put("totalCount", v_count);
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



        }catch (Exception e)
        {out.println(e.toString() + v_sql ) ;}
        finally {
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
