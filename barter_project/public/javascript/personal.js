$(function () {
    // 連結路由
    // var path = window.location.pathname
    // var url = path.slice(10)
    // var password = "/" + url + "/password/";
    // var personal = "/" + url + "personal/";
    // var record = "/" + url + "record/";
    // var link = document.getElementById("my-link-personal");
    // var link2 = document.getElementById("my-link-password");
    // var link3 = document.getElementById("my-link-record");
    // link.href = personal;
    // link2.href = password;
    // link3.href = record;

    // 印出年份下拉式選單
    for (var year = 1980; year <= 2022; year++) {
        $('#year').append($('<option>', {
            value: year,
            text: year
        }));
    }

    // 印出月份下拉式選單
    for (var month = 1; month <= 12; month++) {
        $('#month').append($('<option>', {
            value: month,
            text: month
        }));
    }

    // 判斷月份對應不同的天數下拉式選單
    //預設
    for (var day = 1; day <= 31; day++) {
        $('#day').append($('<option>', {
            value: day,
            text: day
        }));
    }
    $('#month').change(function () {
        // console.log($(this).val())
        var monthtext = $(this).val()
        // console.log(monthtext);
        // console.log(typeof monthtext)
        $('#day').empty();
        switch (monthtext) {
            case "1": case "3": case "5": case "7": case "8": case "10": case "12":
                for (var day = 1; day <= 31; day++) {
                    $('#day').append($('<option>', {
                        value: day,
                        text: day
                    }));
                }
                break;
            case "4": case "6": case "9": case "11":
                for (var day = 1; day <= 30; day++) {
                    $('#day').append($('<option>', {
                        value: day,
                        text: day
                    }));
                }
                break;
            case "2":
                for (var day = 1; day <= 28; day++) {
                    $('#day').append($('<option>', {
                        value: day,
                        text: day
                    }));
                }
                break;
        }
    });
    var path = window.location.pathname
    let index = path.indexOf("/");
    for (let i = 1; i < 2; i++) {
        index = path.indexOf("/", index + 1);
    }

    var url = path.slice(1, index)
    console.log(url);

    // 綁定第一個按鈕的 click 事件處理函式
    $('input:button:eq(0)').click(() => {
        // var path = window.location.pathname
        // var url = path.slice(10)
        console.log('按鈕 姓名 被點擊了');
        if ($('input:button:eq(0)').attr("value") == '更改') {
            $('input:button:eq(0)').prop('value', `儲存`);
            $('input:text:eq(0)').prop('style', 'width:100% height: 34.09px;');
            $('p:eq(0)').prop('style', 'display: none;');
        } else {
            $.ajax({
                type: 'post',
                url: "personal",
                data: {
                    name: $('input[name=name]').val(),
                    username: url,
                    judge: "name"
                },
                success: (function (req) {
                    $('input:button:eq(0)').prop('value', `更改`);
                    $('input:text:eq(0)').prop('style', 'display: none;');
                    $('p:eq(0)').prop('style', 'display: initial;');
                    $('p:eq(0)').text(req);
                })
            })
        }
    });

    // 綁定第二個按鈕的 click 事件處理函式
    $('input:button:eq(1)').click(() => {
        console.log('按鈕 手機 被點擊了');
        if ($('input:button:eq(1)').attr("value") == '更改') {
            $('input:button:eq(1)').prop('value', `儲存`);
            $('input:text:eq(1)').prop('style', 'width:100% height: 34.09px;');
            $('p:eq(2)').prop('style', 'display: none;');
        } else {
            $.ajax({
                type: 'post',
                url: "personal",
                data: {
                    phone: $('input[name=phone]').val(),
                    username: url,
                    judge: "phone"
                },
                success: (function (req) {
                    $('input:button:eq(1)').prop('value', `更改`);
                    $('input:text:eq(1)').prop('style', 'display: none;');
                    $('p:eq(2)').prop('style', 'display: initial;');
                    $('p:eq(2)').text(req);
                })
            })
        }
    });

    // 綁定第三個按鈕的 click 事件處理函式
    $('input:button:eq(2)').click(() => {
        console.log('按鈕 信箱 被點擊了');
        if ($('input:button:eq(2)').attr("value") == '更改') {
            $('input:button:eq(2)').prop('value', `儲存`);
            $('input:text:eq(2)').prop('style', 'width:100% height: 34.09px;');
            $('p:eq(3)').prop('style', 'display: none;');
        } else {
            $.ajax({
                type: 'post',
                url: "personal",
                data: {
                    mail: $('input[name=mail]').val(),
                    username: url,
                    judge: "mail"
                },
                success: (function (req) {
                    $('input:button:eq(2)').prop('value', `更改`);
                    $('input:text:eq(2)').prop('style', 'display: none;');
                    $('p:eq(3)').prop('style', 'display: initial;');
                    $('p:eq(3)').text(req);
                })
            })

        }
    });

    // 綁定第四個按鈕的 click 事件處理函式
    $('input:button:eq(3)').click(() => {
        console.log('按鈕 性別 被點擊了');
        if ($('input:button:eq(3)').attr("value") == '更改') {
            $('input:button:eq(3)').prop('value', `儲存`);
            $('#gd').prop('style', 'width:100% height: 34.09px; display:flex ;align-items: center;');
            $('p:eq(4)').prop('style', 'display: none;');
        } else {
            var radios = document.querySelectorAll('input[name="gender"]');
            radios.forEach(radio => {
                if (radio.checked) {
                    // console.log(`選中的是誰：${radio.value}`);
                    var gendertest = `${radio.value}`
                    $.ajax({
                        type: 'post',
                        url: "personal",
                        data: {
                            gender: gendertest,
                            username: url,
                            judge: "gender"
                        },
                        success: (function (req) {
                            $('input:button:eq(3)').prop('value', `更改`);
                            $('#gd').prop('style', 'display: none;');
                            $('p:eq(4)').prop('style', 'display: initial;');
                            $('p:eq(4)').text(req);
                        })
                    })
                }
            });
        }
    });

    // 綁定第五個按鈕的 click 事件處理函式
    $('input:button:eq(4)').click(() => {
        console.log('按鈕 生日 被點擊了');
        if ($('input:button:eq(4)').attr("value") == '更改') {
            $('input:button:eq(4)').prop('value', `儲存`);
            $('#bd').prop('style', 'width:100% height: 34.09px; display:flex ;align-items: center;');
            $('p:eq(5)').prop('style', 'display: none;');
        } else {
            // console.log($('#day').val());
            var year1 = $('#year').val()
            var month1 = $('#month').val()
            var day1 = $('#day').val()
            $.ajax({
                type: 'post',
                url: "personal",
                data: {
                    birth: year1 + "/" + month1 + "/" + day1,
                    username: url,
                    judge: "birth"
                },
                success: (function (req) {
                    $('input:button:eq(4)').prop('value', `更改`);
                    $('#bd').prop('style', 'display: none;');
                    $('p:eq(5)').prop('style', 'display: initial;');
                    $('p:eq(5)').text(req);
                    console.log(req)
                }),
            })
        }
    });
    $('input[type=file]').change(function handleFiles() {
        var img = document.querySelector('.chimage');
        // console.log(img);
        img.src = window.URL.createObjectURL(this.files[0]);
        // console.log(img.src);
        img.onload = function () {
            window.URL.revokeObjectURL(this.src);
        }
    })
    // 綁定第六個按鈕的 click 事件處理函式
    $('input:button:eq(5)').click(() => {
        console.log('按鈕 大頭貼 被點擊了');
        var data = new FormData();
        $.each($("input[type=file]")[0].files, function (i, file) {
            data.append('headshot', file);
        })
        // var img = document.querySelector('input[type=file]');
        // console.log(img);
        $.ajax({
            type: "put",
            url: "personal",
            data: data,
            contentType: false,
            processData: false,
            success: function (req) {
                if (req) {
                    console.log("123");
                    alert("更新成功");
                    location.reload();
                    // console.log(req);
                    // $('.chimage').prop('src', `/image/member/upload/headshot/${req.split('headshot\\')[1]}`);
                } else {
                    // console.log("456");
                    // console.log(req);
                    // $('.chimage').prop('src', `/image/member/upload/headshot/${req.split('headshot/')[1]}`);
                }
            }
        })
    });

})

