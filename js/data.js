// Función para cargar productos desde JSON //
async function loadProducts() {
  try {
    const response = await fetch("./data/products.json");
    if (!response.ok) throw new Error("Error al cargar productos");
    const products = await response.json();
    return products;
  } catch (error) {
    Swal.fire(
      "Error",
      "No se pudieron cargar los productos. Inténtalo de nuevo.",
      "error"
    );
    return [];
  }
}
