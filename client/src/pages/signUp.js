import Link from "next/link";
import { getSession } from "next-auth/client";

import { useRouter } from "next/router";
import {
  Box,
  Text,
  Button,
  FormControl,
  FormLabel,
  Input,
  useToast,
} from "@chakra-ui/react";

import useForm from "../hooks/useForm";
import { useEffect, useState } from "react";
import ErrorComponent from "../components/ErrorComponent";
import Head from "next/head";

async function createUser(
  fullname,
  photoUrl,
  email,
  status,
  city,
  country,
  password
) {
  const response = await fetch("/api/auth/sign-up", {
    method: "POST",
    body: JSON.stringify({
      fullname,
      photoUrl,
      email,
      city,
      country,
      status,
      password,
    }),
    headers: {
      "Content-Type": "application/json",
    },
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "something went wrong");
  }

  return data;
}

function signUpPage() {
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();
  const toast = useToast();
  const [error, setError] = useState("");

  const { input, handleChange } = useForm({
    fullname: "",
    photoUrl: "",
    email: "",
    city: "",
    country: "",
    status: "",
    password: "",
    confirmPassword: "",
  });

  const {
    confirmPassword,
    fullname,
    photoUrl,
    email,
    status,
    city,
    country,
    password,
  } = input;

  useEffect(() => {
    getSession().then((session) => {
      if (session) {
        router.replace("/");
      } else {
        setIsLoading(false);
      }
    });
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (input.password !== input.confirmPassword) {
      return toast({
        status: "error",
        description: "Passwords didn't match",
        duration: "3000",
        position: "top",
      });
    }

    // ################ fetch SIGN UP ######################
    try {
      const result = await createUser(
        fullname,
        photoUrl,
        email,
        city,
        country,
        status,
        password
      );
      if (result.error) {
        setError(result.error);
      }

      if (!result.error) {
        router.replace("/signIn");
        toast({
          status: "success",
          position: "top",
          title: "Account created successfuly",
          description: "Now you can sign in with your email and password",
          duration: "2000",
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  if (isLoading) {
    return <p>Loading.....</p>;
  }

  return (
    <>
      <Head>
        <title>Sign Up</title>
      </Head>
      <Box w="full" textAlign="center" my="5">
        <Text fontSize="5xl" color="freshRed" fontWeight="medium">
          Welcome To Little Astro
        </Text>
        <Text fontSize="md" color="freshBlue" textDecor="CaptionText">
          Join Our Community and start reading & writing &#128516;
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

          <FormControl isRequired w="80%" id="fullname" mb="2.5">
            <FormLabel color="gray.700">Fullname</FormLabel>
            <Input
              onChange={handleChange}
              name="fullname"
              value={input.fullname}
              size="md"
              placeholder="Fullname"
              type="text"
            />
          </FormControl>

          <FormControl isRequired w="80%" id="status" mb="2.5">
            <FormLabel color="gray.700">Status</FormLabel>
            <Input
              onChange={handleChange}
              name="status"
              value={input.status}
              size="md"
              placeholder="Status"
              type="text"
            />
          </FormControl>

          <FormControl isRequired w="80%" id="email" mb="2.5">
            <FormLabel color="gray.700">Email</FormLabel>
            <Input
              onChange={handleChange}
              name="email"
              value={input.email}
              size="md"
              placeholder="Email"
              type="email"
            />
          </FormControl>
          {/* location info */}
          <Box d="flex" w="80%" justifyContent="space-between">
            <FormControl isRequired w="48%" id="city" mb="2.5">
              <FormLabel color="gray.700">City</FormLabel>
              <Input
                w="full"
                onChange={handleChange}
                name="city"
                value={input.city}
                size="md"
                placeholder="City"
                type="text"
              />
            </FormControl>
            <FormControl isRequired w="48%" id="country" mb="2.5">
              <FormLabel color="gray.700">Country</FormLabel>
              <Input
                onChange={handleChange}
                name="country"
                value={input.country}
                size="md"
                placeholder="Country"
                type="text"
              />
            </FormControl>
          </Box>

          <FormControl isRequired w="80%" id="photoUrl" mb="2.5">
            <FormLabel color="gray.700">PhotoURL</FormLabel>
            <Input
              onChange={handleChange}
              name="photoUrl"
              value={input.photoUrl}
              size="md"
              placeholder="PhotoUrl"
              type="text"
            />
          </FormControl>

          <FormControl isRequired mb="5" id="password" w="80%">
            <FormLabel color="gray.700">Passowrd</FormLabel>
            <Input
              onChange={handleChange}
              name="password"
              value={input.password}
              size="md"
              placeholder="Password"
              type="password"
            />
          </FormControl>

          <FormControl isRequired mb="5" id="confirm password" w="80%">
            <FormLabel color="gray.700">Confirm Passowrd</FormLabel>
            <Input
              onChange={handleChange}
              name="confirmPassword"
              value={input.confirmPassword}
              size="md"
              placeholder="Confirm Passowrd"
              type="password"
            />
          </FormControl>

          <Button
            type="submit"
            fontSize="lg"
            w="80%"
            mt="5"
            _hover={{ bg: "freshBlue" }}
            bg="freshBlue"
            color="white"
          >
            Submit
          </Button>

          <Box w="80%" fontSize="sm" d="flex" mt="5" justifyContent="flex-end">
            <Text color="gray.500" textAlign="right">
              You do hove an account?
            </Text>
            <Link href="/signIn">
              <Text cursor="pointer" ml="5px" color="blue.300">
                Sign In
              </Text>
            </Link>
          </Box>
        </Box>
      </form>
    </>
  );
}

export default signUpPage;
