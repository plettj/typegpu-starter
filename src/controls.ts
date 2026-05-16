export function setupControls(
  canvas: HTMLCanvasElement,
  onPoint: (normX: number, normY: number) => void,
) {
  canvas.addEventListener("click", ({ offsetX, offsetY }) => {
    const normX = (offsetX / canvas.clientWidth) * 2 - 1;
    const normY = 1 - (offsetY / canvas.clientHeight) * 2;
    onPoint(normX, normY);
  });
}

export function setupResizeObserver(canvas: HTMLCanvasElement) {
  new ResizeObserver(() => {
    canvas.width = canvas.clientWidth * window.devicePixelRatio;
    canvas.height = canvas.clientHeight * window.devicePixelRatio;
  }).observe(canvas);
}
