document.addEventListener("DOMContentLoaded", () => {
  const galleryItems = document.querySelectorAll(".gallery-item");
  const lightbox = document.querySelector(".lightbox");
  const lightboxImage = document.querySelector(".lightbox-image");
  const closeBtn = document.querySelector(".close-btn");


  const openLightbox = (imageSrc) => {
    lightboxImage.src = imageSrc;
    lightbox.classList.add("active");
    document.body.style.overflow = "hidden";
  };

  const closeLightbox = () => {
    lightbox.classList.remove("active");
    document.body.style.overflow = "";
  };

  // Add click event to each gallery item
  galleryItems.forEach((item) => {
    item.addEventListener("click", () => {
      const imageSrc = item.querySelector("img").src;
      openLightbox(imageSrc);
    });
  });

  // Close lightbox when clicking the close button
  closeBtn.addEventListener("click", closeLightbox);

  // Close lightbox when clicking outside the image
  lightbox.addEventListener("click", (e) => {
    if (e.target === lightbox) {
      closeLightbox();
    }
  });
});
