function getDataNow() {
    const data = new Date();
    var dasta = data.getFullYear().toString()  + (data.getMonth() + 1).toString()  + data.getDate().toString();
    return dasta
}

module.exports.getDataNow = getDataNow