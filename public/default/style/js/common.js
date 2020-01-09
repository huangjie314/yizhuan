//****************************************************************
//  常用js函数
//****************************************************************

//根据id返回一个对象 在没有引入JQuery时可使用
function getObj(a){return(typeof(a)=="object")?a:document.getElementById(a)}
//取值
function getValue(a){return getObj(a).value}
//取选择的单选或复选项的值
function getRV(b){var d="";var a=document.getElementsByName(b);for(var c=0;c<a.length;c++){if(a[c].checked){d=a[c].value}}return d}
//设置值
function setValue(b,a){getObj(b).value=a}

function replaceSpace(str){   //删除字符串中所有空格  
	return str.replace(/\s/g,"");   
}
function Trim(str){  //删除左右两端的空格 
	return str.replace(/(^\s*)|(\s*$)/g, ""); 
} 
function Ltrim(str){  //删除左边的空格 
	return str.replace(/(^\s*)/g,""); 
} 
function Rtrim(str){  //删除右边的空格 
	return str.replace(/(\s*$)/g,""); 
} 


//发送站内消息
//需要引入dialog插件
function sendMsg(user_name) {
	dialog({
		title: '给对方发送站内消息',
		content: "对方登录后可以看到您发的消息(最多可输入255个字符)<br><br><textarea name='message' id='message' style='width:340px; height:80px'></textarea>",
		okValue: '确定',
		ok: function () {
			if (Trim($("#message").val()) == '') {
				alert('请先填写发送的内容!');
				return false;
			}
			$.ajax({
				type: "POST",
				url: "/tools/submit_ajax.ashx?action=send_message",
				dataType: "json",
				data: {
					"user_name": user_name,
					"message": $("#message").val()
				},
				timeout: 20000,
				success: function (data, textStatus) {
					if (data.status == 1) {
						var tipdialog = dialog({ content: data.msg }).show();
						setTimeout(function () {
							tipdialog.close().remove();
						}, 2000);
					} else {
						dialog({ title: '提示', content: data.msg, okValue: '确定', ok: function () { } }).showModal();
					}
				},
				error: function (XMLHttpRequest, textStatus, errorThrown) {
					dialog({ title: '提示', content: '状态：' + textStatus + '；出错提示：' + errorThrown, okValue: '确定', ok: function () { } }).showModal();
				}
			});
		},
		cancelValue: '取消',
		cancel: function () { }
	}).showModal();
	return false;
}

//跳转到发手机短信页面
function sendSMS(user_name, url) {
	//由于不允许用户自由输入发送,所以跳转到发短信页面
	window.open(url);
	return false;
}

//写cookies函数 
function setCookie(name, value) {
	var Days = 30; 	//30天
	var exp = new Date();
	exp.setTime(exp.getTime() + Days * 24 * 60 * 60 * 1000);
	document.cookie = name + "=" + escape(value) + ";expires=" + exp.toGMTString();
}
//取cookies函数 
function getCookie(name) {
	var arr = document.cookie.match(new RegExp("(^| )" + name + "=([^;]*)(;|$)"));
	if (arr != null) return unescape(arr[2]); return null;
}

//**************************************************************************************
// tab选项卡 目前任务大厅用到
// 用法：var SDmodel = new scrollDoor();
//        SDmodel.sd(["gg_m1","gg_m2"],["gg_d1","gg_d2"],"currently","''");
//**************************************************************************************
function scrollDoor() { }
    scrollDoor.prototype = {
        sd: function (menus, divs, openClass, closeClass) {
            var _this = this;
            if (menus.length != divs.length) {
                alert("菜单层数量和内容层数量不一样!");
                return false;
            }
            for (var i = 0 ; i < menus.length ; i++) {
                _this.$$(menus[i]).value = i;
                _this.$$(menus[i]).onmouseover = function () {

                    for (var j = 0 ; j < menus.length ; j++) {
                        _this.$$(menus[j]).className = closeClass;
                        //_this.$$(divs[j]).style.display = "none";
                        $("#" + divs[j]).hide();
                    }
                    _this.$$(menus[this.value]).className = openClass;
                    $("#" + divs[this.value]).show();
                    //_this.$$(divs[this.value]).style.display = "block";				
                }
            }
        },
        $$: function (oid) {
            if (typeof (oid) == "string")
                return document.getElementById(oid);
            return oid;
        }
    }





//****************************************************************
//* 名　　称：DataLength
//* 功    能：计算数据的长度
//* 入口参数：fData：需要计算的数据
//* 出口参数：返回fData的长度(Unicode长度为2，非Unicode长度为1)
//*****************************************************************
function DataLength(fData)
{
    var intLength=0
    for (var i=0;i<fData.length;i++)
    {
        if ((fData.charCodeAt(i) < 0) || (fData.charCodeAt(i) > 255))
            intLength=intLength+2
        else
            intLength=intLength+1   
    }
    return intLength
}

//****************************************************************
//* 名　　称：IsEmpty
//* 功    能：判断是否为空
//* 入口参数：fData：要检查的数据
//* 出口参数：True：空                             
//*           False：非空
//*****************************************************************
function IsEmpty(fData)
{
    return ((fData==null) || (fData.length==0) )
}

//****************************************************************
//* 名　　称：IsDigit
//* 功    能：判断是否为数字
//* 入口参数：fData：要检查的数据
//* 出口参数：True：是0到9的数字                             
//*           False：不是0到9的数字
//*****************************************************************
function IsDigit(fData)
{
    return ((fData>="0") && (fData<="9"))
}

//****************************************************************
//* 名　　称：IsInteger
//* 功    能：判断是否为正整数
//* 入口参数：fData：要检查的数据
//* 出口参数：True：是整数，或者数据是空的                           
//*           False：不是整数
//*****************************************************************
function IsInteger(fData)
{
    //如果为空，返回true
    if (IsEmpty(fData))
        return true
    if ((isNaN(fData)) || (fData.indexOf(".")!=-1) || (fData.indexOf("-")!=-1))
        return false   
   
    return true   
}

//****************************************************************
//* 名　　称：IsEmail
//* 功    能：判断是否为正确的Email地址
//* 入口参数：fData：要检查的数据
//* 出口参数：True：正确的Email地址，或者空                             
//*           False：错误的Email地址
//*****************************************************************
function IsEmail(fData)
{
    if (IsEmpty(fData))
        return true
    if (fData.indexOf("@")==-1)
        return false
    var NameList=fData.split("@");
    if (NameList.length!=2)
        return false
    if (NameList[0].length<1 )
        return false  
    if (NameList[1].indexOf(".")<=0)
        return false
    if (fData.indexOf("@")>fData.indexOf("."))
return false
    if (fData.indexOf(".")==fData.length-1)
return false
   
    return true   
}

//****************************************************************
//* 名　　称：IsPhone
//* 功    能：判断是否为正确的电话号码（可以含"()"、"（）"、"+"、"-"和空格）
//* 入口参数：fData：要检查的数据
//* 出口参数：True：正确的电话号码，或者空                             
//*           False：错误的电话号码
//* 错误信息：
//*****************************************************************
function IsPhone(fData)
{
    var str;
    var fDatastr="";
    if (IsEmpty(fData))
        return true
    for (var i=0;i<fData.length;i++)
    {
        str=fData.substring(i,i+1);
        if (str!="(" && str!=")" && str!="（" && str!="）" && str!="+" && str!="-" && str!=" ")
           fDatastr=fDatastr+str;
    }
    //alert(fDatastr);
    if (isNaN(fDatastr))
        return false
    return true   
}

//****************************************************************
//* 名　　称：IsPlusNumeric
//* 功    能：判断是否为正确的正数（可以含小数部分）
//* 入口参数：fData：要检查的数据
//* 出口参数：True：正确的正数，或者空                             
//*           False：错误的正数
//* 错误信息：
//*****************************************************************
function IsPlusNumeric(fData)
{
    if (IsEmpty(fData))
        return true
    if ((isNaN(fData)) || (fData.indexOf("-")!=-1))
        return false
    return true   
}

//****************************************************************
//* 名　　称：IsNumeric
//* 功    能：判断是否为正确的数字（可以为负数，小数）
//* 入口参数：fData：要检查的数据
//* 出口参数：True：正确的数字，或者空                             
//*           False：错误的数字
//* 错误信息：
//*****************************************************************
function IsNumeric(fData)
{
    if (IsEmpty(fData))
        return true
    if (isNaN(fData))
        return false
       
    return true   
}

//****************************************************************
//* 名　　称：IsIntegerInRange
//* 功    能：判断一个数字是否在指定的范围内
//* 入口参数：fInput：要检查的数据
//*           fLower：检查的范围下限，如果没有下限，请用null
//*           fHigh：检查的上限，如果没有上限，请用null
//* 出口参数：True：在指定的范围内                             
//*           False：超出指定范围
//*****************************************************************
function IsIntegerInRange(fInput,fLower,fHigh)
{
    if (fLower==null)
        return (fInput<=fHigh)
    else if (fHigh==null)
        return (fInput>=fLower)
    else        
        return ((fInput>=fLower) && (fInput<=fHigh))
}
