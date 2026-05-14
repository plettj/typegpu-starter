// Listens for canvas clicks and invokes `onPoint` with normalized clip-space coords.
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
