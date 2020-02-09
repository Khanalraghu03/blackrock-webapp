var email_username = "vasb";
var email_domain = "vairfgzngrf.pbz";
var portfolio = Array();

var stocks = [
	{
		"ticker": "GOOG",
		"price": "1,479",
		"daily": "+3.0"
	},
	{
		"ticker": "APPL",
		"price": "320",
		"daily": "-4.4"
	},
	{
		"ticker": "BLK",
		"price": "555.7",
		"daily": "+1.1"
	},
	{
		"ticker": "AMZN",
		"price": "2,079",
		"daily": "29.1"
	},
	{
		"ticker": "NFLX",
		"price": "366",
		"daily": "-0.2"
	}
]

function rot13(str) {
	var input     = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
	var output    = 'NOPQRSTUVWXYZABCDEFGHIJKLMnopqrstuvwxyzabcdefghijklm';
	var index     = x => input.indexOf(x);
	var translate = x => index(x) > -1 ? output[index(x)] : x;
	return str.split('').map(translate).join('');
}

function deRotNode(node) {
	data = $(node).data();
	$.each(data, function(key, value) {
		value = rot13(value);
		if (key === "inner") {
			$(node).html(value);
		} else {
			$(node).attr(key, value);
		}
	});
}

function loadPortfolio() {
	var tempPortfolio;
	if (localStorage.tickers === undefined) {
		tempPortfolio = Array();
	}
	try {
		tempPortfolio = JSON.parse(localStorage.getItem("portfolio"));
	} catch(err) {
		tempPortfolio = Array();
	}
	if (!Array.isArray(tempPortfolio)) {
		tempPortfolio = Array();
	}
	portfolio = new Set(tempPortfolio);
	return portfolio;
}

function savePortfolio() {
	localStorage.portfolio = JSON.stringify(Array.from(portfolio));
}

function getStockData(ticker) {
	var data;
	$.each(stocks, function(i, el) {
		if (el.ticker == ticker) {
			data = el;
			return false;
		}
	});
	return data;
}

function buildTickerCard(ticker, remove) {
	var data = getStockData(ticker);
	if (data !== undefined) {
		var containerDiv = $('<div class="card-container col s1 m4">');
		var cardDiv = $('<div class="card color-primary-dark">');
		var contentDiv = $('<div class="card-content">');
		var titleSpan = $('<span class="card-title">');
		var priceP = $('<p>');
		var graphImg = $('<img class="stock-graph-mini" src="img/graph-mini.png">');
		var cardActionDiv = $('<div class="card-action">');
		var modalA = $('<a href="#about-modal" class="waves-effect waves-light btn modal-trigger">');
		var addA;
		if (Boolean(remove)) {
			addA = $('<a class="waves-effect waves-light btn remove-btn">');
			$(addA).text("remove");
		} else {
			addA = $('<a class="waves-effect waves-light btn add-btn">');
			$(addA).text("add");
		}

		// Add info to elements
		$(titleSpan).text(data.ticker);
		$(priceP).html("$" + data.price + "&nbsp;&nbsp;" + data.daily + "%");
		$(contentDiv).append(titleSpan);
		$(contentDiv).append(priceP);
		$(contentDiv).append(graphImg);
		$(modalA).text("about");
		$(modalA).data("ticker", data.ticker);
		$(addA).data("ticker", data.ticker);

		// Put elements together
		$(cardActionDiv).append(modalA);
		$(cardActionDiv).append(addA);
		$(contentDiv).append(titleSpan);
		$(contentDiv).append(priceP);
		$(contentDiv).append(graphImg);
		$(cardDiv).append(contentDiv);
		$(cardDiv).append(cardActionDiv);
		$(containerDiv).append(cardDiv);

		return containerDiv;
	}
}

(function($){
    $.fn.shuffle = function() {
 
        var allElems = this.get(),
            getRandom = function(max) {
                return Math.floor(Math.random() * max);
            },
            shuffled = $.map(allElems, function(){
                var random = getRandom(allElems.length),
                    randEl = $(allElems[random]).clone(true)[0];
                allElems.splice(random, 1);
                return randEl;
           });
 
        this.each(function(i){
            $(this).replaceWith($(shuffled[i]));
        });

        return $(shuffled);
    };
 
})(jQuery);

$(document).ready(function() {
	// Load portfolio
	loadPortfolio();
	
	//$('#skill-chips li').shuffle();
	$('.sidenav').sidenav({draggable: true});
	
	// Convert all rot13 nodes
	$.each($(".rot13"), function(i, el) {
		deRotNode(el);
	})

	// Initialize all modals
	$(".modal").modal();

	// Site under construction message
	M.toast({html: "Site under construction", classes: "rounded"});
});

window.onbeforeunload = savePortfolio;