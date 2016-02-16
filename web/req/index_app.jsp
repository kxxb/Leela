<%-- 
    Document   : index_app
    Created on : 22.03.2011, 11:32:24
    Author     : kxxb
--%>

<%@page contentType="text/html" pageEncoding="UTF-8"%>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN"
   "http://www.w3.org/TR/html4/loose.dtd">


<html>
    <head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
        <title>kxxb & Saki's test</title>

        <!-- ** CSS ** -->
        <!-- base library -->

        <link rel="stylesheet" type="text/css" href="../js/ext-3.2.1/resources/css/ext-all.css" />
        <link rel="stylesheet" type="text/css" href="../js/ext-3.2.1/resources/shared/icons/silk.css" />


        <style type="text/css">
            /* This gives toolbar buttons the regular button style */

/* end block */


            /*
            0  Выполнено Green letters
            1  Принято (в процессе)
            2  Отказано Green letters
            3  Отложено Green letters
            4  Снято     Green letters
            5  Договор готов Dark Purple
            6  Договор выдан Dark Blue
            7  Договор отправлен Light Blue
            8  Договор на подписании Blue
            9  Договор подготовлен  White, Darker 35%

            Red	заявка просрочена
            Yellow	заявка закомментирована
            Black, White letters	договор на контроле
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


        <!-- My extensions -->
        <script type="text/javascript" src="../stores/req/Store.js"></script>
        <script type="text/javascript" src="../grids/req/AllReqITGrid/AllITColumns.js"></script>
        <script type="text/javascript" src="../grids/req/AllReqITGrid/AllITColumns_1.js"></script>
        
        <script type="text/javascript" src="req_app.js"></script>




        
    </head>
    <body>
        <h1>Подгружаю данные!</h1>
    </body>
</html>
