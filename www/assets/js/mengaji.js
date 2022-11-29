$(document).ready(function () {
  document.querySelectorAll(".carousel-promo").forEach((carousel) =>
    new Splide(carousel, {
      perPage: 3,
      rewind: true,
      type: "loop",
      gap: 16,
      padding: 16,
      arrows: false,
      pagination: false,
      breakpoints: {
        768: {
          perPage: 1,
        },
        991: {
          perPage: 2,
        },
      },
    }).mount()
  );
});

function lihatHadiah() {
  pages("voucher");
}
