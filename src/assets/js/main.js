const mobileScreen = window.matchMedia("(max-width: 990px )");


$(document).ready(function () {



    console.log("From main.js");

    $(".dashboard-nav-dropdown-toggle").click(function () {

        $(this).closest(".dashboard-nav-dropdown")
            .toggleClass("show")
            .find(".dashboard-nav-dropdown")
            .removeClass("show");

        $(this).parent()
            .siblings()
            .removeClass("show");
    });

    $(".menu-toggle").click(function () {

        if (mobileScreen.matches) {
            $(".dashboard-nav").toggleClass("mobile-show");
        } else {
            $(".dashboard").toggleClass("dashboard-compact");
        }
        $(this).find("i").toggleClass("fa-chevron-left fa-chevron-right");
    });




    // Open or close dropdown when clicking on the input
    $('.t-dropdown-input').on('click', function (event) {
        event.stopPropagation(); // Prevent click event from reaching document
        $('.t-dropdown-list').not($(this).parent().next()).slideUp('fast'); // Close other dropdowns
        $(this).parent().next().slideDown('fast');
    });

    // Close dropdown when clicking on the select button
    $('.t-select-btn').on('click', function (event) {
        event.stopPropagation();
        $('.t-dropdown-list').slideUp('fast');

        if (!$(event.target).closest(".t-dropdown-input, .t-select-btn").length) {
            $('.t-dropdown-list').slideUp('fast');
            $('.t-dropdown-list').style('display', 'none');
        }

        if (!$(this).prev().attr('disabled')) {
            $(this).prev().trigger('click');
            $('.t-dropdown-list').style('display', 'none');
        }
    });

    // Set width of input based on dropdown select and clear value
    $('.t-dropdown-input').width($('.t-dropdown-select').width() - $('.t-select-btn').width() - 13).val('');

    // Set width of dropdown list to match dropdown select
    $('.t-dropdown-list').width($('.t-dropdown-select').width());

    // Set selected value when clicking on dropdown item
    $('li.t-dropdown-item').on('click', function () {
        var text = $(this).html();
        $(this).parent().prev().find('.t-dropdown-input').val(text);
        $('.t-dropdown-list').slideUp('fast');
    });


    // END //










    //Scale
    var slider = document.getElementById("scale-slider");
    var output = document.getElementById("slider-input");

    output.value = slider.value + "%";

    slider.oninput = function () {
        output.value = this.value + "%";
    }

    //Opacity
    var sliderOp = document.getElementById("opacity-slider");
    var outputOp = document.getElementById("opacity-input");

    outputOp.value = sliderOp.value + "%";

    sliderOp.oninput = function () {
        outputOp.value = this.value + "%";
    }







});