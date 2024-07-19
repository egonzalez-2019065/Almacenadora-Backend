'use strict'

import jwt from 'jsonwebtoken'
const secretKey = '3st03sUn@Ll@v3S3cr3T@m!s'


export const generarJWT = async (payload) => {
    try {
        return jwt.sign(payload, secretKey, {
            expiresIn: '3h',
            algorithm: 'HS256'
        })
    } catch (err) {
        console.error(err)
        return err
    }
}


