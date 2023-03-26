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
  CloseButton,
  Button,
} from "@chakra-ui/react";
import { AnimatePresence, motion } from "framer-motion";
import { EStatus, useAlert } from "../hooks/useAlert";

import { PlusIcon } from "@heroicons/react/24/outline";
import AlertItem from "./AlertItem";

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
    notifie("Task", "Removed All Tasks.", EStatus.success);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!newTodo) return notifie("Form", "Should Not Be Empty.", EStatus.error);

    if (todoList.find((item) => item.body === newTodo))
    return notifie("Task", `Task \"${newTodo}\" already exists`, EStatus.error);
    setTodoList((prev) => [
      ...prev,
      { id: new Date().getTime(), body: newTodo, createdAt: new Date() },
    ]);
    notifie("Task", `Added \"${newTodo}\".`, EStatus.success);
    setNewTodo("");
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewTodo(e.target.value);
  };

  const handleRemove = (id: number) => {
    setTodoList((prev) => prev.filter((item) => item.id !== id));
    notifie(
      "Task",
      `Removed \"${todoList.find((item) => item.id === id)?.body}\".`,
      EStatus.success
    );
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
              icon={<PlusIcon height="100%" />}
            />
          </HStack>
        </form>
       
        <AnimatePresence>
          {todoList.length > 0 && (
            <Stack
              as={motion.div}
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0, opacity: 0 }}
              layout
              direction="column"
              spacing="1rem"
              paddingBlock="1rem"
            >
              <AnimatePresence>
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
                          _dark={{ color: "gray.400" }}
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
              </AnimatePresence>
              <Button
                colorScheme="red"
                _dark={{ backgroundColor: "red.600", color: "white" }}
                onClick={removeAll}
              >
                delete all
              </Button>
            </Stack>
          )}
        </AnimatePresence>
      
      </Flex>
      <Stack pos="absolute" left="1" top="1">
      <AnimatePresence>
          {alerts.map((alert) => (
            <AlertItem key={alert.id} alert={alert} removeAlert={removeAlert} />
          ))}
        </AnimatePresence>
      </Stack>
    </Container>
  );
};

export default Main;
