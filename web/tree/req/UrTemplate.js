/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

var path;
var reloadTree = function() {

        tree.enable();
        tree.getLoader().dataUrl = '../stores/req/tree/getter_templates.jsp';
        tree.getLoader().load(tree.root);

  /*      path = tree.getSelectionModel().getSelectedNode().getPath('id');
   *      */
        tree.expandPath(path,'id',function(bSucess,oLastNode){
            tree.getSelectionModel().select(oLastNode);
          });

        //tree.getLoader().reload();
        //var rootNode = tree.getRootNode();// get the rootnode
        //treeLoader.load(rootNode);
    };


var expandLeaf = function(){
 
 tree.expandPath(path,'id',function(bSucess,oLastNode){
    tree.getSelectionModel().select(oLastNode);
  });


}
var treeLoader =  new Ext.tree.TreeLoader({
         dataUrl: '../stores/req/tree/getter_templates.jsp'
         });

var root = new Ext.tree.AsyncTreeNode({
        text: 'Шаблоны',
        id: 'src'
    });



 var tree = new Ext.tree.TreePanel({
        id:'tree',
        title: 'Шаблоны договоров',
        height: 600,
        width: 400,
        useArrows:true,
        autoScroll:true,
        animate:true,
        //disabled: true,
        enableDD:false,
        containerScroll: true,
        rootVisible: false,
        bodyStyle:{ background: '#ffffff' },
        frame: true,
        /*root: {
            nodeType: 'async'
        },*/
        tbar:[{
         text: 'Добавить документ',
         tooltip: 'add doc',
         iconCls:'add',    // this is defined in our styles.css
         handler: displayFormTemplFile //displayFormWindow
         }/*,{
         text: 'Expand',
         tooltip: 'Expand',

         handler:     expandLeaf //displayFormWindow
         }*/],
        loader: treeLoader,
        // auto create TreeLoader
   

        listeners: {
            /*'select': function(node){

                path = tree.getSelectionModel().getSelectedNode().getPath('id');
            },*/
            'checkchange': function(node, checked){
                path = tree.getNodeById;
                if(checked){
                    
                    docId = node;

                    if(node && node.leaf){
                     
                     var conCheckLeaf = new Ext.data.Connection();
                     var connCheckLeaf = new Ext.data.Connection();
                     connCheckLeaf.request({

                                      url: '../frm/req/AddTemplateDoc/CheckLeaf.jsp',
                                      params: {
                                         doc_id_leaf: node.id,
                                         mode : 'checked'
                                      },
                                     
                                      success: function(resp,opt) {
                                         var Com =  resp.responseText;
                                         Ext.Msg.alert('Сообщение.',Com);
                                         
                                            reloadTree();
    //                                       tree.getLoader().load(tree.root);


                                        ///CommentTpl.overwrite(CommPanel.body, {Doc_body:Com});
                                      },
                                      failure: function(resp,opt) {
                                         Ext.Msg.alert('Error','Ошибка связи');
                                      }
                                    })
                    }
                    //node.getUI().addClass('complete');

                }else{
                   
                    if(node && node.leaf){
                     var conCheckLeaf = new Ext.data.Connection();
                     var connCheckLeaf = new Ext.data.Connection();
                     connCheckLeaf.request({

                                      url: '../frm/req/AddTemplateDoc/CheckLeaf.jsp',
                                      params: {
                                         doc_id_leaf: node.id,
                                         mode : 'unchecked'
                                      },

                                      success: function(resp,opt) {
                                         var Com =  resp.responseText;
                                         Ext.Msg.alert('Сообщение.',Com);
                                        reloadTree();
                                        //tree.getLoader().load(tree.root);
                                        ///CommentTpl.overwrite(CommPanel.body, {Doc_body:Com});
                                      },
                                      failure: function(resp,opt) {
                                         Ext.Msg.alert('Error','Ошибка связи');
                                      }
                                    })
                    }
                    //node.getUI().removeClass('complete');
                }
                },
            'render': function(tp){
                    
                    tp.getSelectionModel().on('selectionchange', function(tree, node){
                        
                        var conDocBody = new Ext.data.Connection();
                        var el = Ext.getCmp('DocPanel').body;
	                    if(node && node.leaf){
                               var connReadDoc = new Ext.data.Connection();
                                 connReadDoc.request({
                                      
                                      url: '../frm/req/AddTemplateDoc/read_doc.jsp',
                                      params: {
                                         file_id: node.id
                                      },
                                     waitMsg:'Загружаю данные...',
                                      success: function(resp,opt) {
                                         var Com = resp.responseText;

                                         //Ext.Msg.alert('test',Com);
	                                tpl.overwrite(el, {Doc_body:Com});
                                        ///CommentTpl.overwrite(CommPanel.body, {Doc_body:Com});
                                      },
                                      failure: function(resp,opt) {
                                         Ext.Msg.alert('Error','Ошибка связи');
                                      }
                                    })

	                    }else if (node){
                            
                            docId = node.id;
                            tpl.overwrite(el, {Doc_body:'Выберите версию для просмотра содержимого или загрузите документ'});
                        }
                    })
  
            }

        }
    });

tree.setRootNode(root);


//tree.getRootNode().expand(true);
//reloadTree();
var tpl = new Ext.Template('<p>{Doc_body}</p>');
    tpl.compile();

function addDoc(){
    
    displayFormTemplFile();
 //   Ext.Msg.alert( 'Загрузка документа', 'Начинаю');

    
}


/*Фрма загрузки файлов**/

function displayFormTemplFile(){
    //Ext.MessageBox.alert('Uh uh...','нуу и файл');
    if (docId=='-7') {
                    Ext.MessageBox.alert('Загрузка', 'Выбирете документ');
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
            text: 'Загрузка',
            handler: function() {

            var theForm = TemplUploadForm.getForm();
            //var connFile1 = new Ext.data.Connection();
                if (!theForm.isValid()) {
                    Ext.MessageBox.alert('Загрузка', 'Выберите файл');
                    return;
                }

                theForm.submit({
                    params: {
                    Contr_Id:      docId},
                       success: function(){

                        newDocTemplate.setValue('');
                        reloadTree();
                        
                        
                        //
                        Ext.MessageBox.alert('Загрузка','Документ добавлен');
                        
                        TemplateUploadWindow.hide();
                         //TemplUploadForm.reset();
                          // render the tree
                         //
                        //tree.getLoader().load(tree.root);

                      },
                      failure: function(form, action){
                         var result=response.responseText;
                         Ext.MessageBox.alert('Загрузка','Ошибка загрузки документа '+action.response.responseText);
                      }
                 })

            }
        }, {
            text: 'Отмена',
            handler: function(){
                        // because of the global vars, we can only
                        // instantiate one window... so let's just hide it.

                        TemplateUploadWindow.hide();
                      }

        }]
    });





  TemplateUploadWindow = new Ext.Window({
      id: 'TemplateUploadWindow',
      title: 'Загрузка документа',
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