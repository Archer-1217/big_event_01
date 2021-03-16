$(function () {

    let form = layui.form;
    let layer = layui.layer;

    initCate();

    function initCate() {
        $.ajax({
            type: "get",
            url: "/my/article/cates",
            data: {},
            success: (res) => {
                if (res.status !== 0) {
                    return layer.msg(res.message);
                }

                $('[name=cate_id]').html(template('tpl-cate', res));

                form.render();
            }
        })
    }

    initEditor();


    // 1. 初始化图片裁剪器
    var $image = $('#image')

    // 2. 裁剪选项
    var options = {
        aspectRatio: 400 / 280,
        preview: '.img-preview'
    }

    // 3. 初始化裁剪区域
    $image.cropper(options)


    $('#btnChooseImage').on('click', function () {
        $('#coverFile').click();
    })


    $('#coverFile').change(function (e) {

        let file = e.target.files[0];
        if (file == undefined) {
            return;
        }

        let newImgURL = URL.createObjectURL(file)

        $image.cropper('destroy')
            .attr('src', newImgURL)
            .cropper(options)
    })


    let state = '已发布';
    $('#btnSave2').on('click', function () {
        state = '草稿';
    })


    $('#form-pub').on('submit', function (e) {
        e.preventDefault();

        let fd = new FormData(this);

        fd.append('state', state);

        $image.cropper('getCroppedCanvas', {
            width: 400,
            hight: 280
        })
            .toBlob(function (blob) {
                fd.append('cover_img', blob);

                publishArticle(fd);
            })
    })

    function publishArticle(fd) {
        $.ajax({
            type: "post",
            url: "/my/article/add",
            data: fd,

            contentType: false,
            processData: false,
            success: (res) => {
                if (res.status !== 0) {
                    return layer.msg(res.message);
                }
                layer.msg('恭喜您，发布文章成功！');

                // location.href = '/article/art_list.html'

                setTimeout(function () {
                    window.parent.document.getElementById('art_list').click();
                }, 1000);
            }
        })
    }
})