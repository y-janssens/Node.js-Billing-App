let f_width = document.getElementById('panel').offsetWidth - 10;
let f_height = document.getElementById('panel').offsetHeight - 10;

$('.menu').css('display', 'none');

$('#texture').css('width', f_width);
$('#texture').css('height', f_height);

function texture() {
let lorem = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."

document.getElementById("texture").innerHTML = lorem.repeat(20);

function randomXToY(minVal, maxVal, floatVal) {
    var randVal = minVal + (Math.random() * (maxVal - minVal));
    return typeof floatVal == 'undefined' ? Math.round(randVal) : randVal.toFixed(floatVal);
}

var exploded = $('#texture').text().split('');
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

$('#texture').html(exploded.join(''));
}

window.onload = texture();