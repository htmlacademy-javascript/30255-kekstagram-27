const ScaleControlValue = document.querySelector('.scale__control--value');
const ScaledPicture = document.querySelector('.img-upload__preview');
const ZOOM_STEP = 25;

function onscaleSmallerButtonClick () {
  let zoomDefault = Number(ScaleControlValue.value.slice(0, -1));
  ScaledPicture.style.transform = `scale(${zoomDefault / 100})`;
  if (zoomDefault - ZOOM_STEP >= ZOOM_STEP ) {
    ScaleControlValue.value = `${zoomDefault - ZOOM_STEP}%`;
    ScaledPicture.style.transform = `scale(${(zoomDefault - ZOOM_STEP) / 100})`;
    zoomDefault -= ZOOM_STEP;
  }
}

function onscaleBiggerButtonClick () {
  let zoomDefault = Number(ScaleControlValue.value.slice(0, -1));
  ScaledPicture.style.transform = `scale(${zoomDefault / 100})`;
  if (zoomDefault + ZOOM_STEP <= 100 ) {
    ScaleControlValue.value = `${zoomDefault + ZOOM_STEP}%`;
    ScaledPicture.style.transform = `scale(${(zoomDefault + ZOOM_STEP) / 100})`;
    zoomDefault += ZOOM_STEP;
  }

}
export{onscaleSmallerButtonClick};
export{onscaleBiggerButtonClick};
