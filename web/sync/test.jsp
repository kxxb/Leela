<%--
    Document   : start_sync
    Created on : 18.10.2010, 11:08:59
    Author     : kxxb
--%>

<%@ page import="java.sql.Types, oracle.jdbc.OracleConnection,
         oracle.jdbc.OracleResultSet,
         java.sql.*,
         java.io.*,
         oracle.sql.BLOB,
         oracle.jdbc.OracleConnection,
         oracle.jdbc.OracleStatement,
         oracle.jdbc.OraclePreparedStatement,
         java.io.OutputStream,
         oracle.jdbc.OracleCallableStatement"
         contentType="text/html;charset=utf-8"
         %>
<jsp:useBean id="db_conn" class="Leela.db.Conn" scope="session" />
<jsp:useBean id="db_MSconn" class="Leela.db.MsSqlConn" scope="session" />

<html>
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
        <title>JSP Page</title>
    </head>
    <body>
        <%

 String v_ur_zayavki = " SELECT _id    "+
                     "     ,_dt       "+
                     "     ,_logon    "+
                     "     ,_ready_dt  "+
                     "     ,CAST (_zayavka as varchar)   "+
                     "     ,_type_zayavka  "+
                     "     ,_prior  "+
                     "     ,_status  "+
                     "     ,_it_comment  "+
                     "     ,_it_dt  "+
                     "     ,_it_name  "+
                     "     ,_otdel  "+
                     " FROM dbo._mr_zayavki   order by _id";




 String v_ur_zayavki1 = "SELECT *  FROM dbo._users  ";

  OracleConnection conn = null;
    PreparedStatement stmt = null;
    OracleCallableStatement menu_stmt = null;
    OracleCallableStatement stmt_acces = null;
    OracleResultSet menu_rs = null;

    Connection MsConn = null;
    MsConn = db_MSconn.GetMsSqlcon();
    conn = db_conn.GetConnect();
    int v_i = 1;

   try{
    java.sql.PreparedStatement pst = MsConn.prepareStatement(v_ur_zayavki);
       ResultSet rs = pst.executeQuery();
       while (rs.next()){
           v_i++;
           // out.println(rs.getString(1));
            stmt =  conn.prepareStatement(

            "insert into  TMP_MR_IT_ZAYAVKI ( T_ID,  T_DT,  T_LOGON,  T_READY_DT,  T_ZAYAVKA, " +
            "                          T_TYPE_ZAYAVKA,  T_PRIOR,  T_STATUS,  T_IT_COMMENT,  " +
            "                          T_IT_DT,  T_IT_NAME,  T_OTDEL,  TL_RESP_DEP_ID " +
            "  ) values ( ?, ?, ?, ?, ?, ?, ?, ?,?, ?, ?, ?,?)"  );

           //BLOB blob = null; // "_doc"
           //stmt.registerOutParameter(1, Types.INTEGER);  // o_Result
          
          stmt.setString(1,  rs.getString(1));
          stmt.setString(2,  rs.getString(2));
          stmt.setString(3,  rs.getString(3));
          stmt.setString(4,  rs.getString(4));
          stmt.setString(5,  rs.getString(5));
          stmt.setString(6,  rs.getString(6));
          stmt.setString(7,  rs.getString(7));
          stmt.setString(8,  rs.getString(8));
          stmt.setString(9,  rs.getString(9));
          stmt.setString(10,  rs.getString(10));
          stmt.setString(11,  rs.getString(11));
          stmt.setString(12,  rs.getString(12));
          stmt.setString(13,  "3");
          // stmt.setStringAtName("p_name",  rs.getString(1)  );
          stmt.executeUpdate();
          //int res = stmt.getInt(1);
             if (v_i == 50){
               v_i=1;

               conn.commit();
               db_conn.CloseConnect();
               conn = db_conn.GetConnect();
               //stmt.close();
           }

           out.println("result Ok" + v_i  );


       }
  } catch (Exception e) {
                out.println(e.toString());
            }


%>
    </body>
</html>
