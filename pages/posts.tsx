import {
  Box,
  Button, Flex, Heading, Input, Text
} from "@chakra-ui/react";
import React from "react";
import { useCallback, useDebugValue, useEffect, useRef, useState } from "react";

import ReactDOM from "react-dom";
import useDebounce from "../lib/hooks/useDebounce";
import useThrottle from "../lib/hooks/useThrottle";

export default function Posts() {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState([]);

  const loadUsers = useCallback(async () => {
    let res: any = await fetch("https://jsonplaceholder.typicode.com/users");
    res = await res.json();
    setUsers(res);
    setSearch(res);
  }, []);

  useEffect(() => {
    loadUsers();
  }, []);

  // HOC: (conditional rendering)
  const withLoading = (Component: any) => {
    return function EnhancedComponent({ isLoading, ...props }: any) {
      if (!isLoading) {
        return <Component {...props} />;
      }
      return <div>The component is loading</div>;
    };
  };

  // create a new component using HOC
  const HocLoading = withLoading(Component);

  const ref = useRef<any>(null)

  return (
    <div>
      {/* 
      <Filter users={users} setSearch={setSearch} />
      <Listing search={search} />
     */}

      <HocLoading isLoading={false} />
      <PortalsExample />
      <ForwardRefExample parentRef={ref} />
    </div>
  );
}

const Filter = ({ users, setSearch }: any) => {
  const handleSubmit = (e: any) => e.preventDefault();

  // no optimization
  const onHandleChange = (e: any) => {
    const target = e.target;
    let value = target.type == "checkbox" ? target.checked : target.value;
    if (!value) return setSearch(users);
    value.toLowerCase();

    const result = users?.filter(
      (user: any) =>
        user.name.toLowerCase().includes(value) ||
        user.email.toLowerCase().includes(value)
    );

    console.log(result);

    setSearch(result);
  };
  // timeout fct 500ms
  const debounceV1 = (e: any) => {
    setTimeout(() => {
      onHandleChange(e);
    }, 500);
  };

  // memoize + timeout fct 500ms
  const debounceV2 = useCallback(debounceV1, []);

  // callBack + timeout (500ms) + clear fct
  const debounceV3 = (func: any) => {
    let timer: any;
    return (...args: any) => {
      const context = this;
      if (timer) clearTimeout(timer);
      timer = setTimeout(() => {
        timer = null;
        func.apply(context, args);
      }, 650);
    };
  };
  const optimizedV3 = useCallback(debounceV3(onHandleChange), []);

  // use loadash --> import { debounce } from "lodash";

  const debounceV4 = useRef(debounceV1).current;
  // timeout + callback + ref
  const debounceV5 = useRef(useCallback(debounceV1, [])).current;
  // version + ref
  const debounceV6 = useRef(optimizedV3).current; //useDebounce(debounceV3(onHandleChange), 500)
  // same as V6 by with custom hook instead of fct
  const debounceV7 = useDebounce(onHandleChange);

  // useDebugValue
  useDebugValue("Filter cpt");
  return (
    <div>
      <Heading> Example Debouncing </Heading>
      <form onSubmit={handleSubmit}>
        <Input
          type="text"
          id="search"
          placeholder="Name or Email"
          onChange={debounceV7}
          autoFocus
          w="15em"
        />
      </form>
    </div>
  );
};

const Listing = ({ search }: any) => {
  const results = search?.map((user: any, idx: number) => (
    <Flex
      key={idx}
      flexDir="column"
      p="1em"
      boxShadow="md"
      w="15em"
      borderRadius="1em"
      m=".25em"
    >
      <Box as="span"> {user?.id} </Box>
      <Box as="span"> {user?.name} </Box>
      <Box as="span"> {user?.email} </Box>
    </Flex>
  ));

  const content = results?.length ? (
    results
  ) : (
    <article>
      <p>No Matching Users</p>
    </article>
  );

  return (
    <Flex flexWrap="wrap" justify="center" align="center">
      {content}
    </Flex>
  );
};

const Component = (props: any) => {
  const [count, setCount] = useState(0);

  const throttledInc = useThrottle(increment, 1000);
  const throttledDec = useThrottle(decrement, 1000);

  function increment() {
    setCount((prev) => prev + 1);
    console.log("inc");
  }
  function decrement() {
    setCount((prev) => {
      return prev === 0 ? prev : prev - 1;
    });
    console.log("dec");
  }

  return (
    <div>
      <h3> Component Loaded </h3>
      <Heading> Example Throttling </Heading>
      <Flex justify="center" align="center">
        <Button onClick={throttledInc}> +</Button>
        <Box as="span" mx="1em">
          {count}
        </Box>
        <Button onClick={throttledDec}>-</Button>
      </Flex>
    </div>
  );
};

const PortalsExample = () => {
  const [isOpen, setOpen] = useState({
    portals: false,
    noPortals: false,
  });

  function ModalCpt(onClose: () => void) {
    return (
      <Flex flexDir="column" boxShadow="md" w="fit-content" p="1em">
        <Button onClick={onClose} w="fit-content">
          Close
        </Button>
        <Text>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quibusdam, facere.</Text>
      </Flex>
    );
  }

  function togglePortals(action: boolean) {
    setOpen((prev) => {
      return {
        ...prev,
        portals: action,
      };
    });
  }
  function toggleModal(action: boolean) {
    setOpen((prev) => {
      return {
        ...prev,
        noPortals: action,
      };
    });
  }

  return (
    <div className="component">
      <Heading> Portals Example --> Modal </Heading>

      <Button onClick={() => toggleModal(true)}>Open Modal</Button>
      <Button onClick={() => togglePortals(true)}>Open Modal Portal</Button>

      {isOpen.portals &&
        ReactDOM.createPortal(
          ModalCpt( () => togglePortals(false)),
          document.body
        )}

      {isOpen.noPortals &&
        ModalCpt( () => toggleModal(false))}
    </div>
  );
};


const ForwardRefExample = React.forwardRef(({parentRef}: {parentRef:any}) => {
  console.log('parent ref: ',parentRef)
  return(
    <Flex flexDir="column">
      <Heading>
        Forward Reference Example
      </Heading>
      <Text> check console log</Text>
    </Flex>
  )
})

