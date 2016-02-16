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
                                 "  upper(t.Lot) Like upper('%"+v_search_param+"%') Or         "+                               
                                 "  upper(o.Name)  Like upper('%"+v_search_param+"%') Or       "+         
                                 "  upper(t.Budget_Start) Like upper('%"+v_search_param+"%') Or "+             
                                 "  upper(t.Budget_End) Like upper('%"+v_search_param+"%') Or   "+             
                                 "  upper(c.Name)  Like upper('%"+v_search_param+"%') Or        "+         
                                 "  upper(c.Short_Name) Like upper('%"+v_search_param+"%') Or   "+         
                                 "  upper(t.Area_Start) Like upper('%"+v_search_param+"%') Or   "+               
                                 "  upper(t.Area_End) Like upper('%"+v_search_param+"%') Or     "+             
                                 "  upper(t.Urgency) Like upper('%"+v_search_param+"%') Or      "+              
                                 "  upper(t.Destination) Like upper('%"+v_search_param+"%') Or  "+                   
                                 "  upper(r.Name)  Like ('%"+v_search_param+"%') Or             "+
                                 "  upper(Org.Name)  Like upper('%"+v_search_param+"%') Or      "+    
                                 "  upper(u.Name)  Like upper('%"+v_search_param+"%') Or       "+
                                 "  upper(t.Additional_Info)  Like upper('%"+v_search_param+"%') "+
                                 "      )    ";
        
        String v_sql_end  = "   )                                                                         "+
                            "  Where r Between ? And ?                                                   ";

 String v_sql_all_req = 
        " Select *                                                    "+
        "  From (Select t.Id,                                         "+
        "               t.Lot,                                        "+
        "               t.Operation_Id,                               "+
        "               o.Name As Op_Name,                            "+
        "               t.Budget_Start,                               "+
        "               t.Budget_End,                                 "+
        "               t.Currency_Id,                                "+
        "               c.Name As Cur_Name,                           "+
        "               c.Short_Name,                                 "+
        "               t.Area_Start,                                 "+
        "               t.Area_End,                                   "+
        "               t.Urgency,                                    "+
        "               t.Destination,                                "+
        "               t.Ready_Id,                                   "+
        "               r.Name As Ready_Name,                         "+
        "               t.Additional_Info,                            "+
        "               Nvl(To_Char(t.Date_Rec, 'dd.mm.yyyy hh24:mi'), '-') As Date_Rec,                                   "+
        "               t.Last_User_Id,                               "+
        "               Org.Name As Org_Name,                         "+
        "               u.Name As User_Name,                          "+
        "               cl.id  As cl_id,                              "+         
        "               req_st_h.id as req_st_id,                                  "+
        "               req_st_h.name as req_st_name,                                "+
        "               Nvl(To_Char(t.Date_Update, 'dd.mm.yyyy hh24:mi'), To_Char(t.Date_Rec, 'dd.mm.yyyy hh24:mi')) As Date_Update,                                   "+
        "               ud.name As req_dep_name,                                   "+        
        "               Count(t.Id) Over() As c,                      "+
        "               Row_Number() Over(Order By t.Id Desc) As r   "+
        
        "          From Crm_Clients_Requests        t,                "+
        "               Crm_s_Currency              c,                "+
        "               Crm_s_Obj_Ready             r,                "+
        "               Crm_s_Client_Req_Operations o,                "+  
        "               Crm_Clients                 Cl,               "+
        "               Crm_Client_s_Organization   Org,              "+
        "               crm_s_handbooks        req_st_h,              "+
        "               Tl_Users                    u,                 "+
        "               tl_departments              ud                 "+
        "         Where t.Operation_Id = o.Id                         "+
        "           And t.Currency_Id = c.Id(+)                          "+
        "           And t.Ready_Id = r.Id(+)                             "+
        "           And t.Client_Id = Cl.Id                           "+
        "           And req_st_h.crm_handbooks_id = 5                 "+
        "           And req_st_h.id = nvl(t.request_status,1)                "+
        "           And nvl(t.req_dep_id,9999) = ud.id                "+                 
        
        "           And Org.Id = Cl.Crm_Client_s_Organization_Id      "+
        "           And t.Last_User_Id = u.User_Id ";  


      String v_Dep_id = request.getParameter("dep_id");
      String v_User_id = request.getParameter("user_id");
      String v_Client_id = request.getParameter("cid");
      String v_mode = request.getParameter("mode");
      
      
      
      /*filtr*/
        try  { 
        if ( !request.getParameter("p_cl_org").equals("")){
             v_filter_params = v_filter_params + " and Org.Name = '"
                     + request.getParameter("p_cl_org") +"' ";
         }
        /*
        if ( !request.getParameter("p_cl_org").equals("")){
             v_filter_params = v_filter_params + " and Org.Name = '"
                     + request.getParameter("p_cl_org") +"' ";
         }*/
          
         }catch (Exception e)
        {out.println("-");}
         
                 
/*end filtr*/

      
      
        try{
         conn = db_conn.GetConnect();

         String v_count = "";
         String v_limit = request.getParameter("limit");
         String v_start = request.getParameter("start");


     
         if (v_mode.equals("broker")){
             v_sql = v_sql_all_req  
                      +" and t.Last_User_Id = ? "+
                      v_search_sql + v_sql_end;
         }
         else if (v_mode.equals("my_dep")){
             v_sql = v_sql_all_req  
                      +" and u.tl_departmenst_id = ? "+
                      v_search_sql + v_sql_end;
         }
         else if (v_mode.equals("commercial_dep")){
             /*v_sql = v_sql_all_req  
                      +" and u.tl_departmenst_id = 5 "+
                      v_search_sql + v_sql_end;
             */
             if (v_filter_params.equals("")){
             v_sql = v_sql_all_req  
                      +" and u.tl_departmenst_id = 5 "+
                      v_search_sql + v_sql_end;
            } else {
                 v_sql = v_sql_all_req  
                      +" and u.tl_departmenst_id = 5 "+
                      v_filter_params + v_sql_end;
                 
            }
         }
         
         else if (v_mode.equals("retail_dep")){
             v_sql = v_sql_all_req  
                      +" and u.tl_departmenst_id = 12 "+
                      v_search_sql + v_sql_end;
         }
         else if (v_mode.equals("office_dep")){
             v_sql = v_sql_all_req  
                      +" and u.tl_departmenst_id = 13 "+
                      v_search_sql + v_sql_end;
         }
         
         else if (v_mode.equals("suburban_dep")){
             v_sql = v_sql_all_req  
                      +" and u.tl_departmenst_id = 6 "+
                      v_search_sql + v_sql_end;
         }         
         else if (v_mode.equals("luxury_dep")){
             v_sql = v_sql_all_req  
                      +" and u.tl_departmenst_id = 11 "+
                      v_search_sql + v_sql_end;
         }
         else if (v_mode.equals("clients")){
             v_sql = v_sql_all_req  
                      +" And t.Client_Id = ? "+
                      v_search_sql + v_sql_end;
         }
         else{
             if (v_filter_params.equals("")){
               v_sql =  v_sql_all_req + v_search_sql + v_sql_end;
            } else {
                 v_sql =  v_sql_all_req + v_filter_params + v_sql_end;
            }
                
         }

         
         

        /*pager*/


            v_start = Lela_util.nvl(v_start,"1");
            if (v_start.equals("0")) { v_start ="1";}
            int v_end = Integer.parseInt(v_start) + Integer.parseInt(Lela_util.nvl(v_limit,"20"));
        /*end pager*/
             if (v_mode.equals("broker")){
                 cs = conn.prepareCall(v_sql);
                 cs.setString(1, v_User_id);
                 cs.setString(2, v_start);
                 cs.setInt(3, v_end);
              }
              else if (v_mode.equals("my_dep")){  
                 cs = conn.prepareCall(v_sql);
                 cs.setString(1, v_Dep_id);
                 cs.setString(2, v_start);
                 cs.setInt(3, v_end);
                   
             }else if (v_mode.equals("clients")){  
                 cs = conn.prepareCall(v_sql);
                 cs.setString(1, v_Client_id);
                 cs.setString(2, v_start);
                 cs.setInt(3, v_end);
                   
             }
            else
             {
                 
                 cs = conn.prepareCall(v_sql);
                 cs.setString(1, v_start);
                 cs.setInt(2, v_end);
             }
             
             
             cs.execute();
             rs = cs.getResultSet();

             JSONObject store = new JSONObject();
             JSONArray json_a = new JSONArray();





        while (rs.next()){
           JSONObject obj = new JSONObject();
           obj.put("ID", Lela_util.nvl(rs.getString(1), "пусто"));
           obj.put("LOT", Lela_util.nvl(rs.getString(2), "пусто"));
           obj.put("OPERATION_ID", Lela_util.nvl(rs.getString(3), "пусто"));
           obj.put("OP_NAME", Lela_util.nvl(rs.getString(4), "пусто"));
           obj.put("BUDGET_START", Lela_util.nvl(rs.getString(5), "пусто"));
           obj.put("BUDGET_END", Lela_util.nvl(rs.getString(6), "пусто"));
           obj.put("CURRENCY_ID", Lela_util.nvl(rs.getString(7), "пусто"));
           obj.put("CUR_NAME", Lela_util.nvl(rs.getString(8), "пусто"));
           obj.put("SHORT_NAME", Lela_util.nvl(rs.getString(9), "пусто"));
           obj.put("AREA_START", Lela_util.nvl(rs.getString(10), "пусто"));
           obj.put("AREA_END", Lela_util.nvl(rs.getString(11), "пусто"));
           obj.put("URGENCY", Lela_util.nvl(rs.getString(12), "пусто"));
           obj.put("DESTINATION", Lela_util.nvl(rs.getString(13), "пусто"));
           obj.put("READY_ID", Lela_util.nvl(rs.getString(14), "пусто"));
           obj.put("READY_NAME", Lela_util.nvl(rs.getString(15), "пусто"));
           obj.put("ADDITIONAL_INFO", Lela_util.nvl(rs.getString(16), "пусто"));
           obj.put("DATE_REC", Lela_util.nvl(rs.getString(17), "пусто"));
           obj.put("LAST_USER_ID", Lela_util.nvl(rs.getString(18), "пусто"));
           obj.put("ORG_NAME", Lela_util.nvl(rs.getString(19), "пусто"));
           obj.put("USER_NAME", Lela_util.nvl(rs.getString(20), "пусто"));
           obj.put("cl_id", Lela_util.nvl(rs.getString(21), "пусто"));
           obj.put("req_status_id", Lela_util.nvl(rs.getString(22), "пусто"));
           obj.put("req_status_name", Lela_util.nvl(rs.getString(23), "пусто"));
           obj.put("Date_Update", Lela_util.nvl(rs.getString(24), "пусто"));
           obj.put("req_dep_name", Lela_util.nvl(rs.getString(25), "пусто"));
           
           

           v_count = rs.getString(26);
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
        {out.println(e.toString() + "***** " + v_sql);}
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
