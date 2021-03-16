$(function () {

    template.defaults.imports.dateFormat = function (dtStr) {   //.slice(0,-4)
        let dt = new Date(dtStr);

        let y = dt.getFullYear();
        let m = padZero(dt.getMonth() + 1);
        let d = padZero(dt.getDate());

        let hh = padZero(dt.getHours());
        let mm = padZero(dt.getMinutes());
        let ss = padZero(dt.getSeconds());

        return y + '-' + m + '-' + d + ' ' + hh + ':' + mm + ':' + ss
    }

    function padZero(n) {
        return n > 9 ? n : '0' + n;
    }

    let q = {
        pagenum: 1,//页码值
        pagesize: 4,//每页显示行数
        cate_id: '',//文章分类id
        state: '',//文章状态：已发布，草稿
    }

    var layer = layui.layer;

    initTable();

    function initTable() {

        $.ajax({
            type: "get",
            url: "/my/article/list",
            data: q,
            success: (res) => {
                if (res.status !== 0) {
                    return layer.msg('获取文章列表失败！')
                }

                $('tbody').html(template('tpl-table', res))

                renderPage(res.total);
            }
        })
    }


    let form = layui.form;

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


    $('#form-search').on('submit', function (e) {
        e.preventDefault();

        let state = $('[name=state]').val();
        let cate_id = $('[name=cate_id]').val();

        q.state = state;
        q.cate_id = cate_id;

        initTable();
    })


    function renderPage(total) {
        alert(total);
    }


    let laypage = layui.laypage;
    function renderPage(total) {

        laypage.render({
            elem: 'pageBox',//注意，这里的test1 是 ID，
            count: total,//数据总数 服务端得到
            limit: q.pagesize,//每页几条
            curr: q.pagenum,//第几页

            layout: ['count', 'limit', 'prev', 'page', 'next', 'skikp'],
            limits: [2, 3, 5, 10],//每页显示多少条数据的选择器

            jump: function (obj, first) {
                if (!first) {

                    q.pagenum = obj.curr;
                    q.pagesize = obj.limit;

                    initTable();
                }
            }
        })
    }



    $('tbody').on('click', '.btn-delete', function () {
        let Id = $(this).attr('data-id');

        layer.confirm('是否确认删除？', { icon: 3, title: '提示' }, function (index) {

            $.ajax({
                type: "get",
                url: "/my/article/delete/" + Id,
                data: {},
                success: (res) => {
                    if (res.status !== 0) {
                        return layer.msg(res.message)
                    }

                    initTable();
                    layer.msg('恭喜您，文章删除成功！')

                    if ($('.btn-delete').length == 1 && q.pagenum > 1) q.pagenum--;
                }
            })

            layer.close(index);
        })
    })


})