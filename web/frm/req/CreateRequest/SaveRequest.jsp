<%-- 
    Document   : login
    Created on : 30.06.2010, 18:22:35
    Author     : shavrak.ka
--%>
<%@page import="java.sql.Connection"%>
<%@page import="java.sql.CallableStatement"%>
<%@page import="java.sql.CallableStatement"%>
<%@ page import="java.sql.Types,  net.sf.json.*"
  contentType="text/html;charset=utf-8"

%>

<jsp:useBean id="db_conn" class="Leela.db.Conn" scope="session" />
<jsp:useBean id="Lela_core" class="Leela.core.user_managment" scope="session" />
<jsp:useBean id="Lela_util" class="Leela.core.Util" scope="session" />



<%


  String s_DepId = request.getParameter("DepId");
  String s_ReqType = request.getParameter("cbReqType");
  String s_ReqDate = request.getParameter("DtReqExe");
  String s_ReqText = request.getParameter("txaRequestText");

  String s_Condition1 = Lela_util.nvl(request.getParameter("txaCondition1")," ");
  String s_Condition2 = Lela_util.nvl(request.getParameter("txaCondition2")," ");
  
  String s_ContractTypeId = request.getParameter("cbContractType");
  String s_ClientId = request.getParameter("cbClients");
  String s_ObjectId = request.getParameter("cbObjects");
  String s_Cost = Lela_util.nvl(request.getParameter("txtCost"),"-7");
  int s_Nds =  Integer.parseInt(Lela_util.nvl(request.getParameter("rb-nds"),"0"));
  String s_Nds_value ="";
  
  if (s_Nds==1  && !s_Cost.equals("-7")){
      s_Nds_value ="С учетом НДС";
  } else if (s_Nds==2 && !s_Cost.equals("-7")){
      s_Nds_value ="Без учета НДС";
  } else if (s_Cost.equals("-7")){
      s_Nds_value ="";
      s_Cost = "";
  }
  

  String s_error_text = "";

  Connection conn = null;
  CallableStatement stmt = null;

  conn = db_conn.GetConnect();
  String g_user_id = request.getParameter("User_Id");
  int AplDepId =  Lela_core.get_user_depid_by_ip(conn, request.getRemoteAddr());

  JSONObject store = new JSONObject();
  JSONArray json_a = new JSONArray();
  JSONObject obj = new JSONObject();

    // if (AplDepId == 6 | (s_Condition1!=null &  s_Condition2!=null)){
         /**/
           try{
              
              stmt =  conn.prepareCall(
                "Begin ? := Tl_Requests.Request_Save(?, ?, ?, ?, ?, ?, ?, ?); End;"
              );/*
              if (AplDepId == 2 ) {
                s_ReqText = s_ReqText +"<br>"+ s_Condition1 +"<br>"+ s_Condition2 +
                            "<br>"+ s_Cost + " " + s_Nds_value;
              }
              */
              /*
                Function Request_Save(p_User                      Tl_Request.Applicant_Id%Type,
                        p_Request_Text              Tl_Request.Request%Type,
                        p_Responsibly_Department_Id Tl_Request.Responsibly_Department_Id%Type,
                        p_Dt_Execute Varchar2,
                        p_Contr_Tepl Tl_Request.Tl_Contract_Template_Id%Type,
                        p_Object        Tl_Objects.Name%Type,
                        p_Client       Tl_Clients.Client_Name%Type,
                        p_Cost_Of_Service Tl_Request.Cost_Of_Service%Type
                        ) Return Number Is
              */
              stmt.registerOutParameter(1, Types.INTEGER);  // o_Result
              stmt.setString(2, g_user_id);  // p_login
              stmt.setString(3, "<b>Тип заявки:&nbsp;&nbsp;"+s_ReqType+"<br>Описание заявки:&nbsp;&nbsp;</b>"+ s_ReqText+
                                "&nbsp;<br>"+s_Condition1+"&nbsp;<br><br>"+s_Condition2+"&nbsp;<br><br>"+s_Cost + "&nbsp;" + s_Nds_value);  // p_pass
              stmt.setString(4, s_DepId);  // p_ip
              stmt.setString(5, s_ReqDate);  // p_session_id
              stmt.setString(6, s_ContractTypeId);  // p_session_id
              stmt.setString(7, s_ObjectId);  // p_session_id
              stmt.setString(8, s_ClientId);  // p_session_id
              stmt.setString(9, s_Cost + " " + s_Nds_value);  // p_session_id

              //stmt.registerOutParameter(6, Types.INTEGER);  // o_Result
              stmt.execute();
              int res = stmt.getInt(1);
              if (res > 0  ) {
                  s_error_text = "{success:true}";
              }else {
                  s_error_text = "{success:false,errors:{reason:'Заявка не создана!'}}" ;
              }

         }catch (Exception e){
            s_error_text = "{success:false,errors:{reason:"+e.toString()+"}}";
         }
         finally {

            if (stmt != null) stmt.close();
            if (conn != null) {
              try {
                conn.rollback();
              } catch(Exception ex) {}
              try {
                conn.close();
              } catch(Exception ex) {}
            }
           }
/*
      } else {
          obj.put("success:", "false");
          obj.put("reason:", "code2");
          obj.put("DepId", s_DepId);
          obj.put("txaRequestText", s_ReqText);
          obj.put("DtReqExe", s_ReqDate);

          json_a.add(obj);
            store.put("{success:false,errors:{reason:code2}, data:", json_a);

                // stream JSON Object
                String json_string = store.toString();
                String callback_function_name = request.getParameter("callback");
                String response_string = "";
                if (!"".equals(callback_function_name)) {
                    response_string = callback_function_name + "(" + json_string + ")";
                } else {
                    response_string = json_string;
                }
                //out.println(response_string);
          s_error_text =  response_string;
          //s_error_text = "{success:false,errors:{reason:'code2'}}";
      }
   */
   
  
  /*else {
      s_error_text = "{success:false,errors:{reason:'?????? ??????'}}";
      };*/

 %>
<%=s_error_text %>