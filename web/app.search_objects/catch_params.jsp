<%-- 
    Document   : catch_params
    Created on : 12.04.2012, 13:36:58
    Author     : kxxb
--%>

<%@page import="java.util.Map"%>
<%@page contentType="text/html" pageEncoding="UTF-8"%>
<%


/*'params' => array(

'p1' => array('name'=>'Название', 'value'=>''),
'p2' => array('name'=>'Район', 'value'=>''),
'p3' => array('name'=>'Метро', 'value'=>''),
'p9' => array('name'=>'Расстояние до метро', 'value'=>''),
'p4' => array('name'=>'Эксплуатация', 'value'=>''),
'p5' => array('name'=>'НДС', 'value'=>''),
'p6' => array('name'=>'Описание', 'value'=>''),
'p7' => array('name'=>'Состояние-Аренда', 'value'=>''),
'p8' => array('name'=>'Состояние-Продажа', 'value'=>''),
'p10' => array('name'=>'Тип здания', 'value'=>''),
),
*/
//String s_cian_id ="1";
String s_metro_id = request.getParameter("idlist");
/*
         try {
                    Map metro_m = request.getParameterMap();
                    
                    String[] vals = (String[])metro_m.get("metro[]");
                    String val = vals[0];
                        //String[] arr = (String[]) me.getValue();
                    for(int i=0;i<vals.length;i++){
                        if (i ==0){
                            s_cian_id = vals[i];
                        }else{
                        s_cian_id = s_cian_id +", "+vals[i];
                        }
                    }
                    
                    } catch  (Exception e){
                      out.println(e.toString());
                 }      
*/
            //out.println(s_cian_id);  


                                       
            out.println("{success:true,data:{m:'"+s_metro_id+"'}}");          
          
                     
                      %>
