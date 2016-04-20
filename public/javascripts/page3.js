$(document).ready(function () {

    var pictureDone = 0;

    function countdown(seconds) {
        var countdownDiv = $('#counter');
        if (seconds == 0) {
            countdownDiv.hide();
            return;
        }

        countdownDiv.html(seconds);
        seconds--;
        setTimeout(function () {
            countdown(seconds)
        }, 1000);
    }

    $('#take-picture').click(function () {
        var pictureNumber = 3;

        $("#loading").show();
        $("#take-picture").hide();
        $("#webcam-video").removeClass('blur');

        countdown(3);

        var intervalPicture = setInterval(function () {
            takepicture(pictureNumber);
            pictureNumber--;

            if (pictureNumber === 0) {
                clearInterval(intervalPicture);
            }
            countdown(3);

        }, 3000);
    });

    function takepicture(pictureNumber) {

        var canvas = $('canvas')[0];
        canvas.width = 1920;
        canvas.height = 1441;
        canvas.getContext('2d').drawImage(video, 0, 0, 1920, 1441);

        var data = {
            photoCode: canvas.toDataURL('image/png'),
            user_id: $_GET('user_id'),
            pictureNumber: pictureNumber
        };

        $.post(
            '/save_page3',
            data,
            function () {
                pictureDone++;
            }
        );

        setInterval(function () {
            if (pictureDone === 3) {
                window.location.replace("/page4/?user_id=" + $_GET('user_id'));
            }
        }, 500);
    }

    navigator.getMedia = ( navigator.getUserMedia ||
    navigator.webkitGetUserMedia ||
    navigator.mozGetUserMedia ||
    navigator.msGetUserMedia);

    video = document.getElementById("webcam-video");
    navigator.getMedia(
        {
            video: true,
            audio: false
        },
        function (stream) {
            if (navigator.mozGetUserMedia) {
                video.mozSrcObject = stream;
            } else {
                var vendorURL = window.URL || window.webkitURL;
                video.src = vendorURL.createObjectURL(stream);
            }
            video.play();
        },
        function (err) {
            console.log("An error occured! " + err);
        }
    );

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