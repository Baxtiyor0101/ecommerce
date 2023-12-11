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
    let data = await axios.get("/categories", {
      headers: headers,
    });
    console.log(data);
    data.data.forEach((val) => {
      let image = document.createElement("img");
      let uz = document.createElement("p");
      let ru = document.createElement("p");
      let div = document.createElement("div");
      let editBtn = document.createElement("button");
      image.setAttribute("src", val.image);
      editBtn.innerText = "edit";
      uz.innerText = val.uz;
      ru.innerText = val.ru;
      //   div.style.display = "flex";
      div.style.alignItems = "center";
      div.style.justifyContent = "space-between";
      div.style.width = "300px";
      image.style.width = "100%";
      container.style.display = "flex";
      container.style.flexWrap = "wrap";
      div.style.border = "2px solid red";
      div.style.padding = "12px";
      div.append(image, uz, ru, editBtn);
      container.append(div);
      editBtn.addEventListener("click", () => onEdit(val));
      //   console.log(val);
    });
    console.log(data.data);
  }
  getData();
  createBtn.addEventListener("click", (e) => {
    e.preventDefault();
    let uz = form[0].value;
    let ru = form[1].value;
    let imgurl = form[2].value;
    axios
      .post(
        "/categories",
        {
          uz: uz,
          ru: ru,
          image: imgurl,
        },
        {
          headers: headers,
          //   data: ,
        }
      )
      .then((e) => console.log(e))
      .catch((e) => console.log(e));
    form.reset();
    window.location.reload();
  });
  document.querySelector("#logout").addEventListener("click", () => {
    localStorage.removeItem("token");
    window.location.replace("/profile.html");
    // window.location.reload();
  });
  document.querySelector("#product").addEventListener("click", () => {
    window.location.replace("/product.html");
  });
});
