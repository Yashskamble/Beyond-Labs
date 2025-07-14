"use client";

import { useState, useEffect } from "react";
import { useFormContext } from "react-hook-form";
import { Check, ChevronDown, ChevronUp, Circle } from "lucide-react";

import {
  Card,
  CardAction,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { Button } from "@/components/ui/button";

const PreconditionStatus = ({ accepted, expanded }) => {
  if (accepted && !expanded) {
    return (
      <span className="text-[#09090B] text-[13px] leading-[18.29px] bg-[#34C7591A] px-[10px] py-[6px] rounded-[24px] inline-flex items-center gap-1 font-medium">
        <Check stroke="#34C759" size={16} />
        Accepted
      </span>
    );
  }

  if (!accepted) {
    return (
      <span className="text-[#09090B] text-[13px] leading-[18.29px] bg-[#FF95001A] px-[10px] py-[6px] rounded-[24px] inline-flex items-center gap-1 font-medium">
        <Circle fill="#FF9500" stroke="#FF9500" size={9} />
        Pending
      </span>
    );
  }

  return null;
};

export default function PreconditionComponent() {
  const [expanded, setExpanded] = useState(false);

  const {
    watch,
    setValue,
    trigger,
    formState: { errors },
  } = useFormContext();

  const accepted = watch("preconditionAccepted");

  useEffect(() => {
    if (accepted) {
      trigger("preconditionAccepted");
    }
  }, [accepted, trigger]);

  const borderClass = errors.preconditionAccepted?.message
    ? "border-red-500"
    : "";

  const handleAccept = () => {
    setValue("preconditionAccepted", true, { shouldValidate: true });
  };

  return (
    <Collapsible open={expanded} onOpenChange={setExpanded}>
      <Card className={`w-full my-6 py-2 rounded-md border ${borderClass}`}>
        <CardHeader className="mx-2 flex items-center justify-between">
          <CardTitle className="text-[#0F0C1B] text-[14px] font-normal leading-[20px] tracking-[0.25px]">
            Hey, Accept Preconditions before you start the listing!
          </CardTitle>
          <CardAction className="flex items-center space-x-1">
            <PreconditionStatus accepted={accepted} expanded={expanded} />
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
          <CardContent className="mx-2">
            <p className="text-[#0F0C1B99] text-[14px] leading-[20px] font-normal tracking-[0.25px]">
              Before you can proceed with your listing, please make sure to
              review all required preconditions. Accepting these is mandatory to
              continue. It ensures your submission meets our platform standards
              and avoids delays. Listings that don’t meet these terms may be
              rejected. Take a moment to go through them carefully before moving
              ahead. Once accepted, you’ll be able to start listing right away.
            </p>

            {accepted ? (
              <div className="inline-flex items-center justify-center gap-1 my-6 px-[10px] py-[6px] rounded-[24px] bg-[#34C7591A] text-[#09090B] text-[13px] font-medium leading-[18px]">
                <Check stroke="#34C759" size={16} />
                Accepted
              </div>
            ) : (
              <Button
                type="button"
                onClick={handleAccept}
                className="w-[156px] h-[36px] rounded-lg p-[10px] gap-[10px] bg-[#613FDD] my-6 font-medium text-[12px] leading-[20px]"
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
