////////////////////////////////////////////////////////////////////////////////
/////////////////////////////// Global Variables ///////////////////////////////
////////////////////////////////////////////////////////////////////////////////

const BROWSER_SUPPORTS_MOUSE = window.matchMedia("(pointer: fine)").matches;
const STICKER_PAGE_DIV = document.querySelector("#stickerPage");
const STICKERS_CONTAINER = document.querySelector("#stickers");
const CANVAS_DIV = document.querySelector("#canvas");
let activeSticker = null;
const TOOLBAR = document.querySelector("#toolbar");
const HTML_ELEMENT = document.querySelector("html");
let rotationDiv = null;
const ROTATION_DIV_OFFSET = 25; // Offset for setting how much bigger than a sticker the rotation div should be

////////////////////////////////////////////////////////////////////////////////
///////////////////////////// Create New Stickers /////////////////////////////
////////////////////////////////////////////////////////////////////////////////

for(const sticker of STICKERS_CONTAINER.children)
{
    function createNewSticker(event)
    {
        event.preventDefault(); // For touchstart, this will prevent mousedown from also firing

        clearActiveSticker();

        // Create a div for the new sticker
        const NEW_STICKER_DIV = document.createElement("div");

        // Style new sticker div
        NEW_STICKER_DIV.style.position = "absolute";
        NEW_STICKER_DIV.style.width = sticker.width + "px";
        NEW_STICKER_DIV.style.height = sticker.height + "px";
        NEW_STICKER_DIV.style.transform = "rotate(0deg) scale(1,1)";

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
        handleStickerMouseMovement(NEW_STICKER_DIV, ANCHOR);
    }
    sticker.addEventListener("mousedown", createNewSticker);
    sticker.addEventListener("touchstart", createNewSticker);
}

////////////////////////////////////////////////////////////////////////////////
//////////////////////////////// Move Stickers ////////////////////////////////
////////////////////////////////////////////////////////////////////////////////

function handleStickerMouseMovement(sticker, anchor)
{
    function moveSticker(event)
    {
        const MOUSE_POS = getMousePos(event)

        setPositionRelativeToMouse(sticker, MOUSE_POS.x, MOUSE_POS.y, anchor)
    }
    document.addEventListener("mousemove", moveSticker);
    document.addEventListener("touchmove", moveSticker);

    function stopMovingSticker()
    {
        // Only keep stickers that are visible on the canvas
        if(stickerIsVisibleOnCanvas(sticker))
        {
            // Add new stickers to the canvas
            if(sticker.parentElement != CANVAS_DIV)
            {
                CANVAS_DIV.appendChild(sticker);
                sticker.classList.add("placed-sticker");
                convertPixelPositionToPercent(sticker);
                setActiveSticker(sticker);
            }
        }
        else
        {
            removeElement(sticker);
        }

        // Disable listeners
        document.removeEventListener("mousemove", moveSticker);
        document.removeEventListener("touchmove", moveSticker);
        document.removeEventListener("mouseup", stopMovingSticker);
        document.removeEventListener("touchend", stopMovingSticker);
        document.removeEventListener("touchcancel", stopMovingSticker);
    }
    document.addEventListener("mouseup", stopMovingSticker);
    document.addEventListener("touchend", stopMovingSticker);
    document.addEventListener("touchcancel", stopMovingSticker);
}

function setPositionRelativeToMouse(element, mousePosX, mousePosY, anchor)
{
    element.style.left = mousePosX - STICKER_PAGE_DIV.getBoundingClientRect().left - anchor.x + "px";
    element.style.top = mousePosY - STICKER_PAGE_DIV.getBoundingClientRect().top - anchor.y + "px";
    if(rotationDiv)
    {
        positionRotationDiv();
    }
}

function setPositionRelativeToPreviousPosition(direction)
{
    if(activeSticker)
    {
        const CURRENT_Y_POS = parseFloat(activeSticker.style.top);
        const CURRENT_X_POS = parseFloat(activeSticker.style.left);
        const MOVE_SPEED = 3;

        switch(direction)
        {
            case "up":
                activeSticker.style.top = CURRENT_Y_POS - MOVE_SPEED + "px";
                break;
            case "down":
                activeSticker.style.top = CURRENT_Y_POS + MOVE_SPEED + "px";
                break;
            case "left":
                activeSticker.style.left = CURRENT_X_POS - MOVE_SPEED + "px";
                break;
            case "right":
                activeSticker.style.left = CURRENT_X_POS + MOVE_SPEED + "px";
                break;
        }

        positionRotationDiv();

        if(!stickerIsVisibleOnCanvas(activeSticker))
        {
            removeElement(activeSticker);
        }
    }
}

////////////////////////////////////////////////////////////////////////////////
/////////////////////////////// Rotate Stickers ///////////////////////////////
////////////////////////////////////////////////////////////////////////////////

// CAN YOU MOVE AND SIZE A STICKER AT THE SAME TIME?

function allowActiveStickerToBeRotated(sticker)
{
    // Create rotation div
    rotationDiv = document.createElement("div");
    rotationDiv.style.position = "absolute";
    positionRotationDiv();
    sizeRotationDiv();
    rotationDiv.style.transform = activeSticker.style.transform;
    rotationDiv.id = "rotationDiv";
    CANVAS_DIV.insertBefore(rotationDiv, activeSticker);
    rotationDiv.style.backgroundColor = "white";
}

function positionRotationDiv()
{
    rotationDiv.style.left = parseFloat(activeSticker.style.left) - ROTATION_DIV_OFFSET + "px";
    rotationDiv.style.top = parseFloat(activeSticker.style.top) - ROTATION_DIV_OFFSET + "px";
}
function sizeRotationDiv()
{
    rotationDiv.style.width = parseFloat(activeSticker.style.width) + (ROTATION_DIV_OFFSET * 2) + "px";
    rotationDiv.style.height = parseFloat(activeSticker.style.height) + (ROTATION_DIV_OFFSET * 2) + "px";
}

////////////////////////////////////////////////////////////////////////////////
///////////////////////// Set and Clear Active Sticker /////////////////////////
////////////////////////////////////////////////////////////////////////////////

function setActiveSticker(sticker)
{
    clearActiveSticker();

    activeSticker = sticker;
    activeSticker.style.cursor = "all-scroll";
    activeSticker.style.outline = "2px dashed blue";

    convertPercentPositionToPixels(activeSticker);

    if(BROWSER_SUPPORTS_MOUSE)
    {
        allowActiveStickerToBeRotated(activeSticker);
    }

    for(const button of TOOLBAR.children)
    {
        button.style.color = "black";   
    }
}

function clearActiveSticker()
{
    if(activeSticker)
    {
        // Remove rotation div
        removeElement(rotationDiv);
        rotationDiv = null;

        // Reset active sticker
        convertPixelPositionToPercent(activeSticker);
        activeSticker.style.outline = "initial";
        activeSticker.style.cursor = "default";
        activeSticker = null;
    }

    for(const button of TOOLBAR.children)
    {
        button.style.color = "lightgray";
    }
}

function clearActiveStickerOnClickOrTouch(event)
{
    if(!stickerClicked(event.target) && !toolbarClicked(event.target))
    {
        clearActiveSticker();
    }
}
document.addEventListener("mousedown", clearActiveStickerOnClickOrTouch);
document.addEventListener("touchstart", clearActiveStickerOnClickOrTouch);

function handlePlacedStickerInteraction(event)
{
    if(event.target.classList.contains("placed-sticker"))
    {
        event.preventDefault();

        const CLICKED_STICKER = event.target;

        // Make this the active sticker
        if(activeSticker != CLICKED_STICKER)
        {
            setActiveSticker(CLICKED_STICKER);
        }

        // Allow sticker to be moved
        const MOUSE_POS = getMousePos(event);
        const STICKER_RECT = CLICKED_STICKER.getBoundingClientRect();
        const ANCHOR = {
            x: MOUSE_POS.x - STICKER_RECT.left,
            y: MOUSE_POS.y - STICKER_RECT.top
        }
        handleStickerMouseMovement(CLICKED_STICKER, ANCHOR);
    }
}
CANVAS_DIV.addEventListener("mousedown", handlePlacedStickerInteraction);
CANVAS_DIV.addEventListener("touchstart", handlePlacedStickerInteraction);

window.addEventListener("resize", clearActiveSticker); // Clear active sticker on window resize

////////////////////////////////////////////////////////////////////////////////
////////////////////////////////// Set Cursor //////////////////////////////////
////////////////////////////////////////////////////////////////////////////////

function setCursor(event)
{
    // A sticker was clicked
    if(stickerClicked(event.target))
    {
        // set cursor to grabbing
        if(activeSticker)
        {
            activeSticker.style.cursor = "";
        }
        HTML_ELEMENT.style.cursor = "grabbing";

        // Reset cursor on mouse up
        function resetCursor()
        {
            HTML_ELEMENT.style.cursor = "default";
            if(activeSticker)
            {
                activeSticker.style.cursor = "all-scroll";
            }
            document.removeEventListener("mouseup", resetCursor);
        }
        document.addEventListener("mouseup", resetCursor);
    }
}
document.addEventListener("mousedown", setCursor);


////////////////////////////////////////////////////////////////////////////////
/////////////////////////////// Keyboard Inputs ///////////////////////////////
////////////////////////////////////////////////////////////////////////////////

document.addEventListener("keydown", function(event){    
    console.log(event.key);
    switch(event.key)
    {
        case "ArrowUp":
            event.preventDefault();
            setPositionRelativeToPreviousPosition("up");
            break;
        case "ArrowDown":
            event.preventDefault();
            setPositionRelativeToPreviousPosition("down");
            break;
        case "ArrowLeft":
            event.preventDefault();
            setPositionRelativeToPreviousPosition("left");
            break;
        case "ArrowRight":
            event.preventDefault();
            setPositionRelativeToPreviousPosition("right");
            break;
        case "Escape":
            clearActiveSticker();
            break;
        case "Delete":
            if(activeSticker)
            {
                removeElement(activeSticker);
            }
            break;
    }
})

////////////////////////////////////////////////////////////////////////////////
//////////////////////////////// Toolbar Inputs ////////////////////////////////
////////////////////////////////////////////////////////////////////////////////

function handleToolbarInputs(event)
{
    // Arrow inputs
    if(event.target.classList.contains("arrow-movement-control"))
    {
        event.preventDefault();
        
        // Animation frame loop to move active sticker
        let moveAnimationRequest = null;
        function moveSticker()
        {
            setPositionRelativeToPreviousPosition(event.target.dataset.direction);
            moveAnimationRequest = requestAnimationFrame(moveSticker);
        }
        moveAnimationRequest = requestAnimationFrame(moveSticker);
        
        // End animation frame loop
        function stopMovingSticker()
        {
            cancelAnimationFrame(moveAnimationRequest);
            moveAnimationRequest = null;
            document.removeEventListener("mouseup", stopMovingSticker);
            document.removeEventListener("touchend", stopMovingSticker);
            document.removeEventListener("touchcancel", stopMovingSticker);
        }
        document.addEventListener("mouseup", stopMovingSticker);
        document.addEventListener("touchend", stopMovingSticker);
        document.addEventListener("touchcancel", stopMovingSticker);
    }
}
TOOLBAR.addEventListener("mousedown", handleToolbarInputs);
TOOLBAR.addEventListener("touchstart", handleToolbarInputs);

////////////////////////////////////////////////////////////////////////////////
////////////////////////// Sticker Gallery Scrolling //////////////////////////
////////////////////////////////////////////////////////////////////////////////

// Only run following code for devices that do not have mouse support
if(!BROWSER_SUPPORTS_MOUSE)
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

function getMousePos(event)
{
    const MOUSE_POS = {
        x: event.clientX ? event.clientX : event.touches[0].clientX,
        y: event.clientY ? event.clientY : event.touches[0].clientY
    };
    return MOUSE_POS;
}

function stickerIsVisibleOnCanvas(sticker)
{
    const CANVAS_RECT = CANVAS_DIV.getBoundingClientRect();

    const STICKER_RECT = sticker.getBoundingClientRect();

    if(STICKER_RECT.right >= CANVAS_RECT.left 
        && STICKER_RECT.left <= CANVAS_RECT.right 
        && STICKER_RECT.bottom >= CANVAS_RECT.top 
        && STICKER_RECT.top <= CANVAS_RECT.bottom)
    {
        return true;
    }
    else
    {
        return false;
    }
}

function removeElement(element)
{
    if(element == activeSticker)
    {
        clearActiveSticker();
    }

    element.parentElement.removeChild(element);
}

function stickerClicked(clickedElement)
{
    return clickedElement.classList.contains("template-sticker") || clickedElement.classList.contains("placed-sticker");
}

function toolbarClicked(clickedElement)
{
    return clickedElement == TOOLBAR || clickedElement.parentElement == TOOLBAR;
}

function convertPixelPositionToPercent(element)
{
    if(element.style.left.includes("px"))
    {
        const CANVAS_RECT = CANVAS_DIV.getBoundingClientRect();
        element.style.left = ((parseFloat(element.style.left) / parseFloat(CANVAS_RECT.width)) * 100).toFixed(4) + "%";
        element.style.top = ((parseFloat(element.style.top) / parseFloat(CANVAS_RECT.height)) * 100).toFixed(4) + "%";
        element.style.width = ((parseFloat(element.style.width) / parseFloat(CANVAS_RECT.width)) * 100).toFixed(4) + "%";
        element.style.height = ((parseFloat(element.style.height) / parseFloat(CANVAS_RECT.height)) * 100).toFixed(4) + "%";
    }
}
function convertPercentPositionToPixels(element)
{
    if(element.style.left.includes("%"))
    {
        const CANVAS_RECT = CANVAS_DIV.getBoundingClientRect();

        element.style.left = ((parseFloat(element.style.left) / 100) * parseFloat(CANVAS_RECT.width)).toFixed(4) + "px";
        element.style.top = ((parseFloat(element.style.top) / 100) * parseFloat(CANVAS_RECT.height)).toFixed(4) + "px";
        element.style.width = ((parseFloat(element.style.width) / 100) * parseFloat(CANVAS_RECT.width)).toFixed(4) + "px";
        element.style.height = ((parseFloat(element.style.height) / 100) * parseFloat(CANVAS_RECT.height)).toFixed(4) + "px";
    }
}

// https://www.fiverr.com/naeemayaqoob/do-figma-website-design-website-ui-ux-design-figma-design-website-mockup?context_referrer=search_gigs&source=drop_down_filters&ref_ctx_id=7bdbbc81f30649d185aa3523d24428f9&pckg_id=1&pos=16&context_type=auto&funnel=7bdbbc81f30649d185aa3523d24428f9&ref=price_buckets%3A0&seller_online=true&imp_id=da2c0494-c67b-441f-933d-bee1f518d96f&ad_key=8435a193-1630-4ef7-9b59-21d7e65aa18a
// https://www.fiverr.com/wix_buddy/be-your-front-end-web-developer-using-html-css-bootstrap-gsap-react-js-jquery?context_referrer=search_gigs_with_modalities&source=top-bar&ref_ctx_id=69e7b67ca6f945e5962c6cd4de571e43&pckg_id=1&pos=5&context_type=auto&funnel=69e7b67ca6f945e5962c6cd4de571e43&imp_id=ebac8fce-0533-452f-8320-24e76a800704