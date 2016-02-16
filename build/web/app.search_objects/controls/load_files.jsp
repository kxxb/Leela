
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

//45580
            request.setCharacterEncoding("Cp1251");
            //cs =  conn.prepareCall("select picture from pictures t Where t.object_id_ = 68422");
            cs =  conn.prepareCall("select t.picture from pictures t where t.id = ?");
            cs.setString(1, request.getParameter("pic_id"));
            cs.execute();
            ResultSet rs = cs.getResultSet();
            if (rs.next()) {
                out.clearBuffer();
                response.reset();
                 BLOB blob = (BLOB) rs.getObject("picture");

                v_file_name = "pic.jpg";//new String(v_file_name.getBytes("Cp1251"), "Cp1252");
                response.setContentType("image/jpg;");

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
