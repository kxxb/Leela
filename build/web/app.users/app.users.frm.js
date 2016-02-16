/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

Ext.ns("app");

app.CommentWindow =  Ext.extend(Ext.Window,{
    initComponent: function(){
        var config ={
            title: 'Сотрудник'
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

/*Конец окна для создания сотрудника (Админы)*/
var UserAddWin = new app.CommentWindow({
    items:  new Ext.FormPanel({
        frame: true,
        //enctype:'multipart/form-data',
        //fileUpload: true,
        bodyStyle: 'padding:5px',
        layout: 'column',
        url: '../stores/req/helper/AddEditUser.jsp',
//        method: 'POST',
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


                    {
                        xtype:'hidden'      // textfield
                        ,value:0
                        ,name:'user_id'
                    }
                    ,{
                        xtype:'textfield'      // textfield
                        ,fieldLabel:'ФИО'
                        ,name:'name'
                    }
                    ,new Ext.form.TextField({
                        xtype:'textfield',      // textfield
                        fieldLabel:'login',
                        name:'login'
                    })
                    ,new Ext.form.TextField({
                        xtype:'textfield',      // textfield
                        fieldLabel:'Пароль',
                        name:'pass'
                    })
                    ,new Ext.form.TextField({
                        xtype:'textfield',      // textfield
                        fieldLabel:'email',
                        name:'email'
                    })
                    ,new Ext.form.TextField({
                        xtype:'textfield',      // textfield
                        fieldLabel:'Внутренний тел.',
                        name:'tel_internal'
                    })
                    ,new Ext.form.TextField({
                        xtype:'textfield',      // textfield
                        fieldLabel:'Мобильный тел.',
                        name:'tel_cellular'
                    })
                    ,{
                        xtype:'textfield',      // textfield
                        fieldLabel:'Должность',
                        name:'work_position'
                    }

                                                
                    ]
                    }
                ,{
                    columnWidth:.5,
                    layout: 'form',
                    items: [

                    new Ext.form.ComboBox({
                        xtype: 'combo',
                         store: DepStore,
                        displayField: 'dep',
                        valueField: 'dep_id',
                        typeAhead: true,
                        editable:true,
                        mode: 'local',
                        forceSelection: true,
                        triggerAction: 'all',
                        fieldLabel: 'Отдел',
                        selectOnFocus: true,
                        anchor:'95%',
                        name:'tl_departmenst_id'

                    })
                    ,new Ext.form.ComboBox({
                        xtype: 'combo',
                         store: UserRankStore,
                        displayField: 'rank_desc',
                        valueField: 'rank_id',
                        typeAhead: true,
                        editable:true,
                        mode: 'local',
                        forceSelection: true,
                        triggerAction: 'all',
                        fieldLabel: 'Должность',
                        selectOnFocus: true,
                        anchor:'95%',
                        name:'tl_users_rank_id'

                    })
                    ,new Ext.form.ComboBox({
                        xtype: 'combo',
                        store: UserGroupStore,
                        displayField: 'group_desc',
                        valueField: 'group_id',
                        typeAhead: true,
                        editable:true,
                        mode: 'local',
                        forceSelection: true,
                        triggerAction: 'all',
                        fieldLabel: 'Группа',
                        selectOnFocus: true,
                        anchor:'95%',
                        name:'groupid'

                    })
                    ,new Ext.form.TextField({
                        xtype:'textfield',      // textfield
                        fieldLabel:'ip адрес',
                        name:'user_local_ip'
                    })
                    ,{
                        xtype:'hidden'      // textfield
                        ,value:'12.12.2012'
                        ,name:'birth_date'
                    }
                    ,{
                        xtype:'hidden'      // textfield
                        ,value:'12.12.2012'
                        ,name:'date_work_from'
                    }
                    /* после отпуска доделаю
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
                    */
                    ,{
                        xtype: 'radiogroup',
                        fieldLabel: 'Статус',
                        items: [
                            {boxLabel: 'Работает', name: 'status', inputValue: 1},
                            {boxLabel: 'Уволен', name: 'status', inputValue: 0}
                        ]
                    }
                          
                    ]
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
                    var theForm = UserAddWin.items.itemAt(0).getForm();
                    var FormColumnOne = UserAddWin.items.itemAt(0).items.itemAt(0).items.itemAt(0).items.itemAt(0);
                    var FormColumnTwo = UserAddWin.items.itemAt(0).items.itemAt(0).items.itemAt(0).items.itemAt(1);

                    var Userid = FormColumnOne.items.itemAt(0);
                    var UserName = FormColumnOne.items.itemAt(1);
                    var UserLogin = FormColumnOne.items.itemAt(2);
                    var UserPass = FormColumnOne.items.itemAt(3);
                    var UserEmail = FormColumnOne.items.itemAt(4);
                    var UserTelInter = FormColumnOne.items.itemAt(5);
                    var UserTelCel = FormColumnOne.items.itemAt(6);
                    var UserWorkPosition = FormColumnOne.items.itemAt(7);


                    var cbDep = FormColumnTwo.items.itemAt(0);
                    var cbRank = FormColumnTwo.items.itemAt(1);
                    var cbGroup = FormColumnTwo.items.itemAt(2);

                    var UserIp = FormColumnTwo.items.itemAt(3);
                    var UserBirthday = FormColumnTwo.items.itemAt(4);
                    var UserWorkFrom = FormColumnTwo.items.itemAt(5);
                    var UserStatus = FormColumnTwo.items.itemAt(6);
                
                
                
                var connComment1 = new Ext.data.Connection();
                
                theForm.submit({
                    method:'POST',
                        
                   params: {
                
                         edit_fag   :0
                        ,user_id_val :  Userid.getValue()
                        ,login_val :  UserLogin.getValue()
                        ,pass_val :  UserPass.getValue()
                        ,status_val :  UserStatus.getValue()
                        ,name_val :  UserName.getValue()
                        ,tl_departmenst_id_val :  cbDep.getValue()
                        ,tl_users_rank_id_val :  cbRank.getValue()
                        ,email_val :  UserEmail.getValue()
                        ,tel_cellular_val :  UserTelCel.getValue()
                        ,tel_internal_val :  UserTelInter.getValue()
                        ,work_position_val :  UserWorkPosition.getValue()
                        ,birth_date_val :  UserBirthday.getValue()
                        ,date_work_from_val :  UserWorkFrom.getValue()
                        ,groupid_val :  cbGroup.getValue()
                        ,user_local_ip_val:  UserIp.getValue()
                        ,g_user_id_val :      gUserId

                    },
                    success: function(){
                        Ext.MessageBox.alert('Сотрудник','Данные сохранены');


                          UserLogin.setValue('');
                          UserPass.setValue('');
                          UserStatus.setValue('');
                          UserName.setValue('');
                          cbDep.setValue('');
                          cbRank.setValue('');
                          UserEmail.setValue('');
                          UserTelCel.setValue('');
                          UserTelInter.setValue('');
                          UserWorkPosition.setValue('');
                          UserBirthday.setValue('');
                          UserWorkFrom.setValue('');
                         cbGroup.setValue('');
                         UserIp.setValue('');
                        UserAddWin.hide();
                        app_store_users.reload();


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

                         
                UserAddWin.hide();
                app_store_users.reload();
            }
        }]
    })
});
/*Конец окна для создания сотрудника (Админы)*/




/*Форма загрузки файлов**/





    

    var UserPicForm = new Ext.FormPanel({
    frame: true,
    title: 'Добавить файл',
    bodyStyle: 'padding:5px',
    layout: 'column',
    url: '../stores/req/helper/AddEditUserPic.jsp',
    
    enctype:'multipart/form-data',
    fileUpload: true,
    items: [{
        xtype:'hidden',      // textfield
        value:0,
        name:'user_id'
       },
       {
        xtype: 'textfield',
        fieldLabel: 'Файл',
        labelSeparator: '',
        name: 'newPic',
        style:'width: 300px',
        inputType: 'file',
        allowBlank: false
    }],

    buttons: [{
        text: 'Загрузить файл',
        handler: function() {
            var theForm = UserPicForm.getForm();
            var v_user_id =      theForm.items.itemAt(0).getValue();
            theForm.submit({
                params: {
                    edit_fag   :1,
                    user_id_val:      v_user_id
                },
                success: function(){
                    Ext.MessageBox.alert('Загрузка','Файл добавлен к заявке ');
                      

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

            UserPicWindow.hide();
        }

    }]
});





var  UserPicWindow = new Ext.Window({
      
      title: 'Update build',
      closable:true,
      iconCls:'win',
      closeAction: "hide",
      width: 550,
      height: 300,
      plain:true,
      layout: 'fit',
      items: UserPicForm
    });

/*конец формы загрузки файлов*/