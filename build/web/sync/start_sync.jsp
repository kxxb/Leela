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

 String v_ur_zayavki = "SELECT  _id    "+
                       "       , _dt                             "+
                       "       , _logon    "+
                       "       , _ready_dt "+
                       "       , _zayavka "+
                       "       , _object "+
                       "       , _client "+
                       "       , _prior  "+
                       "       , _email  "+
                       "       , _stavka  "+
                       "       , CAST( _comment as varchar) "+
                       "       , _status "+
                       "       , CAST( _ur_comment as varchar) "+
                       "       , _ur_dt  "+
                       "       , _ur_name "+
                       "       , _ur_dt_common "+
                       "       , _otdel   "+
                       "       , _dt_peredachi_dogovora "+
                       "       , CAST( _soderganie as varchar)  "+
                       "       , _klient_adress_object "+
                       "       , _broker  "+
                       "       , _dt_vozvrata "+
                       "       , _podpis_broker "+
                       "       , _podpis_urotdel "+
                       "       ,  null as _doc --_doc "+
                       "       , _kontragent  "+
                       "       , _n_dogovor  "+
                       "       , _dt_vidachi_project "+
                       "       , _poluchatel  "+
                       "       , _dt_vozvrata_lista "+
                       "       , _poluchatel_lista "+
                       "       , _dt_vozvrata_dogovora "+
                       "       , _poluchatel_dogovora "+
                       "       , _dt_vidachi_buh "+
                       "       , _buh  "+
                       "       , _otlogeno_do "+
                       "       ,  _show_user_comment "+
                       "       , CAST( _users_comment as varchar) "+
                       "       , _dogovor_dt "+
                       "       , _prodleno_do "+
                       "       , _dt_otpravki "+
                       "   FROM dbo._zayavki  ";

 String v_ur_zayavki1 = "SELECT  *  FROM dbo._zayavki  ";

    OracleConnection conn = null;
    OracleCallableStatement stmt = null;
    OracleCallableStatement menu_stmt = null;
    OracleCallableStatement stmt_acces = null;
    OracleResultSet menu_rs = null;

    Connection MsConn = null;
    MsConn = db_MSconn.GetMsSqlcon();
    db_conn.CloseConnect();
    conn = db_conn.GetConnect();
    int v_i = 1;

   try{
    java.sql.PreparedStatement pst = MsConn.prepareStatement(v_ur_zayavki1);
       ResultSet rs = pst.executeQuery();
       while (rs.next()){
           v_i++;
    //         out.println(rs.getString(1));
           
            stmt = (OracleCallableStatement) conn.prepareCall(
            "Begin TL_SYNC.sync_ur_rec( :p_user_id    "+
                                        "      , :p_ID     "+
                                        "      , :p_DT      "+
                                        "      , :p_LOGON     "+
                                        "      , :p_READYDT   "+
                                        "      , :p_ZAYAVKA    "+
                                        "      , :p_OBJECT      "+
                                        "      , :p_CLIENT      "+
                                        "      , :p_PRIOR_R      "+
                                        "      , :p_EMAIL         "+
                                        "      , :p_STAVKA        "+
                                        "      , :p_COMMENT_R     "+
                                        "      , :p_STATUS        "+
                                        "      , :p_URCOMMENT     "+
                                        "      , :p_URDT          "+
                                        "      , :p_URNAME        "+
                                        "      , :p_URDTCOMMON      "+
                                        "      , :p_OTDEL           "+
                                        "      , :p_DTPEREDACHIDOGOVORA "+
                                        "      , :p_SODERGANIE          "+
                                        "      , :p_KLIENTADRESSOBJECT  "+
                                        "      , :p_BROKER             "+
                                        "      , :p_DTVOZVRATA         "+
                                        "      , :p_PODPISBROKER      "+
                                        "      , :p_PODPISUROTDEL     "+
                                        //"      , :p_DOC               "+
                                        "      , :p_KONTRAGENT        "+
                                        "      , :p_NDOGOVOR          "+
                                        "      , :p_DTVIDACHIPROJECT  "+
                                        "      , :p_POLUCHATEL        "+
                                        "      , :p_DTVOZVRATALISTA   "+
                                        "      , :p_POLUCHATELLISTA   "+
                                        "      , :p_DTVOZVRATADOGOVORA "+
                                        "      , :p_POLUCHATELDOGOVORA "+
                                        "      , :p_DTVIDACHIBUH        "+
                                        "      , :p_BUH                 "+
                                        "      , :p_OTLOGENODO          "+
                                        "      , :p_SHOWUSERCOMMENT     "+
                                        "      , :p_USERSCOMMENT        "+
                                        "      , :p_DOGOVORDT           "+
                                        "      , :p_PRODLENODO          "+
                                        "      , :p_DTOTPRAVKI          "+
                                        "  ); End;"
          );

           //BLOB blob = null; // "_doc"

           //stmt.registerOutParameter(1, Types.INTEGER);  // o_Result
          stmt.setIntAtName("p_user_id" ,1);
          /*юридические заявки*/
          stmt.setIntAtName("p_ID",  rs.getInt(1));
          stmt.setDateAtName("p_DT",  rs.getDate(2));
          stmt.setStringAtName("p_LOGON",  rs.getString(3));
          stmt.setDateAtName("p_READYDT",  rs.getDate(4));
          stmt.setStringAtName("p_ZAYAVKA",   rs.getString(5));
          stmt.setStringAtName("p_OBJECT",  rs.getString(6));
          stmt.setStringAtName("p_CLIENT",  rs.getString(7));
          stmt.setIntAtName("p_PRIOR_R",  rs.getInt(8));
          stmt.setStringAtName("p_EMAIL",  rs.getString(9));
          stmt.setStringAtName("p_STAVKA",  rs.getString(10));
          stmt.setStringAtName("p_COMMENT_R",     rs.getString(11));
          stmt.setIntAtName("p_STATUS",  rs.getInt(12));
          stmt.setStringAtName("p_URCOMMENT",     rs.getString(13));
          stmt.setDateAtName("p_URDT",  rs.getDate(14));
          stmt.setStringAtName("p_URNAME",  rs.getString(15));
          stmt.setDateAtName("p_URDTCOMMON",  rs.getDate(16));
          stmt.setStringAtName("p_OTDEL",  rs.getString(17));
          stmt.setDateAtName("p_DTPEREDACHIDOGOVORA",  rs.getDate(18));
          stmt.setStringAtName("p_SODERGANIE",   rs.getString(19));
          stmt.setStringAtName("p_KLIENTADRESSOBJECT",  rs.getString(20));
          stmt.setStringAtName("p_BROKER",  rs.getString(21));
          stmt.setDateAtName("p_DTVOZVRATA",  rs.getDate(22));
          stmt.setStringAtName("p_PODPISBROKER",  rs.getString(23));
          stmt.setStringAtName("p_PODPISUROTDEL",  rs.getString(24));
          //stmt.setLongAtName("p_DOC",  );// rs.getLong(25));
          stmt.setStringAtName("p_KONTRAGENT",  rs.getString(26));
          stmt.setStringAtName("p_NDOGOVOR",  rs.getString(27));
          stmt.setDateAtName("p_DTVIDACHIPROJECT",  rs.getDate(28));
          stmt.setStringAtName("p_POLUCHATEL",  rs.getString(29));
          stmt.setDateAtName("p_DTVOZVRATALISTA",  rs.getDate(30));
          stmt.setStringAtName("p_POLUCHATELLISTA",  rs.getString(31));
          stmt.setDateAtName("p_DTVOZVRATADOGOVORA",  rs.getDate(32));
          stmt.setStringAtName("p_POLUCHATELDOGOVORA",  rs.getString(33));
          stmt.setDateAtName("p_DTVIDACHIBUH",  rs.getDate(34));
          stmt.setStringAtName("p_BUH",  rs.getString(35));
          stmt.setDateAtName("p_OTLOGENODO",  rs.getDate(36));
          stmt.setIntAtName("p_SHOWUSERCOMMENT",  rs.getInt(37));
          stmt.setStringAtName("p_USERSCOMMENT",  rs.getString(38));
          stmt.setDateAtName("p_DOGOVORDT",  rs.getDate(39));
          stmt.setDateAtName("p_PRODLENODO",  rs.getDate(40));
          stmt.setDateAtName("p_DTOTPRAVKI",  rs.getDate(41));
           //stmt.setStringAtName("p_name",  rs.getString(1)  );
           stmt.execute();
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
