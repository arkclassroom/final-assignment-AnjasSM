const base_url = "http://localhost:4000/Items/";

let user = "x";

let contactID = [0];

//get data from input form
const getInput = () => {
    let productName = document.getElementById("product-name").value;
    let category = document.getElementById("category").value;
    let price = document.getElementById("price").value;
    let stock = document.getElementById("stock").value;

    let input = {
        productName : productName,
        category : category,
        price : price,
        stock : stock
    }
    return input;
};

// clearForm
const clearForm = () => {
    document.getElementById("product-name").value = "";
    document.getElementById("price").value = "";
    document.getElementById("stock").value = "";
  }

//form validation

function isValid(productName, price, stock) {
    const numberval = /^[0-9]+$/;
    
    if( productName !='' && price !='' && stock !='') {
      if(productName.length > 3) {
        if(price.match(numberval)) {
          if(stock.match(numberval)){
            return true;
          } else {
            alert('stock input must a number')
          }
        } else {
          alert('price input must a number');
          return false;
        }
      } else {
        alert('Product Name input minimal 4 character');
        return false;
      }
    } else {
      alert('Input Cant Empty');
      return false;
    }
  };

//make a table
const showData = (data) => {
    let tbody = document.getElementById("table-rows");

    data.map(item => {
        let row = tbody.insertRow();
        row.setAttribute("id", `db-${item.id}`);

        let cell1 = row.insertCell(0);
        let cell2 = row.insertCell(1);
        let cell3 = row.insertCell(2);
        let cell4 = row.insertCell(3);
        let cell5 = row.insertCell(4);
        let cell6 = row.insertCell(5);

        cell1.innerHTML = item.productName;
        cell2.innerHTML = item.category;
        cell3.innerHTML = item.price;
        cell4.innerHTML = item.stock;
        cell5.innerHTML = item.createdAt;
        cell6.innerHTML = `
        <a href="#" > <i id="edit"  db-id=${contact.id} class="fas fa-user-edit"></i></a> 
        <a href="#" > <i id="delete"  db-id=${contact.id} class="fas fa-trash"></i> </a>`;

        if(item.stock == 0) {
            document.getElementById("stock-table").style.color = "#ff0000";
        } else if(item.stock <= 10) {
            document.getElementById("stock-table").style.color = "#f6ff00";
        } else if(item.stock > 10) {
            document.getElementById("stock-table").style.color = "#11ff00";            
        }
    })
};

//fetch data from db to manage page
const view = () => {
    fetch(base_url)
    .then(res => res.json())
    .then(data => {showData(data)})
}

//click event
document.addEventListener("click", e =>{
    //btn add new product
    if(e.target.id === "add") {
        let input = getInput();
        const valid = isValid(input.productName, input.price, input.stock);
        if(valid) {
            const data = JSON.stringify(input);
            fetch(base_url, {
                method: "POST",
                header: {
                    'Accept': 'application/json, text/plain, */*',
                    'Content-Type': 'application/json'
                },
                body: data
            })
            .then(res => view())
            alert("new inventory added")
            clearForm()
        };
    };

    //btn delete
    if(e.target.id == "delete") {
        const id = e.target.attribute[1].nodevalue;
        if(confirm('Are You Sure to Delete This Item?')) {
            fetch(`${base_url}${id}`, {
                method: "DELETE"
            })
            .then(res => view())
        }
    };

    //btn edit
    if(e.target.id == 'edit') {
        fetch(`${base_url}${id}`)
        .then(res => res.json())
        .then(data => {
            let productName = document.getElementById("product-name");
            let category = document.getElementById("category");
            let price = document.getElementById("price");
            let stock = document.getElementById("stock");

            productName.value = data.productName;
            category.value = data.category;
            price.value = data.price;
            stock.value = data.value;
            contactID[0] = data.id

            document.getElementById("save").disabled = false;
        });
    };

    //btn save
    if(e.target.id == "save") {
        let input = getInput();
        const id = contactID[0];
        const valid = isValid(input.productName, input.price, input.stock);

        if(valid) {
            const data = JSON.stringify(input);
      
            fetch(`${baseUrl}${id}`, {
              method: 'PUT',
              headers: {
                'Accept': 'application/json, text/plain, */*',
                'Content-Type': 'application/json'
              },
              body: data
            })
            .then(res => view())
            clearForm()
            alert('Contact Has Been Updated')

            document.getElementById("save").disabled = true;
        };
    };

});

view();