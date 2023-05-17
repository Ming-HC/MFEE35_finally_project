var express = require('express');
var app = express();
const conn = require('./database');
var crypto = require('crypto');
var fs = require('fs');
var multer = require('multer');
app.use(express.static('public'));
app.set('view engine', 'ejs')
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));

app.use(bodyParser.json());


// app.get('/iwant', function (req, res) {
//     // res.send('交換紀錄');
//     // res.sendFile(__dirname + '/index.html')
//     res.render('iwant', {
//         can1: '皮卡丘2',
//         bobo1: '烏龜2'
//     })
// });

// =======================================================================================================================================
// =======================================================================================================================================
// =======================================================================================================================================
// =======================================================================================================================================
// ================================================================個人檔案================================================================
app.get('/:user/personal', function (req, res) {
    if (req.session.user) {
        var user = req.params.user;
        var sql = 'SELECT * FROM membercenter.personal where username = ?';
        conn.query(sql, [user], function (err, results, fields) {
            if (err) {
                res.send('select发生错误', err);
            } else {
                res.render('personal', {
                    personal: results,
                });
            }
        });
    } else {
        res.send("error.404");
    }
});

app.post('/:user/personal', express.urlencoded(), function (req, res) {
    // console.log(req.body);
    // var req1=  Object.values(req.body);
    // console.log(req1);
    switch (req.body.judge) {
        case "name":
            // console.log(req.body.judge)
            var user = req.params.user;
            var sql = 'UPDATE membercenter.personal SET nickname = ? where username = ?';
            conn.query(sql, [req.body.name, user], function (err, results, fields) {
                if (err) {
                    console.error(err);
                    res.send('update發生錯誤');
                } else {
                    var sql2 = 'SELECT * FROM membercenter.personal where username = ?';
                    conn.query(sql2, [user], function (err, results, fields) {
                        if (err) {
                            res.send('select发生错误', err);
                        } else {
                            res.send(results[0].nickname);
                        }
                    });
                }
            });
            break;
        case "phone":
            // console.log(req.body.judge)
            var user = req.params.user;
            var sql = 'UPDATE membercenter.personal SET phone = ? where username = ?';
            conn.query(sql, [req.body.phone, user], function (err, results, fields) {
                if (err) {
                    console.error(err);
                    res.send('update發生錯誤');
                } else {
                    var sql2 = 'SELECT * FROM membercenter.personal where username = ?';
                    conn.query(sql2, [user], function (err, results, fields) {
                        if (err) {
                            res.send('select发生错误', err);
                        } else {
                            res.send(results[0].phone);
                        }
                    });
                }
            });
            break;
        case "mail":
            // console.log(req.body.judge)
            // console.log(req.body);
            var user = req.params.user;
            var sql = 'UPDATE membercenter.personal SET mail = ? where username = ?';
            conn.query(sql, [req.body.mail, user], function (err, results, fields) {
                if (err) {
                    console.error(err);
                    res.send('update發生錯誤');
                } else {
                    var sql2 = 'SELECT * FROM membercenter.personal where username = ?';
                    conn.query(sql2, [user], function (err, results, fields) {
                        if (err) {
                            res.send('select发生错误', err);
                        } else {
                            res.send(results[0].mail);
                            console.log(results);
                        }
                    });
                }
            });
            break;
        case "gender":
            // console.log(req.body.judge)
            // console.log(req.body);
            var user = req.params.user;
            var sql = 'UPDATE membercenter.personal SET gender = ? where username = ?';
            conn.query(sql, [req.body.gender, user], function (err, results, fields) {
                if (err) {
                    console.error(err);
                    res.send('update發生錯誤');
                } else {
                    var sql2 = 'SELECT * FROM membercenter.personal where username = ?';
                    conn.query(sql2, [user], function (err, results, fields) {
                        if (err) {
                            res.send('select发生错误', err);
                        } else {
                            res.send(results[0].gender);
                            console.log(results);
                        }
                    });
                }
            });
            break;
        case "birth":
            // console.log(req.body.judge)
            // console.log(req.body);
            var user = req.params.user;
            var sql = 'UPDATE membercenter.personal SET birth = ? where username = ?';
            conn.query(sql, [req.body.birth, user], function (err, results, fields) {
                if (err) {
                    console.error(err);
                    res.send('update發生錯誤');
                } else {
                    var sql2 = 'SELECT * FROM membercenter.personal where username = ?';
                    conn.query(sql2, [user], function (err, results, fields) {
                        if (err) {
                            res.send('select发生错误', err);
                        } else {
                            res.send(results[0].birth);
                            console.log(results);
                        }
                    });
                }
            });
            break;
    }
});

// =======================================================================================================================================
// =======================================================================================================================================
// =======================================================================================================================================
// =======================================================================================================================================
// ================================================================更新密碼================================================================
app.get('/:user/password', function (req, res) {
    var user = req.params.user;
    if (req.session.user) {
        var sql = 'SELECT * FROM membercenter.personal where username = ?'
        conn.query(sql, [user],
            function (err, results, fields) {
                if (err) {
                    res.send('update發生錯誤', err);
                } else {
                    // console.log('success');
                    res.render('password', {
                        user: user,
                        personal: results
                    })
                }
            });
    } else {
        res.send("error.404");
    }
});
app.post('/:user/password', function (req, res) {
    var user = req.params.user;
    var oldPassword = req.body.oldPassword;
    var Password = req.body.Password;
    var sql = 'SELECT * FROM membercenter.personal where username = ? AND Password = ?';
    conn.query(sql, [user, oldPassword], function (err, result) {
        if (err) {
            res.send('更新密碼發生錯誤', err);
        } else if (result.length == 0) {
            // 如果舊密碼錯誤，返回錯誤訊息
            res.send("<script>alert('舊密碼錯誤');window.location.href='/" + user + "/password'</script>");
        } else {
            // 如果舊密碼正確，更新新密碼
            var sql = 'UPDATE membercenter.personal SET Password = ? where username = ?';
            conn.query(sql, [Password, user], function (err, result) {
                if (err) {
                    res.send('更新密碼發生錯誤', err);
                } else {
                    // res.redirect('/personal/' + user);
                    res.send("<script>alert('密码更新成功！');window.location.href='/" + user + "/personal'</script>");
                }
            });
        }
    });
});
// =======================================================================================================================================
// =======================================================================================================================================
// =======================================================================================================================================
// =======================================================================================================================================
// ==========================================================我的物品(上傳)================================================================
app.get('/:user/puton', function (req, res) {
    if (req.session.user) {
        var user = req.params.user;
        var sql = 'SELECT * FROM la2.product';
        conn.query(sql, function (err, results, fields) {
            if (err) {
                res.send('select发生错误', err);
            } else {
                // console.log(results)
                res.render('puton', {
                    user: user,
                    puton: results
                });
            }
        });
    } else {
        res.send("error.404");
    }
});

var z1 = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "public/image/Myproduct/upload");
    },
    filename: function (req, file, cb) {
        fs.readdir('public/image/Myproduct/upload', function (err, data) {
            if (err) throw err;
            if (data[0]) {
                data.forEach(function (filename, index) {
                    data[index] = filename.split('.jpg')[0].split('_')[1];
                })
                data = data.sort(function (a, b) { return a - b });
                var userFileName = `productimage_${Number(data[data.length - 1]) + 1}.jpg`;
            } else {
                var userFileName = `productimage_0.jpg`;
            }
            cb(null, userFileName);
        })
    }
})

var z2 = multer({
    storage: z1,
    fileFilter: function (req, file, cb) {
        if (file.mimetype != 'image/png' && file.mimetype !== 'image/jpeg') {
            return cb(new Error('檔案類型錯誤'));
        }
        cb(null, true);
    }
});



app.post('/:user/puton', z2.single('productimage'), function (req, res) {
    var user = req.params.user;
    // console.log(req.file)
    // console.log(req.body.productname)
    // console.log(req.body.productdetail)
    // console.log(req.body.district)
    // console.log(req.body.city)
    // console.log(user)

    var sql = 'INSERT INTO la2.product(product_image, product_name, product_detail, city, user_name) VALUES (?,?,?,?,?)'
    conn.query(sql, ['../image/Myproduct/upload/' + req.file.filename, req.body.productname, req.body.productdetail, req.body.city, user], function (err, results, fields) {
        if (err) {
            res.send('上架商品發生錯誤', err.message);
        } else {
            res.send("<script>alert('上傳成功！');window.location.href='/" + user + "/puton'</script>");
        }
    })
})
// =======================================================================================================================================
// =======================================================================================================================================
// =======================================================================================================================================
// =======================================================================================================================================
// ===========================================================我的物品=====================================================================

app.get('/:user/MYproduct', function (req, res) {
    if (req.session.user) {
        var user = req.params.user;
        var sql = 'SELECT product_id, product_image, product_name, product_detail, city, DATE_FORMAT(lunch_date, "%Y-%m-%d %H:%i:%s") AS lunch_date_formatted FROM la2.product WHERE user_name = ?';
        conn.query(sql, [user], function (err, results, fields) {
            if (err) {
                res.send('select发生错误', err);
            } else {
                res.render('MYproduct', {
                    user: user,
                    MYproduct: results
                });
            }
        });
    } else {
        res.send("error.404");
    }
});
app.delete('/:user/MYproduct', function (req, res) {
    var user = req.params.user;
    // console.log(req.body);
    var sql = "DELETE FROM la2.product WHERE product_id = ?;";
    conn.query(sql, [req.body.product_id], function (err, results, fields) {
        if (err) {
            res.send('刪除商品發生錯誤', err.message)
        }
        else {
            res.send("刪除成功");
            // res.redirect('/' + user + '/MYproduct');
        }
    });

})



// =======================================================================================================================================
// =======================================================================================================================================
// =======================================================================================================================================
// =======================================================================================================================================
// ================================================================與我交換================================================================
app.get('/:user/iwant', function (req, res) {
    user = req.params.user
    sql = 'select * from membercenter.bwc where BWC_user_name = ?'
    conn.query(sql, [user], function (err, results, fields) {
        if (err) {
            res.send("err", err.message)
        } else {
            // console.log(results);
            if (results.length == 0) {
                res.render('iwant', {
                    iwant: "nothing",
                })
            } else {
                res.render('iwant', {
                    iwant: results,
                    // data
                })
            }
        }
    });
})
app.get('/:user/withme', function (req, res) {
    user = req.params.user
    sql = 'select * from membercenter.bwc where WC_user_name = ?'
    conn.query(sql, [user], function (err, results, fields) {
        if (err) {
            res.send("err")
        } else {
            // var data = { message: 'Hello from backend!' };
            if (results.length == 0) {
                res.render('withme', {
                    withme: "nothing",
                })
            } else {
                res.render('withme', {
                    withme: results,
                    user: user
                    // data
                })
            }
        }
    });
})
app.post('/:user/withme', function (req, res) {
    user = req.params.user
    // console.log(req.body);
    sql = 'INSERT INTO membercenter.record(memberid, product, id2, product2) VALUES (?,?,?,?)'
    conn.query(sql, [req.body.BWC_user_name, req.body.BWC_product_name, req.body.WC_user_name, req.body.WC_product_name], function (err, results, fields) {
        if (err) {
            res.send(err.message)
            console.log('交易失敗');
        } else {
            sql2 = 'DELETE from membercenter.bwc where id = ?'
            conn.query(sql2, [req.body.id], function (err, results, fields) {
                if (err) {
                    res.send("err")
                } else {
                    // console.log('交易成功');
                    res.send("<script>alert('交易成功！');window.location.href='/" + user + "/withme'</script>");
                }
            })
        }
    })
})

// =======================================================================================================================================
// =======================================================================================================================================
// =======================================================================================================================================
// =======================================================================================================================================
// ================================================================交易紀錄================================================================
app.get('/:user/record', function (req, res) {
    if (req.session.user) {
        var user = req.params.user;
        var sql = "SELECT memberid, product, product2, success, DATE_FORMAT(time, '%Y/%m/%d %H:%i')time FROM membercenter.record WHERE id2 = ?;"
        conn.query(sql, [user], function (err, results, fields) {
            // console.log(results);
            if (err) {
                res.send('select發生錯誤', err);
            } else {
                res.render('record', { record: results });
            }
        })
    } else {
        res.send("error.404");
    }
})
// =======================================================================================================================================
// =======================================================================================================================================
// =======================================================================================================================================
// =======================================================================================================================================
// ==================================================================登出(還在施工)========================================================
app.get('/logout', function (req, res) {
    req.session.user = null
    res.send("<script>alert('已登出！');window.location.href='/member/login'</script>");
})
