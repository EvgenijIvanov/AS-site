//user custom libs
$(document).ready(function(){
    $('.bxslider').bxSlider();
});
$(document).ready(function(){
    // $(selector).inputmask("99-9999999");  //static mask
    $('form input[type="tel"]').inputmask({"mask": "+99(999) 999-9999"}); //specifying options
    // $(selector).inputmask("9-a{1,3}9{1,3}"); //mask with dynamic syntax
});
$(document).ready(function(){
    $(".droplink i").click(function(){
        $(".header-slider-menu").animate({'width': 'show'});
        $("*").click(function(e){
            if(e.target.className == "header-slider-menu" || e.target.className == "fa fa-bars")
                return false;
            else $(".header-slider-menu").animate({'width': 'hide'});
        });
    });
    $(".header-slider-menu a").click(function(e) {
        var el = this.hash;
        $.scrollTo($(el), 700, {
        });
    });
    $('.wrapper-header nav').scroolly([
        {
            from: 'doc-top=vp-top',
            to: 'doc-top + 50px=vp-top',
            addClass: 'col-lg-9 col-md-9 col-sm-9',
            removeClass: 'menu-spy'
        },
        {
            from: 'con-top + 50px=vp-top',
            to: 'con-bottom - 50px =vp-top',
            addClass: 'ms-hide',
            removeClass: 'ms-show'
        },
        {
            direction: 1,
            addClass: 'ms-hide col-lg-9 col-md-9 col-sm-9',
            removeClass: 'ms-show'
        },
        {
            from: 'con-bottom - 50px =vp-top',
            to: 'doc-bottom',
            direction: -1,
            addClass: 'menu-spy ms-show',
            removeClass: 'ms-hide col-lg-9 col-md-9 col-sm-9',
    }], $('#home'));
    $('.scrollying').scroolly([{
        from: 'el-top - 50px=vp-top',
        to: 'el-center=vp-top',
        onCheckIn: function($el){
            var el = $el[0].id;
            $(".header-slider-menu a:not([href = '#" + el + "'])").removeClass('selected');
            $(".header-slider-menu a[href = '#" + el + "']").addClass('selected');
        },
        onCheckOut: function($el){
            // $('.navbar li[data-target]').removeClass('active');
        }
    }]);
});
jQuery(document).ready(function($) {
    $('.popup-with-zoom-anim').magnificPopup({
        type: 'inline',
        removalDelay: 500,
        mainClass: 'mfp-zoom-in'
    });
    $('.popup-with-form').magnificPopup({
        type: 'inline',
        focus: '#name',
        removalDelay: 500,
        callbacks: {
            beforeOpen: function() {
                this.st.mainClass = this.st.el.attr('data-effect');
            }
        },
        midClick: true
    });
    $('.popup-gallery').magnificPopup({
        delegate: 'a',
        type: 'image',
        tLoading: 'Загрузка изображения #%curr%...',
        gallery: {
            enabled: true,
            navigateByImgClick: true,
            preload: [0, 1] // Will preload 0 - before current, and 1 after the current image
        },
        removalDelay: 500,
        callbacks: {
            beforeOpen: function() {
                // just a hack that adds mfp-anim class to markup
                this.st.image.markup = this.st.image.markup.replace('mfp-figure', 'mfp-figure mfp-with-anim');
                this.st.mainClass = this.st.el.attr('data-effect');
            }
        },
        closeOnContentClick: true,
        midClick: true
    });
    $("form button").click(function (e) {
        var formName = "#"+(e.target.form.id);
        $(formName).submit(function(e) {
            var pointer = e.target.dataset.pointer;
            var application = "mailsend/"+ pointer +".php";
            var form = $(this);
            var form_data = form.serialize();
            $.ajax({
                type: "POST",
                url: application,
                dataType: 'json',
                data: form_data,
                beforeSend: function() {
                    form.find('button[type="submit"]').attr('disabled', 'disabled');
                },
                success: function(response) {
                    if(response['error']){
                        $(".toast p").text(response['error']);
                        $(".toast").removeClass("success").addClass("error").show(400);
                        setTimeout(function () {
                            $(".toast").hide(400);
                            $(".toast p").empty()
                        }, 2000);
                    } else {
                        $(".toast p").text('Your message has been sent!');
                        $(".toast").removeClass("error").addClass("success").show(400);
                        setTimeout(function () {
                            $(".toast").hide(400);
                            $(".toast p").empty()
                        }, 3000);
                        form.find('input').val('');
                        form.find('textarea').val('');
                    }
                },
                error: function (xhr, ajaxOptions, thrownError) {
                    console.log('error');
                    console.log(xhr.status); // пoкaжeм oтвeт сeрвeрa
                    console.log(thrownError); // и тeкст oшибки;
                },
                complete: function() {
                    form.find('button[type="submit"]').prop('disabled', false);
                }
            }).done(function () {
                if(pointer != 'user') $.magnificPopup.close();
            });
            return false;
        });
    });

});


