$(function () {
    $.ajax({
        type: 'get',
        url: '/forum/get_productdata',
        success: (req) => {
            req.forEach((data, index) => {
                $('.insidediv').append(`<a class="img_block" href="/product/${data.product_id}/detail"><img src="${data.product_image}" alt="${data.product_name}"><div class="img_tip">${data.product_name}</div></a>`);
            })
            if (window.innerWidth > 767) {
                var scrolltimes = 4
            } else if (window.innerWidth > 530) {
                var scrolltimes = 6
            } else {
                
            }
            var maxscrollwidth = $('.insidediv')[0].scrollWidth - $('.insidediv')[0].clientWidth;
            var scrollvalue = maxscrollwidth / scrolltimes;
            var flag = 1;
            $(".scrollbtn").on('click', function (event) {
                var targetscroll = $('.insidediv')[0].scrollLeft;
                if (event.target.className.indexOf('nextbtn') > -1 && flag) {
                    flag = 0;
                    $('.insidediv').animate({
                        scrollLeft: targetscroll == maxscrollwidth ? 0 : targetscroll + scrollvalue
                    }, 800, ()=>{flag = 1;})
                } else if (event.target.className.indexOf('prevbtn') > -1 && flag) {
                    flag = 0;
                    $('.insidediv').animate({
                        scrollLeft: targetscroll == 0 ? maxscrollwidth : targetscroll - scrollvalue
                    }, 800, ()=>{flag = 1;})
                }
            })
        }
    })
})