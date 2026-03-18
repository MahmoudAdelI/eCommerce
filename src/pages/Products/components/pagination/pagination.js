export default function pagination(page, totalCount, perPage = 8) {
  const totalPages = Math.ceil(totalCount / perPage);

  const currentGroup = Math.ceil(page / 5);
  const startPage = (currentGroup - 1) * 5 + 1;
  const endPage = Math.min(startPage + 4, totalPages);

  let pages = "";
  for (let i = startPage; i <= endPage; i++) {
    pages += `<button class="pagination__page
              ${i === page ? "pagination__page--active" : ""}"
                data-page="${i}">
                ${i}
              </button>`;
  }

  return `
    <div class="pagination">
      <button class="button pagination__button pagination__button--prev"
         ${page === 1 ? "disabled" : ""}
         data-page="${page - 1}"
         >
        <span class="pagination__icon">
          <i class="fa-solid fa-arrow-left"></i>
        </span>
        <span class="pagination__text"> Previous </span>
      </button>
      <div class="pagination__pages">
        ${pages}
      </div>
      <button class="button pagination__button pagination__button--next"
        ${page === totalPages ? "disabled" : ""}
        data-page="${page + 1}"
      >
        <span class="pagination__text"> Next </span>
        <span class="pagination__icon">
          <i class="fa-solid fa-arrow-right"></i>
        </span>
      </button>
    </div>`;
}
