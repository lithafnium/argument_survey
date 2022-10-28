import React from "react";
import { Slider } from "@app/shared/components/slider";
import { Highlight, Content } from "@app/pages/surveyStyles";
import { GPT3Argument } from "@app/@types/survey";

interface Props {
  counterArgument: string;
  updateData: (value: number | readonly number[], type: string) => void;
  argumentData: GPT3Argument;
}

const CounterArguments = ({
  counterArgument,
  updateData,
  argumentData,
}: Props) => {
  return (
    <div>
      <Content>
        <Highlight>Counterargument:</Highlight> {counterArgument}
      </Content>

      <Slider
        header={
          "Clarity: is the counterargument reader-friendly? Does it express ideas clearly?"
        }
        min={1}
        max={5}
        value={argumentData["clarity"]}
        beforeChange={(value: number | readonly number[], i: number) => {
          updateData(value, "clarity");
        }}
        onChange={(value: number | readonly number[], i: number) => {
          updateData(value, "clarity");
        }}
        headers={[
          "The counterargument is confusing and is difficult for readers to understand",
          "",
          "",
          "",
          "The counterargument expresses its ideas clearly and is reader-friendly.",
        ]}
      />
      <Slider
        header={
          "Coherence: The definition of coherence is something logical or consistent and something that makes sense as a whole. An example of coherence is an argument that has no inconsistencies."
        }
        min={1}
        max={5}
        value={argumentData["coherence"]}
        beforeChange={(value: number | readonly number[], i: number) => {
          updateData(value, "coherence");
        }}
        onChange={(value: number | readonly number[], i: number) => {
          updateData(value, "coherence");
        }}
        headers={[
          "The counterargument's logic does not make sense, or has inconsistencies within itself.",
          "",
          "",
          "",
          "The counterargument has a perfect logic flow and is self-consistent.",
        ]}
      />
      <Slider
        header={
          "Novelty: if new perspectives are being brought up by the counterargument that the original statement failed to consider, and whether the counterargument points out the logical fallacy of the original argument"
        }
        min={0}
        max={5}
        value={argumentData["novelty"]}
        beforeChange={(value: number | readonly number[], i: number) => {
          updateData(value, "novelty");
        }}
        onChange={(value: number | readonly number[], i: number) => {
          updateData(value, "novelty");
        }}
        headers={[
          "The counterargument did not introduce any new perspective.",
          "Almost everyone can come up with this counterargument.",
          "",
          "",
          "",
          "Almost no one can come up with this counterargument.",
        ]}
      />
      <Slider
        header={
          "Relevance to the main argument: if the counterargument is closely associated with the original argument."
        }
        min={1}
        max={5}
        value={argumentData["relevance"]}
        beforeChange={(value: number | readonly number[], i: number) => {
          updateData(value, "relevance");
        }}
        onChange={(value: number | readonly number[], i: number) => {
          updateData(value, "relevance");
        }}
        headers={[
          "the counterargument is not related to the original argument.",
          "",
          "The counterargument only attacks a minor or non-important point.",
          "",
          "the counterargument is closely associated with the original context and hypothesis.",
        ]}
      />
    </div>
  );
};

export default CounterArguments;
