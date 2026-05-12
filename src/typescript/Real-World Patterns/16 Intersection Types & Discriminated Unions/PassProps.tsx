import { AsyncView } from "./Patterns";

// Usage — TypeScript should infer T from renderSuccess
type User = { name: string; email: string };
type LoadingState = { status: "loading" };
type SuccessState<T> = { status: "success"; data: T };
type ErrorState = { status: "error"; message: string };
type RequestState<T> = LoadingState | SuccessState<T> | ErrorState;
const userState: RequestState<User> = {
  status: "success",
  data: { name: "Prashant", email: "p@test.com" },
};

const PassProps = () => {
  return (
    <AsyncView state={userState} renderSuccess={(user) => <p>{user.name}</p>} />
  );
};

export default PassProps;
