/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */


      function title_respU_D(val, x, store_j){
          return '<b>'+val+'</b> ('+store_j.data.resp_dep+')';
        }

        function title_aplU_D(val, x, store_j){
          return '<b>'+val+'</b> ('+store_j.data.apl_dep+')';
        }


        var release_edit = new Ext.form.DateField({
              format: 'd/m/Y'
            });


var AllITColumns1 = new Ext.grid.ColumnModel( [
           new Ext.grid.RowNumberer(),
                {
                header: '#',
                readOnly: true,
                dataIndex: 'reqid', // this is where the mapped name is important!
                width: 50,
                sortable: true,

                hidden: false
              },{
                header: 'Заявитель',
                dataIndex: 'apl_user_name',
                renderer:title_aplU_D,
                sortable: true,
                width: 150

              },
               {header: 'Ответственный',
                width: 175,
                sortable: true,
                renderer: title_respU_D,
                dataIndex: 'resp_user_name'
                ,editor: new Ext.form.ComboBox({
                       typeAhead: true,
                       triggerAction: 'all',
                       store: responsibleStore,
                       mode: 'remote',
                       valueField: 'resp_user_name',
                       displayField: 'resp_user_name',
                       listClass: 'x-combo-list-small'
            })
     },

               {header: 'Ответственный отдел',
                width: 175,
                sortable: true,
                hidden: true,
                dataIndex: 'resp_dep'/*,
                editor: new Ext.form.ComboBox({
                       typeAhead: true,
                       triggerAction: 'all',
                       store:responsibleStore,
                       mode: 'remote',
                       valueField: 'resp_user_name',
                       displayField: 'resp_user_name',
                       listClass: 'x-combo-list-small'
            })*/
     },//resp_dep

               {header: 'Дата заявки', width: 100, sortable: true,
                  renderer: Ext.util.Format.dateRenderer('d/m/Y'),
                  editor:release_edit,
                  dataIndex: 'dt_create'
                  },
              {header: 'К дате', width: 100, sortable: true,
                  renderer: Ext.util.Format.dateRenderer('d/m/Y'),
                  //renderer: 'dt_create',
                  editor:release_edit,
                  dataIndex: 'dt_execute'

              },

              {
                header: 'Статус',
                dataIndex: 'Status_Name',
                width: 150
                /*,editor: new Ext.form.ComboBox({
                       typeAhead: true,
                       triggerAction: 'all',
                       store: ReqStatusStore,
                        new Ext.data.SimpleStore({
                        fields:[ 'Status_Name'],
                         data: [[ 'Принято (в процессе)'],['Выполнено'],['Отказано'],['Отложено'],['Снято']]
                                        }),
                       mode: 'local',
                       valueField: 'Status_Name',
                       displayField: 'Status_Name',
                       listClass: 'x-combo-list-small'
            })
*/
              },
          {
                header: 'Номер договора',
                dataIndex: 'Contract_Number',
                width: 50,
                /*editor: new Ext.form.TextField({
                  allowBlank: false,
                  maxLength: 20
                  }),*/
                hidden: true                      // we don't necessarily want to see this...
              },
              {header: 'Дата договора', width: 100, sortable: true,
                  renderer: Ext.util.Format.dateRenderer('d/m/Y'),
                  //renderer: 'Contract_Date',
                  //editor:release_edit,
                  dataIndex: 'Contract_Date'},
              {header: 'Дата возврата договора', width: 100, sortable: true,
                  renderer: Ext.util.Format.dateRenderer('d/m/Y'),
                  //renderer: 'Contract_Date',
                  //editor:release_edit,
                  dataIndex: 'Contacrt_Return_Date'},
              {
                header: 'Контрагент',
                dataIndex: 'Contragent',
                width: 150/*,

                editor: new Ext.form.TextField({
                  allowBlank: false,
                  maxLength: 20
                  })
*/
              },
      {
                header: 'Контроль заявки',
                dataIndex: 'request_control',
                width: 150,
                editor: new Ext.form.ComboBox({
                       typeAhead: true,
                       triggerAction: 'all',
                       store:new Ext.data.SimpleStore({
                        fields:['request_control'],
                         data: [['да'],['нет']]
                                        }),
                       mode: 'local',
                       valueField: 'request_control',
                       displayField: 'request_control',
                       listClass: 'x-combo-list-small'
            })

              }
      ]
);

AllITColumns1.defaultSortable= true;
//Ext.extend(AllITColumns, Ext.grid.ColumnModel);


//// {{{
//app.ItColModel = Ext.extend(Ext.grid.ColumnModel, {
//
//    // configurables
//    // anything what is here can be configured from outside
//    layout:'border'
//
//    // {{{
//    ,initComponent:function() {
//
//		// hard coded config - cannot be changed from outside
//		var config = {
//                    new Ext.grid.RowNumberer(),
//                {
//                header: '#',
//                readOnly: true,
//                dataIndex: 'reqid', // this is where the mapped name is important!
//                width: 50,
//                sortable: true,
//
//                hidden: false
//              },{
//                header: 'Заявитель',
//                dataIndex: 'apl_user_name',
//                renderer:title_aplU_D,
//                sortable: true,
//                width: 150
//
//              },
//               {header: 'Ответственный',
//                width: 175,
//                sortable: true,
//                renderer: title_respU_D,
//                dataIndex: 'resp_user_name'
//                ,editor: new Ext.form.ComboBox({
//                       typeAhead: true,
//                       triggerAction: 'all',
//                       store: responsibleStore,
//                       mode: 'remote',
//                       valueField: 'resp_user_name',
//                       displayField: 'resp_user_name',
//                       listClass: 'x-combo-list-small'
//            })
//     },
//
//               {header: 'Ответственный отдел',
//                width: 175,
//                sortable: true,
//                hidden: true,
//                dataIndex: 'resp_dep'/*,
//                editor: new Ext.form.ComboBox({
//                       typeAhead: true,
//                       triggerAction: 'all',
//                       store:responsibleStore,
//                       mode: 'remote',
//                       valueField: 'resp_user_name',
//                       displayField: 'resp_user_name',
//                       listClass: 'x-combo-list-small'
//            })*/
//     },//resp_dep
//
//               {header: 'Дата заявки', width: 100, sortable: true,
//                  renderer: Ext.util.Format.dateRenderer('d/m/Y'),
//                  editor:release_edit,
//                  dataIndex: 'dt_create'
//                  },
//              {header: 'К дате', width: 100, sortable: true,
//                  renderer: Ext.util.Format.dateRenderer('d/m/Y'),
//                  //renderer: 'dt_create',
//                  editor:release_edit,
//                  dataIndex: 'dt_execute'
//
//              },
//
//              {
//                header: 'Статус',
//                dataIndex: 'Status_Name',
//                width: 150
//                /*,editor: new Ext.form.ComboBox({
//                       typeAhead: true,
//                       triggerAction: 'all',
//                       store: ReqStatusStore,
//                        new Ext.data.SimpleStore({
//                        fields:[ 'Status_Name'],
//                         data: [[ 'Принято (в процессе)'],['Выполнено'],['Отказано'],['Отложено'],['Снято']]
//                                        }),
//                       mode: 'local',
//                       valueField: 'Status_Name',
//                       displayField: 'Status_Name',
//                       listClass: 'x-combo-list-small'
//            })
//*/
//              },
//          {
//                header: 'Номер договора',
//                dataIndex: 'Contract_Number',
//                width: 50,
//                /*editor: new Ext.form.TextField({
//                  allowBlank: false,
//                  maxLength: 20
//                  }),*/
//                hidden: true                      // we don't necessarily want to see this...
//              },
//              {header: 'Дата договора', width: 100, sortable: true,
//                  renderer: Ext.util.Format.dateRenderer('d/m/Y'),
//                  //renderer: 'Contract_Date',
//                  //editor:release_edit,
//                  dataIndex: 'Contract_Date'},
//              {header: 'Дата возврата договора', width: 100, sortable: true,
//                  renderer: Ext.util.Format.dateRenderer('d/m/Y'),
//                  //renderer: 'Contract_Date',
//                  //editor:release_edit,
//                  dataIndex: 'Contacrt_Return_Date'},
//              {
//                header: 'Контрагент',
//                dataIndex: 'Contragent',
//                width: 150/*,
//
//                editor: new Ext.form.TextField({
//                  allowBlank: false,
//                  maxLength: 20
//                  })
//*/
//              },
//      {
//                header: 'Контроль заявки',
//                dataIndex: 'request_control',
//                width: 150,
//                editor: new Ext.form.ComboBox({
//                       typeAhead: true,
//                       triggerAction: 'all',
//                       store:new Ext.data.SimpleStore({
//                        fields:['request_control'],
//                         data: [['да'],['нет']]
//                                        }),
//                       mode: 'local',
//                       valueField: 'request_control',
//                       displayField: 'request_control',
//                       listClass: 'x-combo-list-small'
//            })
//
//              };
//
//
//		// apply config
//        Ext.apply(this, Ext.apply(this.initialConfig, config));
//
//        // call parent
//        app.ItColModel.superclass.initComponent.apply(this, arguments);
//        } // e/o function initComponent
//    // }}}
//
//
//}); // e/o extend
//
//// register xtype
//Ext.reg('itColModel', app.ItColModel);
// }}}
