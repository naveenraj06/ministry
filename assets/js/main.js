$(function(){
    $(window).on('scroll', function(){
        headerAnimate();
    });  
    headerAnimate();  
    function headerAnimate() {
        var _top = $(window).scrollTop() + 58,
        _vh = window.innerHeight;
        if(_top >= _vh){
            $('header').addClass('active');
        } else if (window.innerWidth <= 768) {
            $('header').addClass('active');
        }else {
            $('header').removeClass('active');
        }
    }    
    $('.menu-list a').on('click', function(e){
        e.preventDefault();
        _this = $(this);
        _target = _this.attr('href');
        _top = $(_target).offset().top;
        $('html,body').animate({
            scrollTop: _top - 40
        },1500);
        if (window.innerWidth <= 768) {
            $('.menu-list_wrapper').toggleClass('active').fadeToggle('slow');
        }        
    });    
    $('.hamburger').on('click', function(){
        $('.menu-list_wrapper').toggleClass('active').fadeToggle('slow');
    });
    /*$('#contact-form').on('submit', function(e){

		$.ajax({
				url: 'thanks.php',
				method     : 'POST',
				dataType   : 'json',
				data       : $('#contact-form').serialize(),
				beforeSend: function() {
					//loading();
				},
				success: function(response){ 
					 
					
					if(response.rslt == 1){
						//swal("Success!","Your enquiry send successfully", "success");
						$('#error').text('Your request has been submitted successfully!')
 
						setTimeout(function(){location.reload();}, 3000);						
						//$(jvalidate)[0].reset();
						//location.reload();
						//alert("http://www.athreyablouses.com/thanks");
						//window.location.href = "http://www.athreyablouses.com/contact_us";
					}
					else{
						alert("Failure!");
					}		
					//unloading(); 
					
				}
			});		

    });     */
      let testForm = document.querySelector("#contact_us form");
      
      testForm.addEventListener('submit', e => {
        e.preventDefault();
        var _this = $(this),error;
        _this.find('input').each(function(){
        var _val = $(this).val();
        
            if(_val=="" || _val==undefined ){
                $('#error').show();
				error = true;
                return false;
            }else {
				error = false;
                $('#error').hide();				
            }
        });
		if(!error) {
			const formData = new FormData(testForm);
			fetch(testForm.getAttribute('action'), {
			method: 'POST',
			headers: {
				'Accept': 'application/x-www-form-urlencoded;charset=UTF-8',
				'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
			},
			body: new URLSearchParams(formData).toString()
			})
			.then(res => {
			if (res) {
				alert('தொடர்பு கொண்டமைக்கு நன்றி!')
				window.location.reload()
			}
			});			
		}
      });	
    $('#contact-form input').on('blur', function(e){
            var _val = $(this).val();
            if(_val==""){
                $('#error').show();
                return false;
            } else {
                $('#error').hide();
            }
    });   
});

$(function()
{
	$('#app-cover').hide();
    var playerTrack = $("#player-track"), bgArtwork = $('#bg-artwork'), bgArtworkUrl, albumName = $('#album-name'), trackName = $('#track-name'), albumArt = $('#album-art'), sArea = $('#s-area'), seekBar = $('#seek-bar'), trackTime = $('#track-time'), insTime = $('#ins-time'), sHover = $('#s-hover'), playPauseButton = $("#play-pause-button"),  i = playPauseButton.find('i'), tProgress = $('#current-time'), tTime = $('#track-length'), seekT, seekLoc, seekBarPos, cM, ctMinutes, ctSeconds, curMinutes, curSeconds, durMinutes, durSeconds, playProgress, bTime, nTime = 0, buffInterval = null, tFlag = false, albums = ['Audios'], trackNames = ['Audio'], albumArtworks = ['_1','_2','_3','_4','_5'], trackUrl = [], playPreviousTrackButton = $('#play-previous'), playNextTrackButton = $('#play-next'), currIndex = -1;

	$('.fancy-audio').each(function(i,ele){
		trackUrl.push($(this).data('src'));
		$(this).attr('data-trackID',i+1);
	});
	
	$('.audio-close').on('click',function(e){
		e.preventDefault();
		$('#app-cover').hide();
	})
	
	$('.fancy-audio').on('click',function(e){
		e.preventDefault();
		$('#app-cover').show();
		trackUrl.push($(this).data('src'));
		playPause();
		var trackID = $(this).data('trackId');
		selectTrack(trackID);
		currIndex = trackID+1;
	})
	
	
    function playPause()
    {
        setTimeout(function()
        {
            if(audio.paused)
            {
                playerTrack.addClass('active');
                albumArt.addClass('active');
                checkBuffering();
                i.attr('class','fas fa-pause');
                audio.play();
            }
            else
            {
                playerTrack.removeClass('active');
                albumArt.removeClass('active');
                clearInterval(buffInterval);
                albumArt.removeClass('buffering');
                i.attr('class','fas fa-play');
                audio.pause();
            }
        },300);
    }

    	
	function showHover(event)
	{
		seekBarPos = sArea.offset(); 
		seekT = event.clientX - seekBarPos.left;
		seekLoc = audio.duration * (seekT / sArea.outerWidth());
		
		sHover.width(seekT);
		
		cM = seekLoc / 60;
		
		ctMinutes = Math.floor(cM);
		ctSeconds = Math.floor(seekLoc - ctMinutes * 60);
		
		if( (ctMinutes < 0) || (ctSeconds < 0) )
			return;
		
        if( (ctMinutes < 0) || (ctSeconds < 0) )
			return;
		
		if(ctMinutes < 10)
			ctMinutes = '0'+ctMinutes;
		if(ctSeconds < 10)
			ctSeconds = '0'+ctSeconds;
        
        if( isNaN(ctMinutes) || isNaN(ctSeconds) )
            insTime.text('--:--');
        else
		    insTime.text(ctMinutes+':'+ctSeconds);
            
		insTime.css({'left':seekT,'margin-left':'-21px'}).fadeIn(0);
		
	}

    function hideHover()
	{
        sHover.width(0);
        insTime.text('00:00').css({'left':'0px','margin-left':'0px'}).fadeOut(0);		
    }
    
    function playFromClickedPos()
    {
        audio.currentTime = seekLoc;
		seekBar.width(seekT);
		hideHover();
    }

    function updateCurrTime()
	{
        nTime = new Date();
        nTime = nTime.getTime();

        if( !tFlag )
        {
            tFlag = true;
            trackTime.addClass('active');
        }

		curMinutes = Math.floor(audio.currentTime / 60);
		curSeconds = Math.floor(audio.currentTime - curMinutes * 60);
		
		durMinutes = Math.floor(audio.duration / 60);
		durSeconds = Math.floor(audio.duration - durMinutes * 60);
		
		playProgress = (audio.currentTime / audio.duration) * 100;
		
		if(curMinutes < 10)
			curMinutes = '0'+curMinutes;
		if(curSeconds < 10)
			curSeconds = '0'+curSeconds;
		
		if(durMinutes < 10)
			durMinutes = '0'+durMinutes;
		if(durSeconds < 10)
			durSeconds = '0'+durSeconds;
        
        if( isNaN(curMinutes) || isNaN(curSeconds) )
            tProgress.text('00:00');
        else
		    tProgress.text(curMinutes+':'+curSeconds);
        
        if( isNaN(durMinutes) || isNaN(durSeconds) )
            tTime.text('00:00');
        else
		    tTime.text(durMinutes+':'+durSeconds);
        
        if( isNaN(curMinutes) || isNaN(curSeconds) || isNaN(durMinutes) || isNaN(durSeconds) )
            trackTime.removeClass('active');
        else
            trackTime.addClass('active');

        
		seekBar.width(playProgress+'%');
		
		if( playProgress == 100 )
		{
			i.attr('class','fa fa-play');
			seekBar.width(0);
            tProgress.text('00:00');
            albumArt.removeClass('buffering').removeClass('active');
            clearInterval(buffInterval);
		}
    }
    
    function checkBuffering()
    {
        clearInterval(buffInterval);
        buffInterval = setInterval(function()
        { 
            if( (nTime == 0) || (bTime - nTime) > 1000  )
                albumArt.addClass('buffering');
            else
                albumArt.removeClass('buffering');

            bTime = new Date();
            bTime = bTime.getTime();

        },100);
    }

    function selectTrack(flag)
    {
        if( flag == 0 || flag == 1 )
            ++currIndex;
        else
            --currIndex;

        if( (currIndex > -1) && (currIndex < albumArtworks.length) )
        {
            if( flag == 0 )
                i.attr('class','fa fa-play');
            else
            {
                albumArt.removeClass('buffering');
                i.attr('class','fa fa-pause');
            }

            seekBar.width(0);
            trackTime.removeClass('active');
            tProgress.text('00:00');
            tTime.text('00:00');

            currAlbum = albums[currIndex];
            currTrackName = trackNames[currIndex];
            currArtwork = albumArtworks[currIndex];

            audio.src = trackUrl[currIndex];
            
            nTime = 0;
            bTime = new Date();
            bTime = bTime.getTime();

            if(flag != 0)
            {
                audio.play();
                playerTrack.addClass('active');
                albumArt.addClass('active');
            
                clearInterval(buffInterval);
                checkBuffering();
            }

            albumName.text(currAlbum);
            trackName.text(currTrackName);
            albumArt.find('img.active').removeClass('active');
            $('#'+currArtwork).addClass('active');
            
            bgArtworkUrl = $('#'+currArtwork).attr('src');

            bgArtwork.css({'background-image':'url('+bgArtworkUrl+')'});
        }
        else
        {
            if( flag == 0 || flag == 1 )
                --currIndex;
            else
                ++currIndex;
        }
    }

    function initPlayer()
	{	
        audio = new Audio();

		selectTrack(0);
		
		audio.loop = false;
		
		playPauseButton.on('click',playPause);
		
		sArea.mousemove(function(event){ showHover(event); });
		
        sArea.mouseout(hideHover);
        
        sArea.on('click',playFromClickedPos);
		
        $(audio).on('timeupdate',updateCurrTime);

        playPreviousTrackButton.on('click',function(){ selectTrack(-1);} );
        playNextTrackButton.on('click',function(){ selectTrack(1);});
	}
    
	initPlayer();
});