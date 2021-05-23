import { useEffect, useState } from "react";
import { signIn, getSession } from "next-auth/client";
import Link from "next/link";
import Head from "next/head";
import { useRouter } from "next/router";
import {
  Box,
  Text,
  Button,
  FormControl,
  FormLabel,
  Input,
} from "@chakra-ui/react";
import useForm from "../hooks/useForm";
import ErrorComponent from "../components/ErrorComponent";

function signInPage() {
  const router = useRouter();
  const { input, handleChange } = useForm({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    getSession().then((session) => {
      if (session) {
        router.replace("/");
      } else {
        setLoading(false);
      }
    });
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = await signIn("credentials", {
      redirect: false,
      email: input.email,
      password: input.password,
    });
    if (result.error) {
      setError(result.error);
    }

    if (!result.error) {
      router.replace("/");
    }
  };

  if (loading) {
    return <p>Loading.....</p>;
  }

  return (
    <>
      <Head>
        <title>Sign In</title>
      </Head>
      <Box w="full" textAlign="center" my="5">
        <Text fontSize="5xl" color="freshRed" fontWeight="medium">
          Welcome Back
        </Text>
        <Text fontSize="md" color="freshBlue" textDecor="CaptionText">
          We Missed You, sign in and start reading & writing &#128516;
        </Text>
      </Box>
      <form onSubmit={handleSubmit}>
        <Box
          d="flex"
          pb="10"
          w="full"
          flexDirection="column"
          alignItems="center"
        >
          {error && <ErrorComponent errorMessage={error} w="80%" />}
          <FormControl isRequired w="80%" id="email">
            <FormLabel color="freshBlue">Email</FormLabel>
            <Input
              onChange={handleChange}
              name="email"
              value={input.email}
              size="md"
              placeholder="Email"
              type="email"
            />
          </FormControl>

          <FormControl isRequired my="5" id="password" w="80%">
            <FormLabel color="freshBlue">Passowrd</FormLabel>
            <Input
              onChange={handleChange}
              name="password"
              value={input.password}
              size="md"
              placeholder="Password"
              type="password"
            />
          </FormControl>
          <Button
            type="submit"
            fontSize="lg"
            w="80%"
            mt="5"
            bg="freshBlue"
            _hover={{ bg: "freshBlue" }}
            color="white"
          >
            Submit
          </Button>
          <Box w="80%" fontSize="sm" d="flex" mt="5" justifyContent="flex-end">
            <Text color="gray.500" textAlign="right">
              You don't hove an account?
            </Text>
            <Link href="/signUp">
              <a>
                <Text cursor="pointer" ml="5px" color="blue.300">
                  Sign up
                </Text>
              </a>
            </Link>
          </Box>
        </Box>
      </form>
    </>
  );
}

export default signInPage;
