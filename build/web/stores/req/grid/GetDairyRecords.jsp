<%-- 
    Document   : GetDairyRecords
    Created on : 15.06.2011, 13:05:16
    Author     : kxxb
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



        /*

                     UserId: gUserId
                    ,UserDepId: gUserDepId
                    ,UserGroupId: gUserGroupId
        */
        String v_sql_Users =  "      Select * from (                                            "+
                        "      select t.id,                                               "+
                        "             t.user_id,                                          "+
                        "             t.daily_plan,                                       "+
                        "             t.comm,                                             "+
                        "             To_Char(t.rec_date, 'dd.mm.yyyy hh24:mi') as  rec_date,     "+
                        "             u.name as user_name,                                "+
                        "             d.name as dep_name,                                 "+
                        "             Count(t.Id) Over() As c,                            "+
                        "             Row_Number() Over(Order By t.id Desc) As r          "+
                        "       from                                                      "+
                        "        tl_dairy_records t,                                      "+
                        "        tl_users u,                                              "+
                        "        tl_departments d                                         "+
                        "      where u.user_id = t.user_id                                "+
                        "      and  t.user_id = ?                                "+
                        "      and d.id = u.tl_departmenst_id )                           "+
                        "               Where r Between                                   "+
                        "               ?     And  ?                                      ";
        String v_sql_Chief =  "      Select * from (                                            "+
                        "      select t.id,                                               "+
                        "             t.user_id,                                          "+
                        "             t.daily_plan,                                       "+
                        "             t.comm,                                             "+
                        "             To_Char(t.rec_date, 'dd.mm.yyyy hh24:mi') as  rec_date,     "+
                        "             u.name as user_name,                                "+
                        "             d.name as dep_name,                                 "+
                        "             Count(t.Id) Over() As c,                            "+
                        "             Row_Number() Over(Order By t.id Desc) As r          "+
                        "       from                                                      "+
                        "        tl_dairy_records t,                                      "+
                        "        tl_users u,                                              "+
                        "        tl_departments d                                         "+
                        "      where u.user_id = t.user_id                                "+
                        "      and u.tl_departmenst_id = ?                               "+
                        "      and d.id = u.tl_departmenst_id )                           "+
                        "               Where r Between                                   "+
                        "               ?     And  ?                                      ";




        try{
         conn = db_conn.GetConnect();

            String v_count = "";
            conn = db_conn.GetConnect();
               String dbName = "jdbc/OraDev";

         String v_limit = request.getParameter("limit");
         String v_start = request.getParameter("start");
/*2 4 users
  1 3 5 chief*/




         /*pager*/


            v_start = Lela_util.nvl(v_start,"1");
            if (v_start.equals("0")) { v_start ="1";}
            int v_end = Integer.parseInt(v_start) + Integer.parseInt(Lela_util.nvl(v_limit,"20"));
        /*end pager*/


            request.setCharacterEncoding("Cp1251");
            if (request.getParameter("UserGroupId").equals("2") || request.getParameter("UserGroupId").equals("4")) {
                cs = conn.prepareCall(v_sql_Users);
                cs.setString(1, request.getParameter("UserId"));
                cs.setString(2, v_start);
                cs.setInt(3, v_end);
                
            }
         if (request.getParameter("UserGroupId").equals("1") || request.getParameter("UserGroupId").equals("3")|| request.getParameter("UserGroupId").equals("5")) {
                cs = conn.prepareCall(v_sql_Chief);
                cs.setString(1, request.getParameter("UserDepId"));
                cs.setString(2, v_start);
                cs.setInt(3, v_end);
                
            }

              
             
             cs.execute();
             rs = cs.getResultSet();

             JSONObject store = new JSONObject();
             JSONArray json_a = new JSONArray();




        while (rs.next()){
           JSONObject obj = new JSONObject();
           obj.put("id", Lela_util.nvl(rs.getString(1), "пусто"));
           obj.put("user_id", Lela_util.nvl(rs.getString(2), "пусто"));
           obj.put("daily_plan", Lela_util.nvl(rs.getString(3), "пусто"));
           obj.put("comm", Lela_util.nvl(rs.getString(4), "пусто"));
           obj.put("rec_date", Lela_util.nvl(rs.getString(5), "пусто"));
           obj.put("user_name", Lela_util.nvl(rs.getString(6), "пусто"));
           obj.put("dep_name", Lela_util.nvl(rs.getString(7), "пусто"));
           
           json_a.add(obj);

        }

                //store.put("totalCount", v_count);
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
