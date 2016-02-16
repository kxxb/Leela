/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */


fields_req = [
   {name: 'reqid', mapping:'reqid', type: 'int'},
                {name: 'request_text', mapping:'request_text', type: 'string'},
                {name: 'applicant_id', mapping:'applicant_id', type: 'string'},
                {name: 'apl_user_name', mapping:'apl_user_name', type: 'string'},
                {name: 'apl_dep', mapping:'apl_dep', type: 'string'},
                {name: 'resp_user_name', mapping:'resp_user_name', type: 'string'},

                {name: 'resp_dep',mapping:'resp_dep', type: 'string'},
                {name: 'responsibly_department_id', mapping:'responsibly_department_id', type: 'string'},
                {name: 'dt_create', mapping:'dt_create', type: 'date', dateFormat: 'd/m/Y H:i'},

                {name: 'dt_execute', mapping:'dt_execute', type: 'date', dateFormat: 'd/m/Y'},
                {name: 'Status', mapping:'Status', type: 'int'},
                {name: 'Status_Name', mapping:'Status_Name', type: 'string'},
                {name: 'Tl_Contract_Template_Id', mapping:'Tl_Contract_Template_Id', type: 'string'},

                {name: 'Contract_Number', mapping:'Contract_Number', type: 'string'},
                {name: 'Contract_Date', mapping:'Contract_Date', type: 'date', dateFormat: 'd/m/Y'},
                {name: 'Contacrt_Return_Date',mapping:'Contacrt_Return_Date', type: 'date', dateFormat: 'd/m/Y'},
                {name: 'Obj',mapping:'Obj', type: 'string'},
                {name: 'Client', mapping:'Client',type: 'string'},
                {name: 'Cl_Email', mapping:'Cl_Email',type: 'string'},
                {name: 'Cost_Of_Service',mapping:'Cost_Of_Service', type: 'string'},
                {name: 'Contragent',mapping:'Contragent', type: 'string'},
                {name: 'Contract',mapping:'Contract', type: 'string'},
                {name: 'CONTR',mapping:'CONTR', type: 'string'},
                {name: 'responsibly_id',mapping:'responsibly_id', type: 'int'},
                {name: 'request_control',mapping:'request_control', type: 'string'},
                {name: 'apl_user_email',mapping:'apl_user_email', type: 'string'},
                {name: 'apl_user_cellular',mapping:'apl_user_cellular', type: 'string'},
                {name: 'apl_user_internal',mapping:'apl_user_internal', type: 'string'},
                {name: 'apl_user_work_position',mapping:'apl_user_work_position', type: 'string'}
 
];