window.addEventListener("load", () => {
  const section = document.querySelector(".section");

  // 반응형 레이아웃
  const grid = new Isotope(section, {
    itemSelector: "article", // 배치할 요소명
    columnWidth: 3, // 너비 값을 구할 요소명
    transitionDuration: "0.5s", // 화면 재배치 시 요소가 움직이는 속도
  });

  // 목록별 작업물 보기
  const btns = document.querySelectorAll(".sort li");
  btns.forEach((btn) => {
    btn.addEventListener("click", (e) => {
      e.preventDefault(); // a태그 기본동작 방지

      const sort = btn.querySelector("a").getAttribute("href");
      // console.log(sort);

      grid.arrange({
        filter: sort,
      });

      btns.forEach((item) => {
        item.classList.remove("on");
      });

      btn.classList.add("on");
    });
  });

  // 모달 관련 요소 선택
  const modal = document.getElementById("video-modal");
  const modalVideo = document.getElementById("modal-video");
  const closeModal = document.querySelector(".close");

  // 각 아티클 클릭 시 모달 열기
  const articles = document.querySelectorAll(".section article");
  articles.forEach((article) => {
    article.addEventListener("click", () => {
      const videoSrc = article.dataset.video; // 각 article의 데이터 속성에 비디오 경로 지정
      modal.style.display = "flex";
      modalVideo.src = videoSrc;
      modalVideo.play();
    });
  });
});
