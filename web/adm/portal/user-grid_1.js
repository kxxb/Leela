/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */


/*!
 * Ext JS Library 3.3.0
 * Copyright(c) 2006-2010 Ext JS, Inc.
 * licensing@extjs.com
 * http://www.extjs.com/license
 */


//function entityAdd(button, e){/* Код добавления сущности */}
//function entityRemove(button, e){/* Код удаления сущности */}
//function entityEdit(button, e){/* Код редактирования сущности */}



      function title_respU_D(val, x, store_j){
          return '<b>'+val+'</b> ('+store_j.data.resp_dep+')';
        }

          function title_aplU_D(val, x, store_j){
          return '<b>'+val+'</b> ('+store_j.data.apl_dep+')';
        }


        var release_edit = new Ext.form.DateField({
              format: 'd/m/Y'

         });


var responsibleStore = new Ext.data.JsonStore({
        root: 'results',
        fields: [
                {name: 'responsibly_id', mapping:'responsibly_id', type: 'int'},
                {name: 'resp_user_name', mapping:'resp_user_name', type: 'string'}
        ],
        proxy: new Ext.data.ScriptTagProxy({
            url: 'portal/getter_responsible.jsp'
        })
        });


  var columns = new Ext.grid.ColumnModel(
            [{
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
                width: 150

              },
               {header: 'Ответсвенный',
                width: 175,
                sortable: true,
                renderer: title_respU_D,
                dataIndex: 'resp_user_name',
                editor: new Ext.form.ComboBox({
                       typeAhead: true,
                       triggerAction: 'all',
                       store:responsibleStore,
                       mode: 'remote',
                       valueField: 'resp_user_name',
                       displayField: 'resp_user_name',
                       listClass: 'x-combo-list-small'
            })
     },

               {header: 'Дата заявки', width: 100, sortable: true,
                  renderer: Ext.util.Format.dateRenderer('d/m/Y'),
                  //editor:release_edit,
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
                width: 150,
                editor: new Ext.form.ComboBox({
                       typeAhead: true,
                       triggerAction: 'all',
                       store:new Ext.data.SimpleStore({
                        fields:[ 'Status_Name'],
                         data: [[ 'Принято (в процессе)'],['Выполнено'],['Отказано'],['Отложено'],['Снято']]
                                        }),
                       mode: 'local',
                       valueField: 'Status_Name',
                       displayField: 'Status_Name',
                       listClass: 'x-combo-list-small'
            })

              },
          {
                header: 'Номер договора',
                dataIndex: 'Contract_Number',
                width: 50,
                editor: new Ext.form.TextField({
                  allowBlank: false,
                  maxLength: 20
                  }),
                hidden: true                      // we don't necessarily want to see this...
              },
              {header: 'Дата договора', width: 100, sortable: true,
                  renderer: Ext.util.Format.dateRenderer('d/m/Y'),
                  //renderer: 'Contract_Date',
                  editor:release_edit,
                  dataIndex: 'Contract_Date'},
              {header: 'Дата возврата договора', width: 100, sortable: true,
                  renderer: Ext.util.Format.dateRenderer('d/m/Y'),
                  //renderer: 'Contract_Date',
                  editor:release_edit,
                  dataIndex: 'Contacrt_Return_Date'},
              {
                header: 'Контрагент',
                dataIndex: 'Contragent',
                width: 150,

                editor: new Ext.form.TextField({
                  allowBlank: false,
                  maxLength: 20
                  })

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
/*
if(limitColumns){
        var cs = [];
        for(var i = 0, len = limitColumns.length; i < len; i++){
            cs.push(columns[limitColumns[i]]);
        }
        columns = cs;
    }
*/
Ext.namespace("Application1");
Application1.Grid = Ext.extend(Ext.grid.GridPanel, {
    initComponent: function() {
          // Настраиваем хранилище
       this.store  = new Ext.data.JsonStore({root: 'results',
        
        totalProperty: 'totalCount',
        idProperty: 'id',
        baseParams: {mode: 'AllRequests'},

        fields: [
                {name: 'reqid', mapping:'reqid', type: 'int'},
                {name: 'applicant_id', mapping:'applicant_id', type: 'string'},
                {name: 'apl_user_name', mapping:'apl_user_name', type: 'string'},
                {name: 'apl_dep', mapping:'apl_dep', type: 'string'},
                {name: 'resp_user_name', mapping:'resp_user_name', type: 'string'},

                {name: 'resp_dep',mapping:'resp_dep', type: 'string'},
                {name: 'responsibly_department_id', mapping:'responsibly_department_id', type: 'string'},
                {name: 'dt_create', mapping:'dt_create', type: 'date', dateFormat: 'd/m/Y'},

                {name: 'dt_execute', mapping:'dt_execute', type: 'date', dateFormat: 'd/m/Y'},
                {name: 'Status', mapping:'Status', type: 'int'},
                {name: 'Status_Name', mapping:'Status_Name', type: 'string'},
                {name: 'Tl_Contract_Template_Id', mapping:'Tl_Contract_Template_Id', type: 'string'},

                {name: 'Contract_Number', mapping:'Contract_Number', type: 'string'},
                {name: 'Contract_Date', mapping:'Contract_Date', type: 'date', dateFormat: 'd/m/Y'},
                {name: 'Contacrt_Return_Date',mapping:'Contacrt_Return_Date', type: 'date', dateFormat: 'd/m/Y'},
                {name: 'Obj',mapping:'Obj', type: 'string'},
                {name: 'Client', mapping:'Client',type: 'string'},
                {name: 'Cl_Email', mapping:'Cl_Email',type: 'string'},
                {name: 'Cost_Of_Service',mapping:'Cost_Of_Service', type: 'string'},
                {name: 'Contragent',mapping:'Contragent', type: 'string'},
                {name: 'responsibly_id',mapping:'responsibly_id', type: 'int'},
                {name: 'request_control',mapping:'request_control', type: 'string'},
        ],
       //url: 'portal/GetReqGrid.jsp'
        // load using script tags for cross domain, if the data in on the same domain as
        // this page, an HttpProxy would be better
        proxy: new Ext.data.ScriptTagProxy({
            url: 'portal/GetReqGrid.jsp'
        })
        });
        Ext.apply(this, {
              store: this.store,
                cm: columns,
                height:250,
                width:600,
                

              enableColLock:false,
              clicksToEdit:1,

              selModel: new Ext.grid.RowSelectionModel({
                  singleSelect:false
              }),
              bbar: new Ext.PagingToolbar({
                    pageSize: 20,
                    store: this.store,
                    displayInfo: true,
                    displayMsg: 'Displaying topics {0} - {1} of {2}',
                    emptyMsg: "No topics to display"

                }),
      tbar: [{
         text: 'Создать заявку'
         ,tooltip: 'Great Tooltip'
         ,iconCls:'add'    // this is defined in our styles.css
         //,handler: createRequest //displayFormWindow
      },
      {
         text: 'Поиск'
         ,tooltip: 'Поиск'
         ,iconCls:'find'    // this is defined in our styles.css
         //,handler: displayFormWindow
      }
  ]


//            , tbar: new Ext.Toolbar({
//                , items: [{
//                    , text: "Add"
//                    , handler: entityAdd
//                },{
//                    , text: "Edit"
//                    , handler: entityEdit
//                },{
//                    , text: "Remove"
//                    , handler: entityRemove
//                }]
//            })
        });
        Application1.Grid.superclass.initComponent.apply(this, arguments);
    },onRender:function() {
                this.store.load({params: {start: 0, limit: 20}});
       Application1.Grid.superclass.onRender.apply(this, arguments);
      }

});
//waitMsg:'Loading',


Ext.reg("applicationgrid", Application1.Grid);
