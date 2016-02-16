/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */


Ext.namespace('CRM.panels');
CRM.panels.UserDetail = Ext.extend(Ext.Panel,{
  width: 350,
  height: 125,
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
  split: false,
  tpl: new Ext.Template([
       '<img src="/resources/images/s.gif" width="21" height="16" /><b>{FIRSTNAME} {LASTNAME}</b><br />',
       '<img src="/resources/images/icons/silk/database_edit.gif" width="16" height="16" id="emailEdit_{ID}" class="iconLnk" align="Edit Email Address" border="0" />{EMAIL}<br />',
       '<img src="/resources/images/icons/silk/database_edit.gif" width="16" height="16" id="phoneEdit_{ID}" class="iconLnk" align="Edit Phone" border="0" />{PHONE} ({PHONETYPE})<br />'
    ]),
    initComponent: function(){
     CRM.panels.UserDetail.superclass.initComponent.call(this);
     if (typeof this.tpl === 'string') {
        this.tpl = new Ext.XTemplate(this.tpl);
     }
    },
    onRender: function(ct, position) {
     CRM.panels.UserDetail.superclass.onRender.call
                                (this, ct, position);
     if (this.data) {
        this.update(this.data);
     }
  },
  update: function(data) {
     this.data = data;
     this.tpl.overwrite(this.body, this.data);
  }
});
Ext.reg('userdetail',CRM.panels.UserDetail);