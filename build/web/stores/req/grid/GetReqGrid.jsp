<%-- 
    Document   : GetReqGrid
    Created on : 26.08.2010, 15:15:01
    Author     : shavrak.ka
--%>
<%@page import="javax.sql.DataSource"%>
<%@page import="javax.naming.InitialContext"%>
<%@ page import="java.sql.Types,
         
         net.sf.json.*,  java.sql.*"
contentType="text/html;charset=windows-1251"  %>
<jsp:useBean id="db_conn" class="Leela.db.Conn" scope="session" />
<jsp:useBean id="Lela_util" class="Leela.core.Util" scope="session" />

<%
        String v_result ="";
        Connection conn = null;
        ResultSet rs = null;
        CallableStatement cs = null;
        String v_sql = "";
        String v_filter_params = "";
        String v_sql_end  = " ";
        String v_sql_allRequests = " /*за€вки в мой отдел*/ "+
                       " Select * from  "+
                       " (select "+
                       "        t.id, "+
                       "        t.request, "+
                       "        t.applicant_id, "+
                       "        au.name as apl_user_name, "+
                       "        ad.name as apl_dep, "+
                       "        ru.name as resp_user_name, "+
                       "        rd.name as resp_dep, "+
                       "        t.responsibly_department_id, "+
                       "        Nvl(To_Char(t.dt_create , 'dd/mm/yyyy hh24:mi'), '01/01/1999') As dt_create, "+
                       "        Nvl(To_Char(t.dt_execute, 'dd/mm/yyyy'), '01/01/1999') As dt_execute, "+
                       "        t.Status, " +
                       "        rs.name Status_Name,    "+
                       "        t.Tl_Contract_Template_Id, "+
                       "        Nvl(t.Contract_Number, 'пусто') As Contract_Number, "+
                       "        Nvl(To_Char(t.Contract_Date, 'dd/mm/yyyy'), '01/01/1999') As Contract_Date, "+
                       "        Nvl(To_Char(t.Contacrt_Return_Date, 'dd/mm/yyyy'), '01/01/1999') As Contacrt_Return_Date, "+
                       "        o.Name || ' (' || Nvl(o.Object_Addres, 'нет адреса') || ')' As Obj, "+
                       "        c.Client_Name || ' (' || Nvl(c.Addres, 'нет адреса') || ')' As Client, "+
                       "        Nvl(c.Email, 'нет') As Cl_Email, "+
                       "        Nvl(t.Cost_Of_Service, 'нет') As Cost_Of_Service, "+
                       "        Nvl(t.Contragent, 'нет') As Contragent, "+
                       "        Count(t.Id) Over() As c, "+
                       "        Row_Number() Over(Order By t.id Desc) As r, "+
                       "        nvl(ctpl.template_name, 'нет') As CONTR," +
                       "        t.responsibly_id,       "+
                       "        t.request_control,  "+
                       "        au.email as apl_user_email,  "+
                       "        au.tel_cellular as apl_user_cellular,  "+
                       "        au.tel_internal as apl_user_internal,  "+
                       "        au.work_position as apl_user_work_position "+
                       "   from tl_request           t, "+
                       "        tl_users             au, "+
                       "        tl_departments       ad, "+
                       "        tl_users             ru, "+
                       "        tl_departments       rd, "+
                       "        Tl_Objects           o, "+
                       "        Tl_Clients           c, "+
                       "        tl_s_req_status      rs, "+
                       "        tl_contract_template ctpl "+
                       "  where t.responsibly_department_id = tl_sys_users.get_depid(?) "+
                       "    and t.applicant_id = au.user_id "+
                       "    and au.tl_departmenst_id = ad.id "+
                       "    and t.responsibly_id = ru.user_id "+
                       "    and ru.tl_departmenst_id = rd.id "+
                       "    And t.Tl_Object_Id = o.Id(+) "+
                       "    And t.Tl_Client_Id = c.Id(+) "+
                       "    And t.status = rs.id(+) "+
                       "    And t.tl_contract_template_id = ctpl.id(+)) "+
                       "    Where r Between  "+
                       "      ?     And  ? ";
                       

        String v_sql_allDepRequests = " /*«а€вки всех отделов(дл€  административного отдела)*/ "+
                       " Select * from  "+
                       " (select "+
                       "        t.id, "+
                       "        t.request, "+
                       "        t.applicant_id, "+
                       "        au.name as apl_user_name, "+
                       "        ad.name as apl_dep, "+
                       "        ru.name as resp_user_name, "+
                       "        rd.name as resp_dep, "+
                       "        t.responsibly_department_id, "+
                       "        Nvl(To_Char(t.dt_create , 'dd/mm/yyyy hh24:mi'), '01/01/1999') As dt_create, "+
                       "        Nvl(To_Char(t.dt_execute, 'dd/mm/yyyy'), '01/01/1999') As dt_execute, "+
                       "        t.Status, " +
                       "        rs.name Status_Name,    "+
                       "        t.Tl_Contract_Template_Id, "+
                       "        Nvl(t.Contract_Number, 'пусто') As Contract_Number, "+
                       "        Nvl(To_Char(t.Contract_Date, 'dd/mm/yyyy'), '01/01/1999') As Contract_Date, "+
                       "        Nvl(To_Char(t.Contacrt_Return_Date, 'dd/mm/yyyy'), '01/01/1999') As Contacrt_Return_Date, "+
                       "        o.Name || ' (' || Nvl(o.Object_Addres, 'нет адреса') || ')' As Obj, "+
                       "        c.Client_Name || ' (' || Nvl(c.Addres, 'нет адреса') || ')' As Client, "+
                       "        Nvl(c.Email, 'нет') As Cl_Email, "+
                       "        Nvl(t.Cost_Of_Service, 'нет') As Cost_Of_Service, "+
                       "        Nvl(t.Contragent, 'нет') As Contragent, "+
                       "        Count(t.Id) Over() As c, "+
                       "        Row_Number() Over(Order By t.id Desc) As r, "+
                       "        nvl(ctpl.template_name, 'нет') As CONTR," +
                       "        t.responsibly_id,       "+
                       "        t.request_control,  "+
                       "        au.email as apl_user_email,  "+
                       "        au.tel_cellular as apl_user_cellular,  "+
                       "        au.tel_internal as apl_user_internal,  "+
                       "        au.work_position as apl_user_work_position "+
                       "   from tl_request           t, "+
                       "        tl_users             au, "+
                       "        tl_departments       ad, "+
                       "        tl_users             ru, "+
                       "        tl_departments       rd, "+
                       "        Tl_Objects           o, "+
                       "        Tl_Clients           c, "+
                       "        tl_s_req_status      rs, "+
                       "        tl_contract_template ctpl "+
                       "  where  "+
                       "     t.applicant_id = au.user_id "+
                       "    and au.tl_departmenst_id = ad.id "+
                       "    and t.responsibly_id = ru.user_id "+
                       "    and rd.id = t.responsibly_department_id"+
                       "    And t.Tl_Object_Id = o.Id(+) "+
                       "    And t.Tl_Client_Id = c.Id(+) "+
                       "    And t.status = rs.id(+) "+
                       "    And t.tl_contract_template_id = ctpl.id(+)) "+
                       "    Where r Between  "+
                       "      ?     And  ? ";

      String v_sql_RequestsControl = " /*«а€вки на контроле (дл€  административного отдела)*/ "+
                       " Select * from  "+
                       " (select "+
                       "        t.id, "+
                       "        t.request, "+
                       "        t.applicant_id, "+
                       "        au.name as apl_user_name, "+
                       "        ad.name as apl_dep, "+
                       "        ru.name as resp_user_name, "+
                       "        rd.name as resp_dep, "+
                       "        t.responsibly_department_id, "+
                       "        Nvl(To_Char(t.dt_create , 'dd/mm/yyyy hh24:mi'), '01/01/1999') As dt_create, "+
                       "        Nvl(To_Char(t.dt_execute, 'dd/mm/yyyy'), '01/01/1999') As dt_execute, "+
                       "        t.Status, " +
                       "        rs.name Status_Name,    "+
                       "        t.Tl_Contract_Template_Id, "+
                       "        Nvl(t.Contract_Number, 'пусто') As Contract_Number, "+
                       "        Nvl(To_Char(t.Contract_Date, 'dd/mm/yyyy'), '01/01/1999') As Contract_Date, "+
                       "        Nvl(To_Char(t.Contacrt_Return_Date, 'dd/mm/yyyy'), '01/01/1999') As Contacrt_Return_Date, "+
                       "        o.Name || ' (' || Nvl(o.Object_Addres, 'нет адреса') || ')' As Obj, "+
                       "        c.Client_Name || ' (' || Nvl(c.Addres, 'нет адреса') || ')' As Client, "+
                       "        Nvl(c.Email, 'нет') As Cl_Email, "+
                       "        Nvl(t.Cost_Of_Service, 'нет') As Cost_Of_Service, "+
                       "        Nvl(t.Contragent, 'нет') As Contragent, "+
                       "        Count(t.Id) Over() As c, "+
                       "        Row_Number() Over(Order By t.id Desc) As r, "+
                       "        nvl(ctpl.template_name, 'нет') As CONTR," +
                       "        t.responsibly_id,       "+
                       "        t.request_control,  "+
                       "        au.email as apl_user_email,  "+
                       "        au.tel_cellular as apl_user_cellular,  "+
                       "        au.tel_internal as apl_user_internal,  "+
                       "        au.work_position as apl_user_work_position "+
                       "   from tl_request           t, "+
                       "        tl_users             au, "+
                       "        tl_departments       ad, "+
                       "        tl_users             ru, "+
                       "        tl_departments       rd, "+
                       "        Tl_Objects           o, "+
                       "        Tl_Clients           c, "+
                       "        tl_s_req_status      rs, "+
                       "        tl_contract_template ctpl "+
                       "  where  "+
                       "     t.applicant_id = au.user_id "+
                       "    and au.tl_departmenst_id = ad.id "+
                       "    and t.responsibly_id = ru.user_id "+
                       "    and rd.id = t.responsibly_department_id"+
                       "    And t.Tl_Object_Id = o.Id(+) "+
                       "    And t.Tl_Client_Id = c.Id(+) "+
                       "    And t.status = rs.id(+)" +
                       "    and t.request_control = 'да' "+
                       "    And t.tl_contract_template_id = ctpl.id(+)) "+
                       "    Where r Between  "+
                       "      ?     And  ? ";


        
       String v_sql_MyRequests =  " /*мои за€вки*/ "+
                       " Select * from  "+
                       " (select "+
                       "        t.id, "+
                       "        t.request, "+
                       "        t.applicant_id, "+
                       "        au.name as apl_user_name, "+
                       "        ad.name as apl_dep, "+
                       "        ru.name as resp_user_name, "+
                       "        rd.name as resp_dep, "+
                       "        t.responsibly_department_id, "+
                       "        Nvl(To_Char(t.dt_create , 'dd/mm/yyyy hh24:mi'), '01/01/1999') As dt_create, "+
                       "        Nvl(To_Char(t.dt_execute, 'dd/mm/yyyy'), '01/01/1999') As dt_execute, "+
                       "        t.Status, " +
                       "        rs.name Status_Name,    "+
                       "        t.Tl_Contract_Template_Id, "+
                       "        Nvl(t.Contract_Number, 'пусто') As Contract_Number, "+
                       "        Nvl(To_Char(t.Contract_Date, 'dd/mm/yyyy'), '01/01/1999') As Contract_Date, "+
                       "        Nvl(To_Char(t.Contacrt_Return_Date, 'dd/mm/yyyy'), '01/01/1999') As Contacrt_Return_Date, "+
                       "        o.Name || ' (' || Nvl(o.Object_Addres, 'нет адреса') || ')' As Obj, "+
                       "        c.Client_Name || ' (' || Nvl(c.Addres, 'нет адреса') || ')' As Client, "+
                       "        Nvl(c.Email, 'нет') As Cl_Email, "+
                       "        Nvl(t.Cost_Of_Service, 'нет') As Cost_Of_Service, "+
                       "        Nvl(t.Contragent, 'нет') As Contragent, "+
                       "        Count(t.Id) Over() As c, "+
                       "        Row_Number() Over(Order By Dt_Create Desc) As r, "+
                       "        nvl(ctpl.template_name, 'нет') As CONTR," +
                       "        t.responsibly_id," +
                       "        nvl(t.request_control, 'нет') as request_control,  "+
                       "        au.email as apl_user_email,  "+
                       "        au.tel_cellular as apl_user_cellular,  "+
                       "        au.tel_internal as apl_user_internal,  "+
                       "        au.work_position as apl_user_work_position "+
                       "   from tl_request           t, "+
                       "        tl_users             au, "+
                       "        tl_departments       ad, "+
                       "        tl_users             ru, "+
                       "        tl_departments       rd, "+
                       "        Tl_Objects           o, "+
                       "        Tl_Clients           c, "+
                       "        tl_s_req_status      rs, "+
                       "        tl_contract_template ctpl "+
                       "  where t.applicant_id = ? "+
                       "    and t.applicant_id = au.user_id "+
                       "    and au.tl_departmenst_id = ad.id "+
                       "    and t.responsibly_id = ru.user_id "+
                       "    and T.responsibly_department_id =?"+
                       "    and rd.id = t.responsibly_department_id"+
                       "    And t.Tl_Object_Id = o.Id(+) "+
                       "    And t.Tl_Client_Id = c.Id(+) "+
                       "    And t.status = rs.id(+) "+
                       "    And t.tl_contract_template_id = ctpl.id(+)) "+
                       "    Where r Between  "+
                       "      ?     And  ? ";

 String v_sql_ForMeRequests =  " /*мои за€вки*/ "+
                       " Select * from  "+
                       " (select "+
                       "        t.id, "+
                       "        t.request, "+
                       "        t.applicant_id, "+
                       "        au.name as apl_user_name, "+
                       "        ad.name as apl_dep, "+
                       "        ru.name as resp_user_name, "+
                       "        rd.name as resp_dep, "+
                       "        t.responsibly_department_id, "+
                       "        Nvl(To_Char(t.dt_create , 'dd/mm/yyyy hh24:mi'), '01/01/1999') As dt_create, "+
                       "        Nvl(To_Char(t.dt_execute, 'dd/mm/yyyy'), '01/01/1999') As dt_execute, "+
                       "        t.Status, " +
                       "        rs.name Status_Name,    "+
                       "        t.Tl_Contract_Template_Id, "+
                       "        Nvl(t.Contract_Number, 'пусто') As Contract_Number, "+
                       "        Nvl(To_Char(t.Contract_Date, 'dd/mm/yyyy'), '01/01/1999') As Contract_Date, "+
                       "        Nvl(To_Char(t.Contacrt_Return_Date, 'dd/mm/yyyy'), '01/01/1999') As Contacrt_Return_Date, "+
                       "        o.Name || ' (' || Nvl(o.Object_Addres, 'нет адреса') || ')' As Obj, "+
                       "        c.Client_Name || ' (' || Nvl(c.Addres, 'нет адреса') || ')' As Client, "+
                       "        Nvl(c.Email, 'нет') As Cl_Email, "+
                       "        Nvl(t.Cost_Of_Service, 'нет') As Cost_Of_Service, "+
                       "        Nvl(t.Contragent, 'нет') As Contragent, "+
                       "        Count(t.Id) Over() As c, "+
                       "        Row_Number() Over(Order By Dt_Create Desc) As r, "+
                       "        nvl(ctpl.template_name, 'нет') As CONTR," +
                       "        t.responsibly_id,       "+
                       "        nvl(t.request_control, 'нет') as request_control,  "+
                       "        au.email as apl_user_email,  "+
                       "        au.tel_cellular as apl_user_cellular,  "+
                       "        au.tel_internal as apl_user_internal,  "+
                       "        au.work_position as apl_user_work_position "+
                       "   from tl_request           t, "+
                       "        tl_users             au, "+
                       "        tl_departments       ad, "+
                       "        tl_users             ru, "+
                       "        tl_departments       rd, "+
                       "        Tl_Objects           o, "+
                       "        Tl_Clients           c, "+
                       "        tl_s_req_status      rs, "+
                       "        tl_contract_template ctpl "+
                       "  where t.responsibly_id = ? "+
                       "    and t.applicant_id = au.user_id "+
                       "    and au.tl_departmenst_id = ad.id "+
                       "    and t.responsibly_id = ru.user_id "+
                       "    and ru.tl_departmenst_id = rd.id "+
                       "    And t.Tl_Object_Id = o.Id(+) "+
                       "    And t.Tl_Client_Id = c.Id(+) "+
                       "    And t.status = rs.id(+) "+
                       "    And t.tl_contract_template_id = ctpl.id(+)) "+
                       "    Where r Between  "+
                       "      ?     And  ? ";



       String v_sql_allDepRequests_Secr = " /*«а€вки всего  отдела(дл€ секритар€ и начальника отдела*/ "+
                       " Select * from  "+
                       " (select "+
                       "        t.id, "+
                       "        t.request, "+
                       "        t.applicant_id, "+
                       "        au.name as apl_user_name, "+
                       "        ad.name as apl_dep, "+
                       "        ru.name as resp_user_name, "+
                       "        rd.name as resp_dep, "+
                       "        t.responsibly_department_id, "+
                       "        Nvl(To_Char(t.dt_create , 'dd/mm/yyyy hh24:mi'), '01/01/1999') As dt_create, "+
                       "        Nvl(To_Char(t.dt_execute, 'dd/mm/yyyy'), '01/01/1999') As dt_execute, "+
                       "        t.Status, " +
                       "        rs.name Status_Name,    "+
                       "        t.Tl_Contract_Template_Id, "+
                       "        Nvl(t.Contract_Number, 'пусто') As Contract_Number, "+
                       "        Nvl(To_Char(t.Contract_Date, 'dd/mm/yyyy'), '01/01/1999') As Contract_Date, "+
                       "        Nvl(To_Char(t.Contacrt_Return_Date, 'dd/mm/yyyy'), '01/01/1999') As Contacrt_Return_Date, "+
                       "        o.Name || ' (' || Nvl(o.Object_Addres, 'нет адреса') || ')' As Obj, "+
                       "        c.Client_Name || ' (' || Nvl(c.Addres, 'нет адреса') || ')' As Client, "+
                       "        Nvl(c.Email, 'нет') As Cl_Email, "+
                       "        Nvl(t.Cost_Of_Service, 'нет') As Cost_Of_Service, "+
                       "        Nvl(t.Contragent, 'нет') As Contragent, "+
                       "        Count(t.Id) Over() As c, "+
                       "        Row_Number() Over(Order By t.id Desc) As r, "+
                       "        nvl(ctpl.template_name, 'нет') As CONTR,"+
                       "        t.responsibly_id,       "+
                       "        t.request_control,  "+
                       "        au.email as apl_user_email,  "+
                       "        au.tel_cellular as apl_user_cellular,  "+
                       "        au.tel_internal as apl_user_internal,  "+
                       "        au.work_position as apl_user_work_position "+
                       "   from tl_request           t, "+
                       "        tl_users             au, "+
                       "        tl_departments       ad, "+
                       "        tl_users             ru, "+
                       "        tl_departments       rd, "+
                       "        Tl_Objects           o, "+
                       "        Tl_Clients           c, "+
                       "        tl_s_req_status      rs, "+
                       "        tl_contract_template ctpl "+
                       "  where  "+
                       "     t.applicant_id = au.user_id "+
                       "    and au.tl_departmenst_id = ad.id "+
                       "    and t.responsibly_id = ru.user_id "+
                       "    and rd.id = t.responsibly_department_id"+
                       "    And t.Tl_Object_Id = o.Id(+) "+
                       "    And t.Tl_Client_Id = c.Id(+) "+
                       "    And t.status = rs.id(+) "+
                       "  And  T.Applicant_Id In (  "+
                       "     Select Z.User_Id  From Tl_Users Z "+
                       "      Where Z.Tl_Departmenst_Id = ?  "+
                       "      )  "+
                       "    And t.tl_contract_template_id = ctpl.id(+)) "+
                       "    Where r Between  "+
                       "      ?     And  ? ";



        try{
           conn = db_conn.GetConnect();
               String dbName = "jdbc/OraDev";
/*
              InitialContext ic = new InitialContext();
              DataSource ds = (DataSource) ic.lookup(dbName);
              conn = ds.getConnection();
*/
         String v_count = "";
         String v_limit = request.getParameter("limit");
         String v_start = request.getParameter("start");

    if (request.getParameter("limit")==null) {
         if (!request.getParameter("reqNum").equals("")  ){
             v_filter_params = v_filter_params + " and id in ("
                     + request.getParameter("reqNum") +") ";
         }



         if (!request.getParameter("CreateDtStart").equals("") & !request.getParameter("CreateDtFinish").equals("")
                 //request.getParameter("CreateDtStart")!=null & request.getParameter("CreateDtFinish")!=null
                  ){
             v_filter_params = v_filter_params + " and dt_create between to_date(substr('"
                     + request.getParameter("CreateDtStart") +"',1,10),  'yyyy-mm-dd') and to_date(substr('"+request.getParameter("CreateDtFinish")+"',1,10),  'yyyy-mm-dd')";
         }

         if (//request.getParameter("DoneDtStart")!=null & request.getParameter("DoneDtFinish")!=null
                   !request.getParameter("DoneDtStart").equals("") & !request.getParameter("DoneDtFinish").equals("") ){
             v_filter_params = v_filter_params + " and dt_execute between to_date(substr('"
                     + request.getParameter("DoneDtStart") +"',1,10),   'yyyy-mm-dd') and to_date(substr('"+request.getParameter("DoneDtFinish")+"',1,10),   'yyyy-mm-dd')";
         }




      if ( !request.getParameter("Aplicant").equals("")){
             v_filter_params = v_filter_params + " and applicant_id = '"
                     + request.getParameter("Aplicant") +"' ";
         }
          if ( !request.getParameter("AplicantDep").equals("")){
             v_filter_params = v_filter_params + " and apl_dep = '"
                     + request.getParameter("AplicantDep") +"' ";
         }
         if (!request.getParameter("Request").equals("")){
             v_filter_params = v_filter_params + " and request like  ('%"
                     + request.getParameter("Request") +"%') ";
         }

         if (!request.getParameter("obj").equals("")){
             v_filter_params = v_filter_params + " and Obj like  '%"
                     + request.getParameter("obj") +"%' ";
         }
          if (!request.getParameter("client").equals("") ){
             v_filter_params = v_filter_params + " and Client like  '%"
                     + request.getParameter("client") +"%' ";
         }
         if ( !request.getParameter("Resp").equals("")){
             v_filter_params = v_filter_params + " and responsibly_id = '"
                     + request.getParameter("Resp") +"' ";
         }
         if ( !request.getParameter("contragent").equals("")){
             v_filter_params = v_filter_params + " and Contragent = '"
                     + request.getParameter("contragent") +"' ";
         }




    }

         if (request.getParameter("mode").equals("AllRequests")){
           
           v_sql = v_sql_allRequests +" "+ v_filter_params +" "+  v_sql_end;
         } else if (request.getParameter("mode").equals("MyRequests")){

           v_sql = v_sql_MyRequests +" "+ v_filter_params +" "+  v_sql_end;;
         }else if (request.getParameter("mode").equals("ForMeRequests")){
           v_sql = v_sql_ForMeRequests +" "+ v_filter_params +" "+  v_sql_end;;
         } else if (request.getParameter("mode").equals("AllDepRequests")){
           v_sql = v_sql_allDepRequests +" "+ v_filter_params +" "+  v_sql_end;
         } else if (request.getParameter("mode").equals("RequestsControl")){
           v_sql = v_sql_RequestsControl +" "+ v_filter_params +" "+  v_sql_end;
         }else if (request.getParameter("mode").equals("allDepRequests_Secr")){
           v_sql = v_sql_allDepRequests_Secr +" "+ v_filter_params +" "+  v_sql_end;
         }
/* */

         /*pager*/
         
         
            v_start = Lela_util.nvl(v_start,"1");
            if (v_start.equals("0")) { v_start ="1";}
            int v_end = Integer.parseInt(v_start) + Integer.parseInt(Lela_util.nvl(v_limit,"20"));
        /*end pager*/
            
             request.setCharacterEncoding("Cp1251");

             cs =  conn.prepareCall(v_sql);
             if (request.getParameter("mode").equals("AllDepRequests")) {
                 cs.setString(1, v_start);
                 cs.setInt(2, v_end);
             } else if (request.getParameter("mode").equals("RequestsControl")) {
                 cs.setString(1, v_start);
                 cs.setInt(2, v_end);
             } else if (request.getParameter("mode").equals("MyRequests")){
                 cs.setString(1,  request.getParameter("user_id")); //113 »ль€
                 cs.setString(2,  request.getParameter("dep_id")); 
               cs.setString(3, v_start);
               cs.setInt(4, v_end);
             } else if (request.getParameter("mode").equals("allDepRequests_Secr")){

               cs.setString(1,  request.getParameter("dep_id"));
               cs.setString(2, v_start);
               cs.setInt(3, v_end);
             } else {
//               cs.setInt(1,  Lela_core.get_users_by_ip(conn, request.getRemoteAddr()));
                 cs.setString(1,  request.getParameter("user_id")); //113 »ль€
               cs.setString(2, v_start);
               cs.setInt(3, v_end);
             }
             cs.execute();
             rs = cs.getResultSet();

             JSONObject store = new JSONObject();
             JSONArray json_a = new JSONArray();


        while (rs.next()){
           JSONObject obj = new JSONObject();
           obj.put("reqid", Lela_util.nvl(rs.getString(1), "пусто"));
           obj.put("request_text", Lela_util.nvl(rs.getString(2), "пусто"));
           obj.put("applicant_id", Lela_util.nvl(rs.getString(3), "пусто"));
           obj.put("apl_user_name", Lela_util.nvl(rs.getString(4), "пусто"));
           obj.put("apl_dep", Lela_util.nvl(rs.getString(5), "пусто"));
           obj.put("resp_user_name", Lela_util.nvl(rs.getString(6), "пусто"));
           obj.put("resp_dep", Lela_util.nvl(rs.getString(7), "пусто"));
           obj.put("responsibly_department_id", Lela_util.nvl(rs.getString(8), "пусто"));
           obj.put("dt_create", Lela_util.nvl(rs.getString(9), "пусто"));
           obj.put("dt_execute", Lela_util.nvl(rs.getString(10), "пусто"));
           obj.put("Status", Lela_util.nvl(rs.getString(11), "пусто"));
           obj.put("Status_Name", Lela_util.nvl(rs.getString(12), "пусто"));
           obj.put("Tl_Contract_Template_Id", Lela_util.nvl(rs.getString(13), "пусто"));
           obj.put("Contract_Number", Lela_util.nvl(rs.getString(14), "пусто"));
           obj.put("Contract_Date", Lela_util.nvl(rs.getString(15), "пусто"));
           obj.put("Contacrt_Return_Date", Lela_util.nvl(rs.getString(16), "пусто"));
           obj.put("Obj", Lela_util.nvl(rs.getString(17), "пусто"));
           obj.put("Client", Lela_util.nvl(rs.getString(18), "пусто"));
           obj.put("Cl_Email", Lela_util.nvl(rs.getString(19), "пусто"));
           obj.put("Cost_Of_Service", Lela_util.nvl(rs.getString(20), "пусто"));
           obj.put("Contragent", Lela_util.nvl(rs.getString(21), "пусто"));
           obj.put("CONTR", Lela_util.nvl(rs.getString(24), "пусто"));
           obj.put("responsibly_id", Lela_util.nvl(rs.getString(25), "пусто"));
           obj.put("request_control", Lela_util.nvl(rs.getString(26), "пусто"));

           obj.put("apl_user_email", Lela_util.nvl(rs.getString(27), "пусто"));
           obj.put("apl_user_cellular", Lela_util.nvl(rs.getString(28), "пусто"));
           obj.put("apl_user_internal", Lela_util.nvl(rs.getString(29), "пусто"));
           obj.put("apl_user_work_position", Lela_util.nvl(rs.getString(30), "пусто"));

           v_count = rs.getString(22);
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
