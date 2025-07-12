////////////////////////////////////////////////////////////////////////////////
////////////////////////// Sticker Gallery Scrolling //////////////////////////
////////////////////////////////////////////////////////////////////////////////

const LEFT_UP_ARROW = document.querySelector("#left-up-arrow");
const RIGHT_DOWN_ARROW = document.querySelector("#right-down-arrow");
const STICKERS_CONTAINER = document.querySelector("#stickers");

let scrollAxis = getScrollAxis();
let scrollAmount = getScrollAmount();

let scrollAnimationFrameRequest = null;

for(let arrow of [LEFT_UP_ARROW, RIGHT_DOWN_ARROW])
{
    function stopScrolling()
    {
        cancelAnimationFrame(scrollAnimationFrameRequest);
        scrollAnimationFrameRequest = null;
        scrollAmount = getScrollAmount();
    }

    function scrollStickers(event)
    {
        event.preventDefault();

        const SCROLL_DIRECTION = arrow.dataset.direction == "left-up" ? -1 : 1;
        const SCROLL_SPEED = 3;
        const SCROLL_OPTIONS = {
            top: scrollAxis == "vertical" ? SCROLL_DIRECTION * SCROLL_SPEED : 0,
            left: scrollAxis == "horizontal" ? SCROLL_DIRECTION * SCROLL_SPEED : 0,
            behavior: "auto"
        }; // This is an object that will be passed through STICKERS_CONTAINER.scrollBy

        function scroll()
        {
            // Scroll through stickers
            STICKERS_CONTAINER.scrollBy(SCROLL_OPTIONS);

            // Only show arrows if there is room to scroll in that direction
            if(scrollAxis == "vertical")
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

            // document.querySelector("#test").innerText = ""
            // let msg = document.createElement("p");
            // msg.innerText = Math.ceil(STICKERS_CONTAINER.clientHeight + STICKERS_CONTAINER.scrollTop)
            // document.querySelector("#test").appendChild(msg)
            // msg = document.createElement("p");
            // msg.innerText = Math.ceil(STICKERS_CONTAINER.scrollHeight)
            // document.querySelector("#test").appendChild(msg)
        }

        // First loop
        scrollAnimationFrameRequest = requestAnimationFrame(scroll);
    }
    arrow.addEventListener("touchstart", scrollStickers);
    arrow.addEventListener("touchend", stopScrolling);
    arrow.addEventListener("touchcancel", stopScrolling);
}

window.addEventListener("resize", function(){
    // Check if screen was resized such that the stickers div changed scroll direction
    if(scrollAxis != getScrollAxis())
    {
        let percentScrolled = 0;

        if(scrollAxis == "vertical")
        {
            percentScrolled = scrollAmount.vertical / scrollAmount.height;
            STICKERS_CONTAINER.scrollLeft = percentScrolled * STICKERS_CONTAINER.scrollWidth;            
        }
        else // Horizontal scroll axis
        {
            percentScrolled = scrollAmount.horizontal / scrollAmount.width;
            STICKERS_CONTAINER.scrollTop = percentScrolled * STICKERS_CONTAINER.scrollHeight;

            // Show right/down arrow if moving to vertical means the stickers aren't scrolled all the way
            if(STICKERS_CONTAINER.clientHeight + STICKERS_CONTAINER.scrollTop != STICKERS_CONTAINER.scrollHeight)
            {
                RIGHT_DOWN_ARROW.style.display = "block";
            }
        }        
        scrollAmount = getScrollAmount();
        scrollAxis = getScrollAxis();
    }
    
    if(scrollAxis == "horizontal")
    {
        // Show the right/down arrow if resizing means the stickers container won't be scrolled all the way
        if(STICKERS_CONTAINER.clientWidth + STICKERS_CONTAINER.scrollLeft != STICKERS_CONTAINER.scrollWidth)
        {
            RIGHT_DOWN_ARROW.style.display = "block";
        }
        // Show the right/down arrow if resizing means the stickers container will be scrolled all the way
        if(STICKERS_CONTAINER.clientWidth + STICKERS_CONTAINER.scrollLeft == STICKERS_CONTAINER.scrollWidth)
        {
            RIGHT_DOWN_ARROW.style.display = "none";
        }
    }
})

function getScrollAmount()
{
    const SCROLL_AMOUNT = {
        vertical: STICKERS_CONTAINER.scrollTop,
        horizontal: STICKERS_CONTAINER.scrollLeft,
        height: STICKERS_CONTAINER.scrollHeight,
        width: STICKERS_CONTAINER.scrollWidth
    };
    return SCROLL_AMOUNT;
}

function getScrollAxis()
{
    return window.getComputedStyle(STICKERS_CONTAINER).display == "block" ? "vertical" : "horizontal";
}