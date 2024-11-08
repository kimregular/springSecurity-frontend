export const home = (req, res) => {
    return res.status(200).render("home", { pageTitle: "HOME" });
};

export const getLogin = async (req, res) => {
    const response = await fetch("http://localhost:8080/api/v1", {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
    });
    const data = await response.json();
    console.log(data);
    return res.status(200).render("login", { pageTitle: "Login" });
};
