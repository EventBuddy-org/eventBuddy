import CreateEventForm from "./CreateEventForm";

export default function CreateEvent() {
  return (
    <div className="max-w-5xl rounded-lg border mx-auto w-full my-2">
      <h1 className="text-2xl font-bold p-4 text-center my-5">Create Event</h1>
      <CreateEventForm />
    </div>
  );
}
