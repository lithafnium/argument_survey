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
const RedditHome = () => {
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
        You will see reddit posts formatted as a title, a piece of context, and
        a response.
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
          <Highlight>Title:</Highlight> I keep getting texts meant for “jeron”.
          How do I let jeron know he is telling people the incorrect number?
        </Content>
        <Content>
          <Highlight>Context:</Highlight> I keep getting texts from people who
          think I’m someone else. Each time I tell them it’s the wrong number
          but apparently jeron is a social butterfly. How do I prevent these?
        </Content>
        <Content>
          <Highlight>Response:</Highlight> Ask them jerons last name and find
          him on Facebook?
        </Content>
      </ContentContainer>
      <Content>
        We want to know whether you can argue against this response under the
        context, that is, whether you can argue that the response is{" "}
        <Highlight>not necessarily correct</Highlight>.
      </Content>
      <Content>
        We are aware that people might have different perceptions on
        theirselves/other people, so please feel free to rate based on your own
        judgemen
      </Content>
    </>,
    <Instructions />,
    <>
      <Content>
        <Highlight>Example 1:</Highlight>
      </Content>
      <Content>
        <Highlight>Title:</Highlight> So, I'm meeting my ex GF tomorrow.
      </Content>
      <Content>
        <Highlight>Context:</Highlight> After 1+ year of breaking up, and not
        talking to each other (except the 2 time drunken calls), I'm meeting my
        ex GF tomorrow for coffee. Truth be told, I kinda miss her. Any advice?
        (not to screw it up, I mean)
      </Content>
      <Content>
        <Highlight>Response:</Highlight> Just follow your heart when you are
        drunken.
      </Content>
      <Content>
        <Highlight>
          Classification: A-1: I can come up with a counterargument and I think
          almost everyone can come up with my counterargument
        </Highlight>
      </Content>
      <Content>
        <Highlight>Explanation:</Highlight> There are many ways we can argue
        against the advice provided by the above response, one example could be
        the response can lead people to make decisions impulsively and hurt both
        of them. So we classify this data point as{" "}
        <Highlight>
          I can come up with a counterargument and I think almost everyone can
          come up with my counterargument.
        </Highlight>
      </Content>
      <Divider />
      <Content>
        <Highlight>Example 3:</Highlight>
      </Content>
      <Content>
        <Highlight>Title:</Highlight> Im 15 and i dont go to school
      </Content>
      <Content>
        <Highlight>Context:</Highlight> Im 15 and i dont go to school i was
        taken out 2 years ago in the 8th grade and now i want to go back to
        school and i dont because i am overweight and really insecure of myself
        i am afraid that i will be bullied because im 2 grades behind and im
        overweight. Im terrified as to what my future has in store for me i dont
        want to be homeless. What should i do?
      </Content>
      <Content>
        <Highlight>Response:</Highlight> Go back to school, its a good place to
        learn and socialize. Everyone gets made fun of in school, that's part of
        life, it hurts, but its just not something that goes away. If you are
        concerned with your weight try your best to eat healthier and exercise.
        Take a PE class during your first semester/term back, your teachers will
        help you if you ask them. Be brave, its not easy, but sheltering
        yourself from the reality will only hurt you more when you are an adult.
        Best of luck!
      </Content>
      <Content>
        <Highlight>
          Classification: A-4: I can come up with a counterargument but I think
          probably most people cannot
        </Highlight>
      </Content>
      <Content>
        <Highlight>Explanation:</Highlight> we could argue that because it does
        not address the underlying reasons why the person is afraid to go back
        to school. It is possible that the person is afraid to go back to school
        because they have been bullied in the past and are afraid that it will
        happen again. The response does not address this issue, and simply tells
        the person to go back to school without addressing their fears. This
        could lead to the person feeling even more isolated and alone, and may
        make their situation worse.
        <br />
        <br />
        The valid guess about people who asked the question here (where he/she
        might be bullied in the past) can be hard to find out. Thus we classify
        this data point as{" "}
        <Highlight>
          A-4: I can come up with a counterargument but I think probably most
          people cannot.
        </Highlight>
      </Content>
      <Divider />
      <Content>
        <Highlight>Example 3:</Highlight>
      </Content>
      <Content>
        <Highlight>Title:</Highlight> Large houses. What's in them?
      </Content>
      <Content>
        <Highlight>Context:</Highlight> I know lots of people want to have big
        fancy houses. There are plenty of them. But I just have no earthly idea
        what people do with all that space?
        <br />
        <br />
        You have a bedroom, a bathroom, a kitchen, a dining room, a living room,
        a laundry room, maybe two more bedrooms and another bathroom if you have
        a family. And?? That's like 8 rooms that can all fit into a normal-sized
        one story house.
        <br />
        <br />
        What else is there in the rest of these houses? Two more dining rooms?
      </Content>
      <Content>
        <Highlight>Response:</Highlight> Space.
      </Content>
      <Content>
        <Highlight>Classification: C</Highlight>
      </Content>
      <Content>
        <Highlight>Explanation:</Highlight> It is hard for everyone to come up
        with how the response can be wrong.
      </Content>
      <Divider />
      <Content>
        <Highlight>Example 4:</Highlight>
      </Content>
      <Content>
        <Highlight>Title:</Highlight> Is there any good reason not to turn my
        microwave upside down (I'll take the glass turntable out first, thanks)?
      </Content>
      <Content>
        <Highlight>Context:</Highlight> I need to clean the "ceiling" of the
        microwave and I'd prefer to just flip it over and scrub it. I wanted to
        make sure there's not some decent but obscure reason for not flipping a
        microwave over.
        <br />
        <br />
        Any solid answers one way or the other?
      </Content>
      <Content>
        <Highlight>Response:</Highlight> I worked in electronics retail for 3
        years, I can tell you that there's a good chance your microwave was
        upside down for days or weeks at one point in its life.
      </Content>
      <Content>
        <Highlight>
          Classification: B: I'm not sure whether I can come up with a
          counter-argument but someone else can probably come up with a good
          counter-argument.
        </Highlight>
      </Content>
      <Content>
        <Highlight>Explanation:</Highlight> From the perspective of people who
        don't work in the industry, we cannot argue against others' experience.
        But some people in electronics retail might be able to argue against
        that. So we classify this data point as{" "}
        <Highlight>
          B: I'm not sure whether I can come up with a counter-argument but
          someone else can probably come up with a good counter-argument.
        </Highlight>
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
          <Link to={`/redditsurvey${search}`}>
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

export default RedditHome;
