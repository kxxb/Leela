/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */

app.AddresPanel =  Ext.extend(Ext.Panel,{
    initComponent: function(){
      var config = {
         
         
         //,split: true
        // ,id:id
         //,overflow:'auto'
         //,bodyStyle: {background: '#ffffff',padding: '7px'}
         tpl:new Ext.XTemplate(
                                            '									',
                                            '<table class="stat" border="0" width ="100%">                               ',
                                            '<tr>															',
                                            '	<td>														',
                                            '	<table border="0" width ="100%">								',
                                            '		<tr><td ><b> Наименование:</b> <u> {object_title}</u></td></tr> ',
                                            '		<tr><td ><b> Статус:</b> <u> {obj_status}</u></td></tr> ',
                                            '		<tr><td ><b> Цена проекта:</b> <u> {project_cost}</u></td></tr> ',
                                            '		<tr><td ><b> НДС:</b> <u> {nds}</u></td></tr> ',
                                            '		<tr><td ><b> Информация о земле:</b> <u> {land_info}</u></td></tr> ',
                                            '		<tr><td ><b> Владелец:</b> <u> {object_owner}</u></td></tr> ',
                                            '		<tr><td ><b> Агенство:</b> <u> {agency}</u></td></tr> ',
                                            '		<tr><td ><b> Проработать:</b> <u> {elabor}</u></td></tr> ',
                                            '		<tr><td ><b> Приоритет:</b> <u> {Priority}</u></td></tr> ',
                                            '		<tr><td ><b> Лучшее предложение:</b> <u> {best_offer}</u></td></tr> ',
                                            '		<tr><td ><b> Лот:</b> <u> {lot}</u></td></tr> ',
                                            '		<tr><td ><b> Старый лот:</b> <u> {old_lot}</u></td></tr> ',
                                            '		<tr><td ><b> Работа по контракту:</b> <u> {contract_work}</u></td></tr> ',
                                            '		<tr><td ><b> Акитив пасив:</b> <u> {active_passive}</u></td></tr> ',
                                            '		<tr><td ><b> Предназначен:</b> <u> {proposed}</u></td></tr> ',
                                            '		<tr><td ><b> Для аренды:</b> <u> {for_lease}</u></td></tr> ',
                                            '		<tr><td ><b> Для продажи:</b> <u> {for_sale}</u></td></tr> ',
                                            '		<tr><td ><b> Для субаренды:</b> <u> {for_sublease}</u></td></tr> ',
                                            '		<tr><td ><b> Продажа арендного бизнеса:</b> <u> {for_lease_sale}</u></td></tr> ',
                                            '		<tr><td ><b> Девелопер:</b> <u> {developer_name}</u></td></tr> ',
                                            '		<tr><td ><b> Контактное лицо:</b> <u> {dev_contact}</u></td></tr> ',
                                            '		<tr><td ><b> Телефон:</b> <u> {dev_tel}</u></td></tr> ',
                                            '		<tr><td ><b> Инвестор:</b> <u> {investor_name}</u></td></tr> ',
                                            '		<tr><td ><b> Располоение:</b> <u> {location_name}</u></td></tr> ',
                                            '		<tr><td ><b> Направление:</b> <u> {direction_name}</u></td></tr> ',
                                            '		<tr><td ><b> Деловой район:</b> <u> {bis_district}</u></td></tr> ',
                                            '		<tr><td ><b> Станция метро:</b> <u> {station_name}</u></td></tr> ',
                                            '		<tr><td ><b> минут пешком от метро:</b> <u> {walk_metro_minutes}</u></td></tr> ',
                                            '		<tr><td ><b> минут на авто  от метро:</b> <u> {auto_metro_minutes}</u></td></tr> ',
                                            '		<tr><td ><b> за МКАД:</b> <u> {outside_mkad}</u></td></tr> ',
                                             
                                            '		<tr><td ><b> описание местоположения:</b> <u> {discripton_of_location}</u></td></tr> ',
                                            '		<tr><td ><b> Улица:</b> <u> {street_name}</u></td></tr> ',
                                            '		<tr><td ><b> Номер дома:</b> <u> {house_numb}</u></td></tr> ',
                                            
                                            '	</table>													',
                                            '	</td>														',
                                           '</tr>															',
                                            '</table>													'

                       )

      };
           Ext.apply(this, Ext.apply(this.initialConfig, config));
           app.AddresPanel.superclass.initComponent.apply(this, arguments);


   } // eo function initComponent

});
Ext.reg('addresspan', app.AddresPanel);
