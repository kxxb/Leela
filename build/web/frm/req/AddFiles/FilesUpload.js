/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */



/*Форма загрузки файлов**/
var frReq_id = 0;

function displayFormFile(ReqId){
    frReq_id = ReqId;
    if (ReqId=='0') {
                    Ext.MessageBox.alert('Загрузка', 'Выбирите заявку');
                    return;
                }

  if(!FileUploadWindow.isVisible()){
        FileUploadWindow.show();
      } else {
        FileUploadWindow.toFront();
      }
  }


    var  newPic = new Ext.form.TextField({xtype: 'textfield',
	        fieldLabel: 'Файл',
	        labelSeparator: '',
	        name: 'newPic',
	        id:'newPic',
	        style:'width: 300px',
	        inputType: 'file',
	        allowBlank: false});

    var pictUploadForm = new Ext.FormPanel({
        frame: true,
        title: 'Добавить файл',
        bodyStyle: 'padding:5px',
        width: 550,
        layout: 'column',
        //url: '../frm/req/AddFiles/upload_f.jsp',
        url: 'upload_f.jsp',
        method:'POST',
        enctype:'multipart/form-data',
        fileUpload: true,
        items: [newPic],

        buttons: [{
            text: 'Загрузить файл',
            handler: function() {
            var theForm = pictUploadForm.getForm();
            var connFile1 = new Ext.data.Connection();
                if (!theForm.isValid()) {
                    Ext.MessageBox.alert('Загрузка', 'Выбирите файл');
                    return;
                }

                theForm.submit({
                params: {
                 request_id:      frReq_id},
                 success: function(){
                     Ext.MessageBox.alert('Загрузка','Файл добавлен к заявке '+ frReq_id);
                       connFile1.request({
                          url: '../stores/req/getter_files_name.jsp',
                          params: {
                             reqid: frReq_id
                          },
                          success: function(resp,opt) {
                               var Com = resp.responseText
                               FileTpl.overwrite(FilePanel.body, {Name:Com});
                               newPic.setValue('');

                          },
                          failure: function(resp,opt) {
                             Ext.Msg.alert('Error','Ошибка связи');
                          }
                        })

              },
              failure: function(response){
                 var result=response.responseText;
                 Ext.MessageBox.alert('Загрузка','Ошибка, файл не добавлен ');

              }
             })

            }
        }, {
            text: 'Cancel',
            handler: function(){
                        // because of the global vars, we can only
                        // instantiate one window... so let's just hide it.

                        FileUploadWindow.hide();
                      }

        }]
    });





  FileUploadWindow = new Ext.Window({
      id: 'FileUploadWindow',
      title: 'Update build',
      closable:true,
      iconCls:'win',
      closeAction: "hide",
      width: 550,
      height: 300,
      plain:true,
      layout: 'fit',
      items: pictUploadForm
    });

/*конец формы загрузки файлов*/

