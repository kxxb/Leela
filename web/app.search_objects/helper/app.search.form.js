/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */


var frmSearch = new Ext.FormPanel({
        labelAlign: 'center'
        ,method : 'POST'
        //,baseParams: { DepId: lCreateReq_DepId }
        ,url:'catch_params.jsp'
        ,html : some_html.join('')
//        ,html:'<object width="710" height="900" align="middle" id="metromap_arenda_v2"                          '+
//                                '         codebase="http://fpdownload.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=8,0,0,0" '+
//                                '         classid="clsid:d27cdb6e-ae6d-11cf-96b8-444553540000">                                            '+  
//                                ' <param value="searcher=catch_params.jsp" name="FlashVars">                                                      '+ 
//                                ' <param value="sameDomain" name="allowScriptAccess">                                                        '+
//                                ' <param value="flw_search/metromap_arenda_v2.swf" name="movie">                                                       '+         
//                                ' <param value="high" name="quality">                                                                      '+                          
//                                ' <param value="#ffffff" name="bgcolor">                                                                     '+
//                                ' <embed width="710" height="900" align="middle"                                                             '+            
//                                '        pluginspage="http://www.macromedia.com/go/getflashplayer"                                           '+
//                                '        flashvars="searcher=catch_params.jsp"                                                                     '+
//                                '        type="application/x-shockwave-flash"                                                                '+    
//                                '        allowscriptaccess="sameDomain"                                                                      '+
//                                '        name="metromap_arenda_v2"                                                                           '+
//                                '        bgcolor="#ffffff" quality="high" src="flw_search/metromap_arenda_v2.swf">                                      '+
//                                ' </object>'                                                                                                 
        ,buttons: [{
                          text: 'Поиск'
                          ,handler: function(){
                            var theForm = frmSearch.getForm();
                                
                                
                                //Ext.Msg.alert('Error','Ошибка связи' + ddd);  
                        
                                
                               //var resss = new Ext.data.Record;
                                
                                 theForm.submit({
                                 
                                 success: function(form, action){
                                     obj = Ext.util.JSON.decode(action.response.responseText);
                                      //var result=response.responseText;
                                        // server responded with success = true
                                       //v_res_info = Ext.util.JSON.decode( resp.responseText);
                                      
                                        app_store_search.load({params: {
                                                                m_cian:obj.data.m
                                                            
                                                           }});
                                       //Ext.MessageBox.alert('Заявка',obj.data.m);
                                        //Ext.Msg.alert('Result','связи '+result);
                                    },
                                  failure: function(resp,opt) {
                                     Ext.Msg.alert('Error','Ошибка связи');
                                  }
                             })
                             
                             
                             
                             //Ext.MessageBox.alert('Поиск','Найдено' + resss);

                          }
                        }]
});        