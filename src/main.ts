import tgpu, { d } from "typegpu";
import { setupControls, setupResizeObserver } from "./controls";
import { pipelineOptions, vertexLayout } from "./pipeline";

const MAX_POINTS = 3;

const canvas = document.querySelector("canvas") as HTMLCanvasElement;
setupResizeObserver(canvas);

const root = await tgpu.init();
const context = root.configureContext({ canvas });

const positionBuffer = root
  .createBuffer(d.arrayOf(d.vec2f, MAX_POINTS))
  .$usage("vertex");

const renderPipelines = [
  root.createRenderPipeline({ ...pipelineOptions, primitive: { topology: "point-list" } }),
  root.createRenderPipeline({ ...pipelineOptions, primitive: { topology: "line-strip" } }),
  root.createRenderPipeline({ ...pipelineOptions, primitive: { topology: "triangle-list" } }),
];

let pointCount = 0;

setupControls(canvas, (normX, normY) => {
  pointCount = pointCount % MAX_POINTS + 1;

  // Write the new point into the position buffer, at the current index.
  positionBuffer.patch({ [pointCount - 1]: [normX, normY] });

  // Draw, by invoking the TypeGPU pipeline.
  renderPipelines[pointCount - 1]
    .with(vertexLayout, positionBuffer)
    .withColorAttachment({ view: context })
    .draw(pointCount);
});
