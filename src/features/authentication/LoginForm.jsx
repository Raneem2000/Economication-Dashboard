import { useState } from "react";
import { Formik, Form, useField } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import styled, { css } from "styled-components";
import Button from "../../ui/Button";
import Input from "../../ui/Input";
import SpinnerMini from "../../ui/SpinnerMini";
import { login } from "../../services/apiAuth";
import toast from "react-hot-toast";
import Logo from "../../ui/Logo";
import Heading from "../../ui/Heading";

const StyledErrorMessage = styled.div`
  color: red;
  font-size: 1.1rem;
  margin-top: 5px;
`;

const FormRowLogin = styled.div`
  display: flex;
  flex-direction: column;
`;

const LabelWrapper = styled.div`
  display: flex;
  align-items: center;
`;

const Label = styled.label`
  color: ${({ hasError }) => (hasError ? "red" : "#5c2d91")};
  font-weight: 600;
  flex: 1;
`;

const IconEmail = styled.img`
  width: 22px;
  height: 22px;
`;

const IconPassword = styled.img`
  width: 30px;
  height: 30px;
  cursor: pointer;
`;
const IconShowOrHide = styled.img`
  width: 23px;
  height: 23px;
  top: 6px;
  position: absolute;
  left: 40px;
  cursor: pointer;
`;

const InputWrapper = styled.div`
  width: 450px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const StyledForm = styled(Form)`
  display: flex;
  flex-direction: column;
  gap: 16px;
  align-items: center;
`;

const StyledContainer = styled.div`
  width: 90%;
  height: 91%;
  margin: auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 35px 40px;
  background-color: #fff;
  border-radius: var(--border-radius-lg);
`;

const FormRowSubmit = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const StyledInput = styled(Input)`
  direction: rtl;
  ${({ hasError }) =>
    hasError &&
    css`
      border-color: red;
      box-shadow: inset 0px 1px 4.8px red;
    `}
`;

const FormRowLoginCheckbox = styled.div`
  width: 80%;
  display: flex;
  justify-content: end;
  align-items: center;
  margin-right: 20px;
`;

const StyledCheckbox = styled.input.attrs({ type: "checkbox" })`
  appearance: none;
  width: 26px;
  height: 26px;
  box-shadow: inset 0px 1px 4.8px rgba(0, 0, 0, 0.25);
  border-radius: 4px;
  position: relative;
  margin-left: 9px;
  cursor: pointer;
  &:focus {
    outline: none;
  }
  ${({ hasError }) =>
    hasError &&
    css`
      border-color: red;
      box-shadow: inset 0px 1px 4.8px red;
    `}

  &:checked::before {
    content: "✔";
    font-size: 19px;
    color: #5c2d91;
    position: absolute;
    top: 2%;
    left: 50%;
    width: 100%;
    height: 100%;
    text-align: center;
    transform: translate(-50%, -3%);
    box-shadow: inset 0px 1px 4.8px rgba(0, 0, 0, 0.25);
  }

  &:focus {
    box-shadow: inset 0px 1px 4.8px rgba(0, 0, 0, 0.25);
  }
`;

const CustomField = ({ type, ...props }) => {
  const [field, meta] = useField(props);
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <InputWrapper>
      <StyledInput {...field} {...props} type={showPassword ? "text" : type} hasError={meta.touched && meta.error} />
      {type === "password" && <IconShowOrHide src={showPassword ? "/showpassword.svg" : "/hiddenpassword.svg"} onClick={togglePasswordVisibility} />}
      {meta.touched && meta.error ? <StyledErrorMessage>{meta.error}</StyledErrorMessage> : null}
    </InputWrapper>
  );
};

function LoginForm() {
  const [isLoading, setIsLoading] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const navigate = useNavigate();

  const validationSchema = Yup.object({
    email: Yup.string().email("البريد الإلكتروني غير صالح").matches(/@.*\./, "يجب أن يحتوي البريد الإلكتروني على '.' بعد '@'").required("البريد الإلكتروني مطلوب"),
    password: Yup.string().min(4, "يجب أن تكون كلمة المرور على الأقل 4 أحرف").required("كلمة المرور مطلوبة"),
  });

  const handleSubmit = async (values, { setSubmitting }) => {
    setIsLoading(true);
    try {
      const data = await login(values.email, values.password);
      console.log(data);
      toast.success("مرحبًا بعودتك! لقد سجلت الدخول بنجاح");
      navigate("/dashboard");
    } catch (err) {
      console.log("ERROR", err);
      toast.error("البريد الإلكتروني أو كلمة المرور غير صحيحة");
    } finally {
      setIsLoading(false);
      setSubmitting(false);
    }
  };

  return (
    <StyledContainer>
      <Logo />
      <Heading as="h1">مرحبًا بعودتك</Heading>
      <Formik initialValues={{ email: "", password: "" }} validationSchema={validationSchema} onSubmit={handleSubmit}>
        {({ isSubmitting }) => (
          <StyledForm>
            <FormRowLogin style={{ width: "100%" }}>
              <LabelWrapper>
                <CustomField type="email" id="email" name="email" autoComplete="username" disabled={isLoading || isSubmitting} required />
                <Label htmlFor="email">
                  <IconEmail src="/email.svg" />
                </Label>
              </LabelWrapper>
            </FormRowLogin>

            <FormRowLogin style={{ position: "relative" }}>
              <LabelWrapper>
                <CustomField type="password" id="password" name="password" autoComplete="current-password" disabled={isLoading || isSubmitting} required />
                <Label htmlFor="password">
                  <IconPassword src="/password.svg" />
                </Label>
              </LabelWrapper>
            </FormRowLogin>

            <FormRowLoginCheckbox>
              <LabelWrapper>
                <Label htmlFor="rememberMe" hasError={false}>
                  تذكرني
                </Label>
                <StyledCheckbox id="rememberMe" checked={rememberMe} onChange={() => setRememberMe(!rememberMe)} disabled={isLoading || isSubmitting} />
              </LabelWrapper>
            </FormRowLoginCheckbox>

            <FormRowSubmit>
              <Button type="submit" size="large" variation="darkpurble" disabled={isLoading || isSubmitting}>
                {!isLoading ? "تسجيل دخول" : <SpinnerMini />}
              </Button>
            </FormRowSubmit>
          </StyledForm>
        )}
      </Formik>
    </StyledContainer>
  );
}

export default LoginForm;
