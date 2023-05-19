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