import tgpu from "typegpu";

// Initializes the WebGPU adapter, device, and configures the canvas context.
export async function initGPU(canvas: HTMLCanvasElement) {
  const adapter = await navigator.gpu?.requestAdapter();
  if (!adapter) throw new Error("WebGPU not supported");

  const root = await tgpu.init();

  const context = canvas.getContext("webgpu") as GPUCanvasContext;
  const format = navigator.gpu.getPreferredCanvasFormat();

  context.configure({ device: root.device, format });

  return { root, context, format };
}
