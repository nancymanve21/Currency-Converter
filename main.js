console.log("Main.js working");

// Function to fetch and display currency conversion results
const populate = async (value, currency) => {
    try {
        const url = `https://api.currencyapi.com/v3/latest?apikey=cur_live_7UStkUqQNBmahSoy8K635tE3Sjr5fK1UVPmVloZ2&base_currency=${currency}`;
        const response = await fetch(url);
        
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const rJson = await response.json();
        document.querySelector(".output").style.display = "block";

        let rows = Object.keys(rJson.data).map(key => {
            const { code, value } = rJson.data[key];
            return `
                <tr>
                    <td>${key}</td>
                    <td>${code}</td>
                    <td>${(value * value).toFixed(2)}</td>
                </tr>
            `;
        }).join("");

        const tableBody = document.querySelector("tbody");
        tableBody.innerHTML = rows;

    } catch (error) {
        console.error('There was a problem with the fetch operation:', error);
        document.querySelector(".output").innerHTML = `<p>Error: ${error.message}</p>`;
    }
};

// Add event listener to the submit button
const btn = document.querySelector(".btn");
btn.addEventListener("click", (e) => {
    e.preventDefault();

    const quantityInput = document.querySelector("input[name='quantity']");
    const value = parseFloat(quantityInput.value);
    
    if (isNaN(value) || value <= 0) {
        alert("Please enter a valid quantity greater than zero.");
        return;
    }

    const currency = document.querySelector("select[name='currency']").value;
    populate(value, currency);
});
