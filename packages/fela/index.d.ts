declare module "fela" {

  import { CSSProperties } from 'react';

  type TRuleProps = {};
  type TRule = (props: TRuleProps) => IStyle;
  type TKeyFrame = TRule;
  type TRendererCreator = (config?: IConfig) => IRenderer;
  type TPlugin = (style?: IStyle) => IStyle; //http://fela.js.org/docs/advanced/Plugins.html
  type TEnhancer = (renderer?: IRenderer) => IRenderer; //http://fela.js.org/docs/advanced/Enhancers.html

  const enum TSubscribeMessageType {
    rule = 1,
    staticObject = 1,
    keyframes = 2,
    fontFace = 3,
    staticString = 4,
    clear = 5
  }
  interface ISubscribeMessage {
    type: TSubscribeMessageType;
  }
  interface ISubscribeRuleOrStaticObjectMessage extends ISubscribeMessage { static?: boolean; declaration: string; selector: string; media: string; }
  interface ISubscribeKeyframesMessage extends ISubscribeMessage { name: string; keyframe: string; }
  interface ISubscribeFontFaceMessage extends ISubscribeMessage { fontFamily: string; fontFace: string; }
  interface ISubscribeStaticStringMessage extends ISubscribeMessage { css: string; }
  interface ISubscribeClearMessage extends ISubscribeMessage { }

  interface IRenderer {
    renderRule(rule: TRule, props: TRuleProps): string;
    renderKeyframe(keyFrame: TKeyFrame, props: TRuleProps): string;
    renderFont(family: string, files: Array<string>, props: TRuleProps): void;
    renderStatic(style: string, selector?: string): void;
    renderStatic(style: IStyle, selector: string): void;
    renderToString(): string;
    subscribe(event: (msg: ISubscribeRuleOrStaticObjectMessage | ISubscribeKeyframesMessage | ISubscribeFontFaceMessage | ISubscribeStaticStringMessage | ISubscribeClearMessage) => void): { unsubscribe: () => void; }
    clear(): void;
  }

  //http://fela.js.org/docs/advanced/RendererConfiguration.html
  interface IConfig {
    plugins?: Array<TPlugin>;
    keyframePrefixes?: Array<string>;
    enhancers?: Array<TEnhancer>;
    mediaQueryOrder?: Array<string>;
    selectorPrefix?: string;
  }

  interface IStyle extends CSSProperties {
    //TODO: add properties, missing in React.CSSProperties
  }

  function createRenderer(config?: IConfig): IRenderer;
  function combineRules(...rules: Array<TRule>): TRule;
  function enhance(...enhancers: Array<TEnhancer>): (rendererCreator: TRendererCreator) => TRendererCreator;
}

declare module "fela-dom" {
  import { IRenderer } from 'fela';
  function render(renderer: IRenderer, node: HTMLElement): any;
}

declare module "fela-perf" {
  import { TEnhancer } from "fela";

  export default function(): TEnhancer;
}

declare module "fela-plugin-fallback-value" {
  import { TPlugin } from "fela";

  export default function(): TPlugin;
}

declare module "fela-plugin-lvha" {
  import { TPlugin } from "fela";

  export default function(): TPlugin;
}

declare module "fela-plugin-prefixer" {
  import { TPlugin } from "fela";

  export default function(): TPlugin;
}

declare module "fela-plugin-validator" {
  import { TPlugin } from "fela";

  export default function(): TPlugin;
}