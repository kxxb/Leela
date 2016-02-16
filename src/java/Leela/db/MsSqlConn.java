/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

package Leela.db;

/**
 *
 * @author shavrak.ka
 */
import java.sql.*;


public class MsSqlConn {
  private static Connection conn = null;
  
  
public static  Connection GetMsSqlcon() throws ClassNotFoundException, SQLException {
    // Create a variable for the connection string.

    
      
      /* jdbc
     Class.forName("com.microsoft.sqlserver.jdbc.SQLServerDriver");
     String connectionUrl = "jdbc:sqlserver://192.168.20.2:1433;databaseName=UROTDEL;user=zero;password=1";
       */

     Class.forName("net.sourceforge.jtds.jdbc.Driver");
     String connectionUrl = "jdbc:jtds:sqlserver://192.168.20.2:1433;databaseName=UROTDEL;user=zero;password=1";
    //String connectionUrl = "jdbc:sqlserver://192.168.20.140:2433;databaseName=ur;user=dev;password=cat#45";
         conn = DriverManager.getConnection(connectionUrl);
        return conn;
    }





}
