$(function () {
    if (window.location.pathname.indexOf('login') > -1) {
        var url = 'login';
    } else if (window.location.pathname.indexOf('register') > -1) {
        var url = 'register';
    }
    function getform(url) {
        $('.formResult').html('');
        $.ajax({
            type: 'GET',
            url: url,
            success: function () {
                url = $('.formResult').prop('id');
                appendform(url);
            }
        })
        function appendform(url) {
            if (url == 'login') {
                var newFORM = `
                <div>
                    <div class="imgcontainer">
                        <img src="/image/member/demo.png" alt="Avatar" class="avatar">
                    </div>
                    <form class="row">
                        <div class="input_info">
                            <div class="void col-12">
                            </div>
                            <div class="col-12">
                                <label for="uname" class="form-label"><b>Username：</b></label>
                                <input type="text" placeholder="Enter Username" name="uname" class="form-control" required>
                            </div>
                            <div class="col-12">
                                <label for="psw"><b>Password：</b></label>
                                <input type="password" placeholder="Enter Password" name="psw" class="form-control" required>
                                <label></label>
                            </div>
                            <input type="submit" value="Login" />
                        </div>
                    </form>
                </div>
            `;
            } else if (url == 'register') {
                var newFORM = `
                <div>
                    <div class="imgcontainer">
                        <img src="/image/member/demo.png" class="avatar">
                    </div>
                    <form action="/upload_headshot" method="post" enctype="multipart/form-data" class="row">
                        <div class="input_info">
                            <div>
                                <label><b>Headshot：</b></label>
                                <input type="file" name="headshot" class="form-control">
                            </div>
                            <div>
                                <label><b>Username：</b></label>
                                <input type="text" placeholder="Enter Username" name="uname" class="form-control is-invalid" required>
                                <label>請輸入6-12個英數字</label><br>
                            </div>
                            <div>
                                <label><b>Password：</b></label>
                                <input type="password" placeholder="Enter Password" name="psw" class="form-control is-invalid" required>
                                <label>請輸入6-12個英數字</label>
                            </div>
                            <input type="button" value="Register" />
                        </div>
                    </form>
                </div>
            `;
            } else if (url == 'logined') {
                alert('You are logined.');
                location.href = '/';
            }


            $('.formResult').append(newFORM);

            if (window.location.pathname.indexOf('register') > -1) {
                $('input[type=file]').change(function handleFiles() {
                    var img = document.querySelector('.imgcontainer img');
                    img.src = window.URL.createObjectURL(this.files[0]);
                    img.onload = function () {
                        window.URL.revokeObjectURL(this.src);
                    }
                })

                $('input[name=uname]').on('keyup', function () {
                    if ($('input[name=uname]').val() != "") {
                        var inputvalue = $('input[name=uname]').val();
                        var pattern = /^[A-Za-z0-9]{6,12}$/;
                        if (inputvalue.match(pattern)) {
                            $('input[name=uname]+label').text("");
                            $('input[name=uname]').prop('class', 'form-control is-valid');
                        } else {
                            $('input[name=uname]+label').css('color', 'red');
                            $('input[name=uname]+label').text("請輸入6-12個英數字");
                            $('input[name=uname]').prop('class', 'form-control is-invalid');
                        }
                    } else {
                        $('input[name=uname]').prop('class', 'form-control is-invalid');
                    }
                })
                $('input[name=uname]').on('focusout', function () {
                    if ($('input[name=uname]').val() != ""  && $('input[name=uname]').prop('class').indexOf('is-valid') > -1) {
                        var dataToServer = {
                            UserName: $('input[name=uname]').val()
                        }
                        $.ajax({
                            type: 'post',
                            url: 'chkuser/memberchk',
                            data: dataToServer,
                            success: function (req) {
                                // console.log(req);
                                if (req.indexOf("can't") > -1) {
                                    $('input[name=uname]+label').css('color', 'red');
                                    $('input[name=uname]').prop('class', 'form-control is-invalid');
                                } else {
                                    $('input[name=uname]+label').css('color', 'green');
                                    $('input[name=uname]').prop('class', 'form-control is-valid');
                                }
                                $('input[name=uname]+label').text(req);
                            }
                        })
                    } else {
                        $('input[name=uname]').prop('class', 'form-control is-invalid');
                        $('input[name=uname]+label').text("請輸入6-12個英數字");
                    }
                })
                $('input[name=psw]').on('keyup', function () {
                    if ($('input[name=psw]').val() != "") {
                        var inputvalue = $('input[name=psw]').val();
                        var pattern = /^[A-Za-z0-9]{6,12}$/;
                        if (inputvalue.match(pattern)) {
                            $('input[name=psw]+label').text("");
                            $('input[name=psw]').prop('class', 'form-control is-valid');
                        } else {
                            $('input[name=psw]+label').css('color', 'red');
                            $('input[name=psw]+label').text("請輸入6-12個英數字");
                            $('input[name=psw]').prop('class', 'form-control is-invalid');
                        }
                    } else {
                        $('input[name=psw]').prop('class', 'form-control is-invalid');
                    }
                })
            }

            $('input[type=submit]').on('click', function (e) {
                if ($('input[name=uname]').val() && $('input[name=psw]').val()) {
                    if (url == 'login') {
                        e.preventDefault();
                        var dataToServer = {
                            UserName: $('input[name=uname]').val(),
                            Password: $('input[name=psw]').val()
                        }
                        $.ajax({
                            type: 'post',
                            url: url + '/memberchk',
                            data: dataToServer,
                            success: function (req) {
                                if (req.account) {
                                    req.headshot ? $('.imgcontainer img, .d-none.d-md-block.button img, .navbar-brand.d-md-none.button img').prop('src', `/image/member/upload/headshot/${req.headshot}`) : null;
                                    $('input[name=uname]').prop('class', 'form-control is-valid');
                                    $('input[name=psw]').prop('class', 'form-control is-valid');
                                    $('input[name=psw]+label').css('color', 'green');
                                    $('input[name=psw]+label').text('Login Success, 5秒後跳轉頁面.');
                                    
                                    if (document.referrer.indexOf('register') == -1) {
                                        setTimeout(() => { window.location.href = document.referrer; }, 5000);
                                    } else {
                                        setTimeout(() => { location.href = '/'; }, 5000);
                                    }
                                } else {
                                    $('input[name=uname]').prop('class', 'form-control is-invalid');
                                    $('input[name=psw]').prop('class', 'form-control is-invalid');
                                    $('input[name=psw]+label').text(req);
                                }
                            }
                        })
                    }
                } else {
                    $('input[name=psw]+label').text('請輸入使用者名稱及密碼');
                }
            })
            $('input[type=button]').click(() => {
                if (url == 'register' && $('input[name=uname]').prop('class').indexOf('is-valid') > -1 && $('input[name=psw]').prop('class').indexOf('is-valid') > -1) {
                    postheadshot();
                }
            })
            function postheadshot() {
                if ($("input[type=file]")[0].files.length && url == 'register') {
                    var data = new FormData();
                    $.each($("input[type=file]")[0].files, function (i, file) {
                        data.append('headshot', file);
                    })
                    $.ajax({
                        type: "post",
                        url: "/upload_headshot",
                        data: data,
                        contentType: false,
                        processData: false,
                        success: function (req) {
                            $('.imgcontainer img').prop('src', `/image/member/upload/headshot/${req.split('headshot\\')[1]}`);
                            postRegister(req.split('headshot\\')[1]);
                        }
                    })
                } else if (url == 'register') {
                    postRegister();
                }
            }
            function postRegister(headshot) {
                if (url = 'register') {
                    var dataToServer = {
                        UserName: $('input[name=uname]').val(),
                        Password: $('input[name=psw]').val(),
                        headshot: headshot
                    }
                    $.ajax({
                        type: 'post',
                        url: url + '/memberchk',
                        data: dataToServer,
                        success: function (req) {
                            if (req.indexOf('Success') > -1) {
                                $('input[name=psw]+label').text(req + ' 5秒後跳轉至登入頁.');
                                setTimeout(() => { location.href = 'login'; }, 5000);
                            } else {
                                $('input[name=psw]+label').text(req);
                            }
                        }
                    })
                }
            }
        }
    }
    getform(url);


    var login_signup_button = document.querySelectorAll('.header div');
    if (url == 'login') {
        // http://localhost/member/login
        login_signup_button[0].style.backgroundColor = 'white';
        login_signup_button[1].style.backgroundColor = 'lightblue';
    } else if (url == 'register') {
        //http://localhost/member/register
        login_signup_button[0].style.backgroundColor = 'lightblue';
        login_signup_button[1].style.backgroundColor = 'white';
    }

    $('.header div').on('click', function () {
        if ($(this).find('label').text() == '登入') {
            var login_signup_pagechk = 'login';
            location.href = login_signup_pagechk;
        } else if ($(this).find('label').text() == '註冊') {
            var login_signup_pagechk = 'register';
            location.href = login_signup_pagechk;
        }
    })
})