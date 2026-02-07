import rateLimit from "express-rate-limit";


export const requestOtpLimiter = rateLimit({

    windowMs: 60 * 1000,
    max: 3,
    message: "Too many requests from this IP, please try again after 1 minute",
    standardHeaders: true,
    legacyHeaders: false,
    
});

export const verifyOtpLimiter = rateLimit({
    windowMs: 15*60*1000,
    max: 10,
    message: "Too many requests from this IP, please try again after 15 minutes",
});

export const refreshLimiter = rateLimit({
    windowMs: 15*60*1000,
    max: 30,
    message: "Too many renewal requests from this IP, please try again after 15 minutes",
});

export const apiLimiter = rateLimit({
    windowMs: 60 * 1000,
    max: 20,
    message: "Too many creations. Please try again after 1 minute",
});