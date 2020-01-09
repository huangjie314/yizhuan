//====================订购快递页面js====================
$(function(){
	show_come_name($("#has_taskno").val());
	$("#com_name").change();
});
    
function InitUploader(size) {
	$(".upload-box").InitUploader({ btntext: "导入CSV表格快速下单", filesize: "" + size + "", filetypes: "csv,xls,xlsx", mimeTypes: ".csv,.xls,.xlsx", sendurl: "/tools/upload_ajax.ashx", swf: "/scripts/webuploader/uploader.swf" });
}

function change_seleted_value(obj) {
	var price = $(obj).find("option:selected").attr("price");
	$("#no_taskno_price_box").hide();
	$("#has_taskno_price_box").hide();
	if(!price) return;
	if($("#has_taskno").val() == "1") //表示有任务单号
	{
		$("#has_taskno_price").html(price);
		$("#has_taskno_price_box").show();
	}else{
		$("#no_taskno_price").html(price);
		$("#no_taskno_price_box").show();
	}
}

function import_excel()
{
	var path = $("#file_url").val();
	if(path.indexOf(".csv") > 0 || path.indexOf(".xls") > 0 || path.indexOf(".xlsx") > 0)
	{
		$.ajax({
			type: "POST",
			url: "/tools/submit_ajax.ashx?action=express_address_import",
			data: {
				"path": path
			},
			dataType: "json",
			timeout: 20000,
			success: function(data, textStatus) {
				if (data.status == 1){
					$("#md_messages").val(data.msg.replace(/\|\|/gm, "\r\n"));
				} else {
					dialog({title:'提示', content:data.msg, okValue:'确定', ok:function (){}}).showModal();
				}
			},
			error: function (XMLHttpRequest, textStatus, errorThrown) {
				dialog({title:'提示', content:"状态：" + textStatus + "；出错提示：" + errorThrown, okValue:'确定', ok:function (){}}).showModal();
			}
		});
	}
}

function set_com_name()
{
	var addr_id = $("#history_addr").find("option:selected").val();
	var kuaidi_id = $("#com_name").find("option:selected").val();
	if (kuaidi_id == '') {
		dialog_show("请先选择快递名！");
		return;
	}
	$.ajax({
		type: "POST",
		url: "/tools/submit_ajax.ashx?action=express_address_setkd",
		data: {
			"id": addr_id,
			"kuaidi_id": kuaidi_id
		},
		dataType: "json",
		timeout: 20000,
		success: function(data, textStatus) {
			if (data.status == 1){
				var d = dialog({content:data.msg}).show();
				setTimeout(function () {
					d.close().remove();
				}, 2000);
			} else {
				dialog({title:'提示', content:data.msg, okValue:'确定', ok:function (){}}).showModal();
			}
		},
		error: function (XMLHttpRequest, textStatus, errorThrown) {
			dialog({title:'提示', content:"状态：" + textStatus + "；出错提示：" + errorThrown, okValue:'确定', ok:function (){}}).showModal();
		}
	});
}

function check_address()
{
	var regPatrn=(document.all)? /\r\n/mg : /\n/mg;
	var shAddr = trim($("#md_messages").val()).replace(/,/gm, "，");
	var addr_arr = shAddr.split(regPatrn);
	if ($("#has_taskno").val() == '1')
	{	
		if ($("#task_no").val() == '') {
			dialog_show("请填写你发布的任务编号！<br>如果没有任务编号，请选择“我要单独购买”方式！谢谢！");
			return false;
		}
		if(addr_arr.length > 1)
		{
			dialog_show("抱歉！任务编号订购方式，一次只能填写一条收货地址！");
			return false;
		}
	}

	if(addr_arr.length > 100)
	{
		dialog_show("抱歉！最多批量订购100条，请分批提交，谢谢!");
		return false;
	}
	for(var i = 0; i < addr_arr.length; i++)
	{
		var addr = trim(addr_arr[i]);
		if(addr != '')
		{
			if(!/^([^,，]+?)[,，](([0-9]{11,12}[,，]?)|([,，]?[0-9\-]{11,15}))+?[,，]([\u4e00-\u9fa5]+\s+[\u4e00-\u9fa5]+\s+[\u4e00-\u9fa5]+\s+[^,，]+?)[,，](\d{6,6})$/.test(addr))
			{
				var row = "";
				if (i > 0) {
					row = "第" + (i + 1) + "行：";
				}
				dialog_show("抱歉！收货地址" + row + " " + addr + "<br>填写的格式不对，请按页面提示的格式填写，注意省市区之间的3个空格和各个逗号！");
				return false;
			}
		}
	}
	return true;
}

function dialog_show(tip) 
{                       
	dialog({ title: '提示', content: tip, okValue: '确定', ok: function () { } }).showModal();
}

function trim(str){return str.replace(/(^\s*)|(\s*$)/g, ""); }