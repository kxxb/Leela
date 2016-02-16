<%-- 
    Document   : index
    Created on : 03.04.2012, 15:22:54
    Author     : kxxb
--%>


<%@ page import="java.sql.Types,
         java.util.Map,
         net.sf.json.*,  java.sql.*"
         contentType="text/html;charset=windows-1251"  
%>
<jsp:useBean id="db_conn" class="Leela.db.Conn" scope="session" />
<jsp:useBean id="Lela_util" class="Leela.core.Util" scope="session" />

        <%
         request.setCharacterEncoding("UTF-8");  
         Connection conn = null;
         ResultSet rs  = null;
         CallableStatement cs = null;
         
         PreparedStatement pst = null;
         ResultSet rs_search = null;

         
         
          
          
          String s_cian_id ="1";
          String v_search_call = "";
          
          String v_sql="";
          String v_objects_id ="";
          String v_sql_result="";
          
          try {
                    Map metro_m = request.getParameterMap();
                    String[] vals = (String[])metro_m.get("metro[]");
                    String val = vals[0];
                        //String[] arr = (String[]) me.getValue();
                    for(int i=0;i<vals.length;i++){
                        if (i ==0){
                            s_cian_id = vals[i];
                        }else{
                        s_cian_id = s_cian_id +", "+vals[i];
                        }
                    }
                    
                    } catch  (Exception e){
                     s_cian_id = Lela_util.nvl(s_cian_id,"1");
                 }                 
                      //out.println(s_cian_id);
                    
                s_cian_id = request.getParameter("m_cian");
                    /*вызов поисковой функции*/
                    v_search_call = "Select crm_obj_search.Search_Objects('1,2,3') From dual";
                 
          
         try {

             
            
                conn = db_conn.GetConnect();
                pst = conn.prepareStatement(v_search_call);
                //pst.setString(1, s_cian_id);
                rs_search = pst.executeQuery();
                while (rs_search.next()) {
                  v_objects_id =  rs_search.getString(1);
                }

                out.flush();
                conn.close();

            } catch (Exception e) {
                out.println(e.toString());
            }finally {

                if (pst != null) pst.close();
                if (rs_search != null) rs_search.close();
                if (conn != null) {
                  try {
                    conn.rollback();
                  } catch(Exception ex) {}
                  try {
                    conn.close();
                  } catch(Exception ex) {}
                }
           }
           
          //out.println("конец вызова поисковой функции" + v_objects_id );
         /*конец вызова поисковой функции*/
           
         
           
         
         v_sql_result =
         " Select *                                                                         "+
         "      from (                                                                      "+        
         "   Select r.object_title, os.valu_e As obj_status,                                         "+
         "       r.project_cost,                                                            "+
         "       nd.valu_e As nds,                                                          "+
         "       r.land_info,                                                               "+  
         "       r.object_owner,                                                            "+
         "       ag.valu_e As agency,                                                       "+
         "       el.valu_e As elabor,                                                       "+
         "       pri.valu_e As Priority,                                                    "+
         "       r.best_offer,                                                              "+  
         "       r.lot,                                                                     "+
         "       r.old_lot,                                                                 "+
         "       r.old_obj_id,                                                              "+
         "       Nvl(To_Char( r.object_date, 'dd/mm/yyyy hh24:mi'), '-') As object_date,    "+
         "       r.contract_work,                                                           "+
         "       actpass.valu_e As active_passive,                                          "+
         "       r.proposed,                                                                "+  
         "       r.for_lease,                                                               "+  
         "       r.for_sale,                                                                "+
         "       r.for_sublease,                                                            "+
         "       r.for_lease_sale,                                                          "+
         "       r.developer_name,                                                          "+
         "       r.dev_contact,                                                             "+
         "       r.dev_tel,                                                                 "+  
         "       r.investor_name,                                                           "+
         "       loc.valu_e As location_name,                                               "+
         "       direc.valu_e As direction_name,                                            "+
         "       bdistr.valu_e As bis_district,                                             "+
         "                                                                                  "+  
         "       ms.station_name,                                                           "+
         "       objadr.walk_metro_minutes,                                                 "+
         "       objadr.auto_metro_minutes,                                                 "+
         "       objadr.outside_mkad,                                                       "+
         "       objadr.discripton_of_location,                                             "+
         "       kl.name  as street_name,                                                                   "+
         "       objadr.house_numb,                                                         "+
         "       Count(r.Id) Over() As C,                                                   "+
         "       Row_Number() Over(Order By r.id Desc) As r                                 "+
         "                                                                                  "+
         "       From re_objects r, re_objects_address objadr,                              "+
         "           list_val os, list_val nd, list_val ag, list_val el,                    "+  
         "           list_val pri, list_val actpass,                                        "+
         "                                                                                  "+  
         "           list_val loc,list_val direc, list_val bdistr,                          "+
         "           crm_s_metro_station ms, kladr_street_new kl                            "+
         "       Where r.object_status = os.id(+)                                           "+
         "       And r.nds_id = nd.id(+)                                                    "+
         "       And r.agency_id = ag.id(+)                                                 "+
         "       And r.elaborate =  el.id(+)                                                "+
         "       And  r.priority = pri.id(+)                                                "+
         "       And r.activ_passiv_id =actpass.id(+)                                       "+
         "       And r.id = objadr.re_objects_id(+)                                         "+
         "                                                                                  "+  
         "       And  objadr.location_id = loc.id(+)                                        "+
         "       And  objadr.direction_id = direc.id(+)                                     "+
         "       And  objadr.buisnes_district_id = bdistr.id(+)                             "+
         "       And  objadr.metro_station_id = ms.id(+)                                    "+
         "       And  objadr.kladr_doma_code = kl.code(+)                                   "+
         "                                                                                  "+
         "       And  r.id In (2229,1603,926,963,1776,1685,577,1630,1489,2856,2424,1121,1123,940,1784,1863,2192,520,1326,2027,1611,948,1440,916,1830,1675,1316,1135,956,2734,2809,2829,760,1966,1482,7,2541,1704,1731,1520,2589,903,2311,1989,1562,2745,1447,1269,1120,2132,1961,2046,2147,1940,935,2760,937,2031,1455,2397,1871,1042,1941,2234,460,919,1189,909,945,960,1134,921,2652,2257,1991,1257,1289,1301,2544,954,753,1679,917,661,1126,1112,1952,1145,2536,335,2291,2586,897,1139,950,933,1446,915,931,1118,1125,834,799,936,1008,2884,911,2235,1328,1132,1445,2571,2530)                                                            ";
 
 
 
           
         
         try{
         conn = db_conn.GetConnect();

         String v_count = "";
         String v_limit = request.getParameter("limit");
         String v_start = request.getParameter("start");


//    if (request.getParameter("limit")==null) {
//        
//         if ( !request.getParameter("transfer_id").equals("")){
//             v_filter_params = v_filter_params + " and t.transfer_id = '"
//                     + request.getParameter("transfer_id") +"' ";
//         }
//
//    }
//         
//
//         if (request.getParameter("mode").equals("all_calls")){
//           v_sql = v_sql_all_calls +" "+ v_filter_params +" "+  v_sql_end;
//         } else if (request.getParameter("mode").equals("dep_calls")){
//
//           v_sql = v_sql_dep_calls +" "+ v_filter_params +" "+ v_search_sql +  v_sql_end;
//         }else if (request.getParameter("mode").equals("broker_calls")){
//
//           v_sql = v_sql_broker_calls +" "+ v_filter_params +" "+  v_sql_end;
//         };



           /*pager*/


            v_start = Lela_util.nvl(v_start,"1");
            if (v_start.equals("0")) { v_start ="1";}
            int v_end = Integer.parseInt(v_start) + Integer.parseInt(Lela_util.nvl(v_limit,"20"));
        /*end pager*/


//          String v_sql_end  = "            )                                         "+
//                            "     Where r Between ? And ?                          ";  
            
            String v_sql_end  = "            ) ";  
                    
                      
            v_sql = v_sql_result + v_sql_end;      
            
             request.setCharacterEncoding("Cp1251");

             cs = conn.prepareCall(v_sql);
                //cs.setString(1, v_objects_id);
                 //cs.setString(1, v_start);
                // cs.setInt(2, v_end);
             
//            if (request.getParameter("mode").equals("all_calls")) {
//                 cs.setString(1, v_start);
//                 cs.setInt(2, v_end);
//             } else if (request.getParameter("mode").equals("dep_calls")) {
//             }else if (request.getParameter("mode").equals("broker_calls")) {
//                 cs.setString(1, v_User_id);
//                 cs.setString(2, v_start);
//                 cs.setInt(3, v_end);
//             }
             cs.execute();
             rs = cs.getResultSet();

             JSONObject store = new JSONObject();
             JSONArray json_a = new JSONArray();




          
        while (rs.next()){
           JSONObject obj = new JSONObject();
            obj.put("object_title", Lela_util.nvl(rs.getString(1), "пусто"));
            obj.put("obj_status", Lela_util.nvl(rs.getString(2), "пусто"));
            obj.put("project_cost", Lela_util.nvl(rs.getString(3), "пусто"));
            obj.put("nds", Lela_util.nvl(rs.getString(4), "пусто"));
            obj.put("land_info", Lela_util.nvl(rs.getString(5), "пусто"));
            obj.put("object_owner", Lela_util.nvl(rs.getString(6), "пусто"));
            obj.put("agency", Lela_util.nvl(rs.getString(7), "пусто"));
            obj.put("elabor", Lela_util.nvl(rs.getString(8), "пусто"));
            obj.put("priority", Lela_util.nvl(rs.getString(9), "пусто"));
            obj.put("best_offer", Lela_util.nvl(rs.getString(10), "пусто"));
            obj.put("lot", Lela_util.nvl(rs.getString(11), "пусто"));
            obj.put("old_lot", Lela_util.nvl(rs.getString(12), "пусто"));
            obj.put("old_obj_id", Lela_util.nvl(rs.getString(13), "пусто"));
            obj.put("object_date", Lela_util.nvl(rs.getString(14), "пусто"));
            obj.put("contract_work", Lela_util.nvl(rs.getString(15), "пусто"));
            obj.put("active_passive", Lela_util.nvl(rs.getString(16), "пусто"));
            obj.put("proposed", Lela_util.nvl(rs.getString(17), "пусто"));
            obj.put("for_lease", Lela_util.nvl(rs.getString(18), "пусто"));
            obj.put("for_sale", Lela_util.nvl(rs.getString(19), "пусто"));
            obj.put("for_sublease", Lela_util.nvl(rs.getString(20), "пусто"));
            obj.put("for_lease_sale", Lela_util.nvl(rs.getString(21), "пусто"));
            obj.put("developer_name", Lela_util.nvl(rs.getString(22), "пусто"));
            obj.put("dev_contact", Lela_util.nvl(rs.getString(23), "пусто"));
            obj.put("dev_tel", Lela_util.nvl(rs.getString(24), "пусто"));
            obj.put("investor_name", Lela_util.nvl(rs.getString(25), "пусто"));
            obj.put("location_name", Lela_util.nvl(rs.getString(26), "пусто"));
            obj.put("direction_name", Lela_util.nvl(rs.getString(27), "пусто"));
            obj.put("bis_district", Lela_util.nvl(rs.getString(28), "пусто"));
            obj.put("metro_id", Lela_util.nvl(rs.getString(29), "пусто"));
            obj.put("station_name", Lela_util.nvl(rs.getString(30), "пусто"));
            obj.put("kladr_doma_code", Lela_util.nvl(rs.getString(31), "пусто"));
            obj.put("walk_metro_minutes", Lela_util.nvl(rs.getString(32), "пусто"));
            obj.put("auto_metro_minutes", Lela_util.nvl(rs.getString(33), "пусто"));
            obj.put("outside_mkad", Lela_util.nvl(rs.getString(34), "пусто"));
            obj.put("discripton_of_location", Lela_util.nvl(rs.getString(35), "пусто"));
            obj.put("street_name", Lela_util.nvl(rs.getString(36), "пусто"));
            obj.put("house_numb", Lela_util.nvl(rs.getString(37), "пусто"));
            v_count = rs.getString(38);
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
        
