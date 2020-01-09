//=====================初始化代码======================
$(function () {
	//同意条款
	$("#chkAgree").click(function () {
		if ($(this).is(":checked")) {
			$("#btnSubmit").prop("disabled", false);
		} else {
			$("#btnSubmit").prop("disabled", true);
		}
	});
	//输入QQ号自动变QQ邮箱
	$("#txtQQ").blur(function () {
		var qq = $(this).val().replace(/\s/g, '');
		$(this).val(qq);
		if (/^\d{5,13}$/.test(qq)) {
			$("#txtEmail").val(qq + '@qq.com');
		}
	});
	//如果开启注册协议，就要先勾选	
	$("#btnSubmit").click(function () {
		if (typeof (regrules) != "undefined" && regrules == 1) {
			if (!$("#chkAgree").is(":checked")) {
				var d = dialog({ content: "请勾选我已仔细阅读并接受 注册许可协议" }).show();
				setTimeout(function () {
					d.close().remove();
				}, 3000);
				$("#chkAgree").focus();
				return false;
			}
		}
		if ($("#txtPayPassword") && $("#txtPassword").val() != '' && $("#txtPassword").val() == $("#txtPayPassword").val()) {
			var d = dialog({ content: "登录密码不能与二级密码相同！" }).show();
			setTimeout(function () {
				d.close().remove();
			}, 3000);
			$("txtPayPassword").focus();
			return false;
		}
	});


	//初始化验证表单
	$("#regform").Validform({
		tiptype: 3,
		callback: function (form) {
			//AJAX提交表单
			Util.ajax({
				url: '/api/user/register',
				type: 'POST',
				certificate: false,
				beforeSend: showRequest,
				data: {
					platform_type: 'web',
					password: $('#txtPassword').val(),
					confirm_password: $('#txtPassword1').val(),
					pay_password: $('#txtPayPassword').val(),
					confirm_pay_password: $('#txtPayPassword1').val(),
					qq: $('#txtQQ').val(),
					mobile: $('#txtMobile').val(),
					code: $('#txtCode').val(),
					p_name: $('#txtAllianceUser').val(),
					type: $("#type").val()
				},
				success: showResponse,
				error: showError,
			})
			return false;
		}
	});

	//表单提交前
	function showRequest(formData, jqForm, options) {
		$("#btnSubmit").val("提 交 中 ...")
		$("#btnSubmit").prop("disabled", true);
		$("#chkAgree").prop("disabled", true);
	}
	//表单提交后
	function showResponse(data, textStatus) {
		if (data.status == 1) { //成功
			var d = dialog({ content: data.message }).show();
			setTimeout(function () {
				d.close().remove();
				Util.login();
			}, 1500);
		} else { //失败
			dialog({ title: '提示', content: data.message, okValue: '确定', ok: function () { } }).showModal();
			$("#btnSubmit").val("确 定 注 册");
			$("#btnSubmit").prop("disabled", false);
			$("#chkAgree").prop("disabled", false);
		}
	}
	//表单提交出错
	function showError(XMLHttpRequest, textStatus, errorThrown) {
		dialog({ title: '提示', content: "状态：" + textStatus + "；出错提示：" + errorThrown, okValue: '确定', ok: function () { } }).showModal();
		$("#btnSubmit").val("确 定 注 册");
		$("#btnSubmit").prop("disabled", false);
		$("#chkAgree").prop("disabled", false);
	}
});