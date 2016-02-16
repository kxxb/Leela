/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
Ext.namespace('Req', 'Req.rootTab');


UniversalReqGrid = function(ColumModel, Store, Grid_id){
      
   var grid_req_id = '0';
   function get_grid_req_id(){
       return grid_req_id;
   }

    UniversalReqGrid.superclass.constructor.call(this, {
      store: Store
     ,cm: ColumModel
     
     //,id: Grid_id
     ,height:300
     ,region: 'north'
     ,split: true
     ,clicksToEdit:1
     ,enableColLock:false
     ,selModel: new Ext.grid.RowSelectionModel({
          singleSelect:false
      })

     ,bbar: new Ext.PagingToolbar({
            pageSize: 100
            ,store: Store
            ,displayInfo: true
            ,displayMsg: 'Показанно заявок {0} - {1} of {2}'
            ,emptyMsg: "Нет заявок"

         }),tbar: [{
             text: 'Создать заявку'
             ,tooltip: 'Создать заявку'
             ,iconCls:'silk-add'
            // ,handler: createRequest
          }
          ,'-'
          ,{
             text: 'Поиск'
             ,tooltip: 'Поиск'
             ,iconCls:'silk-cog'
             ,handler:  function(){testviewreqid();}

          }
          ,'-'
          ]
    } );


    
    this.getSelectionModel().on('rowselect', function(sm, rowIdx, r) {
       //if (Grid_id == 'AllReqGridUR'){

       itTab.setValue(r.data.reqid);
       
           
            //urt.setValue(r.data.reqid);
            //Ext.Msg.alert('test',urt.getValue());
            
            //tbAllReqURTab.privateFn.call(r.data.reqid);
    /*        listeners: {activate: handleActivate}
            var detailUrAdditionalPanel = Ext.getCmp('UrAdditionalPanel');
            urAdditionalTpl.overwrite(detailUrAdditionalPanel.body, r.data);

    
            var detailUrREQPanel = Ext.getCmp('UrREQPanel');
            detailUrREQPanel.tpl.overwrite(detailUrREQPanel.body, r.data);

            var localComentUrpanel = Ext.getCmp('ComentUrpanel');
            var connComentUrpanel = new Ext.data.Connection();
                        connComentUrpanel.request({
                          url: '../stores/req/tab/getter_comment.jsp',
                          params: {
                             reqid: r.data.reqid
                          },
                          success: function(resp,opt) {
                             var ComComentUrpanel = Ext.util.JSON.decode(
                               resp.responseText
                             );
                            displayFormWindow('AllReq')localComentUrpanel.tpl.overwrite(localComentUrpanel.body, {comment:ComComentUrpanel});
                          },
                          failure: function(resp,opt) {
                             Ext.Msg.alert('Ошибка связи','Коментарий не подгружен, обновите страницу');
                          }
                        })
*/


        //}
        if (Grid_id == 'MyReqGrid'){
            

            var detailUrREQPanel1 = Ext.getCmp('UrREQPanel1');
            detailUrREQPanel1.tpl.overwrite(detailUrREQPanel1.body, r.data);
             
             //setReqid(r.data.reqid);
             
            var localComentUrpanel1 = Ext.getCmp('ComentUrpanel1');
            var connComentUrpanel1 = new Ext.data.Connection();
                        connComentUrpanel1.request({
                          url: '../stores/req/tab/getter_comment.jsp',
                          params: {
                             reqid: r.data.reqid
                          },
                          success: function(resp,opt) {
                             var ComComentUrpanel1 = Ext.util.JSON.decode(
                               resp.responseText
                             );
                              localComentUrpanel1.tpl.overwrite(localComentUrpanel1.body, {comment:ComComentUrpanel1});
                          },
                          failure: function(resp,opt) {
                             Ext.Msg.alert('Ошибка связи','Коментарий не подгружен, обновите страницу');
                          }
                        })


        }
        if (Grid_id == 'AllReqGridIT'){
            var detailITREQPanel1 = Ext.getCmp('ITREQPanel1');
            detailITREQPanel1.tpl.overwrite(detailITREQPanel1.body, r.data);


            local_reqid  = r.data.reqid;

            //var local_reqid = r.data.reqid;
        }

       // Ext.Msg.alert('test',Grid_id);
    });
    this.on('afteredit',saveTheRequest);
}



function saveTheRequest(){
    Ext.Msg.alert('test','Save info succes ');
}




Ext.extend(UniversalReqGrid, Ext.grid.EditorGridPanel);

function testviewreqid(){
    Ext.Msg.alert('test', itTab.getValue());

}