/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */


Ext.ns("app");

app.URtab_all =  Ext.extend(
    Ext.Panel,{

        initComponent: function(){






            var config = {
                   xtype: 'panel'
                   ,autoScroll : 1
                   ,overflow:'auto'
                   ,layout: 'border'
                   ,items: [
                        {
                         xtype:'univgridwithoutadd'
                         ,store: app_store_all
                         ,cm:  UR_edit_cm_all
                         }
                      // eof    region: 'north'
                       ,{
                          xtype: 'addpan'
                          //,scope:this
                        }
                          // eof region: 'center'

                        ,{region: 'south'
                          ,xtype: 'panel'
                          ,height:150
                          ,layout: 'border'
                          ,split: true
                          ,border: false

                            ,items : [ {
                                            xtype: 'reqtexpan'
                                    //        ,id:'reqText'
                                            ,region: 'west'
                                        //    ,scope:this
                                            //,html: "west blanc"
                                        }
                                    ,
                                    {region: 'center'
                                      ,xtype: 'filecomentstab'
                                      //, xtype:'tabpanel'
                                      ,split: true
                                      ,activeTab: 0
                                 }
                                   ]
                              }

                       // eof region: 'south'
                     ]
            }; // eo config object


            // Применяем config

            Ext.apply(this, Ext.apply(this.initialConfig, config));


            app.URtab_all.superclass.initComponent.apply(this, arguments);
            /**
             *ВНИМАНИЕ!!!
             *Зубодробильный код
             **/
            /*обращение к панелям по их айтем индексу */
            var UniversalGrid = this.items.itemAt(0);

            var additionalPanel= this.items.itemAt(1);
            /*Здесь переход на второй уровень иерархии индексов,
             *так как панель текста коментариев находиться в в панеле ЮГ */
            var SouthRegion = this.items.itemAt(2);
            var reqTextPanel  = SouthRegion.items.itemAt(0);
            /*Переход на третий уровень иерархии,
             *так как вкладки находятся в панеле ЦЕНТР*/
            var CommentFilesPanel = SouthRegion.items.itemAt(1);
            var CommentApl = CommentFilesPanel.items.itemAt(0);
            var FilePan    = CommentFilesPanel.items.itemAt(1);
            var CommentResp = CommentFilesPanel.items.itemAt(2);

            /*Конец
             *Зубодробильный код.
             **/
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
                                     ,user_id :     gUserId
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
                 /*событие с кнопки  "Создать заявку"
                  *Кнопка размещена на гриде в тулбаре
                  *
                  */
                 UniversalGrid.on('addTbClick',function(){
                     
                   Ext.Msg.alert('test','Create request '+req_id)
                 });
                 /*событие с кнопки  "Создать заявку"
                  *Кнопка размещена на гриде в тулбаре
                  *
                  */
                 UniversalGrid.on('searchTbClick',function(){
                     gSearchMode = 'app_store_all';
                     ShowSearchWin();
                     //Ext.Msg.alert('test','Search  '+req_id+'app_store_all')
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

                      //Ext.Msg.alert('Error','Добавление файла')
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
               additionalPanel.tpl.overwrite(additionalPanel.body, data);
               reqTextPanel.tpl.overwrite(reqTextPanel.body, data);
               Write_Resp_coments_tab();
               Write_Apl_coments_tab();
               Write_File_tab();

                //CommentApl.tpl.overwrite(CommentApl.body, {comment:Com});
                    
                        
                        
                    
                    

            }


    } // e/o function initComponent
    
 });
Ext.reg('urtab_all', app.URtab_all);
// }}}


// {{{

app.URtab_for_me =  Ext.extend(
    Ext.Panel,{
        initComponent: function(){

            var config = {
                   xtype: 'panel',
                    //title: title,
                    autoScroll : 1,
                    overflow:'auto',
                   // frame: true,
                   layout: 'border',

                    //height:680,
                    //id: 'tbAllReqITTab',
                    items: [
                        //new MyObservableSingleton(store_j,AllITColumns)
                        {
                         xtype:'univgridwithoutadd'
                         ,store: app_store_forme
                         ,cm:  UR_edit_cm_for_me
                         }
                      // eof    region: 'north'
                       ,{
                          xtype: 'addpan'
                          //,scope:this
                        }
                          // eof region: 'center'

                        ,{region: 'south'
                          ,xtype: 'panel'
                          ,height:150
                          ,layout: 'border'
                          ,split: true
                          ,border: false

                            ,items : [ {
                                            xtype: 'reqtexpan'
                                    //        ,id:'reqText'
                                            ,region: 'west'
                                        //    ,scope:this
                                            //,html: "west blanc"
                                        }
                                    ,
                                    {region: 'center'
                                      ,xtype: 'filecomentstab'
                                      //, xtype:'tabpanel'
                                      ,split: true
                                      ,activeTab: 0
                                 }
                                   ]
                              }

                       // eof region: 'south'
                     ]
            }; // eo config object


            // Применяем config

            Ext.apply(this, Ext.apply(this.initialConfig, config));


            app.URtab_for_me.superclass.initComponent.apply(this, arguments);
            /**
             *ВНИМАНИЕ!!!
             *Зубодробильный код
             **/
            /*обращение к панелям по их айтем индексу */
            var UniversalGrid = this.items.itemAt(0);

            var additionalPanel= this.items.itemAt(1);
            /*Здесь переход на второй уровень иерархии индексов,
             *так как панель текста коментариев находиться в в панеле ЮГ */
            var SouthRegion = this.items.itemAt(2);
            var reqTextPanel  = SouthRegion.items.itemAt(0);
            /*Переход на третий уровень иерархии,
             *так как вкладки находятся в панеле ЦЕНТР*/
            var CommentFilesPanel = SouthRegion.items.itemAt(1);
            var CommentApl = CommentFilesPanel.items.itemAt(0);
            var FilePan    = CommentFilesPanel.items.itemAt(1);
            var CommentResp = CommentFilesPanel.items.itemAt(2);
            /*Конец
             *Зубодробильный код.
             **/
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
                                     ,user_id :     gUserId
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
                 UniversalGrid.on('addTbClick',function(){Ext.Msg.alert('test','Create request '+req_id)});
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

                      //Ext.Msg.alert('Error','Добавление файла')
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
               additionalPanel.tpl.overwrite(additionalPanel.body, data);
               reqTextPanel.tpl.overwrite(reqTextPanel.body, data);
               Write_Resp_coments_tab();
               Write_Apl_coments_tab();
               Write_File_tab();
                
                        
                    
                    

            }


    } // e/o function initComponent
    
 });
Ext.reg('urtab_for_me', app.URtab_for_me);
// }}}


// {{{

app.URtab_my =  Ext.extend(
    Ext.Panel,{
        initComponent: function(){

            var config = {
                   xtype: 'panel',
                    //title: title,
                    autoScroll : 1,
                    overflow:'auto',
                   // frame: true,
                   layout: 'border',

                    //height:680,
                    //id: 'tbAllReqITTab',
                    items: [
                        //new MyObservableSingleton(store_j,AllITColumns)
                        {
                         xtype:'univgrid'
                         ,store: app_store_my_ur
                         ,cm:  UR_edit_my
                         }
                      // eof    region: 'north'
                       ,{
                          xtype: 'addpan'
                          //,scope:this
                        }
                          // eof region: 'center'

                        ,{region: 'south'
                          ,xtype: 'panel'
                          ,height:150
                          ,layout: 'border'
                          ,split: true
                          ,border: false

                            ,items : [ {
                                            xtype: 'reqtexpan'
                                    //        ,id:'reqText'
                                            ,region: 'west'
                                        //    ,scope:this
                                            //,html: "west blanc"
                                        }
                                    ,
                                    {region: 'center'
                                      ,xtype: 'filecomentstab'
                                      //, xtype:'tabpanel'
                                      ,split: true
                                      ,activeTab: 0
                                 }
                                   ]
                              }

                       // eof region: 'south'
                     ]
            }; // eo config object


            // Применяем config

            Ext.apply(this, Ext.apply(this.initialConfig, config));


            app.URtab_my.superclass.initComponent.apply(this, arguments);
            /**
             *ВНИМАНИЕ!!!
             *Зубодробильный код
             **/
            /*обращение к панелям по их айтем индексу */
            var UniversalGrid = this.items.itemAt(0);

            var additionalPanel= this.items.itemAt(1);
            /*Здесь переход на второй уровень иерархии индексов,
             *так как панель текста коментариев находиться в в панеле ЮГ */
            var SouthRegion = this.items.itemAt(2);
            var reqTextPanel  = SouthRegion.items.itemAt(0);
            /*Переход на третий уровень иерархии,
             *так как вкладки находятся в панеле ЦЕНТР*/
            var CommentFilesPanel = SouthRegion.items.itemAt(1);
            var CommentApl = CommentFilesPanel.items.itemAt(0);
            var FilePan    = CommentFilesPanel.items.itemAt(1);
            var CommentResp = CommentFilesPanel.items.itemAt(2);
            /*Конец
             *Зубодробильный код.
             **/
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
                                     ,user_id :     gUserId
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

                 UniversalGrid.on('afteredit',function(){saveTheRequest();});
                 /*событие с кнопки  "Создать заявку"
                  *Кнопка размещена на гриде в тулбаре
                  *
                  */
                 UniversalGrid.on('addTbClick',function(){
                     CreateReq(2);
                     //Ext.Msg.alert('test','Create request '+req_id)
                 });
                 /*событие с кнопки  "Создать заявку"
                  *Кнопка размещена на гриде в тулбаре
                  *
                  */
                 UniversalGrid.on('searchTbClick',function(){
                     gSearchMode = 'app_store_my_ur';
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

                  FilePan.on('addFiles', function(){Ext.Msg.alert('Error','Добавление файла')});


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
               additionalPanel.tpl.overwrite(additionalPanel.body, data);
               reqTextPanel.tpl.overwrite(reqTextPanel.body, data);
               Write_Resp_coments_tab();
               Write_Apl_coments_tab();
               Write_File_tab();

            }


    } // e/o function initComponent

 });
Ext.reg('urtab_my', app.URtab_my);
// }}}