<%-- 
    Document   : index
    Created on : 27.09.2010, 12:09:11
    Author     : kxxb
Эта страница доступна долько пользователям из групп

1	Admins	Максимальный уровень доступа
--%>


<%@ page import="java.sql.Types, oracle.jdbc.OracleConnection, oracle.jdbc.OracleResultSet, java.sql.*, oracle.jdbc.OracleCallableStatement"
contentType="text/html;charset=UTF-8"  %>
<jsp:useBean id="db_conn" class="Leela.db.Conn" scope="session" />
<jsp:useBean id="Lela_core" class="Leela.core.user_managment" scope="session" />
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN"
"http://www.w3.org/TR/html4/loose.dtd">

<html>
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
        <title>Заявки административный доступ</title>

        <!-- ** CSS ** -->
        <!-- base library -->

        <link rel="stylesheet" type="text/css" href="../js/ext-3.2.1/resources/css/ext-all.css" />


        <!-- overrides to base library -->


        <!-- ** Javascript ** -->
        <!-- base library -->
        <script type="text/javascript" src="../js/ext-3.2.1/adapter/ext/ext-base.js"></script>
        <script type="text/javascript" src="../js/ext-3.2.1/ext-all-debug.js"></script>
        <script type="text/javascript" src="MyjsExt/GridRequestOther.js"></script>


    <!-- overrides to base library -->

    <link rel="stylesheet" type="text/css" href="ux/css/Portal.css" />
    <link rel="stylesheet" type="text/css" href="ux/css/GroupTab.css" />

    <!-- page specific -->
    <style type="text/css">
        /* styles for iconCls */
        .x-icon-tickets {
            background-image: url('img/tickets.png');
        }
        .x-icon-subscriptions {
            background-image: url('img/subscriptions.png');
        }
        .x-icon-users {
            background-image: url('img/group.png');
        }
        .x-icon-templates {
            background-image: url('img/templates.png');
        }
    </style>


    <!-- overrides to base library -->

    <!-- extensions -->
    <script type="text/javascript" src="ux/GroupTabPanel.js"></script>
    <script type="text/javascript" src="ux/GroupTab.js"></script>

    <script type="text/javascript" src="ux/Portal.js"></script>
    <script type="text/javascript" src="ux/PortalColumn.js"></script>
    <script type="text/javascript" src="ux/Portlet.js"></script>

    <!-- page specific -->
    <script type="text/javascript" src="shared/examples.js"></script>
    <script type="text/javascript" src="portal/sample-grid.js"></script>
    <script type="text/javascript" src="portal/user-grid_1.js"></script>
    <script type="text/javascript" src="portal/user-grid_1_1.js"></script>


    <script type="text/javascript" src="grouptabs.js"></script>

</head>
<body></body>
</html>