const sjcl = require('sjcl')
const hashCode = (str) => {
    const myBitArray = sjcl.hash.sha256.hash(str)
    const myHash = sjcl.codec.hex.fromBits(myBitArray)
    return myHash
}

module.exports = {
    hashCode,
}
