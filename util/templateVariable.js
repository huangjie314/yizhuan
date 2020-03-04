
var accountLevelMap = {
    1: '一心',
    2: '二心',
    3: '三心',
    4: '一钻',
    5: '一钻以上'
}
var jdaccountLevelMap = {
    1: '铜牌会员',
    2: '银牌会员',
    3: '金牌会员',
    4: '钻石会员',
    5: '钻石会员以上'
}

// 淘宝信用等级
const tbLevelMap = {
    0: '新号',
    1: '1心',
    2: '2心',
    3: '3心',
    4: '1钻以上'
}

//京东账号等级 
const jdLevelMap = {
    0: '新号',
    1: '铜牌',
    2: '银牌',
    3: '金牌',
    4: '4钻石'
}

var orderStatus = {
    0: '审核中',
    1: '已打款',
    2: '已驳回'
}

const platformType = {
    0: '淘宝天猫',
    1: '京东'
}

const cashType = {
    0: '余额',
    1: '佣金'
}

const cashCodeType = {
    0: '支付宝',
    1: '微信'
}


const cashStatus = {
    0: '审核中',
    1: '已打款',
    2: '已驳回'
}

const accountStatus = {
    0: '等待客服审核',
    1: '审核通过',
    2: '审核不通过'
}

const sexMap = {
    0: '未知',
    1: '男',
    2: '女'
}

const ageMap = {
    0: '18~25岁',
    1: '26~35岁',
    2: '35岁以上'
}

const realNameMap = {
    0: '未实名认证',
    1: '已实名认证'
}


module.exports = {
    formatMobile: function (mobile) {
        return mobile.replace(/(\d{3})\d{4}(\d{4})/, '$1****$2')
    },
    formatAccount_level: function (level) {
        return accountLevelMap[level];
    },
    formatJDAccount_level: function (level) {
        return jdaccountLevelMap[level];
    },
    formatDate: function (dateTime, dateType = 'yyyy-MM-dd HH:mm:ss') {
        if (!dateTime) return;
        dateTime = new Date(dateTime);
        const obj = {
            'y+': dateTime.getFullYear(),
            "M+": dateTime.getMonth() + 1,
            "d+": dateTime.getDate(),
            "H+": dateTime.getHours(),
            "m+": dateTime.getMinutes(),
            's+': dateTime.getSeconds(),
        }
        for (let key in obj) {
            if (new RegExp('(' + key + ')').test(dateType)) {
                let match = RegExp.$1;
                dateType = dateType.replace(match, function ($) {
                    return ('0' + obj[key]).slice(-$.length);
                })
            }
        }
        return dateType;
    },
    formatOrderStatus: function (status) {
        return orderStatus[status];
    },
    formatPlatformType: function (type) {
        return platformType[type];
    },
    formatCashType: function (type) {
        return cashType[type];
    },
    formatCashCodeType: function (type) {
        return cashCodeType[type];
    },
    formatCashStatus: function (status) {
        return cashStatus[status];
    },
    formatAccountStatus: function (status) {
        return accountStatus[status];
    },
    formatSex: function (sex) {
        return sexMap[sex];
    },
    formatAge: function (age) {
        return ageMap[age];
    },
    formatTbLevel: function (state) {
        return tbLevelMap[state]
    },
    formatJdLevel: function (state) {
        return jdLevelMap[state]
    },
    formatRealName: function (val) {
        return realNameMap[val];
    }
}
