var StarTweets = StarTweets || {};

StarTweets.verbose = false;

var $body, $character, $tweetBubble, $tweet;

$body = $("body");
$character = $("#chachi, #fonzie");
$tweetBubble = $("#tweet-bubble");
$tweet = $("#tweet");

StarTweets.init = function() {

	StarTweets.getTweet();
	StarTweets.layout();
	StarTweets.hideURLbar();
	StarTweets.updateTweet();

};

StarTweets.getTweet = function() {
	$.ajax({
		url: 'get_tweets.php',
		type: 'GET',
		success: function(response) {
			if (typeof response.errors === 'undefined' || response.errors.length < 1) {
				if(response[0].text !== StarTweets.rawTweet) {
					StarTweets.rawTweet = response[0].text;
					StarTweets.formatTweet();
				}
			} else {
				console.log('error: ' + errors);
			}
		},
		error: function(errors) {
			console.log('error: ' + errors);
		}
	});
};

StarTweets.formatTweet = function() {

	var emojiRegEx = /(?:0\u20E3|1\u20E3|2\u20E3|3\u20E3|4\u20E3|5\u20E3|6\u20E3|7\u20E3|8\u20E3|9\u20E3|#\u20E3|\*\u20E3|\uD83C(?:\uDDE6\uD83C(?:\uDDE8|\uDDE9|\uDDEA|\uDDEB|\uDDEC|\uDDEE|\uDDF1|\uDDF2|\uDDF4|\uDDF6|\uDDF7|\uDDF8|\uDDF9|\uDDFA|\uDDFC|\uDDFD|\uDDFF)|\uDDE7\uD83C(?:\uDDE6|\uDDE7|\uDDE9|\uDDEA|\uDDEB|\uDDEC|\uDDED|\uDDEE|\uDDEF|\uDDF1|\uDDF2|\uDDF3|\uDDF4|\uDDF6|\uDDF7|\uDDF8|\uDDF9|\uDDFB|\uDDFC|\uDDFE|\uDDFF)|\uDDE8\uD83C(?:\uDDE6|\uDDE8|\uDDE9|\uDDEB|\uDDEC|\uDDED|\uDDEE|\uDDF0|\uDDF1|\uDDF2|\uDDF3|\uDDF4|\uDDF5|\uDDF7|\uDDFA|\uDDFB|\uDDFC|\uDDFD|\uDDFE|\uDDFF)|\uDDE9\uD83C(?:\uDDEA|\uDDEC|\uDDEF|\uDDF0|\uDDF2|\uDDF4|\uDDFF)|\uDDEA\uD83C(?:\uDDE6|\uDDE8|\uDDEA|\uDDEC|\uDDED|\uDDF7|\uDDF8|\uDDF9|\uDDFA)|\uDDEB\uD83C(?:\uDDEE|\uDDEF|\uDDF0|\uDDF2|\uDDF4|\uDDF7)|\uDDEC\uD83C(?:\uDDE6|\uDDE7|\uDDE9|\uDDEA|\uDDEB|\uDDEC|\uDDED|\uDDEE|\uDDF1|\uDDF2|\uDDF3|\uDDF5|\uDDF6|\uDDF7|\uDDF8|\uDDF9|\uDDFA|\uDDFC|\uDDFE)|\uDDED\uD83C(?:\uDDF0|\uDDF2|\uDDF3|\uDDF7|\uDDF9|\uDDFA)|\uDDEE\uD83C(?:\uDDE8|\uDDE9|\uDDEA|\uDDF1|\uDDF2|\uDDF3|\uDDF4|\uDDF6|\uDDF7|\uDDF8|\uDDF9)|\uDDEF\uD83C(?:\uDDEA|\uDDF2|\uDDF4|\uDDF5)|\uDDF0\uD83C(?:\uDDEA|\uDDEC|\uDDED|\uDDEE|\uDDF2|\uDDF3|\uDDF5|\uDDF7|\uDDFC|\uDDFE|\uDDFF)|\uDDF1\uD83C(?:\uDDE6|\uDDE7|\uDDE8|\uDDEE|\uDDF0|\uDDF7|\uDDF8|\uDDF9|\uDDFA|\uDDFB|\uDDFE)|\uDDF2\uD83C(?:\uDDE6|\uDDE8|\uDDE9|\uDDEA|\uDDEB|\uDDEC|\uDDED|\uDDF0|\uDDF1|\uDDF2|\uDDF3|\uDDF4|\uDDF5|\uDDF6|\uDDF7|\uDDF8|\uDDF9|\uDDFA|\uDDFB|\uDDFC|\uDDFD|\uDDFE|\uDDFF)|\uDDF3\uD83C(?:\uDDE6|\uDDE8|\uDDEA|\uDDEB|\uDDEC|\uDDEE|\uDDF1|\uDDF4|\uDDF5|\uDDF7|\uDDFA|\uDDFF)|\uDDF4\uD83C\uDDF2|\uDDF5\uD83C(?:\uDDE6|\uDDEA|\uDDEB|\uDDEC|\uDDED|\uDDF0|\uDDF1|\uDDF2|\uDDF3|\uDDF7|\uDDF8|\uDDF9|\uDDFC|\uDDFE)|\uDDF6\uD83C\uDDE6|\uDDF7\uD83C(?:\uDDEA|\uDDF4|\uDDF8|\uDDFA|\uDDFC)|\uDDF8\uD83C(?:\uDDE6|\uDDE7|\uDDE8|\uDDE9|\uDDEA|\uDDEC|\uDDED|\uDDEE|\uDDEF|\uDDF0|\uDDF1|\uDDF2|\uDDF3|\uDDF4|\uDDF7|\uDDF8|\uDDF9|\uDDFB|\uDDFD|\uDDFE|\uDDFF)|\uDDF9\uD83C(?:\uDDE6|\uDDE8|\uDDE9|\uDDEB|\uDDEC|\uDDED|\uDDEF|\uDDF0|\uDDF1|\uDDF2|\uDDF3|\uDDF4|\uDDF7|\uDDF9|\uDDFB|\uDDFC|\uDDFF)|\uDDFA\uD83C(?:\uDDE6|\uDDEC|\uDDF2|\uDDF8|\uDDFE|\uDDFF)|\uDDFB\uD83C(?:\uDDE6|\uDDE8|\uDDEA|\uDDEC|\uDDEE|\uDDF3|\uDDFA)|\uDDFC\uD83C(?:\uDDEB|\uDDF8)|\uDDFD\uD83C\uDDF0|\uDDFE\uD83C(?:\uDDEA|\uDDF9)|\uDDFF\uD83C(?:\uDDE6|\uDDF2|\uDDFC)))|[\xA9\xAE\u203C\u2049\u2122\u2139\u2194-\u2199\u21A9\u21AA\u231A\u231B\u2328\u23CF\u23E9-\u23F3\u23F8-\u23FA\u24C2\u25AA\u25AB\u25B6\u25C0\u25FB-\u25FE\u2600-\u2604\u260E\u2611\u2614\u2615\u2618\u261D\u2620\u2622\u2623\u2626\u262A\u262E\u262F\u2638-\u263A\u2648-\u2653\u2660\u2663\u2665\u2666\u2668\u267B\u267F\u2692-\u2694\u2696\u2697\u2699\u269B\u269C\u26A0\u26A1\u26AA\u26AB\u26B0\u26B1\u26BD\u26BE\u26C4\u26C5\u26C8\u26CE\u26CF\u26D1\u26D3\u26D4\u26E9\u26EA\u26F0-\u26F5\u26F7-\u26FA\u26FD\u2702\u2705\u2708-\u270D\u270F\u2712\u2714\u2716\u271D\u2721\u2728\u2733\u2734\u2744\u2747\u274C\u274E\u2753-\u2755\u2757\u2763\u2764\u2795-\u2797\u27A1\u27B0\u27BF\u2934\u2935\u2B05-\u2B07\u2B1B\u2B1C\u2B50\u2B55\u3030\u303D\u3297\u3299]|\uD83C[\uDC04\uDCCF\uDD70\uDD71\uDD7E\uDD7F\uDD8E\uDD91-\uDD9A\uDE01\uDE02\uDE1A\uDE2F\uDE32-\uDE3A\uDE50\uDE51\uDF00-\uDF21\uDF24-\uDF93\uDF96\uDF97\uDF99-\uDF9B\uDF9E-\uDFF0\uDFF3-\uDFF5\uDFF7-\uDFFF]|\uD83D[\uDC00-\uDCFD\uDCFF-\uDD3D\uDD49-\uDD4E\uDD50-\uDD67\uDD6F\uDD70\uDD73-\uDD79\uDD87\uDD8A-\uDD8D\uDD90\uDD95\uDD96\uDDA5\uDDA8\uDDB1\uDDB2\uDDBC\uDDC2-\uDDC4\uDDD1-\uDDD3\uDDDC-\uDDDE\uDDE1\uDDE3\uDDEF\uDDF3\uDDFA-\uDE4F\uDE80-\uDEC5\uDECB-\uDED0\uDEE0-\uDEE5\uDEE9\uDEEB\uDEEC\uDEF0\uDEF3]|\uD83E[\uDD10-\uDD18\uDD80-\uDD84\uDDC0]/g;

	function styleEmoji(str) {
		function wrapEmoji(match) {
			return '<i>' + match + '</i>';
		}
		return str.replace(emojiRegEx, wrapEmoji);
	}

	StarTweets.tweetContent = StarTweets.rawTweet;
	StarTweets.splitTweet = StarTweets.tweetContent.split(" ");

	if (StarTweets.tweetContent.includes("http") || StarTweets.tweetContent.includes("#") || StarTweets.tweetContent.includes("@") || StarTweets.tweetContent.includes("RT")) {

		if (!StarTweets.verbose) {

			// remove re-tweet attribution
			if(StarTweets.tweetContent.indexOf('RT ') === 0) {
				StarTweets.tweetContent = StarTweets.tweetContent.substring(3);
				StarTweets.tweetContent = StarTweets.tweetContent.substring(StarTweets.tweetContent.indexOf(" ")+1);
			}

			// remove embedded links
			for (i=0; i < StarTweets.splitTweet.length; i++) {
				var thisWord = StarTweets.splitTweet[i];
				if (thisWord.startsWith('http')) {
					StarTweets.tweetContent = StarTweets.tweetContent.replace(thisWord, '');
				}
			}
		}

		// add <a>'s to embedded links, usernames and hash tags
		for (i=0; i < StarTweets.splitTweet.length; i++) {
			var thisWord = StarTweets.splitTweet[i];
			if (thisWord.startsWith('http')) {
				var linkedURL = '<a href="' + thisWord + '" target="_blank">' + thisWord + '</a>';
				StarTweets.tweetContent = StarTweets.tweetContent.replace(thisWord, linkedURL);
			} else if (thisWord.startsWith('#')) {
				var linkedHashTag = '<a href="https://twitter.com/search?q=%23' + thisWord.substr(1) + '&src=hash" target="_blank">' + thisWord + '</a>';
				StarTweets.tweetContent = StarTweets.tweetContent.replace(thisWord, linkedHashTag);
			} else if (thisWord.startsWith('@')) {
				var linkedUserName = '<a href="https://twitter.com/' + thisWord.substr(1) + '" target="_blank">' + thisWord + '</a>';
				StarTweets.tweetContent = StarTweets.tweetContent.replace(thisWord, linkedUserName);
			}
		}

	}

	if (emojiRegEx.test(StarTweets.tweetContent)) {
		StarTweets.tweetContent = styleEmoji(StarTweets.tweetContent);
	}

	$tweet.html("<span>" + StarTweets.tweetContent + "</span>");

	StarTweets.setFontSize();
};

StarTweets.updateTweet = function() {
	window.setTimeout(function() {
		StarTweets.getTweet();
		StarTweets.updateTweet();
	}, 60000);
};

StarTweets.layout = function() {

	var bodyHeight, bodyWidth, bodyAspectRatio;
	bodyHeight = $body.height();
	bodyWidth = $body.width();
	bodyAspectRatio = bodyHeight / bodyWidth;

	if (bodyAspectRatio > 1) {
		$body.addClass('portrait');
		$body.removeClass('landscape');
	} else {
		$body.addClass('landscape');
		$body.removeClass('portrait');
	}

	if (bodyAspectRatio < .625) {
		if (bodyHeight > 200) {
			var chachiHeight = bodyHeight * .95;
			$character.height(chachiHeight);
			$character.width(chachiHeight * 1.6);
		} else {
			$character.height(200);
			$character.width(320);
		}
	} else {
		$character.removeAttr('style');
	}


};

StarTweets.setFontSize = function() {
	$tweet.removeClass('font-sized');
	$tweet.textfill({
		maxFontPixels: 150,
		complete: function(){
				$tweet.addClass('font-sized');
			}
	});
};

StarTweets.hideURLbar = function() {
	setTimeout(function () {
		window.scrollTo(0, 1);
	}, 1000);
};

$(document).ready(function() {

	StarTweets.init();
	
	$(window).resize(function() {
		StarTweets.layout();
		StarTweets.setFontSize();
	});
		
});