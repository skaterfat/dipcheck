<!DOCTYPE html>
<html lang="ru">
<head>
	<meta charset="UTF-8">
	<title>Dipcheck</title>
	<link href="css/all.min.css" rel="stylesheet">
	<link href="css/bootstrap.min.css" rel="stylesheet" media="all">
	<link href="css/styles.css" rel="stylesheet" media="all">
	<script src="js/jquery-3.3.1.min.js" defer></script>
	<script src="js/bootstrap.min.js" defer></script>
	<script src="js/scripts.js" defer></script>
</head>
<body>

	<main class="wrap">

		<header class="header">

			<a href="javascript:;" class="header__logo"></a>

		</header><!-- /header -->

		<div class="checkers">

			<div class="checkers-desk">

				<?
				$arRows = Array(8, 7, 6, 5, 4, 3, 2, 1);
				$arCols = Array('a', 'b', 'c', 'd', 'e', 'f', 'g', 'h');
				$arBarashCellIDs = Array(
					7, 15, 23, 31,
					6, 14, 22, 30,
					13, 21, 29, 37,
					12, 20, 28, 36,
					19, 27, 35, 43,
					18, 26, 34, 42,
					25, 33, 41, 49,
					24, 32, 40, 48
				);

				$nBarashID = -1;

				foreach($arRows as $key => $row):

					$bStartDarkCell = $row % 2 == 0 ? true : false;

				?>

					<ul class="checkers__row checkers__row--<?=$row?> <?=($bStartDarkCell?'checkers__row--start-light':'checkers__row--start-dark')?>">

						<li class="checkers__row-name"><?=$row?></li>

						<?for($i = 0; $i < 8; $i++):

							/* Расставление шашек

							if($row > 5 && (($row%2==0 && $i%2==0) || ($row%2!=0 && $i%2!=0)) )
								$sChecker = '<span class="checkers__check checkers__check--black"></span>';
							elseif($row < 4 && (($row%2==0 && $i%2==0) || ($row%2!=0 && $i%2!=0)))
								$sChecker = '<span class="checkers__check checkers__check--white"></span>';
							else
								$sChecker = '';

							*/

						if($bStartDarkCell)
							$bIsDarkCell = $bStartDarkCell && $i % 2 == 0 ? false : true;
						else
							$bIsDarkCell = $i % 2 == 0 ? true : false;

						if($bIsDarkCell)
							$nBarashID++;
						?>


						<li class="checkers__cell checkers__cell--<?=($bIsDarkCell?'dark':'light')?>"<?=($bIsDarkCell?' id="cell-id-'.$arBarashCellIDs[$nBarashID].'"':'')?><?/* id="<?=$arCols[$i].$row?>"*/?><?=($bIsDarkCell?' data-barash-id="'.$arBarashCellIDs[$nBarashID].'"':'')?>><?/*=$sChecker*/?></li>
						<?endfor;?>

					</ul>


				<?endforeach;?>

				<ul class="checkers__row">
					<li class="checkers__col-empty"></li>
					<?foreach($arCols as $col):?>
					<li class="checkers__col-name"><?=$col?></li>
					<?endforeach;?>
				</ul>

			</div>

			<div class="checkers__controls">

				<a href="javascript:;" class="btn btn--white" id="change-step-checker-color" data-text='<i class="fas fa-exchange-alt"></i> Ход чёрных'><i class="fas fa-exchange-alt"></i> Ход белых</a>

				<a href="javascript:;" class="btn btn--show-step"><i class="fas fa-dice"></i> Показать ходы</a>

				<a href="javascript:;" class="btn btn--go"><i class="fas fa-chess-board"></i> Сделать ход</a>

			</div>

		</div>

	</main>


</body>
</html>