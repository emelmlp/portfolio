window.addEventListener("load", () => {
  const section = document.querySelector(".section");

  // JSON 데이터 불러오기
  fetch("./data/articles.json")
    .then((response) => response.json())
    .then((data) => {
      // JSON 데이터를 사용하여 아티클 생성
      const articlesHTML = data.articles
        .map((article) => {
          return `
          <article class="${article.category}" data-video="${article.video}" data-title="${article.h2}" data-description="${article.description}">
            <div>
              <img src="${article.image}" alt="${article.title}">
              <h2>${article.h2}</h2>
              <p>${article.p}</p>
            </div>
          </article>
        `;
        })
        .join("");

      // 아티클 HTML 삽입
      section.innerHTML = articlesHTML;

      // Isotope 초기화
      const grid = new Isotope(section, {
        itemSelector: "article",
        layoutMode: "fitRows",
        transitionDuration: "0.5s",
      });

      // 레이아웃 조정
      requestAnimationFrame(() => {
        grid.layout();
      });

      // 목록별 작업물 보기
      const btns = document.querySelectorAll(".sort li");
      btns.forEach((btn) => {
        btn.addEventListener("click", (e) => {
          e.preventDefault();

          const sortCategory = btn
            .querySelector("a")
            .getAttribute("href")
            .replace("#", ".");
          grid.arrange({
            filter: sortCategory === ".ALL" ? "*" : sortCategory,
          });

          btns.forEach((item) => {
            item.classList.remove("on");
          });

          btn.classList.add("on");
        });
      });
    })
    .catch((error) => {
      console.error("JSON 데이터 로드 실패:", error);
    });
});
