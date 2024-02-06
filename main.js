var http = require('http');
var fs = require('fs');
var multer = require('multer');


var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {

        cb(null, Date.now()+ '-' + file.originalname);
    }
});

var upload = multer({ storage: storage });

var server = http.createServer(function (req, res) {
    if (req.url == "/" || req.url == "/home") {
        res.writeHead(200, {'Content-Type': 'text/html'});
        res.write('<h1>This is Home Page</h1>');
        res.end();
    } else if (req.url == "/about") {
        res.writeHead(200, {'Content-Type': 'text/html'});
        res.write('<h1>This is About Page</h1>');
        res.end();
    } else if (req.url == "/contact") {
        res.writeHead(200, {'Content-Type': 'text/html'});
        res.write('<h1>This is Contact Page</h1>');
        res.end();

    }

    else if (req.url == "/upload" && req.method === 'GET') {

        res.writeHead(200, {'Content-Type': 'text/html'});
        res.write('<form action="file-upload" method="post" enctype="multipart/form-data">' +
            '<input type="file" name="myfile" /><br>' +
            '<input type="submit" value="Upload File" />' +
            '</form>');
        res.end();
    }

    else if (req.url == "/file-upload" && req.method === 'POST') {

        var uploadSingle = upload.single('myfile');
        uploadSingle(req, res, function (error) {
            if (error) {
                res.writeHead(200, {'Content-Type': 'text/html'});
                res.write("File upload failed");
                res.end();
            } else {
                res.writeHead(200, {'Content-Type': 'text/html'});
                res.write("File uploaded successfully");
                res.end();
            }
        });
    } else if (req.url == "/file-write") {

        fs.writeFile('demo.txt', 'hello world', function (error) {
            if (error) {
                res.writeHead(200, {'Content-Type': 'text/html'});
                res.write("File write failed");
                res.end();
            } else {
                res.writeHead(200, {'Content-Type': 'text/html'});
                res.write("File write successful");
                res.end();
            }
        });
    } else {
        res.writeHead(404, {'Content-Type': 'text/html'});
        res.write('<h1>404 Page Not Found</h1>');
        res.end();
    }
});

server.listen(5500);
console.log("Server is running Successfully ");
