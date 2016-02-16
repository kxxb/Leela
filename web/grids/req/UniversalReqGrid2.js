/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
Ext.namespace('Req', 'Req.rootTab');


UniversalReqGrid2 = function(ColumModel, Store){
      
   
    UniversalReqGrid2.superclass.constructor.call(this, {
      store: Store
     ,cm: ColumModel
     
     
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
             //,handler:  function(){ displayFormWindow('AllReq');}

          }
          ,'-'
          ]
    } );


    
    this.getSelectionModel().on('rowselect', function(sm, rowIdx, r) {
      
            
/*
            listeners: {activate: handleActivate}

            var detailUrAdditionalPanel = Ext.getCmp('UrAdditionalPanel');
            urAdditionalTpl.overwrite(detailUrAdditionalPanel.body, r.data);
*/
            //var local_tes = new this.local_test;
             local_reqid  = r.data.reqid;
            //setReqid(r.data.reqid);

            var detailUrREQPanel = Ext.getCmp('ITREQPanel1');
            detailUrREQPanel.tpl.overwrite(detailUrREQPanel.body, r.data);

            var localComentUrpanel = Ext.getCmp('ComentITpanel1');
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
                              localComentUrpanel.tpl.overwrite(localComentUrpanel.body, {comment:ComComentUrpanel});
                          },
                          failure: function(resp,opt) {
                             Ext.Msg.alert('Ошибка связи','Коментарий не подгружен, обновите страницу');
                          }
                        })



     

       // Ext.Msg.alert('test',Grid_id);
    });
    this.on('afteredit',saveTheRequest);
}



function saveTheRequest(){
    Ext.Msg.alert('test','Save info succes ');
}




Ext.extend(UniversalReqGrid2, Ext.grid.EditorGridPanel);