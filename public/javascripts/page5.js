$(document).ready(function () {
    $("#email").click(function () {

        $.post("/sendemail",
            {
                user_id: $_GET('user_id'),
                photo_id: $_GET('photo_id')
            },
            function (data) {
                if (data.success) {
                    alert("Foto enviada!");
                }
            });

    });
    function $_GET(param) {
        var vars = {};
        window.location.href.replace(location.hash, '').replace(
            /[?&]+([^=&]+)=?([^&]*)?/gi, // regexp
            function (m, key, value) { // callback
                vars[key] = value !== undefined ? value : '';
            }
        );

        if (param) {
            return vars[param] ? vars[param] : null;
        }
        return vars;
    }
});