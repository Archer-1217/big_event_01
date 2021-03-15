$.ajaxPrefilter(function (options) {

    // 在发起真正的 Ajax 请求之前，统一拼接请求的根路径
    options.url = 'http://ajax.frontend.itheima.net' + options.url


    if (options.url.indexOf('/my/') !== -1) {
        options.headers = {
            Authorization: localStorage.getItem('token') || ''
        }
    }

    options.complete = function (res) {

        let obj = res.responseJSON;

        if (obj.status == 1 && obj.message == '身份认证失败！') {

            localStorage.removeItem('token');
            location.href = '/login.html';
        }
    }
})

