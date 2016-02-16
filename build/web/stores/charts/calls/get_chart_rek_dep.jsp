<%@ page import="java.sql.Types, java.sql.*, java.util.*, net.sf.json.*"   contentType="text/html;charset=windows-1251"  %>
<jsp:useBean id="db_conn" class="Leela.db.Conn" scope="session" />
<jsp:useBean id="my_utils" class="Leela.core.Util" scope="session" />


<%
    PreparedStatement pst = null;
    ResultSet rs = null;
    Connection conn = null;
    String v_dates = " And t.call_date_time Between to_date('01102011','ddmmyyyy') And to_date('01012012','ddmmyyyy')";
            String v_sql_start =
            " Select Distinct substr(r.name,1,28) as rek_name,         "+
            "    Sum(dep_5) over (Partition By z.rek) As dep_off,        "+
            "    Sum(dep_6) over (Partition By z.rek) As dep_zag,        "+
            "    Sum(dep_11) over (Partition By z.rek) As dep_ellite,        "+
            "    tot "+
            "    From        "+
            " (Select t.crm_rek_s_source_id As rek,        "+
            "        Case         "+
            "         When u.tl_departmenst_id = 5        "+
            "          Then 1 Else 0        "+
            "         End As dep_5,        "+
            "         Case         "+
            "         When u.tl_departmenst_id = 6        "+
            "          Then 1  Else 0         "+
            "         End As dep_6,        "+
            "         Case         "+
            "         When u.tl_departmenst_id = 11        "+
            "          Then 1   Else 0        "+
            "         End As dep_11,        "+
            "  Count(t.crm_rek_s_source_id) over (Partition By t.crm_rek_s_source_id) As tot "+
            " From crm_calls t, tl_users u        "+
            "  Where t.transfer_id = u.user_id        ";
            
            
            
            String v_sql_cond =  "  And u.tl_departmenst_id In (5,6,11) ";
            
            String v_sql_end = "          "+
            "  ) z, crm_rek_s_source r        "+
            "  Where z.rek = r.id " +
            "  order by tot desc ";
            
            
            
               if (request.getParameter("dep_id").equals("")|request.getParameter("dep_id")==null){
                  v_sql_cond =  "  And u.tl_departmenst_id In (5,6,11) ";
                  }else{
                   if (request.getParameter("dep_id").equals("777")){
                       v_sql_cond =  "  And u.tl_departmenst_id In (5,6,11) ";
                   }else{
                     v_sql_cond =  "  And u.tl_departmenst_id In ("+request.getParameter("dep_id")+") ";
                   }
                  }
            
                   String v_date_range = "   and trim(t.call_date_time) between to_date('"+request.getParameter("start_dt")+"', 'dd.mm.yyyy') "
                          + "    and to_date('"+request.getParameter("end_dt")+"','dd.mm.yyyy') ";
            
                 if (request.getParameter("start_dt").equals("")&request.getParameter("end_dt").equals("")){
                      v_sql_cond = v_sql_cond +v_date_range;
                  } else {
                       v_sql_cond = v_sql_cond +v_date_range;
                 }
            
            String v_sql = v_sql_start+v_sql_cond+v_sql_end;

            try {

                conn = db_conn.GetConnect();
                
                
                pst = conn.prepareStatement(v_sql);
               // pst.setString(1, request.getParameter("P_DEPID"));
                rs = pst.executeQuery();

                JSONObject store = new JSONObject();
                JSONArray json_a = new JSONArray();

                while (rs.next()) {
                    JSONObject obj = new JSONObject();
                    obj.put("rek_name", my_utils.nvl(rs.getString(1), "пусто"));
                    obj.put("dep_off", my_utils.nvl(rs.getString(2), "пусто"));
                    obj.put("dep_zag", my_utils.nvl(rs.getString(3), "пусто"));
                    obj.put("dep_ellite", my_utils.nvl(rs.getString(4), "пусто"));
                    obj.put("tot", my_utils.nvl(rs.getString(5), "пусто"));
                    
                    

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
