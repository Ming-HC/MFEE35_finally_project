$(function () {
    function getfloor() {
        $('#floorResult').html('');
        $.ajax({
            type: 'GET',
            url: window.location.pathname + '/getdata',
            success: function (req) {
                // console.log(req);
                $.each(req, function (index, item) {
                    appendFloor(item.floor_exists, item.headshot, item.user, item.class_name, item.title, item.reply_floor, item.post_time_format, item.content, item.likes);
                })
            }
        })
        function appendFloor(exists, headshot, user, class_name, title, reply_floor, post_time, content, likes) {
            if (exists) {
                if (headshot) {
                    if (headshot.indexOf("headshot") > -1) {
                        headshot = `/image/member/upload/headshot/${headshot}`
                    }
                } else {
                    headshot = "/image/member/demo.png"
                }
                var newFloor = `
            <div class="reply_floor floor_${reply_floor}">
                <div>
                    <div class="col-12" id="title">
                            <!-- title -->
                            <label>${class_name ? class_name : ""}</label>
                            <h3>${title ? title : ""}</h3>
                        </div>
                    <div class="col-4" id="user_info">
                        <!-- headphoto username -->
                        <div><img src="${headshot}" /></div>
                        <div><a href=""><label>${user}</label></a></div>
                    </div>
                    <div class="col-7">
                        <div>
                            <div>
                                <!-- content -->
                                <div id="reply_floor_div"><label>${reply_floor}F</label></div>
                                <div>
                                    <pre>${content}</pre>
                                    <label>${post_time}</label>
                                </div>
                            </div>
                            <div>
                                <!-- function button ex. like reply message -->
                                ${$(".d-none.d-md-block.button").prop('href').indexOf('login') == -1 ?
                        user == $(".d-none.d-md-block.button").prop('href').split('member/')[1] ? '<input type="button" class="edit" value="編輯"/>' : "" : ""
                    }
                                ${$(".d-none.d-md-block.button").prop('href').indexOf('login') == -1 ?
                        user == $(".d-none.d-md-block.button").prop('href').split('member/')[1] ? '<input type="button" class="delete" value="刪除"/>' : "" : ""
                    }
                                <button>喜歡</button>
                                <button>留言</button>
                                <input type="button" class="reply" value="回覆" />
                            </div>
                        </div>
                    </div>
                </div>
                <div id="message">
                    <!-- message -->
                    <img src="" />
                    <a href="/member/login"><label>登入</label></a>
                    <input type="text" />
                </div>
            </div>
            `;
                $('#floorResult').append(newFloor);

                $(`.floor_${reply_floor} .edit`).click((e) => {
                    var post_id = window.location.pathname.split("post/")[1];
                    // console.log(e.target.parentNode.parentNode.querySelector("#reply_floor_div label"));
                    var floor = e.target.parentNode.parentNode.querySelector("#reply_floor_div label").innerText.split("F")[0];
                    location.href = `/forum/editpost/${post_id}/${floor}`;

                })
                $("#message img").prop("src", $(".d-none.d-md-block.button img").prop("src"));
                $("#message a").prop("href", $(".d-none.d-md-block.button").prop("href"));
                if ($(".d-none.d-md-block.button").prop("href").indexOf("login") == -1) {
                    $("#message a label").text($("#message a").prop("href").split("member/")[1]);
                }
                $(`.floor_${reply_floor} .reply`).click(() => {
                    if ($(".d-none.d-md-block.button").prop("href").indexOf('login') > -1) {
                        var hint = "需登入才可回覆，是否登入？"
                        if (confirm(hint) == true) {
                            location.href = "http://localhost/member/login";
                        }
                    } else {
                        $("textarea").focus();
                    }
                })
                $(`.floor_${reply_floor} .delete`).click((e) => {
                    var post_id = window.location.pathname.split("post/")[1];
                    var floor = e.target.parentNode.parentNode.querySelector("#reply_floor_div label").innerText.split("F")[0];
                    var hint = "是否確定刪除文章";
                    if (confirm(hint) == true) {
                        // location.href = `/forum/deletepost/${post_id}/${floor}`;
                        $.ajax({
                            type: "PUT",
                            url: `/forum/deletepost/${post_id}/${floor}`,
                            success: (req) => {
                                if (req.indexOf("success") > -1) {
                                    if (floor == 1) {
                                        location.href = "http://localhost/forum";
                                    } else {
                                        window.location.reload();
                                    }
                                }
                            }
                        })
                    }
                })
            } else {
                if (reply_floor == 1) {
                    var unexists_floor = `
                    <div class="col-12 d_title" id="title">
                            <!-- title -->
                            <label>${class_name ? class_name : ""}</label>
                            <h3>${title ? title : ""}</h3>
                        </div>
                    <div class="reply_floor floor_${reply_floor} d_floor">
                        <label>此文章已由原作者(${user})刪除</label>
                        <div id="reply_floor_div"><label>${reply_floor}F</label></div>
                    </div>
                    `;
                    $('#floorResult').append(unexists_floor);
                } else {
                    var unexists_floor = `
                    <div class="reply_floor floor_${reply_floor} d_floor">
                        <label>此回覆已由原作者(${user})刪除</label>
                        <div id="reply_floor_div"><label>${reply_floor}F</label></div>
                    </div>
                    `;
                    $('#floorResult').append(unexists_floor);
                }
            }
        }
    }
    getfloor();
    $("textarea").focus(() => {
        if ($(".d-none.d-md-block.button").prop("href").indexOf('login') > -1) {
            var hint = "需登入才可回覆，是否登入？"
            if (confirm(hint) == true) {
                $("textarea").blur();
                location.href = "http://localhost/member/login";
            } else {
                $("textarea").blur();
            }
        }
    });
    $(".reply_post_submit").click(() => {
        if ($(".reply_content textarea").val()) {
            var dataToServer = {
                user: $(".d-none.d-md-block.button").prop("href").split("member/")[1],
                content: $("textarea").val()
            }
            $.ajax({
                type: "post",
                url: window.location.pathname + "/reply",
                data: dataToServer,
                success: function (req) {
                    if (req.indexOf("success") > -1) {
                        window.location.reload();
                    }
                }
            })
        } else {
            $("textarea").focus();
        }
    })
})
