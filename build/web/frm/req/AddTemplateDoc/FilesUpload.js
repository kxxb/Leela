/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */



/*Фрма загрузки файлов Договра**/

function displayFormTemplFile(){
    //Ext.MessageBox.alert('Uh uh...','нуу и файл');
    if (docId=='-7') {
                    Ext.MessageBox.alert('Upload', 'Chose document');
                    return;
                }
  if(!TemplateUploadWindow.isVisible()){
        TemplateUploadWindow.show();
      } else {
        TemplateUploadWindow.toFront();
      }
  }


    var  newDocTemplate = new Ext.form.TextField({xtype: 'textfield',
	        fieldLabel: 'File',
	        labelSeparator: '',
	        name: 'newDocTemplate',
	        id:'newDocTemplate',
	        style:'width: 300px',
	        inputType: 'file',
	        allowBlank: false});

    var TemplUploadForm = new Ext.FormPanel({
        frame: true,
        title: 'Upload',
        bodyStyle: 'padding:5px',
        width: 550,
        layout: 'column',
        url: '../frm/req/AddTemplateDoc/uploadftempl.jsp',

        method:'GET',
        fileUpload: true,
        items: [newDocTemplate],

        buttons: [{
            text: 'Upload',
            handler: function() {

            var theForm = TemplUploadForm.getForm();
            //var connFile1 = new Ext.data.Connection();
                if (!theForm.isValid()) {
                    Ext.MessageBox.alert('Upload', 'Chose file');
                    return;
                }

                theForm.submit({
                    params: {
                    Contr_Id:      docId},
                       success: function(){
                        
                        newDocTemplate.setValue('');

                        TemplateUploadWindow.hide();
                        reloadTree();
                        Ext.MessageBox.alert('Upload','File added');
                         //TemplUploadForm.reset();
                          // render the tree
                         // 
                        //tree.getLoader().load(tree.root);
                       
                      },
                      failure: function(form, action){
                         var result=response.responseText;
                         Ext.MessageBox.alert('Upload','Error, file don not added '+action.response.responseText);
                      }
                 })
                
            }
        }, {
            text: 'Cancel',
            handler: function(){
                        // because of the global vars, we can only
                        // instantiate one window... so let's just hide it.

                        TemplateUploadWindow.hide();
                      }

        }]
    });





  TemplateUploadWindow = new Ext.Window({
      id: 'TemplateUploadWindow',
      title: 'Upload document',
      closable:true,
      iconCls:'win',
      closeAction: "hide",
      width: 550,
      height: 150,
      plain:true,
      layout: 'fit',
      items: TemplUploadForm
    });

/*конец формы загрузки файлов*/

