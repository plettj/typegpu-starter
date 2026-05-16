import { d } from "typegpu";
import { setupControls, setupResizeObserver } from "./controls";
import { initGPU } from "./gpu";
import { createRenderPipeline, vertexLayout } from "./pipeline";

const MAX_POINTS = 3;

const canvas = document.querySelector("canvas") as HTMLCanvasElement;
setupResizeObserver(canvas);

const { root, context } = await initGPU(canvas);
const positionBuffer = root
  .createBuffer(d.arrayOf(d.vec2f, MAX_POINTS))
  .$usage("vertex");
const renderPipelines = [
  createRenderPipeline(root, { topology: "point-list" }),
  createRenderPipeline(root, { topology: "line-strip" }),
  createRenderPipeline(root, { topology: "triangle-list" }),
];

let pointCount = 0;

setupControls(canvas, (normX, normY) => {
  if (pointCount >= MAX_POINTS) pointCount = 0;
  pointCount = Math.min(pointCount + 1, MAX_POINTS);

  // Write the new point into the position buffer, at the current index.
  positionBuffer.patch({ [pointCount - 1]: [normX, normY] });

  renderPipelines[pointCount - 1]
    .with(vertexLayout, positionBuffer)
    .withColorAttachment({ view: context })
    .draw(pointCount);
});
