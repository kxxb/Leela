/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

package Leela.db;

/**
 *
 * @author shavrak.ka
 */
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;
import java.util.Properties;
import java.util.logging.Level;
import java.util.logging.Logger;
import javax.naming.Context;
import javax.naming.InitialContext;
import javax.naming.NamingException;
import javax.sql.DataSource;
import oracle.jdbc.OracleConnection;
import oracle.jdbc.OracleCallableStatement;
import oracle.jdbc.pool.OracleConnectionCacheManager;
import oracle.jdbc.pool.OracleDataSource;



public class Conn {
  private static Connection conn = null;

    public static Connection GetConnect() throws SQLException, NamingException {
/*
 1 devserver без пула
 2 production без пула
 3 devserver  пул
 4 production  пул
 5 Saigon без пула
 */
        int l_choose_conn = 2;
        Properties prop = new Properties();

        if (l_choose_conn == 1) {
            prop.put("user", "Leela");
            prop.put("password", "Leela");
            try {
                Class.forName("oracle.jdbc.driver.OracleDriver");
            } catch (ClassNotFoundException e) {
                e.printStackTrace();
            }
            conn = DriverManager.getConnection("jdbc:oracle:thin:@192.168.20.140:1521:Leela", prop //       ("jdbc:oracle:thin:@192.168.20.142:1521:Leela",  prop
                    );
//
        } else if (l_choose_conn == 2) {
            prop.put("user", "LEELA");
            prop.put("password", "LEELA");
/*
            prop.put("user", "LEELA");
            prop.put("password", "LEELA");
*/

            try {
                Class.forName("oracle.jdbc.driver.OracleDriver");
            } catch (ClassNotFoundException e) {
                e.printStackTrace();
            }
          // conn = DriverManager.getConnection("jdbc:oracle:thin:@192.168.20.142:1521:orcl", prop);
            conn = DriverManager.getConnection("jdbc:oracle:thin:@192.168.20.142:1521:archprod", prop);
        } else if (l_choose_conn == 3) {
            String dbName = "jdbc/OraDev";
            InitialContext ic = new InitialContext();
            DataSource ds = (DataSource) ic.lookup(dbName);

            conn = ds.getConnection();
        } else if (l_choose_conn == 4) {
            String dbName = "jdbc/OraLeela";
            InitialContext ic = new InitialContext();
            DataSource ds = (DataSource) ic.lookup(dbName);

            conn = ds.getConnection();
        }else if (l_choose_conn == 5) {
            prop.put("user", "Leela");
            prop.put("password", "Leela");

            try {
                Class.forName("oracle.jdbc.driver.OracleDriver");
            } catch (ClassNotFoundException e) {
                e.printStackTrace();
            }
            conn = DriverManager.getConnection("jdbc:oracle:thin:@192.168.20.245:1521:Leela", prop);
        }


        return conn;
    }

public static void CloseConnect() throws SQLException{
  if (conn != null) {
      conn.close();
      conn = null;
    }
    

}





 

}
