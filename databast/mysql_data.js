const tokens = require('../token/token')
const dataNow = require('../data/data')

//เข้าสู่ระบบ
function chackLogin(con, res, username, password) {
    const from = "SELECT * FROM member WHERE username = '" + username + "' and password = '" + password + "'"
    con.query(from, function (err, result) {
        if (err) throw err;
        if (result.length != 0) {

            var ids = result[0].id
            var getToken = tokens.tokenEncoded(ids)

            var update = "UPDATE member_token SET token = '" + getToken + "' WHERE id_user = '" + ids + "'"
            con.query(update, function (err, result) {
                if (err) throw err;
            })

            jsonShowLogin(true, getToken)

        } else {
            jsonShowLogin(false)
        }

    });

    function jsonShowLogin(status, token = 404) {
        const jsonPlaylond = {
            status: status,
            token: token
        }

        var json = JSON.stringify(jsonPlaylond)
        res.send(json)
        console.log(json)
    }
}

//เพิ่มสมาชิก
function addMembers(con, res, name, username, password, sa) {
    const joineds = dataNow.getDataNow()
    const chackUser = "SELECT * FROM member WHERE username = '" + username + "'"

    con.query(chackUser, function (err, result) {
        if (err) throw err;
        if (result.length == 0) {
            var sql = "INSERT INTO member (name,username,password,joined,sa)" +
                "VALUES ('" + name + "','" + username + "','" + password + "','" + joineds + "','" + sa + "')"

            con.query(sql, function (err) {
                if (err) throw err;
                const chackUser = "SELECT * FROM member WHERE username = '" + username + "'"
                con.query(chackUser, function (err, result) {
                    if (err) throw err;
                    if (result.length != 0) {
                        //token
                        const ids = result[0].id
                        const getToken = tokens.tokenEncoded(ids)

                        const tokenInsert = "INSERT INTO member_token (id_user,token)" + " VALUES('" + ids + "','" + getToken + "')"
                        con.query(tokenInsert, function (err, result) {
                            if (err) throw err;
                        })

                        //coins
                        const coinsInsert = "INSERT INTO medal (id_user,medal)" + " VALUES('" + ids + "','0')"
                        con.query(coinsInsert, function (err, result) {
                            if (err) throw err;
                        })
                        jsonShowAddmember(username,true, getToken)
                    }

                })
            })

        } else {
            jsonShowAddmember(username,false);
        }
    });

    function jsonShowAddmember(us,status, to = 404) {
        const jsonPlaylond = {
            username : us,
            status: status,
            result: to
        }

        var json = JSON.stringify(jsonPlaylond)
        res.send(json)
        console.log(json)
    }
}

//ดึงข้อมูลหน้า Profile
function getDataProfile(con,res, token) {
    const tokenResult = tokens.tokenDecoded(token)
    const idUser = tokenResult.userId

    var sql = "SELECT member.id,member.name,member.sa,medal.medal " +
    " FROM member JOIN medal ON member.id = medal.id_user " +
        "WHERE member.id = '" + idUser + "'"

    con.query(sql, function (err, result) {
        if (err) throw err;
        console.log(result);
        res.send(result)
    });
}

module.exports.getDataProfile = getDataProfile
module.exports.chackLogin = chackLogin
module.exports.addMembers = addMembers