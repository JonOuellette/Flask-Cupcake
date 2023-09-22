const BASE_URL = "http://127.0.0.1:5000/api/";
DEFAULT_IMAGE = "https://tinyurl.com/demo-cupcake"

/* generates html of the cupcake data */

function generateCupcakes(cupcake){
    
    return `
        <div data-cupcake-id=${cupcake.id}>
            <li>
                Flavor: ${cupcake.flavor} / Size:  ${cupcake.size} / Rating: ${cupcake.rating}
            <button class="delete-button">X</button>
            </li>
            <img class= "Cupcake-img"
                src="${cupcake.image || DEFAULT_IMAGE}"
                alt="(no image provided)">
        </div>
    `;
}


/* displays list of cupcakes on the page */

async function showCupcakeList() {
    const response = await axios.get(`${BASE_URL}/cupcakes`);

    for (let cupcakeData of response.data.cupcakes) {
      let newCupcake = $(generateCupcakes(cupcakeData));
      $("#cupcakes-list").append(newCupcake);
    }
  }

  $("#new-cupcake-form").on("submit", async function (e) {
    e.preventDefault();
  
    let flavor = $("#cupcake-flavor").val();
    let rating = $("#cupcake-rating").val();
    let size = $("#cupcake-size").val();
    let image = $("#cupcake-image").val();
  
    const newCupcakeResponse = await axios.post(`${BASE_URL}/cupcakes`, {
      flavor,
      rating,
      size,
      image
    });
  
    let newCupcake = $(generateCupcakes(newCupcakeResponse.data.cupcake));
    $("#cupcakes-list").append(newCupcake);
    $("#new-cupcake-form").trigger("reset");
  });


$("#cupcakes-list").on("click", ".delete-button", async function (e) {
    e.preventDefault();
    let $cupcake = $(e.target).closest("div");
    let cupcakeId = $cupcake.attr("data-cupcake-id");
  
    await axios.delete(`${BASE_URL}/cupcakes/${cupcakeId}`);
    $cupcake.remove();
  });

$(showCupcakeList);