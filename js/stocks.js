$(document).ready(function() {
	$(document).on("click", "a.add-btn", function() {
		let ticker = $(this).data("ticker");
		if (!portfolio.has(ticker)) {
			portfolio.add(ticker);
			M.toast({html: "Added " + ticker + " to your portfolio!", classes: "rounded"});
		} else {
			M.toast({html: ticker + " is already in your portfolio!", classes: "rounded"});
		}
	});

	$(document).on("click", "a.modal-trigger", function() {
		let ticker = $(this).data("ticker");
		$("#about-modal h5").text(ticker);
	});

	// Add stock info
	loadStockData(function() {
		var $rows = Array();
		var $row;
		$.each(stocks, function(i, el) {
			if (i % 3 == 0) {
				$row = $('<div class="row">');
				$rows.push($row);
			}
			card = buildTickerCard(el.ticker);
			$row.append(card);
			console.log("appended", card, "to", $row);
		});
		console.log("rows", $rows);
		$("#stocks-container").append($rows);
	});
});