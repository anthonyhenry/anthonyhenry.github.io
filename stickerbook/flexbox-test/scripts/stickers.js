////////////////////////////////////////////////////////////////////////////////
////////////////////////// Sticker Gallery Scrolling //////////////////////////
////////////////////////////////////////////////////////////////////////////////

let scrollInterval = null;
let scrolling = false

const ARROWS = document.querySelectorAll(".arrow");
for(let arrow of ARROWS)
{
    function stopScrolling()
    {
        scrolling = false;
    }

    function scrollStickers(event)
    {
        event.preventDefault();

        const SCROLL_DIRECTION = arrow.classList.contains("left-up") ? -1 : 1;
        const SCROLL_SPEED = 2;
        // const SCROLL_AXIS = 
        const STICKERS_CONTAINER = document.querySelector("#stickers");
        const STICKERS_CONTAINER_STYLES = window.getComputedStyle(STICKERS_CONTAINER);
        console.log(this);
        
        console.log(STICKERS_CONTAINER_STYLES.display);
        console.log(STICKERS_CONTAINER.scrollTop);

        function scroll()
        {
            console.log("test");
            if(!scrolling)
            {
                return;
            }

            console.log(STICKERS_CONTAINER.scrollTop);
            STICKERS_CONTAINER.scrollBy({ top: SCROLL_DIRECTION * SCROLL_SPEED, behavior: "auto" });
            requestAnimationFrame(scroll)
            console.log(STICKERS_CONTAINER.scrollTop);
            console.log("===")

        }

        scrolling = true;
        requestAnimationFrame(scroll)

        arrow.addEventListener("touchend", stopScrolling);
    }
    arrow.addEventListener("touchstart", scrollStickers);
}

const stickersContainer = document.getElementById("stickers");
const arrowUpOrLeft = document.querySelector(".arrow.left-up");
const arrowDownOrRight = document.querySelector(".arrow.right-down");


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
    // event.preventDefault();
    // const amount = 5; // smaller = smoother scrolling
    // stopScrolling(); // clear any existing interval first
    // scrollInterval = setInterval(() => {
    //     if (isVerticalLayout())
    //     {
    //         stickersContainer.scrollBy({ top: direction * amount, behavior: "auto" });
    //     } 
    //     else
    //     {
    //         stickersContainer.scrollBy({ left: direction * amount, behavior: "auto" });
    //     }
    // }, 16); // roughly 60 frames per second
}

// function stopScrolling()
// {
//     if (scrollInterval !== null)
//     {
//         clearInterval(scrollInterval);
//         scrollInterval = null;
//     }
// }

// Attach press-and-hold listeners
// arrowUpOrLeft.addEventListener("mousedown", () => startScrolling(-1));
// arrowDownOrRight.addEventListener("mousedown", () => startScrolling(1));
// document.addEventListener("mouseup", stopScrolling);
// arrowUpOrLeft.addEventListener("mouseleave", stopScrolling);
// arrowDownOrRight.addEventListener("mouseleave", stopScrolling);

// // Mobile touch support
// arrowUpOrLeft.addEventListener("touchstart", () => startScrolling(-1));
// arrowDownOrRight.addEventListener("touchstart", () => startScrolling(1));
// document.addEventListener("touchend", stopScrolling);
// document.addEventListener("touchcancel", stopScrolling);

// stickersContainer.addEventListener("scroll", updateArrows);
// window.addEventListener("resize", updateArrows);
// window.addEventListener("DOMContentLoaded", updateArrows);
