// Returns a draw function that submits a render pass for `pointCount` points.
export function createRenderer(
  device: GPUDevice,
  context: GPUCanvasContext,
  positionBuffer: GPUBuffer,
) {
  return function draw(pipeline: GPURenderPipeline, pointCount: number) {
    const encoder = device.createCommandEncoder();

    const pass = encoder.beginRenderPass({
      colorAttachments: [
        {
          view: context.getCurrentTexture().createView(),
          clearValue: [0, 0, 0, 1],
          loadOp: "clear",
          storeOp: "store",
        },
      ],
    });

    if (pointCount > 0) {
      pass.setPipeline(pipeline);
      pass.setVertexBuffer(0, positionBuffer);
      pass.draw(pointCount);
    }

    pass.end();
    device.queue.submit([encoder.finish()]);
  };
}
