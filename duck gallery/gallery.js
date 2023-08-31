const imageIds = [
    209035,
    322438,
    221429,
    235915,
    2294541,
    730278,
    38771,
    542516,
    2426226,
    594306,
    1115816,
    105771,
]

for (const imageId of imageIds) {
    const image = document.createElement("img")
    image.alt = "Random duck image"
    image.width = 250
    image.height = 160
    image.src = `https://images.pexels.com/photos/${imageId}/pexels-photo-${imageId}.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500`
    document.body.appendChild(image)
}