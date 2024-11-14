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
          <article class="category-${article.category}" data-video="${article.video}">
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

      // Isotope 초기화 (setTimeout으로 지연) : 지연 안할 시 스타일보다 먼저 적용됐음.
      setTimeout(() => {
        const grid = new Isotope(section, {
          itemSelector: "article",
          columnWidth: 3,
          transitionDuration: "0.5s",
        });

        // 목록별 작업물 보기
        const btns = document.querySelectorAll(".sort li");
        btns.forEach((btn) => {
          btn.addEventListener("click", (e) => {
            e.preventDefault();

            const sort = btn.querySelector("a").getAttribute("href");
            grid.arrange({
              filter: sort,
            });

            btns.forEach((item) => {
              item.classList.remove("on");
            });

            btn.classList.add("on");
          });
        });
      }, 100); // 100ms 지연

      // 모달 관련
      const modal = document.getElementById("video-modal");
      const modalVideo = document.getElementById("modal-video");
      const closeModal = document.querySelector(".close");

      const articleElements = document.querySelectorAll(".section article");
      articleElements.forEach((article) => {
        article.addEventListener("click", () => {
          const videoSrc = article.dataset.video;
          modal.style.display = "flex";
          modalVideo.src = videoSrc;
          modalVideo.play();
        });
      });

      closeModal.addEventListener("click", () => {
        modal.style.display = "none";
        modalVideo.pause();
      });
    })
    .catch((error) => {
      console.error("JSON 데이터 로드 실패:", error);
    });
});
