import React, { useState } from "react";
import { Box, Button, Flex, Heading, Input, Text } from "@chakra-ui/react";

const NBR_STEPS = 3;

function Contact() {
  const [step, setStep] = useState<number>(1);

  const stepTitles: any = {
    1: {
      title: "billing address",
      icon: "",
    },
    2: { title: "shipping method", icon: "" },
    3: {
      title: "payment",
      icon: "",
    },
  };

  const stepForm: any = {
    1: <Step1 />,
    2: <Step2 />,
    3: <Step3 />,
  };

  const onSubmit = (e: any) => {
    e.preventDefault();
    if (!cantNext) return;
    console.log("form submitted !");
  };
  const onNextStep = () => {
    if (step < NBR_STEPS) {
      setStep((prev) => prev + 1);
      return;
    } else if (cantNext) {
      // onSubmit();
      return;
    }
  };
  const onPreviousStep = () => {
    if (step === 1) {
      return;
    } else {
      setStep((prev) => prev - 1);
    }
  };
  const onHandleChange = (e: any) => {
    const target = e.target;
    let value = target.type == "checkbox" ? target.checked : target.value;
    console.log(value);
  };

  const cantPrevious = step === 1;
  const cantNext = step === NBR_STEPS;

  // get data use refs --> react hook form
  // data validation --> yup

  return (
    <div>
      <Heading as="h2" textAlign="center" mb="1em">
        Multi Step Form
      </Heading>
      <form onSubmit={onSubmit}>
        <Flex
          flexDir="column"
          justify="center"
          align="center"
          w="50%"
          m="auto"
          p="2em"
          border="1px solid"
          borderColor="gray.500"
          borderRadius="10px"
        >
          <Flex justify="space-between" align="center" mb="1em" w="100%">
            <Button onClick={onPreviousStep} disabled={cantPrevious}>
              Prev
            </Button>
            <Box as="span" textTransform="capitalize">
              {step}
              {stepTitles[step].icon}
              {stepTitles[step].title}
            </Box>
            <Button onClick={onNextStep} disabled={cantNext}>
              Next
            </Button>
          </Flex>

          {stepForm[step]}

          {cantNext && (
            <Button
              type="submit"
              ml="auto"
              disabled={cantNext}
              onClick={() => onSubmit}
            >
              Submit
            </Button>
          )}
        </Flex>
      </form>
    </div>
  );
}

export default Contact;

const Step1 = () => {
  return (
    <>
      <Input name="fullName" placeholder="fullName" mb="1em" />
      <Input name="email" placeholder="email" mb="1em" />
    </>
  );
};

const Step2 = () => {
  return (
    <>
      <Input name="address" placeholder="address" mb="1em" />
      <Input name="shipping" placeholder="shipping" mb="1em" />
    </>
  );
};

const Step3 = () => {
  return (
    <>
      <Input name="username" placeholder="fullName" mb="1em" />
    </>
  );
};
