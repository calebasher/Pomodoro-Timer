$(document).ready(function(){

	$('#all').fadeIn(4000);

	var sessionInterval = 60000;
	var breakInterval = 60000;
	var onSession = true;
	var myVar;
	var ticking = false;
	var savedCountdown = '<h3>1:00</h3>'
	var myTimer = function() {
		var whichInterval;
		if (onSession === true) {
			whichInterval = sessionInterval;
		}
		else if (onSession === false) {
			whichInterval = breakInterval;
		}		
				var current = new Date(); //creats a variable that constantly updates with current time.
				var startDateMilli = Date.parse(startDate);
				var currentMilli = Date.parse(current)
				var elapsed = currentMilli - startDateMilli;
				var stopTimeMilli = startDateMilli + whichInterval;
				var countDownMilli = stopTimeMilli - currentMilli;
				var countDownFormatted = new Date(countDownMilli);
				var countDownMinutes = countDownFormatted.getMinutes();
				var countDownSeconds = countDownFormatted.getSeconds();

				var total = stopTimeMilli - startDateMilli; // for css timer
				var remaining = total - elapsed; // for css timer
				var widthUnits = 300000/total; // for css timer
				console.log(total);

			$('#timeBar').css("width", "-="+widthUnits+"" ); //changes width of css timer

			countDownSeconds.toString().length < 2 ?
			$('#countDown').html('<h3>'+countDownMinutes+':0'+countDownSeconds+'</h3>')
			:
			$('#countDown').html('<h3>'+countDownMinutes+':'+countDownSeconds+'</h3>');

			if (countDownMilli < 1000 && onSession === true) {
				onSession = false;
				startDate = new Date();
				$.playSound("http://www.noiseaddicts.com/samples_1w72b820/3724");
				$('#currentMode').html('Break!');
				$('#timeBar').css("width", "300"); //resets css timer width
			}
			else if (countDownMilli < 1000 && onSession === false) {
				onSession = true;
				startDate = new Date();
				$.playSound("http://www.noiseaddicts.com/samples_1w72b820/3724");
				$('#currentMode').html('Session');
				$('#timeBar').css("width", "300"); //resets css timer width
			}
		}

		$('#start').click(function(){

			if (ticking === false) {
				startDate = new Date(); //sets start time as a constant. 
				myVar = setInterval(function(){ myTimer() }, 1000);
				$('#start').html('Stop');
				$('#timeBar').css("width", "300"); //resets css timer width
				ticking = true;
				beenReset = false;
			}
			else if (ticking === true) {
				clearInterval(myVar);
				$('#start').html('Start');
				ticking = false;
				$('#countDown').html(savedCountdown);
			}		
		});

		$('#plus').click(function(){
			sessionInterval += 60000;
			$('#sessionInterval').html('<h2>'+sessionInterval/60000+'</h2>');
			$('#countDown').html('<h3>'+sessionInterval/60000+':00</h3>');
			$('#timeBar').css("width", "300"); //resets css timer width
			savedCountdown = '<h3>'+sessionInterval/60000+':00</h3>';			
		});

		$('#minus').click(function(){
			if (sessionInterval > 60000) {
				sessionInterval -= 60000;
				$('#sessionInterval').html('<h2>'+sessionInterval/60000+'</h2>');
				$('#countDown').html('<h3>'+sessionInterval/60000+':00</h3>');
				$('#timeBar').css("width", "300"); //resets css timer width	
				savedCountdown = '<h3>'+sessionInterval/60000+':00</h3>';
			}		
		});	

		$('#breakPlus').click(function(){
			breakInterval += 60000;
			$('#breakInterval').html('<h2>'+breakInterval/60000+'</h2>');
			$('#timeBar').css("width", "300"); //resets css timer width	
			savedCountdown = '<h3>'+sessionInterval/60000+':00</h3>';		
		});

		$('#breakMinus').click(function(){
			if (breakInterval > 60000) {
				breakInterval -= 60000;
				$('#breakInterval').html('<h2>'+breakInterval/60000+'</h2>');
				$('#timeBar').css("width", "300"); //resets css timer width	
				savedCountdown = '<h3>'+sessionInterval/60000+':00</h3>';		
			}
		});
		
	});