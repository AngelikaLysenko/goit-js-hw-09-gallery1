const galleryItems = [
  {
    preview:
      'https://cdn.pixabay.com/photo/2019/05/14/16/43/himilayan-blue-poppy-4202825__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2019/05/14/16/43/himilayan-blue-poppy-4202825_1280.jpg',
    description: 'Hokkaido Flower',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2019/05/14/22/05/container-4203677__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2019/05/14/22/05/container-4203677_1280.jpg',
    description: 'Container Haulage Freight',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2019/05/16/09/47/beach-4206785__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2019/05/16/09/47/beach-4206785_1280.jpg',
    description: 'Aerial Beach View',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2016/11/18/16/19/flowers-1835619__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2016/11/18/16/19/flowers-1835619_1280.jpg',
    description: 'Flower Blooms',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2018/09/13/10/36/mountains-3674334__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2018/09/13/10/36/mountains-3674334_1280.jpg',
    description: 'Alpine Mountains',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2019/05/16/23/04/landscape-4208571__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2019/05/16/23/04/landscape-4208571_1280.jpg',
    description: 'Mountain Lake Sailing',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2019/05/17/09/27/the-alps-4209272__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2019/05/17/09/27/the-alps-4209272_1280.jpg',
    description: 'Alpine Spring Meadows',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2019/05/16/21/10/landscape-4208255__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2019/05/16/21/10/landscape-4208255_1280.jpg',
    description: 'Nature Landscape',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2019/05/17/04/35/lighthouse-4208843__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2019/05/17/04/35/lighthouse-4208843_1280.jpg',
    description: 'Lighthouse Coast Sea',
  },
];

const gallery = document.querySelector(".js-gallery");
const modal = document.querySelector(".js-lightbox");
const img = document.querySelector(".lightbox__image");
const btn = document.querySelector('[data-action="close-lightbox"]');

const items = []

galleryItems.forEach(item => {
const preview = item.preview;
const original = item.original;
const description = item.description;
  item = `
<li class="gallery__item">
<a href="#" class="gallery__link">
<img src="${preview}" data-source="${original}" class="gallery__image" alt="${description}">
</a>
</li>`
  items.push(item)
});

// window.addEventListener("keydown", closeModalUseEsc);

// function createGallery(gallery) {
//   return gallery
//     .map(({ preview, original, description}, index) => {
//       return `<li class = "gallery__item">
//       <a class = "gallery__link" href="${original}">
//       <img class ="gallery__image" data-index="${index}" src="${preview}" data-source="${description}"/>
//       </a>
//       </li>`;
//     })
//     .join("");
// };

gallery.insertAdjacentHTML('afterbegin', items.join(" "))
gallery.addEventListener("click", onImgClick);
btn.addEventListener("click", closeModal);


// function onImgClick(e) { 
//   const targetImg = e.target;
//   console.log("event target: ", targetImg);
//   modal.classList.toggle("is-open");
//   img.src = targetImg.dataset.source;
// };

// function onCloseModal(e) {
//   const targetCloseBtn = e.target;
//   modal.classList.toggle("is-open")
//     img.src = ""
// };

let indexImg = 0;

function onImgClick(e) {
  e.preventDefault();
  if (e.target.nodeName === "IMG") {
    openModal();
    indexImg = +e.target.dataset.index;
  }
  assignCurrentSrcForLightboxImg(e);
};

function openModal(){
modal.classList.add("is-open");
modal.addEventListener('click', closeModalByBtnAndOverlay);
window.addEventListener('keydown', closeModalUseEsc);
};

function closeModal() {
  modal.classList.remove("is-open");
};

function closeModalByBtnAndOverlay(e) {
  if (e.target.nodeName === "BUTTON" || e.target.nodeName === "DIV") {
    closeModal();
    changeSrcForLightboxImg("","");
  }
};

function closeModalUseEsc(e) {
  if (e.target.nodeName === "Escape") {
    closeModal();
    changeSrcForLightboxImg("","");
  }
};

function assignCurrentSrcForLightboxImg(e) {
  const currentImgLink = e.target.dataset.source;
  const currentImgAlt = e.target.alt;
  changeSrcForLightboxImg(currentImgLink, currentImgAlt);
};

function changeSrcForLightboxImg(src, alt){
  img.src = src;
  img.alt = alt;
};

window.addEventListener("keydown", slick);
const galleryLength = gallery.length -1;

function slick(e) {
  if(e.code === "ArrowLeft"){
    indexImg -=1;
    if (indexImg < 0) indexImg = galleryLength;
  }
  if (e.code === "ArrowRight"){
    indexImg +=1;
    if(indexImg > galleryLength) indexImg = 0;
  }
  const item = gallery[indexImg];
  changeSrcForLightboxImg(item.original, item.description);
};
console.log(item.original)