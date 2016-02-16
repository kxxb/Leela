/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

Ext.ns("app");


app.Userstab =  Ext.extend(
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
                           xtype :'deptree'
                        //,cm:{xtype:'all_ur_edit_cm'}
                         },
                         {
                          region: 'center'
                         ,xtype:'usergrid'
                         }
                         ,{
                          region: 'east'
                         ,xtype:'userdetailpan'
                         }
                    ]
            }; // eo config object


            // Применяем config

            Ext.apply(this, Ext.apply(this.initialConfig, config));

            app.Userstab.superclass.initComponent.apply(this, arguments);
            var v_user_id = 0;
            var v_user_Name = '';
            var v_user_Login = '';
            var v_user_Pass = '';
            var v_user_email = '';
            var v_user_tel_internal = '';
            var v_user_tel_cel = '';

            var v_user_dep_id = '';
            var v_user_rank_id = '';
            var v_user_group_id = '';
            var v_user_ip = '';
            var v_user_birthday = '';
            var v_user_work_from = '';
            var v_user_status = '';
            var v_work_position = '';
            var v_tl_departmenst_id= '';
            var v_groupid ='';

            var UniversalGrid = this.items.itemAt(1);
            var additionalPanel= this.items.itemAt(2);


            UniversalGrid.getSelectionModel().on('rowselect', function(sm, rowIdx, r) {
                                    OverwritePanels(r.data);
                                    v_user_id = r.data.user_id;
                                    v_user_Name = r.data.name;
                                    v_user_Login = r.data.login;
             v_user_Pass = r.data.pass;
             v_user_email = r.data.email;
             v_user_tel_internal = r.data.tel_internal;
            v_user_tel_cel = r.data.tel_cellular;

             v_user_dep_id = r.data.tl_departmenst_id;
             v_user_rank_id = r.data.tl_users_rank_id;
             v_user_group_id = r.data.groupid;

             v_user_birthday =  r.data.birth_date;
             v_user_work_from = r.data.date_work_from;
             v_user_status = r.data.status;
             v_work_position = r.data.work_position;
             
             
             v_user_ip= r.data.user_local_ip;



    			});
            UniversalGrid.on('addTbClick', function(){
                v_user_id = 0;
                  
                    /*загрузк данных и редактирование*/
                    
                    UserAddWin.show();
                    //Ext.MessageBox.alert('Сотрудник',v_user_Name);
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

                        v_user_id = 0;
             v_user_Name = '';
             v_user_Login = '';
             v_user_Pass = '';
             v_user_email = '';
             v_user_tel_internal = '';
             v_user_tel_cel = '';

             v_user_dep_id = '';
             v_user_rank_id = '';
             v_user_group_id = '';
             v_user_ip = '';
             v_user_birthday = '';
             v_user_work_from = '';
             v_user_status = '';
             v_work_position = '';
             v_tl_departmenst_id= '';
             v_groupid ='';

                    Userid.setValue(v_user_id);
                    UserName.setValue(v_user_Name);
                    UserLogin.setValue(v_user_Login);
                    UserPass.setValue(v_user_Pass);
                    UserEmail.setValue(v_user_email);
                    UserTelInter.setValue(v_user_tel_internal);
                    UserTelCel.setValue(v_user_tel_cel);
                    UserWorkPosition.setValue(v_work_position);
                    cbDep.setValue(v_user_dep_id);
                    cbRank.setValue(v_user_rank_id);
                    cbGroup.setValue(v_user_group_id);
                    UserIp.setValue(v_user_ip);
                    UserBirthday.setValue(v_user_birthday);
                    UserWorkFrom.setValue(v_user_work_from);
                    UserStatus.setValue(v_user_status);
                   //UserAddWin.getCmp('Uname').setValue('test');

                

                
                //Ext.MessageBox.alert('Сотрудник','Создаю сотрудника ');

            });


            UniversalGrid.on('editTbClick', function(){
                if (v_user_id == 0) {
                  Ext.MessageBox.alert('Сотрудник','Выберите сотрудника, для редактирования.');
                }else{
                    /*загрузк данных и редактирование*/

                    UserAddWin.show();
                    //Ext.MessageBox.alert('Сотрудник',v_user_Name);
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

                    Userid.setValue(v_user_id);
                    UserName.setValue(v_user_Name);
                    UserLogin.setValue(v_user_Login);
                    UserPass.setValue(v_user_Pass);
                    UserEmail.setValue(v_user_email);
                    UserTelInter.setValue(v_user_tel_internal);
                    UserTelCel.setValue(v_user_tel_cel);
                    UserWorkPosition.setValue(v_work_position);
                    cbDep.setValue(v_user_dep_id);
                    cbRank.setValue(v_user_rank_id);
                    cbGroup.setValue(v_user_group_id);
                    UserIp.setValue(v_user_ip);
                    UserBirthday.setValue(v_user_birthday);
                    
                    UserWorkFrom.setValue(v_user_birthday);
                    UserStatus.setValue(v_user_status);
                   //UserAddWin.getCmp('Uname').setValue('test');

                };


                //Ext.MessageBox.alert('Сотрудник','Создаю сотрудника ');

            });
            UniversalGrid.on('editFotoTbClick', function(){
                if (v_user_id == 0) {
                  Ext.MessageBox.alert('Сотрудник','Выберите сотрудника, для редактирования.');
                }else{
                    UserPicWindow.items.itemAt(0).items.itemAt(0).setValue(v_user_id);
                    if(!UserPicWindow.isVisible()){
                        UserPicWindow.show();
                      } else {
                        UserPicWindow.toFront();
                      }
                }
            });



            
            function OverwritePanels (data){
               /*активная заявка*/
               //additionalPanel.DisTbar();
               additionalPanel.tpl.overwrite(additionalPanel.body, data);

            }
    }

 });
Ext.reg('usertab', app.Userstab);
// }}}
