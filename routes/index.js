var express = require('express');
var router = express.Router();
var http = require('http');
var querystring = require("querystring");
var base64Img = require('base64-img');
var nodemailer = require('nodemailer');

/* GET home page. */
router.get('/', function (req, res, next) {
    res.render('index');
});

/* GET page2 page. */
router.get('/page2', function (req, res) {
    res.render('page2');
});

/* GET page2 page. */
router.post('/save_page2', function (req, res) {

    var data = {
            nombre: req.body.nombre,
            email: req.body.email
        },
        qs = querystring.stringify(data),
        qslength = qs.length,
        options = {
            hostname: 'llamainn.com',
            port: 80,
            path: "/sitios/cosasartphoto/page2.php",
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Content-Length': qslength
            }
        },
        buffer = "",
        request = http.request(options, function (stream) {
            stream.on('data', function (chunk) {
                buffer += chunk;
            });
            stream.on('end', function () {
                res.send(JSON.parse(buffer));
            });
        });

    request.write(qs);
    request.end();
});

/* GET page3 page. */
router.get('/page3/:id?', function (req, res) {
    res.render('page3', {id: req.query.user_id});
});

/* GET page3 page. */
router.post('/save_page3', function (req, res) {
    base64Img.img(req.body.photoCode, process.cwd() + '/public/uploads', req.body.user_id + '-' + req.body.pictureNumber, function (err, filepath) {
        console.log(err);
        console.log(filepath);
    });
    res.json({success: true});
});

/* GET page5 page. */
router.get('/page5/', function (req, res) {
    res.render('page5', {id: req.query.user_id, photo_id: req.query.photo_id});
});

/* GET sendemail page. */
router.post('/sendemail/:id?', function (req, res) {
    var id = req.query.user_id;

    var data = {
            user_id: id
        },
        qs = querystring.stringify(data),
        qslength = qs.length,
        options = {
            hostname: 'llamainn.com',
            port: 80,
            path: "/sitios/cosasartphoto/getemail.php",
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Content-Length': qslength
            }
        },
        buffer = "",
        request = http.request(options, function (stream) {
            stream.on('data', function (chunk) {
                buffer += chunk;
            });
            stream.on('end', function () {
                var transporter = nodemailer.createTransport('smtps://cosasartlima@gmail.com:Peru/2016@smtp.gmail.com');
                var mailOptions = {
                    from: '"Cosas" <osasartlima@gmail.com>', // sender address
                    to: buffer.email, // list of receivers
                    subject: 'Foto', // Subject line
                    text: 'Foto', // plaintext body
                    html: '<b>Foto</b>', // html body
                    attachments: [{
                        // file on disk as an attachment
                        filename: req.query.user_id + '-' + req.query.photo_id + '.png',
                        path: process.cwd() + '/public/uploads/' + req.query.user_id + '-' + req.query.photo_id + '.png'
                    }]
                };

// send mail with defined transport object
                transporter.sendMail(mailOptions, function (error, info) {
                    if (error) {
                        return console.log(error);
                    }
                    console.log('Message sent: ' + info.response);
                });
            });
        });

    request.write(qs);
    request.end();

});


module.exports = router;
