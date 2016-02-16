<%@ page import="java.sql.Types, java.sql.*, java.util.*, net.sf.json.*"   contentType="text/html;charset=UTF-8"  %>
<jsp:useBean id="db_conn" class="Leela.db.Conn" scope="session" />
<jsp:useBean id="my_utils" class="Leela.core.Util" scope="session" />


<%

        String v_result ="";
        Connection conn = null;
        ResultSet rs  = null;
        CallableStatement cs = null;
        
        String v_sql = "";
        String v_filter_params = "";
        String v_params = "2781";
   
        v_params =my_utils.nvl(request.getParameter("search_param"),"0");
        
          v_sql = "Begin ? := crm_obj_search.json_obj_rooms(?); End;";
                  
                  
          request.setCharacterEncoding("utf-8");
          
          String v_count = "";
                 String v_sq_m_from =  my_utils.nvl(request.getParameter("start"),"1");
                 String v_sq_m_to = my_utils.nvl(request.getParameter("limit"),"26");
                 int v_end = Integer.parseInt(v_sq_m_from) + Integer.parseInt(my_utils.nvl(v_sq_m_to,"20"));   
          String v_client_id = request.getParameter("cid");
            try {

                 conn = db_conn.GetConnect();
                 
                 
                 


            
          //  v_sql = v_sql +" "+ v_filter_params +" "+ v_search_sql + v_sql_end;
                cs = conn.prepareCall(v_sql);
                cs.registerOutParameter(1, Types.VARCHAR);  // o_Result
                cs.setString(2, v_params);
                
                cs.execute();
                //Clob res = cs.getClob(1);
                String res = cs.getString(1);
                //rs = cs.getResultSet();

              
                String callback_function_name = request.getParameter("callback");
                String response_string = "";
                if (!"".equals(callback_function_name)) {
                    response_string = callback_function_name + "(" + res + ")";
                } else {
                    response_string = res;
                }
                out.println(response_string);
                
               // out.println(res);
                //out.print(store);
                out.flush();
                conn.close();

            } catch (Exception e) {
                out.println(e.toString()+"v_sq_m_from "+v_sq_m_from+"/ v_sq_m_to "+v_sq_m_to);
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
