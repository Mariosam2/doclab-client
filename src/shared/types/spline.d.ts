import "react";

declare module "react" {
  namespace JSX {
    interface IntrinsicElements {
      "spline-viewer": React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> & {
        url?: string;
        background?: string;
        "events-target"?: string;
      };
    }
  }
}

declare module "@react-three/fiber" {
  interface ThreeElements {
    gradientSphereMaterial: THREE.ShaderMaterial;
  }
}

export {};
