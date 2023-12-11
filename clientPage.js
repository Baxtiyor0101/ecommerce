document.addEventListener("DOMContentLoaded", async () => {
  axios.defaults.baseURL = "http://localhost:5050/api/v1/";
  let cardList = document.querySelector(".cardss");
  //   let form = document.querySelector("#createform");
  //   let createBtn = document.querySelector("#create");
  let container = document.querySelector(".container");

  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${localStorage.getItem("token")}`,
  };
  let { data: client } = await axios.get("/clients/me", {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("clientoken")}`,
    },
  });
  console.log(client);
  document.querySelector(
    ".text-warning"
  ).innerText = `${client.name}_${client.phoneNumber}`;
  document.querySelector("#quantity").innerText = client.cart.length;
  document
    .querySelector("#searchform")
    .addEventListener("submit", async (e) => {
      e.preventDefault();
      let search = document.querySelector("#searchform")[0].value;
      console.log(search);
      let data = await axios.get(`/products/search?q=${search}`, {
        headers: headers,
      });
      console.log(data);
      getData(data.data);
    });
  let data = await axios.get("/products", {
    headers: headers,
  });
  getData(data.data);
  async function getData(data) {
    container.innerHTML = "";
    data.forEach((val) => {
      let image = document.createElement("img");
      let price = document.createElement("p");
      let name = document.createElement("h2");
      let div = document.createElement("div");
      let addToCard = document.createElement("button");
      image.setAttribute("src", val.image);
      addToCard.innerText = "addToCard";
      price.innerText = val.price;
      name.innerText = `uz:${val?.name?.uz} _ ru:${val?.name?.ru}`;
      // div.style.display = "flex";
      div.style.alignItems = "center";
      div.style.justifyContent = "space-between";
      div.style.width = "300px";
      image.style.width = "100%";
      container.style.display = "flex";
      container.style.flexWrap = "wrap";
      div.style.border = "2px solid red";
      div.style.padding = "12px";
      div.append(image, name, price, addToCard);
      container.append(div);
      addToCard.addEventListener("click", () => addCards(val));
    });
    console.log(data.data);
  }
  ////////////////// add to  card
  async function addCards(product) {
    await axios.post(
      "/clients/cart",
      { product: product._id, quantity: 1 },
      {
        headers: {
          //   "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("clientoken")}`,
        },
      }
    );
    // console.log(data);
    window.location.reload();
  }
  cardList.addEventListener("click", () => {
    window.location.replace("/clientCarts.html");
  });
});
