import { setupControls, setupResizeObserver } from "./controls";
import { initGPU } from "./gpu";
import { createPipelines, createPositionBuffer } from "./pipeline";
import { createRenderer } from "./renderer";

const MAX_POINTS = 3;
const canvas = document.querySelector("canvas") as HTMLCanvasElement;
setupResizeObserver(canvas);

const { root, context, format } = await initGPU(canvas);
const pipelines = createPipelines(root.device, format);
const positionBuffer = createPositionBuffer(root, MAX_POINTS);
const draw = createRenderer(root.device, context, positionBuffer.buffer);

let pointCount = 0;
draw(pipelines[pointCount - 1], pointCount);

setupControls(canvas, (normX, normY) => {
  if (pointCount >= MAX_POINTS) pointCount = 0;
  // Write the new point into the buffer at the current index
  positionBuffer.patch({ [pointCount]: [normX, normY] });
  pointCount = Math.min(pointCount + 1, MAX_POINTS);
  draw(pipelines[pointCount - 1], pointCount);
});
