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

      // Isotope 초기화 (setTimeout으로 지연)
      setTimeout(() => {
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

            const sortCategory = btn.querySelector("a").getAttribute("href").replace("#", ".");
            grid.arrange({
              filter: sortCategory === ".ALL" ? "*" : sortCategory,
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
      const modalTitle = modal.querySelector("h2");
      const modalDescription = modal.querySelector("p");
      const closeModal = document.querySelector(".close");

      const articleElements = document.querySelectorAll(".section article");
      articleElements.forEach((article) => {
        article.addEventListener("click", () => {
          const videoSrc = article.dataset.video;
          const title = article.dataset.title;
          const description = article.dataset.description;

          modal.style.display = "flex";
          modalVideo.src = videoSrc;
          modalTitle.textContent = title;
          modalDescription.innerHTML = description;
          modalVideo.play();
        });
      });

      // 클로즈 버튼 눌러 모달 닫기
      closeModal.addEventListener("click", () => {
        modal.style.display = "none";
        modalVideo.pause();
        modalVideo.src = ""; // 닫을 때 비디오 초기화
      });

      // 모달 외부 클릭 시 닫기
      window.addEventListener("click", (e) => {
        if (e.target === modal) {
          modal.style.display = "none";
          modalVideo.pause();
          modalVideo.currentTime = 0;
        }
      });
    })
    .catch((error) => {
      console.error("JSON 데이터 로드 실패:", error);
    });
});
