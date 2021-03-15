$(function () {
    let form = layui.form;
    form.verify({

        nickname: function (value) {
            if (value.length > 6) {
                return "昵称的长度为1~6位之间"
            }
        }
    })

    initUserInfo();

    var layer = layui.layer;

    function initUserInfo() {
        $.ajax({
            type: "get",
            url: "/my/userinfo",
            data: {},
            success: (res) => {
                if (res.status !== 0) {
                    return layer.msg(res.message);
                }

                form.val('formUserInfo', res.data)
            }
        })
    }


    $('#btnReset').on('click', function (e) {
        e.preventDefault();

        initUserInfo();
    })


    $('.layui-form').on('submit', function (e) {
        e.preventDefault();

        $.ajax({
            type: "post",
            url: "/my/userinfo",
            data: $(this).serialize(),
            success: (res) => {
                if (res.status !== 0) {
                    return layer.msg('用户信息修改成功')
                }
                layer.msg('恭喜您，用户信息修改成功!');

                window.parent.getUserInof();
            }
        })
    })

})