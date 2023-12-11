document.addEventListener("DOMContentLoaded", () => {
  axios.defaults.baseURL = "http://localhost:5050/api/v1/";
  let form = document.querySelector("#form");
  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    let {
      data: { token },
    } = await axios.post("auth/client-login", {
      phoneNumber: form[0].value,
      password: form[1].value,
    });
    console.log(token);
    localStorage.setItem("clientoken", token);
    if (localStorage.getItem("clientoken")) {
      window.location.replace("clientPage.html");
    }
  });
});
