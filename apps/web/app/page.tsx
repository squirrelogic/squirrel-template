export default async function Home(): Promise<React.ReactElement> {
  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-80px)]">
      <h1 className="text-4xl font-bold mb-8">Welcome to Squirrel</h1>
      <div className="space-y-4">
        <button className="block w-full px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-600">
          Login
        </button>
        <button className="block w-full px-4 py-2 text-blue-500 border border-blue-500 rounded hover:bg-blue-50">
          Register
        </button>
      </div>
    </div>
  );
}
