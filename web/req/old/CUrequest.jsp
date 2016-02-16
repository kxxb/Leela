<%@ page import="java.sql.Types, oracle.jdbc.OracleConnection, oracle.jdbc.OracleResultSet, java.sql.*, oracle.jdbc.OracleCallableStatement"   contentType="text/html;charset=utf-8"  %>
<jsp:useBean id="db_conn" class="Leela.db.Conn" scope="session" />
<jsp:useBean id="Lela_core" class="Leela.core.user_managment" scope="session" />
<%
        String v_result ="";
        OracleConnection conn = null;
        conn = db_conn.GetConnect();
        int g_user_id = Lela_core.get_users_by_ip(conn, request.getRemoteAddr());
        OracleCallableStatement stmt = null;
        
        
         request.setCharacterEncoding("utf-8");
         stmt = (OracleCallableStatement) conn.prepareCall(
            "Begin ? := tl_ExtCoreRq.CURequest(:reqid, :responsibly_id, :dt_execute,:status_name,:contract_number,:contract_date,:contacrt_return_date, :Contragent, :request_contol, :p_user_id); End;"
          );

          stmt.registerOutParameter(1, Types.INTEGER);  // o_Result
          stmt.setStringAtName("reqid", request.getParameter("reqid"));
          //stmt.setStringAtName("responsibly", request.getParameter("responsibly"));
          stmt.setStringAtName("responsibly_id", request.getParameter("responsibly_id"));
          stmt.setStringAtName("dt_execute", request.getParameter("dt_execute"));
          ///stmt.setStringAtName("status", request.getParameter("status"));
          stmt.setStringAtName("status_name", request.getParameter("Status_Name"));
          stmt.setStringAtName("contract_number", request.getParameter("contract_number"));
          stmt.setStringAtName("contract_date", request.getParameter("contract_date"));
          stmt.setStringAtName("contacrt_return_date", request.getParameter("contacrt_return_date"));
          stmt.setStringAtName("Contragent", request.getParameter("Contragent"));
          stmt.setStringAtName("request_contol", request.getParameter("request_control"));
          stmt.setIntAtName("p_user_id", g_user_id);

          stmt.execute();
          int res = stmt.getInt(1);

         //out.println("<xml version='1.0' encoding='utf-8'>"); windows-1251
         out.println(res);



        %>
