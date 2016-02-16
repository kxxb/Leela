/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */



/*форма создания коментария*/
function displayFormComment(){
    if (ReqId=='-7') {
       Ext.MessageBox.alert('Загрузка', 'Выбирите заявку');
       return;
     }
  if(!CommentWindow.isVisible()){
        CommentWindow.show();
      } else {
        CommentWindow.toFront();
      }
  }


     var  txtRequest_comment = new Ext.form.HtmlEditor({
                        xtype:'htmleditor',
                        id:'Request_comment',
                        name: 'Request_comment',
                        fieldLabel:'Коментарий',
                        height:200,
                        anchor:'98%',
	                 allowBlank: false});

    var CommentForm = new Ext.FormPanel({
        frame: true,

        bodyStyle: 'padding:5px',
        width: 550,
        layout: 'column',
        url: 'comment_save.jsp',
        method: 'POST',
        items: [txtRequest_comment],


       buttons: [{
            text: 'Сохранить',
            handler: function() {
             var CommPanel = Ext.getCmp('CommentPanel');
            var theForm = CommentForm.getForm();
            var connComment1 = new Ext.data.Connection();

                theForm.submit({
                params: {
                 request_id:    ReqId,
                 req_comment :  txtRequest_comment.getValue()
                 },
                 success: function(){
                     Ext.MessageBox.alert('Коментарий','Ваш коментарий  к заявке '+ ReqId + ' создан');

                          connComment1.request({
                          url: '../frm/req/AddComment/getter_comment.jsp',
                          params: {

                             reqid: ReqId
                          },
                          success: function(resp,opt) {
                             var Com = Ext.util.JSON.decode(

                               resp.responseText
                             );
                              CommentTpl.overwrite(CommPanel.body, {comment:Com});
                          },
                          failure: function(resp,opt) {
                             Ext.Msg.alert('Error','Ошибка связи');
                          }
                        })
                        txtRequest_comment.setValue('');



              },
              failure: function(response){
                 var result=response.responseText;
                 Ext.MessageBox.alert('Коментарий','Ошибка создания коментария');

              }
             })

            }
        }, {
            text: 'Cancel',
            handler: function(){
                        // because of the global vars, we can only
                        // instantiate one window... so let's just hide it.

                        CommentWindow.hide();
                      }

        }]








    });

  CommentWindow = new Ext.Window({
      id: 'CommentWindow',
      title: 'Коментарий',
      closable:true,
      iconCls:'win',
      closeAction: "hide",
      width: 550,
      height: 300,
      plain:true,
      layout: 'fit',
      items: CommentForm
    });


//var CommentTpl = new Ext.Template(CommentTplMarkup);
/*конец формы создания коментария*/
