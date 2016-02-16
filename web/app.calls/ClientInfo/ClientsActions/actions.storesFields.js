/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */


Fields_ReqClient = [
                {name: 'ID', mapping:'ID', type: 'int'},
                {name: 'LOT', mapping:'LOT', type: 'string'},
                {name: 'OPERATION_ID', mapping:'OPERATION_ID', type: 'string'},
                {name: 'OP_NAME', mapping:'OP_NAME', type: 'string'},
                {name: 'BUDGET_START', mapping:'BUDGET_START', type: 'string'},
                {name: 'BUDGET_END', mapping:'BUDGET_END', type: 'string'},
                
                {name: 'CURRENCY_ID', mapping:'CURRENCY_ID', type: 'string'},
                {name: 'CUR_NAME', mapping:'CUR_NAME', type: 'string'},
                {name: 'SHORT_NAME', mapping:'SHORT_NAME', type: 'string'},
                {name: 'AREA_START', mapping:'AREA_START', type: 'string'},
                {name: 'AREA_END', mapping:'AREA_END', type: 'string'},
                {name: 'URGENCY', mapping:'URGENCY', type: 'string'},
                {name: 'DESTINATION', mapping:'DESTINATION', type: 'string'},
                {name: 'READY_ID', mapping:'READY_ID', type: 'string'},
                {name: 'READY_NAME', mapping:'READY_NAME', type: 'string'},
                
                {name: 'ADDITIONAL_INFO', mapping:'ADDITIONAL_INFO', type: 'string'},
                {name: 'ORG_NAME', mapping:'ORG_NAME', type: 'string'},
                {name: 'USER_NAME', mapping:'USER_NAME', type: 'string'},
                {name: 'cl_id', mapping:'cl_id', type: 'string'},
                
                {name: 'req_status_id', mapping:'req_status_id', type: 'string'},
                {name: 'req_status_name', mapping:'req_status_name', type: 'string'},
                {name: 'Date_Update', mapping:'Date_Update',  type: 'string'},
                
                {name: 'req_dep_name', mapping:'req_dep_name',  type: 'string'},
                
                
                {name: 'DATE_REC', mapping:'DATE_REC',  type: 'date', dateFormat: 'd.m.Y H:i'},
                {name: 'LAST_USER_ID',mapping:'LAST_USER_ID', type: 'string'}

        ];
        
        Fields_CallsClient = [
                {name: 'call_id', mapping:'call_id', type: 'int'},
                {name: 'call_date_time', mapping:'call_date_time', type: 'date', dateFormat: 'd/m/Y H:i'},
                {name: 'rek_s_source', mapping:'rek_s_source', type: 'string'},
                {name: 'sekretar', mapping:'sekretar', type: 'string'},
                {name: 'input_tel', mapping:'input_tel', type: 'string'},
                {name: 'call_description', mapping:'call_description', type: 'string'},
                {name: 'transfer_id', mapping:'transfer_id', type: 'string'},
                {name: 'transfer_user', mapping:'transfer_user', type: 'string'},
                {name: 'transfer_user_dep_id',mapping:'transfer_user_dep_id', type: 'string'},
                {name: 'transfer_user_dep_name', mapping:'transfer_user_dep_name', type: 'string'},
                {name: 'secretar_flag',mapping:'secretar_flag', type: 'string'},
                {name: 'r_day',mapping:'r_day', type: 'string'},
                {name: 'CALL_RESULT',mapping:'CALL_RESULT', type: 'string'},
                {name: 'RESULT_STATUS',mapping:'RESULT_STATUS', type: 'string'},
                {name: 'crm_rek_s_source_id',mapping:'crm_rek_s_source_id', type: 'string'},
                {name: 'rec_secretar',mapping:'rec_secretar', type: 'string'}

        ];
        
        Fields_Character = [
                {name: 'ID', mapping:'ID', type: 'int'},
                {name: 'NAME', mapping:'NAME', type: 'string'}
        ];
        
        Fields_Currency = [
                {name: 'ID', mapping:'ID', type: 'int'},
                {name: 'NAME', mapping:'NAME', type: 'string'}
        ];