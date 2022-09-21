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
} from "./styles";
import { useLocation } from "react-router";
import { Link } from "react-router-dom";
import { colors } from "@app/styles/styles";
import { BsFillCaretLeftFill, BsFillCaretRightFill } from "react-icons/bs";

const Home = () => {
  const { search } = useLocation();
  const groupColors = ["#C67838", "#7C9647"];
  const [index, setIndex] = useState(0);
  const [disabled, setDisabled] = useState(true);
  const pages = [
    <>
      {" "}
      <Content>
        Thank you for participating in this survey! We’re going to show you two
        groups of text snippets (e.g., sentences or paragraphs, one per bullet
        point), and we want you to describe their differences. For example:
      </Content>
      <GroupContainer
        style={{
          border: `1px solid ${colors.PRIMARY}`,
          borderRadius: "5px",
          padding: "2em",
          boxSizing: "border-box",
          position: "relative",
        }}
      >
        <p
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            marginLeft: "1em",
          }}
        >
          This is what you will see
        </p>
        <ContentContainer>
          <h3>Group A</h3>
          <NumberedList bold color={groupColors[0]}>
            <li>
              Congratulations! You’ve won a $1000 Amazon gift card! Go to
              http://nlp.cs.berkeley.edu/index.shtml to claim your rewards.
            </li>
            <li>
              You’ve received a free coupon to Amazon Prime! Redeem your code at
              https://bair.berkeley.edu.
            </li>
            <li>
              Amazon is offering 50% off of all household products today! Go to
              http://ai.berkeley.edu/home.html to learn more!
            </li>
          </NumberedList>
        </ContentContainer>
        <ContentContainer>
          <h3>Group B</h3>
          <NumberedList bold color={groupColors[1]}>
            <li>
              See attached email for trading data spreadsheets. Let’s circle
              back next week after you’ve reviews the documents.
            </li>
            <li>
              Hi there! My name is John Doe and I’m looking for a machine
              learning summer research opportunity!
            </li>
            <li>
              How does next week sound? I’m fairly busy this week with finals
              and club meetings.
            </li>
          </NumberedList>
        </ContentContainer>
      </GroupContainer>
      <Content>
        Snippets from{" "}
        <span style={{ color: groupColors[0], fontWeight: "bold" }}>
          Group A
        </span>{" "}
        <Highlight3>are spam emails</Highlight3> and those from{" "}
        <span style={{ color: groupColors[1], fontWeight: "bold" }}>
          Group B
        </span>{" "}
        <Highlight3>are ham (non-spam) emails</Highlight3>.
      </Content>
      <Content>
        For example, you will be asked to construct hypotheses of the form:
        "Compared to sentences from Group B, each sentence from Group A{" "}
        <Highlight2>[fill in your response here]</Highlight2>""
      </Content>
      <Content>Some example responses that you can give:</Content>
      <List
        style={{
          border: `1px solid ${colors.PRIMARY}`,
          borderRadius: "5px",
          padding: "2em",
          paddingTop: "3em",
          boxSizing: "border-box",
          position: "relative",
        }}
      >
        <p
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            marginLeft: "1em",
          }}
        >
          This is what you will write
        </p>
        <li>
          <Highlight2>offers discounts and sales deals</Highlight2>
        </li>
        <li>
          <Highlight2>mentions Amazon or Amazon Prime</Highlight2>
        </li>
        <li>
          <Highlight2>contains a URL</Highlight2>
        </li>
        <li>
          <Highlight2>uses an explanation point</Highlight2>
        </li>
      </List>
    </>,
    <>
      {" "}
      <Content>
        Your responses need to fulfill the requirements below. We color good
        responses in <Highlight2>blue</Highlight2> and bad responses in{" "}
        <Highlight1>red</Highlight1>.
      </Content>
      <NumberedList>
        <li>
          <Highlight>
            The hypothesis needs to be meaningfully different from the
            description (in purple)
          </Highlight>
          . For example, a response such as "each snippet from Group A{" "}
          <Highlight1>"is a spam email"</Highlight1>"" may be true, but doesn’t
          tell us what the difference is. When we want you to avoid stating the
          obvious, we will provide relevant background information.
        </li>
        <li>
          <Highlight>Don’t be too specific:</Highlight> for example,{" "}
          <Highlight1>
            “contains ‘congratulations!’ or ‘Redeem your code’ or contains
            ‘offering 50% off’”
          </Highlight1>{" "}
          (notice that this is a single long description connected by multiple
          or’s, and it is bad). Individually,{" "}
          <Highlight2>"contains congratulations!"</Highlight2> can be a good
          description.
        </li>
        <li>
          <Highlight>
            The hypothesis needs to be true on most sentences from group A and
            false on most sentences from group B.
          </Highlight>{" "}
          For example, <Highlight2>“contains a URL”</Highlight2>
          is a good response since every sentence from group A{" "}
          <Highlight2>“contains a URL”</Highlight2>, and it’s not true for any
          sentence in group B. On the other hand,{" "}
          <Highlight1>“contains two sentences”</Highlight1> is a bad response,
          because each snippet group B also{" "}
          <Highlight1>“contains two sentences”</Highlight1>.
        </li>
        <li>
          <Highlight>The hypothesis needs to be unambiguous</Highlight>. Here
          are some specific guidelines for writing unambiguous hypotheses:
          <List>
            <li>
              <Highlight>Do not</Highlight> draw on expert knowledge (e.g.{" "}
              <Highlight1>"contains HTML tags"</Highlight1>) or cultural
              references (e.g. <Highlight1>"from the Enron scandal"</Highlight1>
              ) . Where knowledge of details is required, please provide the
              information as relevant.
            </li>
            <li>
              <Highlight>Do not</Highlight> use analogies (e.g.{" "}
              <Highlight1>"reads like garbage"</Highlight1>), favoring direct
              responses instead (e.g.{" "}
              <Highlight2>"contains grammatical errors</Highlight2>)
            </li>
            <li>
              <Highlight>Do</Highlight> be as specific as possible without
              compromising the plausibility of the hypothesis (e.g. instead of{" "}
              <Highlight1>"has different sentence length,"</Highlight1> prefer{" "}
              <Highlight2>"tends to be much longer in length"</Highlight2>)
            </li>
            <li>
              <Highlight>Do not</Highlight> make judgements that are matter of
              taste, which depend on your opinion (e.g.{" "}
              <Highlight1>
                “is a good political take”, “talks about cool topics”
              </Highlight1>
              )
            </li>
            <li>
              As a rule of thumb, ask yourself whether someone else, with
              different knowledge and perspectives, would agree with your
              statement.
            </li>
          </List>
        </li>
        <li>
          Grammatical. Make sure that hypothesis adheres to correct formatting.
          This survey supports two kinds of hypotheses:
          <NumberedList>
            <li>
              <Highlight>Comparison:</Highlight> Is it true that compared to
              sentence B, sentence A [your hypothesis] (e.g.,{" "}
              <Highlight2>is longer.</Highlight2> )
            </li>
            <li>
              <Highlight>Individual:</Highlight> Is it true that this sentence
              [your hypothesis] (e.g.,{" "}
              <Highlight2>is sports-related.</Highlight2>)
            </li>
          </NumberedList>
        </li>
      </NumberedList>
      <Content>
        A hypothesis that is correctly formatted should also fit the verifier
        prompt template, which we will show in the next section.
      </Content>
      <Content>
        3, 4, and 5 might seem complicated, but here is{" "}
        <Highlight>
          a general rule of thumb: could someone else agree with your response
          on individual snippets
        </Highlight>{" "}
        We will later ask someone else to verify your response on each snippet.
        For example, here’s what the other person (verifier) will see:
      </Content>
      <Divider />
      <Content>
        Is it true that this snippet (which is from{" "}
        <span style={{ color: groupColors[0], fontWeight: "bold" }}>
          group 1
        </span>
        ) <Highlight2>“contains a URL”?</Highlight2>
      </Content>
      <Content>
        <span style={{ color: groupColors[0], fontWeight: "bold" }}>
          Congratulations! You’ve won a $1000 Amazon gift card! Go to
          http://nlp.cs.berkeley.edu/index.shtml to claim your rewards.
        </span>
      </Content>
      <Content>Response: Yes.</Content>
      <Divider />
      <Content>
        Is it true that this snippet (which is from{" "}
        <span style={{ color: groupColors[1], fontWeight: "bold" }}>
          group 2
        </span>
        ) <Highlight2>“contains a URL”?</Highlight2>
      </Content>
      <Content>
        <span style={{ color: groupColors[1], fontWeight: "bold" }}>
          How does next week sound? I’m fairly busy this week with finals and
          club meetings.
        </span>
      </Content>
      <Content>Response: No.</Content>
      <Divider />
      <Content>
        If your response is incorrect, ambiguous, or ungrammatical, the verifier
        will be likely to disagree with your answer.
      </Content>
      <Content>
        In some cases, a description could fit your template but not the
        verifier template. For example, a response such the following may seem
        valid:
      </Content>
      <Content
        style={{
          border: `1px solid ${colors.PRIMARY}`,
          borderRadius: "5px",
          padding: "2em",
          boxSizing: "border-box",
          position: "relative",
        }}
      >
        <p
          style={{
            position: "absolute",
            bottom: 0,
            right: 0,
            marginRight: "1em",
          }}
        >
          Our template
        </p>
        Each sentence from Group A{" "}
        <Highlight1>contains more urls than sentences from group B</Highlight1>
      </Content>
      <Content>
        But, for the verifier, the following question can appear confusing:
      </Content>
      <Content
        style={{
          border: `1px solid ${colors.PRIMARY}`,
          borderRadius: "5px",
          padding: "2em",
          boxSizing: "border-box",
          position: "relative",
        }}
      >
        <p
          style={{
            position: "absolute",
            bottom: 0,
            right: 0,
            marginRight: "1em",
          }}
        >
          Verifier Template
        </p>
        Is it true that this snippet
        <Highlight1>
          "contains more urls than sentences from group B"
        </Highlight1>
        ?
      </Content>
      <Content>
        <Highlight1>This is undesirable!</Highlight1> Please make sure that your
        response can fit both our template and the verifier’s template.
      </Content>
    </>,
    <>
      <Content>
        With individual hypotheses, you will select all of the sentences across
        the 10 snippets that fit your hypothesis. Returning to an earlier
        example:
      </Content>
      <GroupContainer
        style={{
          border: `1px solid ${colors.PRIMARY}`,
          borderRadius: "5px",
          padding: "2em",
          boxSizing: "border-box",
          position: "relative",
        }}
      >
        <p
          style={{
            position: "absolute",
            bottom: 0,
            right: 0,
            marginRight: "1em",
          }}
        >
          This is what you will see
        </p>
        <ContentContainer>
          <h3>Group A</h3>
          <NumberedList bold color={groupColors[0]}>
            <li>
              Congratulations! You’ve won a $1000 Amazon gift card! Go to
              http://nlp.cs.berkeley.edu/index.shtml to claim your rewards.
            </li>
            <li>
              You’ve received a free coupon to Amazon Prime! Redeem your code at
              https://bair.berkeley.edu.
            </li>
            <li>
              Amazon is offering 50% off of all household products today! Go to
              http://ai.berkeley.edu/home.html to learn more!
            </li>
          </NumberedList>
        </ContentContainer>
        <ContentContainer>
          <h3>Group B</h3>
          <NumberedList bold color={groupColors[1]}>
            <li>
              See attached email for trading data spreadsheets. Let’s circle
              back next week after you’ve reviews the documents.
            </li>
            <li>
              Hi there! My name is John Doe and I’m looking for a machine
              learning summer research opportunity!
            </li>
            <li>
              How does next week sound? I’m fairly busy this week with finals
              and club meetings.
            </li>
          </NumberedList>
        </ContentContainer>
      </GroupContainer>
      <Content>
        Snippets from{" "}
        <span style={{ color: groupColors[0], fontWeight: "bold" }}>
          Group A
        </span>{" "}
        <Highlight3>are spam emails</Highlight3> and those from{" "}
        <span style={{ color: groupColors[1], fontWeight: "bold" }}>
          Group B
        </span>{" "}
        <Highlight3>are ham (non-spam) emails</Highlight3>.
      </Content>
      <Content>
        Compared to snippets from Group B, each snippet from Group A{" "}
        <Highlight2>__________</Highlight2>
      </Content>
      <Divider />
      <Content>
        Suppose your hypothesis was “
        <Highlight2>use an exclamation point.</Highlight2>” Then, you should
        select the checkboxes next to (A1, A2, A3, B2). Note that{" "}
        <Highlight>
          your response does not have to be correct for every single sentence of
          Group A, just more of them compared to group B .
        </Highlight>
      </Content>
    </>,
    <>
      <Content>
        With comparison hypotheses, you will be asked to construct a group of
        “top 3” and “bottom 3” out of the entire set of 10 snippets that fit
        your hypothesis without any discrimination between 1st, 2nd, and 3rd.
        Essentially, your “top 3” should all be more{" "}
        <Highlight2>[your hypothesis]</Highlight2>
        than your “bottom 3”. An example could be the following:
      </Content>
      <ContentContainer>
        <GroupContainer
          style={{
            border: `1px solid ${colors.PRIMARY}`,
            borderRadius: "5px",
            padding: "2em",
            boxSizing: "border-box",
            position: "relative",
          }}
        >
          <p
            style={{
              position: "absolute",
              bottom: 0,
              right: 0,
              marginRight: "1em",
            }}
          >
            This is what you will see
          </p>
          <ContentContainer>
            <h3>Group A</h3>
            <List bold color={groupColors[0]}>
              <li>
                This is a sentence that should be longer than a few sentences in
                Group B, if not all.
              </li>
              <li>
                This is another long sentence that matches the property of the
                first.
              </li>
              <li>
                This is a third sentence that matches the same property as the
                first and second.
              </li>
              <li>
                This is a fourth sentence that matches the properties of the
                first, second, and third sentences.{" "}
              </li>
              <li>NLP is cool! </li>
            </List>
          </ContentContainer>
          <ContentContainer>
            <h3>Group B</h3>
            <List bold color={groupColors[1]}>
              <li>This is a short sentence.</li>
              <li>Cats love mice.</li>
              <li>Dogs love playing.</li>
              <li>
                This is a slightly longer sentence that is actually longer than
                all the sentences in Group A for the sake of this example.
              </li>
              <li>I love to eat apples.</li>
            </List>
          </ContentContainer>
        </GroupContainer>
        <Content>
          In this case, an example hypothesis could be{" "}
          <Highlight2>
            “Compared to setnences from Group B, each sentence from group A is
            longer.”
          </Highlight2>{" "}
          <Highlight>
            Note that your response does not have to be correct for every single
            sentence of Group A, just more of them compared to group B.
          </Highlight>
        </Content>
        <Content>
          As a result, your “top 3” and “bottom 3” could be the sets (B4, A4,
          A1), (A5, B2, B3). Once again, your hypothesis does not have to hold
          for every single snippet; note that{" "}
          <Highlight>
            a sentence in group B is in the top 3, and a sentence in group A is
            in the bottom 3
          </Highlight>
          .
        </Content>
      </ContentContainer>
    </>,
    <>
      <Content>
        For comparison responses, a verifier will be comparing sentences
        selected from the two groups. For example, here is what the verifier
        will see:
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
        <p
          style={{
            position: "absolute",
            bottom: 0,
            right: 0,
            marginRight: "1em",
          }}
        >
          This is what the verifier will see
        </p>
        <Content>
          <span style={{ color: groupColors[0], fontWeight: "bold" }}>
            Snippet A:
          </span>
        </Content>
        <Content>
          <span style={{ color: groupColors[0], fontWeight: "bold" }}>
            This is a fourth sentence that matches the properties of the first,
            second, and third sentences.
          </span>
        </Content>
        <Content>
          <span style={{ color: groupColors[1], fontWeight: "bold" }}>
            Snippet B:
          </span>
        </Content>
        <Content>
          <span style={{ color: groupColors[1], fontWeight: "bold" }}>
            Dogs love playing.
          </span>
        </Content>
        <Content>
          Question: Is it true that compared to{" "}
          <span style={{ color: groupColors[1], fontWeight: "bold" }}>
            snippet B (group 2)
          </span>
          ,
          <span style={{ color: groupColors[0], fontWeight: "bold" }}>
            {" "}
            snippet A (group 1)
          </span>{" "}
          <Highlight2>“is longer”</Highlight2>?
        </Content>
      </ContentContainer>
      <Content>
        We will now go through a questionnaire that will test your understanding
        of these instructions.
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

export default Home;
