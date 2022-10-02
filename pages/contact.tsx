import {
  Box,
  Button,
  Checkbox,
  Flex,
  Heading,
  Input,
  Radio,
  RadioGroup,
  Stack,
} from "@chakra-ui/react";
import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { AiFillCloseCircle } from "react-icons/ai";

const multiStepFormSchema = {
  step1: yup.object().shape({
    fullName: yup.string().required("fullName"),
    email: yup
      .string()
      .email("Enter a valid Email Address")
      .required("Email Address required"),
  }),
  step2: yup.object().shape({
    address: yup.string().required("address"),
    isShippingAddress: yup.boolean().required("shipping address"),
  }),
  step3: yup.object().shape({
    paymentMethod: yup.string().required("payment method"),
  }),
};

const isEmpty = (data: any) => {
  if (Object.entries(data).length === 0) return true;
  else false;
};

const NBR_STEPS = 3;

interface IStepForm {
  errors: any;
  register: any;
}
export default function Contact() {
  const [step, setStep] = useState<number>(1);
  const [triggers, setTriggers] = useState({
    step1: null,
    step2: null,
    step3: null,
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const stepTitles: any = {
    1: {
      title: "billing address",
      icon: <AiFillCloseCircle size={28} />,
    },
    2: { title: "shipping method", icon: <AiFillCloseCircle size={28} /> },
    3: {
      title: "payment",
      icon: <AiFillCloseCircle size={28} />,
    },
  };

  const stepForm: any = {
    1: <Step1 setTriggers={setTriggers} />,
    2: <Step2 setTriggers={setTriggers} />,
    3: <Step3 setTriggers={setTriggers} />,
  };

  const onSubmit = (data: any) => {
    //e.preventDefault();
    if (!cantNext) return;
    console.log("form submitted !");
    console.log(data);
  };
  const onNextStep = async () => {
    if (step < NBR_STEPS) {
      //const result = await trigger("fullName");
      //console.log(result);

      if (step === 1) {
      }

      setStep((prev) => prev + 1);
      return;
    } else if (cantNext) return;
  };
  const onPreviousStep = () => {
    if (step === 1) {
      return;
    } else {
      setStep((prev) => prev - 1);
    }
  };

  const cantPrevious = step === 1;
  const cantNext = step === NBR_STEPS;
  // data validation --> yup

  return (
    <div>
      <Heading as="h2" textAlign="center" mb="1em">
        Multi Step Form
      </Heading>
      <form onSubmit={handleSubmit(onSubmit)}>
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
            <Flex justify="center" align="center" textTransform="capitalize">
              {stepTitles[step].icon}
              {stepTitles[step].title}
            </Flex>
            <Button onClick={onNextStep} disabled={cantNext}>
              Next
            </Button>
          </Flex>

          {stepForm[step]}

          {cantNext && (
            <Button
              type="submit"
              ml="auto"
              disabled={!cantNext}
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

const Step1 = ({ setTriggers }: { setTriggers: any }) => {
  const {
    register,
    trigger,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(multiStepFormSchema.step1),
  });

  console.log("errors: ", errors);

  return (
    <Flex flexDir="column" align="flex-start">
      <Input
        //  name={"fullName"}
        placeholder="Full Name"
        isInvalid={errors["fullName"] ? true : false}
        {...register("fullName")}
      />

      <Input
        mb="1em"
        //  name={"email"}
        placeholder="Email"
        isInvalid={errors["email"] ? true : false}
        {...register("email")}
      />
    </Flex>
  );
};

const Step2 = ({ setTriggers }: { setTriggers: any }) => {
  const {
    register,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(multiStepFormSchema.step2),
  });
  return (
    <Flex flexDir="column" align="flex-start">
      <Input
        mb="1em"
        placeholder="Address"
        // name={"address"}
        isInvalid={errors["address"] ? true : false}
        {...register("address")}
      />
      <Checkbox
        colorScheme="green"
        //  name={"isShippingAddress"}
        isInvalid={errors["isShippingAddress"] ? true : false}
        {...register("isShippingAddress")}
      >
        set it same as shipping address
      </Checkbox>
    </Flex>
  );
};

const Step3 = ({ setTriggers }: { setTriggers: any }) => {
  const {
    register,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(multiStepFormSchema.step2),
  });
  return (
    <Flex flexDir="column" align="flex-start">
      <RadioGroup colorScheme="green" name={"paymentMethod"}>
        <Stack spacing={5} direction="row">
          <Radio
            value="paypal"
            isInvalid={errors["paymentMethod"] ? true : false}
            {...register("paymentMethod")}
          >
            paypal
          </Radio>
          <Radio
            value="paysera"
            isInvalid={errors["paymentMethod"] ? true : false}
            {...register("paymentMethod")}
          >
            paysera
          </Radio>
        </Stack>
      </RadioGroup>
    </Flex>
  );
};
