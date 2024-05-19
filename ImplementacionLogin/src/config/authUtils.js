import passport from 'passport'

export const authenticateUser = (req) => {
    return new Promise((resolve, reject) => {
        passport.authenticate('jwt', { session: false }, (error, user) => {
            if (error || !user) {
                reject('Error de autenticación')
            } else {
                resolve(user)
            }
        })(req)
    })
}