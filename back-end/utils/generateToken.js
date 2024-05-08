import jwt from 'jsonwebtoken';

const generateTokenandSetCookie = (userId, res) => {
    const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
        expiresIn: "120d",
    });
    res.cookie("token", token, {
        maxAge: 120 * 24 * 60 * 60 * 1000,
        httpOnly: true, // xss attack
        sameSite: "strict", // CSRF attack
        secure: process.env.NODE_ENV === "production" ? true : false,
    });
} 

export default generateTokenandSetCookie;