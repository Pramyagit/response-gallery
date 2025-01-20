const images = document.getElementById("datas");
const gallery = document.getElementById("gallery");
const filterButtons = document.querySelectorAll(".filter-btn");
const url = "./data.json";

//   filter images to fetch data
fetch(url)
  .then((response) => {
    if (!response.ok) {
      throw new Error("Network response was not ok: " + response.statusText);
    }
    return response.json();
  })
  .then((data) => {
    renderGallery(data);

    // Add filter functionality
    filterButtons.forEach((button) => {
      button.addEventListener("click", () => {
        const category = button.getAttribute("data-category");
        filterGallery(data, category);
      });
    });
  })
  .catch((error) => console.error("Error fetching data:", error));

// Render the gallery based on the dataset
function renderGallery(data) {
  gallery.innerHTML = "";

  data.forEach((item) => {
    const galleryItem = `
      <div
        class="gallery-item bg-white shadow-md rounded-lg overflow-hidden transition-transform duration-300 transform hover:scale-105"
        data-category="${item.category}"
      >
        <img
          src="${item.imageUrl}"
          alt="${item.title}"
          class="w-full h-48 object-cover"
        />
        <div class="p-4">
          <h2 class="text-lg font-semibold text-gray-800">${item.title}</h2>
          <p class="text-gray-600 capitalize">${item.category}</p>
        </div>
      </div>
    `;
    gallery.innerHTML += galleryItem;
  });
}

// Filter the gallery items by category
function filterGallery(data, category) {
  // If "all" is selected, display everything
  const filteredData =
    category === "all"
      ? data
      : data.filter((item) => item.category === category);
  renderGallery(filteredData);
}
