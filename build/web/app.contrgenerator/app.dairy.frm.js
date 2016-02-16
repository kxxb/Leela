/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

Ext.ns("app");

app.CommentWindow =  Ext.extend(Ext.Window,{
    initComponent: function(){
        var config ={
            title: 'Запись'
            ,closable:true
            ,iconCls:'win'
            ,closeAction: "hide"
            ,width: 600
            ,height: 310
            ,plain:true
            ,layout: 'fit'

        };
        Ext.apply(this, Ext.apply(this.initialConfig, config));
        app.CommentWindow.superclass.initComponent.apply(this, arguments);

    } // eo function initComponent

});
Ext.reg('commentwindow', app.CommentWindow);





/*Конец окна для редактирования данных сотрудника */
var UserEditWin = new app.CommentWindow({
    items:  new Ext.FormPanel({
        frame: true,
        bodyStyle: 'padding:5px',
        layout: 'column',
        url: '../req/comment_save.jsp',
        method: 'POST',
        items:[ new Ext.form.FieldSet({
            xtype: 'fieldset',
            autoHeight: true,
            layout: 'form',
            collapsed: false,   // initially collapse the group
            collapsible: false,
            items:[{
                layout:'column',
                items:[{
                    columnWidth:.5,
                    layout: 'form',
                    items: [
                    new Ext.form.Hidden({
                        value:0
                        ,name:'user_id'
                    })
                    ,new Ext.form.TextField({
                        xtype:'textfield',      // textfield
                        fieldLabel:'ФИО',
                        name:'name'
                    })

                    ,new Ext.form.TextField({
                        xtype:'textfield',      // textfield
                        fieldLabel:'Пароль',
                        name:'password'
                    })
                    ,new Ext.form.TextField({
                        xtype:'textfield',      // textfield
                        fieldLabel:'email',
                        name:'email'
                    })
                    


                    ]
                    }
                ,{
                    columnWidth:.5,
                    layout: 'form',
                    items: [
                     new Ext.form.TextField({
                        xtype:'textfield',      // textfield
                        fieldLabel:'Внутренний тел.',
                        name:'tel_internal'
                    })
                    ,new Ext.form.TextField({
                        xtype:'textfield',      // textfield
                        fieldLabel:'Мобильный тел.',
                        name:'tel_cellular'
                    })
                    ,new Ext.form.DateField({
                        xtype:'datefield',      // datefield
                        fieldLabel:'Дата рождения',
                        format: 'd/m/Y',
                        name:'birth_date'
                    })
                    ,new Ext.form.DateField({
                        xtype:'datefield',      // datefield
                        fieldLabel:'работает с',
                        format: 'd/m/Y',
                        name:'date_work_from'
                    })

                    ]
                    }
                ,{
                    columnWidth:1,
                    layout: 'form',
                    items: 
                        new Ext.form.FieldSet({
                        xtype: 'fieldset',
                        autoHeight: true,
                        layout: 'form',
                        collapsed: false,   // initially collapse the group
                        collapsible: false,
                        items:
                                  new Ext.form.TextField({
                                    xtype: 'textfield',
                                    fieldLabel: 'Файл изображения',
                                    labelSeparator: '',
                                    name: 'newPic',
                                    
                                    style:'width: 300px',
                                    inputType: 'file',
                                    allowBlank: false
                                })
                          })
                    
                    }


                ]
            }

            ]
        })//fildset

        ]
        ,
        buttons: [{
            text: 'Сохранить',
            handler: function() {
                var HtmlEditor = UserAddWin.items.itemAt(0).items.itemAt(0);
                var theForm = UserAddWin.items.itemAt(0).getForm();
                var connComment1 = new Ext.data.Connection();
                theForm.submit({
                    params: {
                         request_id:    GetReqId()
                        ,req_comment :  HtmlEditor.getValue()
                        ,user_id :      gUserId
                    },
                    success: function(){
                        Ext.MessageBox.alert('Сотрудник','Данные сохранены');
                        Write_Apl_coments_tab();
                        Write_Resp_coments_tab();
                        HtmlEditor.setValue('');
                    },
                    failure: function(response){
                        var result=response.responseText;
                        Ext.MessageBox.alert('Сотрудник','Ошибка сохранения данных ');
                    }
                })
            }
        }, {
            text: 'Отмена',
            handler: function(){
                UserEditWin.hide();
            }
        }]
    })
});

/*Конец окна для редактирования данных сотрудника */