import React, { useState } from "react";
import { StatusBar } from "expo-status-bar";
import { Button, Image, Input } from "@rneui/themed";
import { styled } from "styled-components/native";
import { View } from "react-native";

const Container = styled.KeyboardAvoidingView`
  flex: 1;
  align-items: center;
  justify-content: center;
`;

const StyledImage = styled(Image)`
  width: 200px;
  height: 200px;
  border-radius: 15px;
  margin: 20px;
`;

const StyledButton = styled(Button)`
  margin-top: 10px;
  width: 200px;
`;

const ImageWrapper = styled.View`
  margin: 0px auto;
`;

const InputWrapper = styled.View`
  width: 300px;
`;

const ButtonStyle = {
  width: 200,
  marginTop: 15,
};

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const signIn = () => {};

  return (
    <Container behavior="padding">
      <StatusBar style="light" />

      <ImageWrapper>
        <StyledImage
          source={{
            uri: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8d/Signal-Logo.svg/600px-Signal-Logo.svg.png?20201126050550",
          }}
        />
      </ImageWrapper>

      <InputWrapper>
        <Input
          placeholder="Email"
          textContentType="emailAddress"
          value={email}
          onChangeText={(text) => setEmail(text)}
        />
        <Input
          placeholder="Password"
          secureTextEntry
          textContentType="password"
          value={password}
          onChangeText={(text) => setPassword(text)}
        />
      </InputWrapper>

      <Button title="Login" onPress={signIn} buttonStyle={ButtonStyle} />
      <Button
        title="Register"
        type="outline"
        onPress={() => navigation.navigate("Register")}
        buttonStyle={ButtonStyle}
      />

      <View style={{ height: 100 }} />
    </Container>
  );
}
