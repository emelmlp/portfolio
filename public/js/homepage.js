window.addEventListener("load", () => {
  const hamburger = document.querySelector(".hamburger");
  const menu = document.querySelector(".menu");

  // 햄버거 버튼을 눌렀을 때 메뉴를 열고 닫는 함수
  hamburger.addEventListener("click", () => {
    if (menu.classList.contains("show")) {
      menu.style.opacity = "0";
      setTimeout(() => {
        menu.classList.remove("show");
        menu.style.display = "none";
      }, 500); // opacity 트랜지션 시간에 맞춰서 조정
    } else {
      menu.style.display = "block"; // display:block으로 설정하여 다시 열림 가능하도록
      setTimeout(() => {
        menu.style.opacity = "1";
        menu.classList.add("show");
      }, 0);
    }
    hamburger.classList.toggle("active");
  });

  // 메뉴 항목 클릭 시 메뉴 탭을 닫는 기능
  document.querySelectorAll(".section-list li a").forEach((link) => {
    link.addEventListener("click", () => {
      menu.style.opacity = "0";
      setTimeout(() => {
        menu.classList.remove("show");
        menu.style.display = "none";
      }, 500); // 트랜지션 시간에 맞춰서 조정
      hamburger.classList.remove("active");
    });
  });
});
