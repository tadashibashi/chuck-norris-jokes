window.addEventListener("load", async evt => {
    // cache elements
    const quoteEl = document.getElementById("joke-quote");
    const buttonEl = document.getElementById("joke-button");
    const categoryEl = document.getElementById("joke-category");

    // next joke button click
    buttonEl.addEventListener("click", async ev => {
        await setNextJoke();
    });

    // collect categories
    const categories = await fetch("https://api.chucknorris.io/jokes/categories")
        .then(data => data.json());

    if (categories && Array.isArray(categories)) { // ensure correct data type

        // add each category to dropdown menu
        categories.forEach(cat => {
            if (cat === "explicit" || cat === "political" || cat === "religion") return; // filter explicit

            // create option to append
            const option = document.createElement("option");
            option.setAttribute("value", cat);
            option.innerText = cat;

            categoryEl.appendChild(option);
        });
    }

    // set initial joke
    await setNextJoke();


    // helper to set next random joke
    async function setNextJoke() {
        const category = categoryEl.value;
        const data = await fetch("/api/random" +
            (category ? "?category=" + category : ""))
            .then(data => data.json());

        quoteEl.innerText = data.value;
    }
});