$(function () {

    initArtCateList();

    function initArtCateList() {

        $.ajax({
            type: "get",
            url: "/my/article/cates",
            data: {},
            success: (res) => {
                $('tbody').html(template('tpl-art-cate', res))
            }
        })
    };


    let layer = layui.layer;
    $('#btnAdd').on('click', function () {
        indexAdd = layer.open({
            type: 1,
            title: '添加文章分类',
            area: ['500px', '260px'],
            content: $('#dialog-add').html(),
        })
    })


    let indexAdd = null;
    $('body').on('submit', '#form-add', function (e) {
        e.preventDefault();

        $.ajax({
            type: "post",
            url: "/my/article/addcates",
            data: $(this).serialize(),
            success: (res) => {
                if (res.status !== 0) {
                    return layer.msg(res.message);
                }

                initArtCateList();
                layer.msg('恭喜您，文章类别添加成功!')
                layer.close(indexAdd);
            }
        })
    })


    let indexEdit = null;
    let form = layui.form;
    $('tbody').on('click', '.btn-edit', function () {

        indexEdit = layer.open({
            type: 1,
            title: '修改文章分类',
            area: ['500px', '260px'],
            content: $('#dialog-edit').html(),
        })


        let Id = $(this).attr('data-id');
        $.ajax({
            type: "get",
            url: "/my/article/cates/" + Id,
            data: {},
            success: (res) => {

                form.val('form-edit', res.data)
            }
        })
    });


    $('body').on('submit', '#form-edit', function (e) {
        e.preventDefault();

        $.ajax({
            type: "post",
            url: "/my/article/updatecate",
            data: $(this).serialize(),
            success: (res) => {
                if (res.status !== 0) {
                    return layer.msg(res.message);
                }

                initArtCateList();
                layer.msg('恭喜您，文章类别更新成功!')
                layer.close(indexEdit);
            }
        })
    })


    $('tbody').on('click', '.btn-delete', function () {

        let Id = $(this).attr('data-id');

        layer.confirm('是否确认删除?', { icon: 3, title: '提示' }, function (index) {
            //do something
            $.ajax({
                type: "get",
                url: "/my/article/deletecate/" + Id,
                data: {},
                success: (res) => {
                    if (res.status !== 0) {
                        return layer.msg(res.massage);
                    }

                    initArtCateList();
                    layer.msg('删除成功!');

                }
            })
            layer.close(index);
        })

    })
})