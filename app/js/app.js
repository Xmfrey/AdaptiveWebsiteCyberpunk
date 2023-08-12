///////////////////////////////slider///////////////////////////////

const swiper = new Swiper(".swiper", {
  direction: "horizontal",
  loop: true,
  autoplay: {
    delay: 5000,
    disableOnInteraction: false,
  },
});

//////////////////////form-singleOrmultiple-files////////////////////
let files = [];
const fileLabel = document.querySelector(".form__file-label");
const inputFile = document.querySelector(".form__input-file");
const screenshotWrap = document.createElement("div");
screenshotWrap.classList.add("form__screenshot-wrap");
fileLabel.insertAdjacentElement("beforeend", screenshotWrap);

const changeHandler = (event) => {
  if (!event.target.files.length) {
    return;
  }

  files = Array.from(event.target.files);

  files.forEach((file) => {
    if (!file.type.match("image")) {
      return;
    }

    const reader = new FileReader();

    reader.onload = (ev) => {
      const src = ev.target.result;
      screenshotWrap.insertAdjacentHTML(
        "afterbegin",
        `
          <div class="form__preview-image">
            <div class="form__image-remove" data-name="${file.name}">&times;</div>
            <img class='form__file-image' src="${src}" alt="${file.name}" />
          </div>
        `
      );
    };

    reader.readAsDataURL(file);
  });
};

const removeHandler = (event) => {
  event.preventDefault();
  if (!event.target.dataset.name) {
    return;
  }

  const { name } = event.target.dataset;
  files = files.filter((file) => file.name !== name);

  const block = screenshotWrap
    .querySelector(`[data-name="${name}"]`)
    .closest(".form__preview-image");

  block.remove();
  inputFile.value = "";
};

fileLabel.addEventListener("change", changeHandler);
screenshotWrap.addEventListener("click", removeHandler);
