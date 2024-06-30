import passport from 'passport'

export const authenticateUser = (req) => {
    return new Promise((resolve, reject) => {
        passport.authenticate('jwt', { session: false }, (err, user, info) => {
            if (err || !user) {
                return reject(new Error('No autorizado'))
            }
            resolve(user)
        })(req)
    })
}
