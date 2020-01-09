//====================初始化验证表单====================
$(function () {
    var verifyCode = new GVerify("captcha_img");
    //提交表单
    $("#btnSubmit").bind("click", function () {
        if ($("#txtUserName").val() == "" || $("#txtPassword").val() == "") {
            $("#msgtips").show().text("请填写用户名和登录密码！");
            return false;
        }
        if (typeof (login_question) != "undefined" && login_question == 1) {
            if ($("#question").val() == "") {
                $("#msgtips").show().text("请选择问题！");
                return false;
            }
            if ($("#txtAnswer").val() == "") {
                $("#msgtips").show().text("请填写答案！");
                return false;
            }
        }
        if ($("#txtCode").val() == "") {
            $("#msgtips").show().text("请填写验证码！");
            return false;
        }
        var res = verifyCode.validate($("#txtCode").val());
        if (!res) {
            $("#msgtips").show().text("验证码错误!");
            return false;
        }
        Util.ajax({
            type: "POST",
            url: '/api/user/login',
            data: {
                "username": $("#txtUserName").val(),
                "password": $("#txtPassword").val(),
            },
            timeout: 20000,
            beforeSend: function (XMLHttpRequest) {
                $("#btnSubmit").attr("disabled", true);
                $("#msgtips").show();
                $("#msgtips").text("正在登录，请稍候...");
            },
            success: function (res, textStatus) {
                const data = res.data;
                if (res.status === 1) {
                    if ($('#chkRemember').is(":checked")) {
                        Util.setCookie('token', data.token, { path: '/p', expires: 7 });
                    } else {
                        Util.setCookie('token', data.token, { path: '/p' });
                    }
                    top.location.href = res.data.url;
                } else {
                    $("#btnSubmit").attr("disabled", false);
                    $("#msgtips").text(res.message);
                }
            },
            error: function (XMLHttpRequest, textStatus, errorThrown) {
                $("#msgtips").text("状态：" + textStatus + "；出错提示：" + errorThrown);
                $("#btnSubmit").attr("disabled", false);
            }
        });
        return false;
    });

    //提示问题字体颜色控制
    if ($("#question")) {
        var question_color = $("#question").css("color");
        $("#question").change(function () {
            if ($(this).val() == '') {
                $(this).css("color", question_color);
            } else {
                $(this).css("color", "#333");
            }
        });
    }
});