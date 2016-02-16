/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

package sys.auth;

import java.sql.CallableStatement;
import java.sql.Connection;
import java.sql.SQLException;
import java.sql.Types;


import java.util.Hashtable;
import javax.naming.AuthenticationException;
import javax.naming.CommunicationException;
import javax.naming.NoPermissionException;

import javax.naming.Context;
import javax.naming.InitialContext;
import javax.naming.NamingEnumeration;
import javax.naming.NamingException;
import javax.naming.ldap.InitialLdapContext;
import javax.naming.ldap.LdapContext;

import javax.naming.ldap.LdapName;
import javax.naming.directory.Attribute;



/**
 *
 * @author kxxb
 */
public class auth {

    public static int Check_Login(Connection  conn,
                                String p_login_id,
                                String p_app_name,
                                String p_user_ip ) throws SQLException {
     CallableStatement stmt = null;
     int uid = 0;
     

     stmt =  conn.prepareCall(
                    "Begin ? := CRM_SYS_AUTH.user_check(?,?,?); End;"
                  );
          stmt.registerOutParameter(1, Types.INTEGER);  // o_Result
          stmt.setString(2, p_login_id);
          stmt.setString(3, p_app_name);
          stmt.setString(4, p_user_ip);
          stmt.execute();
          uid = stmt.getInt(1);

        stmt.close();
        return uid;
    }

    public static int Logon(Connection  conn,
                                String p_login,
                                String p_pass,
                                String p_user_ip ) throws SQLException {
     CallableStatement stmt = null;
     int uid = 0;


     stmt =  conn.prepareCall(
                    "Begin ? := CRM_SYS_AUTH.user_logon(?, ?, ?); End;"
                  );
          stmt.registerOutParameter(1, Types.INTEGER);  // o_Result
          stmt.setString(2, p_login);//login
          stmt.setString(3, p_pass);//pass
          stmt.setString(4, p_user_ip);//ip
          stmt.execute();



          uid = stmt.getInt(1);

        stmt.close();
        return uid;
    }

    public static int Logout(Connection  conn,
                                String p_login_id) throws SQLException {
     CallableStatement stmt = null;
     int uid = 0;


     stmt =  conn.prepareCall(
                    "Begin ? := CRM_SYS_AUTH.user_logout(?); End;"
                  );
          stmt.registerOutParameter(1, Types.INTEGER);  // o_Result
          stmt.setString(2, p_login_id);
          
          stmt.execute();
          uid = stmt.getInt(1);

        stmt.close();
        return uid;
    }



     public static int LdapLogon(Connection  conn,
                                String p_login,
                                String p_pass,
                                String p_user_ip ) throws SQLException {
     CallableStatement stmt = null;
     int uid = 0;
     int LDAP_err_code = 0;

     LDAP_err_code = LdapAuth(p_login,p_pass);

     stmt =  conn.prepareCall(
                    "Begin ? := CRM_SYS_AUTH.user_ldap_logon(?, ?, ?, ?); End;"
                  );
          stmt.registerOutParameter(1, Types.INTEGER);  // o_Result
          stmt.setString(2, p_login);//login
          stmt.setString(3, p_pass);//pass
          stmt.setString(4, p_user_ip);//ip
          stmt.setInt(5, LDAP_err_code);//ip
          stmt.execute();

          uid = stmt.getInt(1);

        stmt.close();
        return uid;
    }


    public static int  LdapAuth(String p_login, String p_password){
        LdapContext ctx = null;
        int result = 0;
        try{
            Hashtable env = new Hashtable();
            env.put(Context.INITIAL_CONTEXT_FACTORY,
                    "com.sun.jndi.ldap.LdapCtxFactory");
            // env.put(Context.SECURITY_AUTHENTICATION, "Simple");
            //it can be <domain\\userid> something that you use for windows login
            //it can also be
            env.put(Context.SECURITY_PRINCIPAL, p_login+"@paulsyard");
            env.put(Context.SECURITY_CREDENTIALS, p_password);
            //in following property we specify ldap protocol and connection url.
            //generally the port is 389
            env.put(Context.PROVIDER_URL, "ldap://192.168.20.3:389");
            //env.put(Context.SECURITY_AUTHENTICATION, "ssl");
             ctx = new InitialLdapContext(env, null);

            			// Print all attributes of the name in namespace

          System.out.println("LDAP Connection: succes");
          result = 1;
        } catch (AuthenticationException ae){
          System.out.println("LDAP Connection: Auth faild");
          result = -1;

        }
         catch (CommunicationException ce){
            System.out.println("LDAP Connection: Server unrichable");
            result = -2;

         }catch (NoPermissionException npe){
            System.out.println("LDAP Connection: No permission");
            result = -3;

         }

        catch(NamingException nex){
            System.out.println("LDAP Connection: FAILED");
            System.out.println("error text : "+nex.toString());
            result = -4;
            //nex.printStackTrace();
        }
        return result;
    }





}
