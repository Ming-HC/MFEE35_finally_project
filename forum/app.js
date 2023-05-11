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
        maxAge: 300 * 1000       // 7 Days = 604800 Secs
    }
}))

var mysql = require('mysql');
const { render } = require('ejs');
var conn = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'P@ssw0rd',
    port: '3306',
    multipleStatements: true
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

app.get('/', function (req, res) {
    res.redirect('forum');
})

app.get('/navbar_headshot', function (req, res) {
    if (req.session.user) {
        var sql = `SELECT * FROM member.info WHERE username = ?`;
        conn.query(sql, [req.session.user.account], function (err, results, fields) {
            if (err) {
                console.log('select headshot error:', err);
                res.send("err");
            } else {
                res.send(results[0]);
            }
        })
    }
})
app.get('/member', function (req, res) {
    if (req.session.user) {
        res.send(req.session.user);
    } else {
        res.redirect('member/login');
    }
})
app.get('/member/:url', function (req, res) {
    if (req.session.user) {
        res.render('login_register', {
            page: 'login_register',
            memger: req.session.user.account,
            url: 'logined'
        })
    } else {
        if (req.params.url == 'login' || req.params.url == 'register') {
            res.render('login_register', {
                page: 'login_register',
                member: 'login',
                url: req.params.url
            })
        }
    }
})

app.post('/member/:url/memberchk', express.urlencoded(), function (req, res) {
    var url = req.params.url;
    if (url == 'login') {
        var sql = 'SELECT * FROM member.info where username = ?;';
        conn.query(sql, [req.body.username, req.body.password], function (err, results, fidlds) {
            if (err) {
                console.log('select username error: ' + JSON.stringify(err));
                res.send('username or password Input error.');
            } else {
                if (results[0]) {
                    if (req.body.username == results[0].username) {
                        if (req.body.password == results[0].password) {
                            var d = new Date();
                            d.setHours(d.getHours() + 8);
                            req.session.user = {
                                'account': req.body.username,
                                'logined_at': d,
                                'headshot': results[0].headshot
                            }
                            console.log('User: ' + req.body.username + ', logined_at: ' + d.toISOString().replace('T', ' ').substr(0, 19));
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
        conn.query(sql, [req.body.username], function (err, results, fidlds) {
            if (err) {
                var replydata = 'select UserName error';
                console.log(replydata + ': ' + JSON.stringify(err));
                res.send(replydata);
            } else {
                if (results[0]) {
                    if (req.body.username == results[0].username) {
                        res.send('Username already Register.');
                    }
                } else {
                    sql = "INSERT INTO member.info (username, password, headshot) VALUES (?, ?, ?);";
                    conn.query(sql, [req.body.username, req.body.password, req.body.headshot],
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
        var sql = 'SELECT * FROM member.info where username = ?;';
        conn.query(sql, [req.body.username], function (err, results, fidlds) {
            if (err) {
                console.log('select Username error: ' + JSON.stringify(err));
                res.send('Username Input error.');
            } else {
                if (results[0]) {
                    if (req.body.username == results[0].username) {
                        res.send("Username can't use.");
                    } else {
                        res.send("Username can use.");
                    }
                } else {
                    res.send('Username can use.');
                }
            }
        })
    } else if (url == 'thirdlogin') {
        var select_member_sql = `select * from member.info where thirdtoken = ?`;
        conn.query(select_member_sql, [req.body.thirdtoken], (err, results, fields) => {
            if (err) {
                console.log(err);
            } else {
                if (results[0]) {
                    if (req.body.thirdtoken == results[0].thirdtoken) {
                        var d = new Date();
                        d.setHours(d.getHours() + 8);
                        req.session.user = {
                            'account': results[0].username,
                            'logined_at': d,
                            'headshot': results[0].headshot
                        }
                        console.log('User: ' + results[0].username + ', logined_at: ' + d.toISOString().replace('T', ' ').substr(0, 19));
                        res.send(req.session.user);
                    } else {
                        res.send('Google Login error.');
                    }
                } else {
                    // 未註冊過 > 註冊+登入
                    var select_userN_sql = `SELECT username from member.info;`;
                    conn.query(select_userN_sql, (err, results, fields) => {
                        if (err) {
                            console.log("select username err:", err);
                        } else {
                            const characters = 'abcdefghijklmnopqrstuvwxyz0123456789';
                            var randomuser = "";
                            randomuserF();
                            function randomuserF() {
                                var randomstr = [];
                                for (let i = 0; i < 12; i++) {
                                    var randomindex = Math.floor(Math.random() * 36);
                                    randomstr.push(characters.charAt(randomindex));
                                }
                                randomuser = randomstr.join("");
                                chkuser();
                            }
                            function chkuser() {
                                for (let i = 0; i < results.length; i++) {
                                    if (randomuser == results[i].username) {
                                        randomuserF();
                                        break;
                                    }
                                }
                            }
                            var third_register_member_sql = `INSERT INTO member.info (username, nickname, headshot, email, submitfrom, thirdtoken) VALUES (?, ?, ?, ?, ?, ?);`;
                            var third_login_member_sql = `select * from member.info where thirdtoken = ?`;
                            conn.query(third_register_member_sql + third_login_member_sql, [randomuser, req.body.nickname, req.body.headshot, req.body.email, req.body.submitfrom, req.body.thirdtoken, req.body.thirdtoken], (err, results, fields) => {
                                if (err) {
                                    console.log("submit third member err:", err);
                                } else {
                                    if (results[1]) {
                                        if (req.body.thirdtoken == results[1][0].thirdtoken) {
                                            var d = new Date();
                                            d.setHours(d.getHours() + 8);
                                            req.session.user = {
                                                'account': results[1][0].username,
                                                'logined_at': d,
                                                'headshot': results[1][0].headshot
                                            }
                                            console.log('User: ' + results[1][0].username + ', logined_at: ' + d.toISOString().replace('T', ' ').substr(0, 19));
                                            res.send(req.session.user);
                                        } else {
                                            res.send('Google Login error.');
                                        }
                                    } else {
                                        console.log('third member select err:', err);
                                        res.send('Google Login error.');
                                    }
                                }
                            })
                        }
                    })
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
                data.forEach(function (filename, index) {
                    data[index] = filename.split('.png')[0].split('_')[1];
                })
                data = data.sort(function (a, b) { return a - b });
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
    fileFilter: function (req, file, cb) {
        if (file.mimetype != 'image/png') {
            return cb(new Error('檔案類型錯誤123'))
        }
        cb(null, true);
    }
});
app.post('/upload_headshot', x.single('headshot'), function (req, res) {
    res.send(req.file.path);
})

app.get('/forum/:class(all|complex|gossip|ask|system|delete)?/:page(\\d+)?', function (req, res) {
    var targetpage = req.params.page ? req.params.page : 1;
    var sql = `SELECT * FROM forum.postlist where post_exists = 1;`;
    conn.query(sql, function (err, results, fields) {
        if (err) {
            console.log("select forum.postlist err:", err);
        } else {
            if (targetpage > 0 && targetpage <= Math.ceil(results.length / 20) || results.length == 0) {
                if (req.session.user) {
                    res.render('forum', {
                        page: 'forum',
                        member: req.session.user.account,
                    });
                } else {
                    res.render('forum', {
                        page: 'forum',
                        member: 'login'
                    });
                }
            } else {
                res.send("404 error");
            }
        }
    })
})

app.get('/forum/view/newpost', function (req, res) {
    if (req.session.user) {
        res.render('newpost', {
            page: 'newpost',
            member: req.session.user.account
        });
    } else {
        res.redirect('http://localhost/member/login');
    }
})


app.get('/forum(/:class)?/:page/getpost', function (req, res) {
    var targetpage = req.params.page;
    var classname = req.params.class ? req.params.class : "all";
    var select_classname_sql = `select class_name from forum.class where class_name_eng = '${classname}';`;
    conn.query(select_classname_sql, function (err, results, fields) {
        if (err) {
            console.log("select class name error:", err);
        } else {
            var targetclass = results[0].class_name == "全部主題" ? null : results[0].class_name;
            var exists = targetclass == "回收區" ? 1 : 0;
            var get_limitpost_sql = `select * , DATE_FORMAT(latestReply_time, '%Y/%m/%d %H:%i') latestReply_time_format FROM forum.postlist ${targetclass ? "where class_name = " + "'" + targetclass + "' and post_exists = " + !exists + " " : "where class_name != '回收區' and post_exists = " + !exists + " "}ORDER BY latestReply_time DESC LIMIT ${(targetpage - 1) * 20}, 20;`;
            var get_allpost_sql = `select * FROM forum.postlist${targetclass ? " where class_name = " + "'" + targetclass + "' and post_exists = " + !exists : " where class_name != '回收區' and post_exists = " + !exists};`;
            conn.query(get_limitpost_sql + get_allpost_sql,
                function (err, results, fields) {
                    if (err) {
                        res.send('select error', err);
                    } else {
                        if (!exists) {
                            var dataToWeb = {
                                postlist: results[0],
                                page: Math.ceil(results[1].length / 20)
                            }
                            res.json(dataToWeb);
                        } else {
                            for (let i = 0; i < results[0].length; i++) {
                                results[0][i].title = "首篇已刪";
                                results[0][i].content = `此文章已由原作者(${results[0][i].user})刪除。`;
                            }
                            var dataToWeb = {
                                postlist: results[0],
                                page: Math.ceil(results[1].length / 20)
                            }
                            res.json(dataToWeb);
                        }

                    }
                })
        }
    })

})

app.get('/forum/editpost/:id/:floor', function (req, res) {
    if (req.session.user) {
        res.render('editpost', {
            page: 'editpost',
            member: req.session.user.account
        });
    } else {
        res.redirect('http://localhost/member/login');
    }
})
app.get('/forum/editpost/:id/:floor/getdata', function (req, res) {
    if (req.session.user) {
        var post_id = req.params.id;
        var floor = req.params.floor;
        var sql = `SELECT * FROM forum.post_${post_id} where reply_floor ${floor == 1 ? "= "+floor+";" : "in (1, "+floor+");"}`;
        conn.query(sql, function (err, results, fields) {
            if (err) {
                console.log("select postid err", err);
                res.send("select post error");
            } else {
                res.json(results);
            }
        })
    } else {
        res.redirect('http://localhost/member/login');
    }
})
app.put('/forum/editpost/:id/:floor/edit', express.urlencoded(), function (req, res) {
    var post_id = req.params.id;
    var floor = req.params.floor;
    if (req.body.content.length > 50) {
        var postlist_content = req.body.content.slice(0, 50);
    } else {
        var postlist_content = req.body.content;
    }
    if (req.session.user) {
        if (floor == 1) {
            var update_post_sql = `update forum.post_${post_id} set class_name = ?, title = ?, content = ? where reply_floor = ${floor};`;
            var update_postlist_sql = `update forum.postlist set class_name = ?, title = ?, content = ? where post_id = ${post_id};`
            conn.query(update_post_sql + update_postlist_sql, [req.body.class, req.body.title, req.body.content, req.body.class, req.body.title, postlist_content], function (err, results, fields) {
                if (err) {
                    console.log("update post error:", err);
                    res.send("update post error");
                } else {
                    res.send("update post success");
                }
            })
        } else {
            var update_post_sql = `update forum.post_${post_id} set content = ? where reply_floor = ${floor};`;
            var update_postlist_sql = `update forum.postlist set content = ? where post_id = ${post_id};`
            conn.query(update_post_sql + update_postlist_sql, [req.body.content, postlist_content], function (err, results, fields) {
                if (err) {
                    console.log("update post error:", err);
                    res.send("update post error");
                } else {
                    res.send("update post success");
                }
            })
        }
        
    } else {
        res.redirect('http://localhost/member/login');
    }
})
app.post('/forum(/:class)?/getclass', express.urlencoded(), function (req, res) {
    var sql = "select class_name_eng, class_name FROM forum.class;";
    if (req.body.from) {
        conn.query(sql,
            function (err, results, fields) {
                if (err) {
                    res.send('select error', err);
                } else {
                    if (req.session.user.account == 'root') {
                        var limitclass = [];
                        for (let i = 1; i <= 4; i++) {
                            limitclass.push(results[i]);
                        }
                        res.json({ results: limitclass, logined_user: req.session.user.account });
                    } else {
                        var limitclass = [];
                        for (let i = 1; i <= 3; i++) {
                            limitclass.push(results[i]);
                        }
                        res.json({ results: limitclass, logined_user: req.session.user.account });
                    }
                }
            })
    } else {
        conn.query(sql,
            function (err, results, fields) {
                if (err) {
                    res.send('select error', err);
                } else {
                    res.json(results);
                }
            })
    }
})

app.post('/forum/newpost/:something', express.urlencoded(), function (req, res) {
    if (req.session.user) {
        if (req.params.something == 'new') {
            if (req.body.content.length > 50) {
                var postlist_content = req.body.content.slice(0, 50);
            } else {
                var postlist_content = req.body.content;
            }
            var create_postlist_sql = `insert into forum.postlist(class_name, title, content, user) values (?, ?, ?, ?);`;
            var checkdata = {
                flag: false,
                post_id: ""
            };
            conn.query(create_postlist_sql,
                [req.body.class_name, req.body.title, postlist_content, req.body.member],
                function (err, results, fields) {
                    if (err) {
                        res.send('select error', err);
                    } else {
                        checkdata.flag = true;
                        checkdata.post_id = results.insertId
                        if (checkdata.flag) {
                            var create_post_sql = `
                        create table forum.post_${checkdata.post_id} (
                            reply_floor int not null AUTO_INCREMENT,
                            class_name varchar(20) default null,
                            title varchar(40) default null,
                            user varchar(20) not null,
                            imageurl varchar(50) default null,
                            content varchar(1000) not null,
                            likes int(10) default 0,
                            post_time timestamp default now(),
                            floor_exists int default 1,
                            primary key (reply_floor),
                            foreign key (class_name) references class(class_name)
                            );
                        `;
                            var select_headshot_sql = `SELECT * FROM member.info WHERE username = ?;`;
                            conn.query(create_post_sql + select_headshot_sql, [req.session.user.account], function (err, results, fields) {
                                if (err) {
                                    console.log('select error', err);
                                    res.send('select error', err);
                                } else {
                                    var insert_post_sql = `INSERT INTO forum.post_${checkdata.post_id} (class_name, title, content, user) values (?, ?, ?, ?);`
                                    conn.query(insert_post_sql, [req.body.class_name, req.body.title, req.body.content, req.body.member],
                                        function (err, results, fields) {
                                            if (err) {
                                                console.log('insert into error:', err);
                                                res.send('insert into error:', err);
                                            } else {
                                                res.redirect('/forum');
                                            }
                                        })
                                }
                            })
                        } else {
                            res.send('insert postlist done, but create post table wrong.');
                        }
                    }
                }
            )
        }
    } else {
        res.redirect('http://localhost/member/login');
    }
})

app.get('/forum/post/:id', function (req, res) {
    if (req.session.user) {
        res.render('post', {
            page: 'post',
            member: req.session.user.account
        });
    } else {
        res.render('post', {
            page: 'post',
            member: 'login'
        });
    }
})

app.get('/forum/post/:id/getdata', function (req, res) {
    var post_id = req.params.id;
    var sql = `SELECT *, DATE_FORMAT(post_time, '%Y/%m/%d %H:%i') post_time_format FROM forum.post_${post_id}`;
    conn.query(sql, function (err, results, fields) {
        if (err) {
            console.log('Get Post page error:', err);
            res.send('select err', err);
        } else {
            for (let i = 0; i < results.length; i++) {
                if (!results[i].floor_exists) {
                    if (i == 0) {
                        results[i].title = "首篇已刪";
                        results[i].content = `此文章已由原作者(${results[i].user})刪除。`;
                    } else {
                        results[i].content = `此回覆已由原作者(${results[i].user})刪除。`;
                    }
                }
            }

            var selecttarget = [];
            for (let i = 0; i < results.length; i++) {
                selecttarget.push(results[i].user)
            }
            var select_member_headshot_sql = `SELECT username, headshot FROM member.info WHERE username in (?);`;
            conn.query(select_member_headshot_sql, [selecttarget], (err, results_headshot, fields) => {
                if (err) {
                    console.log("select member headshot err:", err);
                } else {
                    for (let i = 0; i < results.length; i++) {
                        for (let o = 0; o < results_headshot.length; o++) {
                            if (results[i].user == results_headshot[o].username) {
                                results[i].headshot = results_headshot[o].headshot;
                                break;
                            }
                        }
                    }
                    res.json(results);
                }
            })

            var select_post_views_sql = `SELECT views FROM forum.postlist where post_id = ${post_id};`;
            conn.query(select_post_views_sql, function (err, results, fields) {
                if (err) {
                    console.log("select_post_views error:", err);
                } else {
                    var add_post_views_sql = `UPDATE forum.postlist set views = ? where post_id = ${post_id};`;
                    conn.query(add_post_views_sql, [results[0].views + 1], function (err, results, fields) {
                        if (err) {
                            console.log("update post views error", err);
                        } else {
                        }
                    })
                }
            })

        }
    })
})
app.post('/forum/post/:id/reply', express.urlencoded(), function (req, res) {
    var post_id = req.params.id;
    var sql = `INSERT INTO forum.post_${post_id}(user, content) values(?, ?);`;
    conn.query(sql, [req.body.user, req.body.content], function (err, results, fields) {
        if (err) {
            console.log("reply post error", err);
            res.send("reply post error");
        } else {
            var select_latestreply_sql = `select user, post_time from forum.post_${post_id} ORDER BY post_time desc;`;
            conn.query(select_latestreply_sql, function (err, results, fields) {
                if (err) {
                    console.log("search latestreply err:", err);
                    res.send("search latestreply error");
                } else {
                    var update_latestreply_sql = `update forum.postlist set reply = ?, latestReply_user = ?, latestReply_time  = ? where post_id = ${post_id};`;
                    conn.query(update_latestreply_sql, [results.length - 1, results[0].user, results[0].post_time], function (err, results, fields) {
                        if (err) {
                            console.log("update_latestreply err:", err);
                            res.send("update_latestreply err");
                        } else {
                            res.send("reply post success.");
                        }
                    })
                }
            })
        }
    })
})

app.put('/forum/deletepost/:id/:floor', function (req, res) {
    var post_id = req.params.id;
    var floor = req.params.floor;
    if (req.session.user) {
        var delete_reply_sql = `UPDATE forum.post_${post_id} set floor_exists = 0 where reply_floor = ${floor};`;
        if (floor != 1) {
            conn.query(delete_reply_sql, (err, results, fields) => {
                if (err) {
                    console.log("update floor exists error:", err);
                } else {
                    res.send("delete success.");
                }
            })
        } else if (floor == 1) {
            conn.query(delete_reply_sql, (err, results, fields) => {
                if (err) {
                    console.log("update floor_1 exists error:", err);
                } else {
                    var delete_post_sql = `UPDATE forum.postlist set post_exists = 0, class_name = '回收區' where post_id = ${post_id};`;
                    conn.query(delete_post_sql, (err, results, fields) => {
                        if (err) {
                            console.log("update exists and class of postlist error:", err);
                        } else {
                            res.send("delete success");
                        }
                    })
                }
            })
        }
    } else {
        res.send("you are not login.");
    }
})

app.post('/forum/search', express.urlencoded(), (req, res) => {
    switch (req.body.select_target) {
        case "all":
            var search_sql = `SELECT * from forum.postlist where post_exists = 1 and (title like '%${req.body.select_content}%' or content like '%${req.body.select_content}%' or user like '%${req.body.select_content}%') ORDER BY latestReply_time DESC LIMIT 0, 20;`;
            conn.query(search_sql, (err, results, fields) => {
                if (err) {
                    console.log("search err:", err);
                } else {
                    console.log(results);
                    res.send(results);
                }
            })
            break;
        case "title":
            var search_sql = `SELECT * from forum.postlist where post_exists = 1 and title like '%${req.body.select_content}%' ORDER BY latestReply_time DESC LIMIT 0, 20;`;
            conn.query(search_sql, (err, results, fields) => {
                if (err) {
                    console.log("search err:", err);
                } else {
                    console.log(results);
                    res.send(results);
                }
            })
            break;
        case "content":
            var search_sql = `SELECT post_id from forum.postlist;`;
            // 先搜出所有文章id 再去各文章搜尋內文 紀錄符合的文章id 再select postlist 符合的文章id 傳送至前端
            break;
    }
})