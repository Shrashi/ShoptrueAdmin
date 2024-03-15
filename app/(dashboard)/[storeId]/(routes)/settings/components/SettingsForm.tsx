"use client";

import React, { useState } from "react";
import { Store } from "@prisma/client";
import axios from "axios";
import { useForm } from "react-hook-form";
import * as z from "zod";
import Heading from "@/components/ui/Heading";
import NewButton from "@/components/ui/NewButton";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import { useParams, useRouter } from "next/navigation";
import Separator from "@/components/ui/Separator";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/Form";
import Input from "@/components/ui/Input";
import toast from "react-hot-toast";
import AlertModal from "@/components/modals/alert-modal";
import ApiAlert from "@/components/ui/ApiAlert";
import { useOrigin } from "@/hooks/use-origin";

interface SettingFormProps {
  initialData: Store;
}

const formSchema = z.object({
  name: z.string().min(1),
});

type SettingFormValues = z.infer<typeof formSchema>;

const SettingsForm: React.FC<SettingFormProps> = ({ initialData }) => {
  const [open, setOpen] = useState(false);
  const params = useParams();
  const router = useRouter();
  const origin = useOrigin();
  const [loading, setLoading] = useState(false);
  const form = useForm<SettingFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData,
  });

  const onSubmit = async (data: SettingFormValues) => {
    try {
      setLoading(true);
      await axios.patch(`/api/stores/${params.storeId}`, data);
      router.refresh();
      toast.success("Store has been updated.");
    } catch (error) {
      toast.error("Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  const onDelete = async () => {
    try {
      setLoading(true);
      await axios.delete(`/api/stores/${params.storeId}`);
      router.refresh();
      router.push("/");
      toast.success("store deleted successfully");
    } catch (error: any) {
      console.log(error);
      toast.error("make sure you removed all categories and products first");
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
        <Heading title="Settings" description="Manage Store Preferences" />
        <NewButton
          onClick={() => setOpen(true)}
          variant="destructive"
          size="sm"
          disabled={loading}
        >
          <DeleteOutlineIcon className="h-4 w-4" />
        </NewButton>
      </div>
      <Separator />
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-8 w-full"
        >
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
                      placeholder="Store Name.."
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
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
            Save Changes
          </NewButton>
        </form>
      </Form>
      <Separator />
      <ApiAlert
        title="NEXT_PUBLIC_API_URL"
        description={`${origin}/api/${params.storeId}`}
        variant="public"
      />
    </>
  );
};

export default SettingsForm;
