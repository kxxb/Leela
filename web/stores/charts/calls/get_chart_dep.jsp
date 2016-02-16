<%@ page import="java.sql.Types, java.sql.*, java.util.*, net.sf.json.*"   contentType="text/html;charset=windows-1251"  %>
<jsp:useBean id="db_conn" class="Leela.db.Conn" scope="session" />
<jsp:useBean id="my_utils" class="Leela.core.Util" scope="session" />


<%
    PreparedStatement pst = null;
    ResultSet rs = null;
    Connection conn = null;
            String v_sql =

                    " Select Distinct Transfer_Id As Tid,                                         "+
                    "                 Name,                                                       "+
                    "                 Count(R1) Over(Partition By Transfer_Id) As Not_Proced,     "+
                    "                 Count(R2) Over(Partition By Transfer_Id) As Active,         "+
                    "                 Count(R3) Over(Partition By Transfer_Id) As IN_WORK,         "+                    
                    "                 Count(R0) Over(Partition By Transfer_Id) As Passive,        "+
                    "                 Count(Rtotal) Over(Partition By Transfer_Id) As Total,      "+
                    "                 Count(R1) Over() As Not_Proced_t,                           "+  
                    "                 Count(R2) Over() As Active_t,                               "+
                    "                 Count(R3) Over() As IN_WORK_t,                               "+                    
                    "                 Count(R0) Over() As Passive_t,                              "+
                    "                 Count(Rtotal) Over() As Total_t                             "+
                    "   From (Select w.Transfer_Id,                                               "+   
                    "                u.Name,                                                      "+
                    "                Case                                                         "+  
                    "                  When w.Result_Status Is Null Then   -1                     "+
                    "                  When w.Result_Status = -1 Then  -1                         "+
                    "                End As R1,                                                   "+
                    "                Case                                                         "+
                    "                  When w.Result_Status = 1 Then 1                            "+
                    "                End As R2,                                                   "+
                    "                Case                                                         "+
                    "                  When w.Result_Status = 2 Then 2                            "+
                    "                End As R3,                                                   "+

                    "                Case                                                         "+
                    "                  When w.Result_Status = 0 Then 0                            "+
                    "                End As R0,                                                   "+
                    "                Nvl(w.Result_Status, 1) As Rtotal                            "+
                    "           From Crm_Calls w, Tl_Users u                                      "+  
                    "          Where w.Transfer_Id = u.User_Id                                    "+
                    "            And u.Tl_Departmenst_Id = ?                                      "+
                    "           And u.status  = 1                                     ";                    
 


      String v_date_range = "   and trim(w.call_date_time) between to_date('"+request.getParameter("start_dt")+"', 'dd.mm.yyyy') "
                          + "    and to_date('"+request.getParameter("end_dt")+"','dd.mm.yyyy') ";
      
      String v_order_by ="          Order By 1)                                                        "+  
                        "  Order By Total Desc                                                        "; 
         
                  if (request.getParameter("start_dt").equals("")&request.getParameter("end_dt").equals("")){
                  v_sql = v_sql + v_order_by;
                  }else{
                  v_sql = v_sql +v_date_range+ v_order_by;
                  }
      
        //v_sql = v_sql + v_order_by;

            try {

                conn = db_conn.GetConnect();
                
                
                pst = conn.prepareStatement(v_sql);
                pst.setString(1, request.getParameter("P_DEPID"));
                rs = pst.executeQuery();

                JSONObject store = new JSONObject();
                JSONArray json_a = new JSONArray();

                while (rs.next()) {
                    JSONObject obj = new JSONObject();
                    obj.put("br_id", my_utils.nvl(rs.getString(1), "пусто"));
                    obj.put("br_name", my_utils.nvl(rs.getString(2), "пусто"));
                    obj.put("Not_Proced", my_utils.nvl(rs.getString(3), "пусто"));
                    obj.put("Active", my_utils.nvl(rs.getString(4), "пусто"));
                    obj.put("IN_WORK", my_utils.nvl(rs.getString(5), "пусто"));
                    obj.put("Passive", my_utils.nvl(rs.getString(6), "пусто"));
                    obj.put("Total", my_utils.nvl(rs.getString(7), "пусто"));
                    obj.put("Not_Proced_t", my_utils.nvl(rs.getString(8), "пусто"));
                    obj.put("Active_t", my_utils.nvl(rs.getString(9), "пусто"));
                    obj.put("IN_WORK_t", my_utils.nvl(rs.getString(10), "пусто"));
                    obj.put("Passive_t", my_utils.nvl(rs.getString(11), "пусто"));
                    obj.put("Total_t", my_utils.nvl(rs.getString(12), "пусто"));

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
