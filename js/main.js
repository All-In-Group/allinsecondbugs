$(document).ready(function () {
    window.onload = (event) => {
        $(".wrap-loader").hide();
    };

    $(document).on("click", '.navbar-nav>li>a[href^="#"]', function (e) {
        let id = $(this).attr("href");
        let $id = $(id);
        if ($id.length === 0) {
            return;
        }
        e.preventDefault();
        let pos = $id.offset().top;

        $("body, html").animate({ scrollTop: pos });
    });

    $(".intro-slider").slick({
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 3000,
        infinite: false,
    });

    $(".slick-slider-works").slick({
        slidesToShow: 3,
        slidesToScroll: 1,
        autoplay: false,
        dots: true,
        arrows: false,
        infinite: false,
        responsive: [
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
                    autoplay: true,
                    autoplaySpeed: 3000,
                    dots: true,
                    arrows: false,
                },
            },
            {
                breakpoint: 576, // mobile breakpoint
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    autoplay: true,
                    autoplaySpeed: 3000,
                    dots: true,
                    arrows: false,
                },
            },
            {
                breakpoint: 425, // mobile breakpoint
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    autoplay: true,
                    autoplaySpeed: 3000,
                    dots: true,
                    arrows: false,
                },
            },
        ],
    });

    $("#tabs").tabs();

    $("#mobile-tabs").accordion({
        heightStyle: "content",
    });

    $(".slick-slider-team").slick({
        slidesToShow: 4,
        slidesToScroll: 4,
        autoplay: false,
        prevArrow: '<button class="slide-arrow prev-arrow"></button>',
        nextArrow: '<button class="slide-arrow next-arrow"></button>',
        infinite: false,
        responsive: [
            {
                breakpoint: 992,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 1,
                    autoplay: true,
                    dots: false,
                    arrows: false,
                },
            },
            {
                breakpoint: 790,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
                    autoplay: true,
                    autoplaySpeed: 3000,
                    arrows: false,
                    dots: false,
                },
            },
            {
                breakpoint: 576,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    autoplay: true,
                    autoplaySpeed: 3000,
                    arrows: false,
                    dots: false,
                },
            },
        ],
    });

    $(".slick-slider-works .slick-arrow").hide();
    $(".intro-slider .slick-arrow").hide();

    window.onscroll = function () {
        fixing_navbar();
    };

    function fixing_navbar() {
        let header = $(".navbar");
        let windowHeight = window.pageYOffset;

        if (windowHeight > 0) {
            header.addClass("navbar-fixed");
            $(".navbar-brand img").hide("slide", { direction: "up" }, 1000);
            $(".navbar-brand p").show("slide", { direction: "down" }, 1000);
        } else {
            header.removeClass("navbar-fixed");
            $(".navbar-brand img").show("slide", { direction: "up" }, 1000);
            $(".navbar-brand p").hide("slide", { direction: "down" }, 1000);
        }
    }

    $(".navbar-default .navbar-collapse ul li").click(function () {
        $(".navbar-default .navbar-collapse").removeClass("in");
    });

    // statistics

    function number_to(className, from, to, duration) {
        let element = $("." + className);
        let start = new Date().getTime();
        setTimeout(function () {
            let now = new Date().getTime() - start;
            let progress = now / duration;
            let result = Math.floor((to - from) * progress + from);
            element.html(progress < 1 ? result + "+" : to + "+");
            if (progress < 1) setTimeout(arguments.callee, 10);
        }, 10);
    }

    window.addEventListener("scroll", function f() {
        if ($(".statistic").offset().top - $(window).scrollTop() - $(window).height() + 200 <= 0) {
            number_to("counter1", 1, 300, 1500);
            number_to("counter2", 1, 27, 1500);
            number_to("counter3", 1, 54, 1500);
            number_to("counter4", 1, 350, 1500);
            window.removeEventListener("scroll", f);
        }
    });
});

// data from json
function chnageLanguages(x, language) {
    document.querySelector(".languages-title img").src = "./img/languages/" + language + ".png";
    fetch("https://api.allin.am/data/allin-" + x)
        .then((response) => response.json())
        .then((data) => {
            // menu
            var menu = document.getElementsByClassName("navbar-nav")[0];
            var menuLi = menu.getElementsByTagName("li");

            var menuValue = [];
            Object.keys(data.menu).forEach((key) => {
                menuValue.push(data.menu[key]);
            });
            var varmenuLi = 0;
            menuLi.forEach((el) => {
                el.getElementsByTagName("a")[0].innerHTML = menuValue[varmenuLi];
                varmenuLi++;
            });

            // slides
            var slide = document.getElementsByClassName("slick-content");
            var slideValue = [];
            Object.keys(data.slides).forEach((key) => {
                slideValue.push(data.slides[key]);
            });

            var varSlide = 0;
            slide.forEach((el) => {
                el.getElementsByTagName("h1")[0].innerHTML = slideValue[varSlide].text;
                el.getElementsByTagName("button")[0].innerHTML = `<a  href=${slideValue[varSlide].buttonUrl}></a>`;
                el.getElementsByTagName("a")[0].innerHTML = slideValue[varSlide].button;
                varSlide++;
            });

            var slideImg = document.getElementsByClassName("sl-img");

            var varSlideImg = 0;
            slideImg.forEach((el) => {
                el.getElementsByTagName("img")[0].src = slideValue[varSlideImg].image;
                varSlideImg++;
            });

            // mini services
            var miniServices = document.getElementsByClassName("caption");
            var miniServicesValue = [];
            Object.keys(data["mini-services"]).forEach((key) => {
                miniServicesValue.push(data["mini-services"][key]);
            });

            var varminiServices = 0;
            miniServices.forEach((el) => {
                el.getElementsByTagName("h2")[0].innerHTML = miniServicesValue[varminiServices].text;
                el.getElementsByTagName("p")[0].innerHTML = miniServicesValue[varminiServices].description;
                el.getElementsByTagName("button")[0].innerHTML = `<a  href=${slideValue[varminiServices].buttonUrl}></a>`;
                el.getElementsByTagName("a")[0].innerHTML = slideValue[varminiServices].button;
                varminiServices++;
            });

            var miniServicesImg = document.getElementsByClassName("thm-img");

            var varminiServicesImg = 0;
            miniServicesImg.forEach((el) => {
                el.getElementsByTagName("img")[0].src = miniServicesValue[varminiServicesImg].image;
                varminiServicesImg++;
            });

            // about us
            var aboutUs1 = document.getElementsByClassName("item1")[0];
            var aboutUs2 = document.getElementsByClassName("item2")[0];
            var aboutUsValue = [];
            Object.keys(data["about-us"]).forEach((key) => {
                aboutUsValue.push(data["about-us"][key]);
            });

            aboutUs1.getElementsByTagName("img")[0].src = aboutUsValue[3];
            aboutUs2.getElementsByTagName("h1")[0].innerHTML = aboutUsValue[0];
            aboutUs2.getElementsByTagName("h4")[0].innerHTML = aboutUsValue[4];

            var aboutUs3 = document.getElementsByClassName("item3")[0];

            aboutUs3.getElementsByTagName("p")[0].innerHTML = aboutUsValue[5];

            var aboutUs3DivImg = document.getElementsByClassName("col-md-1");

            var varaboutUs3DivImg = 0;
            aboutUs3DivImg.forEach((el) => {
                el.innerHTML = aboutUsValue[6][varaboutUs3DivImg].image;
                varaboutUs3DivImg++;
            });

            var aboutUs3DivText = document.getElementsByClassName("col-md-11");
            var varAboutUs3DivText = 0;
            aboutUs3DivText.forEach((el) => {
                el.getElementsByTagName("p")[0].innerHTML = aboutUsValue[6][varAboutUs3DivText].text;
                varAboutUs3DivText++;
            });

            aboutUs3DivText[2].getElementsByTagName("button")[0].innerHTML = `<a  href=${aboutUsValue[2]}></a>`;
            aboutUs3DivText[2].getElementsByTagName("button")[0].innerHTML = aboutUsValue[1];

            //services
            var services = document.getElementById("tabs");
            var servicesLi = services.getElementsByTagName("li");
            var servicesValue = [];
            Object.keys(data["services"]).forEach((key) => {
                servicesValue.push(data["services"][key]);
            });

            var varServices = 0;
            servicesLi.forEach((el) => {
                el.getElementsByTagName("img")[0].src = servicesValue[varServices].image;
                el.getElementsByTagName("h3")[0].innerHTML = servicesValue[varServices].title;
                varServices++;
            });

            var servicesContent = document.getElementsByClassName("tabs_content");
            var varServicesContent = 0;
            servicesContent.forEach((el) => {
                el.getElementsByTagName("h4")[0].innerHTML = servicesValue[varServicesContent].contentTitle;
                el.getElementsByTagName("div")[0].innerHTML = servicesValue[varServicesContent].content;
                varServicesContent++;
            });

            var servicesImg = document.getElementsByClassName("tabs-content-img");
            var varServicesImg = 0;
            servicesImg.forEach((el) => {
                el.getElementsByTagName("img")[0].src = servicesValue[varServicesImg].contentImage;
                varServicesImg++;
            });
            // TEAM
            let team_item_count = data.team.length;
            let j = 0;
            for (let i = 0; i < team_item_count; i++) {
                $($(".team-member h3")[j]).text(data.team[i].name);
                $($(".team-member h5")[j]).text(data.team[i].position);
                $($(".team_tg")[j]).attr("href", data.team[i].tg);
                $($(".team_ld")[j]).attr("href", data.team[i].ld);
                $($(".team_fb")[j]).attr("href", data.team[i].fb);
                j++;
            }
            // WORKS
            let works_count = data.portfolio.length;
            let k = 0;
            for (let i = 0; i < works_count; i++) {
                $($(".work__item img")[k]).attr("src", data.portfolio[i].image);
                $($(".work__more p")[k]).text(data.portfolio[i].desc);
                $($(".work__name")[k]).text(data.portfolio[i].title);
                $($(".work__info a")[k]).attr("href", data.portfolio[i].link);
                k++;
            }
            // BLOG
            $(".blog_info").text(data.blog.desc);
            $(".blog-container .btn-blog").text(data.blog.button);
        });

    // BLOG & ITEMS data from json
    fetch("https://api.allin.am/data/blog-arm")
        .then((response) => response.json())
        .then((data) => {
            //  BLOG
            let blog_item_count = data.length;
            for (let i = 0; i < blog_item_count; i++) {
                $(".wrapper_blog").append(
                    '<div class="blog_item">' +
                        '  <div class="blog_header">' +
                        '    <a target="_blank" href="blog/blog-item.html">' +
                        '      <img class="blog_photo" src="" alt="" />' +
                        "    </a>" +
                        '    <div class="blog_date">' +
                        '      <div class="blog_date-day">15</div> ' +
                        "    </div>" +
                        "  </div>" +
                        '  <div class="blog_content">' +
                        '    <div class="blog_item-title">' +
                        '      <a target="_blank" href="blog/blog-item.html">' +
                        "        Lorem ipsum dolor sit amet" +
                        "      </a>" +
                        "    </div>" +
                        '    <div class="blog_text">' +
                        '      Consectetur adipiscing elit, sed do eiusmod tempor incididunt ut" labore' +
                        '      et dolore magna aliqua."' +
                        "    </div>" +
                        "  </div>" +
                        '  <div class="blog_footer">' +
                        '    <div class="blog-stat">' +
                        '      <span class="blog-stat_item">' +
                        '        <i class="far fa-eye"></i>' +
                        '         <span class="blog-stat_item-views">542</span>' +
                        "      </span>" +
                        '      <span class="blog-stat_item">' +
                        '        <i class="far fa-comment-dots"></i>' +
                        '        <span class="blog-stat_item-comments"> 17</span>' +
                        "      </span>" +
                        "    </div>" +
                        "  </div>" +
                        "</div>"
                );
                $($(".blog_item")[i]).attr("id", `blog_${i}`);
                $($(".blog_header img")[i]).attr("src", data[i].image);
                $($(".blog_item-title a")[i]).text(data[i].title);
                $($(".blog_text")[i]).text(data[i].shortDesc);
                $($(".blog-stat_item-views")[i]).text(data[i].views);
                $($(".blog-stat_item-comments")[i]).text(data[i].comments);
                $($(".blog_date-day")[i]).text(data[i].date);
                // BLOG ITEM

                $($(".blog__item_row")[i]).attr("id", `blog_${i}`);
                $($(".blog-item-h1")[i]).text(data[i].title);
                $($(".post_info p")[i]).text(data[i].desc);
                $($(".card_info-title")[i]).text(data[i].author.name);
                $($(".card_info-text")[i]).text(data[i].author.desc);
                $($(".card_tg")[i]).attr("href", data[i].author.tg);
                $($(".card_fb")[i]).attr("href", data[i].author.fb);
                $($(".card_ln")[i]).attr("href", data[i].author.ln);
                $($(".card_ig")[i]).attr("href", data[i].author.insta);
                $($(".card-img img")[i]).attr("src", data[i].author.image);
            }
            $(".wr_b_1 a").attr("href", "blog-item.html");
            for (let i = 3; i < blog_item_count; i++) {
                $($(".blog_item")[i]).css("display", "none");
            }
            $(".wr_b_1 .blog_item").css("display", "block");
        });

    // ContactUs
    function success(data) {
        console.log(data);
    }
    $(".contact_form").on("submit", function (e) {
        e.preventDefault();

        let form = $(e.target);
        let name = form.find('[name="name"]').val();
        let email = form.find('[name="email"]').val();
        let message = form.find('[name="message"]').val();

        $.ajax({
            url: "https://api.allin.am/data/contact-us",
            type: "POST",
            data: { name: name, email: email, message: message },
            dataType: "text",
            success: success,
        });
        alert("Thank you!");
        name = form.find('[name="name"]').val("");
        email = form.find('[name="email"]').val("");
        message = form.find('[name="message"]').val("");
    });
    // Blog item comment
    let cl_count = 0;
    $(".comment_form").on("submit", function (e) {
        e.preventDefault();
        $(".comments_container").append(
            '<div class="comments your_comment">' +
                '  <div class="comments-body">' +
                '    <h5 class="mt-0 com_name">' +
                "      <p>Lorem, ipsum.</p>" +
                '      <a href="#" class="float-right">' +
                '        <i class="fa fa-reply"></i>' +
                "      </a>" +
                "    </h5>" +
                '    <p class="comment">' +
                "      Cras sit amet nibh libero, in gravida nulla. Nulla vel metus scelerisque" +
                "      ante sollicitudin. Cras purus odio, vestibulum in vulputate at, tempus" +
                "      viverra turpis. Fusce condimentum nunc ac nisi vulputate fringilla. Donec" +
                "      lacinia congue felis in faucibus." +
                "    </p>" +
                "  </div>" +
                "</div>"
        );
        $($(".your_comment .com_name p")[cl_count]).text($(".comment_user").val());
        $($(".your_comment .comment ")[cl_count]).text($(".comment_message").val());
        let id = $(".blog__item_row").attr("id");
        console.log(id);
        $.ajax({
            url: "https://api.allin.am/data/newComment",
            type: "GET",
            data: { blog_id: id },
            dataType: "text",
            success: function (data) {
                console.log(data);
            },
        });
        cl_count++;
        $($(".your_comment .com_name p")[cl_count]).text($(".comment_user").val(""));
        $($(".your_comment .comment ")[cl_count]).text($(".comment_message").val(""));
    });
}

chnageLanguages("arm", "am");
