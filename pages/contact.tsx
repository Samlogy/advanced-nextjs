import {
  Box,
  Button,
  Checkbox,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement,
  Radio,
  RadioGroup,
  Stack,
  useColorModeValue,
} from '@chakra-ui/react';
import { yupResolver } from '@hookform/resolvers/yup';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { AiFillCloseCircle } from 'react-icons/ai';
import * as yup from 'yup';

const multiStepFormSchema: any = {
  1: yup.object().shape({
    fullName: yup.string().required('fullName'),
    email: yup
      .string()
      .email('Enter a valid Email Address')
      .required('Email Address required'),
  }),
  2: yup.object().shape({
    address: yup.string().required('address'),
    isShippingAddress: yup.boolean().required('shipping address'),
  }),
  3: yup.object().shape({
    paymentMethod: yup.string().required('payment method'),
  }),
};

const NBR_STEPS = 3;
interface IStepForm {
  errors: any;
  register: any;
}
interface IInputField {
  errors?: any;
  register?: any;
  name: string;
  label?: string;
  placeholder?: string;
  type?: string;
  iconLeft?: any;
  iconRight?: any;
  [restProps: string]: any;
}
export default function Contact() {
  const [step, setStep] = useState<number>(1);

  const {
    register,
    watch,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({
    resolver: yupResolver(multiStepFormSchema[step]),
    mode: 'all',
  });
  const stepTitles: any = {
    1: {
      title: 'billing address',
      icon: <AiFillCloseCircle size={28} />,
    },
    2: { title: 'shipping method', icon: <AiFillCloseCircle size={28} /> },
    3: {
      title: 'payment',
      icon: <AiFillCloseCircle size={28} />,
    },
  };

  const stepForm: any = {
    1: <Step1 errors={errors} register={register} />,
    2: <Step2 errors={errors} register={register} />,
    3: <Step3 errors={errors} register={register} />,
  };

  const onSubmit = (data: any) => {
    //e.preventDefault();
    if (!cantNext) return;
    console.log('form submitted !');
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
  const cantNext = step === NBR_STEPS || !isValid;

  console.log(isValid);
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
            <Flex
              flexDir="column"
              justify="center"
              align="center"
              textTransform="capitalize"
            >
              {`${step} / ${NBR_STEPS}`}
              {stepTitles[step].title}
            </Flex>
            <Button onClick={onNextStep} disabled={cantNext}>
              Next
            </Button>
          </Flex>

          {stepForm[step]}

          {cantNext && isValid && (
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
      <code> {JSON.stringify(watch(), null, 2)} </code>
    </div>
  );
}

const Step1 = ({ errors, register }: IStepForm) => {
  return (
    <Flex flexDir="column" align="flex-start">
      <InputField
        name="fullName"
        label="Full Name"
        register={register}
        errors={errors}
      />

      <InputField
        name="email"
        label="Email"
        register={register}
        errors={errors}
      />
    </Flex>
  );
};

const Step2 = ({ errors, register }: IStepForm) => {
  return (
    <Flex flexDir="column" align="flex-start">
      <InputField
        name="address"
        label="Address"
        register={register}
        errors={errors}
      />
      <Checkbox
        colorScheme="green"
        //  name={"isShippingAddress"}
        isInvalid={errors['isShippingAddress'] ? true : false}
        {...register('isShippingAddress')}
      >
        set it same as shipping address
      </Checkbox>
    </Flex>
  );
};

const Step3 = ({ errors, register }: IStepForm) => {
  return (
    <Flex flexDir="column" align="flex-start">
      <RadioGroup colorScheme="green" name={'paymentMethod'}>
        <Stack spacing={5} direction="row">
          <Radio
            value="paypal"
            isInvalid={errors['paymentMethod'] ? true : false}
            {...register('paymentMethod')}
          >
            paypal
          </Radio>
          <Radio
            value="paysera"
            isInvalid={errors['paymentMethod'] ? true : false}
            {...register('paymentMethod')}
          >
            paysera
          </Radio>
        </Stack>
      </RadioGroup>
    </Flex>
  );
};

function InputField({
  errors,
  register,
  name,
  label,
  placeholder,
  type = 'text',
  iconLeft,
  iconRight,
  ...restProps
}: IInputField) {
  const width = restProps.w ? restProps.w : '20rem';
  const inputColor = useColorModeValue('gray_9', 'gray_3');
  return (
    <FormControl id={name} mb=".5rem" w={width}>
      {label && <FormLabel fontWeight="600"> {label} </FormLabel>}
      <InputGroup>
        {iconLeft && <InputLeftElement> {iconLeft} </InputLeftElement>}
        {register ? (
          <Input
            type={type}
            placeholder={placeholder}
            _placeholder={{ color: 'gray_4' }}
            isInvalid={errors[name] && register ? true : false}
            focusBorderColor={errors[name] && register ? 'error' : 'accent_5'}
            borderRadius="5px"
            bg={inputColor}
            {...register(name)}
            {...restProps}
          />
        ) : (
          <Input
            type={type}
            name={name}
            placeholder={placeholder}
            _placeholder={{ color: 'gray_4' }}
            focusBorderColor="accent_5"
            borderRadius="5px"
            bg={inputColor}
            {...restProps}
          />
        )}
        {iconRight && <InputRightElement> {iconRight} </InputRightElement>}
      </InputGroup>

      {register && (
        <Box as="span" color="red.500" fontSize="12px">
          {errors[name]?.message}
        </Box>
      )}
    </FormControl>
  );
}
