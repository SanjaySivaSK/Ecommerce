let initialProducts = [
  {
    id: 1,
    title: "iPhone 9",
    description: "An apple mobile which is nothing like apple",
    price: 549,
    thumbnail: "https://i.dummyjson.com/data/products/1/thumbnail.jpg",
  },
  {
    id: 2,
    title: "iPhone X",
    description:
      "SIM-Free, Model A19211 6.5-inch Super Retina HD display with OLED technology A12 Bionic chip with ...",
    price: 899,
    thumbnail: "https://i.dummyjson.com/data/products/2/thumbnail.jpg",
  },
  {
    id: 3,
    title: "Samsung Universe 9",
    description:
      "Samsung's new variant which goes beyond Galaxy to the Universe",
    price: 1249,
    thumbnail: "https://i.dummyjson.com/data/products/3/thumbnail.jpg",
  },
  {
    id: 4,
    title: "OPPOF19",
    description: "OPPO F19 is officially announced on April 2021.",
    price: 280,
    thumbnail: "https://i.dummyjson.com/data/products/4/thumbnail.jpg",
  },
  {
    id: 5,
    title: "Huawei P30",
    description:
      "Huawei’s re-badged P30 Pro New Edition was officially unveiled yesterday in Germany and now the device has made its way to the UK.",
    price: 499,
    thumbnail: "https://i.dummyjson.com/data/products/5/thumbnail.jpg",
  },
  {
    id: 6,
    title: "MacBook Pro",
    description:
      "MacBook Pro 2021 with mini-LED display may launch between September, November",
    price: 1749,
    thumbnail: "https://i.dummyjson.com/data/products/6/thumbnail.png",
  },
  {
    id: 7,
    title: "Samsung Galaxy Book",
    description:
      "Samsung Galaxy Book S (2020) Laptop With Intel Lakefield Chip, 8GB of RAM Launched",
    price: 1499,
    thumbnail: "https://i.dummyjson.com/data/products/7/thumbnail.jpg",
  },
  {
    id: 8,
    title: "Microsoft Surface Laptop 4",
    description:
      "Style and speed. Stand out on HD video calls backed by Studio Mics. Capture ideas on the vibrant touchscreen.",
    price: 1499,
    thumbnail: "https://i.dummyjson.com/data/products/8/thumbnail.jpg",
  },
  {
    id: 9,
    title: "Infinix INBOOK",
    description:
      "Infinix Inbook X1 Ci3 10th 8GB 256GB 14 Win10 Grey – 1 Year Warranty",
    price: 1099,
    thumbnail: "https://i.dummyjson.com/data/products/9/thumbnail.jpg",
  },
  {
    id: 10,
    title: "HP Pavilion 15-DK1056WM",
    description:
      "HP Pavilion 15-DK1056WM Gaming Laptop 10th Gen Core i5, 8GB, 256GB SSD, GTX 1650 4GB, Windows 10",
    price: 1099,
    thumbnail: "https://i.dummyjson.com/data/products/10/thumbnail.jpeg",
  },
];

InitialUsers = [
  {
    id: 1,
    Email: "Sanjay@gmail.com",
    Password: "Sanjay283",
  },
  { id: 2, Email: "joe@gmail.com", Password: "joe283" },
  {
    id: 3,
    Email: "Admin@gmail.com",
    Password: "Admin283",
  },
];

window.addEventListener("load", () => {
  if (!localStorage.getItem("products")) {
    localStorage.setItem("products", JSON.stringify(initialProducts));
  }
  if (!localStorage.getItem("Users")) {
    localStorage.setItem("Users", JSON.stringify(InitialUsers));
  }
  if (location.pathname === "/admin/index.html") {
    adminhomepage();
  }
  if (location.pathname === "/index.html") {
    UserHomePage();
  }
  if (location.pathname === "/order.html") {
    userloadpage();
  }

  if (location.pathname === "/admin/add_product.html") {
    let parameter = window.location.search;
    let urlparams = new URLSearchParams(parameter);
    let productid = urlparams.get("id");

    if (productid) {
      const products = JSON.parse(localStorage.getItem("products"));
      const product = products.find(
        (product) => product.id === parseInt(productid)
      );
      populateProduct(product);
    }
  }
  if (location.pathname === "/cart.html") {
    cartload();
  }
  if (location.pathname === "/admin/orders.html") {
    adminloadpage();
  }
});
const getRandomNumber = (max = 1000) => {
  return Math.floor(Math.random() * max);
};

// creating user id
const getRandomId = (type = "Users") => {
  let jsonArray = JSON.parse(localStorage.getItem(type));
  for (let i = 0; i < 10000; i++) {
    const randomId = getRandomNumber();

    const checkingId = jsonArray.find((obj) => obj.id === randomId);
    if (!checkingId) {
      return randomId;
    }
  }
};

//signin  code
const SignHandler = () => {
  const EmailRef = document.getElementById("Email");
  const PasswordRef = document.getElementById("Password");
  const textref = document.getElementById("text");

  if (EmailRef.value.length > 0 && PasswordRef.value.length > 0) {
    let Users = JSON.parse(localStorage.getItem("Users"));
    const validUser = Users.find(
      (user) =>
        user.Email === EmailRef.value && user.Password === Password.value
    );
    if (!validUser) {
      textref.innerHTML = "Wrong";
    } else {
      sessionStorage.setItem("id", validUser.id);
      if (EmailRef.value === "Admin@gmail.com")
        location.replace("/admin/index.html");
      else location.replace("/index.html");
    }
  } else {
    document.getElementById("text").innerHTML = "Enter the field";
  }
};

//signup code
const SignupHandler = () => {
  const NameRef = document.getElementById("Name");
  const EmailRef = document.getElementById("Email");
  const PasswordRef = document.getElementById("Password");
  const CPasswordRef = document.getElementById("CPassword");
  const textref = document.getElementById("textref");

  if (
    NameRef.value.length > 0 &&
    EmailRef.value.length > 0 &&
    PasswordRef.value.length > 0 &&
    CPasswordRef.value.length > 0
  ) {
    if (PasswordRef.value.length >= 8 && CPasswordRef.value.length >= 8) {
      if (PasswordRef.value === CPasswordRef.value) {
        let Users = JSON.parse(localStorage.getItem("Users"));

        Users.push({
          id: getRandomId(),
          Email: EmailRef.value,
          Password: PasswordRef.value,
        });
        localStorage.setItem("Users", JSON.stringify(Users));
        location.href = "/login.html";
        console.log();
      } else {
        textref.innerHTML = "Passwords Miss Match";
      }
    } else {
      textref.innerHTML = "Password must be 8 characters";
    }
  } else {
    textref.innerHTML = "Enter the fields";
  }
};

let adminhomepage = () => {
  let tbodyref = document.getElementById("tableproducts");
  let table = "";
  let productarray = JSON.parse(localStorage.getItem("products"));

  for (let product of productarray) {
    table += `<tr>
    <th scope="row"><img class="img-thumbnail" style=width:100px;height:70px src="${
      product.thumbnail
    }"<img></th>
    <td>${product.title}</td>
    <td>${product.description.substring(0, 50)}</td>
    <td>${product.price}</td>
    <td>
      <button type="button" class="btn btn-dark"  onclick="Edit(${
        product.id
      })"id="Edit">Edit</button>
      <button type="button" class="btn btn-danger"  onclick="del(${
        product.id
      })" id="Del">Delete</button>
    </td>
  </tr>`;
  }

  tbodyref.innerHTML = table;
};
// deleteitems in admin home page
const Delref = document.getElementById("Del");
let del = (id) => {
  let products = JSON.parse(localStorage.getItem("products"));
  let filterproduct = products.filter((product) => product.id !== id);
  localStorage.setItem("products", JSON.stringify(filterproduct));
  adminhomepage();
};
const Edit = (id) => {
  location.href = `/admin/add_product.html?id=${id}`;
};

//user homepage
let UserHomePage = () => {
  const RowProductRef = document.getElementById("products");
  let products = JSON.parse(localStorage.getItem("products"));

  let Rowproduct = "";
  for (let product of products) {
    Rowproduct += `<div class="col-3 mt-5">
  <div class="card">
    <div
      class="bg-image hover-overlay ripple"
      data-mdb-ripple-color="light"
    >
      <img
        src="${product.thumbnail}"
        class="img-fluid " id="Image" style=height:200px
      />
      <a href="#!">
        <div
          class="mask"
          style="background-color: rgba(251, 251, 251, 0.15)"
        ></div>
      </a>
    </div>
    <div class="card-body">
      <h5 class="card-title"  id="Title">${product.title}</h5>
      <p class="card-text">
        ${product.description.substring(0, 50)}
      </p>
      <div class="w-100 d-flex justify-content-center" id="Description">
        <a href="#!" class="btn btn-primary w-70" onClick="addtocart(${
          product.id
        })">Add to cart</a>
      </div>
    </div>
  </div>
</div>`;
  }
  RowProductRef.innerHTML = Rowproduct;
  console.log(Rowproduct);
};
//display the product
let addproduct = () => {
  const idRef = document.getElementById("id");
  const NameRef = document.getElementById("Name");
  const PriceRef = document.getElementById("Price");
  const DescriptionRef = document.getElementById("Description");
  const ImageRef = document.getElementById("Image");

  let products = JSON.parse(localStorage.getItem("products"));

  products.push({
    id: getRandomId(),
    title: NameRef.value,
    price: PriceRef.value,
    description: DescriptionRef.value,
    thumbnail: ImageRef.value,
  });
  localStorage.setItem("products", JSON.stringify(products));
  location.href = "/admin/index.html";
};
// edit items in addproduct(push) page

const populateProduct = (product) => {
  const nameRef = document.getElementById("Name");
  const priceRef = document.getElementById("Price");
  const descriptionRef = document.getElementById("Description");
  const imageRef = document.getElementById("Image");
  const idRef = document.getElementById("id");
  const EditproductRef = document.getElementById("Editproduct");
  const updateRef = document.getElementById("update");

  idRef.value = product.id;
  nameRef.value = product.title;
  priceRef.value = product.price;
  descriptionRef.value = product.description;
  imageRef.value = product.thumbnail;
  EditproductRef.innerText = "Edit Product";
  updateRef.innerText = "Update Product";
};

const addtocart = (id) => {
  let products = JSON.parse(localStorage.getItem("products"));
  const addcart = products.find((product) => product.id === parseInt(id));

  if (!sessionStorage.getItem("id")) {
    location.replace("/login.html");
  } else {
    let userid = parseInt(sessionStorage.getItem("id"));
    let cart = [];
    if (localStorage.getItem("cart")) {
      cart = JSON.parse(localStorage.getItem("cart"));
    }

    const cartproduct = cart.find(
      (cart) => cart.id === parseInt(id) && cart.userid === parseInt(userid)
    );

    if (cartproduct) {
      cart = cart.map((product) => {
        if (
          product.id === parseInt(id) &&
          product.userid === parseInt(userid)
        ) {
          return { ...product, count: product.count + 1 };
        } else {
          return product;
        }
      });
    } else {
      cart.push({ userid: parseInt(userid), count: 1, ...addcart });
    }
    localStorage.setItem("cart", JSON.stringify(cart));
  }
};

//cartload

const cartload = () => {
  const tableproductref = document.getElementById("tableproduct");
  const totalRef = document.getElementById("total");

  if (localStorage.getItem("cart")) {
    let carts = JSON.parse(localStorage.getItem("cart"));
    console.log(carts);

    if (sessionStorage.getItem("id")) {
      const userId = parseInt(sessionStorage.getItem("id"));
      const userCart = carts.filter((c) => c.userid === userId);
      console.log(userCart);
      tbody = "";
      total = 0;

      for (let cartItem of userCart) {
        total = total + parseInt(cartItem.price) * parseInt(cartItem.count);
        const count = cartItem.count * cartItem.price;
        tbody += `<tr>
            <th scope="row">${cartItem.title}</th>
            <td>${cartItem.count}</td>
            <td>${cartItem.price}</td>
            <td>${count}</td>
            </tr>
            </tbody>`;
      }
      tableproductref.innerHTML = tbody;
      totalRef.innerText = `Total - ₹ ${total}`;
    } else {
      location.href = "/login.html";
    }
  }
};

const checklist = () => {
  if (sessionStorage.getItem("id")) {
    if (localStorage.getItem("cart")) {
      const cart = JSON.parse(localStorage.getItem("cart"));
      const userid = JSON.parse(sessionStorage.getItem("id"));
      let order = [];
      const usercart = cart.filter((c) => c.userid === userid);
      if (localStorage.getItem("order")) {
        order = JSON.parse(localStorage.getItem("order"));
      }
      order.push({
        userid: userid,
        status: "pending",
        product: usercart,
      });

      const othercart = cart.filter((c) => c.userid !== userid);
      localStorage.setItem("cart", JSON.stringify(othercart));
      localStorage.setItem("order", JSON.stringify(order));
      location.href = "/index.html";
    } else {
      location.href = "/index.html";
    }
  } else {
    location.href = "/login.html";
  }
};

//userorder
const userloadpage = () => {
  const tableref = document.getElementById("tablebody1");
  if (sessionStorage.getItem("id")) {
    if (localStorage.getItem("order")) {
      const order = JSON.parse(localStorage.getItem("order"));

      const userid = parseInt(sessionStorage.getItem("id"));
      const userorders = order.filter((c) => c.userid === userid);
      console.log(userorders.id);
      tbody = "";
       let total=0;
      for (let order of userorders) {
        for (let orders of order.product) {
          total=total+parseInt(orders.count)*parseInt(orders.price)
          tbody += `<tr>
                <th scope="row">${orders.id}</th>
                <td>${orders.count}</td>
                <td>${orders.title}</td>
                <td>${total}</td>
                <td>${order.status}</td>

              </tr>
              `;
        }
      }

      tableref.innerHTML = tbody;
    } else {
      location.href = "/index.html";
    }
  } else {
    location.href = "/login.html";
  }
};
//adminpage
const adminloadpage = () => {
  const tableref = document.getElementById("admintable2");
  if (sessionStorage.getItem("id")) {
    if (localStorage.getItem("order")) {
      const orders = JSON.parse(localStorage.getItem("order"));
      tbody = "";

      for (let order of orders) {
        for (let product of order.product) {
          const user = JSON.parse(localStorage.getItem("Users"));
          const userorder = user.find((e) => e.id === parseInt(order.userid));

          console.log(userorder);
          tbody += `<th scope="row">${userorder.id}</th>
        <td>${product.title}</td>
        <td>${userorder.Email}</td>
        <td><select id ="status-${order.userid}">
        <option> pending</option>
        <option> cancel</option>
        <option> deliver  </option></td>

      </tr>`;
        }
        tableref.innerHTML = tbody;
        for(let order of orders){
          const statusRef = document.getElementById(`status-${order.userid}`);
          statusRef.value = order.status;
          statusRef.addEventListener("change", () => {
            const editedstatus =JSON.parse(localStorage.getItem("order"));
            const updatedstatus = editedstatus.map((stat) => {
              if(stat.userid === parseInt(order.userid)){
                return {...stat, status: statusRef.value}
              }
              else{
                return stat;                                            
              } 
            });
            localStorage.setItem("order", JSON.stringify(updatedstatus)); 
          });
        }
        
      }
      
      
    } else {
      location.href = "/index.html";
    }
  } else {
    location.href = "/login.html";
  }
};

