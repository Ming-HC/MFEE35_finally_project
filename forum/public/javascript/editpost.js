$(function () {
    var member = {
        username: ''
    }
    function getPostClass() {
        $('#classResult').html('');
        $.ajax({
            type: 'POST',
            url: '/forum/getclass',
            data: { from: 'newpost' },
            success: function (req) {
                $.each(req.results, function (index, item) {
                    appendClass(item.class_name_eng, item.class_name);
                })
                // console.log(req.logined_user); // get user
                member.username = req.logined_user;
            }
        })
        function appendClass(class_eng, class_name) {
            $('#classResult').append(`
                <option value="${class_eng}">${class_name}</option>
            `);
        }
        $.ajax({
            type: 'GET',
            url: window.location.pathname + "/getdata",
            success: function (req) {
                if (window.location.pathname.split("/").reverse()[0] == 1) {
                    $.each($("option"), function (index, item) {
                        if (item.innerText.indexOf(req[0].class_name) > -1) {
                            $("select").val(item.value);
                        }
                    })
                    $("input[type=text]").val(req[0].title);
                    $("textarea").text(req[0].content);
                } else {
                    for (let i = 0; i < $("option").length; i++) {
                        if ($("option").eq(i).text() == req[0].class_name) {
                            $("select").val($("option").eq(i).val());
                            $("select").prop("disabled", true);
                            break;
                        }
                    }
                    $("input[type=text]").val(req[0].title);
                    $("input[type=text]").prop("disabled", true);
                    console.log(req);
                    $("textarea").text(req[1].content);
                }
            }

        })
    }
    getPostClass();
    $('#submit button').on('click', function () {
        if (window.location.pathname.split("/").reverse()[0] == 1) {
            var targetclass = $("select").val();
            var dataToServer = {
                class: $(`option[value=${targetclass}]`).text(),
                title: $('input[type=text]').val(),
                content: $('textarea').val()
            }
        } else {
            var dataToServer = {
                content: $('textarea').val()
            };
        }
        console.log(dataToServer);
        $.ajax({
            type: 'PUT',
            url: window.location.pathname + "/edit",
            data: dataToServer,
            success: function (req) {
                if (req.indexOf("success") > -1) {
                    location.href = '/forum';
                } else {
                    alert("Update Post fail.");
                }
            }
        })
    })
})