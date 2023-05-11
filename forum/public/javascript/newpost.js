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
                member.username = req.logined_user;
            }
        })
        function appendClass(class_eng, class_name) {
            $('#classResult').append(`
                <option value="${class_eng}">${class_name}</option>
            `);
        }
    }
    getPostClass();
    $('#submit button').on('click', function () {
        console.log(member.username);
        console.log($(`option[value=${$('select').val()}]`).text());
        console.log($('input[type=text]').val());
        console.log($('textarea').val());
        var dataToServer = {
            member: member.username,
            class_name: $(`option[value=${$('select').val()}]`).text(),
            title: $('input[type=text]').val(),
            content: $('textarea').val()
        };
        $.ajax({
            type: 'POST',
            url: '/forum/newpost/new',
            data: dataToServer,
            success: function (req) {
                location.href = '/forum';
            }
        })
    })
})