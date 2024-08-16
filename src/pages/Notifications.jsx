import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Select from "react-select";

import { useMoveBack } from "../hooks/useMoveBack";
import { api } from "../services/apiAuth";
import Header from "../ui/Header";

const Container = styled.div`
  width: 90%;
  margin: 80px auto;
`;

const StyledContent = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 20px;
  align-items: flex-start;
  gap: 50px;
`;

const ContactSetting = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  margin-top: 20px;
  margin-right: 10px;
  width: 100%;
  flex: 2;
`;

const ImageContainer = styled.div`
  flex: 1;
  width: 297px;
  height: 213px;
  border-radius: 23px;
  margin-top: 60px;
  position: relative;
  cursor: pointer;
`;

const Image = styled.img`
  width: 100%;
  height: 100%;
  object-fit: contain;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 1;
`;

const HiddenFileInput = styled.input`
  display: none;
`;

const FormField = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  width: 80%;
  margin-bottom: 20px;
`;

const Label = styled.label`
  font-size: 16px;
  color: #5c2d91;
  min-width: 105px;
  font-weight: 400;
  text-align: left;
`;

const customSelectStyles = {
  control: (base) => ({
    ...base,
    width: "405px",
    boxShadow: "0px 1px 4.8px 0px #00000040",
    padding: "6px 13px",
    borderRadius: "4px",
    backgroundColor: "#fff",
    border: "none",
    fontSize: "16px",
    cursor: "pointer",
  }),
  option: (base, state) => ({
    ...base,
    padding: "10px",
    margin: "8px 0px",
    cursor: "pointer",
    backgroundColor: state.isSelected ? "#68289229" : "#fff",

    color: "#000",
    "&:hover": {
      backgroundColor: "#68289229",
      color: "#000",
    },
  }),
  menu: (base) => ({
    ...base,
    boxShadow: "0px 3px 12px rgba(0, 0, 0, 0.25)",
    borderBottomRightRadius: "20px !important",
    borderBottomLeftRadius: "20px",
  }),
};

const Input = styled.input`
  flex-grow: 1;
  box-shadow: inset 0px 1px 4.8px rgba(0, 0, 0, 0.25);
  padding: 10px 13px;
  border-radius: 4px;
  background-color: #fff;
  border: none;
  outline: none;
  resize: none;
  overflow: hidden;
  font-size: 16px;
  &:focus {
    outline: none;
  }
`;

const TextArea = styled.textarea`
  flex-grow: 1;
  box-shadow: inset 0px 1px 4.8px rgba(0, 0, 0, 0.25);
  padding: 9px 13px;
  border-radius: 4px;
  background-color: #fff;
  border: none;
  outline: none;
  resize: none;
  overflow: hidden;
  font-size: 16px;
  &:focus {
    outline: none;
  }
  width: 100%;
`;

const ButtonEnter = styled.button`
  width: 45%;
  border: none;
  outline: none;
  background-color: #5c2d91;
  border-radius: 4px;
  color: #fff;
  padding: 8px 0px;
  font-size: 16px;
  cursor: pointer;
  &:focus {
    outline: none;
  }
`;

const ButtonCancel = styled.button`
  width: 45%;
  background-color: #fdf7ff;
  border: 1px solid #e1e3e6;
  padding: 8px 0px;
  border-radius: 4px;
  font-size: 16px;
  cursor: pointer;
  &:focus {
    outline: none;
  }
`;

const ButtonsCategory = styled.div`
  display: flex;
  width: 36%;
  margin: 10px auto auto auto;
  justify-content: space-between;
  gap: 20px;
`;

function Notifications() {
  const initialState = {
    image: "/Group 364.svg",
    type: null,
    title: "",
    content: "",
  };

  const [state, setState] = useState(initialState);
  const [options, setOptions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [additionalOptions, setAdditionalOptions] = useState([]); // الحالة للخيارات الإضافية
  const [showAdditionalSelect, setShowAdditionalSelect] = useState(false); // حالة لعرض عنصر select الإضافي
  const [selectedUsers, setSelectedUsers] = useState([]); // حالة لتخزين المستخدمين المحددين

  // دالة لجلب الخيارات من API باستخدام api
  const fetchNotificationOptions = async () => {
    try {
      const response = await api.get(
        "/notifications/list-all-notification-type"
      );
      const data = response.data.data;
      const formattedOptions = data.map((item) => ({
        value: item.id,
        label: item.name,
      }));
      setOptions(formattedOptions);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching notification options:", error);
      setError(error);
      setLoading(false);
    }
  };

  // دالة لجلب الخيارات الإضافية (المستخدمين) من API
  const fetchAdditionalOptions = async () => {
    try {
      const response = await api.get("/notifications/index-users"); // استبدل هذا بالمسار الفعلي للـ API الخاص بك
      const data = response.data.data;
      const formattedOptions = data.map((user) => ({
        value: user.id,
        label: user.username,
      }));
      setAdditionalOptions(formattedOptions);
    } catch (error) {
      console.error("Error fetching additional options:", error);
      setError(error);
    }
  };

  useEffect(() => {
    fetchNotificationOptions();
  }, []);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setState((prevState) => ({
          ...prevState,
          image: reader.result,
          imageFile: file, // Store the file object as well
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const moveBack = useMoveBack(); // تأكد من وجود هذه الدالة أو استبدالها بالعودة المناسبة
  const handleSave = async () => {
    console.log("Saved data:", state);
    await sendNotification(); // استدعاء دالة إرسال الإشعار
    moveBack(); // الرجوع بعد حفظ البيانات
  };

  const sendNotification = async () => {
    try {
      const formData = new FormData();
      formData.append("type_id", state.type.value);
      formData.append("title", state.title);
      formData.append("body", state.content);

      // Only append user_ids if type.value is -1
      if (state.type.value === -1) {
        selectedUsers.forEach((user) =>
          formData.append("user_ids[]", user.value)
        );
      }

      // Append the image file if it exists
      if (state.imageFile) {
        formData.append("media", state.imageFile);
      }

      const response = await api.post("/notifications/send", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      console.log("Notification sent:", response.data);
    } catch (error) {
      console.error("Error sending notification:", error);
      setError(error);
    }
  };

  const handleCancel = () => {
    moveBack();
  };

  // دالة لتغيير النوع والتعامل مع الحالة الجديدة
  const handleTypeChange = (selectedOption) => {
    setState((prevState) => ({
      ...prevState,
      type: selectedOption,
    }));
    if (selectedOption.value === -1) {
      setShowAdditionalSelect(true);
      fetchAdditionalOptions(); // جلب الخيارات الإضافية (المستخدمين) عند اختيار الخيار الذي قيمته -1
    } else {
      setShowAdditionalSelect(false);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <>
      <Header />
      <Container>
        <StyledContent>
          <ImageContainer
            onClick={() => document.getElementById("imageUpload").click()}
          >
            <Image src={state.image} alt="Gamzie" />
            <HiddenFileInput
              type="file"
              id="imageUpload"
              accept="image/*"
              onChange={handleImageChange}
            />
          </ImageContainer>
          <ContactSetting>
            <FormField>
              <Label>نوع الإشعار</Label>
              <Select
                value={state.type}
                onChange={handleTypeChange} // استخدام دالة التعامل مع التغيير
                options={options}
                styles={customSelectStyles}
                placeholder="اختر نوع الإرسال"
                isSearchable={false}
              />
            </FormField>
            {showAdditionalSelect && (
              <FormField>
                <Label>الخيارات الإضافية</Label>
                <Select
                  options={additionalOptions}
                  onChange={setSelectedUsers} // تحديث حالة المستخدمين المحددين
                  styles={customSelectStyles}
                  placeholder="اختر المستخدمين "
                  isSearchable={false}
                  isMulti
                />
              </FormField>
            )}
            <FormField>
              <Label>العنوان</Label>
              <Input
                type="text"
                value={state.title}
                onChange={(e) =>
                  setState((prevState) => ({
                    ...prevState,
                    title: e.target.value,
                  }))
                }
              />
            </FormField>
            <FormField>
              <Label>محتوى الإشعار</Label>
              <TextArea
                rows="4"
                value={state.content}
                onChange={(e) =>
                  setState((prevState) => ({
                    ...prevState,
                    content: e.target.value,
                  }))
                }
              ></TextArea>
            </FormField>
          </ContactSetting>
        </StyledContent>

        <ButtonsCategory>
          <ButtonEnter onClick={handleSave}>إرسال</ButtonEnter>
          <ButtonCancel onClick={handleCancel}>إلغاء</ButtonCancel>
        </ButtonsCategory>
      </Container>
    </>
  );
}

export default Notifications;
