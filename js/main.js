$(function(){
	var valRead = $("#valRead");
	var readDevice = function(){
		setInterval(function () {
      		readValue();
    	}, 1000);
	}

	var readValue = function(){
		$.ajax({
		   url: 'https://api.particle.io/v1/devices/340029001647343337363432/analogvalue?access_token=347a6114f2fdb0e57f753a7eba15599be720457a',
		   method: 'GET',
		   dataType: 'json',
		   complete: function(result){
		   		var resp = $.parseJSON(result.responseText);
		   		valRead.text(resp.result);
		   }
		});
	}

	var setLED = function(toggle){
		$.ajax({
		   url: 'https://api.particle.io/v1/devices/340029001647343337363432/led?access_token=347a6114f2fdb0e57f753a7eba15599be720457a',
		   method: 'POST',
		   data: {  args: toggle },
		   complete: function(result){
		   		$rv = $(result);
		   		console.log('result:', $.parseJSON($rv[0].responseText).return_value);
		   }
		});
	}

	var setPWD = function(v){
		$.ajax({
		   url: 'https://api.particle.io/v1/devices/340029001647343337363432/pwmled?access_token=347a6114f2fdb0e57f753a7eba15599be720457a',
		   method: 'POST',
		   data: {  args: v },
		   complete: function(result){
		   		$rv = $(result);
		   		console.log('result:', $.parseJSON($rv[0].responseText).return_value);
		   }
		});
	}

	var setSlider = function(){
		$( "#slider" ).slider({
			max: 30,
			min: 0,
			change: function(evt, ui){
				console.log('slide: ', ui.value);
				setPWD(ui.value);
			}
		});
	}

	$('#setButton').on('click', function(){
		$this = $(this);
		if ($this.text() == "on"){
			$this.text("off");
		}else{
			$this.text("on");
		}
		setLED($this.text());
	})
	//readDevice();
	setSlider();
});
