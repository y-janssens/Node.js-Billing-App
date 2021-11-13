let sum = false;
window.onload = resize();

function reportWindowSize() {
    resize();
}
window.onresize = reportWindowSize;
window.addEventListener('resize', reportWindowSize);

function resize() {
    let d_height = document.getElementById('customer_container').offsetHeight;
    let d_width = d_height / 1.41;
    let cwidth = $(".client_sum").width();
    $('client_infos').css('width', cwidth);
    $('#customer_container').css('width', d_width);
}

function client_toggle() {
    if (sum) {
        sum = false;
        $(".client_infos").removeClass;
        $(".client_infos").slideUp(500);
    } else {
        sum = true;
        $(".client_infos").addClass;
        $(".client_infos").slideDown(500);
    }
}

const client_list = ["Bjorn Johansson", "Olga Duhamel", "Tordmund Durval", "Haral Mortenuit", "Felix Baumgartner"]

client_list.forEach(i =>
    $("#customer_container").append('<div class="client_sum" onclick="client_toggle()">' + i + '' +
        '<div class="client_toggle">˅</div>' +
        '<div class="client_infos"></div>' +
        '</div>'),
    console.log('Found ' + client_list.length + ' clients in database')
);