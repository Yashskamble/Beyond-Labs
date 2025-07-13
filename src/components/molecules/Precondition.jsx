import { useState, useEffect } from "react";
import { useFormContext } from "react-hook-form";
import { Check, ChevronDown, ChevronUp, Circle } from "lucide-react";
import { Card, CardAction, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { Button } from "@/components/ui/button";

export default function Precondition() {
  const [expanded, setExpanded] = useState(false);
  const {
    watch,
    setValue,
    formState: { errors },
    trigger,
  } = useFormContext();

  const accepted = watch("preconditionAccepted");

  useEffect(() => {
    if (accepted) {
      trigger("preconditionAccepted");
    }
  }, [accepted, trigger]);

  const Status = () => {
    if (accepted && !expanded) {
      return (
        <div className="font-medium text-[13px] leading-[18.29px] tracking-normal text-[#09090B] bg-[#34C7591A] px-[10px] py-[6px] rounded-[24px] inline-flex items-center justify-center gap-1">
          <Check stroke="#34C759" size={16} />
          <span>Accepted</span>
        </div>
      );
    } else if (accepted && expanded) {
      return null;
    } else {
      return (
        <div className="font-medium text-[13px] leading-[18.29px] tracking-normal text-[#09090B] bg-[#FF95001A] px-[10px] py-[6px] rounded-[24px] inline-flex items-center justify-center gap-1">
          <Circle fill="#FF9500" stroke="#FF9500" size={9} />
          <span>Pending</span>
        </div>
      );
    }
  };

  return (
    <Collapsible open={expanded} onOpenChange={setExpanded}>
      <Card
        className={`w-full my-6 py-2 rounded-md border ${errors.preconditionAccepted?.message ? "border-red-500" : ""
          }`}
      >
        <CardHeader className="mx-2 flex items-center justify-between">
          <CardTitle className="text-[#0F0C1B] font-normal text-[14px] leading-[20px] tracking-[0.25px]">
            Hey, Accept Preconditions before you start the listing!
          </CardTitle>
          <CardAction className="flex items-center space-x-1">
            <Status />
            <CollapsibleTrigger>
              {expanded ? (
                <ChevronUp size={20} className="text-[#B3B3B3]" />
              ) : (
                <ChevronDown size={20} className="text-[#B3B3B3]" />
              )}
            </CollapsibleTrigger>
          </CardAction>
        </CardHeader>
        <CollapsibleContent>
          <CardContent className="mx-2 ">
            <p
              className={
                "font-normal text-[14px] leading-[20px] tracking-[0.25px] text-[#0F0C1B99]"
              }
            >
              Before you can proceed with your listing, please make sure to
              review all required preconditions. Accepting these is mandatory to
              continue. It ensures your submission meets our platform standards
              and avoids delays. Listings that don’t meet these terms may be
              rejected. Take a moment to go through them carefully before moving
              ahead. Once accepted, you’ll be able to start listing right away.
            </p>
            {accepted ? (
              <div className="font-medium text-[13px] leading-[18px] tracking-[0.1px] text-[#09090B] bg-[#34C7591A] px-[10px] py-[6px] rounded-[24px] inline-flex items-center justify-center gap-1 my-6">
                <Check stroke="#34C759" size={16} />
                <span>Accepted</span>
              </div>
            ) : (
              <Button
                className="w-[156px] h-[36px] rounded-lg p-[10px] gap-[10px] flex items-center bg-[#613FDD] my-6 font-medium text-[12px] leading-[20px] tracking-normal"
                onClick={() =>
                  setValue("preconditionAccepted", true, {
                    shouldValidate: true,
                  })
                }
              >
                Accept
              </Button>
            )}
          </CardContent>
        </CollapsibleContent>
      </Card>
    </Collapsible>
  );
}
