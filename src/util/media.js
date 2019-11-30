/**
 * Sets all videos up on page such that when t is scrolled into view, they will auto-play
 * and when they are scrolled out of view, that will stop playing
 */
export function setupAudoVideoPlay() {
  let videoList = document.querySelectorAll('video');
  let tolerancePixel = 40;
  function checkMedia() {
    // Get current browser top and bottom
    let scrollTop = window.scrollY + tolerancePixel;
    let scrollBottom = window.scrollY + window.outerHeight - tolerancePixel;
    videoList.forEach((video, index) => {
      let yTopVideo = video.getBoundingClientRect().top + window.scrollY;
      let yBottomVideo = video.videoHeight + yTopVideo;
      if (scrollTop < yBottomVideo && scrollBottom > yTopVideo) {
        video.play();
      } else {
        video.pause();
      }
    });
  }
  document.addEventListener('scroll', checkMedia);
}