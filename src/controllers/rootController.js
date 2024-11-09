export const home = (req, res) => {
    return res.status(200).render("home", { pageTitle: "HOME" });
};

export const getJoin = (req, res) => {
    return res.status(200).render("join", { pageTitle: "JOIN" });
};

export const postJoin = async (req, res) => {
    const { body: joinRequest } = req;
    console.log(joinRequest);
    const response = await fetch(
        `${process.env.BACKEND_URL}${process.env.API_V1}/join`,
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(joinRequest),
        },
    );
    return res.redirect("/");
};

export const getLogin = async (req, res) => {
    const response = await fetch(
        `${process.env.BACKEND_URL}${process.env.API_V1}`,
        {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        },
    );
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
            res.set("Authorization", token);
        }
    }
    return res.redirect("/");
};
