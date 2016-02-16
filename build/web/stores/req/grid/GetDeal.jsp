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
        String v_sql_all_deals = " /*все сделки*/ "+
                                "Select * from (    "+
                                "Select  T.Id   "+
                                "            , Nvl(To_Char(T.Date_Open, 'dd.mm.yyyy hh24:mi'), '-') As Date_Open  "+
                                "            , Nvl(To_Char(T.Date_Close, 'dd.mm.yyyy hh24:mi'), '-') As Date_Close  "+
                                "            ,T.Addres  "+
                                "            ,Bd.Name As Dep_Name  "+
                                "            ,T.Broker_Sobstv  "+
                                "            ,T.Broker_Client  "+
                                "            ,Ud.Name As User_Dep  "+
                                "            ,Us.Name as User_Name  "+
                                "            ,T.Sdelka  "+
                                "            ,Case   "+
                                "                When t.Is_Close = 0 Then 'нет'  "+
                                "                When t.Is_Close = 1 Then 'да'  "+
                                "                end as  Is_Close  "+
                                "            , Count(T.Id) Over() As C  "+
                                "            , Row_Number() Over(Order By t.id Desc) As r  "+
                                "From Tl_Deals T, Tl_Departments Bd, Tl_Departments Ud, Tl_Users Us  "+
                                "Where T.Tl_Depatments_Id = Bd.Id  "+
                                "And T.User_Id = Us.User_Id  "+
                                "And Us.Tl_Departmenst_Id = Ud.Id  "+
                                ")     Where r Between    "+
                                "  ?     And  ?  ";


      
        try{
         conn = db_conn.GetConnect();

         String v_count = "";
         String v_limit = request.getParameter("limit");
         String v_start = request.getParameter("start");

    if (request.getParameter("limit")==null) {
         if (!request.getParameter("DealId").equals("")  ){
             v_filter_params = v_filter_params + " and id in ("
                     + request.getParameter("DealId") +") ";
         }



         if (!request.getParameter("Date_Open_start").equals("") & !request.getParameter("Date_Open_finish").equals("")
                 //request.getParameter("CreateDtStart")!=null & request.getParameter("CreateDtFinish")!=null
                  ){
             v_filter_params = v_filter_params + " and Date_Open between to_date(substr('"
                     + request.getParameter("Date_Open_start") +"',1,10),  'yyyy-mm-dd') and to_date(substr('"+request.getParameter("Date_Open_finish")+"',1,10),  'yyyy-mm-dd')";
         }

         if (//request.getParameter("DoneDtStart")!=null & request.getParameter("DoneDtFinish")!=null
                   !request.getParameter("Date_Close_start").equals("") & !request.getParameter("Date_Close_finish").equals("") ){
             v_filter_params = v_filter_params + " and Date_Close between to_date(substr('"
                     + request.getParameter("DoneDtStart") +"',1,10),   'yyyy-mm-dd') and to_date(substr('"+request.getParameter("Date_Close_finish")+"',1,10),   'yyyy-mm-dd')";
         }




      
          if ( !request.getParameter("Dep_Name").equals("")){
             v_filter_params = v_filter_params + " and Dep_Name = '"
                     + request.getParameter("Dep_Name") +"' ";
         }
         if (!request.getParameter("Addres").equals("")){
             v_filter_params = v_filter_params + " and Addres like  ('%"
                     + request.getParameter("Addres") +"%') ";
         }

         if (!request.getParameter("Broker_Sobstv").equals("")){
             v_filter_params = v_filter_params + " and Broker_Sobstv like  '%"
                     + request.getParameter("Broker_Sobstv") +"%' ";
         }
          if (!request.getParameter("Broker_Client").equals("") ){
             v_filter_params = v_filter_params + " and Broker_Client like  '%"
                     + request.getParameter("Broker_Client") +"%' ";
         }

         if (!request.getParameter("Sdelka").equals("") ){
             v_filter_params = v_filter_params + " and Sdelka like  '%"
                     + request.getParameter("Sdelka") +"%' ";
         }
         
         if ( !request.getParameter("Is_Close").equals("")){
             v_filter_params = v_filter_params + " and Is_Close = '"
                     + request.getParameter("Is_Close") +"' ";
         }




    }

         if (request.getParameter("mode").equals("AllDeals")){

           v_sql = v_sql_all_deals +" "+ v_filter_params +" "+  v_sql_end;
         }

         /*pager*/


            v_start = Lela_util.nvl(v_start,"1");
            if (v_start.equals("0")) { v_start ="1";}
            int v_end = Integer.parseInt(v_start) + Integer.parseInt(Lela_util.nvl(v_limit,"20"));
        /*end pager*/

             request.setCharacterEncoding("Cp1251");

             cs = conn.prepareCall(v_sql);
             if (request.getParameter("mode").equals("AllDeals")) {
                 cs.setString(1, v_start);
                 cs.setInt(2, v_end);
             } 
             cs.execute();
             rs = cs.getResultSet();

             JSONObject store = new JSONObject();
             JSONArray json_a = new JSONArray();
        



        while (rs.next()){
           JSONObject obj = new JSONObject();
           obj.put("deal_id", Lela_util.nvl(rs.getString(1), "пусто"));
           obj.put("Date_Open", Lela_util.nvl(rs.getString(2), "пусто"));
           obj.put("Date_Close", Lela_util.nvl(rs.getString(3), "пусто"));
           obj.put("Addres", Lela_util.nvl(rs.getString(4), "пусто"));
           obj.put("Broker_Dep", Lela_util.nvl(rs.getString(5), "пусто"));
           obj.put("Broker_Sobstv", Lela_util.nvl(rs.getString(6), "пусто"));
           obj.put("Broker_Client", Lela_util.nvl(rs.getString(7), "пусто"));
           obj.put("User_Dep", Lela_util.nvl(rs.getString(8), "пусто"));
           obj.put("User_Name", Lela_util.nvl(rs.getString(9), "пусто"));
           obj.put("Sdelka", Lela_util.nvl(rs.getString(10), "пусто"));
           obj.put("Is_Close", Lela_util.nvl(rs.getString(11), "пусто"));

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
