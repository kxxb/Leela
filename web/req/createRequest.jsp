<%--
    Document   : main
    Created on : 21.06.2010, 13:46:25
    Author     : shavrak.ka
--%>

<%@ page import="java.sql.Types, oracle.jdbc.OracleConnection,
oracle.jdbc.OracleResultSet,
java.sql.*,
oracle.jdbc.OracleCallableStatement"
  contentType="text/html;charset=windows-1251"
%>

<jsp:useBean id="db_conn" class="Leela.db.Conn" scope="session" />
<jsp:useBean id="utl" class="Leela.core.Util" scope="session" />
<jsp:useBean id="Lela_core" class="Leela.core.user_managment" scope="session" />
    <%
    OracleConnection conn = db_conn.GetConnect();
    OracleCallableStatement stmt = null;
    OracleCallableStatement menu_stmt = null;
    OracleCallableStatement stmt_acces = null;
    OracleResultSet menu_rs = null;

    String v_session ="";
    String s_error_text ="";
    int g_user_id = Lela_core.get_users_by_ip(conn, request.getRemoteAddr());
    String g_login_id ="";
    String g_base_url ="";

    int v_show_coment = 0;
    String v_request_id = "";

    try{
     //   g_user_id = session.getAttribute("g_user_id").toString();
        g_login_id = session.getAttribute("g_login_id").toString();
        g_base_url = session.getAttribute("g_base_url").toString();
        v_session = session.getId();
     } catch(Exception e) {
           // error catcher
         s_error_text = e.toString();
     }

%>

<html>
<head>
<title>
 Создать заявку
</title>
    <meta http-equiv="Content-Type" contentType="text/html; charset=windows-1251" />
    <link type="text/css" href="../js/jQuery/development-bundle/themes/base/jquery.ui.all.css" rel="stylesheet" />
    <script type="text/javascript" src="../js/jQuery/development-bundle/jquery-1.4.2.js"></script>
    <!--
    <script type="text/javascript" src="../js/jQuery/development-bundle/ui/jquery.ui.autocomplete.js"></script>

    
    -->
    <script type="text/javascript" src="../js/jQuery/development-bundle/ui/jquery.ui.position.js"></script>
    <script type="text/javascript" src="../js/jQuery/development-bundle/ui/jquery.ui.core.js"></script>
    <script type="text/javascript" src="../js/jQuery/development-bundle/ui/jquery.ui.widget.js"></script>



    <script type="text/javascript" src="../js/jQuery/development-bundle/ui/jquery.ui.datepicker.js"></script>
    <script type="text/javascript" src="../js/jQuery/js/jquery.autocomplete.js"></script>



	<script type="text/javascript">
	function firstCondition(f) {
    // Если поставлен флажок, снимаем блокирование кнопки
      if (f.cbFirstCondition.checked) {
	  f.txtFirst.disabled = 1;
	  f.txtFirst.value = 'Оплата  Вознаграждения Компании производиться после получения продавцом/арендатором первого платежа по заключенному договору отчуждения/аренды';
      f.txtFirsthd.value = 'Оплата  Вознаграждения Компании производиться после получения продавцом или арендатором первого платежа по заключенному договору отчуждения или аренды';
	  } else {
		  f.txtFirst.disabled = 0;
		   f.txtFirst.value ="";

		}
	}

	function secondCondition(f) {
    // Если поставлен флажок, снимаем блокирование кнопки
      if (f.cbSecondCondition.checked) {
	  f.txtSecond.disabled = 1;
	  f.txtSecond.value = 'Услуга считается оказанной Компанией после заключения клиентами 	договора отчуждения/договора аренды' ;
      f.txtSecondhd.value = 'Услуга считается оказанной Компанией после заключения клиентами договора отчуждения или договора аренды' ;
	  } else {
		  f.txtSecond.disabled = 0;
		  f.txtSecond.value ="";

		}
	}

	function checkConditions(f) {
	   if ( (f.txtFirst.value.length > 0 | f.cbFirstCondition.checked) &
	      (f.cbSecondCondition.checked  | f.txtSecond.value.length > 0) )
	    {return "";}
		else
	   {
		 return "Уважаемый заявитель, Вами не были указаны обязательные условия, для заключения договора оказания услуг, которые, в соответствии с распоряжением ген. Директора № 127  от 8 апреля 2010 года, должны быть согласованы Вами, для подачи заявки в юридический отдел. "+
				 "При  необходимости, с порядком согласования, Вы можете ознакомиться в выше указанном распоряжении  \n";
		   }

	}

	function checkDt(f){
	  if (f.dt_exec.value.length == 0)
		{ return "Не указана дата \n";}
		  else return "";
	 }

	 function checkObject(f){
	  if (f.cbObject.value.length == 0)
    	  { return "Не указан объект \n";}
		    else return "";
	 }

	 function checkClient(f){
	  if ((f.cbClient.value.length == 0) )
	   { return "Не указаны сведенья о клиенте \n";}
	     else return "";
	 }

	 function checkCost(f){

	  if ((f.txCost.value.length > 0) &
  	      (document.getElementById('radio1').checked == false) & (document.getElementById('radio2').checked == false)) { return "Вы не указали, согласованный Вами порядок расчета НДС с клиентом. Выберите согласованный порядок расчета НДС. \n";}
  		 else {return "";}

	 }

	function  CancelReq() {
        parent.location = 'index.jsp';
    }

        function go(i_page)
            {
            switch (i_page)
            {
             case 0: parent.location = 'createRequest.jsp?item_id=1&dep=0';
              break;
             case 1: parent.location = 'createRequest.jsp?item_id=1&dep=1';
              break;
             case 2: parent.location = 'createRequest.jsp?item_id=1&dep=2&contr=0';
             break;
             case 3: parent.location = 'createRequest.jsp?item_id=1&dep=3';
              break;
            }
            }

          function goContr(i_page)
            {

            if (i_page == 1) {
                parent.location = 'createRequest.jsp?item_id=1&dep=2&contr=1';
            } else {
                parent.location = 'createRequest.jsp?item_id=1&dep=2&contr='+i_page;
                //parent.location = 'createRequest.jsp?item_id=1&dep=2&contr=1';
            }
            /*
            switch (i_page)
            {
             case 1: parent.location = 'createRequest.jsp?item_id=1&dep=2&contr=1';
              break;
             case 2: parent.location = 'createRequest.jsp?item_id=1&dep=2&contr=2';
            }
            */
            }



	</script>
</head>
<body>
 <script type="text/javascript">
	$(function(){

     $.datepicker.setDefaults(
	        $.extend($.datepicker.regional["ru"])
	  );
	  $("#datepicker").datepicker({
	    minDate: "-1"
	    //maxDate: "+1m +1w +3d"
	  });



        function liFormat (row, i, num) {
            var result = row[0];
            return result;
        }
        function selectItem(li) {
            if( li == null ) var sValue = 'А ничего не выбрано!';
            if( !!li.extra ) var sValue = li.extra[2];
            else var sValue = li.selectValue;
            alert("Выбрана запись с ID: " + sValue);
        }

        // --- Автозаполнение2 ---
        $("#txObject").autocomplete( 
        {source: function( request, response ) {
				$.ajax({
					url: "objectsGetter.jsp",
					dataType: "json",
					data: {
						featureClass: "P",
						style: "full",
						maxRows: 12,
						name_startsWith: request.q
					},
					success: function( data ) {
						response( $.map( data.results, function( item ) {
							return {
								value: item.name 							}
						}));
					}
				});
			},
            //delay:10,
            minLength: 2,
            open: function() {
				$( this ).removeClass( "ui-corner-all" ).addClass( "ui-corner-top" );
			},
			close: function() {
				$( this ).removeClass( "ui-corner-top" ).addClass( "ui-corner-all" );
			}
            /*minChars:1,
            matchSubset:1
            autoFill:true,
            matchContains:1,
            cacheLength:10,
            selectFirst:true,
            formatItem:liFormat,
            maxItemsToShow:10*/

        });


     // --- Автозаполнение2 ---
        $("#txClient").autocomplete("clientGetter.jsp", {
            delay:10,
            minChars:1,
            matchSubset:1,
            autoFill:true,
            matchContains:1,
            cacheLength:10,
            selectFirst:true,
            formatItem:liFormat,
            maxItemsToShow:10

        });


    $.fn.clearTxt = function() {
	    return this.each(function(){
	        this.value = "";
	      
	    });
	  }


 // заполняем select
	  $.fn.fillTxt = function(dataArray) {
	    return this.clearTxt().each(function(){
             //currentTxt.value  'data';
	      
        });
        alert (dataArray);
        this.value = dataArray;
      }


    
	function adjustReqType(){
	  var reqTypeid = $('#reqType').val();
	  var tmpTxtReqDesc = $('#txtReqDesc');
      var reqTypeDesc = $('#reqTypeDesc');
	  if(reqTypeid.length == 0) {
          
	    //tmpTxtReqDesc.clearTxt();
        txtReqDesc.value = "";
	    //adjustModel();
	  } else {
	    $.getJSON(
	      'reqtypeGetter.jsp',
	      {reqTypeid:reqTypeid},
	      function(data) {
              //alert (data);
	          //tmpTxtReqDesc.fillTxt(data);
              f.txtReqDesc.value = "";
              f.txtReqDesc.value = data;

             f.reqTypeDesc.value = "";
             f.reqTypeDesc.value = data;
	    });
	  }
	};


	$('#reqType').change(function(){
      adjustReqType();
	}).change();

	});
	</script>



    <style type="text/css">
* {
    margin:0;
    padding:0;
}
html, body {

    font-family: "Trebuchet MS", Tahoma, Verdana, Arial, Helvetica, sans-serif;
    font-size: 8pt;
}
.ac_results {
	padding: 0px;
	border: 1px solid WindowFrame;
	background-color: Window;
	overflow: hidden;
}

.ac_results ul {
	width: 100%;
	list-style-position: outside;
	list-style: none;
	padding: 0;
	margin: 0;
}

.ac_results iframe {
	display:none;/*sorry for IE5*/
	display/**/:block;/*sorry for IE5*/
	position:absolute;
	top:0;
	left:0;
	z-index:-1;
	filter:mask();
	width:3000px;
	height:3000px;
}

.ac_results li {
	position:relative;
    margin: 0px;
	padding: 2px 5px;
	cursor: pointer;
	display: block;
	width: 100%;
	font: menu;
	font-size: 12px;
	overflow: hidden;
}

.ac_loading {
	background : Window url('autocomplete_indicator.gif') right center no-repeat;
}

.ac_over {
	background-color: Highlight;
	color: HighlightText;
}

.qnt {
  position:absolute;
  top:2px;
  right:10px;
  font-size:0.8em;
  color:#26A908;
}
</style>

     <center>

	 <form name="f" action="save_req.jsp" Method="POST">
	 <table  cellpadding="0" cellspacing="0" width="800" border="0">
	 <tr>
     <%
      //if  (!v_session.equals("")){
          try{

          
          String  v_dep = utl.nvl(request.getParameter("dep"), "0");
            

/*
          stmt = (OracleCallableStatement) conn.prepareCall(
            "Begin ? := tl_sys_users.check_user_session(:session_id, :user_id, :login_id); End;"
          );
          stmt.registerOutParameter(1, Types.INTEGER);  // o_Result
          stmt.setStringAtName("session_id", v_session);
          stmt.setIntAtName("user_id", g_user_id);
          stmt.setStringAtName("login_id", g_login_id);
          stmt.execute();
          */
          //int res = stmt.getInt(1);
          int res = 1;


           if (res > 0  ) {

              
              int res_acces = 1;

              if (res_acces > 0) {


              String v_deps_sql = " Select * From tl_departments t where t.id in (1,2,3) ";

              PreparedStatement pstmt = conn.prepareStatement(v_deps_sql);
              ResultSet rs_dep =  pstmt.executeQuery();

        %>

		<td colspan="2">&nbsp;
		<b>Отдел</b><br>
			<select name="respDep" onChange="go(parseInt(this.value));">
                 <option value ='0'> Выберите отдел
                 <% while(rs_dep.next()){
                 if (rs_dep.getString(1).equals(v_dep)){
                     %>
                        <option selected value='<%=rs_dep.getString(1)%>' ><%=rs_dep.getString(2)%>
                    <%
                     } else {
                     %>

                    <option value='<%=rs_dep.getString(1)%>' ><%=rs_dep.getString(2)%>
                 <%}
                 }    %>
             </select>
		</td>
	 </tr>

<%if (v_dep.equals("0")) {
    %>
<tr>
		<td align="center"><fieldset>

		<input type="reset" value="Отмена" onClick="CancelReq()"  >
		</fieldset>
		</td>
	</tr>
 </table>
	 </form>
    </center>
<%} else if (v_dep.equals("1")) {    %>
<!--IT-->
 <script >
     function checkAll(f){
	  var returnText ="";
	 // returnText = checkConditions(f);
	  returnText = returnText +"\n"+ checkDt(f);
	  //returnText = returnText +"\n"+ checkObject(f);
	  //returnText = returnText +"\n"+ checkClient(f);
	  //returnText = returnText +"\n"+ checkCost(f);

      if  (returnText.length > 15  ){
	    alert (returnText );
	   } else {
	    //alert ("all right");
	    f.submit();
		}
	 }
 </script>
	<tr>
		<td colspan="2">
		<fieldset>
			<legend><b>Заявка</b></legend>


		<table>
			 <tr>
				<td>
					<b>К какой дате</b><br>
					<input name="dt_exec" id="datepicker" type="text" />
				</td>
			 </tr>
			 <tr>
				<td>
				<b>Тип заявки</b><br>
                    <%
                     String v_req_type_sql = " select t.id, t.type_name  from tl_request_type t Where t.dep_id = nvl(?, 1) ";

                      PreparedStatement pstmt_req_type = conn.prepareStatement(v_req_type_sql);
                      pstmt_req_type.setString(1, v_dep);
                      ResultSet rs_req_type =  pstmt_req_type.executeQuery();

        %>

                <select id="reqType" name="reqType" width="100%" >
				  <option selected value="0">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;----------------------------------------------------Выберите тип заявки-----------------------------------------------------&nbsp;&nbsp;&nbsp;&nbsp;</option>
                     <% while(rs_req_type.next()){

                         %>
                            <option  value='<%=rs_req_type.getString(1)%>' ><%=rs_req_type.getString(2)%>
                        <% }
                               %>
                 </select>
 				<input name="reqTypeDesc" id="reqTypeDesc" type="hidden" />
				</td>
			 </tr>
			 <tr>
				<td>
				<b>Описание</b><br>
					<textarea cols="75" id="txtReqDesc" name="txtReqDesc" rows="10">
					</textarea>
				</td>
			</tr>
			 </table>
		 </fieldset>
	 </td>
	 </tr>

 <tr>
		<td align="center"><fieldset>
		<input type="button" value="Сохранить"  onClick="checkAll(this.form)" >  &nbsp;&nbsp;&nbsp;
		<input type="reset" value="Отмена" onClick="CancelReq()"  >
		</fieldset>
		</td>
	</tr>
	 </table>
	 </form>
    </center>
     <%
} else if (v_dep.equals("2")) {    %>


    <tr>
	    <td colspan="2">&nbsp;</td>
	</tr>
	<tr>
	    <td colspan="2">
		<fieldset>
			<legend><b>Договор</b></legend>
			<b>Договор</b><br>
                <%


            String v_contr_type = "0";
            try { v_contr_type = request.getParameter("contr");
                } catch (Exception e) { v_contr_type = "0"; }

                  String v_contr_sql = "select t.id, t.template_name from tl_contract_template t where  t.id <> 0";

                  PreparedStatement pstmt_contr = conn.prepareStatement(v_contr_sql);
                  ResultSet rs_contr =  pstmt_contr.executeQuery();

        %>

			<select name="slContract" onChange="goContr(parseInt(this.value));">
                 <option value ='0'> Выберите договор
                 <% while(rs_contr.next()){
                 if (rs_contr.getString(1).equals(v_contr_type)){
                     %>
                        <option selected value='<%=rs_contr.getString(1)%>' ><%=rs_contr.getString(2)%>
                    <%
                     } else {
                     %>

                    <option value='<%=rs_contr.getString(1)%>' ><%=rs_contr.getString(2)%>
                 <%}
                 }          %>
             </select>


		</fieldset>
		</td>
	 </tr>

  <%if ( v_contr_type.equals("0")) {
                          %>

   <tr>
		<td align="center"><fieldset>

		<input type="reset" value="Отмена" onClick="CancelReq()"  >
		</fieldset>
		</td>
	</tr>
 </table>
	 </form>
    </center>

<% } else  {
    
     if (!v_contr_type.equals("1")  ) {
%>

	 <tr>
		<td colspan="2" >
            <script>
                 function checkAll(f){
                  var returnText ="";
                  returnText = checkConditions(f);
                  returnText = returnText +"\n"+ checkDt(f);
                  returnText = returnText +"\n"+ checkObject(f);
                  returnText = returnText +"\n"+ checkClient(f);
                  returnText = returnText +"\n"+ checkCost(f);

                  if  (returnText.length > 15  ){
                    alert (returnText );
                   } else {
                    //alert ("all right");
                    f.submit();
                    }
                 }
             </script>


		  <fieldset>
			<legend><b>Обязательные условия о создании договора оказания услуг</b></legend>
			<table border="0" cellpadding="0" cellspacing="0">

			<tr>
				<td valign="top"><input type="checkbox" name="cbFirstCondition" onClick="firstCondition(this.form)"></td>
				<td>Если «Оплата  Вознаграждения Компании производиться после получения продавцом/арендатором
					первого платежа по заключенному договору отчуждения/аренды» то поставьте галочку.
					Если достигнуты иные договоренности, то опишите их ниже:
                <input type="hidden" name="txtFirsthd">
				</td>
			</tr>
			<tr>
			    <td></td>
				<td>
				<textarea cols="75" name="txtFirst"></textarea>
				</td>
			</tr>
			<tr>
				<td colspan="2">&nbsp;</td>
			</tr>

			<tr>
				<td valign="top"><input type="checkbox" name="cbSecondCondition" onClick="secondCondition(this.form)"></td>
				<td>Если «Услуга считается оказанной Компанией после заключения клиентами
					договора отчуждения/договора аренды» то поставьте галочку.
					Если достигнуты иные договоренности, то опишите их ниже:
                 <input type="hidden" name="txtSecondhd">
				</td>
			</tr>

			<tr>
				<td></td>
				<td>
				<textarea cols="75" name="txtSecond"></textarea>
				</td>
			</tr>
     		<tr>
				<td colspan="2">&nbsp;</td>
			</tr>

			</table>
		</fieldset>

		</td>

	 </tr>
     
    
     <%}  else { //contr type%>
     <script >
         function checkAll(f){
          var returnText ="";
          //returnText = checkConditions(f);
          returnText = returnText +"\n"+ checkDt(f);
          returnText = returnText +"\n"+ checkObject(f);
          returnText = returnText +"\n"+ checkClient(f);
          returnText = returnText +"\n"+ checkCost(f);

          if  (returnText.length > 15  ){
            alert (returnText );
           } else {
            //alert ("all right");
            f.submit();
            }
         }
     </script>

     <%}  //contr type%>

	<tr>
		<td colspan="2">
     	<fieldset>
			<legend><b>Заявка</b></legend>


		<table>
			 <tr>
				<td>
					<b>К какой дате</b><br>
					<input name="dt_exec" id="datepicker" type="text" />
				</td>
			 </tr>
             <tr>
				<td>
				<b>Тип заявки</b><br>
                    <%
                     String v_req_type_sql = " select t.id, t.type_name  from tl_request_type t Where t.dep_id = nvl(?, 1) ";

                      PreparedStatement pstmt_req_type = conn.prepareStatement(v_req_type_sql);
                      pstmt_req_type.setString(1, v_dep);
                      ResultSet rs_req_type =  pstmt_req_type.executeQuery();

        %>

                <select id="reqType" name="reqType" width="100%" >
				  <option selected value="0">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;----------------------------------------------------Выберите тип заявки-----------------------------------------------------&nbsp;&nbsp;&nbsp;&nbsp;</option>
                     <% while(rs_req_type.next()){

                         %>
                            <option  value='<%=rs_req_type.getString(1)%>' ><%=rs_req_type.getString(2)%>
                        <% }
                               %>
                 </select>
                 <input name="reqTypeDesc" id="reqTypeDesc" type="hidden" />
				</td>
			 </tr>
			 <tr>
				<td>
				<b>Описание</b><br>
					<textarea cols="75" id="txtReqDesc" name="txtReqDesc" rows="10">
					</textarea>
				</td>
			</tr>
			 </table>
		 </fieldset>
	 </td>
	 </tr>

	 <tr>
		<td colspan="2">
		<fieldset>
			<legend><b>Объект</b></legend>

		    <table>
		    <tr>
                <%
                   String v_obj_sql = " select * from tl_objects ";

                   PreparedStatement obj_pstmt = conn.prepareStatement(v_obj_sql);
                   ResultSet rs_obj =  obj_pstmt.executeQuery();

        %>

		<td colspan="2">&nbsp;
		<b>Объект</b><br>
		<select name="cbObject" onChange="go(parseInt(this.value));">
                 <option value ='0'> Выберите объект
                 <% while(rs_obj.next()){
                     %>

                    <option value='<%=rs_obj.getString(1)%>' ><%=rs_obj.getString(2)%>
                 <%
                 }    %>
             </select>
		</td>

		    <!--   <td>
                    <b>Наименование </b><br>
                    <input id="txObject" name="txObject" type="text" size="100"/>
                    <br>
                    <b>Адрес объекта</b><br>
                    <input id="txObjectAddrers" name="txObjectAddrers" type="text" size="100"/>
				</td>
                     -->
			 </tr>
			 </table>
		 </fieldset>
	 </td>
	 </tr>


	 <tr>
		<td colspan="2">
		<fieldset>
			<legend><b>Клиент</b></legend>

		<table>
			 <tr>
 <%
                   String v_client_sql = " select t.id, t.client_name ||' - '|| t.email ||' - '|| t.addres as name from tl_clients t "+
                                            " order by t.client_name  ";

                   PreparedStatement client_pstmt = conn.prepareStatement(v_client_sql);
                   ResultSet rs_client =  client_pstmt.executeQuery();

        %>

		<td colspan="2">&nbsp;
		<b>Объект</b><br>
		<select name="cbClient" onChange="go(parseInt(this.value));">
                 <option value ='0'> Выберите клиента
                 <% while(rs_client.next()){
                     %>

                    <option value='<%=rs_client.getString(1)%>' ><%=rs_client.getString(2)%>
                 <%
                 }    %>
             </select>
		</td>
<!--				<td>
				<b>Наименование </b><br>
                                <input id="txClient" name="txClient" type="text" size="75"/>
                		</td>
				<td>
					<b>e-mail: </b><br>
					<input name="txClemail" type="text" />
				</td>
-->			 </tr>
			 </table>
		 </fieldset>
	 </td>
	 </tr>

	 <tr>
		<td colspan="2">
		<fieldset>
			<legend><b>Стоимость</b></legend>

		<table>
			 <tr>
				<td valign="middle">
					<b>Стоимость услуг</b><br>
					<input name="txCost" type="text" />
				</td>
				<td valign="middle">

				<p><input type="radio" name="rNds" value="1" id="radio1"><label for="radio1">Включая НДС</label>
				   <input type="radio" name="rNds" value="2" id="radio2"><label for="radio2">Не включая НДС</label></p>

				</td>
			 </tr>
			 </table>
		 </fieldset>
	 </td>
	 </tr>

	<tr>
		<td align="center"><fieldset>
		<input type="button" value="Сохранить"  onClick="checkAll(this.form)" >  &nbsp;&nbsp;&nbsp;
		<input type="reset" value="Отмена" onClick="CancelReq()"  >
		</fieldset>
		</td>
	</tr>
	 </table>
	 </form>
    </center>

    
 <% }
  }/// if depertment 2
 else if (v_dep.equals("3")) {    %>

<!--PR-->

 <script >
         function checkAll(f){
          var returnText ="";
          //returnText = checkConditions(f);
          returnText = returnText +"\n"+ checkDt(f);
          

          if  (returnText.length > 15  ){
            alert (returnText );
           } else {
            //alert ("all right");
            f.submit();
            }
         }
     </script>

	<tr>
		<td colspan="2">
		<fieldset>
			<legend><b>Заявка</b></legend>


		<table>
			 <tr>
				<td>
					<b>К какой дате</b><br>
					<input name="dt_exec" id="datepicker" type="text" />
				</td>
			 </tr>
            <tr>
				<td>
				<b>Тип заявки</b><br>
                    <%
                     String v_req_type_sql = " select t.id, t.type_name  from tl_request_type t Where t.dep_id = nvl(?, 1) ";

                      PreparedStatement pstmt_req_type = conn.prepareStatement(v_req_type_sql);
                      pstmt_req_type.setString(1, v_dep);
                      ResultSet rs_req_type =  pstmt_req_type.executeQuery();

        %>

                <select id="reqType" name="reqType" width="100%" >
				  <option selected value="0">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;----------------------------------------------------Выберите тип заявки-----------------------------------------------------&nbsp;&nbsp;&nbsp;&nbsp;</option>
                     <% while(rs_req_type.next()){

                         %>
                            <option  value='<%=rs_req_type.getString(1)%>' ><%=rs_req_type.getString(2)%>
                        <% }
                               %>
                 </select>
                 
                 <input name="reqTypeDesc" id="reqTypeDesc" type="hidden" />
				</td>
			 </tr>
			 <tr>
				<td>
				<b>Описание</b><br>
					<textarea cols="75" id="txtReqDesc" name="txtReqDesc" rows="10">
					</textarea>
				</td>
			</tr>
            </table>
		 </fieldset>
	 </td>
	 </tr>

 <tr>
		<td align="center"><fieldset>
		<input type="button" value="Сохранить"  onClick="checkAll(this.form)" >  &nbsp;&nbsp;&nbsp;
		<input type="reset" value="Отмена" onClick="CancelReq()"  >
		</fieldset>
		</td>
	</tr>
	 </table>
	 </form>
    </center>



 <% }/// if depertment 3 %>








     <%

      }else{
                     %>
                     <h2>Turanga Leela</h2>
                     <a href="<%=g_base_url%>main.jsp">Главная</a> <br>
                     <font color="#FF0000"><h3>У Вас нет прав к этому разделу.</h3></font>

                     <%

                     }


           }else {
             %><script> <%
              out.println("parent.location = '"+g_base_url+"index.jsp';");
              %></script> <%
              //s_error_text = "Incorect login/pass for login  <a href='"+g_base_url+"index.jsp'>Login</a>" ;
          }


        }catch (Exception e){
        s_error_text = e.toString();
     }
     finally {
      if (stmt != null) stmt.close();
      db_conn.CloseConnect();
     }

    %>

    
</body>
</html>