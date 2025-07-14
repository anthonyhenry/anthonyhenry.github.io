////////////////////////////////////////////////////////////////////////////////
/////////////////////////////// Global Variables ///////////////////////////////
////////////////////////////////////////////////////////////////////////////////

const STICKER_PAGE_DIV = document.querySelector("#stickerPage")
const STICKERS_CONTAINER = document.querySelector("#stickers");


////////////////////////////////////////////////////////////////////////////////
///////////////////////////// Create New Stickers /////////////////////////////
////////////////////////////////////////////////////////////////////////////////

// console.log(STICKERS_CONTAINER);
// console.log(STICKERS_CONTAINER.children);

for(const sticker of STICKERS_CONTAINER.children)
{
    function createNewSticker(event)
    {
        event.preventDefault(); // For touchstart, this will prevent mousedown from also firing

        // Create a div for the new sticker
        const NEW_STICKER_DIV = document.createElement("div");

        // Style new sticker div
        NEW_STICKER_DIV.style.position = "absolute";
        NEW_STICKER_DIV.style.width = sticker.width + "px";
        NEW_STICKER_DIV.style.height = sticker.height + "px";

        // Add the sticker div to the sticker page element
        STICKER_PAGE_DIV.appendChild(NEW_STICKER_DIV);

        // Create a duplicate of the sticker
        const NEW_STICKER_IMG = document.createElement("img");
        NEW_STICKER_IMG.src = sticker.src;

        // Add the sticker to the new sticker div
        NEW_STICKER_DIV.appendChild(NEW_STICKER_IMG);

        // Style the sticker
        NEW_STICKER_IMG.style.height = "100%";
        NEW_STICKER_IMG.style.width = "100%";
        NEW_STICKER_IMG.style.pointerEvents = "none";

        // Place the new sticker under the cursor
        const ANCHOR = {
            x: parseFloat(NEW_STICKER_DIV.style.width) / 2,
            y: parseFloat(NEW_STICKER_DIV.style.height) / 2
        };
        const MOUSE_POS = getMousePos(event);
        setPositionRelativeToMouse(NEW_STICKER_DIV, MOUSE_POS.x, MOUSE_POS.y, ANCHOR);

        // Allow sticker to be moved
        handleStickerMovement(NEW_STICKER_DIV, ANCHOR)
    }
    sticker.addEventListener("mousedown", createNewSticker);
    sticker.addEventListener("touchstart", createNewSticker);
}

function getMousePos(event)
{
    const MOUSE_POS = {
        x: event.clientX ? event.clientX : event.touches[0].clientX,
        y: event.clientY ? event.clientY : event.touches[0].clientY
    };
    return MOUSE_POS;
}

function handleStickerMovement(sticker, anchor)
{
    function moveSticker(event)
    {
        const MOUSE_POS = getMousePos(event)

        setPositionRelativeToMouse(sticker, MOUSE_POS.x, MOUSE_POS.y, anchor)
    }
    document.addEventListener("mousemove", moveSticker);
    document.addEventListener("touchmove", moveSticker);
}

function setPositionRelativeToMouse(element, mousePosX, mousePosY, anchor)
{
    element.style.left = mousePosX - STICKER_PAGE_DIV.getBoundingClientRect().left - anchor.x + "px"; 
    element.style.top = mousePosY - STICKER_PAGE_DIV.getBoundingClientRect().top - anchor.y + "px";
}

////////////////////////////////////////////////////////////////////////////////
////////////////////////// Sticker Gallery Scrolling //////////////////////////
////////////////////////////////////////////////////////////////////////////////

// Only run following code for devices that do not have mouse support
if(!window.matchMedia("(pointer: fine)").matches)
{
    const LEFT_UP_ARROW = document.querySelector("#left-up-arrow");
    const RIGHT_DOWN_ARROW = document.querySelector("#right-down-arrow");

    let scrollAxis = getScrollAxis();
    let scrollAmount = getScrollAmount();

    let scrollAnimationFrameRequest = null;

    for(const arrow of [LEFT_UP_ARROW, RIGHT_DOWN_ARROW])
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
}
////////////////////////////////////////////////////////////////////////////////
/////////////////////////////// Helper Functions ///////////////////////////////
////////////////////////////////////////////////////////////////////////////////

