
<%@ page import="
         java.io.InputStream,
         java.io.OutputStream,
         java.io.BufferedOutputStream,
         java.net.URLEncoder,
         java.sql.*,
         oracle.sql.BLOB"
         contentType="text/html;charset=windows-1251"
         %>

<jsp:useBean id="db_conn" class="Leela.db.Conn" scope="session" />
<%

        Connection conn = null;
        CallableStatement cs = null;


        String s_error_text = "";
        String v_file_name = "";


        try {
            conn = db_conn.GetConnect();


            request.setCharacterEncoding("Cp1251");
            cs =  conn.prepareCall("select t.personal_photo  from tl_users t Where  t.user_id = ?");
            cs.setString(1, request.getParameter("file_id"));
            cs.execute();
            ResultSet rs = cs.getResultSet();
            if (rs.next()) {
                out.clearBuffer();
                response.reset();
                BLOB blob = (BLOB) rs.getObject("personal_photo");

                v_file_name = new String(v_file_name.getBytes("Cp1251"), "Cp1252");
                response.setContentType("image/png;");

                response.setHeader("Content-Disposition", "attachment;" +
                        //"filename=\"" + URLEncoder.encode(rs.getString("Name"), "UTF-8").replaceAll("\\+", "%20") + "\"");
                        "filename=\"" + v_file_name + "\"");
                response.setHeader("Content-Length", blob.length() + "");
                InputStream iStream = blob.getBinaryStream();
                BufferedOutputStream oStream = new BufferedOutputStream(response.getOutputStream());
                byte[] data = new byte[16 * 1024];
                for (int len; (len = iStream.read(data)) != -1;) {
                    oStream.write(data, 0, len);
                }
                iStream.close();
                oStream.close();
                return;
            }




        } catch (Exception e) {
            s_error_text = e.toString();
        } finally {
            if (cs != null) {
                cs.close();
            }
            db_conn.CloseConnect();
        }



%>
