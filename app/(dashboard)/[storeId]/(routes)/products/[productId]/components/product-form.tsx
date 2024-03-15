"use client";

import React, { useState } from "react";
import { Category, Color, Image, Product, Size } from "@prisma/client";
import axios from "axios";
import { useForm } from "react-hook-form";
import * as z from "zod";
import Heading from "@/components/ui/Heading";
import NewButton from "@/components/ui/NewButton";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import { useParams, useRouter } from "next/navigation";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import Separator from "@/components/ui/Separator";
import Checkbox from "@mui/material/Checkbox";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/Form";
import Input from "@/components/ui/Input";
import toast from "react-hot-toast";
import AlertModal from "@/components/modals/alert-modal";
import ImageUpload from "@/components/ui/ImageUpload";

const formSchema = z.object({
  name: z.string().min(1),
  images: z.object({ url: z.string() }).array(),
  price: z.coerce.number().min(1),
  categoryId: z.string().min(1),
  sizeId: z.string().min(1),
  colorId: z.string().min(1),
  isFeatured: z.boolean().default(false).optional(),
  isArchived: z.boolean().default(false).optional(),
});

type ProductFormValues = z.infer<typeof formSchema>;

interface ProductFormProps {
  initialData:
    | (Product & {
        images: Image[];
      })
    | null;
  categories: Category[];
  colors: Color[];
  sizes: Size[];
}

const SettingsForm: React.FC<ProductFormProps> = ({
  initialData,
  categories,
  colors,
  sizes,
}) => {
  const [open, setOpen] = useState(false);
  const params = useParams();
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const title = initialData ? "Edit Product" : "Create Product";
  const description = initialData ? "Edit a Product" : "Create a Product";
  const toastMsg = initialData ? "Product updated." : "Product created.";
  const action = initialData ? "Save Changes" : "Create";

  const form = useForm<ProductFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData
      ? {
          ...initialData,
          price: parseFloat(String(initialData.price)),
        }
      : {
          name: "",
          images: [],
          price: 0,
          sizeId: "",
          categoryId: "",
          colorId: "",
          isFeatured: false,
          isArchived: false,
        },
  });

  const onSubmit = async (data: ProductFormValues) => {
    try {
      setLoading(true);
      if (initialData) {
        await axios.patch(
          `/api/${params.storeId}/products/${params.productId}`,
          data
        );
      } else {
        await axios.post(`/api/${params.storeId}/products`, data);
      }

      router.refresh();
      router.push(`/${params.storeId}/products`);
      toast.success(toastMsg);
    } catch (error) {
      toast.error("Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  const onDelete = async () => {
    try {
      setLoading(true);
      await axios.delete(`/api/${params.storeId}/products/${params.productId}`);
      router.refresh();
      router.push("/");
      toast.success("product deleted successfully");
    } catch (error: any) {
      console.log(error);
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
      setOpen(false);
    }
  };
  return (
    <>
      <AlertModal
        isOpen={open}
        onClose={() => setOpen(false)}
        loading={loading}
        onConfirm={onDelete}
      />
      <div className="flex items-center justify-between">
        <Heading title={title} description={description} />
        {initialData && (
          <NewButton
            onClick={() => setOpen(true)}
            variant="destructive"
            size="sm"
            disabled={loading}
          >
            <DeleteOutlineIcon className="h-4 w-4" />
          </NewButton>
        )}
      </div>
      <Separator />
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-8 w-full"
        >
          <FormField
            control={form.control}
            name="images"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Images</FormLabel>
                <FormControl>
                  <ImageUpload
                    value={field.value.map((image) => image.url)}
                    disabled={loading}
                    onChange={(url) =>
                      field.onChange([...field.value, { url }])
                    }
                    onRemove={(url) =>
                      field.onChange([
                        ...field.value.filter((current) => current.url !== url),
                      ])
                    }
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="grid grid-cols-3 gap-8">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input
                      disabled={loading}
                      placeholder="Product Name.."
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="price"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Price</FormLabel>
                  <FormControl>
                    <Input
                      disabled={loading}
                      placeholder="Product Price.."
                      type="number"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="categoryId"
              render={({ field }) => (
                <FormItem>
                  <div className="flex flex-col">
                    <FormLabel>Category</FormLabel>
                    <FormControl>
                      <Select
                        labelId=""
                        disabled={loading}
                        id="demo-simple-select-standard"
                        value={field.value}
                        onChange={field.onChange}
                        defaultValue={field.value}
                        label="Category"
                        sx={{ height: "40px" }}
                      >
                        {categories.map((category) => {
                          return (
                            <MenuItem value={category.id} key={category.id}>
                              {category.name}
                            </MenuItem>
                          );
                        })}
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </div>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="sizeId"
              render={({ field }) => (
                <FormItem>
                  <div className="flex flex-col">
                    <FormLabel>Size</FormLabel>
                    <FormControl>
                      <Select
                        labelId=""
                        disabled={loading}
                        id="demo-simple-select-standard"
                        value={field.value}
                        onChange={field.onChange}
                        defaultValue={field.value}
                        label="Category"
                        sx={{ height: "40px" }}
                      >
                        {sizes.map((size) => {
                          return (
                            <MenuItem value={size.id} key={size.id}>
                              {size.name}
                            </MenuItem>
                          );
                        })}
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </div>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="colorId"
              render={({ field }) => (
                <FormItem>
                  <div className="flex flex-col">
                    <FormLabel>Color</FormLabel>
                    <FormControl>
                      <Select
                        labelId=""
                        disabled={loading}
                        id="demo-simple-select-standard"
                        value={field.value}
                        onChange={field.onChange}
                        defaultValue={field.value}
                        label="Category"
                        sx={{ height: "40px" }}
                      >
                        {colors.map((color) => {
                          return (
                            <MenuItem value={color.id} key={color.id}>
                              {color.name}
                            </MenuItem>
                          );
                        })}
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </div>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="isFeatured"
              render={({ field }) => (
                <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onChange={field.onChange}
                      color={"success"}
                    />
                  </FormControl>
                  <div className="space-y-1 leading-none">
                    <FormLabel>Featured</FormLabel>
                    <FormDescription>
                      This product will appear on the home page
                    </FormDescription>
                  </div>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="isArchived"
              render={({ field }) => (
                <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onChange={field.onChange}
                      color={"success"}
                    />
                  </FormControl>
                  <div className="space-y-1 leading-none">
                    <FormLabel>Archived</FormLabel>
                    <FormDescription>
                      This product will not appear anywhere in the store
                    </FormDescription>
                  </div>
                </FormItem>
              )}
            />
          </div>
          <NewButton
            disabled={loading}
            className="ml-auto"
            variant="default"
            size="default"
            type="submit"
          >
            {action}
          </NewButton>
        </form>
      </Form>
    </>
  );
};

export default SettingsForm;
