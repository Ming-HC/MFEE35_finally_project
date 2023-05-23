$(function () {
    $('input[type=file]').change(function handleFiles() {
        var img = document.querySelector('.putimage');
        console.log(img);
        img.src = window.URL.createObjectURL(this.files[0]);
        console.log(img.src);
        img.onload = function () {
            window.URL.revokeObjectURL(this.src);
        }
    })
    $('input[name=district]').change(function() {
        var districtoption = $('input[name=district]:checked').val();
        // console.log(districtoption);
        switch (districtoption) {
            case "north":
                $("div[data-name='north']").prop('style', '');
                $("div[data-name='center']").prop('style', 'display: none;');
                $("div[data-name='south']").prop('style', 'display: none;');
                $("div[data-name='east']").prop('style', 'display: none;');
                $("div[data-name='outside']").prop('style', 'display: none;');
                break;
            case "center":
                $("div[data-name='north']").prop('style', 'display: none;');
                $("div[data-name='center']").prop('style', '');
                $("div[data-name='south']").prop('style', 'display: none;');
                $("div[data-name='east']").prop('style', 'display: none;');
                $("div[data-name='outside']").prop('style', 'display: none;');
                break;
            case "south":
                $("div[data-name='north']").prop('style', 'display: none;');
                $("div[data-name='center']").prop('style', 'display: none;');
                $("div[data-name='south']").prop('style', '');
                $("div[data-name='east']").prop('style', 'display: none;');
                $("div[data-name='outside']").prop('style', 'display: none;');
                break;
            case "east":
                $("div[data-name='north']").prop('style', 'display: none;');
                $("div[data-name='center']").prop('style', 'display: none;');
                $("div[data-name='south']").prop('style', 'display: none;');
                $("div[data-name='east']").prop('style', '');
                $("div[data-name='outside']").prop('style', 'display: none;');
                break;
            case "outside":
                $("div[data-name='north']").prop('style', 'display: none;');
                $("div[data-name='center']").prop('style', 'display: none;');
                $("div[data-name='south']").prop('style', 'display: none;');
                $("div[data-name='east']").prop('style', 'display: none;');
                $("div[data-name='outside']").prop('style', '');
                break;
        
        }
      });
})
function uploadFile() {
    var form = $('#myForm')[0];
    var formData = new FormData(form);
    var productname = $('input:text:eq(0)').val()
    var productdetail = $('input:text:eq(1)').val()
    console.log(form);
    console.log(formData);
    console.log(productname);
    console.log(productdetail);
    // console.log(typeof(formData));
    var x = window.location.pathname
    console.log(x);
    // <img src="/image/MYproduct/upload/productimage_79.jpg" width="100%" height="150" style="object-fit:contain; background-color: rgba(207, 199, 199, 0.959)"></img>
    // $.ajax({
    //     url: x,
    //     type: 'post',
    //     data: {
    //         formData:formData,
    //         productname:productname,
    //         productdetail:productdetail
    //     },
    //     // processData: false,
    //     // contentType: false,
    //     success: function(response) {
    //       // 上傳成功
    //       console.log(response);
    //     }
    //   });
}