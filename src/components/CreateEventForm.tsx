"use client";
import { useState } from "react";
import { toast } from "sonner";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import ImageInput from "./CropImage";
import Image from "next/image";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";
import { Loader2 } from "lucide-react";
import { generateImage } from "@/lib/imageGenerator";
import { createEvent } from "@/app/actions/actions";
import { uploadImagetoCloudinary } from "@/lib/uploadImageToCloudinary";

export const createFormSchema = z.object({
  title: z
    .string()
    .min(1, "Title is required")
    .max(100, "Title must be 100 characters or less"),
  description: z
    .string()
    .min(1, "Description is required")
    .max(500, "Description must be 500 characters or less"),
  venue: z.string().min(1),
  startDate: z.string(),
  endDate: z.string(),
  eventStatus: z.enum(["DRAFT", "PUBLISHED"]),
  image: z.string(),
  theme: z.string(),
});

export default function CreateEventForm() {
  const [croppedImage, setCroppedImage] = useState<string | null>(null);
  const form = useForm<z.infer<typeof createFormSchema>>({
    resolver: zodResolver(createFormSchema),
    defaultValues: {
      title: "Diversion tech",
      venue: "Sector 5",
      eventStatus: "PUBLISHED",
      description: "Organized by IEM Calcutta",
      startDate: new Date().toISOString(),
      endDate: new Date().toISOString(),
      image: "",
      theme: "Retro",
    },
  });
  const [isLoading, setIsLoading] = useState(false);
  async function onSubmit(values: z.infer<typeof createFormSchema>) {
    try {
      setIsLoading(true);
      if (!croppedImage) throw new Error("Image not uploaded yet");
      const result = createFormSchema.safeParse(values);
      if (!result.success) {
        throw new Error("Validation failed");
      }
      result.data.image = (await uploadImagetoCloudinary(
        croppedImage
      )) as string;

      const { error } = await createEvent(result.data);
      if (error) {
        throw new Error("Failed to create event");
      }
      toast.success("Event created successfully");
      form.reset();
    } catch (error) {
      console.error("Form submission error", error);
      toast.error("Failed to submit the form. Please try again.");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-8 px-10  py-4"
      >
        <div className="grid-cols-2 grid gap-4">
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Title</FormLabel>
                <FormControl>
                  <Input
                    placeholder=""
                    className="w-full"
                    type="text"
                    {...field}
                  />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="theme"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Theme</FormLabel>
                <FormControl>
                  <Input
                    placeholder=""
                    className="w-full"
                    type="text"
                    {...field}
                  />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="image"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Image URL</FormLabel>
                <FormControl className="flex flex-col gap-2">
                  <div>
                    <ImageInput
                      src={croppedImage || field.value}
                      onImageCropped={setCroppedImage}
                    />
                    <GenerateImageDialog />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="flex gap-6 flex-col">
            <FormField
              control={form.control}
              name="venue"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Venue</FormLabel>
                  <FormControl>
                    <Input
                      placeholder=""
                      className="w-full"
                      type="text"
                      {...field}
                    />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="startDate"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>Start Date</FormLabel>
                  <Input type="datetime-local" {...field} />

                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="endDate"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>End Data</FormLabel>
                  <Input type="datetime-local" {...field} />

                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="eventStatus"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Event Status</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="DRAFT">Draft</SelectItem>
                      <SelectItem value="PUBLISHED">Published</SelectItem>
                    </SelectContent>
                  </Select>

                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea
                      rows={5}
                      placeholder=""
                      className="resize-none"
                      {...field}
                    />
                  </FormControl>

                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>
        <Button className="w-full h-10 flex items-center gap-1" type="submit">
          {isLoading ? (
            <>
              <Loader2 className="animate-spin" />
              Creating...
            </>
          ) : (
            "Create"
          )}
        </Button>
      </form>
    </Form>
  );
  function GenerateImageDialog() {
    const [open, setOpen] = useState(false);
    const [prompt, setPrompt] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    async function handleClick() {
      setIsLoading(true);
      // TODO
      const promptData = {
        title: prompt,
        description: form.getValues("description"),
        theme: form.getValues("theme"),
      };
      try {
        const base64 = await generateImage(promptData);
        console.log(base64);
        if (base64) {
          setCroppedImage(base64);
          setIsLoading(false);
          setOpen(false);
        }
      } catch (e) {
        console.error(e);
      } finally {
        setIsLoading(false);
      }
    }

    return (
      <>
        <Button type="button" onClick={() => setOpen(true)}>
          Generate with AI
        </Button>
        <Dialog modal open={open} onOpenChange={setOpen}>
          <div>
            <DialogContent className="p-4 sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Generate Image</DialogTitle>
                <DialogDescription>
                  Enter a prompt to generate an image for your event.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="flex flex-col items-center justify-center gap-4">
                  <Input
                    value={prompt}
                    onChange={(e) => setPrompt(e.target.value)}
                    placeholder="Enter prompt..."
                  />
                  <Image
                    src={croppedImage || "https://picsum.photos/1080/1080"}
                    alt="Generative ai image"
                    className="aspect-square w-fit object-cover"
                    width={0}
                    height={0}
                    sizes="100vw"
                  />
                  <Button
                    onClick={() => handleClick()}
                    disabled={!prompt}
                    className="flex items-center gap-1"
                  >
                    {isLoading ? (
                      <>
                        <Loader2 className="animate-spin" />
                        Generating
                      </>
                    ) : (
                      "Generate"
                    )}
                  </Button>
                </div>
              </div>
            </DialogContent>
          </div>
        </Dialog>
      </>
    );
  }
}
