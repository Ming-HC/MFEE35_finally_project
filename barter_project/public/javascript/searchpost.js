$(function () {
    if (sessionStorage.getItem('select_target') && sessionStorage.getItem('select_content')) {
        search();
    }

    function search(req) {
        if (req) {
            sessionStorage.setItem('select_target', $('.search_select').val());
            sessionStorage.setItem('select_content', $('.search>input').val());
            window.location.reload();
        } else {
            var url = window.location.pathname;
        }
        $('.search_select').val(sessionStorage.getItem('select_target'));
        $('.search>input').val(sessionStorage.getItem('select_content'));
        var dataToServer = {
            select_target: $('.search_select').val(),
            select_content: $('.search>input').val()
        };
        $.ajax({
            type: 'post',
            url: url,
            data: dataToServer,
            success: (req) => {
                $(".searchResult").text(`${$('.search>input').val()}，共 ${req.reslength} 筆。`)
                $.each(req.postlist, (index, item) => {
                    var postd = new Date(item.latestReply_time_format);
                    var d = new Date();
                    var posttime = (d - postd) / 1000;
                    if (posttime < 60) {
                        item.latestReply_time_format = `1分內`;
                    } else if (posttime < (60 * 60)) {
                        item.latestReply_time_format = `${Math.floor(posttime / 60)}分前`;
                    } else if (posttime < (60 * 60 * 24)) {
                        item.latestReply_time_format = `${Math.floor(posttime / 60 / 60)}小時前`;
                    } else if (posttime >= (60 * 60 * 24)) {
                        item.latestReply_time_format = `${Math.floor(posttime / 60 / 60 / 24)}天前`;
                    }
                    appendPost(item.post_id, item.class_name, item.title, item.content, item.reply, item.views, item.user, item.latestReply_user, item.latestReply_time_format);
                })
                $('.page').html('');
                var url = window.location.pathname;
                if (req.page == 1) {
                    $('.page').append(`<span>1</span>`)
                } else {
                    for (let i = 1; i <= req.page; i++) {
                        if (url.split("/").reverse()[0] == i || (url.split("/").reverse()[0] == "search" && i == 1)) {
                            $('.page').append(`<span>${i}</span>`)
                        } else {
                            $('.page').append(`<a href="/forum/search/${i}"><span>${i}</span></a>`);
                        }
                    }
                }
            }
        })
        function appendPost(post_id, post_class, title, content, reply, views, user, latestReply_user, latestReply_time) {
            var newTR = $('<tr>');
            newTR.append(`<td><label>${post_class}</label></td>`);
            newTR.append(`<td><a href="/forum/post/${post_id}"><label>${title}</label></a>
                        <label>${content}</label></td>`);
            newTR.append(`<td><label>${reply}</label> / <label>${views}</label></td>`);
            newTR.append(`<td><a href=""><label>${user}</label></a></td>`);
            newTR.append(`<td><a href=""><label>${latestReply_user}</label></a><label>${latestReply_time}</label></td>`);
            $('#postResult').append(newTR);
        }
    }

    $('#search_submit').click(() => {
        if ($(".search input").val() != "") {
            search("reset");
        } else {
            $(".search input").focus();
        }
    })
})