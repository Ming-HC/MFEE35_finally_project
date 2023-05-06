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
                    <form>
                        <div class="input_info">
                            <div>
                                <label for="uname"><b>Username：</b></label>
                                <input type="text" placeholder="Enter Username" name="uname" required>
                                <label></label><br>
                            </div>
                            <div>
                                <label for="psw"><b>Password：</b></label>
                                <input type="password" placeholder="Enter Password" name="psw" required>
                                <label></label>
                            </div>
                            <input type="submit" value="Login" />
                        </div>
                    </form>
                    <button type="button" class="cancelbtn">Cancel</button>
                </div>
            `;
            } else if (url == 'register') {
                var newFORM = `
                <div>
                    <div class="imgcontainer">
                        <img src="/image/member/demo.png" alt="Avatar" class="avatar">
                    </div>
                    <form action="/upload_headshot" method="post" enctype="multipart/form-data">
                        <div class="input_info">
                            <div>
                                <label><b>Update headshot：</b></label>
                                <input type="file" name="headshot">
                            </div>
                            <div>
                                <label for="uname"><b>Username：</b></label>
                                <input type="text" placeholder="Enter Username" name="uname" required>
                                <label></label><br>
                            </div>
                            <div>
                                <label for="psw"><b>Password：</b></label>
                                <input type="password" placeholder="Enter Password" name="psw" required>
                                <label></label>
                            </div>
                            <input type="button" value="Register" />
                        </div>
                    </form>
                    <button type="button" class="cancelbtn">Cancel</button>
                </div>
            `;
            } else if (url == 'logined') {
                alert('You are logined.');
                // window.history.back();
                location.href = '/';
            }


            $('.formResult').append(newFORM);
            if (window.location.pathname.indexOf('register') > -1) {
                $('input[type=file]').change(function handleFiles() {
                    var img = document.querySelector('img');
                    img.src = window.URL.createObjectURL(this.files[0]);
                    img.onload = function () {
                        window.URL.revokeObjectURL(this.src);
                    }
                })
                $('input[name=uname').on('focusout', function () {
                    if ($('input[name=uname]').val() != "") {
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
                                } else {
                                    $('input[name=uname]+label').css('color', 'green');
                                }
                                $('input[name=uname]+label').text(req);
                            }
                        })
                    } else {
                        $('input[name=uname]+label').text("");
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
                                    req.headshot? $('img').prop('src', `/image/member/upload/headshot/${req.headshot}`) : null;
                                    $('input[name=psw]+label').text('Login Success, 5秒後跳轉至首頁.');
                                    if (document.referrer.indexOf('register') == -1) {
                                        setTimeout(() => { window.location.href = document.referrer; }, 5000);
                                    } else {
                                        setTimeout(() => { location.href = '/'; }, 5000);
                                    }
                                } else {
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
                if (url == 'register') {
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
                            $('img').prop('src', `/image/member/upload/headshot/${req.split('headshot\\')[1]}`);
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