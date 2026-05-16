import { d, tgpu } from "typegpu";

export const vertexLayout = tgpu.vertexLayout(d.arrayOf(d.vec2f));

const vertexShader = tgpu.vertexFn({
  in: { pos: d.vec2f },
  out: { pos: d.builtin.position },
})(({ pos }) => {
  "use gpu";
  // This is TypeScript code which compiles into WGSL.
  return {
    pos: d.vec4f(pos, 0, 1),
  };
});

const fragmentShader = tgpu.fragmentFn({
  out: d.vec4f,
})(() => {
  "use gpu";
  return d.vec4f(0.3, 0.98, 0.7, 1.0);
});


export const pipelineOptions = {
  attribs: { pos: vertexLayout.attrib },
  vertex: vertexShader,
  fragment: fragmentShader,
  // Further options include: depthStencil, multisample, primitive.
} as const;

