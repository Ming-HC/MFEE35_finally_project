$(function () {
    // console.log(window.location.pathname);
    var path = window.location.pathname
    let index = path.indexOf("/");
    for (let i = 1; i < 3; i++) {
        index = path.indexOf("/", index + 1);
        console.log(index); 
    }

    var url1 = path.slice(0,index)
    console.log(url1);

    var password = url1 + "/password";
    var personal = url1 + "/personal";
    var MYproduct = url1 + "/MYproduct";
    var iwant = url1 + "/iwant";
    var record = url1 + "/record";
    var logout = "/logout";
    var link = document.getElementById("my-link-personal");
    var link2 = document.getElementById("my-link-password");
    var link3 = document.getElementById("my-link-MYproduct");
    var link4 = document.getElementById("my-link-iwant");
    var link5 = document.getElementById("my-link-record");
    var link6 = document.getElementById("my-link-logout");
    link.href = personal;
    link2.href = password;
    link3.href = MYproduct;
    link4.href = iwant;
    link5.href = record;
    link6.href = logout;
    

    $('#my-link-logout').click(() => {
        req.session.user = null;
        if (req.session.user = null) {
            var logout = "/member/login"
            var link4 = document.getElementById("my-link-logout");
            link4.href = logout;
        } else {
            alert("error")
        }
    });
})