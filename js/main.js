/**
 * Here's a simplified example of how I would imlement a lightbox. In an ideal world you also add keyboard listeners
 * such as the right and left arrow for going to the next/previous image or escape for closing the lightbox.
 */

/**
 * It's true that DOMContentLoaded is sort of a good practice,
 * but because we're loading our script just before the closing body tag,
 * we can be sure that the DOM is already loaded.
 */

/**
 * In normal circumstances, I would be using some sort of class initialization. However,
 * to keep it simple I'll just use globally defined variables and function.
 *
 * Also, I'd create something like this in Typescript as well, but this is something you can dive
 * in into the future. Also because then you come across compiling and bundling, which is a bit more advanced.
 *
 * Typescript, however, is definitely industry standard. And you'll probably learn faster with it, even though
 * you might really struggle to use it in the beginning.
 */

// Get all images that have the data-lightbox attribute, these are the images that will open the lightbox.
const lightboxImages = document.querySelectorAll("img[data-lightbox]");

// This variable will keep track of the active image in the lightbox.
let activeIndex = undefined;

/**
 *
 * @returns {Object} - Returns an object with all the elements that are needed for the lightbox. We can use this object to easily access the elements.
 */
function createLightbox() {
    const lightbox = document.createElement("div");
    const lightboxContainer = document.createElement("div");
    const lightboxNavigation = document.createElement("div");
    const lightboxPrev = document.createElement("button");
    const lightboxNext = document.createElement("button");
    const lightboxClose = document.createElement("button");
    const lightboxImageContainer = document.createElement("div");
    const lightboxImage = document.createElement("img");

    // Set button types
    lightboxPrev.type = "button";
    lightboxNext.type = "button";
    lightboxClose.type = "button";

    // Add classes
    lightboxContainer.classList.add("lightbox__container");
    lightboxImageContainer.classList.add("lightbox__image");
    lightboxNavigation.classList.add("lightbox__navigation");
    lightboxPrev.classList.add("lightbox__prev");
    lightboxNext.classList.add("lightbox__next");
    lightboxClose.classList.add("lightbox__close");

    // Set inner HTML for icons
    lightboxPrev.innerHTML = '<i class="fa-solid fa-arrow-left"></i>';
    lightboxNext.innerHTML = '<i class="fa-solid fa-arrow-right"></i>';
    lightboxClose.innerHTML = '<i class="fa-solid fa-times"></i>';

    // Add accessible labels to buttons
    lightboxPrev.setAttribute("aria-label", "Previous image");
    lightboxNext.setAttribute("aria-label", "Next image");
    lightboxClose.setAttribute("aria-label", "Close lightbox");

    // Build the structure
    lightboxContainer.appendChild(lightboxNavigation);
    lightboxImageContainer.appendChild(lightboxImage);
    lightboxContainer.appendChild(lightboxImageContainer);
    lightboxNavigation.appendChild(lightboxPrev);
    lightboxNavigation.appendChild(lightboxNext);
    lightboxContainer.prepend(lightboxClose);
    lightbox.appendChild(lightboxContainer);

    // Set IDs
    lightbox.id = "lightbox";
    lightboxImage.id = "lightbox-image";

    // Make the lightbox focusable
    lightbox.tabIndex = -1;

    // Set ARIA roles and attributes for modal dialog
    lightbox.setAttribute("role", "dialog");
    lightbox.setAttribute("aria-modal", "true");
    
    // Create a hidden label for the dialog
    const lightboxLabel = document.createElement("h2");
    lightboxLabel.id = "lightbox-label";
    lightboxLabel.textContent = "Image viewer";
    
    // Visually hide the label while keeping it accessible to screen readers
    lightboxLabel.style.position = "absolute";
    lightboxLabel.style.width = "1px";
    lightboxLabel.style.height = "1px";
    lightboxLabel.style.margin = "-1px";
    lightboxLabel.style.clip = "rect(0, 0, 0, 0)";
    lightboxLabel.style.overflow = "hidden";
    
    // Prepend the label to the container
    lightboxContainer.insertBefore(lightboxLabel, lightboxContainer.firstChild);
    lightbox.setAttribute("aria-labelledby", "lightbox-label");

    // Provide a default alt attribute for the image
    lightboxImage.alt = "";

    return {
        lightbox,
        lightboxImage,
        lightboxPrev,
        lightboxNext,
        lightboxClose,
    };
}

/**
 *
 * @param {string} newSrc The new source of the image that will be displayed in the lightbox.
 * @param {element} lightboxImage HTML img element that will be used to display the image in the lightbox.
 */
function setLightboxImage(newSrc, lightboxImage) {
    lightboxImage.src = newSrc;
}

/**
 *
 * @param {element} prev the previous button element
 * @param {element} next the next button element
 * @param {element} close the close button element
 * @param {element} lightboxImage the image element that will be used to display the image in the lightbox
 */
function setLightboxEventListeners(prev, next, close, lightboxImage) {
    prev.addEventListener("click", () => {
        const previousLightboxImage = lightboxImages[activeIndex - 1];
        if (previousLightboxImage) {
            setLightboxImage(previousLightboxImage.src, lightboxImage);
            activeIndex--;
        }
    });

    next.addEventListener("click", () => {
        const nextLightboxImage = lightboxImages[activeIndex + 1];
        if (nextLightboxImage) {
            setLightboxImage(nextLightboxImage.src, lightboxImage);
            activeIndex++;
        }
    });

    close.addEventListener("click", () => {
        closeLightbox();
        activeIndex = undefined;
    });
}

/**
 *
 * @param {string} src The source of the initial image that will be displayed in the lightbox.
 */
function openLightbox(src) {
    // Make sure that there's no existing lightbox that's open.
    if (document.getElementById("lightbox")) {
        closeLightbox();
    }
    const { lightbox, lightboxImage, lightboxClose, lightboxNext, lightboxPrev } =
        createLightbox();
    setLightboxEventListeners(lightboxPrev, lightboxNext, lightboxClose, lightboxImage);
    setLightboxImage(src, lightboxImage);
    document.body.appendChild(lightbox);
}

/**
 * This function will close the lightbox by adding a fade-out class to the lightbox element.
 * Once the animation is done, the lightbox will be removed from the DOM.
 */
function closeLightbox() {
    const lightbox = document.getElementById("lightbox");
    lightbox.classList.add("fade-out");

    lightbox.addEventListener("animationend", () => {
        lightbox.remove();
    });
}

/**
 * This function will initialize the lightbox by adding an event listener to each image that has the data-lightbox attribute.
 */
function initLightbox() {
    lightboxImages.forEach((image, index) => {
        image.addEventListener("click", () => {
            openLightbox(image.src);
            activeIndex = index;
        });
    });
}

initLightbox();
