export function drawImage(
  canvas: HTMLCanvasElement | undefined | null,
  image: HTMLImageElement | undefined | null,
  options: {
    x: number;
    y: number;
    filter: string;
    scaleX: number;
    scaleY: number;
  }
) {
  if (!canvas || !image) return;
  const { x, y, filter, scaleX, scaleY } = options;
  const context = canvas?.getContext("2d");
  if (context) {
    context.clearRect(0, 0, canvas.width, canvas.height);
    context.save();
    context.filter = filter;
    context.translate(
      scaleX < 0 ? canvas.width : 0,
      scaleY < 0 ? canvas.height : 0
    );
    context.scale(scaleX, scaleY);
    context.drawImage(image, x, y);
    context.restore();
  }
}
