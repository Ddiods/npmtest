$(document).ready(function () {
    $("input.submit").click(function () {
        var nombre = $(".nombre"),
            email = $(".email"),
            terminos = $(".terminos-y-condiciones input"),
            error = false;

        if (nombre.val() == '') {
            nombre.addClass('error-input');
            error = true;
        } else {
            nombre.removeClass('error-input');
        }
        if (email.val() == '') {
            email.addClass('error-input');
            error = true;
        } else {
            email.removeClass('error-input');
        }
        if (!terminos.is(':checked')) {
            alert("Debe aceptar los términos y condiciones");
            error = true;
        }

        $.post("/save_page2",
            {
                nombre: nombre.val(),
                email: email.val()
            },
            function (data) {
                if (data.success) {
                    window.location.replace("/page3/?user_id=" + data.id);
                }
            });
    })
});