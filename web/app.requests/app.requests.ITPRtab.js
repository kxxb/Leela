/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
Ext.ns("app");

//Ext.extend(UniversalReqGrid, Ext.grid.EditorGridPanel);
//var store_it = new app.store_j1({baseParams: {mode: 'AllRequests'}});

app.PR_read_tab =  Ext.extend(
    Ext.Panel,{
        initComponent: function(){

            var config = {
                    xtype: 'panel',
                    autoScroll : 1,
                    overflow:'auto',
                    layout: 'border',
                    items: [
                        {xtype:'univgrid'
                        ,store: app_store_my_pr
                        ,cm: ITPR_view_cm
                         }
                      // eof    region: 'north'
                      // eof region: 'center'
                        ,{region: 'center'
                          ,xtype: 'panel'
                          ,height:150
                          ,layout: 'border'
                          ,split: true
                          ,border: false
                            ,items : [ {xtype: 'reqtexpan'
                                        ,region: 'west'
                                        ,width:400}
                                    ,{region: 'center'
                                      ,xtype:'filecomentstab_simple'
                                      ,title: 'Информация'
                                      ,split: true
                                      ,activeTab: 0}
                                   ]
                              }
                       // eof region: 'south'
                     ]
            }; // eo config object
            // Применяем config
            Ext.apply(this, Ext.apply(this.initialConfig, config));
            app.PR_read_tab.superclass.initComponent.apply(this, arguments);
            /**
             *ВНИМАНИЕ!!!
             *Зубодробильный код
             **/
            /*обращение к панелям по их айтем индексу */
            var UniversalGrid = this.items.itemAt(0);

            //var additionalPanel= this.items.itemAt(1);
            /*Здесь переход на второй уровень иерархии индексов,
             *так как панель текста коментариев находиться в в панеле ЮГ */
            var SouthRegion = this.items.itemAt(1);
            var reqTextPanel  = SouthRegion.items.itemAt(0);
            /*Переход на третий уровень иерархии,
             *так как вкладки находятсstore_jя в панеле ЦЕНТР*/
            var CommentFilesPanel = SouthRegion.items.itemAt(1);
            var CommentApl = CommentFilesPanel.items.itemAt(0);
            var FilePan    = CommentFilesPanel.items.itemAt(1);
            //var CommentResp = CommentFilesPanel.items.itemAt(2);
            /*Конец
             *Зубодробильный код.
             **/
             /*Различные приватные переменные используемые в этом Табе */
             /*Различные приватные переменные используемые в этом Табе */
              var req_id = 0;
              var pFilePanBody = '';
              var pAplCommBody = ' ';
              var pRespCommBody = ' ';
              function SetReqId(p){
                  req_id = p;
              }

              function GetReqId(){
                  return req_id;
              }
            /*Окно для создания коментария*/
            var ComentWin = new app.CommentWindow({
                    items:  new Ext.FormPanel({
                            frame: true,
                            bodyStyle: 'padding:5px',
                            width: 550,
                            layout: 'column',
                            url: '../req/comment_save.jsp',
                            method: 'POST',
                            items: new Ext.form.HtmlEditor({
                                                    xtype:'htmleditor',
                                                    height:200,
                                                    anchor:'98%',
                                                    allowBlank: false
                                                    //,handler:
                                                    }),


                            buttons: [{
                                text: 'Сохранить',
                                handler: function() {
                                var HtmlEditor = ComentWin.items.itemAt(0).items.itemAt(0);
                                var theForm = ComentWin.items.itemAt(0).getForm();
                                var connComment1 = new Ext.data.Connection();
                                    theForm.submit({
                                    params: {
                                      request_id:    GetReqId()
                                     ,req_comment :  HtmlEditor.getValue()
                                     ,user_id :      gUserId
                                     },
                                     success: function(){
                                            Ext.MessageBox.alert('Коментарий','Ваш коментарий  к заявке '+ GetReqId() + ' создан');

                                            Write_Apl_coments_tab();
                                          //  Write_Resp_coments_tab();

                                            HtmlEditor.setValue('');
                                            ComentWin.hide();
                                  },
                                  failure: function(response){
                                     var result=response.responseText;
                                     Ext.MessageBox.alert('Коментарий','Ошибка создания коментария для заявки '+ GetReqId());
                                  }
                                })
                              }
                            }, {
                                text: 'Отмена',
                                handler: function(){ComentWin.hide();}
                            }]
                        })
                    });
               /*Конец окна для создания коментария*/
//////////////////////////////////////////////////////
               /*окно добавления файла*/
                var FileWin = new app.fileWindow({
                    items:  new Ext.FormPanel({
                            frame: true,
                            title: 'Добавить файл',
                            bodyStyle: 'padding:5px',
                            width: 550,
                            layout: 'column',
                            //url: '../frm/req/AddFiles/upload_f.jsp',
                            url: 'upload_f.jsp',
                            method:'GET',
                            enctype:'multipart/form-data',
                            fileUpload: true,
                            items: new Ext.form.TextField({xtype: 'textfield',
                                        fieldLabel: 'Файл',
                                        labelSeparator: '',
                                        name: 'newPic',
                                        id:'newPic',
                                        style:'width: 300px',
                                        inputType: 'file',
                                        allowBlank: false}),


                            buttons: [{
                                    text: 'Загрузить файл',
                                    handler: function() {

                                    var theForm = FileWin.items.itemAt(0).getForm();

                                    var connFile1 = new Ext.data.Connection();
                                        if (!theForm.isValid()) {
                                            Ext.MessageBox.alert('Загрузка', 'Выбирите файл');
                                            return;
                                        }

                                        theForm.submit({
                                        params: {
                                         request_id:      GetReqId()},
                                         success: function(){
                                             Ext.MessageBox.alert('Загрузка','Файл добавлен к заявке '+ GetReqId());
                                               Write_File_tab();
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

                                                FileWin.hide();
                                              }

                                }]
                        })
                    });

               /*Конец окна добавления файла*/




                UniversalGrid.getSelectionModel().on('rowselect', function(sm, rowIdx, r) {
                                    SetReqId(r.data.reqid);
                                    OverwritePanels(r.data);

				});

                 UniversalGrid.on('afteredit',function(){saveTheRequest();});
                 /*событие с кнопки  "Создать заявку"
                  *Кнопка размещена на гриде в тулбаре
                  *
                  */
                 UniversalGrid.on('addTbClick',function(){
                     CreateReq(3);
                     //Ext.Msg.alert('test','Create request '+req_id)
                 });
                 /*событие с кнопки  "Создать заявку"
                  *Кнопка размещена на гриде в тулбаре
                  *
                  */
                 UniversalGrid.on('searchTbClick',function(){
                     gSearchMode = 'app_store_my_pr';
                     ShowSearchWin();
                 //Ext.Msg.alert('test','Search  '+req_id)
                 });


                /*Эта конструкция ловит событие tabchange
                 *которое срабатывает на таб панели CommentFilesPanel
                 *Назначение конструкции: заполнить данными ещё не инициализированные табы
                 **/
                CommentFilesPanel.on({
                        afterrender :{
                            scope:this,
                            single:true,
                            fn:function() {
                                CommentFilesPanel.on('tach',function(){
                                    rewritePan()
                                });
                           }
                        }
                   });

                  function rewritePan(){
                            FilePan.tpl.overwrite(FilePan.body, {Name:pFilePanBody});
                           // CommentResp.tpl.overwrite(CommentResp.body, {comment:pRespCommBody});
                  }

                FilePan.on('addFiles', function(){
                      if (GetReqId() == 0){
                          Ext.Msg.alert('Внимание!','Выберите заявку, для добавления файла.')
                       } else {
                           FileWin.show();
                       }
                  });

                 /*добавляем коментарий*/
                   CommentApl.on('addComment', function(){GaddAddcom.call()});
                    var GaddAddcom = function(){
                       if (GetReqId() == 0){
                          Ext.Msg.alert('Внимание!','Выберите заявку, для добавления комментария.')
                       } else {
                           ComentWin.show();
                       }

                    };
//                   CommentResp.on('addComment', function(){GaddAddcomResp.call()});
//                    var GaddAddcomResp = function(){
//                       if (GetReqId() == 0){
//                          Ext.Msg.alert('Внимание!','Выберите заявку, для добавления комментария.')
//                       } else {
//                           ComentWin.show();
//                       }
//
//                    };
                    //GaddAddcom = GaddAddcom.createDelegate(this);
                /*конец добавляем коментарий*/

            /**/
//            function Write_Resp_coments_tab(){
//                var req_conn_comments_getter = new Ext.data.Connection();
//                               req_conn_comments_getter.request({
//                                  url: '../stores/req/tab/getter_comment.jsp',
//                                  params: {
//                                     group:'req'
//                                     ,reqid: GetReqId()
//                                  },
//                                  success: function(resp,opt) {
//                                     pRespCommBody = Ext.util.JSON.decode(
//                                       resp.responseText
//
//                                     );
//                                  CommentResp.tpl.overwrite(CommentResp.body, {comment:pRespCommBody});
//
//                                  },
//                                  failure: function(resp,opt) {
//                                     Ext.Msg.alert('Error','Ошибка связи');
//                                  }
//                                });
//            }

            function Write_Apl_coments_tab(){
                var app_conn_comments_getter = new Ext.data.Connection();
                               app_conn_comments_getter.request({
                                  url: '../stores/req/tab/getter_comment.jsp',
                                  params: {
                                     //group:'apl'
                                     reqid: req_id
                                  },
                                  success: function(resp,opt) {
                                     var Com = Ext.util.JSON.decode(
                                       resp.responseText

                                     );
                                      CommentApl.tpl.overwrite(CommentApl.body, {comment:Com});

                                  },
                                  failure: function(resp,opt) {
                                     Ext.Msg.alert('Error','Ошибка связи');
                                  }
                                });
            }

            function Write_File_tab(){
                var connFile = new Ext.data.Connection();
                connFile.request({

                              url: '../stores/req/tab/getter_files_name.jsp',
                              params: {
                                 reqid: req_id
                              },
                              success: function(resp,opt) {
                                   var Com = resp.responseText;
                                   pFilePanBody = Com;
                                   FilePan.tpl.overwrite(FilePan.body, {Name:Com});

                              },
                              failure: function(resp,opt) {
                                 Ext.Msg.alert('Error','Ошибка связи');
                              }
                            })
            }


            function OverwritePanels (data){
               /*активная заявка*/
               
               reqTextPanel.tpl.overwrite(reqTextPanel.body, data);
               //Write_Resp_coments_tab();
               Write_Apl_coments_tab();
               Write_File_tab();

            }


    } 

 });
Ext.reg('pr_read_tab', app.PR_read_tab);
// }}}


app.IT_read_tab =  Ext.extend(
    Ext.Panel,{
        initComponent: function(){

            var config = {
                   xtype: 'panel',
                    autoScroll : 1,
                    overflow:'auto',
                    layout: 'border',
                    items: [
                        {xtype:'univgrid'
                        ,store: app_store_my_it
                        ,cm: ITPR_view_cm
                         }
                      // eof    region: 'north'
                      // eof region: 'center'
                        ,{region: 'center'
                          ,xtype: 'panel'
                          ,height:150
                          ,layout: 'border'
                          ,split: true
                          ,border: false
                            ,items : [ {xtype: 'reqtexpan'
                                        ,region: 'west'
                                        ,width:400}
                                    ,{region: 'center'
                                      ,xtype:'filecomentstab_simple'
                                      ,title: 'Информация'
                                      ,split: true
                                      ,activeTab: 0}
                                   ]
                              }
                       // eof region: 'south'
                     ]
            }; // eo config object
            // Применяем config
            Ext.apply(this, Ext.apply(this.initialConfig, config));
            app.IT_read_tab.superclass.initComponent.apply(this, arguments);
            /**
             *ВНИМАНИЕ!!!
             *Зубодробильный код
             **/
            /*обращение к панелям по их айтем индексу */
            var UniversalGrid = this.items.itemAt(0);

            //var additionalPanel= this.items.itemAt(1);
            /*Здесь переход на второй уровень иерархии индексов,
             *так как панель текста коментариев находиться в в панеле ЮГ */
            var SouthRegion = this.items.itemAt(1);
            var reqTextPanel  = SouthRegion.items.itemAt(0);
            /*Переход на третий уровень иерархии,
             *так как вкладки находятсstore_jя в панеле ЦЕНТР*/
            var CommentFilesPanel = SouthRegion.items.itemAt(1);
            var CommentApl = CommentFilesPanel.items.itemAt(0);
            var FilePan    = CommentFilesPanel.items.itemAt(1);
            //var CommentResp = CommentFilesPanel.items.itemAt(2);
            /*Конец
             *Зубодробильный код.
             **/
             /*Различные приватные переменные используемые в этом Табе */
             /*Различные приватные переменные используемые в этом Табе */
              var req_id = 0;
              var pFilePanBody = '';
              var pAplCommBody = ' ';
              var pRespCommBody = ' ';
              function SetReqId(p){
                  req_id = p;
              }

              function GetReqId(){
                  return req_id;
              }
            /*Окно для создания коментария*/
            var ComentWin = new app.CommentWindow({
                    items:  new Ext.FormPanel({
                            frame: true,
                            bodyStyle: 'padding:5px',
                            width: 550,
                            layout: 'column',
                            url: '../req/comment_save.jsp',
                            method: 'POST',
                            items: new Ext.form.HtmlEditor({
                                                    xtype:'htmleditor',
                                                    height:200,
                                                    anchor:'98%',
                                                    allowBlank: false
                                                    //,handler:
                                                    }),


                            buttons: [{
                                text: 'Сохранить',
                                handler: function() {
                                var HtmlEditor = ComentWin.items.itemAt(0).items.itemAt(0);
                                var theForm = ComentWin.items.itemAt(0).getForm();
                                var connComment1 = new Ext.data.Connection();
                                    theForm.submit({
                                    params: {
                                      request_id:    GetReqId()
                                     ,req_comment :  HtmlEditor.getValue()
                                     ,user_id :      gUserId
                                     },
                                     success: function(){
                                            Ext.MessageBox.alert('Коментарий','Ваш коментарий  к заявке '+ GetReqId() + ' создан');

                                            Write_Apl_coments_tab();
                                          //  Write_Resp_coments_tab();

                                            HtmlEditor.setValue('');
                                            ComentWin.hide();
                                  },
                                  failure: function(response){
                                     var result=response.responseText;
                                     Ext.MessageBox.alert('Коментарий','Ошибка создания коментария для заявки '+ GetReqId());
                                  }
                                })
                              }
                            }, {
                                text: 'Отмена',
                                handler: function(){ComentWin.hide();}
                            }]
                        })
                    });
               /*Конец окна для создания коментария*/
//////////////////////////////////////////////////////
               /*окно добавления файла*/
                var FileWin = new app.fileWindow({
                    items:  new Ext.FormPanel({
                            frame: true,
                            title: 'Добавить файл',
                            bodyStyle: 'padding:5px',
                            width: 550,
                            layout: 'column',
                            //url: '../frm/req/AddFiles/upload_f.jsp',
                            url: 'upload_f.jsp',
                            method:'GET',
                            enctype:'multipart/form-data',
                            fileUpload: true,
                            items: new Ext.form.TextField({xtype: 'textfield',
                                        fieldLabel: 'Файл',
                                        labelSeparator: '',
                                        name: 'newPic',
                                        id:'newPic',
                                        style:'width: 300px',
                                        inputType: 'file',
                                        allowBlank: false}),


                            buttons: [{
                                    text: 'Загрузить файл',
                                    handler: function() {

                                    var theForm = FileWin.items.itemAt(0).getForm();

                                    var connFile1 = new Ext.data.Connection();
                                        if (!theForm.isValid()) {
                                            Ext.MessageBox.alert('Загрузка', 'Выбирите файл');
                                            return;
                                        }

                                        theForm.submit({
                                        params: {
                                         request_id:      GetReqId()},
                                         success: function(){
                                             Ext.MessageBox.alert('Загрузка','Файл добавлен к заявке '+ GetReqId());
                                               Write_File_tab();
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

                                                FileWin.hide();
                                              }

                                }]
                        })
                    });

               /*Конец окна добавления файла*/




                UniversalGrid.getSelectionModel().on('rowselect', function(sm, rowIdx, r) {
                                    SetReqId(r.data.reqid);
                                    OverwritePanels(r.data);

				});

                 UniversalGrid.on('afteredit',function(){saveTheRequest();});
                 /*событие с кнопки  "Создать заявку"
                  *Кнопка размещена на гриде в тулбаре
                  *
                  */
                 UniversalGrid.on('addTbClick',function(){
                     CreateReq(1);
                     //Ext.Msg.alert('test','Create request '+req_id)
                 });
                 /*событие с кнопки  "Создать заявку"
                  *Кнопка размещена на гриде в тулбаре
                  *
                  */
                 UniversalGrid.on('searchTbClick',function(){
                     gSearchMode = 'app_store_my_it';
                     ShowSearchWin();
                 //Ext.Msg.alert('test','Search  '+req_id)
                 });


                /*Эта конструкция ловит событие tabchange
                 *которое срабатывает на таб панели CommentFilesPanel
                 *Назначение конструкции: заполнить данными ещё не инициализированные табы
                 **/
                CommentFilesPanel.on({
                        afterrender :{
                            scope:this,
                            single:true,
                            fn:function() {
                                CommentFilesPanel.on('tach',function(){
                                    rewritePan()
                                });
                           }
                        }
                   });

                  function rewritePan(){
                            FilePan.tpl.overwrite(FilePan.body, {Name:pFilePanBody});
                            //CommentResp.tpl.overwrite(CommentResp.body, {comment:pRespCommBody});
                  }

                FilePan.on('addFiles', function(){
                      if (GetReqId() == 0){
                          Ext.Msg.alert('Внимание!','Выберите заявку, для добавления файла.')
                       } else {
                           FileWin.show();
                       }
                  });

                 /*добавляем коментарий*/
                   CommentApl.on('addComment', function(){GaddAddcom.call()});
                    var GaddAddcom = function(){
                       if (GetReqId() == 0){
                          Ext.Msg.alert('Внимание!','Выберите заявку, для добавления комментария.')
                       } else {
                           ComentWin.show();
                       }

                    };
//                   CommentResp.on('addComment', function(){GaddAddcomResp.call()});
//                    var GaddAddcomResp = function(){
//                       if (GetReqId() == 0){
//                          Ext.Msg.alert('Внимание!','Выберите заявку, для добавления комментария.')
//                       } else {
//                           ComentWin.show();
//                       }
//
//                    };
                    //GaddAddcom = GaddAddcom.createDelegate(this);
                /*конец добавляем коментарий*/

            /**/
//            function Write_Resp_coments_tab(){
//                var req_conn_comments_getter = new Ext.data.Connection();
//                               req_conn_comments_getter.request({
//                                  url: '../stores/req/tab/getter_comment.jsp',
//                                  params: {
//                                     group:'req'
//                                     ,reqid: GetReqId()
//                                  },
//                                  success: function(resp,opt) {
//                                     pRespCommBody = Ext.util.JSON.decode(
//                                       resp.responseText
//
//                                     );
//                                  CommentResp.tpl.overwrite(CommentResp.body, {comment:pRespCommBody});
//
//                                  },
//                                  failure: function(resp,opt) {
//                                     Ext.Msg.alert('Error','Ошибка связи');
//                                  }
//                                });
//            }

            function Write_Apl_coments_tab(){
                var app_conn_comments_getter = new Ext.data.Connection();
                               app_conn_comments_getter.request({
                                  url: '../stores/req/tab/getter_comment.jsp',
                                  params: {
                                     //group:'apl'
                                     reqid: req_id
                                  },
                                  success: function(resp,opt) {
                                     var Com = Ext.util.JSON.decode(
                                       resp.responseText

                                     );
                                      CommentApl.tpl.overwrite(CommentApl.body, {comment:Com});

                                  },
                                  failure: function(resp,opt) {
                                     Ext.Msg.alert('Error','Ошибка связи');
                                  }
                                });
            }

            function Write_File_tab(){
                var connFile = new Ext.data.Connection();
                connFile.request({

                              url: '../stores/req/tab/getter_files_name.jsp',
                              params: {
                                 reqid: req_id
                              },
                              success: function(resp,opt) {
                                   var Com = resp.responseText;
                                   pFilePanBody = Com;
                                   FilePan.tpl.overwrite(FilePan.body, {Name:Com});

                              },
                              failure: function(resp,opt) {
                                 Ext.Msg.alert('Error','Ошибка связи');
                              }
                            })
            }


            function OverwritePanels (data){
               /*активная заявка*/

               reqTextPanel.tpl.overwrite(reqTextPanel.body, data);
               //Write_Resp_coments_tab();
               Write_Apl_coments_tab();
               Write_File_tab();

            }


    }

 });
Ext.reg('it_read_tab', app.IT_read_tab);
// }}}


app.ITPR_all_tab =  Ext.extend(
    Ext.Panel,{
        initComponent: function(){

            var config = {
                   xtype: 'panel',
                    autoScroll : 1,
                    overflow:'auto',
                    layout: 'border',
                    items: [
                        {xtype:'univgridwithoutadd'
                        ,store: app_store_all
                        ,cm: IT_edit_cm_all
                         }
                      // eof    region: 'north'
                      // eof region: 'center'
                        ,{region: 'center'
                          ,xtype: 'panel'
                          ,height:150
                          ,layout: 'border'
                          ,split: true
                          ,border: false
                            ,items : [ {xtype: 'reqtexpan'
                                        ,region: 'west'
                                        ,width:400}
                                    ,{region: 'center'
                                      ,xtype:'filecomentstab_simple'
                                      ,title: 'Информация'
                                      ,split: true
                                      ,activeTab: 0}
                                   ]
                              }
                       // eof region: 'south'
                     ]
            }; // eo config object
            // Применяем config
            Ext.apply(this, Ext.apply(this.initialConfig, config));
            app.ITPR_all_tab.superclass.initComponent.apply(this, arguments);
            /**
             *ВНИМАНИЕ!!!
             *Зубодробильный код
             **/
            /*обращение к панелям по их айтем индексу */
            var UniversalGrid = this.items.itemAt(0);

            //var additionalPanel= this.items.itemAt(1);
            /*Здесь переход на второй уровень иерархии индексов,
             *так как панель текста коментариев находиться в в панеле ЮГ */
            var SouthRegion = this.items.itemAt(1);
            var reqTextPanel  = SouthRegion.items.itemAt(0);
            /*Переход на третий уровень иерархии,
             *так как вкладки находятсstore_jя в панеле ЦЕНТР*/
            var CommentFilesPanel = SouthRegion.items.itemAt(1);
            var CommentApl = CommentFilesPanel.items.itemAt(0);
            var FilePan    = CommentFilesPanel.items.itemAt(1);
            //var CommentResp = CommentFilesPanel.items.itemAt(2);
            /*Конец
             *Зубодробильный код.
             **/
             /*Различные приватные переменные используемые в этом Табе */
             /*Различные приватные переменные используемые в этом Табе */
              var req_id = 0;
              var pFilePanBody = '';
              var pAplCommBody = ' ';
              var pRespCommBody = ' ';
              var RequestsRowIndex = '-1';
              function SetReqId(p){
                  req_id = p;
              }

              function GetReqId(){
                  return req_id;
              }
            /*Окно для создания коментария*/
            var ComentWin = new app.CommentWindow({
                    items:  new Ext.FormPanel({
                            frame: true,
                            bodyStyle: 'padding:5px',
                            width: 550,
                            layout: 'column',
                            url: '../req/comment_save.jsp',
                            method: 'POST',
                            items: new Ext.form.HtmlEditor({
                                                    xtype:'htmleditor',
                                                    height:200,
                                                    anchor:'98%',
                                                    allowBlank: false
                                                    //,handler:
                                                    }),


                            buttons: [{
                                text: 'Сохранить',
                                handler: function() {
                                var HtmlEditor = ComentWin.items.itemAt(0).items.itemAt(0);
                                var theForm = ComentWin.items.itemAt(0).getForm();
                                var connComment1 = new Ext.data.Connection();
                                    theForm.submit({
                                    params: {
                                      request_id:    GetReqId()
                                     ,req_comment :  HtmlEditor.getValue()
                                     ,user_id :      gUserId
                                     },
                                     success: function(){
                                            Ext.MessageBox.alert('Коментарий','Ваш коментарий  к заявке '+ GetReqId() + ' создан');

                                            Write_Apl_coments_tab();
                                      //      Write_Resp_coments_tab();

                                            HtmlEditor.setValue('');
                                            ComentWin.hide();
                                  },
                                  failure: function(response){
                                     var result=response.responseText;
                                     Ext.MessageBox.alert('Коментарий','Ошибка создания коментария для заявки '+ GetReqId());
                                  }
                                })
                              }
                            }, {
                                text: 'Отмена',
                                handler: function(){ComentWin.hide();}
                            }]
                        })
                    });
               /*Конец окна для создания коментария*/
//////////////////////////////////////////////////////
               /*окно добавления файла*/
                var FileWin = new app.fileWindow({
                    items:  new Ext.FormPanel({
                            frame: true,
                            title: 'Добавить файл !',
                            bodyStyle: 'padding:5px',
                            width: 550,
                            layout: 'column',
                            //url: '../frm/req/AddFiles/upload_f.jsp',
                            url: 'upload_f.jsp',
                            method:'GET',
                            enctype:'multipart/form-data',
                            fileUpload: true,
                            items: new Ext.form.TextField({xtype: 'textfield',
                                        fieldLabel: 'Файл',
                                        labelSeparator: '',
                                        name: 'newPic',
                                        id:'newPic',
                                        style:'width: 300px',
                                        inputType: 'file',
                                        allowBlank: false}),


                            buttons: [{
                                    text: 'Загрузить файл',
                                    handler: function() {

                                    var theForm = FileWin.items.itemAt(0).getForm();

                                    var connFile1 = new Ext.data.Connection();
                                        if (!theForm.isValid()) {
                                            Ext.MessageBox.alert('Загрузка', 'Выбирите файл');
                                            return;
                                        }

                                        theForm.submit({
                                        params: {
                                         request_id:      GetReqId()},
                                         success: function(){
                                             Ext.MessageBox.alert('Загрузка','Файл добавлен к заявке '+ GetReqId());
                                               Write_File_tab();
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

                                                FileWin.hide();
                                              }

                                }]
                        })
                    });

               /*Конец окна добавления файла*/




                UniversalGrid.getSelectionModel().on('rowselect', function(sm, rowIdx, r) {
                                    SetReqId(r.data.reqid);
                                    OverwritePanels(r.data);
                                    
                                    RequestsSetRowClickIndex(rowIdx);
                                    SetGridData(r.data);

				});

                 UniversalGrid.on('afteredit',function(oGrid_event){
                       Ext.Ajax.request({

                          url: '../stores/req/helper/CUrequest.jsp',
                          params: {
                             user_id:gUserId 
                             ,reqid: oGrid_event.record.data.reqid
                             //responsibly_id: oGrid_event.record.data.Responsibly_Id,
                             ,responsibly_id: oGrid_event.record.data.resp_user_name
                             ,dt_execute: oGrid_event.record.data.dt_execute.format('Y-m-d')
                             //status: oGrid_event.record.data.Status,
                             ,Status_Name: oGrid_event.record.data.Status_Name
                             //status_name: Done,
                             //contract_number: oGrid_event.record.data.Contract_Number, // this time we'll format it thanks to ext
                             ,contract_number: 31337 // this time we'll format it thanks to ext
                             ,contract_date: oGrid_event.record.data.Contract_Date.format('Y-m-d')
                             ,contacrt_return_date: oGrid_event.record.data.Contract_Date.format('Y-m-d')
                             ,Contragent: oGrid_event.record.data.Contragent
                          },
                          success: function(response){

                             var result=eval(response.responseText);
                             switch(result){
                             case 1:
                                ///app_store_all.commitChanges();   // changes successful, get rid of the red triangles
                                app_store_all.reload();          // reload our datastore.
                                break;
                             default:
                                Ext.MessageBox.alert('Ошибка','Данные не сохранены.');
                                app_store_all.reload();          // reload our datastore.
                                break;
                             }
                          },
                          failure: function(response){
                             var result=response.responseText;
                             Ext.MessageBox.alert('Ошибка','Нет связи с базой данных. Повторите попытку позже.');
                          }
                       });
                      
                  });

                  var task = {
                        run: function(){
                            
                            
                            app_store_all.reload(); 
//                            if (RequestsRowIndex == -1){
//                                    //OverwritePanels('');
//                                    null;
//                                } else {
//                                    /*Нахожу ту строку на которй стоял перед редактированием
//                                    *и вновь выделяю её
//                                    **/                    
//                                 if (0 >= UniversalGrid.selectedRecords.length) {
//                                        return;
//                                    }
//                                    var newRecordsToSelect = [];
//                                    for (var i = 0; i < this.selectedRecords.length; i++) {
//                                        //record = UniversalGrid.getStore().getById(UniversalGrid.selectedRecords[i].getId());
//                                        if (!Ext.isEmpty(RequestsRowIndex)) {
//                                            newRecordsToSelect.push(RequestsRowIndex);
//                                        }
//                                    }
//                                    UniversalGrid.getSelectionModel().select(newRecordsToSelect);
//                                    UniversalGrid.getView().focusRow(newRecordsToSelect[0]);
//                                }
                                
                        },
                        interval: 100000 //1000 //1 second
                    }
                    Ext.TaskMgr.start(task);
                    
                    
                    var v_grid_data;
                    function SetGridData(data){
                            v_grid_data = data;
                        };
                    
                    function RequestsSetRowClickIndex(rInd){
                        RequestsRowIndex = rInd;
                        }; 
                    /*Оставляю курсор на выделенной строчке
                     *
                     **/
                    app_store_all.on('load',function(v_grid_data){
                        if (RequestsRowIndex == -1){
                            //OverwritePanels('');
                            null;
                        } else {
                            /*Нахожу ту строку на которй стоял перед редактированием
                            *и вновь выделяю её
                            **/                    
                            UniversalGrid.getSelectionModel().selectRow(RequestsRowIndex);
                            UniversalGrid.getView().focusRow(RequestsRowIndex);
                            
                            UniversalGrid.getView().getRow(RequestsRowIndex).scrollIntoView();
                            
                                      
                            //OverwritePanels();
                        }
                  
                   
            });  
                    

                 /*событие с кнопки  "Создать заявку"
                  *Кнопка размещена на гриде в тулбаре
                  *
                  */
                 UniversalGrid.on('addTbClick',function(){
                     CreateReq(1);
                     //Ext.Msg.alert('test','Create request '+req_id)
                 });
                 /*событие с кнопки  "Создать заявку"
                  *Кнопка размещена на гриде в тулбаре
                  *
                  */
                 UniversalGrid.on('searchTbClick',function(){
                     gSearchMode = 'app_store_all';
                     ShowSearchWin();
                 //Ext.Msg.alert('test','Search  '+req_id)
                 });


                /*Эта конструкция ловит событие tabchange
                 *которое срабатывает на таб панели CommentFilesPanel
                 *Назначение конструкции: заполнить данными ещё не инициализированные табы
                 **/
                CommentFilesPanel.on({
                        afterrender :{
                            scope:this,
                            single:true,
                            fn:function() {
                                CommentFilesPanel.on('tach',function(){
                                    rewritePan()
                                });
                           }
                        }
                   });

                  function rewritePan(){
                            FilePan.tpl.overwrite(FilePan.body, {Name:pFilePanBody});
//                            CommentResp.tpl.overwrite(CommentResp.body, {comment:pRespCommBody});
                  }

                FilePan.on('addFiles', function(){
                      if (GetReqId() == 0){
                          Ext.Msg.alert('Внимание!','Выберите заявку, для добавления файла.')
                       } else {
                           FileWin.show();
                       }
                  });

                 /*добавляем коментарий*/
                   CommentApl.on('addComment', function(){GaddAddcom.call()});
                    var GaddAddcom = function(){
                       if (GetReqId() == 0){
                          Ext.Msg.alert('Внимание!','Выберите заявку, для добавления комментария.')
                       } else {
                           ComentWin.show();
                       }

                    };
//                   CommentResp.on('addComment', function(){GaddAddcomResp.call()});
//                    var GaddAddcomResp = function(){
//                       if (GetReqId() == 0){
//                          Ext.Msg.alert('Внимание!','Выберите заявку, для добавления комментария.')
//                       } else {
//                           ComentWin.show();
//                       }
//
//                    };
                    //GaddAddcom = GaddAddcom.createDelegate(this);
                /*конец добавляем коментарий*/

            /**/
//            function Write_Resp_coments_tab(){
//                var req_conn_comments_getter = new Ext.data.Connection();
//                               req_conn_comments_getter.request({
//                                  url: '../stores/req/tab/getter_comment.jsp',
//                                  params: {
//                                     group:'req'
//                                     ,reqid: GetReqId()
//                                  },
//                                  success: function(resp,opt) {
//                                     pRespCommBody = Ext.util.JSON.decode(
//                                       resp.responseText
//
//                                     );
//                                  CommentResp.tpl.overwrite(CommentResp.body, {comment:pRespCommBody});
//
//                                  },
//                                  failure: function(resp,opt) {
//                                     Ext.Msg.alert('Error','Ошибка связи');
//                                  }
//                                });
//            }

            function Write_Apl_coments_tab(){
                var app_conn_comments_getter = new Ext.data.Connection();
                               app_conn_comments_getter.request({
                                  url: '../stores/req/tab/getter_comment.jsp',
                                  params: {
//                                     group:'apl'
//                                     ,reqid: req_id
                                     reqid: req_id

                                  },
                                  success: function(resp,opt) {
                                     var Com = Ext.util.JSON.decode(
                                       resp.responseText

                                     );
                                      CommentApl.tpl.overwrite(CommentApl.body, {comment:Com});

                                  },
                                  failure: function(resp,opt) {
                                     Ext.Msg.alert('Error','Ошибка связи');
                                  }
                                });
            }

            function Write_File_tab(){
                var connFile = new Ext.data.Connection();
                connFile.request({

                              url: '../stores/req/tab/getter_files_name.jsp',
                              params: {
                                 reqid: req_id
                              },
                              success: function(resp,opt) {
                                   var Com = resp.responseText;
                                   pFilePanBody = Com;
                                   FilePan.tpl.overwrite(FilePan.body, {Name:Com});

                              },
                              failure: function(resp,opt) {
                                 Ext.Msg.alert('Error','Ошибка связи');
                              }
                            })
            }


            function OverwritePanels (data){
               /*активная заявка*/

               reqTextPanel.tpl.overwrite(reqTextPanel.body, data);
            //   Write_Resp_coments_tab();
               Write_Apl_coments_tab();
               Write_File_tab();

            }


    }

 });
Ext.reg('itpr_all_tab', app.ITPR_all_tab);
// }}}
app.ITPR_forme_tab =  Ext.extend(
    Ext.Panel,{
        initComponent: function(){

            var config = {
                   xtype: 'panel',
                    autoScroll : 1,
                    overflow:'auto',
                    layout: 'border',
                    items: [
                        {xtype:'univgridwithoutadd'
                        ,store: app_store_forme
                        ,cm: IT_edit_cm_for_me
                         }
                      // eof    region: 'north'
                      // eof region: 'center'
                        ,{region: 'center'
                          ,xtype: 'panel'
                          ,height:150
                          ,layout: 'border'
                          ,split: true
                          ,border: false
                            ,items : [ {xtype: 'reqtexpan'
                                        ,region: 'west'
                                        ,width:400}
                                    ,{region: 'center'
                                      ,xtype:'filecomentstab_simple'
                                      ,title: 'Информация'
                                      ,split: true
                                      ,activeTab: 0}
                                   ]
                              }
                       // eof region: 'south'
                     ]
            }; // eo config object
            // Применяем config
            Ext.apply(this, Ext.apply(this.initialConfig, config));
            app.ITPR_forme_tab.superclass.initComponent.apply(this, arguments);
            /**
             *ВНИМАНИЕ!!!
             *Зубодробильный код
             **/
            /*обращение к панелям по их айтем индексу */
            var UniversalGrid = this.items.itemAt(0);

            //var additionalPanel= this.items.itemAt(1);
            /*Здесь переход на второй уровень иерархии индексов,
             *так как панель текста коментариев находиться в в панеле ЮГ */
            var SouthRegion = this.items.itemAt(1);
            var reqTextPanel  = SouthRegion.items.itemAt(0);
            /*Переход на третий уровень иерархии,
             *так как вкладки находятсstore_jя в панеле ЦЕНТР*/
            var CommentFilesPanel = SouthRegion.items.itemAt(1);
            var CommentApl = CommentFilesPanel.items.itemAt(0);
            var FilePan    = CommentFilesPanel.items.itemAt(1);
           // var CommentResp = CommentFilesPanel.items.itemAt(2);
            /*Конец
             *Зубодробильный код.
             **/
             /*Различные приватные переменные используемые в этом Табе */
             /*Различные приватные переменные используемые в этом Табе */
              var req_id = 0;
              var pFilePanBody = '';
              var pAplCommBody = ' ';
              var pRespCommBody = ' ';
              function SetReqId(p){
                  req_id = p;
              }

              function GetReqId(){
                  return req_id;
              }
            /*Окно для создания коментария*/
            var ComentWin = new app.CommentWindow({
                    items:  new Ext.FormPanel({
                            frame: true,
                            bodyStyle: 'padding:5px',
                            width: 550,
                            layout: 'column',
                            url: '../req/comment_save.jsp',
                            method: 'POST',
                            items: new Ext.form.HtmlEditor({
                                                    xtype:'htmleditor',
                                                    height:200,
                                                    anchor:'98%',
                                                    allowBlank: false
                                                    //,handler:
                                                    }),


                            buttons: [{
                                text: 'Сохранить',
                                handler: function() {
                                var HtmlEditor = ComentWin.items.itemAt(0).items.itemAt(0);
                                var theForm = ComentWin.items.itemAt(0).getForm();
                                var connComment1 = new Ext.data.Connection();
                                    theForm.submit({
                                    params: {
                                      request_id:    GetReqId()
                                     ,req_comment :  HtmlEditor.getValue()
                                     ,user_id :      gUserId
                                     },
                                     success: function(){
                                            Ext.MessageBox.alert('Коментарий','Ваш коментарий  к заявке '+ GetReqId() + ' создан');

                                            Write_Apl_coments_tab();
                                            //Write_Resp_coments_tab();

                                            HtmlEditor.setValue('');
                                            ComentWin.hide();
                                  },
                                  failure: function(response){
                                     var result=response.responseText;
                                     Ext.MessageBox.alert('Коментарий','Ошибка создания коментария для заявки '+ GetReqId());
                                  }
                                })
                              }
                            }, {
                                text: 'Отмена',
                                handler: function(){ComentWin.hide();}
                            }]
                        })
                    });
               /*Конец окна для создания коментария*/
//////////////////////////////////////////////////////
               /*окно добавления файла*/
                var FileWin = new app.fileWindow({
                    items:  new Ext.FormPanel({
                            frame: true,
                            title: 'Добавить файл',
                            bodyStyle: 'padding:5px',
                            width: 550,
                            layout: 'column',
                            //url: '../frm/req/AddFiles/upload_f.jsp',
                            url: 'upload_f.jsp',
                            method:'GET',
                            enctype:'multipart/form-data',
                            fileUpload: true,
                            items: new Ext.form.TextField({xtype: 'textfield',
                                        fieldLabel: 'Файл',
                                        labelSeparator: '',
                                        name: 'newPic',
                                        id:'newPic',
                                        style:'width: 300px',
                                        inputType: 'file',
                                        allowBlank: false}),


                            buttons: [{
                                    text: 'Загрузить файл',
                                    handler: function() {

                                    var theForm = FileWin.items.itemAt(0).getForm();

                                    var connFile1 = new Ext.data.Connection();
                                        if (!theForm.isValid()) {
                                            Ext.MessageBox.alert('Загрузка', 'Выбирите файл');
                                            return;
                                        }

                                        theForm.submit({
                                        params: {
                                         request_id:      GetReqId()},
                                         success: function(){
                                             Ext.MessageBox.alert('Загрузка','Файл добавлен к заявке '+ GetReqId());
                                               Write_File_tab();
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

                                                FileWin.hide();
                                              }

                                }]
                        })
                    });

               /*Конец окна добавления файла*/




                UniversalGrid.getSelectionModel().on('rowselect', function(sm, rowIdx, r) {
                                    SetReqId(r.data.reqid);
                                    OverwritePanels(r.data);

				});

                  UniversalGrid.on('afteredit',function(oGrid_event){
                       Ext.Ajax.request({

                          url: '../stores/req/helper/CUrequest.jsp',
                          params: {
                             user_id:gUserId
                             ,reqid: oGrid_event.record.data.reqid
                             //responsibly_id: oGrid_event.record.data.Responsibly_Id,
                             ,responsibly_id: oGrid_event.record.data.resp_user_name
                             ,dt_execute: oGrid_event.record.data.dt_execute.format('Y-m-d')
                             //status: oGrid_event.record.data.Status,
                             ,Status_Name: oGrid_event.record.data.Status_Name
                             //status_name: Done,
                             //contract_number: oGrid_event.record.data.Contract_Number, // this time we'll format it thanks to ext
                             ,contract_number: 31337 // this time we'll format it thanks to ext
                             ,contract_date: oGrid_event.record.data.Contract_Date.format('Y-m-d')
                             ,contacrt_return_date: oGrid_event.record.data.Contract_Date.format('Y-m-d')
                             ,Contragent: oGrid_event.record.data.Contragent
                          },
                          success: function(response){

                             var result=eval(response.responseText);
                             switch(result){
                             case 1:
                                ///app_store_all.commitChanges();   // changes successful, get rid of the red triangles
                                app_store_forme.reload();          // reload our datastore.
                                break;
                             default:
                                Ext.MessageBox.alert('Ошибка','Данные не сохранены.');
                                app_store_forme.reload();          // reload our datastore.
                                break;
                             }
                          },
                          failure: function(response){
                             var result=response.responseText;
                             Ext.MessageBox.alert('Ошибка','Нет связи с базой данных. Повторите попытку позже.');
                          }
                       });

                  });
                 /*событие с кнопки  "Создать заявку"
                  *Кнопка размещена на гриде в тулбаре
                  *
                  */
                 UniversalGrid.on('addTbClick',function(){
                     CreateReq(1);
                     //Ext.Msg.alert('test','Create request '+req_id)
                 });
                 /*событие с кнопки  "Создать заявку"
                  *Кнопка размещена на гриде в тулбаре
                  *
                  */
                 UniversalGrid.on('searchTbClick',function(){
                     gSearchMode = 'app_store_forme';
                     ShowSearchWin();
                 //Ext.Msg.alert('test','Search  '+req_id)
                 });


                /*Эта конструкция ловит событие tabchange
                 *которое срабатывает на таб панели CommentFilesPanel
                 *Назначение конструкции: заполнить данными ещё не инициализированные табы
                 **/
                CommentFilesPanel.on({
                        afterrender :{
                            scope:this,
                            single:true,
                            fn:function() {
                                CommentFilesPanel.on('tach',function(){
                                    rewritePan()
                                });
                           }
                        }
                   });

                  function rewritePan(){
                            FilePan.tpl.overwrite(FilePan.body, {Name:pFilePanBody});
                            CommentResp.tpl.overwrite(CommentResp.body, {comment:pRespCommBody});
                  }

                FilePan.on('addFiles', function(){
                      if (GetReqId() == 0){
                          Ext.Msg.alert('Внимание!','Выберите заявку, для добавления файла.')
                       } else {
                           FileWin.show();
                       }
                  });

                 /*добавляем коментарий*/
                   CommentApl.on('addComment', function(){GaddAddcom.call()});
                    var GaddAddcom = function(){
                       if (GetReqId() == 0){
                          Ext.Msg.alert('Внимание!','Выберите заявку, для добавления комментария.')
                       } else {
                           ComentWin.show();
                       }

                    };
//                   CommentResp.on('addComment', function(){GaddAddcomResp.call()});
//                    var GaddAddcomResp = function(){
//                       if (GetReqId() == 0){
//                          Ext.Msg.alert('Внимание!','Выберите заявку, для добавления комментария.')
//                       } else {
//                           ComentWin.show();
//                       }
//
//                    };
                    //GaddAddcom = GaddAddcom.createDelegate(this);
                /*конец добавляем коментарий*/

            /**/
//            function Write_Resp_coments_tab(){
//                var req_conn_comments_getter = new Ext.data.Connection();
//                               req_conn_comments_getter.request({
//                                  url: '../stores/req/tab/getter_comment.jsp',
//                                  params: {
//                                     group:'req'
//                                     ,reqid: GetReqId()
//                                  },
//                                  success: function(resp,opt) {
//                                     pRespCommBody = Ext.util.JSON.decode(
//                                       resp.responseText
//
//                                     );
//                                  CommentResp.tpl.overwrite(CommentResp.body, {comment:pRespCommBody});
//
//                                  },
//                                  failure: function(resp,opt) {
//                                     Ext.Msg.alert('Error','Ошибка связи');
//                                  }
//                                });
//            }

            function Write_Apl_coments_tab(){
                var app_conn_comments_getter = new Ext.data.Connection();
                               app_conn_comments_getter.request({
                                  url: '../stores/req/tab/getter_comment.jsp',
                                  params: {
                                     //group:'apl'
                                     reqid: req_id
                                  },
                                  success: function(resp,opt) {
                                     var Com = Ext.util.JSON.decode(
                                       resp.responseText

                                     );
                                      CommentApl.tpl.overwrite(CommentApl.body, {comment:Com});

                                  },
                                  failure: function(resp,opt) {
                                     Ext.Msg.alert('Error','Ошибка связи');
                                  }
                                });
            }

            function Write_File_tab(){
                var connFile = new Ext.data.Connection();
                connFile.request({

                              url: '../stores/req/tab/getter_files_name.jsp',
                              params: {
                                 reqid: req_id
                              },
                              success: function(resp,opt) {
                                   var Com = resp.responseText;
                                   pFilePanBody = Com;
                                   FilePan.tpl.overwrite(FilePan.body, {Name:Com});

                              },
                              failure: function(resp,opt) {
                                 Ext.Msg.alert('Error','Ошибка связи');
                              }
                            })
            }


            function OverwritePanels (data){
               /*активная заявка*/

               reqTextPanel.tpl.overwrite(reqTextPanel.body, data);
              // Write_Resp_coments_tab();
               Write_Apl_coments_tab();
               Write_File_tab();

            }


    }

 });
Ext.reg('itpr_forme_tab', app.ITPR_forme_tab);
// }}}



//{{{

app.Group_Secr_tab =  Ext.extend(
    Ext.Panel,{
        initComponent: function(){

            var config = {
                   xtype: 'panel',
                    autoScroll : 1,
                    overflow:'auto',
                    layout: 'border',
                    items: [
                        {xtype:'groupgridwithoutadd'
                        ,store: storeAllDepRequests_Secr
                        ,cm: group_view_cm
                         }
                      // eof    region: 'north'
                      // eof region: 'center'
                        ,{region: 'center'
                          ,xtype: 'panel'
                          ,height:150
                          ,layout: 'border'
                          ,split: true
                          ,border: false
                            ,items : [ {xtype: 'reqtexpan'
                                        ,region: 'west'
                                        ,width:400}
                                    ,{region: 'center'
                                      ,xtype:'filecomentstab'
                                      ,title: 'Информация'
                                      ,split: true
                                      ,activeTab: 0}
                                   ]
                              }
                       // eof region: 'south'
                     ]
            }; // eo config object
            // Применяем config
            Ext.apply(this, Ext.apply(this.initialConfig, config));
            app.Group_Secr_tab.superclass.initComponent.apply(this, arguments);
            /**
             *ВНИМАНИЕ!!!
             *Зубодробильный код
             **/
            /*обращение к панелям по их айтем индексу */
            var UniversalGrid = this.items.itemAt(0);

            //var additionalPanel= this.items.itemAt(1);
            /*Здесь переход на второй уровень иерархии индексов,
             *так как панель текста коментариев находиться в в панеле ЮГ */
            var SouthRegion = this.items.itemAt(1);
            var reqTextPanel  = SouthRegion.items.itemAt(0);
            /*Переход на третий уровень иерархии,
             *так как вкладки находятсstore_jя в панеле ЦЕНТР*/
            var CommentFilesPanel = SouthRegion.items.itemAt(1);
            var CommentApl = CommentFilesPanel.items.itemAt(0);
            var FilePan    = CommentFilesPanel.items.itemAt(1);
            var CommentResp = CommentFilesPanel.items.itemAt(2);
            /*Конец
             *Зубодробильный код.
             **/
             /*Различные приватные переменные используемые в этом Табе */
             /*Различные приватные переменные используемые в этом Табе */
              var req_id = 0;
              var pFilePanBody = '';
              var pAplCommBody = ' ';
              var pRespCommBody = ' ';
              function SetReqId(p){
                  req_id = p;
              }

              function GetReqId(){
                  return req_id;
              }
            /*Окно для создания коментария*/
            var ComentWin = new app.CommentWindow({
                    items:  new Ext.FormPanel({
                            frame: true,
                            bodyStyle: 'padding:5px',
                            width: 550,
                            layout: 'column',
                            url: '../req/comment_save.jsp',
                            method: 'POST',
                            items: new Ext.form.HtmlEditor({
                                                    xtype:'htmleditor',
                                                    height:200,
                                                    anchor:'98%',
                                                    allowBlank: false
                                                    //,handler:
                                                    }),


                            buttons: [{
                                text: 'Сохранить',
                                handler: function() {
                                var HtmlEditor = ComentWin.items.itemAt(0).items.itemAt(0);
                                var theForm = ComentWin.items.itemAt(0).getForm();
                                var connComment1 = new Ext.data.Connection();
                                    theForm.submit({
                                    params: {
                                      request_id:    GetReqId()
                                     ,req_comment :  HtmlEditor.getValue()
                                     ,user_id :      gUserId
                                     },
                                     success: function(){
                                            Ext.MessageBox.alert('Коментарий','Ваш коментарий  к заявке '+ GetReqId() + ' создан');

                                            Write_Apl_coments_tab();
                                            Write_Resp_coments_tab();

                                            HtmlEditor.setValue('');
                                            ComentWin.hide();
                                  },
                                  failure: function(response){
                                     var result=response.responseText;
                                     Ext.MessageBox.alert('Коментарий','Ошибка создания коментария для заявки '+ GetReqId());
                                  }
                                })
                              }
                            }, {
                                text: 'Отмена',
                                handler: function(){ComentWin.hide();}
                            }]
                        })
                    });
               /*Конец окна для создания коментария*/
//////////////////////////////////////////////////////
               /*окно добавления файла*/
                var FileWin = new app.fileWindow({
                    items:  new Ext.FormPanel({
                            frame: true,
                            title: 'Добавить файл',
                            bodyStyle: 'padding:5px',
                            width: 550,
                            layout: 'column',
                            //url: '../frm/req/AddFiles/upload_f.jsp',
                            url: 'upload_f.jsp',
                            method:'GET',
                            enctype:'multipart/form-data',
                            fileUpload: true,
                            items: new Ext.form.TextField({xtype: 'textfield',
                                        fieldLabel: 'Файл',
                                        labelSeparator: '',
                                        name: 'newPic',
                                        id:'newPic',
                                        style:'width: 300px',
                                        inputType: 'file',
                                        allowBlank: false}),


                            buttons: [{
                                    text: 'Загрузить файл',
                                    handler: function() {

                                    var theForm = FileWin.items.itemAt(0).getForm();

                                    var connFile1 = new Ext.data.Connection();
                                        if (!theForm.isValid()) {
                                            Ext.MessageBox.alert('Загрузка', 'Выбирите файл');
                                            return;
                                        }

                                        theForm.submit({
                                        params: {
                                         request_id:      GetReqId()},
                                         success: function(){
                                             Ext.MessageBox.alert('Загрузка','Файл добавлен к заявке '+ GetReqId());
                                               Write_File_tab();
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

                                                FileWin.hide();
                                              }

                                }]
                        })
                    });

               /*Конец окна добавления файла*/




                UniversalGrid.getSelectionModel().on('rowselect', function(sm, rowIdx, r) {
                                    SetReqId(r.data.reqid);
                                    OverwritePanels(r.data);

				});

                  UniversalGrid.on('afteredit',function(oGrid_event){
                       Ext.Ajax.request({

                          url: '../stores/req/helper/CUrequest.jsp',
                          params: {
                             user_id:gUserId
                             ,reqid: oGrid_event.record.data.reqid
                             //responsibly_id: oGrid_event.record.data.Responsibly_Id,
                             ,responsibly_id: oGrid_event.record.data.resp_user_name
                             ,dt_execute: oGrid_event.record.data.dt_execute.format('Y-m-d')
                             //status: oGrid_event.record.data.Status,
                             ,Status_Name: oGrid_event.record.data.Status_Name
                             //status_name: Done,
                             //contract_number: oGrid_event.record.data.Contract_Number, // this time we'll format it thanks to ext
                             ,contract_number: 31337 // this time we'll format it thanks to ext
                             ,contract_date: oGrid_event.record.data.Contract_Date.format('Y-m-d')
                             ,contacrt_return_date: oGrid_event.record.data.Contract_Date.format('Y-m-d')
                             ,Contragent: oGrid_event.record.data.Contragent
                          },
                          success: function(response){

                             var result=eval(response.responseText);
                             switch(result){
                             case 1:
                                ///app_store_all.commitChanges();   // changes successful, get rid of the red triangles
                                app_store_forme.reload();          // reload our datastore.
                                break;
                             default:
                                Ext.MessageBox.alert('Ошибка','Данные не сохранены.');
                                app_store_forme.reload();          // reload our datastore.
                                break;
                             }
                          },
                          failure: function(response){
                             var result=response.responseText;
                             Ext.MessageBox.alert('Ошибка','Нет связи с базой данных. Повторите попытку позже.');
                          }
                       });

                  });
                 /*событие с кнопки  "Создать заявку"
                  *Кнопка размещена на гриде в тулбаре
                  *
                  */
                 UniversalGrid.on('addTbClick',function(){
                     CreateReq(1);
                     //Ext.Msg.alert('test','Create request '+req_id)
                 });
                 /*событие с кнопки  "Создать заявку"
                  *Кнопка размещена на гриде в тулбаре
                  *
                  */
                 UniversalGrid.on('searchTbClick',function(){
                     gSearchMode = 'app_store_forme';
                     ShowSearchWin();
                 //Ext.Msg.alert('test','Search  '+req_id)
                 });


                /*Эта конструкция ловит событие tabchange
                 *которое срабатывает на таб панели CommentFilesPanel
                 *Назначение конструкции: заполнить данными ещё не инициализированные табы
                 **/
                CommentFilesPanel.on({
                        afterrender :{
                            scope:this,
                            single:true,
                            fn:function() {
                                CommentFilesPanel.on('tach',function(){
                                    rewritePan()
                                });
                           }
                        }
                   });

                  function rewritePan(){
                            FilePan.tpl.overwrite(FilePan.body, {Name:pFilePanBody});
                            CommentResp.tpl.overwrite(CommentResp.body, {comment:pRespCommBody});
                  }

                FilePan.on('addFiles', function(){
                      if (GetReqId() == 0){
                          Ext.Msg.alert('Внимание!','Выберите заявку, для добавления файла.')
                       } else {
                           FileWin.show();
                       }
                  });

                 /*добавляем коментарий*/
                   CommentApl.on('addComment', function(){GaddAddcom.call()});
                    var GaddAddcom = function(){
                       if (GetReqId() == 0){
                          Ext.Msg.alert('Внимание!','Выберите заявку, для добавления комментария.')
                       } else {
                           ComentWin.show();
                       }

                    };
                   CommentResp.on('addComment', function(){GaddAddcomResp.call()});
                    var GaddAddcomResp = function(){
                       if (GetReqId() == 0){
                          Ext.Msg.alert('Внимание!','Выберите заявку, для добавления комментария.')
                       } else {
                           ComentWin.show();
                       }

                    };
                    //GaddAddcom = GaddAddcom.createDelegate(this);
                /*конец добавляем коментарий*/

            /**/
            function Write_Resp_coments_tab(){
                var req_conn_comments_getter = new Ext.data.Connection();
                               req_conn_comments_getter.request({
                                  url: '../stores/req/tab/getter_comment.jsp',
                                  params: {
                                     group:'req'
                                     ,reqid: GetReqId()
                                  },
                                  success: function(resp,opt) {
                                     pRespCommBody = Ext.util.JSON.decode(
                                       resp.responseText

                                     );
                                  CommentResp.tpl.overwrite(CommentResp.body, {comment:pRespCommBody});

                                  },
                                  failure: function(resp,opt) {
                                     Ext.Msg.alert('Error','Ошибка связи');
                                  }
                                });
            }

            function Write_Apl_coments_tab(){
                var app_conn_comments_getter = new Ext.data.Connection();
                               app_conn_comments_getter.request({
                                  url: '../stores/req/tab/getter_comment.jsp',
                                  params: {
                                     group:'apl'
                                     ,reqid: req_id
                                  },
                                  success: function(resp,opt) {
                                     var Com = Ext.util.JSON.decode(
                                       resp.responseText

                                     );
                                      CommentApl.tpl.overwrite(CommentApl.body, {comment:Com});

                                  },
                                  failure: function(resp,opt) {
                                     Ext.Msg.alert('Error','Ошибка связи');
                                  }
                                });
            }

            function Write_File_tab(){
                var connFile = new Ext.data.Connection();
                connFile.request({

                              url: '../stores/req/tab/getter_files_name.jsp',
                              params: {
                                 reqid: req_id
                              },
                              success: function(resp,opt) {
                                   var Com = resp.responseText;
                                   pFilePanBody = Com;
                                   FilePan.tpl.overwrite(FilePan.body, {Name:Com});

                              },
                              failure: function(resp,opt) {
                                 Ext.Msg.alert('Error','Ошибка связи');
                              }
                            })
            }


            function OverwritePanels (data){
               /*активная заявка*/

               reqTextPanel.tpl.overwrite(reqTextPanel.body, data);
               Write_Resp_coments_tab();
               Write_Apl_coments_tab();
               Write_File_tab();

            }


    }

 });
Ext.reg('group_secr_tab', app.Group_Secr_tab);
// }}}


//{{{

app.Group_Adm_tab =  Ext.extend(
    Ext.Panel,{
        initComponent: function(){

            var config = {
                   xtype: 'panel',
                    autoScroll : 1,
                    overflow:'auto',
                    layout: 'border',
                    items: [
                        {xtype:'groupgridwithoutadd'
                        ,store: storeAllDepRequests
                        ,cm: group_view_cm
                         }
                      // eof    region: 'north'
                      // eof region: 'center'
                        ,{region: 'center'
                          ,xtype: 'panel'
                          ,height:150
                          ,layout: 'border'
                          ,split: true
                          ,border: false
                            ,items : [ {xtype: 'reqtexpan'
                                        ,region: 'west'
                                        ,width:400}
                                    ,{region: 'center'
                                      ,xtype:'filecomentstab'
                                      ,title: 'Информация'
                                      ,split: true
                                      ,activeTab: 0}
                                   ]
                              }
                       // eof region: 'south'
                     ]
            }; // eo config object
            // Применяем config
            Ext.apply(this, Ext.apply(this.initialConfig, config));
            app.Group_Adm_tab.superclass.initComponent.apply(this, arguments);
            /**
             *ВНИМАНИЕ!!!
             *Зубодробильный код
             **/
            /*обращение к панелям по их айтем индексу */
            var UniversalGrid = this.items.itemAt(0);

            //var additionalPanel= this.items.itemAt(1);
            /*Здесь переход на второй уровень иерархии индексов,
             *так как панель текста коментариев находиться в в панеле ЮГ */
            var SouthRegion = this.items.itemAt(1);
            var reqTextPanel  = SouthRegion.items.itemAt(0);
            /*Переход на третий уровень иерархии,
             *так как вкладки находятсstore_jя в панеле ЦЕНТР*/
            var CommentFilesPanel = SouthRegion.items.itemAt(1);
            var CommentApl = CommentFilesPanel.items.itemAt(0);
            var FilePan    = CommentFilesPanel.items.itemAt(1);
            var CommentResp = CommentFilesPanel.items.itemAt(2);
            /*Конец
             *Зубодробильный код.
             **/
             /*Различные приватные переменные используемые в этом Табе */
             /*Различные приватные переменные используемые в этом Табе */
              var req_id = 0;
              var pFilePanBody = '';
              var pAplCommBody = ' ';
              var pRespCommBody = ' ';
              function SetReqId(p){
                  req_id = p;
              }

              function GetReqId(){
                  return req_id;
              }
            /*Окно для создания коментария*/
            var ComentWin = new app.CommentWindow({
                    items:  new Ext.FormPanel({
                            frame: true,
                            bodyStyle: 'padding:5px',
                            width: 550,
                            layout: 'column',
                            url: '../req/comment_save.jsp',
                            method: 'POST',
                            items: new Ext.form.HtmlEditor({
                                                    xtype:'htmleditor',
                                                    height:200,
                                                    anchor:'98%',
                                                    allowBlank: false
                                                    //,handler:
                                                    }),


                            buttons: [{
                                text: 'Сохранить',
                                handler: function() {
                                var HtmlEditor = ComentWin.items.itemAt(0).items.itemAt(0);
                                var theForm = ComentWin.items.itemAt(0).getForm();
                                var connComment1 = new Ext.data.Connection();
                                    theForm.submit({
                                    params: {
                                      request_id:    GetReqId()
                                     ,req_comment :  HtmlEditor.getValue()
                                     ,user_id :      gUserId
                                     },
                                     success: function(){
                                            Ext.MessageBox.alert('Коментарий','Ваш коментарий  к заявке '+ GetReqId() + ' создан');

                                            Write_Apl_coments_tab();
                                            Write_Resp_coments_tab();

                                            HtmlEditor.setValue('');
                                            ComentWin.hide();
                                  },
                                  failure: function(response){
                                     var result=response.responseText;
                                     Ext.MessageBox.alert('Коментарий','Ошибка создания коментария для заявки '+ GetReqId());
                                  }
                                })
                              }
                            }, {
                                text: 'Отмена',
                                handler: function(){ComentWin.hide();}
                            }]
                        })
                    });
               /*Конец окна для создания коментария*/
//////////////////////////////////////////////////////
               /*окно добавления файла*/
                var FileWin = new app.fileWindow({
                    items:  new Ext.FormPanel({
                            frame: true,
                            title: 'Добавить файл',
                            bodyStyle: 'padding:5px',
                            width: 550,
                            layout: 'column',
                            //url: '../frm/req/AddFiles/upload_f.jsp',
                            url: 'upload_f.jsp',
                            method:'GET',
                            enctype:'multipart/form-data',
                            fileUpload: true,
                            items: new Ext.form.TextField({xtype: 'textfield',
                                        fieldLabel: 'Файл',
                                        labelSeparator: '',
                                        name: 'newPic',
                                        id:'newPic',
                                        style:'width: 300px',
                                        inputType: 'file',
                                        allowBlank: false}),


                            buttons: [{
                                    text: 'Загрузить файл',
                                    handler: function() {

                                    var theForm = FileWin.items.itemAt(0).getForm();

                                    var connFile1 = new Ext.data.Connection();
                                        if (!theForm.isValid()) {
                                            Ext.MessageBox.alert('Загрузка', 'Выбирите файл');
                                            return;
                                        }

                                        theForm.submit({
                                        params: {
                                         request_id:      GetReqId()},
                                         success: function(){
                                             Ext.MessageBox.alert('Загрузка','Файл добавлен к заявке '+ GetReqId());
                                               Write_File_tab();
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

                                                FileWin.hide();
                                              }

                                }]
                        })
                    });

               /*Конец окна добавления файла*/




                UniversalGrid.getSelectionModel().on('rowselect', function(sm, rowIdx, r) {
                                    SetReqId(r.data.reqid);
                                    OverwritePanels(r.data);

				});

                  UniversalGrid.on('afteredit',function(oGrid_event){
                       Ext.Ajax.request({

                          url: '../stores/req/helper/CUrequest.jsp',
                          params: {
                             user_id:gUserId
                             ,reqid: oGrid_event.record.data.reqid
                             //responsibly_id: oGrid_event.record.data.Responsibly_Id,
                             ,responsibly_id: oGrid_event.record.data.resp_user_name
                             ,dt_execute: oGrid_event.record.data.dt_execute.format('Y-m-d')
                             //status: oGrid_event.record.data.Status,
                             ,Status_Name: oGrid_event.record.data.Status_Name
                             //status_name: Done,
                             //contract_number: oGrid_event.record.data.Contract_Number, // this time we'll format it thanks to ext
                             ,contract_number: 31337 // this time we'll format it thanks to ext
                             ,contract_date: oGrid_event.record.data.Contract_Date.format('Y-m-d')
                             ,contacrt_return_date: oGrid_event.record.data.Contract_Date.format('Y-m-d')
                             ,Contragent: oGrid_event.record.data.Contragent
                          },
                          success: function(response){

                             var result=eval(response.responseText);
                             switch(result){
                             case 1:
                                ///app_store_all.commitChanges();   // changes successful, get rid of the red triangles
                                app_store_forme.reload();          // reload our datastore.
                                break;
                             default:
                                Ext.MessageBox.alert('Ошибка','Данные не сохранены.');
                                app_store_forme.reload();          // reload our datastore.
                                break;
                             }
                          },
                          failure: function(response){
                             var result=response.responseText;
                             Ext.MessageBox.alert('Ошибка','Нет связи с базой данных. Повторите попытку позже.');
                          }
                       });

                  });
                 /*событие с кнопки  "Создать заявку"
                  *Кнопка размещена на гриде в тулбаре
                  *
                  */
                 UniversalGrid.on('addTbClick',function(){
                     CreateReq(1);
                     //Ext.Msg.alert('test','Create request '+req_id)
                 });
                 /*событие с кнопки  "Создать заявку"
                  *Кнопка размещена на гриде в тулбаре
                  *
                  */
                 UniversalGrid.on('searchTbClick',function(){
                     gSearchMode = 'app_store_forme';
                     ShowSearchWin();
                 //Ext.Msg.alert('test','Search  '+req_id)
                 });


                /*Эта конструкция ловит событие tabchange
                 *которое срабатывает на таб панели CommentFilesPanel
                 *Назначение конструкции: заполнить данными ещё не инициализированные табы
                 **/
                CommentFilesPanel.on({
                        afterrender :{
                            scope:this,
                            single:true,
                            fn:function() {
                                CommentFilesPanel.on('tach',function(){
                                    rewritePan()
                                });
                           }
                        }
                   });

                  function rewritePan(){
                            FilePan.tpl.overwrite(FilePan.body, {Name:pFilePanBody});
                            CommentResp.tpl.overwrite(CommentResp.body, {comment:pRespCommBody});
                  }

                FilePan.on('addFiles', function(){
                      if (GetReqId() == 0){
                          Ext.Msg.alert('Внимание!','Выберите заявку, для добавления файла.')
                       } else {
                           FileWin.show();
                       }
                  });

                 /*добавляем коментарий*/
                   CommentApl.on('addComment', function(){GaddAddcom.call()});
                    var GaddAddcom = function(){
                       if (GetReqId() == 0){
                          Ext.Msg.alert('Внимание!','Выберите заявку, для добавления комментария.')
                       } else {
                           ComentWin.show();
                       }

                    };
                   CommentResp.on('addComment', function(){GaddAddcomResp.call()});
                    var GaddAddcomResp = function(){
                       if (GetReqId() == 0){
                          Ext.Msg.alert('Внимание!','Выберите заявку, для добавления комментария.')
                       } else {
                           ComentWin.show();
                       }

                    };
                    //GaddAddcom = GaddAddcom.createDelegate(this);
                /*конец добавляем коментарий*/

            /**/
            function Write_Resp_coments_tab(){
                var req_conn_comments_getter = new Ext.data.Connection();
                               req_conn_comments_getter.request({
                                  url: '../stores/req/tab/getter_comment.jsp',
                                  params: {
                                     group:'req'
                                     ,reqid: GetReqId()
                                  },
                                  success: function(resp,opt) {
                                     pRespCommBody = Ext.util.JSON.decode(
                                       resp.responseText

                                     );
                                  CommentResp.tpl.overwrite(CommentResp.body, {comment:pRespCommBody});

                                  },
                                  failure: function(resp,opt) {
                                     Ext.Msg.alert('Error','Ошибка связи');
                                  }
                                });
            }

            function Write_Apl_coments_tab(){
                var app_conn_comments_getter = new Ext.data.Connection();
                               app_conn_comments_getter.request({
                                  url: '../stores/req/tab/getter_comment.jsp',
                                  params: {
                                     group:'apl'
                                     ,reqid: req_id
                                  },
                                  success: function(resp,opt) {
                                     var Com = Ext.util.JSON.decode(
                                       resp.responseText

                                     );
                                      CommentApl.tpl.overwrite(CommentApl.body, {comment:Com});

                                  },
                                  failure: function(resp,opt) {
                                     Ext.Msg.alert('Error','Ошибка связи');
                                  }
                                });
            }

            function Write_File_tab(){
                var connFile = new Ext.data.Connection();
                connFile.request({

                              url: '../stores/req/tab/getter_files_name.jsp',
                              params: {
                                 reqid: req_id
                              },
                              success: function(resp,opt) {
                                   var Com = resp.responseText;
                                   pFilePanBody = Com;
                                   FilePan.tpl.overwrite(FilePan.body, {Name:Com});

                              },
                              failure: function(resp,opt) {
                                 Ext.Msg.alert('Error','Ошибка связи');
                              }
                            })
            }


            function OverwritePanels (data){
               /*активная заявка*/

               reqTextPanel.tpl.overwrite(reqTextPanel.body, data);
               Write_Resp_coments_tab();
               Write_Apl_coments_tab();
               Write_File_tab();

            }


    }

 });
Ext.reg('group_adm_tab', app.Group_Adm_tab);
// }}}