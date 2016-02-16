/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */


/**
  * Application Layout
  * by Jozef Sakalos, aka Saki
  * http://extjs.com/learn/Tutorial:Application_Layout_for_Beginners
  */

// reference local blank image
Ext.BLANK_IMAGE_URL = '../js/ext-3.2.1/resources/images/default/s.gif';

// create namespace
Ext.namespace('myNameSpace');


// Just to allow this tutorial to work for 1.1 and 2.
//Ext.Ext2 = (Ext.version && (Ext.version.indexOf("3") == 0));


// create application
myNameSpace.app = function() {
    // do NOT access DOM from here; elements don't exist yet


    // private variables
    var btn1;
    var privVar1 = 11;

    // private functions
    var btn1Handler = function(button, event) {

        
            alert('privVar1=' + privVar1);
            alert('this.btn1Text=' + this.btn1Text);
            if (privVar1 == 11){
                privVar1 = 333777;
                alert('defined' + privVar1);
            }
        

    };


    // public space
    return {
        // public properties, e.g. strings to translate
        btn1Text: 'Button 1',


        // public methods
        init: function() {
            
/*
                btn1 = new Ext.Button({
                    renderTo: 'btn1-ct',
                    //renderTo: Ext.getBody(),
                    text: this.btn1Text,
                    handler: btn1Handler
                    ,scope:this
                });
                */
        
            btn1 = new Ext.Button({
                renderTo:  Ext.getBody(),
                text: this.btn1Text,
                handler: btn1Handler
                , scope: this

            });
        
            

        }
    };
}(); // end of app

// end of file

Ext.app.Module = function(config){
    Ext.apply(this, config);
    Ext.app.Module.superclass.constructor.call(this);
    this.init();
}
