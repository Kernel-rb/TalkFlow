import express from "express";

const router = express.Router();


router.get("/login", (req, res) => {
    res.json({
        message: "Login route works"
    });
});

router.get("/register", (req, res) => {
    res.json({
        message: "Register route works"
    });
});

router.get("/logout", (req, res) => {
    res.json({
        message: "Logout route works"
    });
});

export default router;