/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */



Ext.ns("app");

/*Глобальные функцции и переменные*/

var gSearchMode ='';


var lCreateReq_DepId = 0;


function CreateReq(dep_id){
    lCreateReq_DepId = dep_id;
    var dep_name='';
    if (dep_id == 1){
        dep_name='Заявка для отдела IT';
        hDepId.setValue(1);
        hUser_Id.setValue(gUserId);
        dtCreate.setValue('');
        cbReqType.setValue('');
        reqText.setValue('');
        

        app_dsReqType.load({params:{dep_id:lCreateReq_DepId}});
        lbDepartmentName.setText(dep_name);
        windRequestCrITPR.setTitle(dep_name);
        windRequestCrITPR.show();

    } else if (dep_id == 2){

        dep_name='Заявка для юридического отдела ';
        hDepId_ur.setValue(2);
        hUser_Id_ur.setValue(gUserId);
        dtCreate_ur.setValue('');
        cbReqType_ur.setValue('');
        reqText_ur.setValue('');



         lbDepartmentName.setText(dep_name);
         app_dsReqType.load({params:{dep_id:lCreateReq_DepId}});
         windRequestCrUr.setTitle(dep_name);
        windRequestCrUr.show();
    }else if (dep_id == 3){
        hDepId.setValue(3);
        hUser_Id.setValue(gUserId);
        dtCreate.setValue('');
        cbReqType.setValue('');
        reqText.setValue('');
        
        dep_name='Заявка для отдела маркетинга и рекламы';
        app_dsReqType.load({params:{dep_id:lCreateReq_DepId}});
        lbDepartmentName.setText(dep_name);
        windRequestCrITPR.setTitle(dep_name);
        windRequestCrITPR.show();
    }else{
        dep_name='неопределен';
    }
 //Ext.Msg.alert('Create','Заявка для отдела '+dep_name);
 
}





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




/*удалить всё ниже этого коментария на продакшн системе*/
var gActiveTab =0;
var gFileComentsTab = 0;

function gCurActiveTab(tabIndex){
    gFileComentsTab = 0;
    gActiveTab = tabIndex;
//    if (tabIndex==1){
//
//        store_j.reload({params: {mode: 'ForMeRequests', start: 0, limit: 20}});
//    }
//
//    if (tabIndex==2){
//        app_store_j.reload({params: {mode: 'MyRequests', start: 0, limit: 20}});
//    }
};


function getActiveTab(){
    return gActiveTab;
}


function gCurActiveFileComentsTab(tabIndex){
    gFileComentsTab = tabIndex;
};

function getActiveFileComentsTab(){
    return gFileComentsTab;
}


function saveTheRequest(){
    Ext.Msg.alert('test','Save info succes ');
}