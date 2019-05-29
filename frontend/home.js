//url user
base_url = "http://localhost:4000/users"
//url items
base_url1 = "http://localhost:4000/items"

const showData = (data) => {
    let grid = document.getElementById("grid");

    data.map(item => {
        grid.innerHTML = `
        <div class="col-md-4 product-grid">
          <h4 class="text-right">${item.category}</h4>
          <h2 class="text-center">${item.productName}</h2>
          <h4 class="text-left">${item.harga}</h4>
        </div>
        `;
    })
}

const getItem = () => {
    fetch(base_url1)
    .then(res => res.json())
    .then(data => {
        showData(data)
    })
}

getItem()