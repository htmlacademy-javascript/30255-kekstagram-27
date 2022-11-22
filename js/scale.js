const scaleControlValue = document.querySelector('.scale__control--value');
const scaledPicture = document.querySelector('.img-upload__preview');
const scaleSmallerButton = document.querySelector('.scale__control--smaller');
const scaleBiggerButton = document.querySelector('.scale__control--bigger');
const ZOOM_DEFAULT = 100;
const ZOOM_STEP = 25;
const MIN_SCALE = 25;
const MAX_SCALE = 100;

const changeScale = (step) => {
  const value = parseInt(scaleControlValue.value, 10) + step;
  if (value >= MIN_SCALE && value <= MAX_SCALE) {
    scaleControlValue.value = `${value}%`;
    scaledPicture.style.transform = `scale(${value / 100})`;
  }
};

const onscaleBiggerButtonClick = () => changeScale(ZOOM_STEP);
const onscaleSmallerButtonClick = () => changeScale(-ZOOM_STEP);

const activateScaleControl = () =>{
  scaleControlValue.value = `${ZOOM_DEFAULT}%`;
  scaledPicture.style.transform = `scale(${ZOOM_DEFAULT / 100})`;
  scaleSmallerButton.addEventListener('click', onscaleSmallerButtonClick );
  scaleBiggerButton.addEventListener('click', onscaleBiggerButtonClick );
};

export{activateScaleControl};


