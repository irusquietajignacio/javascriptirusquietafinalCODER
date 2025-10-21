let cart = JSON.parse(localStorage.getItem("cart")) || [];
let products = [];

// Inicializa la aplicación cargando productos y renderizando la interfaz
async function init() {
  try {
    products = await loadProducts();
    renderProducts();
    renderCart();
    updateCartCount();
  } catch (error) {
    Swal.fire({
      title: "Error",
      text: "Hubo un problema al inicializar la aplicación. Por favor, recarga la página.",
      icon: "error",
    });
  }
}

// Renderiza la lista de productos en el DOM
function renderProducts() {
  try {
    const productList = document.getElementById("product-list");
    productList.innerHTML = "";

    products.forEach((product) => {
      const productDiv = document.createElement("div");
      productDiv.className = "product";
      productDiv.innerHTML = `
        <img src="${product.image}" alt="${product.name}">
        <h3>${product.name}</h3>
        <p>$${product.price.toFixed(2)}</p>
        <button class="add-to-cart-btn" data-id="${
          product.id
        }">Agregar al Carrito</button>
      `;
      productList.appendChild(productDiv);
    });

    // Agregar event listeners a los botones de agregar al carrito
    document.querySelectorAll(".add-to-cart-btn").forEach((button) => {
      button.addEventListener("click", (e) => {
        const productId = parseInt(e.target.dataset.id);
        addToCart(productId);
      });
    });
  } catch (error) {
    Swal.fire({
      title: "Error",
      text: "No se pudieron mostrar los productos.",
      icon: "error",
    });
  }
}

// Agrega un producto al carrito
function addToCart(id) {
  try {
    const product = products.find((p) => p.id === id);
    if (!product) {
      throw new Error("Producto no encontrado");
    }

    cart.push(product);
    saveCart();
    renderCart();
    updateCartCount();

    Swal.fire({
      title: "Agregado",
      text: `${product.name} se agregó al carrito.`,
      icon: "success",
      timer: 1500,
      showConfirmButton: false,
    });
  } catch (error) {
    Swal.fire({
      title: "Error",
      text: "No se pudo agregar el producto al carrito.",
      icon: "error",
    });
  }
}

// Renderiza el contenido del carrito
function renderCart() {
  try {
    const cartItems = document.getElementById("cart-items");
    cartItems.innerHTML = "";

    if (cart.length === 0) {
      cartItems.innerHTML = "<p class='empty-cart'>El carrito está vacío</p>";
      document.getElementById("total").textContent = "0.00";
      return;
    }

    let total = 0;
    cart.forEach((item, index) => {
      total += item.price;
      const itemDiv = document.createElement("div");
      itemDiv.className = "cart-item";
      itemDiv.innerHTML = `
        <p>${item.name} - $${item.price.toFixed(2)}</p>
        <button class="remove-btn" data-index="${index}">Eliminar</button>
      `;
      cartItems.appendChild(itemDiv);
    });

    document.getElementById("total").textContent = total.toFixed(2);

    // Agregar event listeners a los botones de eliminar
    document.querySelectorAll(".remove-btn").forEach((button) => {
      button.addEventListener("click", (e) => {
        const index = parseInt(e.target.dataset.index);
        removeFromCart(index);
      });
    });
  } catch (error) {
    Swal.fire({
      title: "Error",
      text: "Hubo un problema al mostrar el carrito.",
      icon: "error",
    });
  }
}

// Elimina un producto específico del carrito
function removeFromCart(index) {
  try {
    cart.splice(index, 1);
    saveCart();
    renderCart();
    updateCartCount();
  } catch (error) {
    Swal.fire({
      title: "Error",
      text: "No se pudo eliminar el producto.",
      icon: "error",
    });
  }
}

// Event listener para vaciar el carrito
document.getElementById("clear-cart").addEventListener("click", () => {
  try {
    if (cart.length === 0) {
      Swal.fire({
        title: "Carrito vacío",
        text: "No hay productos para eliminar.",
        icon: "info",
      });
      return;
    }

    Swal.fire({
      title: "¿Estás seguro?",
      text: "Se eliminarán todos los productos del carrito.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Sí, vaciar",
      cancelButtonText: "Cancelar",
    }).then((result) => {
      if (result.isConfirmed) {
        cart = [];
        saveCart();
        renderCart();
        updateCartCount();
        Swal.fire({
          title: "Carrito vaciado",
          icon: "success",
          timer: 1500,
          showConfirmButton: false,
        });
      }
    });
  } catch (error) {
    Swal.fire({
      title: "Error",
      text: "No se pudo vaciar el carrito.",
      icon: "error",
    });
  }
});

// Event listener para finalizar la compra
document.getElementById("checkout").addEventListener("click", () => {
  try {
    if (cart.length === 0) {
      Swal.fire({
        title: "Carrito vacío",
        text: "Agrega productos antes de finalizar la compra.",
        icon: "warning",
      });
      return;
    }

    const total = document.getElementById("total").textContent;

    Swal.fire({
      title: "¡Compra Finalizada!",
      html: `
        <p>Total: <strong>$${total}</strong></p>
        <p>¡Gracias por tu compra!</p>
        <p>Recibirás un email de confirmación.</p>
      `,
      icon: "success",
      confirmButtonText: "Aceptar",
    }).then(() => {
      cart = [];
      saveCart();
      renderCart();
      updateCartCount();
    });
  } catch (error) {
    Swal.fire({
      title: "Error",
      text: "No se pudo completar la compra. Intenta nuevamente.",
      icon: "error",
    });
  }
});

// Guarda el carrito en localStorage
function saveCart() {
  try {
    localStorage.setItem("cart", JSON.stringify(cart));
  } catch (error) {
    Swal.fire({
      title: "Error",
      text: "No se pudo guardar el carrito.",
      icon: "error",
    });
  }
}

// Actualiza el contador de productos en el carrito
function updateCartCount() {
  try {
    const cartCount = document.getElementById("cart-count");
    cartCount.textContent = `(${cart.length})`;
  } catch (error) {
    // Error silencioso para no interrumpir la experiencia del usuario
  }
}

// Inicializa la aplicación cuando el DOM está listo
init();
