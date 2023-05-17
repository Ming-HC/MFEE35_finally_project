$(function () {
    $('#iwant').click(function () {
        window.location.href = `iwant`;
    })
    var path = window.location.pathname
    let index = path.indexOf("/");
    for (let i = 1; i < 2; i++) {
        index = path.indexOf("/", index + 1);
        console.log(index);
    }

    var url1 = path.slice(0, index)
    console.log(url1);
})
function judge(event) {
    event.preventDefault();
    if (confirm("确定要提交表单吗?")) {
        // 用户选择确认，继续提交表单
        document.getElementById("myForm").submit();
    } else {
        // 用户选择取消，阻止表单提交
        alert("已取消")
    }
}

