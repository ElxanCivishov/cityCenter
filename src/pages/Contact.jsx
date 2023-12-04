import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { Meta } from "../components/layout";
import { Button, FormInput, FormTextarea } from "../components/elements";

import { addValidation } from "../features/dataSlice";
import { RESET, createContact } from "../features/contact/contactSlice";

import contactImg from "/images/contact.png";

const initialValue = {
  full_name: "",
  email: "",
  number: "",
  subject: "",
  note: "",
};

let schema = yup.object().shape({
  full_name: yup.string().required(" "),
  email: yup.string().required(" "),
  number: yup
    .string()
    .required(" ")
    .matches(/^\+994\s\d{9}$/, "Format: +994 xxxxxxxxx"),
  subject: yup.string().required(" ").max(200, "Max 200 simvol"),
});

const Contact = () => {
  const dispatch = useDispatch();
  const [showMessage, setShowMessage] = useState(false);

  const { isLoading, isSuccess, isError, message } = useSelector(
    (state) => state.contacts
  );

  const {
    handleSubmit,
    watch,
    register,
    reset,
    trigger,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: initialValue,
  });

  useEffect(() => {
    trigger();
  }, [
    watch("full_name"),
    watch("email"),
    watch("number"),
    watch("subject"),
    watch("note"),
  ]);

  useEffect(() => {
    dispatch(addValidation(false));
  }, [dispatch]);

  useEffect(() => {
    dispatch(addValidation(false));
    if (isError || isSuccess) {
      setShowMessage(true);
      setTimeout(() => {
        setShowMessage(false);
        dispatch(RESET());
      }, 5000);
    }
    if (isSuccess) {
      reset(initialValue);
    }
  }, [isSuccess, isError, dispatch]);

  const onSubmit = handleSubmit(async (values) => {
    dispatch(createContact(values));
  });

  const handleClick = () => {
    if (Object.keys(errors).length > 0) {
      dispatch(addValidation(true));
    } else {
      dispatch(addValidation(false));
    }
  };

  return (
    <>
      <Meta title="Bizimlə əlaqə" />
      <section className="container p-4 my-5 ">
        <div className="w-full  mx-auto bg-white p-5 rounded-lg">
          <h3 className="text-xl text-zinc-700 font-semibold md:text-center px-4 mb-3">
            Bizimlə əlaqə
          </h3>
          <div className="flex items-center justify-center">
            <img src={contactImg} alt="contact" className="h-[200px]" />
          </div>
          <p className="text-sm text-zinc-700 font-semibold md:text-center tracking-wide px-4 mb-5">
            Suallarınızı, təklif və ya iradlarınızı bizə bildirin. Fikirləriniz
            bizim üçün önəmlidir. Təşəkkürlər!
          </p>
          <form
            action=""
            className="flex flex-col  gap-2 md:gap-6 px-4"
            onSubmit={handleSubmit(onSubmit)}
            noValidate
          >
            <div className="grid md:grid-cols-2 gap-4">
              <FormInput
                register={register("full_name")}
                errors={errors.full_name}
                label="Ad və soyadınız"
                required={true}
                placeholder="Ad və soyadınız..."
              />
              <FormInput
                register={register("email")}
                errors={errors.email}
                label="Email adresiniz"
                placeholder="email..."
                type="email"
                required={true}
              />

              <FormInput
                register={register("number")}
                errors={errors.number}
                label="Nömrəniz"
                required={true}
                placeholder="Nömrəniz..."
                type="tel"
              />
              <FormInput
                register={register("subject")}
                errors={errors.subject}
                required={true}
                placeholder="Mövzu..."
                label="Mövzu"
              />
            </div>

            <FormTextarea
              register={register("note")}
              placeholder="Qeydiniz..."
              label="Qeydiniz"
              rows={4}
              classInput="max-h-[300px] p-3"
            />

            {isError && message && showMessage && (
              <div className="w-full text-center px-3 py-2 rounded-lg font-semibold my-3 text-sm border border-red-500 text-red-500">
                {message}
              </div>
            )}

            {isSuccess && message && showMessage && (
              <div className="w-full text-center px-3 py-2 rounded-lg font-semibold my-3 text-sm border border-emerald-500 text-emerald-500">
                {message}
              </div>
            )}

            <div className="flex items-center justify-center">
              <Button
                onClick={() => handleClick()}
                classBtn="border-0 w-40"
                type="submit"
                isLoading={isLoading}
                label="Göndər"
              />
            </div>
          </form>
        </div>
      </section>
    </>
  );
};

export default Contact;
