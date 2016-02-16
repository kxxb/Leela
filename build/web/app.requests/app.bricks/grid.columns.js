/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */


function title_respU_D1(val, x, store_j){
    return '<b>'+val+'</b> ('+store_j.data.resp_dep+')';
}

function title_aplU_D1(val, x, store_j){
    return '<b>'+val+'</b> ('+store_j.data.apl_dep+')';
}


var release_edit1 = new Ext.form.DateField({
    format: 'd/m/Y'
});

var release_edit = new Ext.form.DateField({
    format: 'd/m/Y'
});

var it_edit_all =[
    new Ext.grid.RowNumberer(),
    {
        header: '#',
        readOnly: true,
        dataIndex: 'reqid', // this is where the mapped name is important!
        width: 50,
        sortable: true,

        hidden: false
    }
    ,{
        header: 'Заявитель',
        dataIndex: 'apl_user_name',
        renderer:title_aplU_D1,
        sortable: true,
        width: 150

    }
    ,{
        header: 'Ответственный',
        width: 175,
        sortable: true,
        renderer: title_respU_D1,
        dataIndex: 'resp_user_name'
        ,
        editor: new Ext.form.ComboBox({
            typeAhead: true,
            triggerAction: 'all',
            store: app_responsibleStore,
            mode: 'remote',
            valueField: 'resp_user_name',
            displayField: 'resp_user_name',
            listClass: 'x-combo-list-small'
        })
    }

    ,{
        header: 'Дата заявки', 
        width: 100, 
        sortable: true,
        renderer: Ext.util.Format.dateRenderer('d.m.Y H:i'),
        //editor:release_edit1,
        dataIndex: 'dt_create'
    }
    ,{
        header: 'К дате', 
        width: 100, 
        sortable: true,
        renderer: Ext.util.Format.dateRenderer('d/m/Y'),
        //renderer: 'dt_create',
        editor:release_edit1,
        dataIndex: 'dt_execute'
    }
    ,{
        header: 'Статус',
        dataIndex: 'Status_Name',
        width: 150
        ,
        editor: new Ext.form.ComboBox({
            typeAhead: true,
            triggerAction: 'all',
            store: app_ReqStatusStore,
            /*new Ext.data.SimpleStore({
                            fields:[ 'Status_Name'],
                            data: [[ 'Принято (в процессе)'],['Выполнено'],['Отказано'],['Отложено'],['Снято']]
                                            }),
                        mode: 'local',*/
            valueField: 'Status_Name',
            displayField: 'Status_Name',
            listClass: 'x-combo-list-small'
        })

    }
];


var it_edit_for_me = [
    new Ext.grid.RowNumberer(),
    {
        header: '#',
        readOnly: true,
        dataIndex: 'reqid', // this is where the mapped name is important!
        width: 50,
        sortable: true,

        hidden: false
    }
    ,{
        header: 'Заявитель',
        dataIndex: 'apl_user_name',
        renderer:title_aplU_D1,
        sortable: true,
        width: 150

    }
    ,{
        header: 'Ответственный',
        width: 175,
        sortable: true,
        renderer: title_respU_D1,
        dataIndex: 'resp_user_name'
        ,
        editor: new Ext.form.ComboBox({
            typeAhead: true,
            triggerAction: 'all',
            store: app_responsibleStore,
            mode: 'remote',
            valueField: 'resp_user_name',
            displayField: 'resp_user_name',
            listClass: 'x-combo-list-small'
        })
    }

    ,{
        header: 'Дата заявки', 
        width: 100, 
        sortable: true,
        renderer: Ext.util.Format.dateRenderer('d.m.Y H:i'),
        //editor:release_edit1,
        dataIndex: 'dt_create'
    }
    ,{
        header: 'К дате', 
        width: 100, 
        sortable: true,
        renderer: Ext.util.Format.dateRenderer('d/m/Y'),
        //renderer: 'dt_create',
        editor:release_edit1,
        dataIndex: 'dt_execute'
    }
    ,{
        header: 'Статус',
        dataIndex: 'Status_Name',
        width: 150
        ,
        editor: new Ext.form.ComboBox({
            typeAhead: true,
            triggerAction: 'all',
            store: app_ReqStatusStore,
            /*new Ext.data.SimpleStore({
                            fields:[ 'Status_Name'],
                            data: [[ 'Принято (в процессе)'],['Выполнено'],['Отказано'],['Отложено'],['Снято']]
                                            }),
                        mode: 'local',*/
            valueField: 'Status_Name',
            displayField: 'Status_Name',
            listClass: 'x-combo-list-small'
        })

    }
    
];

var it_view = [
    new Ext.grid.RowNumberer(),
                    {
                    header: '#',
                    readOnly: true,
                    dataIndex: 'reqid', // this is where the mapped name is important!
                    width: 50,
                    sortable: true,

                    hidden: false
                  }
                  ,{
                    header: 'Заявитель',
                    dataIndex: 'apl_user_name',
                    renderer:title_aplU_D1,
                    sortable: true,
                    width: 150

                  }
                  ,{header: 'Ответственный',
                            width: 175,
                            sortable: true,
                            renderer: title_respU_D1,
                            dataIndex: 'resp_user_name'
                            /*,editor: new Ext.form.ComboBox({
                                   typeAhead: true,
                                   triggerAction: 'all',
                                   store: responsibleStore,
                                   mode: 'remote',
                                   valueField: 'resp_user_name',
                                   displayField: 'resp_user_name',
                                   listClass: 'x-combo-list-small'
                        })*/
                 }

               ,{header: 'Дата заявки', width: 100, sortable: true,
                  renderer: Ext.util.Format.dateRenderer('d.m.Y H:m'),
                  //editor:release_edit1,
                  dataIndex: 'dt_create'
                }
               ,{header: 'К дате', width: 100, sortable: true,
                  renderer: Ext.util.Format.dateRenderer('d/m/Y'),
                  //renderer: 'dt_create',
                  //editor:release_edit1,
                  dataIndex: 'dt_execute'
                }
               ,{
                header: 'Статус',
                dataIndex: 'Status_Name',
                width: 150
  /*              ,editor: new Ext.form.ComboBox({
                       typeAhead: true,
                       triggerAction: 'all',
                       store: app_ReqStatusStore,
                        new Ext.data.SimpleStore({
                        fields:[ 'Status_Name'],
                         data: [[ 'Принято (в процессе)'],['Выполнено'],['Отказано'],['Отложено'],['Снято']]
                                        }),
                       mode: 'local'
                       valueField: 'Status_Name',
                       displayField: 'Status_Name',
                       listClass: 'x-combo-list-small'
            })
*/
              }
    
];