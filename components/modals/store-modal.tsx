"use client";

import * as z from "zod";
import axios from "axios";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Dialog from "../ui/Dialog";
import { useStoreModal } from "@/hooks/use-store-modal";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "../ui/Form";
import { FormLabel } from "@mui/material";
import Input from "../ui/Input";
import { ButtonComp as Button } from "../ui/Button";
import NewButton from "../ui/NewButton";
import { toast } from "react-hot-toast";

const formSchema = z.object({
  name: z.string().min(1),
});
export const StoreModal = () => {
  const storeModal = useStoreModal();
  const [loading, setLoading] = useState(false);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
    },
  });

  console.log("form", form);
  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    console.log("hi in handler", values);
    try {
      setLoading(true);
      const response = await axios.post("/api/stores", values);
      window.location.assign(`${response.data.id}`);
    } catch (error) {
      toast.error("something went wrong in api call");
    } finally {
    }
  };
  return (
    <Dialog
      open={storeModal.open}
      width="w-2/5"
      title="Create Store"
      description="Add a new store to manage products and categories"
    >
      <div>
        <div className="space-y-4 pb-4 py-2">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input
                        disabled={loading}
                        placeholder="E Commerce.."
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="pt-6 space-x-2 flex items-center justify-end w-full">
                <Button
                  variant="outline"
                  disabled={loading}
                  size="default"
                  onClickBtn={storeModal.handleClose}
                >
                  Cancel
                </Button>

                <NewButton type="submit" variant="default" size="default">
                  Continue{" "}
                </NewButton>
              </div>
            </form>
          </Form>
        </div>
      </div>
    </Dialog>
  );
};
