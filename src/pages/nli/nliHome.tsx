import React, { useState } from "react";
import { Button } from "@app/shared/components/index";
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
import { useLocation } from "react-router";
import { Link } from "react-router-dom";
import { colors } from "@app/styles/styles";
import { BsFillCaretLeftFill, BsFillCaretRightFill } from "react-icons/bs";
import Instructions from "@app/pages/instructions/instructions";

const NliHome = () => {
  const { search } = useLocation();
  const groupColors = ["#C67838", "#7C9647"];
  const [index, setIndex] = useState(0);
  const [disabled, setDisabled] = useState(true);
  const pages = [
    <>
      <Content>
        We are researchers from UC Berkeley working on the deep learning model’s
        generation of debate, and we are looking for data points that are worth
        debating.
      </Content>
      <Content>
        You will see text formatted as a piece of context and a piece of
        hypothesis:
      </Content>
      <ContentContainer
        style={{
          border: `1px solid ${colors.PRIMARY}`,
          borderRadius: "5px",
          padding: "2em",
          boxSizing: "border-box",
          position: "relative",
        }}
      >
        <Content>
          <Highlight>Context:</Highlight> Number 13 kicks a soccer ball towards
          the goal during children's soccer game.
        </Content>
        <Content>
          <Highlight>Hypothesis:</Highlight> A player passing the ball in a
          soccer game.
        </Content>
        <Content>
          <Highlight>Label:</Highlight> False
        </Content>
      </ContentContainer>
      <Content>
        The label describes most people’s opinion on the relationship between
        the context and the Hypothesis. In this example, most people think that
        the Hypothesis is <Highlight>False</Highlight> based on the context. We
        want to know whether you can argue against the common opinion, that is,
        whether you can argue that the Hypothesis is{" "}
        <Highlight>not necessarily False</Highlight> under the context. Note
        that we are aware that people might have different perceptions on
        theirselves/other people, so please feel free to make choice based on
        your own judgement.
      </Content>
    </>,
    <Instructions />,
    <>
      <Content>
        <Highlight>Example 1:</Highlight>
      </Content>
      <Content>
        <Highlight>Context:</Highlight> A 1994 Roper Poll concluded that the
        NewsHour is perceived by the public as the most credible newscast in the
        country.
      </Content>
      <Content>
        <Highlight>Hypothesis:</Highlight> A 1984 Poll concluded NewsHour is
        seen as the most credible newscast by the public.
      </Content>
      <Content>
        <Highlight>Label:</Highlight> True
      </Content>
      <Content>
        <Highlight>
          Classification: A-1 (I can come up with a counterargument and I know
          almost everyone can come up with my counterargument.)
        </Highlight>
      </Content>
      <Content>
        <Highlight>Explanation:</Highlight> The label here is true, which means
        that most people think the Hypothesis is true from the context. So we
        want to argue that the Hypothesis can be false in some circumstances.
        Potential arguments can be that NewsHour is not seen as the most
        credible newscast in the world (as suggested by the Hypothesis), but
        instead the context actually says NewsHour is seen as the most credible
        newscast in the country. This counterargument requires no specific
        knowledge, and the flaw of the Hypothesis is not difficult to detect. So
        the data point is classified as{" "}
        <Highlight>
          A-A (I can come up with a counterargument and I know almost everyone
          can come up with my counterargument as well).
        </Highlight>
      </Content>
      <Divider />
      <Content>
        <Highlight>Example 2:</Highlight>
      </Content>
      <Content>
        <Highlight>Context:</Highlight> Number 13 kicks a soccer ball towards
        the goal during children's soccer game.
      </Content>
      <Content>
        <Highlight>Hypothesis:</Highlight> A player passing the ball in a soccer
        game.
      </Content>
      <Content>
        <Highlight>Label:</Highlight> False
      </Content>
      <Content>
        <Highlight>
          Classification: A-4 (I can come up with a counterargument but I think
          probably most people cannot)
        </Highlight>
      </Content>
      <Content>
        <Highlight>Explanation:</Highlight> The label is False. So we want to
        argue that how the Hypothesis is True based on the context. Possible
        arguments can be that Number 13 is in fact passing the ball to another
        player near the goal. The context does not exclude this possibility, and
        thus the Hypothesis can be true under this context. It can be imagined
        that most people will consider “kicking a soccer ball towards the goal”
        as equivalent to “shooting for goal”. So if you do come up with the
        argument above, it should appear to you as high novelty.
      </Content>
      <Divider />
      <Content>
        <Highlight>Example 3:</Highlight>
      </Content>
      <Content>
        <Highlight>Context:</Highlight> A man running a marathon talks to his
        friend.
      </Content>
      <Content>
        <Highlight>Hypothesis:</Highlight> "There is a man running."
      </Content>
      <Content>
        <Highlight>Label:</Highlight> True
      </Content>
      <Content>
        <Highlight>
          Classification: A-4 (I can come up with a counterargument but I think
          probably most people cannot)
        </Highlight>
      </Content>
      <Content>
        <Highlight>Explanation:</Highlight> Here is a sample counterargument.
        The "run" in the context could simply mean that the man is
        "participating" in the marathon, not necessarily actually "running". So
        the Hypothesis is not necessarily true.
        <br />
        <br />
        We classify this data point as{" "}
        <Highlight>
          A-4 (I can come up with a counterargument but I think probably most
          people cannot)
        </Highlight>{" "}
        since only a few people would realize the possibility of different
        meanings for ‘running’. And we encourage you to try to come up with
        interesting counter-arguments like this.
      </Content>
      <Divider />
      <Content>
        <Highlight>Example 4:</Highlight>
      </Content>
      <Content>
        <Highlight>Context:</Highlight> Number 13 kicks a soccer ball towards
        the goal during children's soccer game.
      </Content>
      <Content>
        <Highlight>Hypothesis:</Highlight> A player passing the ball in a soccer
        game.
      </Content>
      <Content>
        <Highlight>Label:</Highlight> True
      </Content>
      <Content>
        <Highlight>
          Classification: B (I'm not sure whether I can come up with a
          counter-argument but someone else can probably come up with a good
          counter-argument)
        </Highlight>
      </Content>
      <Content>
        <Highlight>Explanation:</Highlight> The same data point can be
        classified as C if you can’t come up with a well-structured
        counterargument, but you are aware that kicking the ball towards the
        goal might be, in some circumstances, equivalent to passing the ball. So
        you think someone might be able to come up with a valid counterargument.
        <br />
        <br />
        This is a known unknown. It is a counterargument whose existence you are
        aware of but does not possess. And we classify all known unknowns as{" "}
        <Highlight>
          B: (I'm not sure whether I can come up with a counter-argument but
          someone else can probably come up with a good counter-argument).
        </Highlight>
      </Content>
      <Divider />
      <Content>
        <Highlight>Example 5:</Highlight>
      </Content>
      <Content>
        <Highlight>Context:</Highlight> There is an apple on the table.
      </Content>
      <Content>
        <Highlight>Hypothesis:</Highlight> There is an apple.
      </Content>
      <Content>
        <Highlight>Label:</Highlight> True
      </Content>
      <Content>
        <Highlight>
          Classification: C. I don't think there is a plausible argument, and I
          don’t think anyone else can come up with a good counterargument.
        </Highlight>
      </Content>
      <Content>
        <Highlight>Explanation:</Highlight> There is no possible counterargument
        since the Hypothesis can be strictly deducted from context.
      </Content>
    </>,
  ];
  const updateIndex = (adder: number) => {
    if (
      (adder > 0 && index + adder < pages.length) ||
      (adder < 0 && index + adder >= 0)
    ) {
      if (index + adder === pages.length - 1) {
        setDisabled(false);
      }
      window.scrollTo(0, 0);

      setIndex(index + adder);
    }
  };
  return (
    <Container>
      <ContainerInner>
        {pages[index]}
        <Arrows style={{ marginBottom: "1em" }}>
          <Arrow onClick={() => updateIndex(-1)}>
            <BsFillCaretLeftFill />
          </Arrow>
          Page {index + 1} of {pages.length}
          <Arrow onClick={() => updateIndex(1)}>
            <BsFillCaretRightFill />
          </Arrow>
        </Arrows>
        {!disabled && (
          <Link to={`/survey${search}`}>
            <Button
              // onClick={() => (window.location.href = "/survey")}
              padding="15px 20px"
              borderRadius="5px"
              backgroundColor="#004c7d"
              color="#eeeeee"
              style={{ width: "100%" }}
            >
              Start Survey
            </Button>
          </Link>
        )}
      </ContainerInner>
    </Container>
  );
};

export default NliHome;
