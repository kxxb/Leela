/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */


Ext.namespace('CRM.panels');
CRM.panels.ContactDetails = Ext.extend(Ext.Panel,{
  width: 350,
  height: 250,
  data: {
     ID: 0,
     FIRSTNAME: '',
     LASTNAME: '',
     EMAIL: '',
     ADDRESSTYPE: 'Home (mailing)',
     STREET1: '',
     STREET2: '',
     STREET3: '',
     CITY: '',
     STATE: '',
     ZIP: '',
     PHONETYPE: 'Home',
     PHONE: ''
  },
  tpl: new Ext.XTemplate([
      /*'<img src="/resources/images/s.gif" width="21" height="16"
                         /><b>{FIRSTNAME} {LASTNAME}</b><br />',
      '<img src="/resources/images/icons/silk/database_edit.gif"
width="16" height="16" id="emailEdit_{ID}" class="iconLnk" align="Edit
Email Address" border="0" />{EMAIL}<br />',
      '<img src="/resources/images/icons/silk/database_edit.gif"
width="16" height="16" id="phoneEdit_{ID}" class="iconLnk" align="Edit
Phone" border="0" />{PHONE} ({PHONETYPE})<br />',
      '<b>{ADDRESSTYPE} Address</b><br />',
       '<img src="/resources/images/icons/silk/database_edit.gif"
width="16" height="16" id="addrEdit_{ID}" class="iconLnk" align="Edit
Address" border="0" />{STREET1}<br />',
       '<tpl if="STREET2.length &gt; 0">',
         '<img src="/resources/images/s.gif" width="21" height="16"
                                                  />{STREET2}<br />',
       '</tpl>',
       '<tpl if="STREET3.length &gt; 0">',
         '<img src="/resources/images/s.gif" width="21" height="16"
                                                 />{STREET3}<br />',
       '</tpl>',
       '<img src="/resources/images/s.gif" width="21" height="16"
/>{CITY}, {STATE} {ZIP}'*/
    ]),
  initComponent: function(){
     CRM.panels.ContactDetails.superclass.initComponent.call(this);
     if (typeof this.tpl === 'string') {
        this.tpl = new Ext.XTemplate(this.tpl);
     }
     this.addEvents('update');
  },
  onRender: function(ct, position) {
     CRM.panels.ContactDetails.superclass.onRender.call
                                   (this, ct, position);
     if (this.data) {
        this.update(this.data);
     }
  },
  update: function(data) {
     this.data = data;
     this.tpl.overwrite(this.body, this.data);
     this.fireEvent('update', this.data);
  }
});


Application.PersonnelGrid = Ext.extend(Ext.grid.GridPanel, {
border:false
, initComponent:function() {
/*var config = {
store:new Ext.data.Store({...})
,columns:[{...}, {...}]
,plugins:[...]
,viewConfig:{forceFit:true}
,tbar:[...]
,bbar:[...]
}; // eo config object
 */
// Применяем config
Ext.apply(this, Ext.apply(this.initialConfig, config));

Application.PersonnelGrid.superclass.initComponent.apply(this, arguments);
} // eo function initComponent

,onRender:function() {
this.store.load();

Application.PersonnelGrid.superclass.onRender.apply(this, arguments);
} // eo function onRender
});

Ext.reg('personnelgrid', Application.PersonnelGrid);
