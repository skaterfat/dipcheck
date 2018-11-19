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

	<div class="container checkers">

		<?
			$arRows = Array(8, 7, 6, 5, 4, 3, 2, 1);
			$arCols = Array('a', 'b', 'c', 'd', 'e', 'f', 'g', 'h');

			foreach($arRows as $key => $row):?>


					<ul class="row mb-0 checkers__row-blocks <?=($row%2==0?'checkers__row-blocks--dark':'checkers__row-blocks--light')?>">

						<li class="checkers__rowname"><?=$row?></li>

						<?for($i = 0; $i < 8; $i++):?>
						<li class="checkers__block checkers__block--<?=$arCols[$i].$row?>"></li>
						<?endfor;?>

					</ul>


			<?endforeach;?>

		<div class="row">
			<div class="col-1 checkers__empty"></div>
			<div class="col-1 heckers__colname">a</div>
			<div class="col-1 heckers__colname">b</div>
			<div class="col-1 heckers__colname">c</div>
			<div class="col-1 heckers__colname">d</div>
			<div class="col-1 heckers__colname">e</div>
			<div class="col-1 heckers__colname">f</div>
			<div class="col-1 heckers__colname">g</div>
			<div class="col-1 heckers__colname">h</div>
		</div>

	</div>


</body>
</html>