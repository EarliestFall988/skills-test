import React, { type FC, type ReactNode } from "react";
import * as Tooltip from "@radix-ui/react-tooltip";

const TooltipComponent: FC<{
  children: ReactNode;
  side?: "top" | "right" | "bottom" | "left" | undefined
  context: string;
}> = ({ children, context, side }) => {
  return (
    <Tooltip.Provider>
      <Tooltip.Root>
        <Tooltip.Trigger asChild>{children}</Tooltip.Trigger>
        <Tooltip.Portal>
          <Tooltip.Content
            className="data-[state=delayed-open]:data-[side=top]:animate-slideDownAndFade data-[state=delayed-open]:data-[side=right]:animate-slideLeftAndFade data-[state=delayed-open]:data-[side=left]:animate-slideRightAndFade data-[state=delayed-open]:data-[side=bottom]:animate-slideUpAndFade text-violet11 select-none rounded-[4px] border border-zinc-600 bg-black/20 backdrop-blur px-[15px] py-[10px] text-[15px] leading-none text-white will-change-[transform,opacity]"
            sideOffset={5}
            side={side}
          >
            {context}
            <Tooltip.Arrow className="fill-zinc-600" />
          </Tooltip.Content>
        </Tooltip.Portal>
      </Tooltip.Root>
    </Tooltip.Provider>
  );
};

export default TooltipComponent;
