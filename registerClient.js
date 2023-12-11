document.addEventListener("DOMContentLoaded", () => {
  axios.defaults.baseURL = "http://localhost:5050/api/v1/";
  let form = document.querySelector("#form");
  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    let { data } = await axios.post("auth/register", {
      name: form[0].value,
      phoneNumber: form[1].value,
      password: form[2].value,
    });
    console.log(data);
    // localStorage.setItem("registertoken", data.token);
    window.location.replace("clientLogin.html");
  });
});
