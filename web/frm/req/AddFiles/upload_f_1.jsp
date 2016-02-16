<%-- 
    Document   : upload_f
    Created on : 23.07.2010, 13:10:34
    Author     : shavrak.ka
--%>



<%@ page import="java.sql.Types, oracle.jdbc.OracleConnection,
         oracle.jdbc.OracleResultSet,
         java.sql.*,
         java.io.*,
         Leela.core.Util,
         Leela.core.RequestData,
         Leela.core.user_managment,
         oracle.sql.BLOB,
         oracle.jdbc.OracleConnection,
         oracle.jdbc.OracleStatement,
         oracle.jdbc.OraclePreparedStatement,
         java.io.OutputStream,
         oracle.jdbc.OracleCallableStatement"
  contentType="text/html;charset=windows-1251"
%>

<jsp:useBean id="db_conn" class="Leela.db.Conn" scope="session" />

<%
         String s_error_text ="";
    
        OracleConnection conn = null;

        OracleCallableStatement cs = null;
        OracleResultSet rs = null;
        BLOB blob = null;

        request.setCharacterEncoding("Cp1251");
        
       String v_session = "";

        String g_user_id = "";
        String g_login_id = "";
        String g_base_url = "";
        String v_item_id = "";
        final String   v_mode = request.getParameter("show_mode");
        final String   v_page = request.getParameter("r_page");
        final String v_request_id =  request.getParameter("request_id");

        




        try {
            g_user_id  = session.getAttribute("g_user_id").toString();
            g_login_id = session.getAttribute("g_login_id").toString();
            g_base_url = session.getAttribute("g_base_url").toString();
            v_item_id =  request.getParameter("item_id");
            



            v_session = session.getId();
            } catch (Exception e) {
            // error catcher
            s_error_text = e.toString();
        }
          String contentType = request.getContentType();
        try {
        conn = db_conn.GetConnect();    

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
            
            FileOutputStream fileOut = new FileOutputStream(saveFile);
            

                  blob = BLOB.createTemporary(conn, true, BLOB.DURATION_SESSION);
                  OutputStream outstream = blob.setBinaryStream(0);
                  outstream.write( dataBytes, startPos, (endPos - startPos));
                  outstream.close();


             cs = (OracleCallableStatement) conn.prepareCall(
                    "Begin ? := Tl_Requests.Add_Edit_File(" +
                                      ":p_User_Id, " +
                                       ":p_Request_Id, " +
                                       ":p_File_Type_Code, " +
                                       ":p_Name, " +
                                       ":p_Description," +
                                       ":p_Blob_Data); " +
                     "End;"
                  );
                  cs.registerOutParameter(1, Types.INTEGER);
                  cs.setStringAtName("p_User_Id", g_user_id);
                  cs.setStringAtName("p_Request_Id", request.getParameter("request_id"));
                  cs.setStringAtName("p_File_Type_Code",  "file");// reqData.getMimeType("uploadedFile"));
                  cs.setStringAtName("p_Name",   saveFile);// reqData.getFileName("uploadedFile"));
                  cs.setStringAtName("p_Description", "cool_file"); //reqData.getParValue("desc"));
                  cs.setBLOBAtName("p_Blob_Data", blob);
                  cs.execute();


                int res = cs.getInt(1);
            

         //fileOut.write(dataBytes);
            //fileOut.write(dataBytes, startPos, (endPos - startPos));
            //fileOut.flush();
            //fileOut.close();

            out.println("File saved as " + saveFile);

            if (res == 1){

            %>

            <html>
             <body>
              <script>

              <%

                  out.println("parent.location = 'system_request.jsp?item_id=1&request_id="+v_request_id+"&show_mode="+v_mode+"&r_page="+v_page+"';");
                  out.println("window.top.hidePopWin();");

                  %>
             </script>
            </body>
           </html>


            <%
            }
  }
  }catch (Exception e){
        s_error_text =" global "+ e.toString();
     }
     finally {

      db_conn.CloseConnect();
     }
%>
     <%=s_error_text%>
<html>
    <head>
        
    </head>
    <body>
        
        <form method="POST" enctype="multipart/form-data"  action="?show_mode=<%=v_mode%>&r_page=<%=v_page%>&request_id=<%=v_request_id%>" >
            <fieldset>

                <legend><b>Файл</b></legend>
                <b>Файл</b><br>

                <input  type="file" name="uploadedFile"  />


            </fieldset>

            

            <br>
            <center>
                <input type="submit" value="Сохранить">

            </center>

        </form>

    </body>
</html>
