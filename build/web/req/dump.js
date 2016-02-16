/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */


tradeshape.workstation.NotesForm = Ext.extend(Ext.Window, {

    initComponent : function() {
        Ext.extend(this, {
            layout : 'fit',
            closeAction :'hide',
            plain : true,
            items : {
                labelWidth : 80,
                monitorValid : true,
                xtype:'form',
                items : {
                    defaultType : 'textfield',
                    monitorValid : true,
                    xtype : 'form',
                    items : [{
                            name : 'note',
                            xtype : 'textarea',
                            fieldLabel : 'Enter Note',
                            anchor : '100% 100%'
                        }],
                    buttons : [{
                            text : 'save',
                            formBind : true,
                            scope : this,
                            handler : this.submit
                        }, {
                            text : 'cancel',
                            scope : this,
                            handler : this.cancel
                        }]
                }
            }
        }); // eo apply

        // call parent
        tradeshape.workstation.NotesForm.superclass.initComponent.apply(this, arguments);
        this.addEvents("success", "failed");
        this.formDialog = this.items.itemAt(0);
        this.formTextArea = this.formDialog.items.itemAt(0);
        this.formDialog.on("actioncomplete", function(form, action) {
            this.fireEvent("success", this, form, action)
        }, this)
        this.formDialog.on("actionfailed", function(form, action) {
            this.fireEvent("failed", this, form, action)
        }, this)
        this.on({"success": this.onSuccess, "failed": this.onFailure, scope:this})
    },

    addNoteToMessage : function(msgid) {
        var fd = this.formDialog;
        fd.baseParams = {
            msgid : msgid,
            action : "note"
        }
        this.formTextArea.allowBlank = false;
        this.show();
    },
    performAction : function(actionConfig) {

        var fd = this.formDialog;
        fd.baseParams = actionConfig
        var noteReq = actionConfig.noteRequired == "Y"

        this.formTextArea.allowBlank = !noteReqd;
        this.setTitle('Note for action "'+actionConfig.description+"'")
        this.show();
    }
    /**
     * Submits the form. Called after Submit buttons is clicked
     *
     * @private
     */
    ,
    submit : function() {
        this.formDialog.submit();
    },
    cancel : function() {
        this.hide();
    }

    ,
    onSuccess : function(form, action) {

    }

    ,
    onFailure : function(form, action) {

    }

    ,
    showError : function(msg, title) {

    } /
    });

Ext.reg('notesform', tradeshape.workstation.NotesForm);