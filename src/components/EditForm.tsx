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
import { EventData } from "@/app/events/[slug]/page";
import { telegramNotify, updateEvent } from "@/app/actions/actions";

const formSchema = z.object({
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

export default function EditEventForm({ event }: { event: EventData }) {
  const [croppedImage, setCroppedImage] = useState<string | null>(null);
  const [reflect, setReflect] = useState<boolean>(false);
  const [customMessage, setCustomMessage] = useState<string>("");
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: event?.title || "",
      venue: event?.venue || "",
      endDate:
        new Date(event?.endDate).toISOString().substring(0, 16) ||
        new Date().toISOString(),
      eventStatus: event?.eventStatus || "",
      description: event?.description || "",
      startDate:
        new Date(event?.startDate).toISOString().substring(0, 16) ||
        new Date().toISOString(),
      image: event?.image || "",
      theme: event?.theme || "",
    },
  });
  console.log(form.formState.defaultValues);
  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      await updateEvent(event.id, values);
      toast.success("Event updated successfully");
      if (reflect && customMessage) {
        const res = await telegramNotify(customMessage);
        if (res) {
          toast.success("Telegram notification sent successfully");
        }
      }
    } catch (error) {
      console.error("Form submission error", error);
      toast.error("Failed to submit the form. Please try again.");
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
                    disabled
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
                      <SelectItem value="m@example.com">
                        m@example.com
                      </SelectItem>
                      <SelectItem value="m@google.com">m@google.com</SelectItem>
                      <SelectItem value="m@support.com">
                        m@support.com
                      </SelectItem>
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
        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-3 h-12">
            <div className="flex items-center gap-1">
              <input
                type="checkbox"
                checked={reflect}
                onChange={() => setReflect((prev) => !prev)}
              />
              <span className="text-sm w-max">Reflect on telegram</span>
            </div>
            {reflect && (
              <Input
                placeholder="Custom message for telegram..."
                defaultValue={customMessage}
                onChange={(e) => setCustomMessage(e.currentTarget.value)}
              />
            )}
          </div>
          <Button className="w-full h-10" type="submit">
            Update
          </Button>
        </div>
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
        <Button
          variant={"secondary"}
          type="button"
          onClick={() => setOpen(true)}
        >
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
