document.addEventListener("DOMContentLoaded", () => {
  axios.defaults.baseURL = "http://localhost:5050/api/v1/";
  let form = document.querySelector("#form");
  // if (!localStorage.getItem("token")) {
  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    let { data } = await axios.post("auth", {
      phoneNumber: form[0].value,
      password: form[1].value,
    });
    console.log(data);
    localStorage.setItem("token", data.token);
    window.location.replace("userList.html");
  });
  // } else {
  // }
});
