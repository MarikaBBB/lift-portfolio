document.addEventListener('DOMContentLoaded', (event) => {
    const pokemonInput = document.getElementById("pokemonInput");
    const showButton = document.getElementById("showButton");
    const pokemonDiv = document.getElementById("pokemonDiv");
    const nameSpan = document.getElementById("nameSpan");
    const spriteImage = document.getElementById("spriteImage");
    const heightSpan = document.getElementById("heightSpan");
    const weightSpan = document.getElementById("weightSpan");
    const baseExperienceSpan = document.getElementById("baseExperienceSpan");
    const typeSpan = document.getElementById("typeSpan");

    // Explicitly hide the pokemonDiv on page load using CSS
    pokemonDiv.style.display = 'none';

    async function showPokemon() {
        clearErrors();
        // Hide the div each time the button is clicked to ensure it only shows for new valid data
        pokemonDiv.style.display = 'none';

        const pokemonName = pokemonInput.value.toLowerCase();
        if (pokemonName) {
            try {
                const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`);

                if (!response.ok) {
                    throw new Error("Pokemon not found");
                }

                const pokemon = await response.json();
                nameSpan.textContent = pokemon.name;
                spriteImage.src = pokemon.sprites.front_default;
                spriteImage.alt = `Front view of ${pokemon.name}`;
                heightSpan.textContent = pokemon.height;
                weightSpan.textContent = pokemon.weight;
                baseExperienceSpan.textContent = pokemon.base_experience;
                typeSpan.textContent = pokemon.types.map(typeInfo => typeInfo.type.name).join(" and ");
                
                // Show the div only after all data has been successfully loaded
                pokemonDiv.style.display = 'block'; // Or 'flex' if you want to keep the flexbox layout
            } catch (error) {
                handleErrors();
            }
        } else {
            handleErrors("Please enter a Pokémon name.");
        }
    }

    function handleErrors(message = "An error occurred. Please check the entered Pokémon name.") {
        clearErrors();
        const errorMessage = document.createElement("p");
        errorMessage.classList.add("error-message");
        errorMessage.textContent = message;
        document.body.appendChild(errorMessage);
    }

    function clearErrors() {
        const existingErrorMessages = document.querySelectorAll(".error-message");
        existingErrorMessages.forEach(message => message.remove());
    }

    showButton.addEventListener("click", showPokemon);

    function rotateSpriteImage() {
        spriteImage.classList.toggle("rotated");
    }

    spriteImage.addEventListener("click", rotateSpriteImage);
});
