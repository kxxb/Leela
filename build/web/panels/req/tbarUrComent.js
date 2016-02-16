/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */


tbarURComent = function(id) {

var local_rec_id = '0';
/*
function set_id(id){
    local_rec_id = id;
}

*/
config = {



id :id
,items: [ {
         text: 'Добавить коментарий'
         ,tooltip: 'Добавить коментарий'
         ,iconCls:'silk-add'

         ,handler: displayFormComment


      }]
}
       Ext.apply(config);
       tbarURComent.superclass.constructor.call(this, config);

};

Ext.extend(tbarURComent, Ext.Toolbar);


function displayFormComment(){
  Ext.Msg.alert('test1',urt.getValue());
  //var  v_local_reqid = urt.;
  /*var v_local_reqid = urt.getValue(this);
    if (v_local_reqid  == '0' ){
        Ext.Msg.alert('test','choose request '+v_local_reqid  +' value');

    } else {
      Ext.Msg.alert('test','coment add window '+v_local_reqid +' value');
    }
    */
    
    
}