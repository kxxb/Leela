/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

/*
0  Выполнено Green letters
1  Принято (в процессе)
2  Отказано Green letters
3  Отложено Green letters
4  Снято     Green letters
5  Договор готов Dark Purple
6  Договор выдан Dark Blue
7  Договор отправлен Light Blue
8  Договор на подписании Blue
9  Договор подготовлен  White, Darker 35%

Red	заявка просрочена             .grid-row-Red {background-color:#ff8c69 !important;}
             .grid-row-Green {background-color:#3caa3c !important;}
5  Договор готов Dark Purple          .grid-row-Dark-Purple {background-color:#990066 !important;color: #ffffff;}

0  Выполнено Green letters             .grid-row-Green-Letters {background-color:#ffffff !important;color: #3caa3c;}
2  Отказано Green letters
3  Отложено Green letters
4  Снято     Green letters

6  Договор выдан Dark Blue                .grid-row-Dark-Blue { background-color:#003399 !important;color: #ffffff;}
7  Договор отправлен Light Blue           .grid-row-Light-Blue {background-color:#4682b4 !important;color: #000000;}
8  Договор на подписании Blue             .grid-row-Blue {background-color:#52a0e1 !important;}
9  Договор подготовлен  White, Darker 35% .grid-row-White-Darker {background-color:#99958c !important;}
Yellow	заявка закомментирована             .grid-row-Yellow {background-color:#fbec5d !important;}
Black, White letters	договор на контроле             .grid-row-Black-White-letters {background-color:#000000 !important;color: #ffffff;}





 **/

 Date.patterns = {
    ISO8601Long:"Y-m-d H:i:s",
    ISO8601Short:"Y-m-d",
    ShortDate: "n/j/Y",
    MyShortDate: "d/m/Y",
    LongDate: "l, F d, Y",
    FullDateTime: "l, F d, Y g:i:s A",
    MonthDay: "F d",
    ShortTime: "g:i A",
    LongTime: "g:i:s A",
    SortableDateTime: "Y-m-d\\TH:i:s",
    UniversalSortableDateTime: "Y-m-d H:i:sO",
    YearMonth: "F, Y"
};
 var cur_date = new Date();
 

 var view = new Ext.grid.GridView({
            forceFit:true,
            getRowClass : function (row, index) {
              var cls = '';
              var data = row.data;
              cls = setColorGroupGrid (data.Status);
              if (data.request_control =='да'){
                  cls = 'grid-row-Black-White-letters';
              }
              if (data.dt_execute < cur_date.format(Date.patterns.MyShortDate)
                  //&(( data.Status != 0 )|( data.Status != 2 )|( data.Status != 3 )|( data.Status !=4))
                 ){
                  cls = 'grid-row-Red';
              }
              return cls;
           }

       });

  function setColorGroupGrid (status){
      var cls ='';
      switch (status) {
         case 0 :
            cls = 'grid-row-Green-Letters'
            break;
         case 2 :
            cls = 'grid-row-Green-Letters'
            break;
         case 3 :
            cls = 'grid-row-Green-Letters'
            break;
        case 4 :
            cls = 'grid-row-Green-Letters'
            break;
        case 5 :
            cls = 'grid-row-Dark-Purple'
            break;
        case 6 :
            cls = 'grid-row-Dark-Blue'
            break;
        case 7 :
            cls = 'grid-row-Light-Blue'
            break;
        case 8 :
            cls = 'grid-row-Blue'
            break;
       case 9 :
            cls = 'grid-row-White-Darker'
        }//end switch
      return cls;
  }


/*отдел*/
var DepStore = new Ext.data.JsonStore({
        root: 'results',
        fields: [
                {name: 'dep_id', mapping:'dep_id', type: 'string'},
                {name: 'dep', mapping:'dep', type: 'string'}
        ],
        proxy: new Ext.data.ScriptTagProxy({
            url: '../stores/req/helper/DepStore.jsp'
        })
    });

DepStore.load();


/*Группы пользоывателей*/
var UserGroupStore = new Ext.data.JsonStore({
        root: 'results',
        fields: [
                {name: 'group_id', mapping:'group_id', type: 'string'},
                {name: 'group_desc', mapping:'group_desc', type: 'string'}
        ],
        proxy: new Ext.data.ScriptTagProxy({
            url: '../stores/req/helper/UserGroupStore.jsp'
        })
    });

UserGroupStore.load();

/*Группы пользоывателей*/
var UserRankStore = new Ext.data.JsonStore({
        root: 'results',
        fields: [
                {name: 'rank_id', mapping:'rank_id', type: 'string'},
                {name: 'rank_desc', mapping:'rank_desc', type: 'string'}
        ],
        proxy: new Ext.data.ScriptTagProxy({
            url: '../stores/req/helper/UserRankStore.jsp'
        })
    });

UserRankStore.load();


/*Статус заявки*/
 var ReqStatusStore = new Ext.data.JsonStore({
        root: 'results',
        fields: [
                {name: 'Status', mapping:'Status', type: 'string'},
                {name: 'Status_Name', mapping:'Status_Name', type: 'string'}
        ],
        proxy: new Ext.data.ScriptTagProxy({
            url: '../stores/req/helper/ReqStatusStore.jsp'
        })
    });
ReqStatusStore.load();


/*заявитель*/
 var AplStore = new Ext.data.JsonStore({
        root: 'results',
        fields: [
                {name: 'user_id', mapping:'user_id', type: 'string'},
                {name: 'name', mapping:'name', type: 'string'}
        ],
        proxy: new Ext.data.ScriptTagProxy({
            url: '../stores/req/helper/AplStore.jsp'
        })
    });
AplStore.load();


/*источник рекламы*/
 var RekSourceStore = new Ext.data.JsonStore({
        root: 'results',
        fields: [
                {name: 'id', mapping:'id', type: 'string'},
                {name: 'name', mapping:'name', type: 'string'}
        ],
        proxy: new Ext.data.ScriptTagProxy({
            url: '../stores/req/helper/RekSourceStore.jsp'
        })
    });
RekSourceStore.load();


/*Операция по запросу*/
 var RequestOperationStore = new Ext.data.JsonStore({
        root: 'results',
        fields: [
                {name: 'id', mapping:'id', type: 'string'},
                {name: 'name', mapping:'name', type: 'string'}
        ],
        proxy: new Ext.data.ScriptTagProxy({
            url: '../stores/clients/helper/ClientRequestStores.jsp?mode=operations'
        })
    });
RequestOperationStore.load();


/*Валюта*/
 var CurrencyStore = new Ext.data.JsonStore({
        root: 'results',
        fields: [
                {name: 'id', mapping:'id', type: 'string'},
                {name: 'name', mapping:'name', type: 'string'}
        ],
        proxy: new Ext.data.ScriptTagProxy({
            url: '../stores/clients/helper/ClientRequestStores.jsp?mode=currency'
        })
    });
CurrencyStore.load();


/*Готовность объекта*/
 var ReadyObjectStore = new Ext.data.JsonStore({
        root: 'results',
        fields: [
                {name: 'id', mapping:'id', type: 'string'},
                {name: 'name', mapping:'name', type: 'string'}
        ],
        proxy: new Ext.data.ScriptTagProxy({
            url: '../stores/clients/helper/ClientRequestStores.jsp?mode=ready_obj'
        })
    });
ReadyObjectStore.load();


/*Видимость клиента*/
 var ClientVisbilityStore = new Ext.data.JsonStore({
        root: 'results',
        fields: [
                {name: 'id', mapping:'id', type: 'string'},
                {name: 'name', mapping:'name', type: 'string'}
        ],
        proxy: new Ext.data.ScriptTagProxy({
            url: '../stores/clients/helper/ClientRequestStores.jsp?mode=client_visibility'
        })
    });
ClientVisbilityStore.load();

/*организации*/
 var ClientOrgStore = new Ext.data.JsonStore({
        root: 'results',
        fields: [
                {name: 'ORGANIZATION_ID', mapping:'ORGANIZATION_ID', type: 'string'},
                {name: 'ORGANIZATION_NAME', mapping:'ORGANIZATION_NAME', type: 'string'}
        ],
        proxy: new Ext.data.ScriptTagProxy({
            url: '../stores/clients/grid/ClientsOrgStore.jsp'
        })
    });
ClientOrgStore.load();


var responsibleStore = new Ext.data.JsonStore({
        root: 'results',

        fields: [
                {name: 'responsibly_id', mapping:'responsibly_id', type: 'int'},
                {name: 'resp_user_name', mapping:'resp_user_name', type: 'string'}
        ],
        proxy: new Ext.data.ScriptTagProxy({
            url: '../stores/req/helper/getter_responsible.jsp'
        })
        });


var transferStore = new Ext.data.JsonStore({
        root: 'results'

        ,fields: [
                {name: 'TRANSFER_ID', mapping:'responsibly_id', type: 'int'},
                {name: 'transfer_user', mapping:'resp_user_name', type: 'string'}
        ],
        proxy: new Ext.data.ScriptTagProxy({
            url: '../stores/req/helper/getter_responsible.jsp?user_id='+gUserId
            //url: '../stores/req/helper/getter_responsible.jsp'
        })
        });



