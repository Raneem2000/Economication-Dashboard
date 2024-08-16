import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import styled from "styled-components";
import { api } from "../../services/apiAuth";

const FormContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 700px;
  padding: 5px 10px;
  height: 90vh;
  overflow-y: auto;

  @media (max-width: 768px) {
    width: 90%;
  }

  @media (max-width: 480px) {
    width: 100%;
    padding: 5px;
  }
`;

const FormTitle = styled.h2`
  margin-bottom: 2rem;
  color: #000;
  font-size: 34px;
  font-weight: 500;

  @media (max-width: 768px) {
    font-size: 28px;
  }

  @media (max-width: 480px) {
    font-size: 24px;
  }
`;

const FormFieldContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 1rem;
  width: 100%;
  gap: 16px;

  @media (max-width: 480px) {
    flex-direction: column;
    align-items: flex-start;
  }
`;

const Label = styled.label`
  flex: 1;
  color: #160041;
  font-weight: 400;
  text-align: left;
  font-size: 16px;

  @media (max-width: 480px) {
    width: 100%;
  }
`;

const Input = styled.input`
  flex: 2;
  box-shadow: inset 0px 1px 4.8px rgba(0, 0, 0, 0.25);
  padding: 5px 13px;
  border-radius: 4px;
  width: 90%;
  margin-left: 35px;
  background-color: #fff;
  border: none;
  outline: none;
  text-align: right;
  &:focus {
    outline: none;
  }

  @media (max-width: 480px) {
    width: 100%;
    margin-left: 0;
  }
`;

const TextArea = styled.textarea`
  flex: 2;
  box-shadow: inset 0px 1px 4.8px rgba(0, 0, 0, 0.25);
  padding: 5px 13px;
  border-radius: 4px;
  width: 90%;
  margin-left: 35px;
  background-color: #fff;
  border: none;
  outline: none;
  text-align: right;
  resize: none;
  height: 80px;
  &:focus {
    outline: none;
  }

  @media (max-width: 480px) {
    width: 100%;
    margin-left: 0;
  }
`;

const FileCameraContainer = styled.div`
  width: 220px;
  height: 220px;
  cursor: pointer;

  @media (max-width: 768px) {
    width: 180px;
    height: 180px;
  }

  @media (max-width: 480px) {
    width: 150px;
    height: 150px;
  }
`;

const ButtonCategoryContainer = styled.div`
  width: 50%;
  margin: 30px auto 5px auto;
  display: flex;
  justify-content: space-around;

  @media (max-width: 768px) {
    width: 70%;
  }

  @media (max-width: 480px) {
    width: 90%;
    flex-direction: column;
    gap: 10px;
  }
`;

const Button = styled.button`
  width: 40%;
  padding: 0.75rem 2rem;
  border-radius: 6px;
  cursor: pointer;
  &:focus {
    outline: none;
  }

  @media (max-width: 480px) {
    width: 100%;
  }
`;

const SubmitButton = styled(Button)`
  background-color: #5c2d91;
  color: #fff;
  border: none;
`;

const CancelButton = styled(Button)`
  background-color: #fdf7ff;
  color: #757d8a;
  border: 1px solid #e1e3e6;
`;

const Form = styled.form`
  width: 100%;
`;

const StyledInput = styled.div`
  width: 65%;

  @media (max-width: 768px) {
    width: 80%;
  }

  @media (max-width: 480px) {
    width: 100%;
  }
`;

const StyledContent = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  @media (max-width: 480px) {
    flex-direction: column;
    gap: 10px;
  }
`;

const ImageCamera = styled.img`
  width: 100%;
  height: 100%;
  object-fit: contain;
  border-radius: 24px;
`;

const HiddenFileInput = styled.input`
  display: none;
`;

const StyledErrorMessage = styled.div`
  color: red;
  font-size: 1.1rem;
  margin-top: -5px;

  @media (max-width: 768px) {
    font-size: 1rem;
  }

  @media (max-width: 480px) {
    font-size: 0.9rem;
  }
`;
const validationSchema = Yup.object().shape({
  name_ar: Yup.string().required("الاسم مطلوب"),
  name_en: Yup.string().required("Name is required"),
  url: Yup.string().required("الرابط مطلوب"),
  number_round_per_day: Yup.number()
    .required("عدد الجولات مطلوب")
    .positive()
    .integer(),
  win_points: Yup.number().required("نقاط الفوز مطلوبة").positive().integer(),
  loss_points: Yup.number()
    .required("نقاط الخسارة مطلوبة")
    .positive()
    .integer(),
  description_ar: Yup.string().required("الوصف مطلوب"),
  description_en: Yup.string().required("Description is required"),
  term_condition_ar: Yup.string().required("الشروط والأحكام مطلوبة"),
  term_condition_en: Yup.string().required("الشروط والأحكام مطلوبة بالانكليزي"),
  media: Yup.mixed().required("الصورة مطلوبة"),
});

function AddFormGame({
  onClose,
  EditNameButton,
  title,
  onSave,
  id = {},
  fetchGames,
}) {
  const [game, setGame] = useState(null); // استخدم null بدلاً من مصفوفة إذا كانت البيانات كائنًا
  const [isFetching, setIsFetching] = useState(false);

  // تحميل البيانات عند التعديل
  useEffect(() => {
    if (EditNameButton === "تعديل" && id) {
      const fetchGames = async () => {
        setIsFetching(true);
        try {
          const response = await api.get(`/games/show/${id}`);
          setGame(response?.data?.data || {});
        } catch (error) {
          console.error("Error fetching games", error);
        } finally {
          setIsFetching(false);
        }
      };
      fetchGames();
    }
  }, [EditNameButton, id]);

  const formik = useFormik({
    enableReinitialize: true, // تأكد من إعادة تهيئة formik عند تغيير game
    initialValues: {
      name_ar: game?.name_ar || "",
      name_en: game?.name_en || "",
      url: game?.url || "",
      number_round_per_day: game?.number_round_per_day || "",
      win_points: game?.win_points || "",
      loss_points: game?.loss_points || "",
      description_ar: game?.description_ar || "",
      description_en: game?.description_en || "",
      term_condition_ar: game?.term_condition_ar || "",
      term_condition_en: game?.term_condition_en || "",
      media: game?.media || null,
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      try {
        const formData = new FormData();
        for (let key in values) {
          if (key !== "media" || (values[key] && values[key] instanceof File)) {
            formData.append(key, values[key]);
          }
        }

        // إذا لم يتم تغيير الصورة، استخدم الصورة الحالية من game
        if (!values.media && game?.media) {
          formData.append("media", game.media.file_path);
        }

        // إضافة البيانات الأخرى عند التعديل
        if (EditNameButton === "تعديل" && id) {
          formData.append("_method", "put");
        }

        const url =
          EditNameButton === "تعديل" && id
            ? `/games/update/${id}`
            : "/games/store";

        const response = await api.post(url, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });

        onSave(response.data);
        fetchGames();
        onClose();
      } catch (error) {
        console.error("Error submitting the form", error);
      }
    },
  });

  const handleImageClick = () => {
    document.getElementById("file-input").click();
  };

  const handleImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      formik.setFieldValue("media", e.target.files[0]);
    }
  };

  return (
    <FormContainer>
      <FormTitle>{title}</FormTitle>
      <Form onSubmit={formik.handleSubmit} id="add-game-form">
        <StyledContent>
          <StyledInput>
            <FormFieldContainer>
              <Input
                type="text"
                id="name"
                name="name_ar"
                value={formik.values.name_ar}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              <Label htmlFor="name">الاسم بالعربي</Label>
            </FormFieldContainer>
            {formik.touched.name_ar && formik.errors.name_ar && (
              <StyledErrorMessage>{formik.errors.name_ar}</StyledErrorMessage>
            )}
            <FormFieldContainer>
              <Input
                type="text"
                id="name_en"
                name="name_en"
                value={formik.values.name_en}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              <Label htmlFor="name_en">الاسم بالانكليزي</Label>
            </FormFieldContainer>
            {formik.touched.name_en && formik.errors.name_en && (
              <StyledErrorMessage>{formik.errors.name_en}</StyledErrorMessage>
            )}

            <FormFieldContainer>
              <Input
                type="text"
                id="url"
                name="url"
                value={formik.values.url}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              <Label htmlFor="url">Url</Label>
            </FormFieldContainer>
            {formik.touched.url && formik.errors.url && (
              <StyledErrorMessage>{formik.errors.url}</StyledErrorMessage>
            )}

            <FormFieldContainer>
              <Input
                type="number"
                id="dailyRounds"
                name="number_round_per_day"
                value={formik.values.number_round_per_day}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              <Label htmlFor="dailyRounds">عدد الجولات في اليوم الواحد</Label>
            </FormFieldContainer>
            {formik.touched.number_round_per_day &&
              formik.errors.number_round_per_day && (
                <StyledErrorMessage>
                  {formik.errors.number_round_per_day}
                </StyledErrorMessage>
              )}

            <FormFieldContainer>
              <Input
                type="number"
                id="winPoints"
                name="win_points"
                value={formik.values.win_points}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              <Label htmlFor="winPoints">نقاط الفوز</Label>
            </FormFieldContainer>
            {formik.touched.win_points && formik.errors.win_points && (
              <StyledErrorMessage>
                {formik.errors.win_points}
              </StyledErrorMessage>
            )}

            <FormFieldContainer>
              <Input
                type="number"
                id="lossPoints"
                name="loss_points"
                value={formik.values.loss_points}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              <Label htmlFor="lossPoints">نقاط الخسارة</Label>
            </FormFieldContainer>
            {formik.touched.loss_points && formik.errors.loss_points && (
              <StyledErrorMessage>
                {formik.errors.loss_points}
              </StyledErrorMessage>
            )}

            <FormFieldContainer>
              <TextArea
                id="description"
                name="description_ar"
                value={formik.values.description_ar}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              <Label htmlFor="description">وصف اللعبة بالعربي</Label>
            </FormFieldContainer>
            {formik.touched.description_ar && formik.errors.description_ar && (
              <StyledErrorMessage>
                {formik.errors.description_ar}
              </StyledErrorMessage>
            )}
            <FormFieldContainer>
              <TextArea
                id="description_en"
                name="description_en"
                value={formik.values.description_en}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              <Label htmlFor="description_en">الوصف بالانكليزي</Label>
            </FormFieldContainer>
            {formik.touched.description_en && formik.errors.description_en && (
              <StyledErrorMessage>
                {formik.errors.description_en}
              </StyledErrorMessage>
            )}
            <FormFieldContainer>
              <TextArea
                id="terms"
                name="term_condition_ar"
                value={formik.values.term_condition_ar}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              <Label htmlFor="terms">شروط وأحكام اللعبة</Label>
            </FormFieldContainer>
            {formik.touched.term_condition_ar &&
              formik.errors.term_condition_ar && (
                <StyledErrorMessage>
                  {formik.errors.term_condition_ar}
                </StyledErrorMessage>
              )}
            <FormFieldContainer>
              <TextArea
                id="terms_en"
                name="term_condition_en"
                value={formik.values.term_condition_en}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              <Label htmlFor="terms_en">شروط وأحكام اللعبة بالانكليزي</Label>
            </FormFieldContainer>
            {formik.touched.term_condition_en &&
              formik.errors.term_condition_en && (
                <StyledErrorMessage>
                  {formik.errors.term_condition_en}
                </StyledErrorMessage>
              )}
          </StyledInput>
          <FileCameraContainer onClick={handleImageClick}>
            <ImageCamera
              src={
                formik.values.media && formik.values.media instanceof File
                  ? URL.createObjectURL(formik.values.media)
                  : game?.media?.file_path
                  ? game.media.file_path
                  : "/Camera.svg"
              }
            />

            <HiddenFileInput
              id="file-input"
              type="file"
              accept="image/*"
              onChange={handleImageChange}
            />
            {formik.touched.media && formik.errors.media && (
              <StyledErrorMessage>{formik.errors.media}</StyledErrorMessage>
            )}
          </FileCameraContainer>
        </StyledContent>

        <ButtonCategoryContainer>
          <CancelButton type="button" onClick={onClose}>
            إلغاء
          </CancelButton>
          <SubmitButton type="submit">{EditNameButton}</SubmitButton>
        </ButtonCategoryContainer>
      </Form>
    </FormContainer>
  );
}

export default AddFormGame;
