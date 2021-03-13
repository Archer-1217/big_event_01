$(function () {

    $('#link_reg').on('click', function () {
        $('.login-box').hide();
        $('.reg-box').show();
    });

    $('#link_login').on('click', function () {
        $('.login-box').show();
        $('.reg-box').hide();
    });


    // 自定义表单验证
    let form = layui.form;
    form.verify({

        pwd: [
            /^[\S]{6,12}$/,
            '密码必须6到12位，且不能出现空格'
        ],

        repwd: function (value, item) {
            //value：表单的值、item：表单的DOM对象

            let pwd = $('.reg-box input[name=password]').val();

            if (value !== pwd) {
                return '两次密码输入不一致';
            }
        }
    })

    let layer = layui.layer;
    $('#form_reg').on('submit', function (e) {
        e.preventDefault();

        $.ajax({
            type: "post",
            url: "/api/reguser",
            data: {
                username: $('.reg-box [name=username]').val(),
                password: $('.reg-box [name=password]').val(),
            },
            success: (res) => {
                if (res.status != 0) {
                    return layer.msg(res.message, { icon: 5 });
                }
                layer.msg(res.message, { icon: 6 })

                $('#link_login').click();

                $('#form_reg')[0].reset();
            }
        })
    })

    $('#form_login').submit(function (e) {
        e.preventDefault();

        $.ajax({
            type: "post",
            url: "/api/login",
            data: $(this).serialize(),
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg(res.message, { icon: 5 });
                }

                localStorage.setItem('token', res.token);

                location.href = '/index.html';
            }
        })
    })


})