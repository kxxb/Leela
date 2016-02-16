<%-- 
    Document   : login
    Created on : 30.06.2010, 18:22:35
    Author     : shavrak.ka
--%>
<%@ page import="java.sql.CallableStatement"%>
<%@ page import="java.sql.Connection"%>
<%@ page import="java.sql.Types,  net.sf.json.*"
  contentType="text/html;charset=windows-1251"
%>

<jsp:useBean id="db_conn" class="Leela.db.Conn" scope="session" />
<jsp:useBean id="Lela_core" class="Leela.core.user_managment" scope="session" />
<jsp:useBean id="Lela_util" class="Leela.core.Util" scope="session" />



<%


  String s_doc_id = request.getParameter("doc_id_leaf");
  String s_mode = request.getParameter("mode");
  
  String s_error_text = "EMPTY";

  Connection conn = null;
  CallableStatement stmt = null;

  conn = db_conn.GetConnect();
  
           try{
              stmt =  conn.prepareCall(
                "Begin ? := Tl_Extcorerq.checked_leaf_templ(?,?); End;"
              );
              stmt.registerOutParameter(1, Types.VARCHAR);  // o_Result
              stmt.setString(2, s_doc_id);  // p_login
              stmt.setString(3, s_mode);  // p_login
              
              stmt.execute();
              s_error_text =  stmt.getString(1);
              /*if (res.equals("OK")) {
                  s_error_text = "OK";
              }else {
                  s_error_text = "BAD" ;
              }
 */

         }catch (Exception e){
            s_error_text = "{success:false,errors:{reason:"+e.toString()+"}}";
         }
         finally {
          if (stmt != null) stmt.close();
          db_conn.CloseConnect();
         }

 %>
<%=s_error_text %>