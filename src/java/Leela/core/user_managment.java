/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

package Leela.core;




import java.sql.CallableStatement;
import java.sql.Connection;
import java.sql.SQLException;
import java.sql.Types;


/**
 *
 * @author shavrak.ka
 */
public class user_managment {

    public static int Check_Show_Edit_Level(Connection  conn,String p_user_id, String p_request_id ) throws SQLException {
        CallableStatement stmt_Check_Level = null;
        int res_level = 0;
        stmt_Check_Level =  conn.prepareCall(
                    "Begin ? := Tl_Requests.Check_Show_Edit_Level(?,?); End;"
                  );
          stmt_Check_Level.registerOutParameter(1, Types.INTEGER);  // o_Result
          stmt_Check_Level.setString(2, p_user_id);
          stmt_Check_Level.setString(3, p_request_id);
          stmt_Check_Level.execute();
          res_level = stmt_Check_Level.getInt(1);

        stmt_Check_Level.close();
        return res_level;
    }

    public static int Check_User_Session (Connection  conn, String p_session, String p_user_id, String p_login_id ) throws SQLException {
   
         int res=0;
         CallableStatement stmt =  conn.prepareCall(
            "Begin ? := tl_sys_users.check_user_session(?, ?, ?); End;"
          );
          stmt.registerOutParameter(1, Types.INTEGER);  // o_Result
          stmt.setString(2, p_session);
          stmt.setString(3, p_user_id);
          stmt.setString(4, p_login_id);
          stmt.execute();
          res =  stmt.getInt(1);
          stmt.close();
          return res;

    }

    public static int users_sys_queit_login (Connection  conn, String p_session, String p_ip ) throws SQLException {

         int res=0;
         CallableStatement stmt =  conn.prepareCall(
            "Begin ? := tl_sys_users.users_sys_queit_login(?, ?); End;"
          );
          stmt.registerOutParameter(1, Types.INTEGER);  // o_Result
          stmt.setString(2, p_ip);
          stmt.setString(3, p_session);

          stmt.execute();
          res =  stmt.getInt(1);
          stmt.close();
          return res;

    }

    public static int Check_Group_Item_Acces(Connection  conn, String p_item_id, String p_user_id) throws SQLException {
            int res_acces = 1;
            CallableStatement stmt_acces =  conn.prepareCall(
                        "Begin ? := tl_sys_users.Check_Group_Item_Acces(?, ?); End;"
                      );
              stmt_acces.registerOutParameter(1, Types.INTEGER);  // o_Result
              stmt_acces.setString(2, p_user_id);
              stmt_acces.setString(3, p_item_id );
              stmt_acces.execute();
             res_acces = stmt_acces.getInt(1);

          return res_acces;

    }

    public static int Get_Users_Group(Connection  conn,  int p_user_id) throws SQLException {
            int res_acces = 1;
            CallableStatement stmt_acces =  conn.prepareCall(
                        "Begin ? := tl_sys_users.Get_Groupid(?); End;"
                      );
              stmt_acces.registerOutParameter(1, Types.INTEGER);  // o_Result
              stmt_acces.setInt(2, p_user_id);
              stmt_acces.execute();
             res_acces = stmt_acces.getInt(1);

          return res_acces;

    }


   

    public static String get_username(Connection  conn, int p_uid) throws SQLException {
        String res ="";
        CallableStatement stmt =  conn.prepareCall(
            "Begin ? := tl_sys_users.get_username(?); End;"
          );
          stmt.registerOutParameter(1, Types.VARCHAR);  // o_Result
          stmt.setInt(2, p_uid);
          stmt.execute();
          res =  stmt.getString(1);
          stmt.close();
        return res;
    }

    public static int get_users_by_ip(Connection  conn, String p_ip) throws SQLException {
        int res = -1;
        CallableStatement stmt =  conn.prepareCall(
            "Begin ? := tl_sys_users.get_users_id_by_ip(?); End;"
          );
          stmt.registerOutParameter(1, Types.INTEGER);  // o_Result
          stmt.setString(2,p_ip);
          stmt.execute();
          res =  stmt.getInt(1);
          stmt.close();
        return res;
    }

    public static int get_user_depid_by_ip(Connection  conn, String p_ip) throws SQLException {
        int res = -1;
        CallableStatement stmt =  conn.prepareCall(
            "Begin ? := tl_sys_users.get_user_depid_by_ip(?); End;"
          );
          stmt.registerOutParameter(1, Types.INTEGER);  // o_Result
          stmt.setString(2, p_ip);
          stmt.execute();
          res =  stmt.getInt(1);
          stmt.close();
        return res;
    }


    public static int get_user_depid(Connection  conn, int user_id) throws SQLException {
        int res = -1;
        CallableStatement stmt =  conn.prepareCall(
            "Begin ? := CRM_SYS_AUTH.get_user_dep_id(?); End;"
          );
          stmt.registerOutParameter(1, Types.INTEGER);  // o_Result
          stmt.setInt(2, user_id);
          stmt.execute();
          res =  stmt.getInt(1);
          stmt.close();
        return res;
    }

    public static int get_user_groupid(Connection  conn, int user_id) throws SQLException {
        int res = -1;
        CallableStatement stmt =  conn.prepareCall(
            "Begin ? := CRM_SYS_AUTH.get_user_group_id(?); End;"
          );
          stmt.registerOutParameter(1, Types.INTEGER);  // o_Result
          stmt.setInt(2, user_id);
          stmt.execute();
          res =  stmt.getInt(1);
          stmt.close();
        return res;
    }
}
