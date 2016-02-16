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
public class menu_builder {

    public static String get_menu_js(Connection  conn) throws SQLException {
      CallableStatement stmt = null;
      String v_result;
      stmt =  conn.prepareCall(
                    "Begin ? := CRM_SYS_MENU_AND_MORE.build_menu_js; End;"
                  );
          stmt.registerOutParameter(1, Types.VARCHAR);  // o_Result


          stmt.execute();
          v_result = stmt.getString(1);

        stmt.close();
        return v_result;
    }


}
