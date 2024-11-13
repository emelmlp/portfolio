window.addEventListener("load", () => {
  const frame = document.querySelector("section");
  const lists = frame.querySelectorAll("article");
  const deg = 45;
  const len = lists.length - 1; // 순번이 0부터 시작하므로 전체 개수에서 -1
  let i = 0;
  const prev = document.querySelector(".prevBtn");
  const next = document.querySelector(".nextBtn");
  let num = 0;
  let active = 0;
  let audios = document.querySelectorAll("audio");

  lists.forEach((item) => {
    let pic = item.querySelector(".pic");
    let audio = item.querySelector("audio");
    // 각 article 요소를 45도씩 회전하고 위로(top:140%->tsY(-100vh)) 배치
    item.style.transform = `rotate(${deg * i}deg) translateY(-100vh) `;
    //배경 이미지 추가
    pic.style.backgroundImage = `url(img/member${i + 1}.jpg)`;
    i++;

    // 각 article 요소 안의 재생, 정지, 처음부터 재생 버튼을 변수에 저장
    const play = item.querySelector(".play");
    const pause = item.querySelector(".pause");
    const load = item.querySelector(".load");

    // play 버튼 클릭 시
    play.addEventListener("click", (e) => {
      let isActive = item.classList.contains("on");
      console.log(isActive);
      if (!isActive) return;

      pic.classList.add("on");
      //   e.currentTarget
      //     .closest("article")
      //     .querySelector(".pic")
      //     .classList.add("on");
      audio.play();
    });
    // load 버튼 클릭 시
    load.addEventListener("click", (e) => {
      let isActive = item.classList.contains("on");
      //   console.log(isActive);
      if (!isActive) return;

      pic.classList.add("on");
      //   e.currentTarget
      //     .closest("article")
      //     .querySelector(".pic")
      //     .classList.add("on");
      audio.load();
      audio.play;
    });
    // pause 버튼 클릭 시
    pause.addEventListener("click", (e) => {
      let isActive = item.classList.contains("on");
      //   console.log(isActive);
      if (!isActive) return;

      pic.classList.remove("on");
      //   e.currentTarget
      //     .closest("article")
      //     .querySelector(".pic")
      //     .classList.add("on");
      audio.pause();
    });
  });

  prev.addEventListener("click", () => {
    initMusic();
    num++;
    frame.style.transform = `rotate(${deg * num}deg)`;

    // if (active === 0) {
    //   active = len;
    //   activation(lists, active);
    // } else {
    //   active--;
    //   activation(lists, active);
    // }
    active === 0 ? (active = len) : active--;
    activation(lists, active);
  });
  next.addEventListener("click", () => {
    initMusic();
    num--;
    frame.style.transform = `rotate(${deg * num}deg)`;

    // if (active === 0) {
    //   active = len;
    //   activation(lists, active);
    // } else {
    //   active--;
    //   activation(lists, active);
    // }
    active === len ? (active = 0) : active++;
    activation(lists, active);
  });

  const activation = (articles, index) => {
    articles.forEach((article) => {
      article.classList.remove("on");
    });
    articles[index].classList.add("on");
  };

  const initMusic = () => {
    audios.forEach((audio) => {
      audio.pause();
      audio.load();
      audio.parentElement.previousElementSibling.classList.remove("on");
    });
  };
});
