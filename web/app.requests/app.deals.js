/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */


Ext.ns("app");

app.Deals =  Ext.extend(
    Ext.Panel,{

        initComponent: function(){
            var config = {
                   xtype: 'panel'
                   ,autoScroll : 1
                   ,overflow:'auto'
                   ,layout: 'border'
                   ,items: [
                        {
                         xtype:'dealgrid'
                         ,store: deals_all
                         ,cm:  deal_edit_cm_all
                         }
                      // eof    region: 'north'
                       ,{
                          region: 'center',
                          xtype: 'dealtexpan'
                          //,scope:this
                        }
                      // eof region: 'center'

                        
                     ]
            }; // eo config object


            // Применяем config

            Ext.apply(this, Ext.apply(this.initialConfig, config));

            app.Deals.superclass.initComponent.apply(this, arguments);
            /**
             *ВНИМАНИЕ!!!
             *Зубодробильный код
             **/
            /*обращение к панелям по их айтем индексу */
            var UniversalGrid = this.items.itemAt(0);
            var dealsComentPanel= this.items.itemAt(1);
            
            /*Конец
             *Зубодробильный код.
             **/
             /*Различные приватные переменные используемые в этом Табе */
              var deal_id = 0;
              var pFilePanBody = '';
              var pAplCommBody = ' ';
              var pRespCommBody = ' ';
              function SetDealId(p){
                  deal_id = p;
              }

              function GetDealId(){
                  return deal_id;
              }
            /*Окно для создания сделки
             *
             *Создание сделки
                Function Create_Deal (
                   P_Addres Tl_Deals.Addres%Type,
                   P_Dep_Id  Tl_Deals.Tl_Depatments_Id%Type,
                   P_Broker_Sobstv  Tl_Deals.Broker_Sobstv%Type,
                   P_Broker_Client  Tl_Deals.Broker_Client%Type,
                   P_User_Id  Tl_Deals.User_Id%Type,
                   P_Sdelka   Tl_Deals.Sdelka%Type
  )
             *
             **/
            var dealWin = new app.DealWindow({
                    items:  new Ext.FormPanel({
                            frame: true,
                            bodyStyle: 'padding:5px',
                            //width: 550,
                            //layout: 'column',
                            url: '../stores/req/helper/deal_save.jsp',
                            method: 'POST',
                            items: [{xtype:'textfield',
                                    fieldLabel: 'Адрес'
                                    }
                                   ,{xtype: 'combo',
                                    store: DepStore,
                                    displayField: 'dep',
                                    valueField: 'dep_id',
                                    typeAhead: true,
                                    editable:true,
                                    mode: 'local',
                                    forceSelection: true,
                                    triggerAction: 'all',
                                    fieldLabel: 'Отдел',
                                    selectOnFocus: true}
                                    ,
                                    {xtype:'textfield',

                                    fieldLabel: 'Брокер собсвенника'
                                    }
                                    ,{xtype:'textfield',
                                    fieldLabel: 'Брокер клиента'
                                    }
                                    ,{xtype:'textfield',
                                    fieldLabel: 'Сделка'
                                    }
                               ]
                            ,buttons: [{
                                text: 'Сохранить',
                                handler: function() {
                                var txtAddres = dealWin.items.itemAt(0).items.itemAt(0);
                                var cbDep = dealWin.items.itemAt(0).items.itemAt(1);
                                var txtBrSobstv = dealWin.items.itemAt(0).items.itemAt(2);
                                var txtBrClient = dealWin.items.itemAt(0).items.itemAt(3);
                                var txtDeal = dealWin.items.itemAt(0).items.itemAt(4);

                                var theForm = dealWin.items.itemAt(0).getForm();
                               // var connComment1 = new Ext.data.Connection();
                                    theForm.submit({
                                    params: {
                                      Addres : txtAddres.getValue()
                                     ,Broker_Dep :  cbDep.getValue()
                                     ,Broker_Sobstv :  txtBrSobstv.getValue()
                                     ,Broker_Client :  txtBrClient.getValue()
                                     ,Sdelka :  txtDeal.getValue()
                                     ,user_id :     gUserId
                                     ,edit_fag:0
                                     },
                                     success: function(){
                                            Ext.MessageBox.alert('Сделка','Описание сделки создано!');

                                            
                                  },
                                  failure: function(response){
                                     var result=response.responseText;
                                     Ext.MessageBox.alert('Сделка','Ошибка создания описания сделки');
                                  }
                                })
                              }
                            }, {
                                text: 'Отмена',
                                handler: function(){dealWin.hide();}
                            }]
                        })
                    });
               /*Конец окна для создания сделки*/
//////////////////////////////////////////////////////
               /*Окно для создания коментария*/
            var ComentDealWin = new app.CommentWindow({
                    items:  new Ext.FormPanel({
                            frame: true,
                            bodyStyle: 'padding:5px',
                            width: 550,
                            layout: 'column',
                            url: '../stores/req/helper/comment_deal_save.jsp',
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
                                var HtmlEditor = ComentDealWin.items.itemAt(0).items.itemAt(0);
                                var theForm = ComentDealWin.items.itemAt(0).getForm();
                                var connComment1 = new Ext.data.Connection();
                                    theForm.submit({
                                    params: {
                                      deal_id:    deal_id
                                     ,req_comment :  HtmlEditor.getValue()
                                     ,user_id :     gUserId
                                     },
                                     success: function(){
                                            Ext.MessageBox.alert('Коментарий','Ваш коментарий  к сделки '+ deal_id + ' создан');
                                            HtmlEditor.setValue('');
                                            OverwriteComentPanel ();
                                            ComentDealWin.hide();
                                  },
                                  failure: function(response){
                                     var result=response.responseText;
                                     Ext.MessageBox.alert('Коментарий','Ошибка создания коментария для сделки '+ deal_id);
                                  }
                                })
                              }
                            }, {
                                text: 'Отмена',
                                handler: function(){ComentDealWin.hide();}
                            }]
                        })
                    });
               /*Конец окна для создания коментария*/



                UniversalGrid.getSelectionModel().on('rowselect', function(sm, rowIdx, r) {
                                    SetDealId(r.data.deal_id);
                                    OverwriteComentPanel();

				});

                  UniversalGrid.on('afteredit',function(oGrid_event){
                       Ext.Ajax.request({
                /*
                 *P_Deal_Id NUMBER,
                    P_Addres Tl_Deals.Addres%Type,
                    P_Dep_Id Tl_Deals.Tl_Depatments_Id%Type,
                    P_Broker_Sobstv Tl_Deals.Broker_Sobstv%Type,
                    P_Broker_Client Tl_Deals.Broker_Client%Type,
                    P_User_Id Tl_Deals.User_Id%Type,
                    P_Sdelka Tl_Deals.Sdelka%Type,
                    P_Is_Close Tl_Deals.Is_Close%Type )
                 *
                 **/
                          url: '../stores/req/helper/deal_save.jsp',
                          params: {

                              
                              deal_id: oGrid_event.record.data.deal_id
                             ,Addres: oGrid_event.record.data.Addres
                             ,Broker_Dep: oGrid_event.record.data.Broker_Dep
                             ,Broker_Sobstv: oGrid_event.record.data.Broker_Sobstv
                             ,Broker_Client: oGrid_event.record.data.Broker_Client
                             ,Sdelka: oGrid_event.record.data.Sdelka
                             ,user_id: gUserId
                             ,Is_Close: oGrid_event.record.data.Is_Close
                             ,edit_fag:1
                             
                          },
                          success: function(response){

                             
                                Ext.MessageBox.alert('Сделка','Данные сохранены.');
                                deals_all.reload();          // reload our datastore.
                                
                          },
                          failure: function(response){
                             var result=response.responseText;
                             Ext.MessageBox.alert('Ошибка','Нет связи с базой данных. Повторите попытку позже.');
                          }
                       });

                  });
                 /*событие с кнопки  "Создать сделку"
                  *Кнопка размещена на гриде в тулбаре
                  *
                  */
                 UniversalGrid.on('addDealClick',function(){

                    dealWin.show();
                   //Ext.Msg.alert('test','Create request '+deal_id)
                 });
                 /*событие с кнопки  "Создать заявку"
                  *Кнопка размещена на гриде в тулбаре
                  *
                  */

                 UniversalGrid.on('searchTbClick',function(){
                     gSearchMode = 'deals_all';
                     Ext.MessageBox.alert('Поиск','Форма поиска');
                     //ShowSearchDealWin();
                     
                 });


                 /*добавляем коментарий*/
                   UniversalGrid.on('addDealCommentClick', function(){GaddAddcom.call()});
                    var GaddAddcom = function(){
                       if (deal_id == 0){
                          Ext.Msg.alert('Внимание!','Выберите сделку, для добавления комментария.')
                       } else {
                           ComentDealWin.show();
                       }

                    };
                   
                /*конец добавляем коментарий*/

           



            function OverwriteComentPanel (){
               var app_deal_comments_getter = new Ext.data.Connection();
                               app_deal_comments_getter.request({
                                  url: '../stores/req/helper/getter_deal_comment.jsp',
                                  params: {
                                      deal_id: deal_id
                                  },
                                  success: function(resp,opt) {
                                     var Com = Ext.util.JSON.decode(
                                       resp.responseText
                                     );
                                      dealsComentPanel.tpl.overwrite(dealsComentPanel.body, {deal_text:Com});
                                  },
                                  failure: function(resp,opt) {
                                     Ext.Msg.alert('Error','Ошибка связи');
                                  }
                                });

            }


    } // e/o function initComponent

 });
Ext.reg('deals_all', app.Deals);
// }}}