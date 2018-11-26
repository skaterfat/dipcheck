<!DOCTYPE html>
<html lang="ru">
<head>
	<meta charset="UTF-8">
	<title>Dipcheck</title>
	<link href="css/bootstrap.min.css" rel="stylesheet" media="all">
	<link href="css/styles.css" rel="stylesheet" media="all">
	<script src="js/jquery-3.3.1.min.js" defer></script>
	<script src="js/bootstrap.min.js" defer></script>
	<script src="js/scripts.js" defer></script>
</head>
<body>

	<main class="wrap">

		<div class="checkers">

			<div class="checkers-desk">

				<?
				$arRows = Array(8, 7, 6, 5, 4, 3, 2, 1);
				$arCols = Array('a', 'b', 'c', 'd', 'e', 'f', 'g', 'h');

				foreach($arRows as $key => $row):

				?>

					<ul class="checkers__row checkers__row--<?=$row?> <?=($row%2==0?'checkers__row--start-dark':'checkers__row--start-light')?>">

						<li class="checkers__row-name"><?=$row?></li>

						<?for($i = 0; $i < 8; $i++):

							if($row > 5 && (($row%2==0 && $i%2==0) || ($row%2!=0 && $i%2!=0)) )
								$sChecker = '<span class="checkers__check checkers__check--black"></span>';
							elseif($row < 4 && (($row%2==0 && $i%2==0) || ($row%2!=0 && $i%2!=0)))
								$sChecker = '<span class="checkers__check checkers__check--white"></span>';
							else
									$sChecker = '';
						?>
						<li class="checkers__cell checkers__cell--<?=($row%2==0&&$i%2==0?'dark':'light')?>" id="<?=$arCols[$i].$row?>"><?=$sChecker?></li>
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

		</div>

	</main>


</body>
</html>