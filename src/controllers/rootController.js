export const home = (req, res) => {
    return res.status(200).render("home", { pageTitle: "HOME" });
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
    const data = await response.json();
    console.log(data);
    return res.status(200).render("login", { pageTitle: "Login" });
};

export const postLogin = async (req, res) => {
    const { body } = req;
    const response = await fetch(
        `${process.env.BACKEND_URL}${process.env.API_V1}/login`,
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(body),
        },
    );
    console.log(response);
    // const result = await response.json();
    // console.log(result);
    return res.redirect("/");
};
