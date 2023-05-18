$(function () {
    if ($(".navbar-brand").prop("href").indexOf("login") == -1) {
        $.ajax({
            type: 'get',
            url: '/navbar_headshot',
            success: function (req) {
                if (req.headshot) {
                    if (req.headshot.indexOf("headshot") == -1) {
                        $(".d-none.d-md-block img").prop("src", req.headshot);
                        $(".navbar-brand.d-md-none img").prop("src", req.headshot);
                    } else {
                        $(".d-none.d-md-block img").prop("src", `/image/member/upload/headshot/${req.headshot}`);
                        $(".navbar-brand.d-md-none img").prop("src", `/image/member/upload/headshot/${req.headshot}`);
                    }
                } else {
                    $(".d-none.d-md-block img").prop("src", "/image/member/demo.png");
                    $(".navbar-brand.d-md-none img").prop("src", "/image/member/demo.png");
                }
            }
        })
    }
})