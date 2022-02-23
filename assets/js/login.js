$(function () {
    // 点击“去注册”
    $('#link_reg').on('click', function () {
        $('.reg-box').show()//注册框显示
        $('.login-box').hide()

    })
    //点击“去登录”
    $('#link_login').on('click', function () {
        $('.login-box').show() //登录框显示
        $('.reg-box').hide()

    })



    layui.use("form", function () {
        var form = layui.form
        form.verify({
            pwd: [
                /^[\S]{6,12}$/,
                '密码必须6-12位，且不能出现空格'
            ],
            repwd: function (value) {
                var pwd = $('.reg-box [name=password]').val()
                if (pwd !== value) {
                    return '两次密码不一致'
                }
            }
        })
    })

    //注册提交事件
    $("#form_reg").on("submit", function (e) {
        e.preventDefault();
        var data = {
            username: $("#form_reg [name=username]").val(),
            password: $("#form_reg [name=password]").val()
        }

        $.post('/api/reguser', data, function (res) {
            if (res.status != 0) {
                return layer.msg(res.message)
            }
            layer.msg('注册成功，请登录')
            $("#link_login").click()
        })
    })

    //登录提交事件
    $("#form_login").on("submit", function (e) {
        e.preventDefault()

        var data = {
            username: $("#form_login [name=username]").val(),
            password: $("#form_login [name=password]").val()
        }

        $.ajax({

            url: '/api/login',
            method: "POST",
            data: $(this).serialize(),
            success:function(res) {
                if (res.status != 0) {
                    return layer.msg("登录失败")
                }
                layer.msg('登录成功')
                localStorage.setItem('token', res.token)
                location.href = 'http://www.liulongbin.top:3007/index.html'
            }
        })

    })


})