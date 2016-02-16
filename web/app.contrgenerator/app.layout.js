/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */


Ext.ns("app");


app.LayuotTab =  Ext.extend(
    Ext.Panel,{
        initComponent: function(){

            var config = {
                   xtype: 'panel',
                    autoScroll : 1,
                    overflow:'auto',
                    layout: 'border',
                    items: [
                        { region: 'west',
                          xtype :'panel'
                          ,width:400
                          ,items:[
                               {xtype:'contractgrid'
                                ,height:300
                               ,store : CONTR_LIST_STORE
                               ,cm:new Ext.grid.ColumnModel({columns:contarct_cm})
                            },
                             {region: 'center'
                             ,xtype:'panel'
                             
                             ,tpl:new Ext.XTemplate(
                            '{CONTRACT_DESC} <br><br> <a target="blank" href="../stores/app.contrgenerator/GenerateContract.jsp?LAWYER_CONTRACTS_ID={ID}">Результат</a>'
                           )}
                          ]},
                         {
                          region: 'center'
                         ,xtype:'panel'
                         , items :[
                             {xtype:'contractgrid'
                                ,height:300
                               ,store : CONTR_PARAGRAPH_STORE
                               ,  plugins: checkColumn
                               ,cm:new Ext.grid.ColumnModel({columns:paragraph_cm})
                            
                         },
                         {
                          region: 'center'
                         ,xtype:'panel'
                        
                         ,tpl:new Ext.XTemplate(
                            '&nbsp;&nbsp;&nbsp;<h2>&nbsp;&nbsp;&nbsp;{PARAGRAPH_NAME}</h2>\n\
                            <br>&nbsp;&nbsp;&nbsp;{PARAGRAPH_BODY} '
                           )
                         }
                         ]
                         
                         }
                         
                    ]
            }; // eo config object


            // Применяем config

            Ext.apply(this, Ext.apply(this.initialConfig, config));
            app.LayuotTab.superclass.initComponent.apply(this, arguments);
            
            
            var ContractGrid = this.items.itemAt(0).items.itemAt(0);
            var ContractPAN = this.items.itemAt(0).items.itemAt(1);
            var ParagraphGrid = this.items.itemAt(1).items.itemAt(0);
            var ParagraphPAN = this.items.itemAt(1).items.itemAt(1);
          
            var v_cid;
            var v_pid;
            var v_contacrt_mode;
            var    v_CONTRACT_NAME;
            var    v_CONTRACT_DATE;
            var    v_CONTRACT_DESC;
            var    v_ORDER_IN_LIST;
           
             var    v_LAWYER_CONTRACTS_ID;
             var     v_PARAGRAPH_NAME;
             var     v_PARAGRAPH_BODY;
             var     v_ORDER_NUMBER;
             var     v_PARAGRAPH_DATE;
             var     v_EDIT_DATE;
             var     v_IS_CHECKED;
               
                
           
                        
                        
            ContractGrid.getSelectionModel().on('rowselect', function(sm, rowIdx, r) {
                v_cid = r.data.ID;
                   v_CONTRACT_NAME= r.data.CONTRACT_NAME;
               v_CONTRACT_DATE= r.data.CONTRACT_DATE;
                v_CONTRACT_DESC= r.data.CONTRACT_DESC;
               v_ORDER_IN_LIST= r.data.ORDER_IN_LIST;
                CONTR_PARAGRAPH_STORE.reload({params: {LAWYER_CONTRACTS_ID:v_cid}}); 
                                    ContractPAN.tpl.overwrite(ContractPAN.body, r.data);   
    			});
                        
                        
/*Окно для создания клиента и его заявки*/

ContractGrid.on('addTbClick',function(){
                v_cid=0 ;
               v_contacrt_mode='null';
               
               
                NewContractWin.show();
                 NewContractWin.items.itemAt(0).items.itemAt(1).setValue('') //Договор
                 NewContractWin.items.itemAt(0).items.itemAt(2).setValue('') //Дата договра
                 NewContractWin.items.itemAt(0).items.itemAt(3).setValue('') //Описание
                 NewContractWin.items.itemAt(0).items.itemAt(0).setValue('') //Порядок
            });

ContractGrid.on('editTbClick',function(){
     if (v_cid!=null) {
                NewContractWin.show();
                NewContractWin.items.itemAt(0).items.itemAt(1).setValue(v_CONTRACT_NAME) //Договор
                 NewContractWin.items.itemAt(0).items.itemAt(2).setValue(v_CONTRACT_DATE) //Дата договра
                 NewContractWin.items.itemAt(0).items.itemAt(3).setValue(v_CONTRACT_DESC) //Описание
                 NewContractWin.items.itemAt(0).items.itemAt(0).setValue(v_ORDER_IN_LIST) //Порядок
     } else{
          Ext.MessageBox.alert('Ошибка','Выберите договор из списка');
     }
                
            });
ContractGrid.on('delTbClick',function(){
               if (v_cid!=null) {
                   
                   Ext.Msg.confirm('Удаляем договор', ' Точно удалить договор?', function(btn) {
				if(btn == 'yes'){
					v_contacrt_mode='D';
                  
                                    l_message= CRUD_Contract( v_cid
                                              ,NewContractWin.items.itemAt(0).items.itemAt(1).getValue() //Договор
                                               ,NewContractWin.items.itemAt(0).items.itemAt(2).getValue() //Дата договра
                                             ,NewContractWin.items.itemAt(0).items.itemAt(3).getValue() //Описание
                                             ,NewContractWin.items.itemAt(0).items.itemAt(0).getValue() //Порядок
                                             ,v_contacrt_mode)

                                Ext.MessageBox.alert('Договор','Удалён '+ l_message);
				}
			});
                   
     } else{
          Ext.MessageBox.alert('Ошибка','Выберите договор из списка');
     }
            });            
            
            

 NewContractWin = new  app.winRequest({
      title:'Новый договор'
     ,width: 550
     ,height: 400
     ,items:[{xtype:'frmRequest'
           ,items: ContractFormFields  
         }]
 });
 
 NewContractWin.on('frmCancel',function(){
    NewRequestWin.hide();
 })
 
 NewContractWin.on('frmSave',function(){
   var l_message="";
   l_message= CRUD_Contract( v_cid
                 ,NewContractWin.items.itemAt(0).items.itemAt(1).getValue() //Договор
                 ,NewContractWin.items.itemAt(0).items.itemAt(2).getValue() //Дата договра
                 ,NewContractWin.items.itemAt(0).items.itemAt(3).getValue() //Описание
                 ,NewContractWin.items.itemAt(0).items.itemAt(0).getValue() //Порядок
                 ,v_contacrt_mode)
   
    Ext.MessageBox.alert('Договор','Сохранён '+ l_message);
 })                        
             
             
             
    function CRUD_Contract(
                P_ID,
                P_CONTRACT_NAME,
                P_CONTRACT_DATE,
                P_CONTRACT_DESC,
                P_ORDER_IN_LIST,
                P_MODE
     ){
        var v_result_text ="успешно";
         Ext.Ajax.request({
                          method:'GET',
                          url: '../stores/app.contrgenerator/CRUD.contract.jsp',
                          params: {
                               ID: P_ID,
                               CONTRACT_NAME: P_CONTRACT_NAME,
                               CONTRACT_DATE: P_CONTRACT_DATE,
                               CONTRACT_DESC: P_CONTRACT_DESC,
                               ORDER_IN_LIST: P_ORDER_IN_LIST,
                               V_MODE: P_MODE      
                          },
                          success: function(response){
                           var result=eval(response.responseText);
                             switch(result){
                             case true:
                                 v_result_text = 'Данные  сохранены.';
                                 CONTR_LIST_STORE.reload();          // reload our datastore.
                                break;
                                default:
                                v_result_text = 'Данные не сохранены.';
                                CONTR_LIST_STORE.reload();          // reload our datastore.
                                break;
                             }
                          },
                          failure: function(response){
                             var result=response.responseText;
                             v_result_text ='Нет связи с базой данных. Повторите попытку позже.';
                          }
                       })
                       return v_result_text;
    }         
             
        /*PARAGRAPH*/     
             
             
             
             
             
ParagraphGrid.on('addTbClick',function(){
       if (v_cid!=null) {
                v_pid=0 ;
                v_contacrt_mode='null';
               
               
                 ParagraphWin.show();
                 ParagraphWin.items.itemAt(0).items.itemAt(1).setValue('') //Договор
                 ParagraphWin.items.itemAt(0).items.itemAt(2).setValue('') //Дата договра
                 ParagraphWin.items.itemAt(0).items.itemAt(3).setValue('') //Описание
                 ParagraphWin.items.itemAt(0).items.itemAt(0).setValue('') //Порядок
       }
       else{
            Ext.MessageBox.alert('Параграф','Для создания праграфа, сперва необходимо выбрать договор');
       }
            });
            
    ParagraphGrid.on('editTbClick',function(){
         if (v_cid!=null) {
             if (v_pid!=null) {
                 /*
                      var    v_LAWYER_CONTRACTS_ID;
             var     v_PARAGRAPH_NAME;
             var     v_PARAGRAPH_BODY;
             var     v_ORDER_NUMBER;
             var     v_PARAGRAPH_DATE;
             var     v_EDIT_DATE;
             var     v_IS_CHECKED;
               
                
                  **/
                        ParagraphWin.show();
                        ParagraphWin.items.itemAt(0).items.itemAt(1).setValue(v_PARAGRAPH_NAME) //Договор
                         ParagraphWin.items.itemAt(0).items.itemAt(2).setValue(v_PARAGRAPH_DATE) //Дата договра
                         ParagraphWin.items.itemAt(0).items.itemAt(3).setValue(v_PARAGRAPH_BODY) //Описание
                         ParagraphWin.items.itemAt(0).items.itemAt(0).setValue(v_ORDER_NUMBER) //Порядок
             } else{
                  Ext.MessageBox.alert('Ошибка','Выберите параграф из списка');
             }
     }
       else{
            Ext.MessageBox.alert('Параграф','Для редактирования праграфа, сперва необходимо выбрать договор');
       }
                
            });        
            
             
  ParagraphWin = new  app.winRequest({
      title:'Новый параграф'
     ,width: 550
     ,height: 400
     ,items:[{xtype:'frmRequest'
           ,items: ContractParagrapFormFields  
         }]
 });
 
 ParagraphWin.on('frmCancel',function(){
    ParagraphWin.hide();
 })
 
 ParagraphWin.on('frmSave',function(){
   var l_message="";
   l_message= CRUD_paragraph(v_pid,
                  v_cid
                 ,ParagraphWin.items.itemAt(0).items.itemAt(1).getValue() //Договор
                 ,ParagraphWin.items.itemAt(0).items.itemAt(2).getValue() //Дата договра
                 ,ParagraphWin.items.itemAt(0).items.itemAt(3).getValue() //Описание
                 ,ParagraphWin.items.itemAt(0).items.itemAt(0).getValue() //Порядок
                 ,v_contacrt_mode)
   
    Ext.MessageBox.alert('Параграф','Сохранён '+ l_message);
 })       
             
             ParagraphGrid.getSelectionModel().on('rowselect', function(sm, rowIdx, r) {
                 
                 
                 
                v_pid = r.data.ID;
                
                  v_LAWYER_CONTRACTS_ID = r.data.LAWYER_CONTRACTS_ID;
                  v_PARAGRAPH_NAME = r.data.PARAGRAPH_NAME;
                  v_PARAGRAPH_BODY = r.data.PARAGRAPH_BODY;
                  v_ORDER_NUMBER = r.data.ORDER_NUMBER;
                  v_PARAGRAPH_DATE = r.data.PARAGRAPH_DATE;
                  v_EDIT_DATE = r.data.EDIT_DATE;
                  v_IS_CHECKED = r.data.IS_CHECKED;
                  v_V_MODE  = r.data.V_MODE;
                
              
    			
                                    ParagraphPAN.tpl.overwrite(ParagraphPAN.body, r.data);   
                                      
    			});
                        
                        
               ParagraphGrid.on('afteredit',function(oGrid_event){
                     CRUD_paragraph(
                          oGrid_event.record.data.ID, 
                          null,
                          null,
                          null,
                          null,
                          null,
                          null,
                          oGrid_event.record.data.IS_CHECKED,
                          'CHECKED');
      
                      
                  });   
                     
                     
         function CRUD_paragraph(
                  P_ID,
                  P_LAWYER_CONTRACTS_ID,
                  P_PARAGRAPH_NAME,
                  P_PARAGRAPH_BODY,
                  P_ORDER_NUMBER,
                  P_PARAGRAPH_DATE,
                  P_EDIT_DATE,
                  P_IS_CHECKED,
                  P_V_MODE
            ){
               var v_result_text ="успешно";
              Ext.Ajax.request({
                          method:'GET',
                          url: '../stores/app.contrgenerator/CRUD.contractparagraph.jsp',
                          params: {
                              ID:P_ID,
                              LAWYER_CONTRACTS_ID:P_LAWYER_CONTRACTS_ID,
                              PARAGRAPH_NAME:P_PARAGRAPH_NAME,
                              PARAGRAPH_BODY:P_PARAGRAPH_BODY,
                              ORDER_NUMBER:P_ORDER_NUMBER,
                              PARAGRAPH_DATE:P_PARAGRAPH_DATE,
                              EDIT_DATE:P_EDIT_DATE,
                              IS_CHECKED:P_IS_CHECKED,
                              V_MODE:P_V_MODE
                             
                          },
                          success: function(response){

                             var result=eval(response.responseText);
                             switch(result){
                             case true:
                                ///app_store_all.commitChanges();   // changes successful, get rid of the red triangles
                               v_result_text ='Данные  сохранены.';
                                CONTR_PARAGRAPH_STORE.reload();          // reload our datastore.
                                break;
                                default:
                                v_result_text='Данные не сохранены.';
                                CONTR_PARAGRAPH_STORE.reload();          // reload our datastore.
                                break;
                             }
                          },
                          failure: function(response){
                             var result=response.responseText;
                            v_result_text='Нет связи с базой данных. Повторите попытку позже.';
                          }
                       });
                       return v_result_text;
         }            
                     
                        
        }      
 });
Ext.reg('layouttab', app.LayuotTab);
// }}}