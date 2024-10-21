const token = "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";

const inputTxt = document.getElementById("input");
const image = document.getElementById("image");
const button = document.getElementById("btn");

async function query() {
    const response = await fetch(
        "https://api-inference.huggingface.co/models/ZB-Tech/Text-to-Image",
        {
            headers: {
                Authorization: `Bearer ${token}`, // Use backticks for template literals
                "Content-Type": "application/json" // Add content type
            },
            method: "POST",
            body: JSON.stringify({"inputs": inputTxt.value}),
        }
    );

    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`); // Handle errors
    }

    const result = await response.blob();
    return result;
}

button.addEventListener('click', async function () {
    try {
        const response = await query(); // Await the query function
        const objectURL = URL.createObjectURL(response);
        image.src = objectURL; // Set the image source to the object URL
    } catch (error) {
        console.error('Error fetching image:', error); // Log any errors
    }
});
