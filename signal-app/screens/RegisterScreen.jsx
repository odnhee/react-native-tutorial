import { View, KeyboardAvoidingView } from "react-native";
import React, { useState } from "react";
import { StatusBar } from "expo-status-bar";
import { styled } from "styled-components/native";
import { Button, Input, Text } from "@rneui/themed";
import { auth } from "../firebaseConfig";

const TitleText = styled(Text)`
  margin-bottom: 50px;
`;

const Container = styled.KeyboardAvoidingView`
  flex: 1;
  align-items: center;
  justify-content: center;
  padding: 10px;
  background-color: white;
`;

const InputWrapper = styled.View`
  width: 300px;
`;

const ButtonStyle = {
  width: 200,
  marginTop: 15,
};

const RegisterScreen = ({ navigation }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [imageUrl, setImageUrl] = useState("");

  const handleRegister = () => {
    auth
      .createUserWithEmailAndPassword(email, password)
      .then((authUser) => {})
      .catch((err) => alert(err.message));
  };

  return (
    <Container behavior="padding">
      <StatusBar style="light" />

      <TitleText h3>Create a Signal account</TitleText>

      <InputWrapper>
        <Input
          placeholder="Full Name"
          textContentType="name"
          value={name}
          onChangeText={(text) => setName(text)}
        />
        <Input
          placeholder="Email"
          textContentType="emailAddress"
          value={email}
          onChangeText={(text) => setEmail(text)}
        />
        <Input
          placeholder="Password"
          textContentType="password"
          secureTextEntry
          value={password}
          onChangeText={(text) => setPassword(text)}
        />
        <Input
          placeholder="Profile Picture URL (optional)"
          textContentType="URL"
          value={imageUrl}
          onChangeText={(text) => setImageUrl(text)}
          onSubmitEditing={handleRegister}
        />
      </InputWrapper>

      <Button
        title="Register"
        // raised
        onPress={handleRegister}
        buttonStyle={ButtonStyle}
      />

      <View style={{ height: 100 }} />
    </Container>
  );
};

export default RegisterScreen;
