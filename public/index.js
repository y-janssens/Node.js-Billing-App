let contact_toggle = true;

// Contact form

function contact() {
    if (contact_toggle) {
        contact_toggle = false;
        $('#contact_form').css('display', 'initial');
        $('#clear_3').css('display', 'initial');

    } else if (contact_toggle == false) {
        contact_toggle = true;
        $('#contact_form').css('display', 'none');
        $('#clear_3').css('display', 'none');
    }
}

$("#clear_3").click(function () {
    contact_toggle = true;
    $('#contact_form').css('display', 'none');
    $('#clear_3').css('display', 'none');
});



function texture() {
    let lorem = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."

    document.getElementById("f_texture").innerHTML = lorem.repeat(20);

    function randomXToY(minVal, maxVal, floatVal) {
        var randVal = minVal + (Math.random() * (maxVal - minVal));
        return typeof floatVal == 'undefined' ? Math.round(randVal) : randVal.toFixed(floatVal);
    }

    var exploded = $('#f_texture').text().split('');
    var count = 300;
    var rdmltr = [];

    while (count--) {
        rdmltr[count] = randomXToY(0, exploded.length);
        while (exploded[rdmltr[count]] == ' ') {
            rdmltr[count] = randomXToY(0, exploded.length);
        }
    }
    while (count++ < 300) {
        exploded[rdmltr[count]] = '<span class="boldify">' + exploded[rdmltr[count]] + '</span>';
    }

    $('#f_texture').html(exploded.join(''));
}

window.onload = texture();