<%@page import="java.net.URLDecoder"%>
<%@ page import="
    java.io.InputStream,
    java.io.OutputStream,
    java.io.BufferedOutputStream,
    java.net.URLEncoder,
    java.sql.*,
    oracle.sql.BLOB"
  contentType="text/html;charset=UTF-8"
%>

<jsp:useBean id="db_conn" class="Leela.db.Conn" scope="session" />
<%
  
  Connection conn = null;
  CallableStatement cs = null;
  ResultSet rs = null;
  
  String s_error_text = "";
  String v_file_name = "";

  
  try{
        conn = db_conn.GetConnect();


 // request.setCharacterEncoding("UTF-8");
  request.setCharacterEncoding("Windows-1251");
  cs =  conn.prepareCall("select t.blob_data, t.name from tl_files t Where  t.file_id = ?");
  cs.setString(1, request.getParameter("file_id"));
  cs.execute();
  rs = cs.getResultSet();
  if (rs.next()) {
    out.clearBuffer();
    response.reset();
    BLOB blob = (BLOB) rs.getObject("Blob_Data");
    v_file_name = rs.getString("Name");
    v_file_name = new String(v_file_name.getBytes("windows-1251"),"windows-1254");
    //v_file_name = URLDecoder.decode(v_file_name);
    //v_file_name = new String(v_file_name.getBytes("UTF-8"),"UTF-8");
    
    
    
    String mimeType = session.getServletContext().getMimeType(rs.getString("name"));
    response.setContentType(mimeType);
    response.setHeader("Content-Disposition", "attachment;" +
      //"filename=\"" + URLEncoder.encode(rs.getString("Name"), "UTF-8").replaceAll("\\+", "%20") + "\"");
            "filename=\"" + v_file_name + "\"");
    response.setHeader("Content-Length", blob.length() + "");
    InputStream iStream = blob.getBinaryStream();
    BufferedOutputStream oStream=new BufferedOutputStream(response.getOutputStream());
    byte[] data = new byte[16*1024];
    for (int len; (len = iStream.read(data)) != -1;)
      oStream.write(data, 0, len);
    iStream.close();
    oStream.close();
    return;
   }
    }catch (Exception e){
        s_error_text = e.toString();
     }
     finally {

                if (cs != null) {
                    cs.close();
                }
                if (rs != null) {
                    rs.close();
                }
                if (conn != null) {
                    try {
                        conn.rollback();
                    } catch (Exception ex) {
                    }
                    try {
                        conn.close();
                    } catch (Exception ex) {
                    }
                }
            }
 


%>
