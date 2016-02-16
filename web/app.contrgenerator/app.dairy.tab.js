/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

Ext.ns("app");


app.Dairytab =  Ext.extend(
    Ext.Panel,{
        initComponent: function(){

            var config = {
                   xtype: 'panel',
                    autoScroll : 1,
                    overflow:'auto',
                    layout: 'border',
                    items: [
                        //new MyObservableSingleton(store_j,AllITColumns)
                        {
                            region: 'north',
                            xtype :'dairygrid'
                        //,cm:{xtype:'all_ur_edit_cm'}
                         },
                         {
                          region: 'center'
                         ,xtype:'dairyitdetailpan'
                         }
                         
                    ]
            }; // eo config object


            // Применяем config

            Ext.apply(this, Ext.apply(this.initialConfig, config));

            app.Dairytab.superclass.initComponent.apply(this, arguments);

            var UniversalGrid = this.items.itemAt(0);
            var additionalPanel= this.items.itemAt(1);

            /*Конец окна для создания записи*/
            var RecordAddWin = new app.CommentWindow({
                items:  new Ext.FormPanel({
                    frame: true,
                    bodyStyle: 'padding:5px',
                    layout: 'column',
                    url: '../stores/req/helper/DairyRec_save.jsp',
                    method: 'POST',
                    items:[ 
                                {
                                        xtype:'htmleditor',
                                        name: 'txaRecordText',
                                        fieldLabel:'План на день',
                                        height:250,
                                        anchor:'98%',
                                        value:'<b>Что сделал?</b><br><br><b>Что запланировал?</b><br><br><b>С какими трудностями столкнулся?</b><br><br>'
                                        ,allowBlank: false}

                    ]
                    ,
                    buttons: [{
                        text: 'Сохранить',
                        handler: function() {
                            var HtmlEditor = RecordAddWin.items.itemAt(0).items.itemAt(0);
                            var theForm = RecordAddWin.items.itemAt(0).getForm();
                            theForm.submit({
                                params: {
                                     p_DAILY_PLAN :  HtmlEditor.getValue()
                                    ,p_user_id :      gUserId
                                },
                                success: function(){
                                    Ext.MessageBox.alert('Запись','Данные сохранены');
                                    HtmlEditor.setValue('');
                                    app_store_dairy.reload();
                                    RecordAddWin.hide();
                                },
                                failure: function(response){
                                    var result=response.responseText;
                                    Ext.MessageBox.alert('Запись','Ошибка сохранения данных ');
                                }
                            })
                        }
                    }, {
                        text: 'Отмена',
                        handler: function(){
                            RecordAddWin.hide();
                        }
                    }]
                })
            });
            /*Конец окна для создания записи */

            UniversalGrid.getSelectionModel().on('rowselect', function(sm, rowIdx, r) {
                                    OverwritePanels(r.data);
    			});
            UniversalGrid.on('addTbClick', function(){
                RecordAddWin.show();
                

            });
//            additionalPanel.on('editTbClick', function(){
//                RecordEditWin.show();
//            });
            function OverwritePanels (data){
               /*активная заявка*/
               //additionalPanel.DisTbar();
               additionalPanel.tpl.overwrite(additionalPanel.body, data);

            }
    }

 });
Ext.reg('dairytab', app.Dairytab);
// }}}
