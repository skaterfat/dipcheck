jQuery(document).ready(function($) {

	var aDeskCols = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'],
		aDeskRows = [8, 7, 6, 5, 4, 3, 2, 1],
		oCheckDesk = {},
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
				isBusy: false,
				checker: false
			}

		}

	}

	//console.log(oCheckDesk);

	//Клик по клетке
	$('.checkers__cell').on('click', function(event) {
		event.preventDefault();

		setCheckerOnCell($(this).attr('id'));

	});

	//Функция установки шашки на клетку
	function setCheckerOnCell(CELL_ID) {

		//Переменная текущей клетки
		var oCurCell = oCheckDesk[CELL_ID];

		if(oCurCell.isBusy === false && nCountCheckersOnDesk() > 8) {
			alert('Установка более 9 шашек на доске невозможна!');
			return false;
		}

		//Если клетка не чёрная
		if(oCurCell.dark !== true) {
			alert('На белые клетки установка шашки невозможна!');
			return false;
		}

		//Если клетка не занята
		if(oCurCell.isBusy === false) {

			oCurCell.isBusy = true;
			oCurCell.checker = 0;
			$('[id="'+CELL_ID+'"]').html(aCheckersHtmlCodes[0]);

		}
		else {

			oCurCell.checker++;

			if(oCurCell.checker > 3) {
				oCurCell.isBusy = false;
				oCurCell.checker = false;
				$('[id="'+CELL_ID+'"]').html("");
			}
			else {
				$('[id="'+CELL_ID+'"]').html(aCheckersHtmlCodes[oCurCell.checker]);
			}

		}

	}

	//Функция подсчёта шашек на доске
	function nCountCheckersOnDesk() {

		nCountResult = 0;

		for (key in oCheckDesk)
			if(oCheckDesk[key].isBusy === true)
				nCountResult++;

		return nCountResult;

	}

});