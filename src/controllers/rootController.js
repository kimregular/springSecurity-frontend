import axios from "axios";

export const home = (req, res) => {
    return res.status(200).render("home", { pageTitle: "HOME" });
};

export const getJoin = (req, res) => {
    return res.status(200).render("join", { pageTitle: "JOIN" });
};

export const postJoin = async (req, res) => {
    const { body: joinRequest } = req;
    console.log(joinRequest);
    try {
        await axios.post(
            `${process.env.BACKEND_URL}${process.env.API_V1}/join`,
            joinRequest,
            {
                headers: {
                    "Content-Type": "application/json",
                },
            },
        );
        return res.redirect("/");
    } catch (error) {
        console.error("Error during join request:", error);
        return res.status(500).send("Server error");
    }
};

export const getLogin = async (req, res) => {
    try {
        await axios.get(`${process.env.BACKEND_URL}${process.env.API_V1}`, {
            headers: {
                "Content-Type": "application/json",
            },
        });
        return res.status(200).render("login", { pageTitle: "Login" });
    } catch (error) {
        console.error("Error during login page fetch:", error);
        return res.status(500).send("Server error");
    }
};

export const postLogin = async (req, res) => {
    const { body } = req;
    const loginForm = new URLSearchParams(body).toString();
    try {
        const response = await axios.post(
            `${process.env.BACKEND_URL}${process.env.API_V1}/login`,
            loginForm,
            {
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded",
                },
            },
        );
        if (response.status === 200) {
            const token = response.headers["authorization"];
            if (token) {
                console.log(token);
                res.cookie("jwtToken", token, {
                    httpOnly: true, // XSS 공격 방지
                    sameSite: "Strict", // CSRF 공격 방지
                    maxAge: 1000 * 60 * 60 * 10, // 10시간 동안 유지
                });
            }
            return res.redirect("/");
        } else {
            return res.status(401).render("login", {
                pageTitle: "Login",
                errorMessage: "invalidUserInfo",
            });
        }
    } catch (error) {
        console.error("Error during login request:", error);
        return res.status(500).send("Server error");
    }
};

export const getAdmin = async (req, res) => {
    const { jwtToken } = req.cookies;
    try {
        const response = await axios.get(
            `${process.env.BACKEND_URL}${process.env.API_V1}/admin`,
            {
                headers: {
                    Authorization: jwtToken,
                },
            },
        );

        let result = "";
        if (response.status === 200) {
            result = response.data;
        }
        console.log("result =", result);
        return res.render("admin", { pageTitle: "ADMIN", result });
    } catch (error) {
        console.error("Error during admin fetch:", error);
        return res.status(500).send("Server error");
    }
};

export const logout = (req, res) => {
    res.clearCookie("jwtToken");
    return res.redirect("/");
};
