<%-- 
    Document   : GetUsers
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
        String v_sql =  "                        select t.user_id,                "+
                        "                               t.login,                  "+
                        "                               t.pass,                      "+
                        "                               t.name,                         "+
                        "                               case                               "+
                        "                                 when t.status = 1 then              "+
                        "                                  '��������'                            "+
                        "                                 else                                      "+
                        "                                  '������'                                    "+
                        "                               end as St,                                        "+
                        "                               ur.rank_name,                                        "+
                        "                               nvl(t.email, '�� ��������') as email,                  "+
                        "                               nvl(t.tel_internal, '�� ���������') as tel_internal,       "+
                        "                               nvl(t.tel_cellular, '�� ���������') as tel_cellular,       "+
                        "                               nvl(to_char(t.birth_date, 'dd.mm.yyyy'),                   "+
                        "                                   '���� �� ����������') as birth_date,                   "+
                        "                               nvl(to_char(t.date_work_from, 'dd.mm.yyyy'),               "+
                        "                                   '���� �� ����������') as date_work_from,               "+
                        "                               t.tl_users_rank_id,                                         "+
                        "                               t.status,                          "+
                        "                               t.work_position,                      "+
                        "                         t.tl_departmenst_id,  "+
                        "                          ug.groupid, "+
                        "                           ui.user_local_ip    "+
                        "                          from tl_users t, tl_users_rank ur, tl_users_groups ug, tl_users_ip ui                              "+
                        "                         where t.tl_departmenst_id = ?                                    "+
                        "                           and t.tl_users_rank_id = ur.id(+)                       "+
                        "                           and t.user_id = ug.userid(+)           "+
                        "                           and t.user_id = ui.user_id(+)           "+
                        "                         order by t.tl_users_rank_id               ";


        try{
         conn = db_conn.GetConnect();
            String v_count = "";
            request.setCharacterEncoding("Cp1251");
            cs = conn.prepareCall(v_sql);
            cs.setString(1, request.getParameter("dep_id"));
              
             
             cs.execute();
             rs = cs.getResultSet();

             JSONObject store = new JSONObject();
             JSONArray json_a = new JSONArray();




        while (rs.next()){
           JSONObject obj = new JSONObject();
           obj.put("user_id", Lela_util.nvl(rs.getString(1), "�����"));
           obj.put("login", Lela_util.nvl(rs.getString(2), "�����"));
           obj.put("pass", Lela_util.nvl(rs.getString(3), "�����"));
           obj.put("name", Lela_util.nvl(rs.getString(4), "�����"));
           obj.put("St", Lela_util.nvl(rs.getString(5), "�����"));
           obj.put("rank_name", Lela_util.nvl(rs.getString(6), "�����"));
           obj.put("email", Lela_util.nvl(rs.getString(7), "�����"));
           obj.put("tel_internal", Lela_util.nvl(rs.getString(8), "�����"));
           obj.put("tel_cellular", Lela_util.nvl(rs.getString(9), "�����"));
           obj.put("birth_date", Lela_util.nvl(rs.getString(10), "�����"));
           obj.put("date_work_from", Lela_util.nvl(rs.getString(11), "�����"));
           obj.put("tl_users_rank_id", Lela_util.nvl(rs.getString(12), "�����"));
           obj.put("status", Lela_util.nvl(rs.getString(13), "�����"));
           obj.put("work_position", Lela_util.nvl(rs.getString(14), "�����"));
           obj.put("tl_departmenst_id", Lela_util.nvl(rs.getString(15), "�����"));
           obj.put("groupid", Lela_util.nvl(rs.getString(16), "�����"));
           obj.put("user_local_ip", Lela_util.nvl(rs.getString(17), "�����"));

           
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
