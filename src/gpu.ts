import tgpu from "typegpu";

export async function initGPU(canvas: HTMLCanvasElement) {
  const adapter = await navigator.gpu?.requestAdapter();
  if (!adapter) throw new Error("WebGPU not supported");

  const root = await tgpu.init();

  const context = canvas.getContext("webgpu") as GPUCanvasContext;
  if (!context) throw new Error("WebGPU not supported");

  const format = navigator.gpu.getPreferredCanvasFormat();

  context.configure({ device: root.device, format });

  return { root, context, format };
}
