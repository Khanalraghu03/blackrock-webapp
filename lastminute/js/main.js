var email_username = "vasb";
var email_domain = "vairfgzngrf.pbz";

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
	$('.slider').slider({interval: 4000});
	$('#skill-chips li').shuffle();
	$('.sidenav').sidenav({draggable: true});
	
	// Convert all rot13 nodes
	$.each($(".rot13"), function(i, el) {
		deRotNode(el);
	})

	// Site under construction message
	M.toast({html: "Site under construction", classes: "rounded"});
});