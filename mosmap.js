/* 
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */


var some_html = ['<form method="POST" action="in.jsp"> ',
  '  <span id="map_select"> ',
  '  <input type="submit" value="Искать" onclick="fsubmit();"> ',
  '      <table border="0"> ',
  '      <tbody> ',
  '      <tr> ',
  '      <td> ',
  '      <div id="metromap" name="metromap" style="position: relative; top: 0px; left: 0px;"> ',
  '      <img usemap="#map" src="map/metro2012_Kolya.gif" border="0"> ',
  '      </div><map name="map"> ',
  '     <area shape="circle" coords="53,472,7" onclick="checkpoint(28);checkpoint(100);checkpoint(132);checkpoint(122);checkpoint(133);checkpoint(71);checkpoint(7);checkpoint(134);checkpoint(117);checkpoint(136);checkpoint(35);checkpoint(48);checkpoint(137);checkpoint(87);checkpoint(75);checkpoint(12);checkpoint(52);" title="Выделение кольцевых станций"> ',
  '      <area shape="circle" coords="53,487,7" onclick="checkpoint(121);checkpoint(120);checkpoint(30);checkpoint(53);checkpoint(50);checkpoint(51);checkpoint(29);checkpoint(8);checkpoint(9);checkpoint(72);checkpoint(119);checkpoint(73);checkpoint(32);checkpoint(118);checkpoint(199);checkpoint(102);checkpoint(33);checkpoint(103);checkpoint(34);checkpoint(74);checkpoint(11);checkpoint(88);checkpoint(49);checkpoint(10);checkpoint(31);" title="Выделение внутри Кольца"> ',
  '      <area shape="circle" coords="509,258,7" onclick="checkpoint(82);checkpoint(83);checkpoint(84);checkpoint(85);checkpoint(86);" title="Выделение станций до Кольца"><area shape="circle" coords="509,159,7" onclick="checkpoint(41);checkpoint(42);checkpoint(43);checkpoint(44);checkpoint(45);checkpoint(46);checkpoint(47);" title="Выделение станций до Кольца"> ',
  '      <area shape="circle" coords="490,50,7" onclick="checkpoint(36);checkpoint(37);checkpoint(38);checkpoint(39);checkpoint(40);" title="Выделение станций до Кольца"><area shape="circle" coords="390,50,7" onclick="checkpoint(104);checkpoint(105);checkpoint(106);checkpoint(107);checkpoint(108);checkpoint(109);checkpoint(110);" title="Выделение станций до Кольца"> ',
  '      <area shape="circle" coords="316,50,7" onclick="checkpoint(111);checkpoint(112);checkpoint(113);checkpoint(114);checkpoint(115);checkpoint(116);checkpoint(131);checkpoint(135);" title="Выделение станций до Кольца"><area shape="circle" coords="191,50,7" onclick="checkpoint(1);checkpoint(2);checkpoint(3);checkpoint(4);checkpoint(5);checkpoint(6);" title="Выделение станций до Кольца"> ',
  '      <area shape="circle" coords="176,129,7" onclick="checkpoint(63);checkpoint(64);checkpoint(65);checkpoint(66);checkpoint(67);checkpoint(68);checkpoint(69);checkpoint(70);" title="Выделение станций до Кольца"> ',
  '      <area shape="circle" coords="17,178,7" onclick="checkpoint(201);checkpoint(202);checkpoint(196);checkpoint(203);checkpoint(200);checkpoint(54);checkpoint(55);checkpoint(56);checkpoint(57);checkpoint(58);checkpoint(59);checkpoint(60);checkpoint(61);checkpoint(62);checkpoint(165);checkpoint(197);checkpoint(198);" title="Выделение станций до Кольца"> ',
  '      <area shape="circle" coords="87,770,7" onclick="checkpoint(23);checkpoint(24);checkpoint(25);checkpoint(26);checkpoint(27);checkpoint(157);" title="Выделение станций до Кольца"> ',
  '      <area shape="circle" coords="191,683,7" onclick="checkpoint(89);checkpoint(90);checkpoint(91);checkpoint(92);checkpoint(93);checkpoint(94);checkpoint(95);checkpoint(96);checkpoint(97);checkpoint(98);checkpoint(99);" title="Выделение станций до Кольца"> ',
  '      <area shape="circle" coords="290,765,7" onclick="checkpoint(123);checkpoint(124);checkpoint(125);checkpoint(126);checkpoint(127);checkpoint(128);checkpoint(129);checkpoint(130);checkpoint(155);checkpoint(156);checkpoint(164);checkpoint(191);checkpoint(192);checkpoint(193);checkpoint(194);checkpoint(195);" title="Выделение станций до Кольца"> ',
 '       <area shape="circle" coords="390,705,7" onclick="checkpoint(13);checkpoint(14);checkpoint(15);checkpoint(16);checkpoint(17);checkpoint(18);checkpoint(19);checkpoint(20);checkpoint(21);checkpoint(22);" title="Выделение станций до Кольца"> ',
  '      <area shape="circle" coords="417,685,7" onclick="checkpoint(207);checkpoint(208);checkpoint(209);checkpoint(138);checkpoint(139);checkpoint(140);checkpoint(141);checkpoint(142);checkpoint(143);checkpoint(144);checkpoint(145);checkpoint(146);" title="Выделение станций этой ветки до Кольца"> ',
  '      <area shape="circle" coords="490,684,7" onclick="checkpoint(76);checkpoint(77);checkpoint(78);checkpoint(79);checkpoint(80);checkpoint(81);" title="Выделение станций до Кольца"> ',
  '      <area shape="circle" coords="509,310,8" onclick="checkpoint(85);" title="Авиамоторная"> ',
  '      <area shape="circle" coords="390,491,8" onclick="checkpoint(13);" title="Автозаводская"> ',
  '      <area shape="circle" coords="191,585,8" onclick="checkpoint(97);" title="Академическая"> ',
  '      <area shape="circle" coords="223,409,8" onclick="checkpoint(53);" title="Александровский сад"> ',
  '      <area shape="circle" coords="390,110,8" onclick="checkpoint(105);" title="Алексеевская"> ',
  '      <area shape="circle" coords="316,60,8" onclick="checkpoint(135);" title="Алтуфьево"> ',
  '      <area shape="circle" coords="290,665,8" onclick="checkpoint(156);" title="Аннино"> ',
  '      <area shape="circle" coords="207,393,8" onclick="checkpoint(50);" title="Арбатская"> ',
  '      <area shape="circle" coords="191,100,8" onclick="checkpoint(5);" title="Аэропорт"> ',
  '      <area shape="circle" coords="390,70,8" onclick="checkpoint(109);" title="Бабушкинская"> ',
  '      <area shape="circle" coords="52,297,8" onclick="checkpoint(57);" title="Багратионовская"> ',
  '      <area shape="circle" coords="179,260,8" onclick="checkpoint(71);" title="Баррикадная"> ',
  '      <area shape="circle" coords="509,229,8" onclick="checkpoint(47);" title="Бауманская"> ',
  '      <area shape="circle" coords="176,199,8" onclick="checkpoint(69);" title="Беговая"> ',
  '      <area shape="circle" coords="225,239,8" onclick="checkpoint(7);" title="Белорусская"> ',
  '      <area shape="circle" coords="191,625,8" onclick="checkpoint(93);" title="Беляево"> ',
  '      <area shape="circle" coords="316,70,8" onclick="checkpoint(131);" title="Бибирево"> ',
  '      <area shape="circle" coords="235,408,8" onclick="checkpoint(30);" title="Библиотека Ленина"> ',
  '      <area shape="circle" coords="407,645,8" onclick="checkpoint(207);" title="Борисово"> ',
  '      <area shape="circle" coords="241,419,8" onclick="checkpoint(120);" title="Боровицкая"> ',
  '      <area shape="circle" coords="390,90,8" onclick="checkpoint(107);" title="Ботанический сад"> ',
  '      <area shape="circle" coords="407,625,8" onclick="checkpoint(145);" title="Братиславская"> ',
  '      <area shape="circle" coords="290,755,8" onclick="checkpoint(195);" title="Бунинская аллея"> ',
  '      <area shape="circle" coords="390,100,8" onclick="checkpoint(106);" title="ВДНХ"> ',
  '      <area shape="circle" coords="365,537,8" onclick="checkpoint(16);" title="Варшавская"> ',
  '      <area shape="circle" coords="87,645,8" onclick="checkpoint(24);" title="Вернадского проспект"> ',
  '      <area shape="circle" coords="316,90,8" onclick="checkpoint(112);" title="Владыкино"> ',
  '      <area shape="circle" coords="191,70,8" onclick="checkpoint(2);" title="Водный стадион"> ',
  '      <area shape="circle" coords="191,80,8" onclick="checkpoint(3);" title="Войковская"> ',
  '      <area shape="circle" coords="490,624,8" onclick="checkpoint(77);" title="Волгоградский проспект"> ',
  '      <area shape="circle" coords="407,605,8" onclick="checkpoint(142);" title="Волжская"> ',
  '      <area shape="circle" coords="17,198,8" onclick="checkpoint(203);" title="Волоколамская"> ',
  '      <area shape="circle" coords="87,625,8" onclick="checkpoint(157);" title="Воробьевы горы"> ',
  '      <area shape="circle" coords="128,348,8" onclick="checkpoint(198);" title="Выставочная"> ',
  '      <area shape="circle" coords="490,664,8" onclick="checkpoint(81);" title="Выхино"> ',
  '      <area shape="circle" coords="191,110,8" onclick="checkpoint(6);" title="Динамо"> ',
  '      <area shape="circle" coords="265,179,8" onclick="checkpoint(115);" title="Дмитровская"> ',
  '      <area shape="circle" coords="290,487,8" onclick="checkpoint(132);" title="Добрынинская"> ',
  '      <area shape="circle" coords="390,655,8" onclick="checkpoint(21);" title="Домодедовская"> ',
   '     <area shape="circle" coords="290,697,8" onclick="checkpoint(164);" title="Донского Дмитрия бульвар"> ',
  '      <area shape="circle" coords="316,211,8" onclick="checkpoint(205);" title="Достоевская"> ',
  '      <area shape="circle" coords="407,575,8" onclick="checkpoint(140);" title="Дубровка"> ',
  '      <area shape="circle" coords="402,670,8" onclick="checkpoint(209);" title="Зябликово"> ',
  '      <area shape="circle" coords="509,189,8" onclick="checkpoint(43);" title="Измайловская"> ',
  '      <area shape="circle" coords="191,615,8" onclick="checkpoint(94);" title="Калужская"> ',
  '      <area shape="circle" coords="390,625,8" onclick="checkpoint(18);" title="Кантемировская"> ',
  '      <area shape="circle" coords="302,594,8" onclick="checkpoint(17);" title="Каховская"> ',
  '      <area shape="circle" coords="390,513,8" onclick="checkpoint(15);" title="Каширская"> ',
  '      <area shape="circle" coords="158,377,8" onclick="checkpoint(52);" title="Киевская"> ',
  '      <area shape="circle" coords="354,349,8" onclick="checkpoint(74);" title="Китай-город"> ',
  '      <area shape="circle" coords="407,584,8" onclick="checkpoint(144);" title="Кожуховская"> ',
  '      <area shape="circle" coords="390,501,8" onclick="checkpoint(14);" title="Коломенская"> ',
  '      <area shape="circle" coords="386,259,8" onclick="checkpoint(35);" title="Комсомольская"> ',
  '      <area shape="circle" coords="191,635,8" onclick="checkpoint(92);" title="Коньково"> ',
  '      <area shape="circle" coords="390,671,8" onclick="checkpoint(22);" title="Красногвардейская"><area shape="circle" coords="187,268,8" onclick="checkpoint(133);" title="Краснопресненская"><area shape="circle" coords="490,99,8" onclick="checkpoint(36);" title="Красносельская"><area shape="circle" coords="372,273,8" onclick="checkpoint(34);" title="Красные ворота"><area shape="circle" coords="456,439,8" onclick="checkpoint(139);" title="Крестьянская застава"><area shape="circle" coords="210,435,8" onclick="checkpoint(29);" title="Кропоткинская"><area shape="circle" coords="17,228,8" onclick="checkpoint(62);" title="Крылатское"><area shape="circle" coords="317,312,8" onclick="checkpoint(73);" title="Кузнецкий мост"><area shape="circle" coords="490,644,8" onclick="checkpoint(79);" title="Кузьминки"><area shape="circle" coords="17,262,8" onclick="checkpoint(60);" title="Кунцевская"><area shape="circle" coords="421,317,8" onclick="checkpoint(48);" title="Курская"><area shape="circle" coords="72,317,8" onclick="checkpoint(55);" title="Кутузовская"><area shape="circle" coords="191,575,8" onclick="checkpoint(98);" title="Ленинский проспект"><area shape="circle" coords="325,320,8" onclick="checkpoint(32);" title="Лубянка"><area shape="circle" coords="407,614,8" onclick="checkpoint(143);" title="Люблино"><area shape="circle" coords="418,397,8" onclick="checkpoint(87);" title="Марксистская"><area shape="circle" coords="316,189,8" onclick="checkpoint(204);" title="Марьина роща"><area shape="circle" coords="407,635,8" onclick="checkpoint(146);" title="Марьино"><area shape="circle" coords="229,265,8" onclick="checkpoint(8);" title="Маяковская"><area shape="circle" coords="390,60,8" onclick="checkpoint(110);" title="Медведково"><area shape="circle" coords="128,338,8" onclick="checkpoint(197);" title="Международная"><area shape="circle" coords="265,212,8" onclick="checkpoint(117);" title="Менделеевская"><area shape="circle" coords="17,187,8" onclick="checkpoint(196);" title="Митино"><area shape="circle" coords="17,237,8" onclick="checkpoint(61);" title="Молодежная"><area shape="circle" coords="17,208,8" onclick="checkpoint(202);" title="Мякинино"><area shape="circle" coords="290,558,8" onclick="checkpoint(124);" title="Нагатинская"><area shape="circle" coords="290,568,8" onclick="checkpoint(125);" title="Нагорная"><area shape="circle" coords="290,578,8" onclick="checkpoint(126);" title="Нахимовский проспект"><area shape="circle" coords="509,278,8" onclick="checkpoint(82);" title="Новогиреево"><area shape="circle" coords="333,399,8" onclick="checkpoint(11);" title="Новокузнецкая"><area shape="circle" coords="265,224,8" onclick="checkpoint(134);" title="Новослободская"><area shape="circle" coords="191,667,8" onclick="checkpoint(89);" title="Новоясеневская"><area shape="circle" coords="191,605,8" onclick="checkpoint(95);" title="Новые черемушки"><area shape="circle" coords="241,479,8" onclick="checkpoint(100);" title="Октябрьская"><area shape="circle" coords="176,179,8" onclick="checkpoint(67);" title="Октябрьское поле"><area shape="circle" coords="390,645,8" onclick="checkpoint(20);" title="Орехово"><area shape="circle" coords="316,80,8" onclick="checkpoint(111);" title="Отрадное"><area shape="circle" coords="289,356,8" onclick="checkpoint(31);" title="Охотный Ряд"><area shape="circle" coords="384,451,8" onclick="checkpoint(12);" title="Павелецкая"><area shape="circle" coords="196,449,8" onclick="checkpoint(28);" title="Парк Культуры"><area shape="circle" coords="105,376,8" onclick="checkpoint(165);" title="Парк Победы"><area shape="circle" coords="509,199,8" onclick="checkpoint(44);" title="Партизанская"><area shape="circle" coords="509,179,8" onclick="checkpoint(42);" title="Первомайская"><area shape="circle" coords="509,289,8" onclick="checkpoint(83);" title="Перово"><area shape="circle" coords="290,130,8" onclick="checkpoint(113);" title="Петровско-Разумовская"><area shape="circle" coords="407,595,8" onclick="checkpoint(141);" title="Печатники"><area shape="circle" coords="32,277,8" onclick="checkpoint(59);" title="Пионерская"><area shape="circle" coords="176,139,8" onclick="checkpoint(63);" title="Планерная"><area shape="circle" coords="456,362,8" onclick="checkpoint(86);" title="Площадь Ильича"><area shape="circle" coords="307,374,8" onclick="checkpoint(49);" title="Площадь революции"><area shape="circle" coords="176,189,8" onclick="checkpoint(68);" title="Полежаевская"><area shape="circle" coords="290,469,8" onclick="checkpoint(121);" title="Полянка"><area shape="circle" coords="290,645,8" onclick="checkpoint(130);" title="Пражская"><area shape="circle" coords="490,80,8" onclick="checkpoint(38);" title="Преображенская площадь"><area shape="circle" coords="456,451,8" onclick="checkpoint(76);" title="Пролетарская"><area shape="circle" coords="353,234,8" onclick="checkpoint(136);" title="Проспект Мира"><area shape="circle" coords="191,595,8" onclick="checkpoint(96);" title="Профсоюзная"><area shape="circle" coords="223,303,8" onclick="checkpoint(72);" title="Пушкинская"><area shape="circle" coords="191,60,8" onclick="checkpoint(1);" title="Речной вокзал"><area shape="circle" coords="390,120,8" onclick="checkpoint(104);" title="Рижская"><area shape="circle" coords="456,374,8" onclick="checkpoint(138);" title="Римская"><area shape="circle" coords="490,654,8" onclick="checkpoint(80);" title="Рязанский проспект"><area shape="circle" coords="265,189,8" onclick="checkpoint(116);" title="Савеловская"><area shape="circle" coords="390,80,8" onclick="checkpoint(108);" title="Свиблово"><area shape="circle" coords="290,594,8" onclick="checkpoint(127);" title="Севастопольская"><area shape="circle" coords="509,209,8" onclick="checkpoint(45);" title="Семеновская"><area shape="circle" coords="290,499,8" onclick="checkpoint(122);" title="Серпуховская"><area shape="circle" coords="290,725,8" onclick="checkpoint(192);" title="Скобелевская улица"><area shape="circle" coords="63,333,8" onclick="checkpoint(201);" title="Славянский бульвар"><area shape="circle" coords="192,378,8" onclick="checkpoint(51);" title="Смоленская"><area shape="circle" coords="191,90,8" onclick="checkpoint(4);" title="Сокол"><area shape="circle" coords="490,90,8" onclick="checkpoint(37);" title="Сокольники"><area shape="circle" coords="87,615,8" onclick="checkpoint(26);" title="Спортивная"><area shape="circle" coords="363,296,8" onclick="checkpoint(206);" title="Сретенский бульвар"><area shape="circle" coords="17,218,8" onclick="checkpoint(200);" title="Строгино"><area shape="circle" coords="82,327,8" onclick="checkpoint(54);" title="Студенческая"><area shape="circle" coords="353,265,8" onclick="checkpoint(102);" title="Сухаревская"><area shape="circle" coords="176,149,8" onclick="checkpoint(64);" title="Сходненская"><area shape="circle" coords="414,409,8" onclick="checkpoint(75);" title="Таганская"><area shape="circle" coords="229,293,8" onclick="checkpoint(9);" title="Тверская"><area shape="circle" coords="298,365,8" onclick="checkpoint(10);" title="Театральная"><area shape="circle" coords="490,634,8" onclick="checkpoint(78);" title="Текстильщики"><area shape="circle" coords="191,645,8" onclick="checkpoint(91);" title="Теплый стан"><area shape="circle" coords="265,169,8" onclick="checkpoint(114);" title="Тимирязевская"><area shape="circle" coords="322,399,8" onclick="checkpoint(88);" title="Третьяковская"><area shape="circle" coords="297,243,8" onclick="checkpoint(199);" title="Трубная"><area shape="circle" coords="290,548,8" onclick="checkpoint(123);" title="Тульская"><area shape="circle" coords="353,303,8" onclick="checkpoint(103);" title="Тургеневская"><area shape="circle" coords="176,159,8" onclick="checkpoint(65);" title="Тушинская"><area shape="circle" coords="176,209,8" onclick="checkpoint(70);" title="Улица 1905 года"><area shape="circle" coords="290,745,8" onclick="checkpoint(194);" title="Улица Горчакова"><area shape="circle" coords="490,60,8" onclick="checkpoint(40);" title="Улица Подбельского"><area shape="circle" coords="87,635,8" onclick="checkpoint(25);" title="Университет"><area shape="circle" coords="290,736,8" onclick="checkpoint(193);" title="Ушакова адмирала бульвар"><area shape="circle" coords="42,287,8" onclick="checkpoint(58);" title="Филевский парк"><area shape="circle" coords="62,307,8" onclick="checkpoint(56);" title="Фили"><area shape="circle" coords="87,605,8" onclick="checkpoint(27);" title="Фрунзенская"><area shape="circle" coords="390,635,8" onclick="checkpoint(19);" title="Царицыно"><area shape="circle" coords="285,243,8" onclick="checkpoint(118);" title="Цветной бульвар"><area shape="circle" coords="490,70,8" onclick="checkpoint(39);" title="Черкизовская"><area shape="circle" coords="290,625,8" onclick="checkpoint(128);" title="Чертановская"><area shape="circle" coords="235,303,8" onclick="checkpoint(119);" title="Чеховская"><area shape="circle" coords="353,291,8" onclick="checkpoint(33);" title="Чистые пруды"><area shape="circle" coords="423,329,8" onclick="checkpoint(137);" title="Чкаловская"><area shape="circle" coords="191,565,8" onclick="checkpoint(99);" title="Шаболовская"><area shape="circle" coords="407,655,8" onclick="checkpoint(208);" title="Шипиловская"><area shape="circle" coords="509,298,8" onclick="checkpoint(84);" title="Шоссе энтузиастов"><area shape="circle" coords="509,169,8" onclick="checkpoint(41);" title="Щелковская"><area shape="circle" coords="176,169,8" onclick="checkpoint(66);" title="Щукинская"><area shape="circle" coords="509,219,8" onclick="checkpoint(46);" title="Электрозаводская"><area shape="circle" coords="87,660,8" onclick="checkpoint(23);" title="Юго-Западная"><area shape="circle" coords="290,635,8" onclick="checkpoint(129);" title="Южная"><area shape="circle" coords="290,655,8" onclick="checkpoint(155);" title="Янгеля Академика"><area shape="circle" coords="191,655,8" onclick="checkpoint(90);" title="Ясенево"><area shape="circle" coords="0,0,8" onclick="checkpoint(281);" title="Алтуфьевское шоссе"><area shape="circle" coords="0,0,8" onclick="checkpoint(282);" title="Боровское шоссе"><area shape="circle" coords="0,0,8" onclick="checkpoint(283);" title="Быковское шоссе"><area shape="circle" coords="0,0,8" onclick="checkpoint(284);" title="Варшавское шоссе"><area shape="circle" coords="0,0,8" onclick="checkpoint(285);" title="Волоколамское шоссе"><area shape="circle" coords="0,0,8" onclick="checkpoint(286);" title="Горьковское шоссе"><area shape="circle" coords="0,0,8" onclick="checkpoint(256);" title="Дмитровское шоссе"><area shape="circle" coords="0,0,8" onclick="checkpoint(257);" title="Егорьевское шоссе"><area shape="circle" coords="0,0,8" onclick="checkpoint(258);" title="Ильинское шоссе"><area shape="circle" coords="0,0,8" onclick="checkpoint(259);" title="Калужское шоссе"><area shape="circle" coords="0,0,8" onclick="checkpoint(260);" title="Каширское шоссе"><area shape="circle" coords="0,0,8" onclick="checkpoint(261);" title="Киевское шоссе"><area shape="circle" coords="0,0,8" onclick="checkpoint(262);" title="Куркинское шоссе"><area shape="circle" coords="0,0,8" onclick="checkpoint(263);" title="Ленинградское шоссе"><area shape="circle" coords="0,0,8" onclick="checkpoint(264);" title="Минское шоссе"><area shape="circle" coords="0,0,8" onclick="checkpoint(288);" title="Машкинское шоссе"><area shape="circle" coords="0,0,8" onclick="checkpoint(265);" title="Можайское шоссе"><area shape="circle" coords="0,0,8" onclick="checkpoint(266);" title="Новокаширское шоссе"><area shape="circle" coords="0,0,8" onclick="checkpoint(267);" title="Новорижское шоссе"><area shape="circle" coords="0,0,8" onclick="checkpoint(268);" title="Новорязанское шоссе"><area shape="circle" coords="0,0,8" onclick="checkpoint(269);" title="Новосходненское шоссе"><area shape="circle" coords="0,0,8" onclick="checkpoint(291);" title="Новоухтомское шоссе"><area shape="circle" coords="0,0,8" onclick="checkpoint(270);" title="Носовихинское шоссе"><area shape="circle" coords="0,0,8" onclick="checkpoint(271);" title="Осташковское шоссе"><area shape="circle" coords="0,0,8" onclick="checkpoint(272);" title="Подушкинское шоссе"><area shape="circle" coords="0,0,8" onclick="checkpoint(273);" title="Пятницкое шоссе"><area shape="circle" coords="0,0,8" onclick="checkpoint(274);" title="Рогачевское шоссе"><area shape="circle" coords="0,0,8" onclick="checkpoint(275);" title="Рублево-Успенское шоссе"><area shape="circle" coords="0,0,8" onclick="checkpoint(290);" title="Рублевское шоссе"><area shape="circle" coords="0,0,8" onclick="checkpoint(287);" title="Рязанское шоссе"><area shape="circle" coords="0,0,8" onclick="checkpoint(276);" title="Симферопольское шоссе"><area shape="circle" coords="0,0,8" onclick="checkpoint(277);" title="Сколковское шоссе"><area shape="circle" coords="0,0,8" onclick="checkpoint(279);" title="Щелковское шоссе"><area shape="circle" coords="0,0,8" onclick="checkpoint(280);" title="Ярославское шоссе"> ',
  '      </map>  ',
  '      </td>     ',
'        <td style="vertical-align:top;"> ',
'            <b style="color: #00749f;">станции Метро</b> ',
 '           <br> ',
 '           <select id="map_metro_s" name="metro_s" size="10" style="width:250px;" ondblclick="add_m();"> ',
  '      <option value="85">Авиамоторная</option> ',
  '      <option value="13">Автозаводская</option> ',
  '      <option value="97">Академическая</option> ',
  '      <option value="53">Александровский сад</option> ',
  '      <option value="105">Алексеевская</option> ',
  '      <option value="135">Алтуфьево</option> ',
  '      <option value="156">Аннино</option> ',
  '      <option value="50">Арбатская</option> ',
  '      <option value="5">Аэропорт</option> ',
  '      <option value="109">Бабушкинская</option> ',
  '      <option value="57">Багратионовская</option> ',
  '      <option value="71">Баррикадная</option> ',
  '      <option value="47">Бауманская</option> ',
  '      <option value="69">Беговая</option> ', 
  '      <option value="7">Белорусская</option> ',
  '      <option value="93">Беляево</option> ',
  '      <option value="131">Бибирево</option> ',
  '      <option value="30">Библиотека Ленина</option> ',
  '      <option value="207">Борисово</option> ',
  '      <option value="120">Боровицкая</option> ',
  '      <option value="107">Ботанический сад</option> ',
  '      <option value="145">Братиславская</option> ',
  '      <option value="195">Бунинская аллея</option> ',
  '      <option value="106">ВДНХ</option> ',
  '      <option value="16">Варшавская</option> ',
  '      <option value="24">Вернадского проспект</option> ',
  '      <option value="112">Владыкино</option> ',
  '      <option value="2">Водный стадион</option> ',
  '      <option value="3">Войковская</option> ',
  '      <option value="77">Волгоградский проспект</option> ',
  '      <option value="142">Волжская</option> ',
  '      <option value="203">Волоколамская</option> ',
  '      <option value="157">Воробьевы горы</option> ',
  '      <option value="198">Выставочная</option> ',
  '      <option value="81">Выхино</option> ',
  '      <option value="6">Динамо</option> ',
  '      <option value="115">Дмитровская</option> ',
  '      <option value="132">Добрынинская</option> ',
  '      <option value="21">Домодедовская</option> ',
  '      <option value="164">Донского Дмитрия бульвар</option> ',
  '      <option value="205">Достоевская</option> ',
  '      <option value="140">Дубровка</option> ',
  '      <option value="209">Зябликово</option> ',
  '      <option value="43">Измайловская</option> ',
  '      <option value="94">Калужская</option> ',
  '      <option value="18">Кантемировская</option> ',
  '      <option value="17">Каховская</option> ',
  '      <option value="15">Каширская</option> ',
  '      <option value="52">Киевская</option> ',
  '      <option value="74">Китай-город</option> ',
  '      <option value="144">Кожуховская</option> ',
  '      <option value="14">Коломенская</option> ',
  '      <option value="35">Комсомольская</option> ',
  '      <option value="92">Коньково</option> ',
  '      <option value="22">Красногвардейская</option> ',
  '      <option value="133">Краснопресненская</option> ',
  '      <option value="36">Красносельская</option> ',
  '      <option value="34">Красные ворота</option> ',
  '      <option value="139">Крестьянская застава</option> ',
  '      <option value="29">Кропоткинская</option> ',
  '      <option value="62">Крылатское</option> ', 
  '      <option value="73">Кузнецкий мост</option> ',
  '      <option value="79">Кузьминки</option> ',
  '      <option value="60">Кунцевская</option> ',
  '      <option value="48">Курская</option> ',
  '      <option value="55">Кутузовская</option> ',
  '      <option value="98">Ленинский проспект</option> ',
  '      <option value="32">Лубянка</option> ',
  '      <option value="143">Люблино</option> ',
  '      <option value="87">Марксистская</option> ',
  '      <option value="204">Марьина роща</option> ',
  '      <option value="146">Марьино</option> ',
  '      <option value="8">Маяковская</option> ',
  '      <option value="110">Медведково</option> ', 
   '     <option value="197">Международная</option> ',
   '     <option value="117">Менделеевская</option> ',
   '     <option value="196">Митино</option> ',
   '     <option value="61">Молодежная</option> ',
    '    <option value="202">Мякинино</option> ',
    '    <option value="124">Нагатинская</option> ',
    '    <option value="125">Нагорная</option> ',
    '    <option value="126">Нахимовский проспект</option> ',
    '    <option value="82">Новогиреево</option> ',
    '    <option value="11">Новокузнецкая</option> ',
   '     <option value="134">Новослободская</option> ',
   '     <option value="89">Новоясеневская</option> ',
   '     <option value="95">Новые черемушки</option> ',
   '     <option value="100">Октябрьская</option> ',
   '     <option value="67">Октябрьское поле</option> ',
   '     <option value="20">Орехово</option> ',
   '     <option value="111">Отрадное</option> ',
   '     <option value="31">Охотный Ряд</option> ',
   '     <option value="12">Павелецкая</option> ',
   '     <option value="28">Парк Культуры</option> ',
   '     <option value="165">Парк Победы</option> ',
   '     <option value="44">Партизанская</option> ', 
   '     <option value="42">Первомайская</option> ',
   '     <option value="83">Перово</option> ',
   '     <option value="113">Петровско-Разумовская</option> ',
   '     <option value="141">Печатники</option> ',
   '     <option value="59">Пионерская</option> ',
   '     <option value="63">Планерная</option> ',
   '     <option value="86">Площадь Ильича</option> ',
   '     <option value="49">Площадь революции</option> ',
   '     <option value="68">Полежаевская</option> ',
   '     <option value="121">Полянка</option> ',
   '     <option value="130">Пражская</option> ',
   '     <option value="38">Преображенская площадь</option> ',
   '     <option value="76">Пролетарская</option> ',
   '     <option value="136">Проспект Мира</option> ',
   '     <option value="96">Профсоюзная</option> ',
   '     <option value="72">Пушкинская</option> ',
   '     <option value="1">Речной вокзал</option> ',
   '     <option value="104">Рижская</option> ', 
   '     <option value="138">Римская</option> ',
   '     <option value="80">Рязанский проспект</option> ',
   '     <option value="116">Савеловская</option> ',
   '     <option value="108">Свиблово</option> ',
   '     <option value="127">Севастопольская</option> ',
   '     <option value="45">Семеновская</option> ',
   '     <option value="122">Серпуховская</option> ',
   '     <option value="192">Скобелевская улица</option> ', 
   '     <option value="201">Славянский бульвар</option> ',
   '     <option value="51">Смоленская</option> ',
   '     <option value="4">Сокол</option> ',
   '     <option value="37">Сокольники</option> ',
   '     <option value="26">Спортивная</option> ',
   '     <option value="206">Сретенский бульвар</option> ',
   '     <option value="200">Строгино</option> ',
  '      <option value="54">Студенческая</option> ', 
  '      <option value="102">Сухаревская</option> ',
  '      <option value="64">Сходненская</option> ',
  '      <option value="75">Таганская</option> ',
   '     <option value="9">Тверская</option> ',
   '     <option value="10">Театральная</option> ',
   '     <option value="78">Текстильщики</option> ',
   '     <option value="91">Теплый стан</option> ',
   '     <option value="114">Тимирязевская</option> ',
   '     <option value="88">Третьяковская</option> ',
   '     <option value="199">Трубная</option> ',
   '     <option value="123">Тульская</option> ',
   '     <option value="103">Тургеневская</option> ',
   '     <option value="65">Тушинская</option> ',
   '     <option value="70">Улица 1905 года</option> ',
   '     <option value="194">Улица Горчакова</option> ',
   '     <option value="40">Улица Подбельского</option> ',
   '     <option value="25">Университет</option> ',
   '     <option value="193">Ушакова адмирала бульвар</option> ',
   '     <option value="58">Филевский парк</option> ',
   '     <option value="56">Фили</option> ',
    '    <option value="27">Фрунзенская</option> ',
   '     <option value="19">Царицыно</option> ',
   '     <option value="118">Цветной бульвар</option> ',
   '     <option value="39">Черкизовская</option> ',
   '     <option value="128">Чертановская</option> ',
   '     <option value="119">Чеховская</option> ',
   '     <option value="33">Чистые пруды</option> ',
   '     <option value="137">Чкаловская</option> ', 
   '     <option value="99">Шаболовская</option> ',
   '     <option value="208">Шипиловская</option> ',
   '     <option value="84">Шоссе энтузиастов</option> ',
   '     <option value="41">Щелковская</option> ',
   '     <option value="66">Щукинская</option> ',
   '     <option value="46">Электрозаводская</option> ',
   '     <option value="23">Юго-Западная</option> ',
   '     <option value="129">Южная</option> ',
   '     <option value="155">Янгеля Академика</option> ',
   '     <option value="90">Ясенево</option> ',
   '         </select> ',
   '     </td> ',
   '     <td valign="top"> ',
   '     <input title="добавить в выбранные" type="button" name="add" value="выбрать &gt;&gt;" onclick="add_m();"> ',
   '     <br> ',
   '     <input title="удалить из выбранных" type="button" name="del" value="&lt;&lt; удалить" onclick="del_m();"> ',
   '     </td> ',
   '     <td style="vertical-align:top;"><b style="color: #00749f;">выбранные станции</b><br> ',
   '         <select id="map_metro[]" name="metro[]" multiple="" size="10" style="width:250px;" ondblclick="del_m();"> ',
   '     </select><br><input type="button" value="Очистить выбранные" onclick="freset();"></td> ',
   '     </tr></tbody></table> ',
   '     <script> ',
   '     </script> ',
   '     </span> ',
        '</form >'];


function fsubmit() {
    left_list.value = null;
    for (i = 0; i < right_list.options.length; i++)
        right_list.options[i].selected = true;
    document.forms[0].submit();
}

window.a = {};
window.onload = function() {

    a.metro_s = document.getElementById("map_metro_s");
    a.metromap = document.getElementById('metromap');
    a["metro[]"] = document.getElementById("map_metro[]");
    left_list = document.getElementById("map_metro_s");
 	right_list = document.getElementById("map_metro[]");


};

metro = new Array();

metro[85] = new Array("Авиамоторная",0,509,310);
metro[13] = new Array("Автозаводская",0,390,491);
metro[97] = new Array("Академическая",0,191,585);
metro[53] = new Array("Александровский сад",0,223,409);
metro[105] = new Array("Алексеевская",0,390,110);
metro[135] = new Array("Алтуфьево",0,316,60);
metro[156] = new Array("Аннино",0,290,665);
metro[50] = new Array("Арбатская",0,207,393);
metro[5] = new Array("Аэропорт",0,191,100);
metro[109] = new Array("Бабушкинская",0,390,70);
metro[57] = new Array("Багратионовская",0,52,297);
metro[71] = new Array("Баррикадная",0,179,260);
metro[47] = new Array("Бауманская",0,509,229);
metro[69] = new Array("Беговая",0,176,199);
metro[7] = new Array("Белорусская",0,225,239);
metro[93] = new Array("Беляево",0,191,625);
metro[131] = new Array("Бибирево",0,316,70);
metro[30] = new Array("Библиотека Ленина",0,235,408);
metro[207] = new Array("Борисово",0,407,645);
metro[120] = new Array("Боровицкая",0,241,419);
metro[107] = new Array("Ботанический сад",0,390,90);
metro[145] = new Array("Братиславская",0,407,625);
metro[195] = new Array("Бунинская аллея",0,290,755);
metro[106] = new Array("ВДНХ",0,390,100);
metro[16] = new Array("Варшавская",0,365,537);
metro[24] = new Array("Вернадского проспект",0,87,645);
metro[112] = new Array("Владыкино",0,316,90);
metro[2] = new Array("Водный стадион",0,191,70);
metro[3] = new Array("Войковская",0,191,80);
metro[77] = new Array("Волгоградский проспект",0,490,624);
metro[142] = new Array("Волжская",0,407,605);
metro[203] = new Array("Волоколамская",0,17,198);
metro[157] = new Array("Воробьевы горы",0,87,625);
metro[198] = new Array("Выставочная",0,128,348);
metro[81] = new Array("Выхино",0,490,664);
metro[6] = new Array("Динамо",0,191,110);
metro[115] = new Array("Дмитровская",0,265,179);
metro[132] = new Array("Добрынинская",0,290,487);
metro[21] = new Array("Домодедовская",0,390,655);
metro[164] = new Array("Донского Дмитрия бульвар",0,290,697);
metro[205] = new Array("Достоевская",0,316,211);
metro[140] = new Array("Дубровка",0,407,575);
metro[209] = new Array("Зябликово",0,402,670);
metro[43] = new Array("Измайловская",0,509,189);
metro[94] = new Array("Калужская",0,191,615);
metro[18] = new Array("Кантемировская",0,390,625);
metro[17] = new Array("Каховская",0,302,594);
metro[15] = new Array("Каширская",0,390,513);
metro[52] = new Array("Киевская",0,158,377);
metro[74] = new Array("Китай-город",0,354,349);
metro[144] = new Array("Кожуховская",0,407,584);
metro[14] = new Array("Коломенская",0,390,501);
metro[35] = new Array("Комсомольская",0,386,259);
metro[92] = new Array("Коньково",0,191,635);
metro[22] = new Array("Красногвардейская",0,390,671);
metro[133] = new Array("Краснопресненская",0,187,268);
metro[36] = new Array("Красносельская",0,490,99);
metro[34] = new Array("Красные ворота",0,372,273);
metro[139] = new Array("Крестьянская застава",0,456,439);
metro[29] = new Array("Кропоткинская",0,210,435);
metro[62] = new Array("Крылатское",0,17,228);
metro[73] = new Array("Кузнецкий мост",0,317,312);
metro[79] = new Array("Кузьминки",0,490,644);
metro[60] = new Array("Кунцевская",0,17,262);
metro[48] = new Array("Курская",0,421,317);
metro[55] = new Array("Кутузовская",0,72,317);
metro[98] = new Array("Ленинский проспект",0,191,575);
metro[32] = new Array("Лубянка",0,325,320);
metro[143] = new Array("Люблино",0,407,614);
metro[87] = new Array("Марксистская",0,418,397);
metro[204] = new Array("Марьина роща",0,316,189);
metro[146] = new Array("Марьино",0,407,635);
metro[8] = new Array("Маяковская",0,229,265);
metro[110] = new Array("Медведково",0,390,60);
metro[197] = new Array("Международная",0,128,338);
metro[117] = new Array("Менделеевская",0,265,212);
metro[196] = new Array("Митино",0,17,187);
metro[61] = new Array("Молодежная",0,17,237);
metro[202] = new Array("Мякинино",0,17,208);
metro[124] = new Array("Нагатинская",0,290,558);
metro[125] = new Array("Нагорная",0,290,568);
metro[126] = new Array("Нахимовский проспект",0,290,578);
metro[82] = new Array("Новогиреево",0,509,278);
metro[11] = new Array("Новокузнецкая",0,333,399);
metro[134] = new Array("Новослободская",0,265,224);
metro[89] = new Array("Новоясеневская",0,191,667);
metro[95] = new Array("Новые черемушки",0,191,605);
metro[100] = new Array("Октябрьская",0,241,479);
metro[67] = new Array("Октябрьское поле",0,176,179);
metro[20] = new Array("Орехово",0,390,645);
metro[111] = new Array("Отрадное",0,316,80);
metro[31] = new Array("Охотный Ряд",0,289,356);
metro[12] = new Array("Павелецкая",0,384,451);
metro[28] = new Array("Парк Культуры",0,196,449);
metro[165] = new Array("Парк Победы",0,105,376);
metro[44] = new Array("Партизанская",0,509,199);
metro[42] = new Array("Первомайская",0,509,179);
metro[83] = new Array("Перово",0,509,289);
metro[113] = new Array("Петровско-Разумовская",0,290,130);
metro[141] = new Array("Печатники",0,407,595);
metro[59] = new Array("Пионерская",0,32,277);
metro[63] = new Array("Планерная",0,176,139);
metro[86] = new Array("Площадь Ильича",0,456,362);
metro[49] = new Array("Площадь революции",0,307,374);
metro[68] = new Array("Полежаевская",0,176,189);
metro[121] = new Array("Полянка",0,290,469);
metro[130] = new Array("Пражская",0,290,645);
metro[38] = new Array("Преображенская площадь",0,490,80);
metro[76] = new Array("Пролетарская",0,456,451);
metro[136] = new Array("Проспект Мира",0,353,234);
metro[96] = new Array("Профсоюзная",0,191,595);
metro[72] = new Array("Пушкинская",0,223,303);
metro[1] = new Array("Речной вокзал",0,191,60);
metro[104] = new Array("Рижская",0,390,120);
metro[138] = new Array("Римская",0,456,374);
metro[80] = new Array("Рязанский проспект",0,490,654);
metro[116] = new Array("Савеловская",0,265,189);
metro[108] = new Array("Свиблово",0,390,80);
metro[127] = new Array("Севастопольская",0,290,594);
metro[45] = new Array("Семеновская",0,509,209);
metro[122] = new Array("Серпуховская",0,290,499);
metro[192] = new Array("Скобелевская улица",0,290,725);
metro[201] = new Array("Славянский бульвар",0,63,333);
metro[51] = new Array("Смоленская",0,192,378);
metro[4] = new Array("Сокол",0,191,90);
metro[37] = new Array("Сокольники",0,490,90);
metro[26] = new Array("Спортивная",0,87,615);
metro[206] = new Array("Сретенский бульвар",0,363,296);
metro[200] = new Array("Строгино",0,17,218);
metro[54] = new Array("Студенческая",0,82,327);
metro[102] = new Array("Сухаревская",0,353,265);
metro[64] = new Array("Сходненская",0,176,149);
metro[75] = new Array("Таганская",0,414,409);
metro[9] = new Array("Тверская",0,229,293);
metro[10] = new Array("Театральная",0,298,365);
metro[78] = new Array("Текстильщики",0,490,634);
metro[91] = new Array("Теплый стан",0,191,645);
metro[114] = new Array("Тимирязевская",0,265,169);
metro[88] = new Array("Третьяковская",0,322,399);
metro[199] = new Array("Трубная",0,297,243);
metro[123] = new Array("Тульская",0,290,548);
metro[103] = new Array("Тургеневская",0,353,303);
metro[65] = new Array("Тушинская",0,176,159);
metro[70] = new Array("Улица 1905 года",0,176,209);
metro[194] = new Array("Улица Горчакова",0,290,745);
metro[40] = new Array("Улица Подбельского",0,490,60);
metro[25] = new Array("Университет",0,87,635);
metro[193] = new Array("Ушакова адмирала бульвар",0,290,736);
metro[58] = new Array("Филевский парк",0,42,287);
metro[56] = new Array("Фили",0,62,307);
metro[27] = new Array("Фрунзенская",0,87,605);
metro[19] = new Array("Царицыно",0,390,635);
metro[118] = new Array("Цветной бульвар",0,285,243);
metro[39] = new Array("Черкизовская",0,490,70);
metro[128] = new Array("Чертановская",0,290,625);
metro[119] = new Array("Чеховская",0,235,303);
metro[33] = new Array("Чистые пруды",0,353,291);
metro[137] = new Array("Чкаловская",0,423,329);
metro[99] = new Array("Шаболовская",0,191,565);
metro[208] = new Array("Шипиловская",0,407,655);
metro[84] = new Array("Шоссе энтузиастов",0,509,298);
metro[41] = new Array("Щелковская",0,509,169);
metro[66] = new Array("Щукинская",0,176,169);
metro[46] = new Array("Электрозаводская",0,509,219);
metro[23] = new Array("Юго-Западная",0,87,660);
metro[129] = new Array("Южная",0,290,635);
metro[155] = new Array("Янгеля Академика",0,290,655);
metro[90] = new Array("Ясенево",0,191,655);


mimg = new Array();

for (i = 0; i < 300; i++)
    if (metro[i]) {
        mimg[i] = document.createElement("IMG");
        mimg[i].src = "http://www.cian.ru/images/pp.gif";
        mimg[i].style.position = "absolute";
        mimg[i].style.left = metro[i][2];
        mimg[i].style.top = metro[i][3];
        mimg[i].style.width = 9;
        mimg[i].style.height = 9;
        mimg[i].style.cursor = "hand";
        mimg[i].onclick = (function(idx) { return function() { checkpoint(idx) }; })(i);
    }

function add_m() {
    var left_sel = left_list.options.selectedIndex;

    if (left_sel != -1) {
        var src = left_list.options[left_sel];
        var len_right = right_list.options.length;

        var is_added = false;
        for (i = 0; i < len_right; i++)
            if (right_list.options[i].value == src.value) {
                is_added = true;
                break;
            }

        if (!is_added)
            right_list.options[len_right] = new Option(src.text, src.value);

        metro[src.value][1] = 1;
        if (mimg[src.value])
            a.metromap.appendChild(mimg[src.value]);
    }
}

function del_m() {
    var right_sel = right_list.options.selectedIndex;

    if (right_sel != -1) {
        var right_val = right_list.options[right_sel].value;

        right_list.remove(right_sel);

        metro[right_val][1] = 0;
        if (mimg[right_val])
            metromap.removeChild(mimg[right_val]);
    }
}

function checkpoint(map_sel) {
    metro[map_sel][1] = 0 + !metro[map_sel][1]; // toggle

    var right_len = right_list.options.length;

    if (metro[map_sel][1] == 1) {
       var left_idx = -1;
       for (i = 0; i < left_list.options.length; i++)
           if (left_list.options[i].value == map_sel) {
               left_idx = i;
               break;
           }

       if (left_idx != -1) {
           right_list.options[right_len] = new Option(left_list.options[left_idx].text, left_list.options[left_idx].value);
           if (mimg[map_sel])
               metromap.appendChild(mimg[map_sel]);
       }
    }
    else {
        if (mimg[map_sel])
            metromap.removeChild(mimg[map_sel]);

        var right_idx = -1;
        for (i = 0; i < right_len; i++)
           if (right_list.options[i].value == map_sel) {
               right_idx = i;
               break;
           }

        if (right_idx != -1)
            right_list.remove(right_idx);
    }
}

function fsubmit() {
    left_list.value = null;
    for (i = 0; i < right_list.options.length; i++)
        right_list.options[i].selected = true;
    document.forms[0].submit();
}

function freset() {
    while (right_list.options.length > 0) {
        var right_val = right_list.options[0].value;

        right_list.remove(0);

        metro[right_val][1] = 0;
        if (mimg[right_val])
            metromap.removeChild(mimg[right_val]);
    }
}