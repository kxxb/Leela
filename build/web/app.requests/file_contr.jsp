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
            ResultSet rs = null;

            String s_error_text = "";
            String v_file_name = "";

            String v_sql = "  select Blob_Data, Name     "
                    + "  from (select Row_Number() Over(Order By r) As rw, z.*     "
                    + "          from (select 1 as r,     "
                    + "                       nvl(t.doc_file, tf.blob_data) as Blob_Data,     "
                    + "                       c.template_name ||     "
                    + "                       substr(t.fl_name,     "
                    + "                              instr(t.fl_name, '.', 1),     "
                    + "                              (length(t.fl_name) - instr(t.fl_name, '.', 1) + 1)) as Name     "
                    + "                  from tl_contract_tpl_docs t,     "
                    + "                       tl_contract_template c,     "
                    + "                       tl_files             tf     "
                    + "                 Where t.tl_contr_id = ?     "
                    + "                   and t.tl_contr_id = c.id     "
                    + "                   and t.is_default = 1     "
                    + "                union all     "
                    + "                select 2 as r, t.blob_data, t.name     "
                    + "                  from tl_files t     "
                    + "                 where t.file_id = 463) z)     "
                    + " where rw = 1     ";



            try {
                conn = db_conn.GetConnect();
                request.setCharacterEncoding("Cp1251");
                cs = conn.prepareCall(v_sql);
                cs.setString(1, request.getParameter("file_id"));
                cs.execute();
                rs = cs.getResultSet();
                if (rs.next()) {
                    out.clearBuffer();
                    response.reset();
                    BLOB blob = (BLOB) rs.getObject("Blob_Data");
                    v_file_name = rs.getString("Name");
                    v_file_name = new String(v_file_name.getBytes("Cp1251"), "Cp1252");
                    String mimeType = session.getServletContext().getMimeType(rs.getString("Name"));
                    response.setContentType(mimeType);
                    response.setHeader("Content-Disposition", "attachment;"
                            + //"filename=\"" + URLEncoder.encode(rs.getString("Name"), "UTF-8").replaceAll("\\+", "%20") + "\"");
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
