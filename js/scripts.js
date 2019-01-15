jQuery(document).ready(function($) {

	var aDeskCols = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'],
		aDeskRows = [8, 7, 6, 5, 4, 3, 2, 1],
		oCheckDesk = {},
		aCellsOnlyBlackQueen = ['a1', 'c1', 'e1', 'g1'],
		aCellsOnlyWhiteQueen = ['b8', 'd8', 'f8', 'h8'],
		aCheckersHtmlCodes = [
			'<span class="checkers__check checkers__check--white"></span>', //Белая
			'<span class="checkers__check checkers__check--white-queen"></span>', // Белая дамка
			'<span class="checkers__check checkers__check--black"></span>', //Черная
			'<span class="checkers__check checkers__check--black-queen"></span>', // Черная дамка
		];

	//Генерация доски и информации о всех клетках
	for(i in aDeskCols) {

		for(j in aDeskRows) {

			bIsWhiteCell = (aDeskRows[j] % 2 == 0 && i % 2 == 0) || (aDeskRows[j] % 2 != 0 && i % 2 != 0)  ? false : true;

			oCheckDesk[aDeskCols[i].concat(aDeskRows[j])] = {
				id: aDeskCols[i].concat(aDeskRows[j]),
				dark: bIsWhiteCell,
				busy: false,
				checker: false
			}

		}

	}

	//console.log(oCheckDesk);

	//Клик по клетке
	/*$('.checkers__cell').on('click', function(event) {
		event.preventDefault();

		if($(this).attr('data-barash-id'))
			setCheckerOnCell($(this).attr('id'));
		else
			alert('На белые клетки установка шашки невозможна!');

	});*/

	//Функция установки шашки на клетку
	function setCheckerOnCell(CELL_ID) {

		//Переменная текущей клетки
		var oCurCell = oCheckDesk[CELL_ID];

		if(oCurCell.busy === false && nCountCheckersOnDesk() > 3) {
			alert('Установка более 4 шашек на доске невозможна!');
			return false;
		}

		//Если клетка не чёрная
		/*if(oCurCell.dark !== true) {
			alert('На белые клетки установка шашки невозможна!');
			return false;
		}*/

		//Если клетка не занята
		if(oCurCell.busy === false) {

			oCurCell.busy = true;

			//Если мы кликаем на самую последнюю линию для белых, то там может стоять только белая дамка
			if(in_array(CELL_ID, aCellsOnlyWhiteQueen))
				oCurCell.checker = 1;
			else
				oCurCell.checker = 0;

			$('[id="'+CELL_ID+'"]').html(aCheckersHtmlCodes[oCurCell.checker]);

		}
		else {

			oCurCell.checker++;

			//Если мы кликаем на самую последнюю линию для чёрных, то там может стоять только чёрная дамка
			if(in_array(CELL_ID, aCellsOnlyBlackQueen))
				if(oCurCell.checker == 2)
					oCurCell.checker++;

			if(oCurCell.checker > 3) {
				oCurCell.busy = false;
				oCurCell.checker = false;
				$('[id="'+CELL_ID+'"]').html("");
			}
			else {
				$('[id="'+CELL_ID+'"]').html(aCheckersHtmlCodes[oCurCell.checker]);
			}

		}

	}

	$("#change-step-checker-color").on('click', function(event) {
		event.preventDefault();

		var sNextText = $(this).attr('data-text'),
			sPrevText = $(this).html();

		if($(this).hasClass('btn--white'))
			$(this).removeClass('btn--white').addClass('btn--black');
		else
			$(this).removeClass('btn--black').addClass('btn--white');

		$(this).attr('data-text', sPrevText).html(sNextText);
	});

	//Функция подсчёта шашек на доске
	function nCountCheckersOnDesk() {

		nCountResult = 0;

		for (key in oCheckDesk)
			if(oCheckDesk[key].busy === true)
				nCountResult++;

		return nCountResult;

	}

	function in_array(needle, haystack, strict) {	// Checks if a value exists in an array
		//
		// +   original by: Kevin van Zonneveld (http://kevin.vanzonneveld.net)

		var found = false, key, strict = !!strict;

		for (key in haystack) {
			if ((strict && haystack[key] === needle) || (!strict && haystack[key] == needle)) {
				found = true;
				break;
			}
		}

		return found;
	}

});


/*Приложение*/
(function() {

	var	$wcount,
		$f;

	$wcount = 126;
	$f = 4;	// мы считаем f-шашечные окончания


	var	$ftable,
		$C,
		$ww,
		$smf,
		$WFSize,
		$wbfile,
		$file,
		$mytrue,
		$contloop,
		$GettingRang,
		$GettingRSq;
		$MinRang = 255,
		$NotCleared = 0;

	$C = new Array();
	$ww = new Array();
	$smf = new Array();
	$mytrue = 1;
	$contloop = 1;
	$GettingRang = 0;
	$GettingRSq = 0;

	//typedef unsigned char tb;

	$ftable = new Array(1, 1, 2, 3 * 2, 4 * 3 * 2, 5 * 4 * 3 * 2);


	/*struct theboard {
		tb w1,wsc,bsc,wdc,bdc;   // Б1Г БШ ЧШ БД ЧД: фиксированный материал
		tb ch[f];                // набор занимаемых клеток
		int move;                // 1 -- ход белых, 0 -- ход черных
	};

	struct brboard {
		tb cb[56];               // клетки доски; на каждой --- Figure
		int RSq[56][5];           // Раскраска цифрами
		int move;                // 1 -- ход белых, 0 -- ход черных
		int allc;
	};*/

	function struct_fullboard(names) {

		var names = names.split(' ');

		var count = names.length;

		function constructor() {

			for (var i = 0; i < count; i++) {

				this[names[i]] = arguments[i];

			}

		}

		return constructor;

	}


	/*struct fullboard {
		tb allc;                 // всего шашек (сумма чисел из след. строки);
		tb w1, wsc, bsc, wdc, bdc;   // Б1Г БШ ЧШ БД ЧД: фиксированный материал
		tb ch[f];                // наборы занимаемых клеток
		                   // необязат. в процессе будут верны, об. вначале!!!
		                   // При изменении материала в прцессе съедения
		                   // это не фикируется; (нужно фикс. ch после хода...)

		int cb[56];               // клетки доски; на каждой --- Figure
		int RSq[56][5];            // Раскраска цифрами
		int move;                // 1 -- ход белых, 0 -- ход черных
	};*/

	var $Can  = new Array(
		0,0,0,0,0,0,1,1,
		0,0,0,0,1,1,1,1,
		0,0,1,1,1,1,1,1,
		1,1,1,1,1,1,1,1,
		1,1,1,1,1,1,0,0,
		1,1,1,1,0,0,0,0,
		1,1,0,0,0,0,0,0
    );

	//console.log($Can);

	var arCanStay = new Array(
			7,		15,		23,		31,
		6,		14,		22,		30,
			13,		21,		29,		37,
		12,		20,		28,		36,
			19,		27,		35,		43,
		18,		26,		34,		42,
			25,		33,		41,		49,
		24,		32,		40,		48
	),
		arCellsNums2 = new Array(
										7,		15,		23,		31,		39,		47,		55,
									6,		14,		22,		30,		38,		46,		54,
								5,		13,		21,		29,		37,		45,		53,
							4,		12,		20,		28,		36,		44,		52,
						3,		11,		19,		27,		35,		43,		51,
					2,		10,		18,		26,		34,		42,		50,
				1,		9,		17,		25,		33,		41,		49,
			0,		8,		16,		24,		32,		40,		48
		),
		arCellsNums = new Array();

	for(var i = 0; i < 56; i++)
		arCellsNums[i] = i;

	//console.log(arCellsNums);

	var $OwnToNum = new Array(255,255,255,255,255,255,0,1,255,255,255,255,2,3,4,5,
                   255,255,6,7,8,9,10,11,12,13,14,15,16,17,18,19,
                   20,21,22,23,24,25,255,255,26,27,28,29,255,255,255,255,
                   30,31,255,255,255,255,255,255);

	var $BWKB = new Array(255,255,255,255,255,255,0,1,255,255,255,255,1,2,3,4,255,255,
		      4,5,6,7,8,9,255,9,10,11,12,13,14,15,255,15,16,17,18,19,255,255,255,20,
		        21,22,255,255,255,255,255,23,255,255,255,255,255,255);
		// BoardWithoutKr -- доска без крайних (1ой и 8ой) горизонталей
		// BWKB отл. от BWK, что для восьмой горизонтали не выдает ошибку(255),
		// а выдает результат для ближайшей в большую сторону клетки

	var $BW1 = new Array(255,255,255,255,255,255,0,1,255,255,255,255,2,3,4,5,255,255,
		              6,7,8,9,10,11,255,12,13,14,15,16,17,18,
		              255,19,20,21,22,23,255,255,255,24,25,26,255,255,255,255,255,27,
		              255,255,255,255,255,255);

		// BoardWithout1st -- доска без 1ой горизонтали
	var $WK = new Array(6,12,13,14,18,19,20,21,22,25,26,27,28,29,30,33,34,35,36,37,41,42,43,49);
	var $W1 = new Array(6,7,12,13,14,15,18,19,20,21,22,23,25,26,27,28,29,30,31,33,34,35,36,37,41,42,43,49);
	var $NumToOwn = new Array(6,7,12,13,14,15,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,40,41,42,43,48,49);
	var $CanEat = new Array(0,1,1,1,1,0,0,0,0);

	function CalcC($n, $k) { // Вычисляем C_n^k

		if($k > 5) return 0;

		if($n < $k) return 0;

		$curr = 1;

		for(var $i = $n; $i > ($n-$k); $i--)
			$curr *= $i;

		//console.log($curr / $ftable[$k]);

		return $curr / $ftable[$k];
	}

	function CInit() {

		for(var $i = 0; $i < 6; $i++) {
			$C[$i] = new Array();
			for(var $j = 0; $j < 33; $j++) {
				$C[$i][$j] = CalcC($j, $i);
			}
		}

		//console.log($C);
	}

	function CompM($w0, $w01, $w1, $w11, $w2, $w21, $w3, $w31, $w4, $w41) { // 1, если 1>0, 0 в ост.
		if($w41 == $w4)
			if($w31 == $w3)
				if($w21 == $w2)
					if($w11 == $w1)
						if($w01 == $w0)
							return 0;
						else if($w01 > $w0) return 1; else return 0;
					else if($w11 > $w1) return 1; else return 0;
				else if($w21 > $w2) return 1; else return 0;
			else if($w31 > $w3) return 1; else return 0;
		else if($w41 > $w4) return 1; else return 0;
	};

	function GetM($w0, $w1, $w2, $w3, $w4) {

		var $a = -1,
			$b = $wcount,
			$curr; // Логарифмический поиск!

		while(($b-$a)>1) {
			$curr = ($a+$b)/2;
			if(CompM($ww[$curr][0], $w0, $ww[$curr][1], $w1, $ww[$curr][2], $w2, $ww[$curr][3], $w3, $ww[$curr][4], $w4))
				$a = $curr;
			else
				$b = $curr;
		}
		return $b;
	}

	function WInit() {

		$w = [0, 0, 0, 0, 0];

		$count = 0;
		$ww[$count] = new Array();

		for(var $i = 0; $i < 5; $i++)
			$ww[$count][$i] = $w[$i];

		$count++;

		while(1) {

			if(($w[0]+$w[1]+$w[2]+$w[3]+$w[4]<$f)&&($w[0]<4))
				$w[0]++;
			else if($w[1]+$w[2]+$w[3]+$w[4]<$f) {
				$w[0] = 0;
				$w[1]++;
			}
			else if($w[2]+$w[3]+$w[4]<$f) {
				$w[0] = $w[1] = 0;
				$w[2]++;
			}
			else if($w[3]+$w[4]<$f) {
				$w[0] = $w[1] = $w[2] = 0;
				$w[3]++;
			}
			else if($w[4]<$f) {
				$w[0] = $w[1] = $w[2] = $w[3] = 0;
				$w[4]++;
			}
			else
				break;

			$ww[$count] = new Array();

			for(var $i = 0; $i < 5; $i++)
				$ww[$count][$i] = $w[$i];

			$count++;

		}

		//console.log($ww);

	}

	function GetMaxNum($m) {

		$w1 = $ww[$m][0];
		$wsn1 = $ww[$m][1];
		$bsc = $ww[$m][2];
		$wdc = $ww[$m][3];
		$bdc = $ww[$m][4];
		$p = [];
		$n = [];                // определяет по позиции номер...
		$wsc = $wsn1 + $w1;
		$n[0] = $C[$w1][4];
		$n[1] = $C[$wsn1][24];
		$n[2] = $C[$bsc][28-$wsn1];
		$n[3] = $C[$wdc][32-$wsc-$bsc];
		$n[4] = $C[$bdc][32-$wsc-$bsc-$wdc];

		for(var $i = 0; $i < 5; $i++)
			$p[$i] = $n[$i]-1;

		$cur = $p[4];

		for(var $j = 3; $j >= 0; $j--)
			$cur = $cur * $n[$j] + $p[$j];

		//console.log($cur + 1);

		return $cur + 1;
	}

	function SMFInit() {

		$s = 0;

		for(var $m = 0; $m < $wcount; $m++) {
			$smf[$m] = $s;
			$s += GetMaxNum($m);
		}

		$WFSize = $s;

		//console.log($WFSize);

	}

	//Тут похоже идет чтение файла (ajax запрос на сторону PHP)
	/*function GetRang($m, $num){
		var $buf;
		lseek($wbfile, $smf[$m] + $num, SEEK_SET);
		read($wbfile, &buf, 1);
		return $buf;
	}*/

	function GetBoardRang($pos) {// достаточно предварительно заполнять

		var $num = MyTransf($pos),  // в pos только краткую информацию (анал. brboard)!
			$MR = 255;

		if($pos.move) {

			$GettingRang = 1;

			$MinRang = 255;

			GetPosChildren($pos);

			$GettingRang = 0;

			if($MinRang == 255)
				$MR = $MinRang;
			else
				$MR = $MinRang + 1;
		}
		else
			$MR = GetRang(GetM($pos.w1, $pos.wsc - $pos.w1, $pos.bsc, $pos.wdc, $pos.bdc), $num);

		return $MR;
	}

	function Initialize() {

		CInit();

		WInit();

		SMFInit();

		/*$FileName = Array();
		$suff1 = "-ти";
		$suff2 = "-х";
		$suff = Array();

		if($f > 4)
			$suff = $suff1;
		else
			$suff = $suff2;

		$FileName[0] = 'w';
		$FileName[1] = 'b';
		$FileName[2] = $f/* + 48*/;/*
		$FileName[3] = '.';
		$FileName[4] = 's';
		$FileName[5] = 'h';
		$FileName[6] = 'f';
		//$FileName[7] = 0;

		$wbfile = @fopen($FileName, "r");

		if(!$wbfile) {
			echo $f, $suff, " фигурная база данных по шашкам ", implode("", $FileName), " отсутствует в текущей директории.";
			$mytrue = 0;
			$contloop = 0;
		}*/

	}

	//Очистка клетки
	function ClearSq($x) {

		if($NotCleared) {
			$NotCleared = 0;
			ClearRSq();
		}

		console.log('Очистка клетки ' + $x);
		document.getElementById("cell-id-" + $x).innerHTML = '';

	}

	//Рисуем белую шашку
	function DrawWS($a) {

		ClearSq($a);

		console.log('Рисуем белую шашку на ' + $a);
		document.getElementById("cell-id-" + $a).innerHTML = '<span class="checkers__check checkers__check--white"></span>';

	}

	//Рисуем черную шашку
	function DrawBS($a) {

		ClearSq($a);

		console.log('Рисуем черную шашку на ' + $a);
		document.getElementById("cell-id-" + $a).innerHTML = '<span class="checkers__check checkers__check--black"></span>';

	}

	//Рисуем белую дамку
	function DrawWD($a) {

		ClearSq($a);

		console.log('Рисуем белую дамку на ' + $a);
		document.getElementById("cell-id-" + $a).innerHTML = '<span class="checkers__check checkers__check--white-queen"></span>';

	}

	//Рисуем чёрную дамку
	function DrawBD($a) {

		ClearSq($a);

		console.log('Рисуем чёрную дамку на ' + $a);
		document.getElementById("cell-id-" + $a).innerHTML = '<span class="checkers__check checkers__check--black-queen"></span>';

	}

	function DrawFig($a, $fig) {

		//console.log('Клетка - ' + $a + ', Фигура - ' + $fig);

		if($fig == 1)
			DrawWS($a);
		else if($fig == 2)
			DrawBS($a);
		else if($fig == 3)
			DrawWD($a);
		else if($fig == 4)
			DrawBD($a);
		else
			ClearSq($a);

	}

	var $figures = 0;

	function ClearRSq() {

		var $CS;

		for(var $i = 0; $i < 56; $i++) {

			for(var $j = 0; $j < 4; $j++)

				if($mypos.RSq[$i][$j] != 254) {
					$mypos.RSq[$i][$j] = 254;
					$CS = 1;
				}

			if($CS) {
				$CS = 0;
				ClearSq($i);
			}

		}

	}


	//fullboard mypos;
	//fullboard UpsDn;

	var fullboard = struct_fullboard("allc w1 wsc bsc wdc bdc ch cb RSq move"),
		$mypos = new fullboard();

	var FromWhere = 5,
		FSpot = 0;

	function main() {

		//$i, $j;
		//$a_x, $b_x, $c_x, $d_x;

		//$_fmode = "b";

		Initialize();

		if($contloop) {

			$mypos.cb = new Array();

			for(var $i = 0; $i < 56; $i++)
				$mypos.cb[$i] = 0;

			$mypos.RSq = new Array();
			for(var $i = 0; $i < 56; $i++) {
				$mypos.RSq[$i] = new Array();
				for(var $j = 0; $j < 4; $j++)
					$mypos.RSq[$i][$j] = 254;
			}

			$mypos.move = 1;

		}

		if(document.addEventListener) {

			//Отлавливаем клик
			document.addEventListener("click", function(event) {

				event.stopPropagation();

				var targetElement = event.target || event.srcElement;

				if(!targetElement.classList.contains('checkers__cell'))
					if(targetElement.parentElement.classList.contains('checkers__cell'))
						targetElement = targetElement.parentElement;

				//Клик по клетке доски
				if(targetElement.classList.contains('checkers__cell')) {

					//Если на клетку разрешено ставить
					if(targetElement.getAttribute('data-barash-id')) {

						var $x = targetElement.getAttribute('data-barash-id'),
							$NEq = 1;

						//Шашку можно ставить?
						if($Can[$x]) {

							/*if(b_x > 2)
								if($mypos.cb[$x] != 0) {
									$mypos.cb[$x] = 0;
									$figures--;
								}
								else ;
							else if($mypos.cb[$x] == 0)
								if($figures < $f) {
									$figures++;
									$mypos.cb[$x]++;
								}
								else $NEq = 0;
							else if($mypos.cb[$x] == 4) {
								$mypos.cb[$x] = 0;
								$figures--;
							}
							else
								$mypos.cb[$x]++;*/

							if($mypos.cb[$x] == 0)
								if($figures < $f) {
									$figures++;
									$mypos.cb[$x]++;
								}
								else $NEq = 0;
							else if($mypos.cb[$x] == 4) {
								$mypos.cb[$x] = 0;
								$figures--;
							}
							else
								$mypos.cb[$x]++;

							//Пропускаем черную пешку на линии внизу (т.е. выставляем след. тип шашки)
							if((!($x%8)) && ($mypos.cb[$x] == 2))
								$mypos.cb[$x]++;

							//Пропускаем белую пешку на линии вверху (т.е. выставляем след. тип шашки)
							if(($x%8==7) && ($mypos.cb[$x] == 1))
								$mypos.cb[$x]++;

							if($NEq)
								DrawFig($x, $mypos.cb[$x]);

						}

					}

				}

			});

		}


		/*while($contloop) {

			//Размещение шашек
			while($mytrue) {

				b_x = 0;

				while(b_x == 0) {
					_AX=3;
					geninterrupt(0x33);
					b_x=_BX;
					c_x=_CX;
					d_x=_DX;
				}

				if(b_x == 2)
					break;

				tb x = GetX(c_x, d_x);

				$NEq = 1;

				if($Can[x]) {
					if(b_x>2)if(mypos.cb[x]!=0) {
							mypos.cb[x]=0;
							figures--;
						}
						else;
					else if(mypos.cb[x]==0)if(figures<f) {
							figures++;
							mypos.cb[x]++;
						}
						else NEq=0;
					else if(mypos.cb[x]==4) {
						mypos.cb[x]=0;
						figures--;
					}
					else mypos.cb[x]++;
					if((!(x%8))&&(mypos.cb[x]==2))mypos.cb[x]++;
					if((x%8==7)&&(mypos.cb[x]==1))mypos.cb[x]++;
					_AX=2;
					geninterrupt(0x33);
					if(NEq)DrawFig(x,mypos.cb[x]);
					_AX=1;
					geninterrupt(0x33);
				}
				b_x=1;
				while(b_x!=0) {
					_AX=3;
					geninterrupt(0x33);
					b_x=_BX;
				}
			}
			GettingRSq=1;
			ExpectedRang=GetBoardRang(&mypos);
			if(ExpectedRang==255) {
				TurnUpsideDown(mypos,&UpsDn); //Transf(&UpsDn);
				ExpectedURang=GetBoardRang(&UpsDn);
			} else ExpectedURang=255;
			GetPosChildren(&mypos);
			PrintStatus();
			GettingRSq=0;
			mytrue=1;
			b_x=1;
			while(b_x!=0) {
				_AX=3;
				geninterrupt(0x33);
				b_x=_BX;
			}
			if(!contloop) closegraph();
			if(!contloop) cout<<"Программа просмотра четырехфигурной базы шашечных окончаний"<<
								  endl<<"Предварительная версия!"<<
								  endl<<"Разработчик этих программ --- Лев Бараш, E-mail: barash@mccme.ru"<<endl
								  <<"                          (c) Copyright    Lev Barash, 1997"<<endl;
		}*/

	}

	main();

})();