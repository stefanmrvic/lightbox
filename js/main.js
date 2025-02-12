window.addEventListener('DOMContentLoaded', () => {
    const grid = document.querySelector('.grid');
    const gridElements = document.querySelectorAll('.grid-items');
    const lightbox = document.querySelector('.lightbox');
    const lightboxContainer = document.querySelector('.lightbox__container');
    const closeButton = document.querySelector('.lightbox__close');
    const lightboxImage = document.querySelector('.lightbox__image img');

    gridElements.forEach(element => {
        element.addEventListener('click', showLightbox);
    });

    let currentImage;

    function showLightbox(e) {
        currentImage = document.querySelector("img[src= e.target.src]");
        alert(currentImage);

        lightbox.style.display = 'block';
        // Added setTimeout because animations bugs out if there is no slight delay after display has been changed 
        // from "none" to "block".
        setTimeout(() => {
            lightboxContainer.style.opacity = '1';
            lightboxImage.style.width = '90vw';
            lightboxImage.style.height = '90vh';
            lightboxImage.src = e.target.src;
        }, 200)
    }

    closeButton.addEventListener('click', () => {
        lightboxContainer.style.opacity = '0';
        lightboxImage.style.width = '30vw';
        lightboxImage.style.height = '30vh';

        setTimeout(() => {
            lightbox.style.display = 'none';
        }, 400)
    })

    const leftArrow = document.querySelector('.lightbox__previous-arrow');
    const rightArrow = document.querySelector('.lightbox__next-arrow');
    let numOfImages = grid.childElementCount;

    leftArrow.addEventListener('click', showPreviousImage);
    rightArrow.addEventListener('click', showNextImage);

    const firstImage = grid.firstChild;
    const lastImage = grid.lastChild;

    function showPreviousImage() {
        lightboxImage.src = currentImage.previousSibling.src;
    }

    function showNextImage() {
        lightboxImage.src = currentImage.nextSibling.src;
    }
})    
