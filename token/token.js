const jwt = require('jsonwebtoken')

const key = 'sayamphoo'

function tokenEncoded(id) {

    const playload = {
        userId: id
    }

    const tokenE = jwt.sign(playload, key, { expiresIn: 38800 })
    return tokenE
}

function tokenDecoded(tokenID) {
    const tok = jwt.verify(tokenID, key)
    return tok
}

module.exports.tokenEncoded = tokenEncoded
module.exports.tokenDecoded = tokenDecoded