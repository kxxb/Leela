<%-- 
    Document   : DairyRec_save
    Created on : 22.06.2011, 12:18:57
    Author     : kxxb
--%>

<%@ page import="java.sql.Types,
oracle.jdbc.OracleResultSet,
java.sql.*,
Leela.core.Util
"
contentType="text/html;charset=utf-8"

%>

<jsp:useBean id="db_conn" class="Leela.db.Conn" scope="session" />
<jsp:useBean id="Lela_core" class="Leela.core.user_managment" scope="session" />
    <%

    //contentType="text/html;charset=Windows-1251"   contentType="text/html;charset=utf-8"
    Connection conn = null;
    CallableStatement stmt = null;
    CallableStatement menu_stmt = null;
    CallableStatement stmt_acces = null;
    ResultSet menu_rs = null;
    String s_error_text ="";

    String v_user_id;

    String v_deal_id ="";
    String v_addres ="";
    String v_dep ="";
    String v_BrSobstv ="";
    String v_BrClient ="";
    String v_Deal ="";
    String v_Is_Close = "";
    String v_edit_fag ="";

    request.setCharacterEncoding("utf-8");


/*
         (p_ID                 TL_DAIRY_RECORDS.ID%type,
                                     p_USER_ID            TL_DAIRY_RECORDS.USER_ID%type,
                                     p_WRITE_USER_ID      TL_DAIRY_RECORDS.WRITE_USER_ID%type,
                                     p_DAILY_PLAN         TL_DAIRY_RECORDS.DAILY_PLAN%type,
                                     p_OBJECT_DESC        TL_DAIRY_RECORDS.OBJECT_DESC%type,
                                     p_CLIENT_DESC        TL_DAIRY_RECORDS.CLIENT_DESC%type,
                                     p_CONVERSATION       TL_DAIRY_RECORDS.CONVERSATION%type,
                                     p_BROWSING           TL_DAIRY_RECORDS.BROWSING%type,
                                     p_SHOWING            TL_DAIRY_RECORDS.SHOWING%type,
                                     p_OFFICE_WORK        TL_DAIRY_RECORDS.OFFICE_WORK%type,
                                     p_CALL_TIME          TL_DAIRY_RECORDS.CALL_TIME%type,
                                     p_CALL_PLACE         TL_DAIRY_RECORDS.CALL_PLACE%type,
                                     p_REC_DATE           TL_DAIRY_RECORDS.REC_DATE%type,
                                     p_DIRRECTION_OF_WORK TL_DAIRY_RECORDS.DIRRECTION_OF_WORK%type,
                                     p_COMM               TL_DAIRY_RECORDS.COMM%type,
                                     p_CLIENT_ID          TL_DAIRY_RECORDS.CLIENT_ID%type,
                                     p_OBJECT_ID          TL_DAIRY_RECORDS.OBJECT_ID%type)*/
          try{
            
            conn = db_conn.GetConnect();


             
                 /**Создать запись */
                 
                  stmt = conn.prepareCall(
                    "Begin ? := TL_DAIRY.add_edit_TL_DAIRY_RECORDS(?, ?,  ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?); End;"
                  );
                  stmt.registerOutParameter(1, Types.INTEGER);  // o_Result
                  stmt.setString(2, "0");
                  stmt.setString(3, request.getParameter("p_user_id"));
                  stmt.setString(4, request.getParameter("p_user_id"));
                  stmt.setString(5, request.getParameter("p_DAILY_PLAN"));
                  stmt.setString(6, "0");
                  stmt.setString(7, "0");
                  stmt.setString(8, "0");
                  stmt.setString(9, "0");
                  stmt.setString(10, "0");
                  stmt.setString(11, "0");
                  stmt.setString(12, "0");
                  stmt.setString(13, "0");
                  stmt.setString(14, "0");
                  stmt.setString(15, request.getParameter("p_COMM"));
                  stmt.setString(16, "0");
                  stmt.setString(17, "0");

                  
            

          stmt.execute();
          int res = stmt.getInt(1);
          if (res == 1){
              out.println("{success:true}");
          } else {
              out.println("{success:false}");
          }


     }catch (Exception e){

        s_error_text = e.toString();
        out.println(s_error_text);
     }finally {

            if (stmt != null) stmt.close();
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