let css_toggle = true;

$.get('main.css', function (resp) {
    document.getElementById('css_file').textContent = resp;
});

function restore() {
    $.get('base.css', function (resp) {
        document.getElementById('css_file').textContent = resp;
        console.log('restore');
    });
}

for (var i = 1; i < 1000; i++) {
    $("#css_lines").append(i + " \n");
}

$("#css_file").scroll(function () {
    $("#css_lines").scrollTop($("#css_file").scrollTop());
});

function toggle_css() {
    if (css_toggle) {
        css_toggle = false;
        $('#css_container').css('display', 'none');
    } else {
        css_toggle = true;
        $('#css_container').css('display', 'initial');
    }
}

//window.onload = toggle_css();