import React, { useState } from "react";
import { createPortal } from "react-dom";
import styled from "styled-components";
import { useFormik } from "formik";
import * as Yup from "yup";
import { api } from "../services/apiAuth";

// Styled components for the modal
const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const ModalContainer = styled.div`
  display: flex;
  flex-direction: column;
  background: white;
  border-radius: 8px;
  padding: 4rem 10rem;
  position: relative;
`;

const StyledModal = styled.div`
  display: flex;
  flex-direction: row-reverse; // Display items in a row from right to left
  align-items: center; // Center align vertically
  flex-grow: 1; // Allow content to grow
`;

const InputWrapper = styled.div`
  display: flex;
  gap: 1px;
  flex-direction: column;
  flex-grow: 1; // Allow inputs to take remaining space
`;

const ButtonsWrapper = styled.div`
  display: flex;
  justify-content: center; // Align buttons to the end
  gap: 20px; // Gap between buttons
  margin-top: 25px; // Margin above buttons
`;

const Button = styled.button`
  padding: 8px 60px;
  border-radius: 8px;
  border: 1px solid #e1e3e6;
  cursor: pointer;
  font-size: 16px;
  color: ${({ variant }) => (variant === "cancel" ? "757d8a" : "#fff")};
  background: ${({ variant }) =>
    variant === "cancel"
      ? "FDF7FF"
      : "#5C2D91"}; // Green for save, red for cancel
`;
const InputContainer = styled.div`
  display: flex;
  flex-direction: column; /* عرض العناصر بشكل عمودي */
  margin-bottom: 20px; /* إضافة مسافة أسفل الحقل */
  width: 100%;
`;

const Label = styled.label`
  font-size: 16px;
  margin-right: 35px;
  margin-bottom: 5px; /* المسافة بين اللصق وحقل الإدخال */
  color: #5c2d91; /* لون النص */
  text-align: right; /* محاذاة النص لليمين */
`;

const InputAndIconContainer = styled.div`
  display: flex;
  align-items: center; /* محاذاة الأيقونة وحقل الإدخال عموديًا */
`;

const StyledImageIcon = styled.img`
  margin-left: 10px; /* المسافة بين الأيقونة وحقل الإدخال */
  width: 24px; /* حجم الأيقونة */
  height: 24px; /* حجم الأيقونة */
`;

const StyledInput = styled.input`
  flex: 1;
  padding: 6px;
  color: #000000;
  border-radius: 4px;
  border: 1px solid #ccc;
  font-size: 16px;
  text-align: right; /* محاذاة النص لليمين */
  box-shadow: 0 1px 4.8px 0 rgba(0, 0, 0, 0.25); /* تأثير الظل */
`;

function EditPassword({ onClose }) {
  // استخدام Formik لإدارة النموذج والتحقق
  const formik = useFormik({
    initialValues: {
      password: "",
      passwordConfirmation: "",
    },
    validationSchema: Yup.object({
      password: Yup.string()
        .min(6, "يجب أن تكون كلمة السر 6 أحرف على الأقل")
        .required("مطلوب"),
      passwordConfirmation: Yup.string()
        .oneOf([Yup.ref("password"), null], "كلمات المرور غير متطابقة")
        .required("مطلوب"),
    }),
    onSubmit: async (values, { setSubmitting, setErrors }) => {
      try {
        // إرسال طلب POST لتحديث كلمة المرور
        const response = await api.post("/auth/Change-Password", {
          password: values.password,
          password_confirmation: values.passwordConfirmation,
        });
        console.log("Password updated", response.data);
        onClose(); // إغلاق النافذة عند الحفظ بنجاح
      } catch (error) {
        console.error("Error changing password", error);
        setErrors({ api: "حدث خطأ أثناء تغيير كلمة المرور" });
      } finally {
        setSubmitting(false);
      }
    },
  });

  return createPortal(
    <Overlay onClick={onClose}>
      <ModalContainer>
        <StyledModal onClick={(e) => e.stopPropagation()}>
          <form onSubmit={formik.handleSubmit}>
            <InputWrapper>
              <InputContainer>
                <Label htmlFor="password">كلمة السر الجديدة</Label>
                <InputAndIconContainer>
                  <StyledInput
                    id="password"
                    name="password"
                    type="password"
                    placeholder="كلمة السر الجديدة"
                    value={formik.values.password}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                  <StyledImageIcon src="./Lock.svg" alt="Input Icon" />
                </InputAndIconContainer>
                {formik.touched.password && formik.errors.password ? (
                  <p style={{ color: "red" }}>{formik.errors.password}</p>
                ) : null}
              </InputContainer>

              <InputContainer>
                <Label htmlFor="passwordConfirmation">
                  تأكيد كلمة السر الجديدة
                </Label>
                <InputAndIconContainer>
                  <StyledInput
                    id="passwordConfirmation"
                    name="passwordConfirmation"
                    type="password"
                    placeholder="تأكيد كلمة السر الجديدة"
                    value={formik.values.passwordConfirmation}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                  <StyledImageIcon src="./Lock.svg" alt="Input Icon" />
                </InputAndIconContainer>
                {formik.touched.passwordConfirmation &&
                formik.errors.passwordConfirmation ? (
                  <p style={{ color: "red" }}>
                    {formik.errors.passwordConfirmation}
                  </p>
                ) : null}
              </InputContainer>
              {formik.errors.api && (
                <p style={{ color: "red" }}>{formik.errors.api}</p>
              )}
            </InputWrapper>

            <ButtonsWrapper>
              <Button type="button" variant="cancel" onClick={onClose}>
                إلغاء
              </Button>
              <Button
                type="submit"
                variant="save"
                disabled={formik.isSubmitting}
              >
                حفظ
              </Button>
            </ButtonsWrapper>
          </form>
        </StyledModal>
      </ModalContainer>
    </Overlay>,
    document.body
  );
}

export default EditPassword;
