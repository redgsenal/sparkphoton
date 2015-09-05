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
		console.log('toggle: ', toggle);
		$.ajax({
		   url: 'https://api.particle.io/v1/devices/340029001647343337363432/led?access_token=347a6114f2fdb0e57f753a7eba15599be720457a',
		   method: 'POST',
		   data: {  args: toggle },
		   complete: function(result){
		   		console.log('result:', result);
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
	readDevice();
});
