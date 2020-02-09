$(document).ready(function() {
	$(document).on("click", "a.remove-btn", function() {
		let ticker = $(this).data("ticker");
		if (portfolio.has(ticker)) {
			portfolio.delete(ticker);
			card = $(this).parent().parent().parent();
			$(card).fadeOut(function() {
				$(card).remove();
			});
			M.toast({html: "Removed " + ticker + " to your portfolio!", classes: "rounded"});
		} else {
			M.toast({html: ticker + " is not in your portfolio!", classes: "rounded"});
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
		$.each(Array.from(portfolio), function(i, el) {
			console.log("building el", el);
			if (i % 3 == 0) {
				$row = $('<div class="row">');
				$rows.push($row);
			}
			card = buildTickerCard(el, true);
			$row.append(card);
			console.log("appended", card, "to", $row);
		});
		console.log("rows", $rows);
		$("#stocks-container").append($rows);
	});
});