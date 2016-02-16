<%-- 
    Document   : newjsp
    Created on : 09.04.2012, 18:40:51
    Author     : kxxb
--%>

<%@page contentType="text/html" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
        <title>JSP Page</title>
    </head>
    <body>
        <h1>Hello World!</h1>
    </body>
</html>

Select
 *    
 from (                                         
            
 Select 
  r.object_title,
  os.valu_e As obj_status,
  r.project_cost,
  nd.valu_e As nds,
  r.land_info,
  r.object_owner,
  ag.valu_e As agency,
  el.valu_e As elabor,
  pri.valu_e As Priority,
  r.best_offer,
  r.lot,
  r.old_lot,
  r.old_obj_id,
  Nvl(To_Char( r.object_date, 'dd/mm/yyyy hh24:mi'), '-') As object_date,
  r.contract_work,
  actpass.valu_e As active_passive,
  r.proposed,
  r.for_lease,
  r.for_sale,
  r.for_sublease,
  r.for_lease_sale,
  r.developer_name,
  r.dev_contact,
  r.dev_tel,
  r.investor_name,
  loc.valu_e As location_name,
  direc.valu_e As direction_name,
  bdistr.valu_e As bis_district,

  ms.station_name,
  objadr.walk_metro_minutes,
  objadr.auto_metro_minutes,
  objadr.outside_mkad,
  objadr.discripton_of_location,
  kl.name as street_name,
  objadr.house_numb,
  Count(r.Id) Over() As C,                       
  Row_Number() Over(Order By r.id Desc) As r
    
  From re_objects r, re_objects_address objadr,
       list_val os, list_val nd, list_val ag, list_val el,
       list_val pri, list_val actpass,

       list_val loc,list_val direc, list_val bdistr,
       crm_s_metro_station ms, kladr_street_new kl
 Where r.object_status = os.id(+)
 And r.nds_id = nd.id(+)
 And r.agency_id = ag.id(+)
 And r.elaborate =  el.id(+)
 And  r.priority = pri.id(+)
 And r.activ_passiv_id =actpass.id(+)
 And r.id = objadr.re_objects_id(+)
 
 And  objadr.location_id = loc.id(+)
 And  objadr.direction_id = direc.id(+)
 And  objadr.buisnes_district_id = bdistr.id(+)
 And  objadr.metro_station_id = ms.id(+)
 And  objadr.kladr_doma_code = kl.code(+) 
 
 And  r.id In (2229,1603,926,963,1776,1685,577,1630,1489,2856,2424,1121,1123,940,1784,1863,2192,520,1326,2027,1611,948,1440,916,1830,1675,1316,1135,956,2734,2809,2829,760,1966,1482,7,2541,1704,1731,1520,2589,903,2311,1989,1562,2745,1447,1269,1120,2132,1961,2046,2147,1940,935,2760,937,2031,1455,2397,1871,1042,1941,2234,460,919,1189,909,945,960,1134,921,2652,2257,1991,1257,1289,1301,2544,954,753,1679,917,661,1126,1112,1952,1145,2536,335,2291,2586,897,1139,950,933,1446,915,931,1118,1125,834,799,936,1008,2884,911,2235,1328,1132,1445,2571,2530)
 )
  Where r Between 1 And 10
