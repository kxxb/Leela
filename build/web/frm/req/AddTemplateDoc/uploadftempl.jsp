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
         oracle.jdbc.OracleConnection,
         oracle.jdbc.OracleStatement,
         oracle.jdbc.OraclePreparedStatement,
         java.io.OutputStream,
         oracle.jdbc.OracleCallableStatement"
  contentType="text/html;charset=windows-1251"
%>
<jsp:useBean id="Lela_util" class="Leela.core.Util" scope="session" />
<jsp:useBean id="db_conn" class="Leela.db.Conn" scope="session" />
<jsp:useBean id="Lela_core" class="Leela.core.user_managment" scope="session" />
<%
         // contentType="text/html;charset=windows-1251"
		 String s_error_text ="";
    
        OracleConnection conn = null;

        OracleCallableStatement cs = null;
        OracleResultSet rs = null;
        BLOB blob = null;

//       request.setCharacterEncoding("UTF-8");
	  // request.setCharacterEncoding("Cp1251");
        
       String v_session = "";

        String g_user_id = "";
        String g_login_id = "";
        String g_base_url = "";
        String v_item_id = "";
        //final String v_request_id =  request.getParameter("request_id");


        
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

/*
                  -- Добавление/редактирование файлов
  Function Add_Edit_Template_File(p_User_Id    Tl_Request.Responsibly_Id%Type,
                         p_Contr_Id Tl_Request.Id%Type,
                         p_File_Type_Code Tl_Files.File_Type_Code%Type, -- Тип файла
                         p_Name           Tl_Files.Name%Type, -- Имя файла
                         p_Description    Tl_Files.Description%Type, -- Описание на базовам языке
                         p_Blob_Data      Tl_Files.Blob_Data%Type -- Тело файла
                         ) Return Number Is

                  */
             cs = (OracleCallableStatement) conn.prepareCall(
                    "Begin ? := Tl_Extcorerq.Add_Edit_Template_File(" +
                                       ":p_User_Id, " +
                                       ":p_Contr_Id, " +
                                       ":p_File_Type_Code, " +
                                       ":p_Name, " +
                                       ":p_Description," +
                                       ":p_Blob_Data); " +
                     "End;"
                  );
                  cs.registerOutParameter(1, Types.INTEGER);
                  cs.setIntAtName("p_User_Id",  Lela_core.get_users_by_ip(conn, request.getRemoteAddr()));
                  cs.setStringAtName("p_Contr_Id", request.getParameter("Contr_Id"));
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
        s_error_text = e.toString();
        out.println("{success:false, errors:{reason:'"+s_error_text+"'}}");
     }
     finally {

      db_conn.CloseConnect();
     }
%>
  
