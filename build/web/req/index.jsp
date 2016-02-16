<%-- 
    Document   : index
    Created on : 27.09.2010, 12:09:11
    Author     : kxxb
��� �������� �������� ������ ������������� �� �����

1	Admins	������������ ������� �������
--%>


<%@ page import="java.sql.Types, oracle.jdbc.OracleConnection, oracle.jdbc.OracleResultSet, java.sql.*, oracle.jdbc.OracleCallableStatement"
contentType="text/html;charset=windows-1251" pageEncoding="Cp1251"  %>
<jsp:useBean id="db_conn" class="Leela.db.Conn" scope="session" />
<jsp:useBean id="Lela_core" class="Leela.core.user_managment" scope="session" />
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN"
"http://www.w3.org/TR/html4/loose.dtd">

<%
OracleConnection conn = db_conn.GetConnect();

try{
if (Lela_core.users_sys_queit_login(conn, session.getId(), request.getRemoteAddr()) == 1) {
  int g_user_id = Lela_core.get_users_by_ip(conn, request.getRemoteAddr());
//if (Lela_core.Check_User_Session(conn, session.getId(), g_user_id, g_login_id)==1){
 int group_id = Lela_core.Check_Users_Group(conn, g_user_id);
 int dep_id = Lela_core.get_user_depid_by_ip(conn, request.getRemoteAddr());





%>
<html>
    <head>
        <meta http-equiv="Content-Type" >
        <title>������</title>

        <!-- ** CSS ** -->
        <!-- base library -->

        <link rel="stylesheet" type="text/css" href="../js/ext-3.2.1/resources/css/ext-all.css" />
        <style type="text/css">
            /* This gives toolbar buttons the regular button style */

/* end block */  


            /*
            0  ��������� Green letters
            1  ������� (� ��������)
            2  �������� Green letters
            3  �������� Green letters 
            4  �����     Green letters
            5  ������� ����� Dark Purple
            6  ������� ����� Dark Blue 
            7  ������� ��������� Light Blue
            8  ������� �� ���������� Blue
            9  ������� �����������  White, Darker 35%
            
            Red	������ ����������
            Yellow	������ ����������������
            Black, White letters	������� �� ��������
 **/

            .grid-row-Red {
                background-color:#ff8c69 !important;
            }
            .grid-row-Green {
                background-color:#3caa3c !important;
            }
            .grid-row-Dark-Purple {
                background-color:#990066 !important;
                color: #ffffff;
             }
            .grid-row-Green-Letters {
                background-color:#ffffff !important;
                color: #3caa3c;
             }

             .grid-row-Dark-Blue {
                background-color:#003399 !important;
                color: #ffffff;
             }

             .grid-row-Light-Blue {
                background-color:#4682b4 !important;
                color: #000000;
             }

             .grid-row-Blue {
                background-color:#52a0e1 !important;
                
             }

             .grid-row-White-Darker {
                background-color:#99958c !important;
                
             }

             .grid-row-Yellow {
                background-color:#fbec5d !important;
             }

             .grid-row-Black-White-letters {
                background-color:#000000 !important;
                color: #ffffff;
             }



            .x-grid3-row-selected {
               background-color: #fde910 !important;
               color: #000000;
               font-style:italic;

            }

        </style>



        <!-- overrides to base library -->


        <!-- ** Javascript ** -->
        <!-- base library -->
        <script type="text/javascript" src="../js/ext-3.2.1/adapter/ext/ext-base.js"></script>
        <script type="text/javascript" src="../js/ext-3.2.1/ext-all-debug.js"></script>
        <script type="text/javascript" src="MyjsExt/MyApplications.js"></script>
        
        

    </head>
    <script type="text/javascript">
    
    
    var ReqGridDataStore;
    var ReqGridColumnModel;
    var ReqGridListingEditorGrid;
    var ReqGridListingWindow;
    var ReqId = '-7';
    var gUserDepId = <%=dep_id%>
    var gSearchMode = '-7';

Ext.onReady(function(){
    /*���� �������� ������**/

function displayFormFile(){
    //Ext.MessageBox.alert('Uh uh...','��� � ����');
    if (ReqId=='-7') {
                    Ext.MessageBox.alert('��������', '�������� ������');
                    return;
                }
  if(!FileUploadWindow.isVisible()){
        FileUploadWindow.show();
      } else {
        FileUploadWindow.toFront();
      }
  }


    var  newPic = new Ext.form.TextField({xtype: 'textfield',
	        fieldLabel: '����',
	        labelSeparator: '',
	        name: 'newPic',
	        id:'newPic',
	        style:'width: 300px',
	        inputType: 'file',
	        allowBlank: false});

    var pictUploadForm = new Ext.FormPanel({
        frame: true,
        title: '�������� ����',
        bodyStyle: 'padding:5px',
        width: 550,
        layout: 'column',
        //url: '../frm/req/AddFiles/upload_f.jsp',
        url: 'upload_f.jsp',
        method:'GET',
        enctype:'multipart/form-data',
        fileUpload: true,
        items: [newPic],

        buttons: [{
            text: '��������� ����',
            handler: function() {

            var theForm = pictUploadForm.getForm();
            var connFile1 = new Ext.data.Connection();
                if (!theForm.isValid()) {
                    Ext.MessageBox.alert('��������', '�������� ����');
                    return;
                }

                theForm.submit({
                params: {
                 request_id:      ReqId},
                 success: function(){
                     Ext.MessageBox.alert('��������','���� �������� � ������ '+ ReqId);
                       connFile1.request({
                          url: '../stores/req/getter_files_name.jsp',
                          params: {
                             reqid: ReqId
                          },
                          success: function(resp,opt) {
                               var Com = resp.responseText
                               FileTpl.overwrite(FilePanel.body, {Name:Com});
                               newPic.setValue('');

                          },
                          failure: function(resp,opt) {
                             Ext.Msg.alert('Error','������ �����');
                          }
                        })

              },
              failure: function(response){
                 var result=response.responseText;
                 Ext.MessageBox.alert('��������','������, ���� �� �������� ');

              }
             })

            }
        }, {
            text: 'Cancel',
            handler: function(){
                        // because of the global vars, we can only
                        // instantiate one window... so let's just hide it.

                        FileUploadWindow.hide();
                      }

        }]
    });





  FileUploadWindow = new Ext.Window({
      id: 'FileUploadWindow',
      title: 'Update build',
      closable:true,
      iconCls:'win',
      closeAction: "hide",
      width: 550,
      height: 300,
      plain:true,
      layout: 'fit',
      items: pictUploadForm
    });

/*����� ����� �������� ������*/
/*
**include file="../frm/req/AddFiles/FilesUpload.js" 
*/


    <%@include file="../stores/req/Store.js" %>
    <%@include file="../panels/req/allPanels.js" %>
    <%@include file="../frm/req/CreateRequest/createReq.js" %>

    
    
    <%@include file="../frm/req/Filtr/filtr.js" %>


  <%@include file="../frm/req/AddComment/AddComents.js" %>
  
  <%@include file="../grids/req/ReqControl/ReqControlGroupGrid.js" %>
  <%@include file="../grids/req/AllReqGrid/AllDepReqGroupGrid.js" %>
  <%@include file="../grids/req/MyReqGrid/MyReqGroupGrid.js" %>
  <%@include file="../grids/req/MyReqGrid/MyReqGridListingEditorGrid.js" %>
  

  <%@include file="../grids/req/ForMeReqGrid/ForMeGrid.js" %>
  <%@include file="../grids/req/RespDepGrid/RespGrid.js" %>
  
  
   Ext.state.Manager.setProvider(new Ext.state.CookieProvider());
   function onMainClick(item){
               window.location = '../portal.jsp';
           }
           function onTemplateClick(item){
               window.location = 'UrTemplates.jsp';
           }
           function onExitClick(item){
               window.location = '../logout.jsp';
           }
           
            var tb_apl_comment = new Ext.Toolbar();
            var tb_resp_comment = new Ext.Toolbar();

            var tb = new Ext.Toolbar();
            var menu = new Ext.menu.Menu({
                    id: 'mainMenu',
                    style: {
                        overflow: 'visible'     // For the Combo popup
                    },
                    items: [
                        {
                            text: '�������',
                            handler: onMainClick

                        },
                        {
                            text: '�������',
                            handler: onTemplateClick

                        }
                    ]
                });


        tb.add({
            text:'������',
            iconCls: 'bmenu',  // <-- icon
            menu: menu  // assign menu by instance
        });




<% if (group_id == 1){ %>
    ///administration level
            var viewport = new Ext.Viewport({
                layout: 'border',
                renderTo: Ext.getBody(),
                items: [{
                        region: 'north',
                        xtype: 'panel',
                        height:28,
                        tbar:tb
                    },
                    {
                        region: 'center',
                        items: [{
                                region: 'North',
                                height: 300,
                                split: true,
                                xtype: 'tabpanel',
                                activeTab: 0,
                                items: [
                                     //  ReqGridListingEditorGrid,
                                     //  MyReqGridListingEditorGrid
                                     AllDepReqGroupGrid,
                                     MyReqGroupGrid,
                                     ReqControlGroupGrid
                                      // ForMeReqGridListingEditorGrid

                                ]

                            },
                            AdditionalPanel
                        ]
                    },
                     {
                         region: 'east'
                         ,xtype: 'panel'
                         ,split: true
                         ,width: 255
                         ,collapsible: true
                         ,collapsed : true
                         ,collapseMode: 'mini'
                         ,   items:[ProfilePanel]

                     },
                    {
                        region: 'south',
                        xtype: 'panel',
                        height: 200,
                        layout: 'border',
                        border: false,
                        items:  [ p,
                            {
                                region: 'center',
                                xtype: 'tabpanel',
                                activeTab: 0,
                                items: [
                                    CommentPanel,
                                    FilePanel
                                ]

                            }

                        ]
                    }

                ]
            });
  <%}else if (group_id == 4 | group_id == 5){%>
      //applicant level

            var viewport = new Ext.Viewport({
                layout: 'border',
                renderTo: Ext.getBody(),
                items: [{
                        region: 'north',
                        xtype: 'panel',
                        height:28,
                        tbar:tb
                    },
                    {
                        region: 'center',
                        items: [{
                                region: 'North',
                                height: 400,
                                split: true,
                                xtype: 'tabpanel',
                                activeTab: 0,
                                items: [
                  <%if (group_id == 5){%>
                           ReqGridListingEditorGrid,
                   <%}%>
                                       MyReqGroupGrid
                                       //MyReqGridListingEditorGrid

                                ]

                            },
                            AdditionalPanel
                            /*{
                                xtype: 'panel',
                                title: '�������������� ��������',
                                html : '<b>������ :</b> ����� ���������� �������� ��������� <br><b>������ :</b> ������� �������� <br><b>������ :</b> �������<br> <br>'
                            }*/
                        ]
                    },
                    {
                         region: 'east'
                         ,xtype: 'panel'
                         ,split: true
                         ,width: 255
                         ,collapsible: true
                         ,collapsed:true
                         ,collapseMode: 'mini'
                         ,         items:[ProfilePanel]

                     },
                    {
                        region: 'south',
                        xtype: 'panel',
                        height: 200,
                        layout: 'border',
                        border: false,
                        items:  [ p,

                          /*  {
                                title: '�������',
                                html : '��� ������� ������',
                                width : 500,
                                region: 'west'
                            },*/

                            {
                                region: 'center',
                                xtype: 'tabpanel',
                                activeTab: 0,
                                items: [

                                    CommentPanel,
                                    FilePanel
                                ]

                            }

                        ]
                    }




                ]
            });
  <%}
  else if (group_id == 2 | group_id == 3){%>
//responsible level
  var viewport = new Ext.Viewport({
                layout: 'border',
                renderTo: Ext.getBody(),
                items: [{
                        region: 'north',
                        xtype: 'panel',
                        height:28,
                        tbar:tb
                    },
                    {
                        region: 'center',
                        items: [{
                                region: 'North',
                                split: true,
                                //height:400,
                                xtype: 'tabpanel',
                                activeTab: 0,
                                items: [
                                        
                                           
                                             ReqGridListingEditorGrid,
                                             AdditionalPanel,
                                             /*{
                                                region: 'south',
                                                xtype: 'panel',
                                                height: 300,
                                                layout: 'border',
                                                border: false,
                                                items:  [ p,
                                                    {
                                                        region: 'center',
                                                        xtype: 'tabpanel',
                                                        activeTab: 0,
                                                        items: [
                                                            //CommentPanel,
                                                           {xtype: 'panel',
                                                            title:'���������� ���������',
                                                            tbar: [
                                                                 '-',
                                                                {
                                                              text: '�������� ����������',
                                                              
                                                              tooltip: '�������� ����������'
                                                             }, '-',
                                                             {
                                                              text: '������� ����������',
                                                              tooltip: '������� ����������'
                                                             },'-'
                                                            ],
                                                            html:'15.02.2011 15:26:27 -���������� ��������� -������ ����'
                                                           },
                                                           {xtype: 'panel',
                                                            title:'���������� �����������',
                                     tbar: [ '-',{
                                                              text: '�������� ����������',
                                                              tooltip: '�������� ����������'
                                },'-',
                                                             {
                                                              text: '������� ����������',
                                                              tooltip: '������� ����������'
                                                             },'-'
                                                            ],
                                                            html:'15.02.2011 18:45:21 - ���������� ����������� -������ �������'
                                                           },
                                                            FilePanel
                                                        ]

                                                    }

                                                ]
                                            }
                                            ]
                                        },*/
                                       /*
                                        {
                                            region: 'north',
                                            xtype: 'panel',
                                            title:'��� ������',
                                            html:'<br>&nbsp;&nbsp;&nbsp;�  ���� �������  ����� �������������� ������, � ������� ������������ ������� �'
                                        },
                                        {
                                            region: 'north',
                                            xtype: 'panel',
                                            title:'������',
                                            html:'<br>&nbsp;&nbsp;&nbsp;������� ����������� ��� ������'
                                        },
                                        {
                                            region: 'north',
                                            xtype: 'panel',
                                            title:'�������� �� ��������',
                                            html:'<br>&nbsp;&nbsp;&nbsp;��� ������� �������� ������������ ����� �������������(����������� �����, ����������� ��������  � �������� ����������).  '
                                        },
                                        
                                        {
                                            region: 'north',
                                            xtype: 'panel',
                                            title:'������ � ����� IT',
                                            html:'<br>&nbsp;&nbsp;&nbsp;������ �������� ���� � ����� IT'
                                        },
                                        {
                                            region: 'north',
                                            xtype: 'panel',
                                            title:'������ � ���������� �����',
                                            html:'<br>&nbsp;&nbsp;&nbsp;������ �������� ���� � ���������� �����'
                                        },
                                        {
                                            region: 'north',
                                            xtype:'panel',
                                            title:'������ � ����� ���������� ',
                                            html:'<br>&nbsp;&nbsp;&nbsp;������ �������� ���� � ����� ����������'
                                        }  
                                        */
                                       
                                     ReqGridListingEditorGrid,
                                        MyReqGroupGrid,
                                        ForMeReqGridListingEditorGrid
                                ]

                            }
                            //AdditionalPanel
                        ]
                    },
                                {
                         region: 'east'
                         ,xtype: 'panel'
                         ,split: true
                         ,width: 255
                         ,collapsible: true
                         ,collapsed:true
                         ,collapseMode: 'mini'
                         ,         items:[ProfilePanel]

                     },
                    {
                        region: 'south',
                        xtype: 'panel',
                        height: 200,
                        layout: 'border',
                        border: false,
                        items:  [ p,

                          /*  {
                                title: '�������',
                                html : '��� ������� ������',
                                width : 500,
                                region: 'west'
                            },*/

                            {
                                region: 'center',
                                xtype: 'tabpanel',
                                activeTab: 0,
                                items: [

                                    CommentPanel,
                                    FilePanel
                                ]

                            }

                        ]
                    }
                    

                ]
            });





     //resp
  <%} //eof group_id%>
    });
    </script>
    <body>

    
    <body ><font face="Verdana"></font>
    </body>
<%
} else {%>
<html>
     <body>
              <script>
                parent.location = '../index.jsp';
              </script>
     </body>
     </html>
      <%}

} catch (Exception e) {
  %>
  <html>
             <body>
              <script>
                parent.location = '../index.jsp';
              </script>
             </body>
             </html>
<%
}

%>

