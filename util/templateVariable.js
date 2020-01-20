
var accountLevelMap = {
    1: '一心',
    2: '二心',
    3: '三心',
    4: '一钻',
    5: '一钻以上'
}

module.exports = {
    formatMobile: function (mobile) {
        return mobile.replace(/(\d{3})\d{4}(\d{4})/, '$1****$2')
    },
    formatAccount_level: function (level) {
        return accountLevelMap[level];
    }
}
