/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */


Ext.namespace('Req', 'Req.rootTab');
Ext.namespace('CRM.panels');
/*
  newReqItTab = function (){
    Req.tbAllReqITTab.superclass.constructor.call(this,{
        title:'test',
        xtype: 'panel'
    });

} ;
*/

/*  var userData = [
  {ID:1,FIRSTNAME:'John',LASTNAME:'Lennon',EMAIL:'john@beatles.com'
      ,PASSWORD:'apple1',ADDRESSTYPE:'Home (Mailing)',STREET1:'117 Abbey Road',STREET2:'',STREET3:'',CITY:'New York',
STATE:'NY',ZIP:'12345',PHONETYPE:'Cell',PHONE:'123-456-7890'},
  {ID:2,FIRSTNAME:'Paul',LASTNAME:'McCartney',
EMAIL:'paul@beatles.com',PASSWORD:'linda',
ADDRESSTYPE:'Work (Mailing)',STREET1:'108 Penny Lane',STREET2:'',STREET3:'',CITY:'Los Angeles',STATE:'CA',
ZIP:'67890',PHONETYPE:'Home',PHONE:'456-789-0123'},
  {ID:3,FIRSTNAME:'George',LASTNAME:'Harrison',
EMAIL:'george@beatles.com',PASSWORD:'timebandit',
ADDRESSTYPE:'Home (Shipping)',STREET1:'302 Space Way',
STREET2:'',STREET3:'',CITY:'Billings',STATE:'MT',ZIP:'98765',
PHONETYPE:'Office',PHONE:'890-123-4567'},
  {ID:4,FIRSTNAME:'Ringo',LASTNAME:'Starr',
EMAIL:'bignose@beatles.com',PASSWORD:'barbie',
ADDRESSTYPE:'Home (Mailing)',STREET1:'789 Zildizhan Pl',
STREET2:'',STREET3:'',CITY:'Malibu',STATE:'CA',ZIP:'43210',
PHONETYPE:'Home',PHONE:'567-890-1234'}
  ];



 var test_cr = new CRM.panels.UserDetail(
 { applyTo: 'chap13_ex03a',
     title: 'User Detail',
     data: userData[0]
 });
 */
 var urt = new UniversalAllUrTab(
                       'все обалденные заявки '
                       ,new UniversalReqGrid(AllITColumns, store_j, 'AllReqGridUR')
                       ,new UrAdditionalPanel('UrAdditionalPanel','выберите заявку')
                       ,new RequestTextPanel('UrREQPanel','выберите заявку',  '<font face="Verdana" size="1">{request_text}</font>', null, null)
                       ,new RequestTextPanel('ComentUrpanel','Для просмотра коментария выберите заявку',  '<font face="Verdana" size="1">{comment}</font>', new tbarURComent('tbURComent'), 'коментарий')
                       //,test_cr

                );

var urt2 = new UniversalAllUrTab(
                       'все обалденные заявки1 '
                       ,new UniversalReqGrid(AllITColumns, SimpleDataStore, 'AllReqGridUR')
                       ,new UrAdditionalPanel('UrAdditionalPanel','выберите заявку')
                       ,new RequestTextPanel('UrREQPanel','выберите заявку',  '<font face="Verdana" size="1">{request_text}</font>', null, null)
                       ,new RequestTextPanel('ComentUrpanel1','Для просмотра коментария выберите заявку',  '<font face="Verdana" size="1">{comment}</font>', new tbarURComent('tbURComent1'), 'коментарий')

                );

var itTab = new Req.tbAllReqITTab();
var itTab2 = new Req.tbAllReqITTab();

// second tabs built from JS
Req.rootTab.RootReqTab = Ext.extend(
    Ext.TabPanel,{
        

        initComponent: function(){

            var config = {
                plain:true,
                activeTab: 0,
                defaults:{
                    autoScroll: true
                },
                items:[
              
                /*  ,new tbAllReqURTab(
                       'Мои заявки'
                       ,new UniversalReqGrid(AllITColumns, SimpleDataStore, 'MyReqGrid')
                       ,new UrAdditionalPanel('UrAdditionalPanel1','выберите заявку1')
                       ,new RequestTextPanel('UrREQPanel1','выберите заявку',  '<font face="Verdana" size="1">{request_text}</font>', null, null)
                       ,new RequestTextPanel('ComentUrpanel1','Для просмотра коментария выберите заявку',  '<font face="Verdana" size="1">{comment}</font>', new tbarURComent('tbURComent1'), 'коментарий')
                  )*/
                 /*,new Req.tbAllReqITTab(
                       'IT request'
                      ,new UniversalReqGrid(AllITColumns, SimpleDataStore, 'MyITReqGrid')
                      )
                 */

             itTab,itTab2,
                {
                    xtype:'reqItTab'
                }
            
             /* {
                    xtype:'reqItTab'
                }
                ,*/
                  /*,  new UniversalAllUrTab(
                       'Мои заявки'
                       ,new UniversalReqGrid(AllITColumns, SimpleDataStore, 'MyReqGrid')
                       ,new UrAdditionalPanel('UrAdditionalPanel1','выберите заявку1')
                       ,new RequestTextPanel('UrREQPanel1','выберите заявку',  '<font face="Verdana" size="1">{request_text}</font>', null, null)
                       ,new RequestTextPanel('ComentUrpanel1','Для просмотра коментария выберите заявку',  '<font face="Verdana" size="1">{comment}</font>', new tbarURComent('tbURComent1'), 'коментарий')
                  ),
                       new UniversalAllUrTab(
                       'все заявки'
                       ,new UniversalReqGrid(AllITColumns, SimpleDataStore, 'MyReqGrid')
                       ,new UrAdditionalPanel('UrAdditionalPanel1','выберите заявку1')
                       ,new RequestTextPanel('UrREQPanel1','выберите заявку',  '<font face="Verdana" size="1">{request_text}</font>', null, null)
                       ,new RequestTextPanel('ComentUrpanel1','Для просмотра коментария выберите заявку',  '<font face="Verdana" size="1">{comment}</font>', new tbarURComent('tbURComent1'), 'коментарий')
                )*/
                ,{
                    title: 'Normal Tab',
                    html: "My content was added during construction."
                }
                //,new tbAllReqPRTab()
                ,{
                    title: 'Ajax Tab 1',
                    autoLoad:'ajax1.htm'
                },{
                    title: 'Ajax Tab 2',
                    autoLoad: {
                        url: 'ajax2.htm',
                        params: 'foo=bar&wtf=1'
                    }
                }/*,{
                        title: 'Event Tab',
                        listeners: {activate: handleActivate},
                        html: "I am tab 4's content. I also have an event listener attached."
                    }*/,{
                    title: 'Disabled Tab',
                    disabled:true,
                    html: "Can't see me cause I'm disabled"
                }
                ]
            }; // eo config object

            // Применяем config
            Ext.apply(this, Ext.apply(this.initialConfig, config));


            Req.rootTab.RootReqTab.superclass.initComponent.call(this, arguments);
        /*if (typeof this.tpl === 'string') {
        this.tpl = new Ext.XTemplate(this.tpl);
     }
     this.addEvents('update');*/
        }
        ,
        onRender: function() {
            Req.rootTab.RootReqTab.superclass.onRender.apply
            (this, arguments);
     
        }
        
  


    });

Ext.reg('roottab',Req.rootTab.RootReqTab);



function handleActivate(tab){
    alert(tab.title + ' was activated.');
}

