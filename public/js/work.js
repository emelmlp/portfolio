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

      // 모든 이미지가 로드된 후 Isotope 초기화
      imagesLoaded(section, function () {
        const grid = new Isotope(section, {
          itemSelector: "article",
          layoutMode: "fitRows",
          transitionDuration: "0.5s",
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

        // 모달 관련 기능 추가
        const modal = document.getElementById("video-modal");
        const modalWrapper = document.getElementById("modal-video-wrapper");
        const modalTitle = modal.querySelector("h2");
        const modalDescription = modal.querySelector("p");
        const closeModal = document.querySelector(".close");
        
        // 아티클 클릭 시 모달 열기
        const articleElements = document.querySelectorAll(".section article");
        articleElements.forEach((article) => {
          article.addEventListener("click", () => {
            const videoSrc = article.dataset.video;
            const title = article.dataset.title;
            const description = article.dataset.description;
        
            modal.style.display = "flex";
            modalTitle.textContent = title;
            modalDescription.innerHTML = description;
        
                // iframe 삽입
    modalWrapper.innerHTML = `
    <div class="iframe-container">
      <iframe 
        src="${videoSrc}"
        frameborder="0"
        allow="autoplay; encrypted-media"
        allowfullscreen
        title="YouTube video"
      ></iframe>
    </div>
  `;
          });
        });
        
        // 모달 닫기 버튼
        closeModal.addEventListener("click", () => {
          modal.style.display = "none";
          modalWrapper.innerHTML = ""; // iframe 제거
        });
        
        // 모달 외부 클릭 시 닫기
        window.addEventListener("click", (e) => {
          if (e.target === modal) {
            modal.style.display = "none";
            modalWrapper.innerHTML = ""; // iframe 제거
          }
        });
      });
    })
    .catch((error) => {
      console.error("JSON 데이터 로드 실패:", error);
    });
});
