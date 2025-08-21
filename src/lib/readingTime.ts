// content reading
const readingTime = (content: string, complexity: number): string => {
  const WPS = 200 / 60;

  let images = 0;
  const regex = /\w/;

  const words = content.split(" ").filter((word) => {
    if (word.includes(".png)")
      || word.includes(".jpg)")
      || word.includes(".svg)")
      || word.includes(".webp)")
      || word.includes(".gif)" )
    ) {
      images += 1;
    }
    return regex.test(word);
  }).length;

  let imageSecs = 0;
  let imageFactor = 12;

  while (images) {
    imageSecs += imageFactor;
    if (imageFactor > 3) {
      imageFactor -= 1;
    }
    images -= 1;
  }

  let ttr = 0; // time to read (in minutes)
  ttr = words / WPS;
  ttr = ttr + imageSecs;
  ttr = ttr * complexity;
  ttr = Math.ceil(ttr / 60);

  if (ttr < 2) {
    return ttr + ` min`;
  } else {
    return ttr + ` mins`;
  }
};

export default readingTime;
