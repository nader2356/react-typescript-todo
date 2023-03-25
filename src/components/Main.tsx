import React, { useState } from "react";

import {
  Flex,
  Box,
  Container,
  Divider,
  Stack,
  Input,
  Text,
  IconButton,
  HStack,
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
  CloseButton,
  Button,
} from "@chakra-ui/react";

import { useAlert } from "../hooks/useAlert";

import { PlusIcon } from "@heroicons/react/24/outline";


const Main: React.FC = () => {
  const [todoList, setTodoList] = useState<string[]>([]);
  const [newTodo, setNewTodo] = useState<string>("");

  const {
    state: { isVisible, title, description, status },
    notifie,
  } = useAlert();

  const removeAll = () => {
    setTodoList([]);
    notifie("Task", `Removed All Tasks.`, "success");
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!newTodo) return notifie("Form", "Should Not Be Empty.", "error");

    setTodoList((prev) => [...prev, newTodo]);
    notifie("Task", `Added ${newTodo}.`, "success");
    setNewTodo("");
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewTodo(e.target.value);
  };

  const handleRemove = (index: number) => {
    setTodoList((prev) => prev.filter((_, i) => i !== index));
    notifie("Task", `Removed ${todoList[index]}.`, "success");
  };

  return (
    <Container minH="100vh" textAlign="center" paddingTop="10%">
      <Text fontSize="5xl" fontWeight="bold">
        Todo App
      </Text>
      <Flex minW="10rem" p="1rem" direction="column">
        <form onSubmit={handleSubmit}>
          <HStack>
            <Input
              variant="filled"
              placeholder="Enter your task"
              onChange={handleChange}
              value={newTodo}
            />
            <IconButton
              aria-label="add something to do"
              type="submit"
              p=".3rem"
              icon={<PlusIcon />}
            />
          </HStack>
        </form>
        {todoList.length > 0 && (
          <Stack direction="column" spacing="1rem" paddingBlock="1rem">
               {todoList.map((item, i) => (
              <Box key={i}>
     
                <Flex justify="space-between" align="center" p=".5rem">
                  <Text>{item}</Text>
                  <HStack>
                  <CloseButton onClick={() => handleRemove(i)} />
                  </HStack>
                </Flex>
                <Divider />
              </Box>
            ))}
             <Button
              bg="red.600"
              color="white"
              _hover={{ background: "red.700" }}
              onClick={removeAll}
            >
              delete all
            </Button>
          </Stack>
        )}
      </Flex>
      {isVisible && (
        <Alert
          position="absolute"
          variant="left-accent"
          top="1"
          left="1"
          w="xl"
          status={status}
        >
          <AlertIcon />
          <AlertTitle>{title}</AlertTitle>
          <AlertDescription>{description}</AlertDescription>
        </Alert>
      )}
    </Container>
  );
};

export default Main;