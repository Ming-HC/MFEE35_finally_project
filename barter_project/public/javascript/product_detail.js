$(function(){
<<<<<<< HEAD
=======
var dataToServer = {
    user_name:"三玖"
};

>>>>>>> 2025438ae6f9905293a6ddc910b76fef4633e855
    function getProductList(){
        var myPath = window.location.pathname;
        // console.log(myPath);
        ///product/4/detail

        $('a[class="btn"]').on('click',function(){
            // var x = window.history.back();
            const productDetailURL = sessionStorage.getItem('productDetailURL');

            if(productDetailURL){
                sessionStorage.removeItem('productDetailURL');

                window.location.href = productDetailURL;
            }else{
                alert('抱歉我壞掉了Q_Q')
            }
        })
// 渲染商品詳細頁密上半部畫面
    $.ajax({
      url: `${myPath}/product_detail`,
      type:"GET",
      success: function(productList){
                // console.log(productList.user_image);
                // {product_id: 4, product_name: '小女孩1', product_image: '/image/product/106543200_p1.jpg', user_name: '三玖', city: '台中市', …}
// 判斷使用者有無頭像
                if(productList.user_image !== null){
                    $('#product_detail_up').text('');
                    $('#product_detail_up').append(`
                    <div id="" class="product_detail_up_productimage">
                    <img class="rounded" id = "WCPID_${productList.product_id}" src="${productList.product_image}"> 
                    <div id="product_detail_page" class="text-center">
                    </div>
                    </div>               
                    <div id="" class="align-self-center product_detail_up_text">
                        <div id="" class="PDUT1"><span>${productList.product_name}</span></div><br>
                        <div id="" class="PDUT2">刊登時間 | ${productList.lunch_date}<span></span></div>
                        <div id="" class="PDUT3">地區 | ${productList.city}<span></span></div>
                        <div id="" class="PDUT3">方式 | ${productList.method}<span></span></div>
                        <div id="" class="product_detail_up_button">
                            <!-- 綁定驗證是否已登入 -->
                            <button id="changeBTN" class="btn btn-primary btn-lg" onclick="">我要交換</button>
                        </div>
                    </div>
                    <div id=""  class="text-center product_detail_userimage">
                        <img class="rounded-circle" src="${productList.user_image}"></img>
<<<<<<< HEAD
                        <div><a href="/member/${productList.user_name}"><span>${productList.user_name}</span></a></div>
=======
                        <div><span>${productList.user_name}</span></div>
>>>>>>> 2025438ae6f9905293a6ddc910b76fef4633e855
                    </div>
                    `
                    );
                }else{
                    var user_image = '/image/member/demo.png'
                    $('#product_detail_up').text('');
                    $('#product_detail_up').append(`
                    <div id="" class="product_detail_up_productimage">
                    <img class="rounded" id = "WCPID_${productList.product_id}" src="${productList.product_image}"> 
                    <div id="product_detail_page" class="text-center">
                    </div>
                    </div>               
                    <div id="" class="align-self-center product_detail_up_text">
                        <div id="" class="PDUT1"><span>${productList.product_name}</span></div><br>
                        <div id="" class="PDUT2">刊登時間 | ${productList.lunch_date}<span></span></div>
                        <div id="" class="PDUT3">地區 | ${productList.city}<span></span></div>
                        <div id="" class="PDUT3">方式 | ${productList.method}<span></span></div>
                        <div id="" class="product_detail_up_button">
                            <!-- 綁定驗證是否已登入 -->
                            <button id="changeBTN" class="btn btn-primary btn-lg" onclick="">我要交換</button>
                        </div>
                    </div>
                    <div id=""  class="text-center product_detail_userimage">
                        <img class="rounded-circle" src="${user_image}"></img>
<<<<<<< HEAD
                        <div><a href="等待設定"><span>${productList.user_name}</span></a></div>
=======
                        <div><span>${productList.user_name}</span></div>
>>>>>>> 2025438ae6f9905293a6ddc910b76fef4633e855
                    </div>
                    `
                    );
                }
// 商品詳細資訊
                $('#tabs1-1').html('');
<<<<<<< HEAD
                $('#tabs1-1').append(`${productList.product_detail}`)
=======
                if(productList.product_detail !== null){
                    $('#tabs1-1').append(`${productList.product_detail}`)
                }else{
                    $('#tabs1-1').append(``)
                }
>>>>>>> 2025438ae6f9905293a6ddc910b76fef4633e855
// 想交換此商品對象
                    $.ajax({
                        type: "post",
                        url: "/product/WCPinfo",
                        data: {
                            product_id: document.querySelector('img[id^="WCPID"]').id.substring(6)
                        },
                        success: function(productList){
                            $('#tabs1-3').html('');
                            $.each(productList,function(index,item){
                                $('#tabs1-3').append(`
                                <div class= "WCPL border-bottom">
                                <div id="" class="BWC_IMG">
                                    <a href="/product/${productList[index].BWC_product_id}/detail"><img class="rounded" src="${productList[index].BWC_product_image}"></a> 
                                </div>              
                                <div id="" class="BWC_content">
                                    <div class="BWC_content_inside ms-3">
                                        <a href="/product/${productList[index].BWC_product_id}/detail"><div id="" class="">${productList[index].BWC_product_name}</div></a>
                                        <div id="" class="">刊登時間 | ${productList[index].BWC_lunch_date}</div>
                                        <div id="" class="">地區 | ${productList[index].BWC_city}</div>
                                        <div id="" class="">方式 | ${productList[index].BWC_method}</div><br>
<<<<<<< HEAD
                                        <div id="" class="">會員 | <a href="/member/${productList[index].BWC_user_name}">${productList[index].BWC_user_name}</a></div>
=======
                                        <div id="" class="">會員 | ${productList[index].BWC_user_name}</div>
>>>>>>> 2025438ae6f9905293a6ddc910b76fef4633e855
                                    </div>
                                </div>
                                </div>                                     
                            `);
                            })
                        }
                    })
                    $.ajax({
                        type: "get",
                        url: "/product/member/QA",
                        data: {
                            product_id: document.querySelector('img[id^="WCPID"]').id.substring(6),
                        },
                        success: function(e){
                            // console.log(e);
                            if(e.length !== 0){
                                $.each(e,function(index,item){
                                    // console.log(e[index].reply);
                                    if(e[index].reply !== null){
                                        $('.showQA').append(`
                                        <div class="border-bottom">
                                        <div>
<<<<<<< HEAD
                                            <a href="/member/${e[index].username}"><span>${e[index].username} </span></a>
=======
                                            <span>${e[index].username} </span>
>>>>>>> 2025438ae6f9905293a6ddc910b76fef4633e855
                                            <span> 於 ${e[index].Question_date}</span>
                                        </div>
                                        <div>發問 : ${e[index].content}</div>
                                        <div>回覆 : ${e[index].reply}</div>
                                        </div>
                                        `)
                                    }else{
                                        $('.showQA').append(`
                                        <div class="border-bottom">
                                        <div>
<<<<<<< HEAD
                                            <a href="/member/${e[index].username}"><span>${e[index].username} </span></a>
=======
                                            <span>${e[index].username} </span>
>>>>>>> 2025438ae6f9905293a6ddc910b76fef4633e855
                                            <span>  於 ${e[index].Question_date}</span>
                                        </div>
                                        <div>發問 : ${e[index].content}</div>
                                        <div>回覆 :  </div>
                                        </div>
                                        `)
                                    }

                                })
                            }else{
                                // console.log('沒東西')
                            }
      
                        }
                    })
                        // 如果資料庫搜尋回傳不為空，則有訊息紀錄

                    if ($(".navbar-brand").prop("href").indexOf("login") !== -1) {
                        $('.Nlogin').removeClass('d-none');

                    }else{
                        $('.Blogin').removeClass('d-none');
                        $('#QA_send').on('click',function(){
                            if($('#QA').val() !== ''){
                                var QAV = $('#QA').val();
                                // console.log(QAV);
                                // var x = $('.PDUT1>span').html();
                                // console.log(x);
                                $.ajax({
                                    type: 'get',
                                    url: '/navbar_headshot',
                                    success: (req) =>{
                                        // console.log(req);
                                        // console.log(QAV);
                                        // console.log($('.PDUT1>span').html());
                                        $.ajax({
                                            type: "get",
                                            url: `${myPath}/QA`,
                                            data: {
                                                content: QAV,
                                                username: req.username,
                                                product_name: $('.PDUT1>span').html(),
                                                product_id: document.querySelector('img[id^="WCPID"]').id.substring(6),
<<<<<<< HEAD
                                                user_id: req.member_id
=======
                                                user_id: req.memberid
>>>>>>> 2025438ae6f9905293a6ddc910b76fef4633e855
                                            },
                                            success: function(e){
                                                window.open( myPath , "_self");
                                            }
                                        })
                                        
                                    }
                                })
                            }else{
<<<<<<< HEAD
                                alert('沒有輸入請送出喔>_0')
=======
                                alert('沒有輸入請勿送出喔>_0')
>>>>>>> 2025438ae6f9905293a6ddc910b76fef4633e855
                            }
    
                            
                        })
                    }

                    
                
                                            
                   




//商品詳細頁面中的我要交換按鈕事件綁定    
$('#changeBTN').bind({
    click: function(){
        change();
    }
})
$('#comfirmchange').bind({
    click: function(){
        myconfirm();
    }
})






      }
    })
  }
// 呼叫重新渲染上半部頁面
  getProductList();









// 關閉彈跳視窗

// dialog中的確認交換綁定事件


// 接下來要傳遞到後端的資料
var wannaChange = [];
<<<<<<< HEAD
var dataToServer = {
    user_name: "三玖"
}
=======

>>>>>>> 2025438ae6f9905293a6ddc910b76fef4633e855
// 確認使用者有無勾選的判斷基準布林宣告
var checkboxS = false;






// dialog關閉視窗功能，同時清除未完成的帶傳輸資料
$('#cancelchange').bind({
    click: function(){
        closedialog();
    }
})

var closedialog = () => {
    document.querySelector('#cat').close();
    wannaChange = [];
    checkboxS = false;
    // console.log('取消了');
    
}










// 點選我要交換後，dialog顯示內容重新渲染
var change = ()=>{
    wannaChange = [];
<<<<<<< HEAD

=======
>>>>>>> 2025438ae6f9905293a6ddc910b76fef4633e855
    if ($(".navbar-brand").prop("href").indexOf("login") !== -1) {
        window.open("/member/login", "_self");
        // document.querySelector('#makeSure').showModal();

    }else{
            // 有登入才會重新渲染
<<<<<<< HEAD
                document.querySelector('#cat').showModal();
                $.ajax({
                    type:"post",
                    url: "/product/:product_detail/detail/product_detail",
                    data: dataToServer,
                    success: (e) => {
                        $('#userproduct').html('');
                        // console.log(e)
                        $.each(e,function(index,item){
                            $('#userproduct').append(`<div class="d-flex flex-row changedialog">
                            <div id="" class="wannaChangeItem${index} dialog_product">
                                <input type="checkbox" id="wannaChangeItem_${index}" class="dialogcheck wannaChangeItem${index}" data-id=${index}>
                            </div>
                            <div class="dialogIMG border-start wannaChangeItem${index}">
                                <img id="product_id_${e[index].product_id}" src="${e[index].product_image}" >
                            </div>
                            <div class="border-start wannaChangeItem${index}">
                            ${e[index].product_name}
                            </div>
                            <div class="border-start wannaChangeItem${index}">
                            ${e[index].lunch_date}
                            </div>
                        </div>`);
        
                        })
        
                     
        // 讓使用者一次只能勾選一個商品交換
                        $('.dialogcheck').on('change', function() {
                            $('.dialogcheck').not(this).prop('checked', false);
                            // wannaChange = [];
                         });
        
        // 確認哪一個checkbox送出當下被勾選並且準備好資料傳輸到後台
                         $('.changedialog').on('change', '.dialogcheck' , function() {            
                            // const checked2 = $('#userproduct').find('.dialogcheck:checked');
                            const checked = $('#userproduct').find('.dialogcheck:checked');
        
                            
        // 判斷使用者有無勾選
                        if ($(".dialogcheck:checked").length !== 0) {
                            checkboxS = true;
                            checked.each(function(index,item) {
                                const id = $(this).data('id');
                              //   console.log(`Checkbox with data-id=${id} is checked`);
        // 取使用者勾選的商品的ID，讓後續可以依照物品ID繼續搜尋
                              var x = $('.dialogIMG')[id].querySelector('img').id.substring(11);
                              // console.log(x)
                              // console.log($('.dialogcheck')[id].checked)
                              if ($('.dialogcheck')[id].checked !== false) {
                                  wannaChange[0] = x;
                                  var testid = document.querySelector('img[id^="WCPID"]').id.substring(6);
                                  wannaChange[1] = testid;
                                // console.log(testid);
                                //   console.log(wannaChange);
                              }else{
                                  checkboxS = false;
                                  console.log('取消了')
                              }
          
          
                          });
                        }else{
        // 若使用者取消勾選，把原本要送出的資料也清空
                            checkboxS = false;
                            wannaChange = [];
                        }    
                          });
        
        
                    } 
                })
=======
                
// 先檢查登入資料取得使用者名稱
                $.ajax({
                    type: 'get',
                    url: '/navbar_headshot',
                    success: (req) =>{
                        console.log(req);
                        dataToServer = {user_name:req.username} ;
// 再用登入的使用者指定給dataToServer傳回後端搜尋
                        $.ajax({
                            type:"post",
                            url: "/product/:product_detail/detail/product_detail",
                            data: dataToServer,
                            success: (e) => {
                                $('#userproduct').html('');
                                // console.log(e)
                                if(e.length == 0){
                                    alert('您並沒有可以交換的物品喔~')
                                }else{
                                    document.querySelector('#cat').showModal();
                                    $.each(e,function(index,item){
                                        $('#userproduct').append(`<div class="d-flex flex-row changedialog">
                                        <div id="" class="wannaChangeItem${index} dialog_product">
                                            <input type="checkbox" id="wannaChangeItem_${index}" class="dialogcheck wannaChangeItem${index}" data-id=${index}>
                                        </div>
                                        <div class="dialogIMG border-start wannaChangeItem${index}">
                                            <img id="product_id_${e[index].product_id}" src="${e[index].product_image}" >
                                        </div>
                                        <div class="border-start wannaChangeItem${index}">
                                        ${e[index].product_name}
                                        </div>
                                        <div class="border-start wannaChangeItem${index}">
                                        ${e[index].lunch_date}
                                        </div>
                                    </div>`);
                    
                                    })
                                }

                
                             
                // 讓使用者一次只能勾選一個商品交換
                                $('.dialogcheck').on('change', function() {
                                    $('.dialogcheck').not(this).prop('checked', false);
                                    // wannaChange = [];
                                 });
                
                // 確認哪一個checkbox送出當下被勾選並且準備好資料傳輸到後台
                                 $('.changedialog').on('change', '.dialogcheck' , function() {            
                                    // const checked2 = $('#userproduct').find('.dialogcheck:checked');
                                    const checked = $('#userproduct').find('.dialogcheck:checked');
                
                                    
                // 判斷使用者有無勾選
                                if ($(".dialogcheck:checked").length !== 0) {
                                    checkboxS = true;
                                    checked.each(function(index,item) {
                                        const id = $(this).data('id');
                                      //   console.log(`Checkbox with data-id=${id} is checked`);
                // 取使用者勾選的商品的ID，讓後續可以依照物品ID繼續搜尋
                                      var x = $('.dialogIMG')[id].querySelector('img').id.substring(11);
                                      // console.log(x)
                                      // console.log($('.dialogcheck')[id].checked)
                                      if ($('.dialogcheck')[id].checked !== false) {
                                          wannaChange[0] = x;
                                          var testid = document.querySelector('img[id^="WCPID"]').id.substring(6);
                                          wannaChange[1] = testid;
                                        // console.log(testid);
                                        //   console.log(wannaChange);
                                      }else{
                                          checkboxS = false;
                                          console.log('取消了')
                                      }
                  
                  
                                  });
                                }else{
                // 若使用者取消勾選，把原本要送出的資料也清空
                                    checkboxS = false;
                                    wannaChange = [];
                                }    
                                  });
                
                
                            } 
                        })
                    }
                })

>>>>>>> 2025438ae6f9905293a6ddc910b76fef4633e855
    }
    
}


// 確認哪個有勾選




function myconfirm(){
    if (checkboxS !== true) {
        $('#changeForm').submit(function(event) {
            event.preventDefault();
        })
        // console.log(wannaChange);
        alert('請選取至少一個商品喔!');

    }else{
        let myconfirmvalue = confirm('確定要申請交換此物品?');
        if(myconfirmvalue){
            
// 若為表單 可以直接選取submib或是該表單內type為方法
            $('#changeForm').submit(function(event) {
// 讓頁面不要亂跳
                event.preventDefault();
                // console.log(wannaChange)
                $.ajax({
                    type: "post",
                    url: "/product/member/wannaChange",
                    data: {wannaChange},
                    success: function(e){
                        
                        alert('申請已送出!');
// 跳轉回商品首頁
                        // location.replace('/product')
                        window.open("/product", "_self");
    
    
                    }
                })
            })
            return true;
        }else{
            return false;
        }
    }

}





// 切換點選的清單跟顏色
$('#down_list a').on('click', function (e) {
    e.preventDefault()
    $(this).tab('show')
})

// 切換清單顯示區塊
$('.d-dp').on('click',function(){
    showLi($(this).index());
    // alert($(this).index());
})
var showLi = (i) => {
    $('.d-show').addClass('d-none');
    if(i !== null){
        $('.d-show').eq(i).removeClass('d-none');
    }
}









})



















