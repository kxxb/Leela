<%@ page import="
    java.io.InputStream,
    java.io.OutputStream,
    java.io.BufferedOutputStream,
    java.net.URLEncoder,
    java.sql.*,
    oracle.sql.BLOB
    "
  contentType="text/html;charset=windows-1251"
%>

<jsp:useBean id="db_conn" class="Leela.db.Conn" scope="session" />
<%

  Connection conn = null;
  CallableStatement cs = null;


  String s_error_text = "";
  String v_file_name = "";

  final String   v_mode = request.getParameter("show_mode");
  final String   v_page = request.getParameter("r_page");
  final String v_request_id =  request.getParameter("request_id");
  //String  g_user_id  = session.getAttribute("g_user_id").toString();
  try{
   conn = db_conn.GetConnect();


  request.setCharacterEncoding("Cp1251");
  
       String v_se_sql =  "Select Tl_Extcorerq.Get_Read_Doc(?) From dual";
             PreparedStatement search_stmt = conn.prepareStatement(v_se_sql);

             search_stmt.setString(1, request.getParameter("file_id"));

             ResultSet serarch_rs =  search_stmt.executeQuery();
             String v_result ="";
             while (serarch_rs.next()){
              v_result = serarch_rs.getString(1);
             }
             out.println(v_result);


    }catch (Exception e){
        //s_error_text = e.toString();
        s_error_text = "Не поддерживаемый формат.";
     }
     finally {
      if (cs != null) cs.close();
      db_conn.CloseConnect();
     }

         %>
  <%=s_error_text%>

              <%


%>
