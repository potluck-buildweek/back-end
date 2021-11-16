module.exports = function (role) {
    return function(req, res, next) {
        if (req.decodedJwt.role !== role) {
            next({
                status: 403,
                message: "Insufficient Permission"
            })
        } else {
            next()
        }
    }
}