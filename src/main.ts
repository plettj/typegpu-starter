import { setupControls } from "./controls";
import { initGPU } from "./gpu";
import { createPointPipeline, createPositionBuffer } from "./pipeline";
import { createRenderer } from "./renderer";

const MAX_POINTS = 3;
const canvas = document.querySelector("canvas") as HTMLCanvasElement;

const { device, context, format } = await initGPU(canvas);
const pipeline = createPointPipeline(device, format);
const positionBuffer = createPositionBuffer(device, MAX_POINTS);
const draw = createRenderer(device, context, pipeline, positionBuffer);

let pointCount = 0;
draw(pointCount);

setupControls(canvas, (normX, normY) => {
  // Write the new point into the buffer at the current index
  device.queue.writeBuffer(
    positionBuffer,
    pointCount * 8,
    new Float32Array([normX, normY]),
  );
  pointCount = Math.min(pointCount + 1, MAX_POINTS);
  draw(pointCount);
});
