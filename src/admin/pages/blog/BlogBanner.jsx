import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { addValidation } from "../../../features/dataSlice";

import { Button, FormInput, FormTextarea } from "../../../components/elements";
import { Meta } from "../../../components/layout";
import {
  RESET,
  getBlogInfo,
  updateBlogInfo,
} from "../../../features/blogs/blogInfoSlice";
import { MdCloudUpload } from "react-icons/md";
import TruncatedText from "../../../components/TruncatedText";

let schema = yup.object().shape({
  title: yup.string().required(" "),
  content: yup.string().required(" "),
});

const BlogBanner = () => {
  const dispatch = useDispatch();

  const { isLoading, blogText, isSuccess } = useSelector(
    (state) => state.blogText
  );

  const [previewImage, setPreviewImage] = useState();

  const {
    handleSubmit,
    register,
    watch,
    reset,
    setValue,
    trigger,
    formState: { errors, isDirty },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: blogText,
  });

  useEffect(() => {
    trigger();
  }, [watch("title"), watch("content")]);

  useEffect(() => {
    dispatch(getBlogInfo());
  }, [dispatch]);

  useEffect(() => {
    dispatch(addValidation(false));
    dispatch(RESET());
    setPreviewImage();
  }, [isSuccess, dispatch]);

  useEffect(() => {
    if (blogText) {
      reset(blogText);
    }
  }, [blogText]);

  const onSubmit = handleSubmit(async (values) => {
    const formData = new FormData();

    if (previewImage) {
      formData.append("image", values.image);
    }
    formData.append("title", values.title);
    formData.append("content", values.content);
    dispatch(updateBlogInfo(formData));
  });

  const handleClick = () => {
    if (Object.keys(errors).length > 0) {
      dispatch(addValidation(true));
    } else {
      dispatch(addValidation(false));
    }
  };

  const handleImageChange = (e) => {
    const selectedImage = e.target.files[0];
    setValue("image", selectedImage);
    const preview = URL.createObjectURL(selectedImage);
    setPreviewImage(preview);
  };

  console.log(blogText);

  return (
    <>
      <Meta title="Blog info" />
      <div className="w-full rounded-lg bg-white p-2">
        <h3 className="text-sm md:text-base text-center text-zinc-600 font-semibold px-4 my-3">
          Xəbərlər və Yeniliklər başlığı
        </h3>
        <hr className="my-2" />
        {blogText && (
          <form
            action=""
            className="flex flex-col space-y-3 gap-1 px-4"
            onSubmit={handleSubmit(onSubmit)}
            noValidate
          >
            <div className=" p-2 rounded-md flex flex-col  gap-3">
              <input
                className="hidden"
                id="photo"
                type="file"
                accept="image/*"
                onChange={(e) => handleImageChange(e)}
              />
              <label
                htmlFor="photo"
                className="flex items-center  mb-2 text-base  cursor-pointer font-medium text-gray-900 dark:text-white"
              >
                <MdCloudUpload className="me-2 text-xl" /> Banner
              </label>
              <div
                className="bg-center bg-cover bg-no-repeat bg-blend-multiply w-full mb-5"
                style={{
                  backgroundImage: `url("${previewImage ?? blogText.image}")`,
                }}
              >
                <div className="py-20 px-4 mx-auto  text-center lg:py-20 z-10 relative ">
                  <h1 className="mb-4 text-2xl font-extrabold tracking-tight leading-none text-zinc-800 md:text-5xl lg:text-6xl dark:text-white">
                    {blogText.title}
                  </h1>
                  <div className="md:mb-8  font-medium tracking-wide text-zinc-700 text-base lg:text-xl sm:px-10 lg:px-40 dark:text-gray-200">
                    <TruncatedText text={blogText.content || ""} />
                  </div>
                </div>
              </div>
            </div>

            <FormInput
              register={register("title")}
              errors={errors.title}
              label="Başlıq"
              placeholder="Başlıq..."
            />

            <FormTextarea
              register={register("content")}
              errors={errors.content}
              label="Content"
              rows={5}
              classInput="max-h-[300px] p-2"
              placeholder="content daxil edin..."
            />

            <div className="flex items-center justify-center">
              <Button
                onClick={() => handleClick()}
                classBtn="border-0 w-24 !rounded-full "
                type="submit"
                disabled={previewImage ? false : !isDirty || isLoading}
                isLoading={isLoading}
                label="Yenilə"
              />
            </div>
          </form>
        )}
      </div>
    </>
  );
};

export default BlogBanner;
