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
    $('#contact-form').on('submit', function(e){
        e.preventDefault();
        var _this = $(this);
        _this.find('input').each(function(){
        var _val = $(this).val();
        
            if(_val=="" || _val==undefined ){
                $('#error').show();
                return false;
            }else {
                $('#error').hide();				
            }
        });
		/*$.ajax({
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
			});		*/
			$.post($(this).attr('action'),$('#contact-form').serialize()).then(data => {
					alert('thank you');
			})
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
})