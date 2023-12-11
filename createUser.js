document.addEventListener("DOMContentLoaded", () => {
  axios.defaults.baseURL = "http://localhost:5050/api/v1/";

  let form = document.querySelector("#createform");
  let createBtn = document.querySelector("#create");
  let container = document.querySelector(".container");

  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${localStorage.getItem("token")}`,
  };
  async function getData() {
    let data = await axios.get("/users", {
      headers: headers,
    });
    console.log(data);
    data.data.forEach((val) => {
      let nameTitle = document.createElement("h1");
      let phone = document.createElement("p");
      let passwod = document.createElement("p");
      let div = document.createElement("div");
      let editBtn = document.createElement("button");
      nameTitle.innerText = val.name;
      editBtn.innerText = "edit";
      phone.innerText = val.phoneNumber;
      passwod.innerText = val.password;
      div.style.display = "flex";
      div.style.alignItems = "center";
      div.style.justifyContent = "space-between";
      div.style.width = "50%";
      div.append(nameTitle, phone, editBtn);
      container.append(div);
      editBtn.addEventListener("click", () => onEdit(val));
      //   console.log(val);
    });
    // console.log(data.data);
  }
  getData();
  createBtn.addEventListener("click", (e) => {
    e.preventDefault();
    let name = form[0].value;
    let phoneNumber = form[1].value;
    let password = form[2].value;
    axios
      .post(
        "/users",
        {
          name: name,
          phoneNumber: phoneNumber,
          password: password,
        },
        {
          headers: headers,
          //   data: ,
        }
      )
      .then((e) => console.log(e))
      .catch((e) => console.log(e));
    form.reset();
  });
  function onEdit(user) {}
  document.querySelector("#logout").addEventListener("click", () => {
    localStorage.removeItem("token");
    window.location.replace("/profile.html");
    // window.location.reload();
  });
  document.querySelector("#category").addEventListener("click", () => {
    window.location.replace("/category.html");
  });
  document.querySelector("#product").addEventListener("click", () => {
    window.location.replace("/product.html");
  });
});
