<%-- 
    Document   : deal_save
    Created on : 26.04.2011, 12:18:57
    Author     : kxxb
--%>

<%@ page import="java.sql.Types,
oracle.jdbc.OracleResultSet,
java.sql.*,
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
    String s_error_text ="";

    String v_user_id;

    String v_deal_id ="";
    String v_addres ="";
    String v_dep ="";
    String v_BrSobstv ="";
    String v_BrClient ="";
    String v_Deal ="";
    String v_Is_Close = "";
    String v_edit_fag ="";

    request.setCharacterEncoding("utf-8");


/*
       P_Addres Tl_Deals.Addres%Type,
       P_Dep_Id  Tl_Deals.Tl_Depatments_Id%Type,
       P_Broker_Sobstv  Tl_Deals.Broker_Sobstv%Type,
       P_Broker_Client  Tl_Deals.Broker_Client%Type,
       P_User_Id  Tl_Deals.User_Id%Type,
       P_Sdelka   Tl_Deals.Sdelka%Type*/
          try{
            
            conn = db_conn.GetConnect();
            v_user_id = request.getParameter("user_id");

            v_deal_id = request.getParameter("deal_id");
            v_addres = request.getParameter("Addres");

             v_dep =request.getParameter("Broker_Dep");
             v_BrSobstv =request.getParameter("Broker_Sobstv");
             v_BrClient =request.getParameter("Broker_Client");
             v_Deal =request.getParameter("Sdelka");
             v_Is_Close =request.getParameter("Is_Close");
             v_edit_fag =request.getParameter("edit_fag");


             if (v_edit_fag.equals("0")){
                 /**Создать сделку */
                 /*Function Create_Deal (
                       P_Addres Tl_Deals.Addres%Type,
                       P_Dep_Id  Tl_Deals.Tl_Depatments_Id%Type,
                       P_Broker_Sobstv  Tl_Deals.Broker_Sobstv%Type,
                       P_Broker_Client  Tl_Deals.Broker_Client%Type,
                       P_User_Id  Tl_Deals.User_Id%Type,
                       P_Sdelka   Tl_Deals.Sdelka%Type
                  )
                  Return Number;
                 */
                  stmt = conn.prepareCall(
                    "Begin ? := TL_DEALS_PKG.Create_Deal(?, ?, ?, ?, ?, ?); End;"
                  );
                  stmt.registerOutParameter(1, Types.INTEGER);  // o_Result
                  stmt.setString(2, v_addres);
                  stmt.setString(3, v_dep);
                  stmt.setString(4, v_BrSobstv);
                  stmt.setString(5, v_BrClient);
                  stmt.setString(6, v_user_id);
                  stmt.setString(7, v_Deal);
            }else{
                 /**Изменить сделку */

                 /*
                    FUNCTION Update_Deal(
                        P_Deal_Id NUMBER,
                        P_Addres Tl_Deals.Addres%Type,
                        P_Dep_Id Tl_Deals.Tl_Depatments_Id%Type,
                        P_Broker_Sobstv Tl_Deals.Broker_Sobstv%Type,
                        P_Broker_Client Tl_Deals.Broker_Client%Type,
                        P_User_Id Tl_Deals.User_Id%Type,
                        P_Sdelka Tl_Deals.Sdelka%Type,
                        P_Is_Close Tl_Deals.Is_Close%Type )
                      RETURN   NUMBER;
                 */
               stmt = conn.prepareCall(
                    "Begin ? := TL_DEALS_PKG.Update_Deal(?, ?, ?, ?, ?, ?, ?, ?); End;"
                  );
                  stmt.registerOutParameter(1, Types.INTEGER);  // o_Result
                  stmt.setString(2, v_deal_id);
                  stmt.setString(3, v_addres);
                  stmt.setString(4, v_dep);
                  stmt.setString(5, v_BrSobstv);
                  stmt.setString(6, v_BrClient);
                  stmt.setString(7, v_user_id);
                  stmt.setString(8, v_Deal);
                  stmt.setString(9, v_Is_Close);
            }


          stmt.execute();
          int res = stmt.getInt(1);
          if (res == 1){
              out.println("{success:true}");
          } else {
              out.println("{success:false}");
          }


     }catch (Exception e){

        s_error_text = e.toString();
        out.println(s_error_text);
     }finally {

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


    %>