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
 * @author kxxb
 */
public class GetContetnt {

    public static String get_content(Connection  conn, int p_content_id, int p_user_id) throws SQLException {
      CallableStatement stmt = null;
      String v_result;
      try{
      stmt =  conn.prepareCall(
                    "Begin ? := CRM_SYS_MENU_AND_MORE.get_content(?,?); End;"
                  );
          stmt.registerOutParameter(1, Types.VARCHAR);  // o_Result
          stmt.setInt(2, p_content_id);
          stmt.setInt(3, p_user_id);

          stmt.execute();
          v_result = stmt.getString(1);

        stmt.close();
        return v_result;
        } catch (Exception e ){
            return e.toString();
        }
    }

}
