// Check if there is a preferred theme saved
const PREFERRED_THEME = localStorage.getItem("preferredTheme");
if(PREFERRED_THEME)
{
    setLightDarkTheme(PREFERRED_THEME);

    // If dark theme is saved, flip the icon show the sun, and change button color
    if(PREFERRED_THEME === "dark")
    {
        document.querySelector("#lightDarkToggle").classList.toggle("flip");
        changeButtonColor()
    }
}

// Switch themes when icon is clicked
document.querySelector("#lightDarkToggle").onclick = function(){
    // Flip the icon
    this.classList.toggle("flip");
    
    // Toogle dark mode
    const NEW_THEME = document.documentElement.getAttribute('data-bs-theme') === "light" ? "dark" : "light";
    // Save preferred theme
    localStorage.setItem("preferredTheme", NEW_THEME);
    // Set new theme
    setLightDarkTheme(NEW_THEME);
    // Change buttons color
    changeButtonColor()
}

function setLightDarkTheme(theme)
{
    document.documentElement.setAttribute('data-bs-theme', theme);
}