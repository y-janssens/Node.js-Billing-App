function submit() {
    form_name = document.getElementById('c_name').value;
    form_mail = document.getElementById('c_mail').value;
    form_msg = document.getElementById('c_msg').value;
    send_msg = "Message envoyé!"
    document.getElementById("c_name").value = "";
    document.getElementById("c_mail").value = "";
    document.getElementById("c_msg").value = "";

    if (form_name !== "" || form_mail !== "" || form_msg !== "") {
        Email.send({
            SecureToken: "8b7345b9-8abe-4224-a3c6-6b6b24c3d059",
            To: 'y.janssens@protonmail.com',
            From: "skorpiostyle@gmail.com",
            Subject: "Un nouveau message de " + form_name,
            Body: "Un nouveau message de " + form_name + " vient d'arriver." + "</br>" +
                "E-mail: " + form_mail + "</br>" + "</br>" + form_msg
        }).then(
            $('#submit').css('color', '#4CC417'),
            document.getElementById('submit').value = "Message envoyé!",
            setTimeout(function () {
                $('#submit').css('color', '#FFF');
                document.getElementById('submit').value = "Envoyer";
            }, 2000)
        )
        .then(
            console.log('Message envoyé')
        );
    } else if (form_name == "" || form_mail == "" || form_msg == "") {
        document.getElementById("c_name").value = "* Nom";
        document.getElementById("c_mail").value = "* E-mail";
        document.getElementById("c_msg").value = "* Message";
        document.getElementById('submit').value = "Non envoyé";
        $('#c_name').css('color', '#ec5151');
        $('#c_mail').css('color', '#ec5151');
        $('#c_msg').css('color', '#ec5151');
        $('#submit').css('color', '#ec5151');
        setTimeout(function () {
            $('#submit').css('color', '#FFF');
            $('#c_name').css('color', 'rgba(120, 120, 120, 0.75)');
            $('#c_mail').css('color', 'rgba(120, 120, 120, 0.75)');
            $('#c_msg').css('color', 'rgba(120, 120, 120, 0.75)');
            document.getElementById('submit').value = "Envoyer";
            document.getElementById("c_name").value = "";
            document.getElementById("c_mail").value = "";
            document.getElementById("c_msg").value = "";
        }, 2000)
    }
}