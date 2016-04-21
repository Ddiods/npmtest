$(document).ready(function () {
    $(".icon").click(function () {
        var img = $(this).find("img").attr("src");
        var id = new Date().getTime();
        $("#full_image2").append('<div id="' + id + '" class="dragme"><img src="' + img + '" width="100%" /></div>');

        $(".dragme").draggable({containment: '#full_image2'});

        $("#" + id).resizable({
        });
    })
});