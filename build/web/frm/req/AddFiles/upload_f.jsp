<%-- 
    Document   : upload_f
    Created on : 23.07.2010, 13:10:34
    Author     : shavrak.ka
--%>



<%@ page import="java.sql.Types, oracle.jdbc.OracleConnection,
         oracle.jdbc.OracleResultSet,
         java.sql.*,
         java.io.*,
         net.sf.json.*,
         Leela.core.Util,
         Leela.core.RequestData,
         Leela.core.user_managment,
         oracle.sql.BLOB,
         java.io.OutputStream"
  contentType="text/html;charset=windows-1251"
%>


<jsp:useBean id="Lela_util" class="Leela.core.Util" scope="session" />
<jsp:useBean id="db_conn" class="Leela.db.Conn" scope="session" />
<jsp:useBean id="Lela_core" class="Leela.core.user_managment" scope="session" />
<%
         String s_error_text ="";

        Connection conn = null;

        CallableStatement cs = null;
        OracleResultSet rs = null;
        BLOB blob = null;

//        request.setCharacterEncoding("Cp1251");
      // request.setCharacterEncoding("Cp1251");
        
       String v_session = "";

        String g_user_id = "";
        String g_login_id = "";
        String g_base_url = "";
        String v_item_id = "";
        final String v_request_id =  request.getParameter("request_id");


        
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


             cs =  conn.prepareCall(
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
                  cs.setInt(2,  Lela_core.get_users_by_ip(conn, request.getRemoteAddr()));
                  cs.setString(3, request.getParameter("request_id"));
                  cs.setString(4,  "file");// reqData.getMimeType("uploadedFile"));
                  cs.setString(5,   saveFile);// reqData.getFileName("uploadedFile"));
                  cs.setString(6, "cool_file"); //reqData.getParValue("desc"));
                  cs.setBlob(7, blob);
                  cs.execute();


                int res = cs.getInt(1);
            

         //fileOut.write(dataBytes);
            //fileOut.write(dataBytes, startPos, (endPos - startPos));
            //fileOut.flush();
            //fileOut.close();
             /*JSONObject store = new JSONObject();
             JSONArray json_a = new JSONArray();

             JSONObject obj = new JSONObject();
               obj.put("", res);

               json_a.add(obj);


                store.put("results", Lela_util.nvl(json_a.toString(),"0"));

                // stream JSON Object
                String json_string = store.toString();
                String callback_function_name = request.getParameter("callback");
                String response_string = "";
                if (!"".equals(callback_function_name)) {
                    response_string = callback_function_name + "(" + json_string + ")";
                } else {
                    response_string = json_string;
                }
                */
                out.println("{success:true}");
                //out.print(store);
                out.flush();

            
  }
  }catch (Exception e){
        s_error_text =" global "+ e.toString();
        out.println("{success:false}");
     }
     finally {

      db_conn.CloseConnect();
     }
%>
  
