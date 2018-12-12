jQuery(document).ready(function($) {

	var aDeskCols = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'],
		aDeskRows = [8, 7, 6, 5, 4, 3, 2, 1],
		oCheckDesk = {},
		aCellsOnlyBlackQueen = ['b1', 'd1', 'f1', 'h1'],
		aCellsOnlyWhiteQueen = ['a8', 'c8', 'e8', 'g8'],
		aCheckersHtmlCodes = [
			'<span class="checkers__check checkers__check--white"></span>', //Белая
			'<span class="checkers__check checkers__check--white-queen"></span>', // Белая дамка
			'<span class="checkers__check checkers__check--black"></span>', //Черная
			'<span class="checkers__check checkers__check--black-queen"></span>', // Черная дамка
		];

	//Генерация доски и информации о всех клетках
	for(i in aDeskCols) {

		for(j in aDeskRows) {

			bIsDarkCell = (aDeskRows[j] % 2 == 0 && i % 2 == 0) || (aDeskRows[j] % 2 != 0 && i % 2 != 0)  ? true : false;

			oCheckDesk[aDeskCols[i].concat(aDeskRows[j])] = {
				id: aDeskCols[i].concat(aDeskRows[j]),
				dark: bIsDarkCell,
				busy: false,
				checker: false
			}

		}

	}

	console.log(oCheckDesk);

	//Клик по клетке
	$('.checkers__cell').on('click', function(event) {
		event.preventDefault();

		setCheckerOnCell($(this).attr('id'));

	});

	//Функция установки шашки на клетку
	function setCheckerOnCell(CELL_ID) {

		//Переменная текущей клетки
		var oCurCell = oCheckDesk[CELL_ID];

		if(oCurCell.busy === false && nCountCheckersOnDesk() > 8) {
			alert('Установка более 9 шашек на доске невозможна!');
			return false;
		}

		//Если клетка не чёрная
		if(oCurCell.dark !== true) {
			alert('На белые клетки установка шашки невозможна!');
			return false;
		}

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