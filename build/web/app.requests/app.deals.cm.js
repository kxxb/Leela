/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */


Ext.ns("app");
     function title_user(val, x, store_j){
          return '<b>'+val+'</b> ('+store_j.data.User_Dep+')';
        }




        var release_edit1 = new Ext.form.DateField({
              format: 'd/m/Y'
            });

        var release_edit = new Ext.form.DateField({
              format: 'd/m/Y'
            });








var deal_edit_cm_all = new Ext.grid.ColumnModel( [
       new Ext.grid.RowNumberer(),
                    {
                    header: '#',
                    readOnly: true,
                    dataIndex: 'deal_id', // this is where the mapped name is important!
                    width: 50,
                    sortable: true,

                    hidden: false
                  }
                  
               ,{header: 'Дата начала', width: 100, sortable: true,
                  //renderer: Ext.util.Format.dateRenderer('d.m.Y H:i'),
                  //editor:release_edit1,
                  dataIndex: 'Date_Open'
                }
               ,{header: 'Дата завершения', width: 100, sortable: true,
                  dataIndex: 'Date_Close'
                }
              ,{
                header: 'Адрес',
                dataIndex: 'Addres',
                width: 150,
                editor: new Ext.form.TextField({
                  allowBlank: false,
                  maxLength: 2000
                  })
              }
               ,{header: 'Отдел',
                            width: 175,
                            sortable: true,
                            dataIndex: 'Broker_Dep'
                            ,editor: new Ext.form.ComboBox({
                                   typeAhead: true,
                                   triggerAction: 'all',
                                   store: DepStore,
                                   mode: 'remote',
                                   valueField: 'dep',
                                   displayField: 'dep',
                                   listClass: 'x-combo-list-small'
                        })
                 }

              ,{
                header: 'Брокер собственика',
                dataIndex: 'Broker_Sobstv',
                width: 150,
                editor: new Ext.form.TextField({
                  allowBlank: false,
                  maxLength: 2000
                  })
              }
              ,{
                header: 'Брокер клиента',
                dataIndex: 'Broker_Client',
                width: 150,
                editor: new Ext.form.TextField({
                  allowBlank: false,
                  maxLength: 2000
                  })
              }

              ,{
                    header: 'Юрист',
                    dataIndex: 'User_Name',
                    renderer:title_user,
                    sortable: true,
                    width: 150

                  }

                ,{
                header: 'Сделка',
                dataIndex: 'Sdelka',
                width: 150,
                editor: new Ext.form.TextField({
                  allowBlank: true,
                  maxLength: 2000
                  })
              }

              ,{header: 'Закрыта',
                dataIndex: 'Is_Close',
                width: 150,
                editor: new Ext.form.ComboBox({
                       typeAhead: true,
                       triggerAction: 'all',
                       store:new Ext.data.SimpleStore({
                                     fields:['Is_Close'],
                                      data: [['да'],['нет']]
                                   }),
                        mode: 'local',
                        valueField: 'Is_Close',
                        displayField: 'Is_Close',
                        listClass: 'x-combo-list-small'
               })
              }
]);