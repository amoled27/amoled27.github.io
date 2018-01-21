 $(document).ready(function () {

            // Gets the video src from the data-src on each button
            var $imageSrc;
            $('.gallery img').click(function () {
        $imageSrc = $(this).data('bigimage');
    });




            // when the modal is opened autoplay it
            $('#myModal').on('shown.bs.modal', function (e) {

        // set the video src to autoplay and not to show related video. Youtube related video is like a box of chocolates... you never know what you're gonna get

        $("#image").attr('src', $imageSrc);
    })


            // reset the modal image
            $('#myModal').on('hide.bs.modal', function (e) {
        // a poor man's stop video
        $("#image").attr('src', '');
    })






            // document ready
        });




      

     

        var isIframe = function () {
                var a = !1;
                try {
            self.location.href != top.location.href && (a = !0)
        } catch (b) {
            a = !0
        }
        return a
            };
            if (!isIframe()) {
                var logo = $("<a href='http://pupunzi.com/#mb.components/components.html' style='position:absolute;top:0;z-index:1000'><img id='logo' border='0' src='http://pupunzi.com/images/logo.png' alt='mb.ideas.repository'></a>");
                $("#wrapper").prepend(logo), $("#logo").fadeIn()
            }

            /* Extend or modify effects */
            /* Initialize the mbGallery */
            var myGallery = jQuery("#thumbGallery").mbGallery();

            /* customizer */
            jQuery("#effect").on("change", function () {
                var x = $(this).val();
                myGallery.data("nav_effect", x);

            });

            jQuery("#delay").on("change", function () {
                var x = parseFloat($(this).val());
                myGallery.data("nav_delay", x);
            });

            jQuery("#timing").on("change", function () {
                var x = parseFloat($(this).val());
                myGallery.data("nav_timing", x);
            });

            if (jQuery.isMobile) {
                jQuery("body").css({
                    marginBottom: 140
                })
            }
      
         
            autoPlayYouTubeModal();

        //FUNCTION TO GET AND AUTO PLAY YOUTUBE VIDEO FROM DATATAG
        function autoPlayYouTubeModal() {
            var trigger = $("body").find('[data-toggle="modal"]');
            trigger.click(function () {
                var theModal = $(this).data("target"),
                    videoSRC = $(this).attr("data-theVideo"),
                    videoSRCauto = videoSRC + "?autoplay=1";
                $(theModal + ' iframe').attr('src', videoSRCauto);
                $(theModal + ' button.close').click(function () {
                $(theModal + ' iframe').attr('src', videoSRC);
            });
            });
        }
      


         
            $(document).ready(function () {
                $("#toggle").click(function () {
                    var elem = $("#toggle").text();
                    if (elem == "Read More") {
                        //Stuff to do when btn is in the read more state
                        $("#toggle").text("Read Less");
                        $("#text").slideDown();
                    } else {
                        //Stuff to do when btn is in the read less state
                        $("#toggle").text("Read More");
                        $("#text").slideUp();
                    }
                });
            });
  

         
            $(document).ready(function () {
                // Add smooth scrolling to all links
                $("a").on('click', function (event) {

                    // Make sure this.hash has a value before overriding default behavior
                    if (this.hash !== "") {
                        // Prevent default anchor click behavior
                        event.preventDefault();

                        // Store hash
                        var hash = this.hash;

                        // Using jQuery's animate() method to add smooth page scroll
                        // The optional number (800) specifies the number of milliseconds it takes to scroll to the specified area
                        $('html, body').animate({
                            scrollTop: $(hash).offset().top
                        }, 800, function () {

                            // Add hash (#) to URL when done scrolling (default click behavior)
                            window.location.hash = hash;
                        });
                    } // End if
                });
            });
          
