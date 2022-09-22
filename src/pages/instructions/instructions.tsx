import React from "react";
import {
  Container,
  ContainerInner,
  Content,
  ContentContainer,
  List,
  NumberedList,
  Highlight,
  GroupContainer,
  Highlight1,
  Highlight2,
  Highlight3,
  Divider,
  Arrow,
  Arrows,
} from "@app/pages/instructionStyles";

const Instructions = () => {
  return (
    <>
      <Content>
        <Highlight>
          1. Based on your reasoning, please classify the data point into one of
          the following categories
        </Highlight>
      </Content>
      <NumberedList type="A">
        <li>I can come up with a counterargument</li>
        <li>
          I'm not sure whether I can come up with a counter-argument but someone
          else can probably come up with a good counter-argument.
        </li>
        <li>
          I don't think there is a plausible argument, and I don’t think anyone
          else can come up with a good counterargument.
        </li>
        <li>
          Either context or premise does not make sense, or the context and
          premise are not related to each other.
        </li>
      </NumberedList>
      <Content>
        <Highlight>
          2. If you have chosen A, we will ask a further question about the
          "novelty" level of your counterargument.
        </Highlight>
      </Content>
      <Content>
        Please rate the novelty of your counterargument from 1 to 5.
      </Content>
      <NumberedList>
        <li>Almost everyone can come up with my counterargument.</li>
        <li>Most people can come up with my counterargument.</li>
        <li>About half people can come up with my counterargument.</li>
        <li>A few people can come up with my counterargument.</li>
        <li>Almost no one can come up with my counterargument. </li>
      </NumberedList>
      <Content>
        <Highlight>
          3. If you have chosen A, please briefly write your counterargument.
        </Highlight>
      </Content>
    </>
  );
};

export default Instructions;
