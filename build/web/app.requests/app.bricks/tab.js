/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */


l_store.on('load',function(v_grid_data){
                if (RequestsRowIndex == -1){
                    lReqPan.tpl.overwrite(lReqPan.body, '');
                } else {
                    /*Нахожу ту строку на которй стоял перед редактированием
                      *и вновь выделяю её
                      **/                    
                     lGrid.getSelectionModel().selectRow(RequestsRowIndex);
                     lGrid.getView().focusRow(RequestsRowIndex);
                     OverwritePanels();
                }
                  
                   
            });               
   
  