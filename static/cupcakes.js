const BASE_URL = "http://http://127.0.0.1:5000/api/";

/* generates html of the cupcake data */

function generateCupcakes(cupcake){
    return `
        <div class= "cupcake" data-cupcake-id = "${cupcake.id}">
            <li>
            ${cupcake.flavor} / ${cupcake.size} / ${cupcake.rating}
            <button class="delete-button">X</button>
            </li>
            <img class= "Cupcake-img"
                src="${cupcake.image || '${DEFAULT_IMAGE}'}"
                alt="(no image provided")>
        </div>;
        
    `;
}

/* displays list of cupcakes on the page */

async function showCupcakeList(){
    const response = await axios.get(`${BASE_URL}/cupcakes`);

    const cupcakesList = $("#cupcakes-list");

    response.data.cupcakes.forEach(cupcakeData => {
        let newCupcake = $(generateCupcake(cupcakeData));
        cupcakesList.append(newCupcake);
    });
}
