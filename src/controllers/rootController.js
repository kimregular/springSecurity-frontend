export const home = (req, res) => {
    return res.status(200).render("home", { pageTitle: "HOME" });
};

export const getJoin = (req, res) => {
    return res.status(200).render("join", { pageTitle: "JOIN" });
};

export const postJoin = async (req, res) => {
    const { body: joinRequest } = req;
    console.log(joinRequest);
    await fetch(`${process.env.BACKEND_URL}${process.env.API_V1}/join`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(joinRequest),
    });
    return res.redirect("/");
};

export const getLogin = async (req, res) => {
    await fetch(`${process.env.BACKEND_URL}${process.env.API_V1}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
    });
    return res.status(200).render("login", { pageTitle: "Login" });
};

export const postLogin = async (req, res) => {
    const { body } = req;
    const loginForm = new URLSearchParams(body).toString();
    const response = await fetch(
        `${process.env.BACKEND_URL}${process.env.API_V1}/login`,
        {
            method: "POST",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
            },
            body: loginForm,
        },
    );
    if (response.status === 200) {
        const token = response.headers.get("authorization");
        if (token) {
            console.log(token);
            res.cookie("jwtToken", token, {
                httpOnly: true, // XSS 공격 방지
                sameSite: "Strict", // CSRF 공격 방지
                maxAge: 1000 * 60 * 60 * 10, // 10시간 동안 유지
            });
        }
        return res.redirect("/");
    }
};

export const getAdmin = async (req, res) => {
    const { jwtToken } = req.cookies;
    const response = await fetch(
        `${process.env.BACKEND_URL}${process.env.API_V1}/admin`,
        {
            method: "GET",
            headers: {
                Authorization: jwtToken,
            },
        },
    );

    let result = "";
    if (response.status === 200) {
        result = await response.text();
    }
    console.log("result = ", result);
    return res.render("admin", { pageTitle: "ADMIN", result });
};
