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

interface ITodo {
  id: number;
  body: string;
  createdAt: Date;
}
const Main: React.FC = () => {
  const [newTodo, setNewTodo] = useState<string>("");
  const { alerts, removeAlert, notifie } = useAlert();
  const [todoList, setTodoList] = useState<ITodo[]>([]);

  const removeAll = () => {
    setTodoList([]);
    notifie("Task", `Removed All Tasks.`, "success");
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!newTodo) return notifie("Form", "Should Not Be Empty.", "error");

    if (todoList.find((item) => item.body === newTodo))
      return notifie("Task", `Task \"${newTodo}\" already exists`, "error");
    setTodoList((prev) => [
      ...prev,
      { id: new Date().getTime(), body: newTodo, createdAt: new Date() },
    ]);
    notifie("Task", `Added \"${newTodo}\".`, "success");
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
              autoFocus
            />
            <IconButton
              aria-label="add something to do"
              type="submit"
              p=".3rem"
              icon={<PlusIcon />}
            />
          </HStack>
        </form>
        {todoList
          .slice(0)
          .reverse()
          .map((item) => (
            <Box
              key={item.id}
              as={motion.div}
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0 }}
              layout
            >
              <Flex justify="space-between" align="center" p=".5rem">
                <Text>{item.body}</Text>
                <Text
                  fontSize="xs"
                  color="gray.500"
                  ml="auto"
                  mr=".5rem"
                  alignSelf="end"
                >
                  {item.createdAt.toLocaleTimeString()}
                </Text>
                <CloseButton onClick={() => handleRemove(item.id)} />
              </Flex>
              <Divider />
            </Box>
          ))}
      </Flex>
      <Stack pos="absolute" left="1" top="1">
        {alerts.map((item, i) => (
          <Alert key={i} w="xl" status={item.status}>
            <AlertIcon />
            <AlertTitle>{item.title}</AlertTitle>
            <AlertDescription>{item.description}</AlertDescription>
            <CloseButton ml="auto" onClick={() => removeAlert(item.id)} />
          </Alert>
        ))}
      </Stack>
    </Container>
  );
};

export default Main;
