

const stickersContainer = document.getElementById("stickers");
const arrowUpOrLeft = document.querySelector(".arrow.left-up");
const arrowDownOrRight = document.querySelector(".arrow.right-down");

let scrollInterval = null;

function isVerticalLayout() 
{
    return window.innerWidth >= 768;
}

function updateArrows()
{
    if (isVerticalLayout()) 
    {
        arrowUpOrLeft.style.display = stickersContainer.scrollTop > 0 ? "block" : "none";
        arrowDownOrRight.style.display = stickersContainer.scrollTop + stickersContainer.clientHeight < stickersContainer.scrollHeight ? "block" : "none";
    } 
    else 
    {
        arrowUpOrLeft.style.display = stickersContainer.scrollLeft > 0 ? "block" : "none";
        arrowDownOrRight.style.display = stickersContainer.scrollLeft + stickersContainer.clientWidth < stickersContainer.scrollWidth ? "block" : "none";
    }
}

function startScrolling(direction)
{
    event.preventDefault();
    const amount = 5; // smaller = smoother scrolling
    stopScrolling(); // clear any existing interval first
    scrollInterval = setInterval(() => {
        if (isVerticalLayout())
        {
            stickersContainer.scrollBy({ top: direction * amount, behavior: "auto" });
        } 
        else
        {
            stickersContainer.scrollBy({ left: direction * amount, behavior: "auto" });
        }
    }, 16); // roughly 60 frames per second
}

function stopScrolling()
{
    if (scrollInterval !== null)
    {
        clearInterval(scrollInterval);
        scrollInterval = null;
    }
}

// Attach press-and-hold listeners
arrowUpOrLeft.addEventListener("mousedown", () => startScrolling(-1));
arrowDownOrRight.addEventListener("mousedown", () => startScrolling(1));
document.addEventListener("mouseup", stopScrolling);
arrowUpOrLeft.addEventListener("mouseleave", stopScrolling);
arrowDownOrRight.addEventListener("mouseleave", stopScrolling);

// Mobile touch support
arrowUpOrLeft.addEventListener("touchstart", () => startScrolling(-1));
arrowDownOrRight.addEventListener("touchstart", () => startScrolling(1));
document.addEventListener("touchend", stopScrolling);
document.addEventListener("touchcancel", stopScrolling);

stickersContainer.addEventListener("scroll", updateArrows);
window.addEventListener("resize", updateArrows);
window.addEventListener("DOMContentLoaded", updateArrows);
