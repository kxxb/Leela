<%-- 
    Document   : test
    Created on : 19.03.2011, 16:09:52
    Author     : kxxb
--%>

<%@page contentType="text/html" pageEncoding="UTF-8"%>
<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN"
   "http://www.w3.org/TR/html4/loose.dtd">


<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN"
    "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
    <link rel="stylesheet" type="text/css" href="../js/ext-3.2.1/resources/css/ext-all.css">

    <script type="text/javascript" src="../js/ext-3.2.1/adapter/ext/ext-base.js"></script>
    <script type="text/javascript" src="../js/ext-3.2.1/ext-all-debug.js"></script>

    <script type="text/javascript" src="test_ap.js"></script>
    <!-- A Localization Script File comes here -->
    <script type="text/javascript">
        
        Ext.namespace('myNameSpace');
        //Ext.onReady(myNameSpace.app.init, myNameSpace.app);
/*
        t = new myNameSpace.app.init;
        Ext.apply(t, {
            btn1Text:'Taste 1'
        });
        */
 

        /*t2 = new myNameSpace.app.init;
        Ext.apply(t2, {
            btn1Text:'Taste sssssssssssssssssssssss'
        });*/
        Ext.onReady(function(){

        Ext.QuickTips.init();
        newT = Ext.extend(myNameSpace.app.init,{
    constructor:function(){
      newT.superclass.constructor.call(this);
    }
});
/*
           var win = new Ext.Window({
                renderTo: Ext.getBody(),
                layout:'fit',
                width:500,
                height:300,
                items: new Ext.TabPanel({

                    autoTabs:true,
                    activeTab:0,
                    deferredRender:false,
                    border:false
                }),

                buttons: [{
                    text:'Submit',
                    disabled:true
                },{
                    text: 'Close',
                    handler: function(){
                        win.hide();
                    }
                }]
            });

*/
 
 

//t2 = new myNameSpace.app.init;
/*

myNameSpace.simple = new Ext.FormPanel({
        labelWidth: 75, // label settings here cascade unless overridden
        url:'save-form.php',
        frame:true,
        title: 'Simple Form',
        bodyStyle:'padding:5px 5px 0',
        width: 350,
        defaults: {width: 230},
        defaultType: 'textfield',
        renderTo: Ext.getBody(),

        items: [{
                fieldLabel: 'First Name',
                name: 'first',
                allowBlank:false
            },{
                fieldLabel: 'Last Name',
                name: 'last'
            },{
                fieldLabel: 'Company',
                name: 'company'
            }, {
                fieldLabel: 'Email',
                name: 'email',
                vtype:'email'
            }, new Ext.form.TimeField({
                fieldLabel: 'Time',
                name: 'time',
                minValue: '8:00am',
                maxValue: '6:00pm'
            })
        ],

        buttons: [{
            text: 'Save'
        },{
            text: 'Cancel',
            handler : myNameSpace.app.setId
        },
       t
    ]
    });
*/


     


            
            //var t = new myNameSpace.app();
            
      });
    </script>
    <title>Application Layout Tutorial</title>
</head>
<body>


</body>
</html>
