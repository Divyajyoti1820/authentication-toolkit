import { auth, signOut } from "@/auth";

const SettingsPage = async () => {
  const session = await auth();
  return (
    <div className="h-full flex items-center flex-col gap-4 justify-center bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-emerald-500 to-emerald-800">
      <h1 className="text-5xl font-bold text-white drop-shadow-md">
        PROTECTED ROUTE
      </h1>
      <p className="w-[80%] text-center text-sm text-white font-medium">
        {JSON.stringify(session)}
      </p>
      <form
        action={async () => {
          "use server";
          await signOut();
        }}
      >
        <button className="px-4 py-2 rounded-md text-lg text-semibold bg-rose-500 hover:bg-rose-600 text-white transition-all">
          Sign Out
        </button>
      </form>
    </div>
  );
};

export default SettingsPage;
