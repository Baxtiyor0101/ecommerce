document.addEventListener("DOMContentLoaded", async () => {
  axios.defaults.baseURL = "http://localhost:5050/api/v1/";
  let container = document.querySelector(".container");
  let {
    data: { cart },
  } = await axios.get("/clients/me", {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("clientoken")}`,
    },
  });
  getData(cart);
  async function getData(data) {
    data.forEach(async (element) => {
      let { data } = await axios.get(`products/${element.product}`);
      let image = document.createElement("img");
      let price = document.createElement("p");
      let name = document.createElement("h2");
      let div = document.createElement("div");
      image.setAttribute("src", data?.image);
      price.innerText = data?.price;
      name.innerText = `uz:${data?.name?.uz} _ ru:${data?.name?.ru}`;
      div.style.alignItems = "center";
      div.style.justifyContent = "space-between";
      div.style.width = "300px";
      image.style.width = "100%";
      container.style.display = "flex";
      container.style.flexWrap = "wrap";
      div.style.border = "2px solid red";
      div.style.padding = "12px";
      div.append(image, name, price);
      container.append(div);
    });
  }
});
