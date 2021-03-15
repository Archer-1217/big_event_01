$(function () {

    getUserInof();

    $('#btnLogout').on('click', function () {
        layer.confirm('是否确认退出?', { icon: 3, title: '提示' }, function (index) {
            //do something
            localStorage.removeItem('token');

            location.href = '/login.html'

            layer.close(index);
        });
    })
})

function getUserInof() {
    $.ajax({
        type: "get",
        url: "/my/userinfo",
        // headers: {
        //     Authorization: localStorage.getItem('token') || ''
        // },
        success: (res) => {
            console.log(res);

            if (res.status !== 0) {
                return layui.layer.msg(res.message, { icon: 5 });
            }

            renderAvatar(res.data);
        },
    })
}

function renderAvatar(user) {

    let name = user.nickname || user.username;

    $('#welcome').html('欢迎&nbsp;&nbsp;' + name);

    if (user.user_pic !== null) {

        $('.layui-nav-img').show().attr('src', user.user_pic);
        $('.text-avatar').hide();
    } else {

        $('.layui-nav-img').hide();
        $('.text-avatar').show().html(name[0].toUpperCase());
    }
}