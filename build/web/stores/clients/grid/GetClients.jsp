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
        String v_result ="";
        Connection conn = null;
        ResultSet rs  = null;
        CallableStatement cs = null;
        String v_sql = "";
        String v_filter_params = "";
        String v_sql_end  = "  ";

        String v_sql_all_clients = " /*все клиенты*/ "+
            "  Select * From                                          "+
            "  (Select                                                "+
            "       t.id,                                             "+  
            "       t.name,                                           "+
            "       t.tel_cellular,                                   "+
            "       t.tel_stat,                                       "+
            "       t.email,                                          "+
            "       t.is_subscribe,                                   "+
            "       t.crm_client_s_organization_id,                   "+
            "       o.name As org_name,                               "+
            "       t.job_title,                                      "+  
            "       t.client_description,                             "+
            "       t.last_user_id,                                   "+
            "       Count(T.Id) Over() As C,                          "+
            "       Row_Number() Over(Order By t.id Desc) As r        "+
            "   From CRM_CLIENTS t, crm_client_s_organization o       "+
            "  Where t.crm_client_s_organization_id = o.id            "+
            "     "+
            " )                                                          "+            
            "                                                           "+
            "     Where r Between ? And ?                             "+
            "     order by 2                                          ";

        String v_sql_dep_clients = " /*все клиенты отдела*/ "+
             "  Select * From                                          "+
            "  (Select                                                "+
            "       t.id,                                             "+  
            "       t.name,                                           "+
            "       t.tel_cellular,                                   "+
            "       t.tel_stat,                                       "+
            "       t.email,                                          "+
            "       t.is_subscribe,                                   "+
            "       t.crm_client_s_organization_id,                   "+
            "       o.name As org_name,                               "+
            "       t.job_title,                                      "+  
            "       t.client_description,                             "+
            "       t.last_user_id,                                   "+
            "       u.name As broker_name,                            "+  
            "       Count(T.Id) Over() As C,                          "+
            "       Row_Number() Over(Order By t.id Desc) As r        "+
            "   From CRM_CLIENTS t, crm_client_s_organization o,  tl_users u       "+
            "  Where t.crm_client_s_organization_id = o.id              "+ 
            "   And t.last_user_id = u.user_id                           "+        
            "   And u.tl_departmenst_id = ?                              "+
            "    "+
            " )                                                          "+
            "     Where r Between ? And ?                             "+
            "     order by 2                                          ";
            


        String v_sql_broker_clients = " /*только клиенты брокера*/ "+
            "  Select * From                                          "+
            "  (Select                                                "+
            "       t.id,                                             "+  
            "       t.name,                                           "+
            "       t.tel_cellular,                                   "+
            "       t.tel_stat,                                       "+
            "       t.email,                                          "+
            "       t.is_subscribe,                                   "+
            "       t.crm_client_s_organization_id,                   "+
            "       o.name As org_name,                               "+
            "       t.job_title,                                      "+  
            "       t.client_description,                            "+
            "       t.last_user_id,                                  "+
            "       Count(T.Id) Over() As C,                         "+
            "       Row_Number() Over(Order By t.id Desc) As r       "+
            "   From CRM_CLIENTS t, crm_client_s_organization o      "+
            "  Where t.crm_client_s_organization_id = o.id           "+ 
            
            "   And Exists (Select * From  crm_clients_access ca Where ca.user_id = ? And ca.client_id = t.id And ca.status = 1 )         "+
            " )                                                      "+
            "     Where r Between ? And ?                            "+
            "     order by 2                                         ";


      String v_Dep_id = request.getParameter("Dep_id");
      String v_User_id = request.getParameter("user_id");
      
      
        try{
         conn = db_conn.GetConnect();

         String v_count = "";
         String v_limit = request.getParameter("limit");
         String v_start = request.getParameter("start");


   
         

         if (request.getParameter("mode").equals("all_clients")){

           //v_sql = v_sql_all_calls +" "+ v_filter_params +" "+  v_sql_end;
           v_sql = v_sql_all_clients;
         } else if (request.getParameter("mode").equals("dep_clients")){

           v_sql = v_sql_dep_clients +" "+ v_filter_params +" "+  v_sql_end;
         }else if (request.getParameter("mode").equals("broker_clients")){

           v_sql = v_sql_broker_clients +" "+ v_filter_params +" "+  v_sql_end;
         };

         /*pager*/


            v_start = Lela_util.nvl(v_start,"1");
            if (v_start.equals("0")) { v_start ="1";}
            int v_end = Integer.parseInt(v_start) + Integer.parseInt(Lela_util.nvl(v_limit,"20"));
        /*end pager*/

             request.setCharacterEncoding("Cp1251");
             cs = conn.prepareCall(v_sql);
             if (request.getParameter("mode").equals("all_clients")) {
                 
                 cs.setString(1, v_start);
                 cs.setInt(2, v_end);
             } else if (request.getParameter("mode").equals("dep_clients")) {
                 cs.setString(1, v_Dep_id);
                 cs.setString(2, v_start);
                 cs.setInt(3, v_end);
                 
             }else if (request.getParameter("mode").equals("broker_clients")) {
                 cs.setString(1, v_User_id);
                 cs.setString(2, v_start);
                 cs.setInt(3, v_end);
                 
             }
             cs.execute();
             rs = cs.getResultSet();

             JSONObject store = new JSONObject();
             JSONArray json_a = new JSONArray();

     
     if (request.getParameter("mode").equals("dep_clients")) {               





        while (rs.next()){
           JSONObject obj = new JSONObject();
           obj.put("CLIENT_ID", Lela_util.nvl(rs.getString(1), "пусто"));
           obj.put("CLIENT_NAME", Lela_util.nvl(rs.getString(2), "пусто"));
           obj.put("TEL_CELLULAR", Lela_util.nvl(rs.getString(3), "пусто"));
           obj.put("TEL_STAT", Lela_util.nvl(rs.getString(4), "пусто"));
           obj.put("EMAIL", Lela_util.nvl(rs.getString(5), "пусто"));
           obj.put("IS_SUBSCRIBE", Lela_util.nvl(rs.getString(6), "пусто"));
           obj.put("crm_client_s_organization_id", Lela_util.nvl(rs.getString(7), "пусто"));
           obj.put("org_name", Lela_util.nvl(rs.getString(8), "пусто"));
           obj.put("job_title", Lela_util.nvl(rs.getString(9), "пусто"));
           obj.put("client_description", Lela_util.nvl(rs.getString(10), "пусто"));
           obj.put("last_user_id", Lela_util.nvl(rs.getString(11), "пусто"));
           obj.put("broker_name", Lela_util.nvl(rs.getString(12), "пусто"));

           v_count = rs.getString(13);
           json_a.add(obj);

        }

     }  else {
      while (rs.next()){
           JSONObject obj = new JSONObject();
           obj.put("CLIENT_ID", Lela_util.nvl(rs.getString(1), "пусто"));
           obj.put("CLIENT_NAME", Lela_util.nvl(rs.getString(2), "пусто"));
           obj.put("TEL_CELLULAR", Lela_util.nvl(rs.getString(3), "пусто"));
           obj.put("TEL_STAT", Lela_util.nvl(rs.getString(4), "пусто"));
           obj.put("EMAIL", Lela_util.nvl(rs.getString(5), "пусто"));
           obj.put("IS_SUBSCRIBE", Lela_util.nvl(rs.getString(6), "пусто"));
           obj.put("crm_client_s_organization_id", Lela_util.nvl(rs.getString(7), "пусто"));
           obj.put("org_name", Lela_util.nvl(rs.getString(8), "пусто"));
           obj.put("job_title", Lela_util.nvl(rs.getString(9), "пусто"));
           obj.put("client_description", Lela_util.nvl(rs.getString(10), "пусто"));
           obj.put("last_user_id", Lela_util.nvl(rs.getString(11), "пусто"));

           v_count = rs.getString(12);
           json_a.add(obj);

        }
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
        {out.println(e.toString());}
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
