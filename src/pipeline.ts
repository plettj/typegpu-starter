// Creates the WGSL shader, render pipeline, and vertex buffer for point rendering.
export function createPointPipeline(
  device: GPUDevice,
  format: GPUTextureFormat,
) {
  const shader = device.createShaderModule({
    label: "point shader",
    code: `
      @vertex
      fn vs(@location(0) pos: vec2f) -> @builtin(position) vec4f {
        return vec4f(pos, 0.0, 1.0);
      }

      @fragment
      fn fs() -> @location(0) vec4f {
        return vec4f(0.3, 0.98, 0.7, 1.0);
      }
    `,
  });

  const pipeline = device.createRenderPipeline({
    label: "point pipeline",
    layout: "auto",
    vertex: {
      module: shader,
      buffers: [
        {
          arrayStride: 8, // vec2f: 2 floats * 4 bytes
          attributes: [{ shaderLocation: 0, offset: 0, format: "float32x2" }],
        },
      ],
    },
    fragment: { module: shader, targets: [{ format }] },
    primitive: { topology: "point-list" },
  });

  return pipeline;
}

// Allocates a GPU vertex buffer for `maxPoints` vec2f positions.
export function createPositionBuffer(device: GPUDevice, maxPoints: number) {
  return device.createBuffer({
    label: "positions",
    size: maxPoints * 2 * 4,
    usage: GPUBufferUsage.VERTEX | GPUBufferUsage.COPY_DST,
  });
}
