// .d.ts  -> this is a declaration file that contains only information about the type/shape of the object which is used by the typescript compiler. This is required because Typescript don't know all the types initially.

declare module "*.svg?react" {
    import * as React from "react";
    const ReactComponent : React.FunctionComponent<React.SVGProps<SVGSVGElement>>;
    export default ReactComponent;
}

