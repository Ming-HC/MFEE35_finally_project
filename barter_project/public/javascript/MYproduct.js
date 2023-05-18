$(function () {
    var path = window.location.pathname
    let index = path.indexOf("/");
    for (let i = 1; i < 3; i++) {
        index = path.indexOf("/", index + 1);
        console.log(index); 
    }

    var url1 = path.slice(0,index)
    console.log(url1);

    $('#plus').click(function () {
        window.location.href = url1 + `/puton`;
    })
})
function deldata(MYproductid) {
    if (confirm("您確定要刪除這個文件嗎？")) {
        $.ajax({
            type: 'delete',
            url: 'MYproduct',
            data: { MYproductid: MYproductid },
            success: function(){
                alert("刪除成功")
                location.reload();
            }
        })
    } else {
        // console.log(product_id)
    }
}

