/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */
Ext.namespace('req','req.univtab', 'req.store', 'req.cm');

req.app = function() {
    // Private Variables...
    var viewport;
    var rootTab;

   


    var buildApp = function(){
      
     
      var tb = new Ext.Toolbar();
                var menu = new Ext.menu.Menu({
                        id: 'mainMenu',
                        style: {
                            overflow: 'visible'     // For the Combo popup
                        },
                        items: [
                            {
                                text: 'Главная'
                                //,handler: onMainClick

                            },
                            {
                                text: 'Шаблоны'
                                //,handler: onTemplateClick

                            }
                        ]
                    });


            tb.add({
                text:'Задачи',
                iconCls: 'bmenu',  // <-- icon
                menu: menu  // assign menu by instance
            });

        
        

        var tab1 = new  req.univtab.tabUR();
        

        rootTab = new req.RootTab(Ext.apply(
           {region: 'center'
            , items: [tab1]}));

        viewport = new Ext.Viewport({
                layout: 'border',
                //renderTo: Ext.getBody(),
                items: [{
                        region: 'north',
                        xtype: 'panel',
                        height:28
                        ,tbar:tb
                    }// eof    region: 'north',
                   , rootTab   //{region: 'center'
                        /*здесь будут все табы*/
                      //     ,xtype :'roottab'
                       //,items:[grid, content]


                    //} // eof region: 'center'
                    ,{region: 'south',
                        /*пустое пространство*/
                        height:28,
                        items: [
                            {
                          html: "&nbsp;&nbsp;&nbsp;Paul's Yard &copy; 2011  "
                        } ]
                    } // eof region: 'south'
                 ] //eof viewport items
            });//eof viewport

     

    };// eof buildApp


    
    

    // Public Area
  return {
    init : function() {

        buildApp();

        viewport.render();


        //win.show(button);
/*
      button = Ext.get("theBtn");
      button.on("click" , function() {
        buildApp( cfg );
        win.show(button);
      });*/
    }
  };	// End Public Return

}();