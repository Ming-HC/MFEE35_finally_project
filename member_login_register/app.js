var express = require('express');
var app = express();
var fs = require('fs');
var multer = require('multer');
var session = require('express-session');

app.use(session({
    secret: 'any',
    resave: true,
    saveUninitialized: true,
    cookie: {
        path: '/',
        httpOnly: true,
        secure: false,
        maxAge: 604800 * 1000       // 7 Days = 604800 Secs
    }
}))

var mysql = require('mysql');
var conn = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'P@ssw0rd',
    port: '3306'
});

app.set('view engine', 'ejs');
app.use(express.static('public'));

conn.connect(function (err) {
    if (err) throw err;
    console.log("DataBase Connected!");
})

app.listen(80, function () {
    console.log('Server Running.');
})

app.get('/member/:url', function (req, res) {
    if (req.session.user) {
        res.render('login_register', {
            page: 'login_register',
            url: 'logined'
        })
    } else {
        if (req.params.url == 'login' || req.params.url == 'register') {
            res.render('login_register', {
                page: 'login_register',
                url: req.params.url
            })
        }  
    }
})

app.post('/member/:url/memberchk', express.urlencoded(), function (req, res) {
    var url = req.params.url;
    if (url == 'login') {
        var sql = 'SELECT * FROM member.info where UserName = ?;';
        conn.query(sql, [req.body.UserName, req.body.Password], function (err, results, fidlds) {
            if (err) {
                console.log('select UserName error: ' + JSON.stringify(err));
                res.send('Username or Password Input error.');
            } else {
                if (results[0]) {
                    if (req.body.UserName == results[0].UserName) {
                        if (req.body.Password == results[0].Password) {
                            var d = new Date();
                            d.setHours(d.getHours() + 8);
                            req.session.user = {
                                'account': req.body.UserName,
                                'logined_at': d,
                                'headshot': results[0].headshot
                            }
                            console.log('User: ' + req.body.UserName + ', logined_at: ' + d.toISOString().replace('T', ' ').substr(0, 19));
                            res.send(req.session.user);
                        } else {
                            res.send('Username or Password Input error.');
                        }
                    }
                } else {
                    res.send('Username or Password Input error.');
                }
            }
        })
    } else if (url == 'register') {
        var sql = 'SELECT UserName FROM member.info where UserName = ?;';
        conn.query(sql, [req.body.UserName], function (err, results, fidlds) {
            if (err) {
                var replydata = 'select Username error';
                console.log(replydata + ': ' + JSON.stringify(err));
                res.send(replydata);
            } else {
                if (results[0]) {
                    if (req.body.UserName == results[0].UserName) {
                        res.send('Username already Register.');
                    }
                } else {
                    sql = "INSERT INTO member.info (UserName, Password, headshot) VALUES (?, ?, ?);";
                    conn.query(sql, [req.body.UserName, req.body.Password, req.body.headshot], 
                        function (err, results, fidlds) {
                        if (err) {
                            replydata = 'INSERT DataBase error';
                            console.log(replydata + ': ' + JSON.stringify(err));
                            res.send(replydata);
                        } else {
                            res.send('Register Success.');
                        }
                    })
                }
            }
        })
    } else if (url == 'chkuser') {
        var sql = 'SELECT * FROM member.info where UserName = ?;';
        conn.query(sql, [req.body.UserName], function (err, results, fidlds) {
            if (err) {
                console.log('select UserName error: ' + JSON.stringify(err));
                res.send('Username Input error.');
            } else {
                if (results[0]) {
                    if (req.body.UserName == results[0].UserName) {
                        res.send("Username can't use.");
                    } else {
                        res.send("Username can use.");
                    }
                } else {
                    res.send('Username can use.');
                }
            }
        })
    }
})
var y = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "public/image/member/upload/headshot");
    },
    filename: async function (req, file, cb) {
        fs.readdir('public/image/member/upload/headshot', function (err, data) {
            if (err) throw err;
            if (data[0]) {
                data.forEach( function (filename, index) {
                    data[index] = filename.split('.png')[0].split('_')[1];
                })
                data = data.sort(function(a, b){return a-b});
                var userFileName = `headshot_${Number(data[data.length - 1]) + 1}.png`;
            } else {
                var userFileName = `headshot_0.png`;
            }
            cb(null, userFileName);
        })
    }
})
var x = multer({ 
    storage: y,
    fileFilter: function(req, file, cb){
        if(file.mimetype != 'image/png'){
            return cb(new Error('檔案類型錯誤123'))
        }
        cb(null, true);
    }
});
app.post('/upload_headshot', x.single('headshot'), function (req, res) {
    res.send(req.file.path);
})