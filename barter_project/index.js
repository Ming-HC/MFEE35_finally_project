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
app.use(express.static('public'));
app.set('view engine', 'ejs')
app.use(express.urlencoded({ extended: true }));
app.use(express.json());


// 引用檔案
const conn = require('./routers/database');


app.listen(80, function () {
    console.log('Server Running.');
})

// navbar_headshot
app.get('/navbar_headshot', function (req, res) {
    if (req.session.user) {
        var sql = `SELECT * FROM membercenter.personal WHERE username = ?`;
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

// Router
const forumRouter = require('./routers/forum');
app.use('/forum', forumRouter);

// =======================================================================================================================================
// =======================================================================================================================================
// =======================================================================================================================================
// =======================================================================================================================================
// ==================================================================首頁==================================================================
app.get('/', (req, res) => {
    if (req.session.user) {
        res.render('index', {
            member: req.session.user.account + "/personal"
        });
    } else {
        res.render('index', {
            member: 'login'
        });
    }
})
app.get('/api/data', (req, res) => {
    //使用 app.get() 方法註冊一個 GET 路由，用於處理客戶端發送到 /api/data 路徑的 GET 請求
    //當你收到一個 HTTP 請求時，你需要使用 res 這個對象來構建和發送一個 HTTP 回應給客戶端。
    //req 這個對象來接收和解析客戶端發送的請求。然後，你會使用 res 這個對象來構建一個回應，包括設定狀態碼、回應頭部以及傳回的資料 
    connection.query('SELECT * FROM items.items', (err, results, fields) => {
        //connection.query() 方法向 MySQL 資料庫發送一個 SQL 查詢語句。
        if (err) {
            res.status(500).json({ error: 'Error fetching data from the database' });
            return;
        }
        res.json(results);
        // 如果沒有錯誤發生（即 err 不存在），程序會執行到這一行。這行代碼會把數據庫查詢結果 results 作為 JSON 格式發送給客戶端。

    });
});
//err：操作失敗時的錯誤訊息，如果操作成功，則為 null 或 undefined。
//results：從資料庫中獲取的資料。
//fields：查詢結果中每個字段的附加資訊。


// ------------------------------------------商品-----------------------------------------------------------------
// ------------------------------------------商品-----------------------------------------------------------------

// 測試 開一個網址丟資料庫資料上去，再用別的網頁從這網址載入資料
app.get('/productList', function (req, res) {
    var sql = "SELECT product_id, product_name, product_image , user_name, city , DATE_FORMAT(lunch_date, '%Y/%m/%d %H:%i')lunch_date FROM product_page.product ORDER BY lunch_date DESC;";
    conn.query(sql,
        function (err, results, fields) {
            // console.log(results);
            if (err) {
                res.send('select發生錯誤', err);
            } else {
                res.json(results);
            }
        })
})

// 商品主頁
app.get('/product(/:page)?', function (req, res) {
    if (req.session.user) {
        res.render('product', {
            // 傳入product.ejs 供head.ejs使用的變數
            page: 'product',
            link: 1,
            member: req.session.user.account + "/personal",
        })
    } else {
        res.render('product', {
            // 傳入product.ejs 供head.ejs使用的變數
            page: 'product',
            link: 1,
            member: 'login',
        })
    }

})


// 商品名搜尋資料
app.get('/product/Search/Search', function (req, res) {
    var sql = "SELECT product_id, product_name, product_image , user_name, city , DATE_FORMAT(lunch_date, '%Y/%m/%d %H:%i')lunch_date FROM product_page.product WHERE product_name LIKE ?";
    var data = [`%${req.query.product_name}%`];
    // console.log(data);
    conn.query(sql, data,
        function (err, results, fields) {
            // console.log(results);
            if (err) {
                res.send('select發生錯誤', err);
            } else {
                console.log(data)
                // console.log(results)
                res.json(results);
            }
        })
    // console.log(req.query.product_name)
    // res.send('XD');
})

// 地區搜尋商品
app.get('/product/citySearch/citySearch', function (req, res) {
    var length = req.query.city.length;
    var array = req.query.city;
    // 用字串組合法解決
    // if(length !== 0){
    //     var data= '';

    //     var i=0;
    //     if(length == 1){
    //         // var data = [`${array[0]}`];
    //         data = `('${array[0]}')`;
    //         console.log(data);
    //     }else{
    //          data="(";
    //         for(i=0;i<length;i++){
    //             // console.log(array.length);
    //             data+=`"${array[i]}"`+",";
    //         }
    //         data = data.slice(0, -1)+")";
    //         console.log(data);
    //     }
    //     // console.log([`%${data}%`]);
    //     // data = `%${data}%`;
    // }
    // 用(?)解決 可以直接丟陣列進去
    if (length !== 0) {
        var data = array
        sql = "SELECT product_id, product_name, product_image , user_name, city , DATE_FORMAT(lunch_date, '%Y/%m/%d %H:%i')lunch_date FROM product_page.product WHERE city IN (?)";
        // console.log(data);
    }

    conn.query(sql, [data],
        function (err, results, fields) {
            // console.log(results);
            if (err) {
                res.send('select發生錯誤', err);
            } else {
                // console.log(data)
                res.json(results);
            }
        })

})





// 商品詳細頁面接收的資料來源
app.get('/product/:product_detail/detail/product_detail', function (req, res) {
    var sql = "SELECT product_id, product_name, product_image , user_name, city , user_image , product_detail , DATE_FORMAT(lunch_date, '%Y/%m/%d %H:%i')lunch_date , method FROM product_page.product WHERE product_id = ?";
    var data = [req.params.product_detail];
    conn.query(sql, data,
        function (err, results, fields) {
            // console.log(results);
            if (err) {
                res.send('select發生錯誤', err);
            } else {
                //     res.render('product_detail',{
                //     page: 'product_detail',
                //     proid: req.params.product_detail,
                //     sqlresults: JSON.stringify(results)
                // })
                // console.log(data);
                // 回傳資藥庫選出來的符合點選商品ID的資料
                res.json(results[0]);
            }
        })
})

// 商品詳細頁面    
app.get('/product/:product_detail/detail', function (req, res) {
    if (req.session.user) {
        res.render('product_detail', {
            // 傳入product.ejs 供head.ejs使用的變數
            page: 'product_detail',
            link: 1,
            member: req.session.user.account + "/personal",
            proid: req.params.product_detail
        })
    } else {
        res.render('product_detail', {
            // 傳入product.ejs 供head.ejs使用的變數
            page: 'product_detail',
            link: 1,
            member: 'login',
            proid: req.params.product_detail
        })
    }

})



// 登入者去抓取可以交換的商品資料
app.post('/product/:product_detail/detail/product_detail', function (req, res) {
    var sql = "SELECT product_image , product_name , product_id , DATE_FORMAT(lunch_date, '%Y/%m/%d %H:%i')lunch_date FROM product_page.product WHERE user_name = ?";
    var data = req.body.user_name;
    // console.log(data)
    conn.query(sql, data, function (err, results, fields) {
        if (err) {
            res.send('select發生錯誤', err);
        } else {
            // console.log(data)
            res.json(results);
        }
    }

    )





})

// 我要交換送出後
// 要將送來的兩個商品ID分別從商品表搜尋出來，並分別輸入到BWC表中的BWC跟WC欄位選項
app.post('/product/member/wannaChange', function (req, res) {
    var insertid = req.body.wannaChange[0];
    var updateid = req.body.wannaChange[1];
    var sqlinsert = `INSERT INTO product_page.bwc (BWC_user_name, BWC_product_id, BWC_product_name, BWC_product_image, BWC_city, BWC_lunch_date, BWC_method ) SELECT user_name , product_id , product_name , product_image , city , lunch_date , method FROM product_page.product WHERE product_id = ${insertid};`;
    var updatesql = `UPDATE product_page.bwc INNER JOIN product_page.product ON product_page.product.product_id = ${updateid} SET bwc.WC_user_name = product.user_name, bwc.WC_product_id = product.product_id, bwc.WC_product_name = product.product_name, bwc.WC_product_image = product.product_image, bwc.WC_city = product.city, bwc.WC_lunch_date = product.lunch_date , bwc.WC_method = product.method WHERE product_page.bwc.BWC_product_id = ${insertid};`;
    // console.log(sqlinsert+updatesql)
    // console.log(updatesql)
    conn.query(sqlinsert + updatesql, function (err, results, fields) {
        if (err) {
            res.send('select發生錯誤', err);
        } else {
            console.log(results)
            res.json(results);
        }
    })
})


// 想與我交換
// 顯示想與此商品交換的會員資料
app.post('/product/WCPinfo', function (req, res) {
    var sql = "SELECT BWC_user_name,BWC_product_id,BWC_product_name,BWC_product_image,BWC_city,BWC_lunch_date,WC_product_id,BWC_method FROM product_page.bwc WHERE WC_product_id = ?;";
    var data = req.body.product_id;
    // console.log(data);
    conn.query(sql, data, function (err, results, fields) {
        if (err) {
            res.send('select發生錯誤', err);
        } else {
            if (undefined) {
                res.send(undefined);
            } else {
                // console.log(results)
                res.json(results);
            }
        }
    })
})



// 問與答
app.get('/product/:product_detail/detail/QA', function (req, res) {
    var sql = "INSERT INTO product_page.qa(`product_name`, `product_id` , `username`, `member_id` , `content`) VALUES ( ? , ? , ? , ? , ? );"
    // var data = req.query.content; 
    // console.log(req.params.product_detail); 
    console.log(req.query.username);
    console.log(req.query.product_name);
    console.log(req.query.content);
    conn.query(sql, [req.query.product_name, req.query.product_id, req.query.username, req.query.user_id, req.query.content], function (err, results, fields) {
        if (err) {
            res.send('select發生錯誤', err);
        } else {
            if (undefined) {
                res.send(undefined);
            } else {
                console.log(results)
                res.json(results);
            }
        }
    })

})


// 約定網址顯示訊息內容
app.get('/product/member/QA', function (req, res) {
    var sql = "SELECT `id`, `product_id`, `product_name`, `member_id`, `username`, `content`, `reply`,DATE_FORMAT(Question_date, '%Y/%m/%d %H:%i')Question_date FROM product_page.qa WHERE product_id = ?;"
    var data = req.query.product_id;
    conn.query(sql, data, function (err, results, fields) {
        if (err) {
            res.send('select發生錯誤', err);
        } else {
            if (undefined) {
                res.send(undefined);
            } else {
                // console.log(results)
                res.json(results);
            }
        }
    })
})



// ------------------------------------------商品-----------------------------------------------------------------
// ------------------------------------------商品-----------------------------------------------------------------




// 會員中心
var crypto = require('crypto');
var bodyParser = require('body-parser');
const { log } = require('console');
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
app.get('/member/:user/personal', function (req, res) {
    if (req.session.user) {
        var user = req.params.user;
        var sql = 'SELECT * FROM membercenter.personal where username = ?';
        conn.query(sql, [user], function (err, results, fields) {
            if (err) {
                res.send('select发生错误', err);
            } else {
                res.render('personal', {
                    personal: results,
                    page: "personal",
                    member: req.session.user.account + "/personal"
                });
            }
        });
    } else {
        res.send("error.404");
    }
});

app.post('/member/:user/personal', express.urlencoded(), function (req, res) {
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
app.get('/member/:user/password', function (req, res) {
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
                        personal: results,
                        page: "password",
                        member: req.session.user.account + "/personal"
                    })
                }
            });
    } else {
        res.send("error.404");
    }
});
app.post('/member/:user/password', function (req, res) {
    var user = req.params.user;
    var oldPassword = req.body.oldPassword;
    var key = "mypasswordaeskey";
    var iv = key;
    var oldencipher = crypto.createCipheriv('aes-128-cbc', Buffer.from(key, "utf-8"), Buffer.from(iv, "utf-8"));
    let oldencrypted = oldencipher.update(oldPassword, 'utf8', 'hex') + oldencipher.final('hex');
    var password = req.body.Password;
    var newencipher = crypto.createCipheriv('aes-128-cbc', Buffer.from(key, "utf-8"), Buffer.from(iv, "utf-8"));
    let newencrypted = newencipher.update(password, 'utf8', 'hex') + newencipher.final('hex');
    var sql = 'SELECT * FROM membercenter.personal where username = ? AND password = ?';
    conn.query(sql, [user, oldencrypted], function (err, result) {
        if (err) {
            res.send('更新密碼發生錯誤', err);
        } else if (result.length == 0) {
            // 如果舊密碼錯誤，返回錯誤訊息
            res.send("<script>alert('舊密碼錯誤');window.location.href='/" + user + "/password'</script>");
        } else {
            // 如果舊密碼正確，更新新密碼
            var sql = 'UPDATE membercenter.personal SET password = ? where username = ?';
            conn.query(sql, [newencrypted, user], function (err, result) {
                if (err) {
                    res.send('更新密碼發生錯誤', err);
                } else {
                    // res.redirect('/personal/' + user);
                    res.send("<script>alert('密碼更新成功！');window.location.href='/member/" + user + "/personal'</script>");
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
app.get('/member/:user/puton', function (req, res) {
    if (req.session.user) {
        var user = req.params.user;
        var sql = 'SELECT * FROM membercenter.myproduct';
        conn.query(sql, function (err, results, fields) {
            if (err) {
                res.send('select发生错误', err);
            } else {
                // console.log(results)
                res.render('puton', {
                    user: user,
                    puton: results,
                    page: "puton",
                    member: req.session.user.account + "/personal"
                });
            }
        });
    } else {
        res.send("error.404");
    }
});

var z1 = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "public/image/MYproduct/upload");
    },
    filename: function (req, file, cb) {
        fs.readdir('public/image/MYproduct/upload', function (err, data) {
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



app.post('/member/:user/puton', z2.single('productimage'), function (req, res) {
    var user = req.params.user;
    // console.log(req.file)
    // console.log(req.body.productname)
    // console.log(req.body.productdetail)
    // console.log(req.body.district)
    // console.log(req.body.city)
    // console.log(user)

    var sql = 'INSERT INTO membercenter.myproduct(MYproductimage, MYproductname, MYproductdetail, MYproductcity, MYproductuser_name) VALUES (?,?,?,?,?)'
    conn.query(sql, ['/image/MYproduct/upload/' + req.file.filename, req.body.productname, req.body.productdetail, req.body.city, user], function (err, results, fields) {
        if (err) {
            res.send('上架商品發生錯誤', err.message);
        } else {
            res.send("<script>alert('上傳成功！');window.location.href='/member/" + user + "/puton'</script>");
        }
    })
})
// =======================================================================================================================================
// =======================================================================================================================================
// =======================================================================================================================================
// =======================================================================================================================================
// ===========================================================我的物品=====================================================================

// app.get('/member/:user/MYproduct', function (req, res) {
//     if (req.session.user) {
//         var user = req.params.user;
//         var sql = 'SELECT MYproductid, MYproductimage, MYproductname, MYproductdetail, MYproductcity, DATE_FORMAT(time, "%Y-%m-%d %H:%i:%s") AS lunch_date_formatted, "MYproduct" AS source FROM membercenter.myproduct WHERE MYproductuser_name = ?';
//         var sql2 = 'SELECT product_id, product_image, product_name, product_detail, city, DATE_FORMAT(lunch_date, "%Y-%m-%d %H:%i:%s") AS lunch_date_formatted, "product" AS source FROM product_page.product WHERE user_name = ?';
//         var combinedSql = '(' + sql + ') UNION ALL (' + sql2 + ')';
//         conn.query(combinedSql, [user, user], function (err, results, fields) {
//             if (err) {
//                 res.send('select发生错误', err);
//             } else {
//                 console.log(results);
//                 res.render('MYproduct', {
//                     user: user,
//                     MYproduct: results,
//                     page: "MYproduct",
//                     member: req.session.user.account + "/personal"
//                 });
//             }
//         });
//     } else {
//         res.send("error.404");
//     }
// });
app.get('/member/:user/MYproduct', function (req, res) {
    if (req.session.user) {
        var user = req.params.user;
        var sql1 = 'SELECT product_id, product_image, product_name, product_detail, city, DATE_FORMAT(lunch_date, "%Y-%m-%d %H:%i:%s") AS lunch_date_formatted, "product" AS source FROM product_page.product WHERE user_name = ?';
        var sql2 = 'SELECT MYproductid, MYproductimage, MYproductname, MYproductdetail, MYproductcity, DATE_FORMAT(time, "%Y-%m-%d %H:%i:%s") AS lunch_date_formatted, "MYproduct" AS source FROM membercenter.myproduct WHERE MYproductuser_name = ?';
        conn.query(sql1, [user], function (err1, results1, fields1) {
            if (err1) {
                res.send('select发生错误', err1);
            } else {
                // console.log(results1);
                switch (results1.length) {
                    case 0:
                        conn.query(sql2, [user], function (err2, results2, fields2) {
                            if (err2) throw err2;
                            if (results2.length == 0) {
                                // console.log(results2);
                                res.render('MYproduct', {
                                    user: user,
                                    product: "nothing",
                                    MYproduct: "nothing",
                                    page: "MYproduct",
                                    member: req.session.user.account + "/personal"
                                });
                            } else {
                                // console.log(results2);
                                res.render('MYproduct', {
                                    user: user,
                                    product: "nothing",
                                    MYproduct: results2,
                                    page: "MYproduct",
                                    member: req.session.user.account + "/personal"
                                });
                            }
                        });
                        break;

                    default:
                        conn.query(sql2, [user], function (err2, results2, fields2) {
                            if (err2) throw err2;
                            if (results2.length == 0) {
                                // console.log(results2);
                                res.render('MYproduct', {
                                    user: user,
                                    product: results1,
                                    MYproduct: "nothing",
                                    page: "MYproduct",
                                    member: req.session.user.account + "/personal"
                                });
                            } else {
                                // console.log(results2);
                                res.render('MYproduct', {
                                    user: user,
                                    product: results1,
                                    MYproduct: results2,
                                    page: "MYproduct",
                                    member: req.session.user.account + "/personal"
                                });
                            }
                        });
                        break;
                }
            }
        });
    } else {
        res.send("error.404");
    }
});

// app.get('/member/:user/MYproduct', function (req, res) {
//     if (req.session.user) {
//         var user = req.params.user;
//         var sql = 'SELECT product_id, product_image, product_name, product_detail, city, DATE_FORMAT(time, "%Y-%m-%d %H:%i:%s") AS lunch_date_formatted FROM product_page.product WHERE user_name = ?';
//         conn.query(sql, [user], function (err, results, fields) {
//             if (err) {
//                 res.send('select发生错误', err);
//             } else {
//                 res.render('MYproduct', {
//                     user: user,
//                     product: results,
//                     page: "MYproduct",
//                     member: req.session.user.account + "/personal"
//                 });
//             }
//         });
//     } else {
//         res.send("error.404");
//     }
// });



app.post('/member/:user/MYproduct', function (req, res) {
    var user = req.params.user;
    // console.log(req.body);
    var sql = "insert into product_page.product(product_name, product_image, product_detail, user_name, city) values (?,?,?,?,?)";
    conn.query(sql, [req.body.MYproductname, req.body.MYproductimage, req.body.MYproductdetail, user, req.body.MYproductcity], function (err, results, fields) {
        if (err) {
            res.send('上架商品發生錯誤', err.message)
        }
        else {
            console.log("成功");
            var sql2 = "DELETE FROM membercenter.myproduct WHERE MYproductid = ?;";
            conn.query(sql2, [req.body.MYproductid], function (err, results, fields) {
                if (err) {
                    res.send('上架商品發生錯誤')
                } else {
                    res.send("<script>alert('上架成功！'); location.reload();window.location.href='/member/" + user + "/MYproduct'</script>");
                    // console.log("123");
                }
            })
        }
    });

})

app.delete('/member/:user/MYproduct', function (req, res) {
    var user = req.params.user;
    // console.log(req.body);
    var sql = "DELETE FROM membercenter.myproduct WHERE MYproductid = ?;";
    conn.query(sql, [req.body.MYproductid], function (err, results, fields) {
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
app.get('/member/:user/iwant', function (req, res) {
    user = req.params.user
    sql = 'select * from product_page.bwc where BWC_user_name = ?'
    conn.query(sql, [user], function (err, results, fields) {
        if (err) {
            res.send("err", err.message)
        } else {
            // console.log(results);
            if (results.length == 0) {
                res.render('iwant', {
                    iwant: "nothing",
                    page: "iwant",
                    member: req.session.user.account + "/personal"
                })
            } else {
                res.render('iwant', {
                    iwant: results,
                    page: "iwant",
                    member: req.session.user.account + "/personal"
                    // data
                })
            }
        }
    });
})
app.get('/member/:user/withme', function (req, res) {
    user = req.params.user
    sql = 'select * from product_page.bwc where WC_user_name = ?'
    conn.query(sql, [user], function (err, results, fields) {
        if (err) {
            res.send("err")
        } else {
            // var data = { message: 'Hello from backend!' };
            if (results.length == 0) {
                res.render('withme', {
                    withme: "nothing",
                    page: "withme",
                    member: req.session.user.account + "/personal"
                })
            } else {
                res.render('withme', {
                    withme: results,
                    page: "withme",
                    member: req.session.user.account + "/personal",
                    user: user
                    // data
                })
            }
        }
    });
})
app.post('/member/:user/withme', function (req, res) {
    user = req.params.user
    // console.log(req.body);
    sql = 'INSERT INTO product_page.record(memberid, product, id2, product2) VALUES (?,?,?,?)'
    conn.query(sql, [req.body.BWC_user_name, req.body.BWC_product_name, req.body.WC_user_name, req.body.WC_product_name], function (err, results, fields) {
        if (err) {
            res.send(err.message)
            console.log('交易失敗');
        } else {
            sql2 = 'DELETE from product_page.bwc where id = ?'
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
app.get('/member/:user/record', function (req, res) {
    if (req.session.user) {
        var user = req.params.user;
        var sql = "SELECT memberid, product, product2, success, DATE_FORMAT(time, '%Y/%m/%d %H:%i')time FROM membercenter.record WHERE id2 = ?;"
        conn.query(sql, [user], function (err, results, fields) {
            // console.log(results);
            if (err) {
                res.send('select發生錯誤', err);
            } else {
                res.render('record', {
                    record: results,
                    page: "record",
                    member: req.session.user.account + "/personal"
                });
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

//==================================
// 註冊/登入
app.get('/member/:url(login|register)?', function (req, res) {
    if (req.session.user) {
        res.render('login_register', {
            page: 'login_register',
            member: req.session.user.account + "/personal",
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
    var key = "mypasswordaeskey";
    var iv = key;
    var dataToWeb = {};
    if (url == 'login') {
        var sql = 'SELECT * FROM membercenter.personal where username = ?;';
        conn.query(sql, [req.body.username], function (err, results, fidlds) {
            if (err) {
                console.log('select username error: ' + JSON.stringify(err));
                res.send('username or password Input error.');
            } else {
                if (results[0]) {
                    if (req.body.username == results[0].username) {
                        var decipher = crypto.createDecipheriv('aes-128-cbc', Buffer.from(key, "utf-8"), Buffer.from(iv, "utf-8"));
                        let decrypted = decipher.update(results[0].password, 'hex', 'utf8') + decipher.final('utf8');
                        if (req.body.password == decrypted) {
                            var d = new Date();
                            d.setHours(d.getHours() + 8);
                            req.session.user = {
                                'account': results[0].username,
                                'logined_at': d,
                            }
                            if (results[0].logined_times < 1) {
                                dataToWeb = {
                                    account: results[0].username,
                                    logined_times: results[0].logined_times,
                                    headshot: results[0].headshot
                                }
                            } else {
                                err
                                dataToWeb = {
                                    account: results[0].username,
                                    headshot: results[0].headshot
                                }
                            }
                            console.log('User: ' + results[0].username + ', logined_at: ' + d.toISOString().replace('T', ' ').substr(0, 19));
                            res.send(dataToWeb);
                            // 增加登入次數
                            var update_logined_times_sql = `UPDATE membercenter.personal set logined_times = ? where username = '${results[0].username}';`;
                            conn.query(update_logined_times_sql, [results[0].logined_times + 1], (err, results, fields) => {
                                if (err) throw err;
                            })
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
        var sql = 'SELECT username FROM membercenter.personal where username = ?;';
        conn.query(sql, [req.body.username], function (err, results, fidlds) {
            if (err) {
                var replydata = 'select Username error';
                console.log(replydata + ': ' + JSON.stringify(err));
                res.send(replydata);
            } else {
                if (results[0]) {
                    if (req.body.username == results[0].username) {
                        res.send('Username already Register.');
                    }
                } else {
                    var decode = Buffer.from(req.body.password, 'base64').toString();
                    var encipher = crypto.createCipheriv('aes-128-cbc', Buffer.from(key, "utf-8"), Buffer.from(iv, "utf-8"));
                    let encrypted = encipher.update(decode, 'utf8', 'hex') + encipher.final('hex');
                    sql = "INSERT INTO membercenter.personal (username, password, headshot) VALUES (?, ?, ?);";
                    conn.query(sql, [req.body.username, encrypted, req.body.headshot],
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
        var sql = 'SELECT * FROM membercenter.personal where username = ?;';
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
        var decode = Buffer.from(req.body.thirdtoken, 'base64').toString();
        var encipher = crypto.createCipheriv('aes-128-cbc', Buffer.from(key, "utf-8"), Buffer.from(iv, "utf-8"));
        let encrypted = encipher.update(decode, 'utf8', 'hex') + encipher.final('hex');
        var select_member_sql = `select * from membercenter.personal where thirdtoken = ?`;
        conn.query(select_member_sql, [encrypted], (err, results, fields) => {
            if (err) {
                console.log(err);
            } else {
                if (results[0]) {
                    if (encrypted == results[0].thirdtoken) {
                        var d = new Date();
                        d.setHours(d.getHours() + 8);
                        req.session.user = {
                            'account': results[0].username,
                            'logined_at': d,
                        }
                        if (results[0].logined_times < 1) {
                            dataToWeb = {
                                account: results[0].username,
                                logined_times: results[0].logined_times,
                                headshot: results[0].headshot
                            }
                        } else {
                            dataToWeb = {
                                account: results[0].username,
                                headshot: results[0].headshot
                            }
                        }
                        console.log('User: ' + results[0].username + ', logined_at: ' + d.toISOString().replace('T', ' ').substr(0, 19));
                        res.send(dataToWeb);
                        // 增加登入次數
                        var update_logined_times_sql = `UPDATE membercenter.personal set logined_times = ? where username = '${results[0].username}';`;
                        conn.query(update_logined_times_sql, [results[0].logined_times + 1], (err, results, fields) => {
                            if (err) throw err;
                        })
                    } else {
                        res.send('Google Login error.');
                    }
                } else {
                    // 未註冊過 > 註冊+登入
                    var select_userN_sql = `SELECT username from membercenter.personal;`;
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
                            var third_register_member_sql = `INSERT INTO membercenter.personal (username, nickname, headshot, mail, submitfrom, thirdtoken) VALUES (?, ?, ?, ?, ?, ?);`;
                            var third_login_member_sql = `SELECT * FROM membercenter.personal WHERE thirdtoken = ?`;
                            conn.query(third_register_member_sql + third_login_member_sql, [randomuser, req.body.nickname, req.body.headshot, req.body.email, req.body.submitfrom, encrypted, encrypted], (err, results, fields) => {
                                if (err) {
                                    console.log("submit third member err:", err);
                                } else {
                                    if (results[1]) {
                                        if (encrypted == results[1][0].thirdtoken) {
                                            var d = new Date();
                                            d.setHours(d.getHours() + 8);
                                            req.session.user = {
                                                'account': results[1][0].username,
                                                'logined_at': d
                                            }
                                            if (results[1][0].logined_times < 1) {
                                                dataToWeb = {
                                                    account: results[1][0].username,
                                                    logined_times: results[1][0].logined_times,
                                                    headshot: results[1][0].headshot
                                                }
                                            } else {
                                                dataToWeb = {
                                                    account: results[1][0].username,
                                                    headshot: results[1][0].headshot
                                                }
                                            }
                                            console.log('User: ' + results[1][0].username + ', logined_at: ' + d.toISOString().replace('T', ' ').substr(0, 19));
                                            res.send(dataToWeb);
                                            // 增加登入次數
                                            var update_logined_times_sql = `UPDATE membercenter.personal set logined_times = ? where username = '${results[1][0].username}';`;
                                            conn.query(update_logined_times_sql, [results[1][0].logined_times + 1], (err, results, fields) => {
                                                if (err) throw err;
                                            })
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



// 首頁導覽列
// 首頁跑馬燈
// 首頁產品查詢
// 首頁最新商品
// 首頁討論區








