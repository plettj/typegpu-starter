import { setupControls, setupResizeObserver } from "./controls";
import { initGPU } from "./gpu";
import { createPipelines, createPositionBuffer } from "./pipeline";
import { createRenderer } from "./renderer";

const MAX_POINTS = 3;
const canvas = document.querySelector("canvas") as HTMLCanvasElement;
// Ensure the canvas is the correct size, before calling initGPU.
setupResizeObserver(canvas, () => draw(pipelines[pointCount - 1], pointCount));

const { device, context, format } = await initGPU(canvas);
const pipelines = createPipelines(device, format);
const positionBuffer = createPositionBuffer(device, MAX_POINTS);
const draw = createRenderer(device, context, positionBuffer);

let pointCount = 0;
draw(pipelines[pointCount - 1], pointCount);

setupControls(canvas, (normX, normY) => {
  if (pointCount >= 3) pointCount = 0;
  // Write the new point into the buffer at the current index
  device.queue.writeBuffer(
    positionBuffer,
    pointCount * 8,
    new Float32Array([normX, normY]),
  );
  pointCount = Math.min(pointCount + 1, MAX_POINTS);
  draw(pipelines[pointCount - 1], pointCount);
});
