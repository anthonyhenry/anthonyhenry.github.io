////////////////////////////////////////////////////////////////////////////////
////////////////////////// Sticker Gallery Scrolling //////////////////////////
////////////////////////////////////////////////////////////////////////////////

// Bug when you scroll all the way as far right or down as you can go then resize the screen. Both arrows are invisible
// Ask chatGPT if I should add mouse events
// Down arrow does not disappear on mobile (mine and cindy's phone)

const LEFT_UP_ARROW = document.querySelector("#left-up-arrow");
const RIGHT_DOWN_ARROW = document.querySelector("#right-down-arrow");

let scrollAnimationFrameRequest = null;

for(let arrow of [LEFT_UP_ARROW, RIGHT_DOWN_ARROW])
{
    function stopScrolling()
    {
        cancelAnimationFrame(scrollAnimationFrameRequest);
        scrollAnimationFrameRequest = null;
    }

    function scrollStickers(event)
    {
        event.preventDefault();

        const SCROLL_DIRECTION = arrow.dataset.direction == "left-up" ? -1 : 1;
        const SCROLL_SPEED = 3;
        const STICKERS_CONTAINER = document.querySelector("#stickers");
        const SCROLL_AXIS = window.getComputedStyle(STICKERS_CONTAINER).display == "block" ? "vertical" : "horizontal";
        const SCROLL_OPTIONS = {
            top: SCROLL_AXIS == "vertical" ? SCROLL_DIRECTION * SCROLL_SPEED : 0,
            left: SCROLL_AXIS == "horizontal" ? SCROLL_DIRECTION * SCROLL_SPEED : 0,
            behavior: "auto"
        }

        function scroll()
        {
            // Scroll through stickers
            STICKERS_CONTAINER.scrollBy(SCROLL_OPTIONS);

            // Only show arrows if there is room to scroll in that direction
            if(SCROLL_AXIS == "vertical")
            {
                if(STICKERS_CONTAINER.scrollTop > 0 && window.getComputedStyle(LEFT_UP_ARROW).display == "none")
                {
                    LEFT_UP_ARROW.style.display = "block";
                }
                if(STICKERS_CONTAINER.scrollTop == 0)
                {
                    stopScrolling();
                    LEFT_UP_ARROW.style.display = "none";
                }
                if(Math.ceil(STICKERS_CONTAINER.clientHeight + STICKERS_CONTAINER.scrollTop) >= Math.ceil(STICKERS_CONTAINER.scrollHeight))
                {
                    stopScrolling();
                    RIGHT_DOWN_ARROW.style.display = "none";
                }
                if(STICKERS_CONTAINER.clientHeight + STICKERS_CONTAINER.scrollTop < STICKERS_CONTAINER.scrollHeight && window.getComputedStyle(RIGHT_DOWN_ARROW).display == "none")
                {
                    RIGHT_DOWN_ARROW.style.display = "block";
                }
            }
            else
            {
                if(STICKERS_CONTAINER.scrollLeft > 0 && window.getComputedStyle(LEFT_UP_ARROW).display == "none")
                {
                    LEFT_UP_ARROW.style.display = "block";
                }
                if(STICKERS_CONTAINER.scrollLeft == 0)
                {
                    stopScrolling();
                    LEFT_UP_ARROW.style.display = "none";
                }
                if(Math.ceil(STICKERS_CONTAINER.clientWidth + STICKERS_CONTAINER.scrollLeft) >= Math.ceil(STICKERS_CONTAINER.scrollWidth))
                {
                    stopScrolling();
                    RIGHT_DOWN_ARROW.style.display = "none";
                }
                if(STICKERS_CONTAINER.clientWidth + STICKERS_CONTAINER.scrollLeft < STICKERS_CONTAINER.scrollWidth && window.getComputedStyle(RIGHT_DOWN_ARROW).display == "none")
                {
                    RIGHT_DOWN_ARROW.style.display = "block";
                }
            }
            // clientHeight is the viewable height of an element
            // scrollTop is the number of pixels an element's content is scrolled upward from its top edge
            // scrollHeight is the total height of an element's content, including any content that is not currently visible due to overflow

            // Loop until touch ends
            scrollAnimationFrameRequest = requestAnimationFrame(scroll);

            document.querySelector("#test").innerText = ""
            let msg = document.createElement("p");
            msg.innerText = Math.ceil(STICKERS_CONTAINER.clientHeight + STICKERS_CONTAINER.scrollTop)
            document.querySelector("#test").appendChild(msg)
            msg = document.createElement("p");
            msg.innerText = Math.ceil(STICKERS_CONTAINER.scrollHeight)
            document.querySelector("#test").appendChild(msg)
        }

        scrollAnimationFrameRequest = requestAnimationFrame(scroll)
    }
    arrow.addEventListener("touchstart", scrollStickers);
    arrow.addEventListener("touchend", stopScrolling);
    arrow.addEventListener("touchcancel", stopScrolling);
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
