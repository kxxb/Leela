<%-- 
    Document   : AddEditUser
    Created on : 17.06.2011, 17:31:01
    Author     : kxxb
--%>


<%@ page import="java.sql.Types,
         oracle.jdbc.OracleResultSet,
         java.sql.*,
         java.io.*,
         oracle.sql.BLOB,
         java.io.OutputStream,
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
            String s_error_text = "";

            BLOB blob = null;

            /**  Максимальный размер прикрепляемого файла (в байтах) */
            int maxFileSize = 5000;
            int res = 0;

            String v_edit_fag = "";



            String v_user_id = "";
            String v_login = "";
            String v_pass = "";
            String v_status = "";
            String v_name = "";
            String v_tl_departmenst_id = "";
            String v_tl_users_rank_id = "";
            String v_email = "";
            String v_tel_cellular = "";
            String v_tel_internal = "";
            String v_work_position = "";
            String v_birth_date = "";
            String v_date_work_from = "";

            String v_groupid = "";
            String v_user_local_ip = "";
            String v_guser_id = "";

            request.setCharacterEncoding("utf-8");
            String contentType = request.getContentType();


            try {

                conn = db_conn.GetConnect();


                

                
              
                v_user_id = request.getParameter("user_id");
                v_edit_fag = request.getParameter("user_id_val");
             

                out.println("Изменить user_id_val="+v_edit_fag +"| v_user_id="+v_user_id);
                

                    /**Изменить фотку  сотрудника */
                    

                   


                if ((contentType != null) && (contentType.indexOf("multipart/form-data") >= 0)) {
                    DataInputStream in = new DataInputStream(request.getInputStream());
                    int formDataLength = request.getContentLength();

                    byte dataBytes[] = new byte[formDataLength];
                    int byteRead = 0;
                    int totalBytesRead = 0;
                    while (totalBytesRead < formDataLength) {
                        byteRead = in.read(dataBytes, totalBytesRead, formDataLength);
                        totalBytesRead += byteRead;
                    }

                    String file = new String(dataBytes);
                    String saveFile = file.substring(file.indexOf("filename=\"") + 10);
                    //out.print("FileName:" + saveFile.toString());
                    saveFile = saveFile.substring(0, saveFile.indexOf("\n"));
                    //out.print("FileName:" + saveFile.toString());
                    saveFile = saveFile.substring(saveFile.lastIndexOf("\\") + 1, saveFile.indexOf("\""));
                    //out.print("FileName:" + saveFile.toString());

                    //out.print(dataBytes);

                    int lastIndex = contentType.lastIndexOf("=");
                    String boundary = contentType.substring(lastIndex + 1, contentType.length());
                    //out.println(boundary);
                    int pos;
                    pos = file.indexOf("filename=\"");

                    pos = file.indexOf("\n", pos) + 1;

                    pos = file.indexOf("\n", pos) + 1;

                    pos = file.indexOf("\n", pos) + 1;


                    int boundaryLocation = file.indexOf(boundary, pos) - 4;
                    int startPos = ((file.substring(0, pos)).getBytes()).length;
                    int endPos = ((file.substring(0, boundaryLocation)).getBytes()).length;
                    saveFile = "D:\\" + saveFile;
                    FileOutputStream fileOut = new FileOutputStream(saveFile);


                    blob = BLOB.createTemporary(conn, true, BLOB.DURATION_SESSION);
                    OutputStream outstream = blob.setBinaryStream(0);
                    outstream.write(dataBytes, startPos, (endPos - startPos));
                    outstream.close();
                }
                /*конец файл*/


                   stmt =  conn.prepareCall(
                    "Begin ? := Tl_Sys_Users.Add_photo(" +
                                      "?, " +
                                       "?); " +
                     "End;"
                  );
                  stmt.registerOutParameter(1, Types.INTEGER);
                  stmt.setString(2, v_user_id);
                  stmt.setBlob(3, blob);
                  stmt.execute();
                  res = stmt.getInt(1);
                
          


                
                
                if (res == 1) {
                    out.println("{success:true}"+s_error_text);
                } else {
                    out.println("{success:false}"+s_error_text);
                }


            } catch (Exception e) {

                s_error_text = e.toString();
                out.println(s_error_text);
            } finally {

                if (stmt != null) {
                    stmt.close();
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