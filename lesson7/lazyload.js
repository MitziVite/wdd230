// Gather the images to load
let imagesToLoad = document.querySelectorAll("img[data-src]");

// Set up the load images function which switches the src and the data-src attributes.
const loadImages = (image) => {
  image.setAttribute("src", image.getAttribute("data-src"));
  image.onload = () => {
    image.removeAttribute("data-src");
  };
};


// Add an intersection observer 
const callback = (items, observer) => {
  items.forEach((item) => {
    if (item.isIntersecting) {
      loadImages(item.target);
      observer.unobserve(item.target);
    }
  });
};

// Set up the options
let options = {
  threshold: 0.1
};

// Create an observer
const observer = new IntersectionObserver(callback, options);

// Register each image with the intersection observer
imagesToLoad.forEach((img) => {
  observer.observe(img);
});
