<%@ page import="java.sql.Types, java.sql.*, java.util.*, net.sf.json.*"   contentType="text/html;charset=windows-1251"  %>
<jsp:useBean id="db_conn" class="Leela.db.Conn" scope="session" />
<jsp:useBean id="my_utils" class="Leela.core.Util" scope="session" />


<%
    PreparedStatement pst = null;
    ResultSet rs = null;
    Connection conn = null;
            String v_sql =

 Select Distinct Transfer_Id As Tid,                                         
                 Name,                                                       
                 Count(charact1) Over(Partition By Transfer_Id) As Not_Detect,     
                 Count(charact2) Over(Partition By Transfer_Id) As pokupka,         
                 Count(charact3) Over(Partition By Transfer_Id) As prodaja,                             
                 Count(charact4) Over(Partition By Transfer_Id) As snyat,
                 Count(charact5) Over(Partition By Transfer_Id) As sdat,
                 Count(charact6) Over(Partition By Transfer_Id) As posrednik,                         
                 Count(Rtotal) Over(Partition By Transfer_Id) As Total,      
                 Count(charact1) Over() As Not_Detect_t,     
                 Count(charact2) Over() As pokupka_t,         
                 Count(charact3) Over() As prodaja_t,                             
                 Count(charact4) Over() As snyat_t,
                 Count(charact5) Over() As sdat_t,
                 Count(charact6) Over() As posrednik_t,                           
                 Count(Rtotal) Over() As Total_t                             
   From (Select w.Transfer_Id,                                                  
                u.Name,            
                /*
                
19	6	1	Не определён
20	6	2	Купить
21	6	3	Продать
22	6	4	Снять
23	6	5	Сдать
24	6	6	Посредник
                
                */                                          
                Case                                                           
                  When w.character_id Is Null Then   1  
                  When w.character_id =99 Then   1                     
                  When w.character_id = 1 Then  1                         
                End As charact1,                                                   
                Case                                                         
                  When w.character_id = 2 Then 2                            
                End As charact2,                                                   
                Case                                                         
                  When w.character_id = 3 Then 3                            
                End As charact3,                                                   
                Case                                                         
                  When w.character_id = 4 Then 4                            
                End As charact4,               
                Case                                                         
                  When w.character_id = 5 Then 5                            
                End As charact5,
                Case                                                         
                  When w.character_id = 6 Then 6                            
                End As charact6,                             
                Nvl(w.character_id, 1) As Rtotal                            
           From Crm_Calls w, Tl_Users u                                        
          Where w.Transfer_Id = u.User_Id                                    
            And u.Tl_Departmenst_Id = 6                                      
           And u.status  = 1           
           -- and trim(w.call_date_time) between to_date('19.01.2013', 'dd.mm.yyyy') and to_date('19.02.2013','dd.mm.yyyy')                                              
          Order By 1)                                                          
  Order By Total Desc                           
 


      String v_date_range = "   and trim(w.call_date_time) between to_date('"+request.getParameter("start_dt")+"', 'dd.mm.yyyy') "
 + "                                    and to_date('"+request.getParameter("end_dt")+"','dd.mm.yyyy') ";
      
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
