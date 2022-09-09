import { JSX } from "solid-js";
import { SignIn } from "~/modules/SignIn/SignIn";

// export const routeData = () => {
//   return createServerData((_, { request }) => {
//     console.log("indexRouteData", request);
//     // if (await getUser(request)) {
//     //   throw redirect("/");
//     // }
//     return {};
//   });
// };

// const action = async (form: FormData) => {
//   const loginType = form.get("loginType");
//   const username = form.get("username");
//   const password = form.get("password");
//   const redirectTo = form.get("redirectTo") || "/";
//   if (
//     typeof loginType !== "string" ||
//     typeof username !== "string" ||
//     typeof password !== "string" ||
//     typeof redirectTo !== "string"
//   ) {
//     throw new FormError(`Form not submitted correctly.`);
//   }

//   const fields = { loginType, username, password };
//   const fieldErrors = {
//     username: validateUsername(username),
//     password: validatePassword(password),
//   };
//   if (Object.values(fieldErrors).some(Boolean)) {
//     throw new FormError("Fields invalid", { fieldErrors, fields });
//   }

//   switch (loginType) {
//     case "login": {
//       const user = await login({ username, password });
//       if (!user) {
//         throw new FormError(`Username/Password combination is incorrect`, {
//           fields,
//         });
//       }
//       return createUserSession(`${user.id}`, redirectTo);
//     }
//     case "register": {
//       const userExists = await db.user.findUnique({ where: { username } });
//       if (userExists) {
//         throw new FormError(`User with username ${username} already exists`, {
//           fields,
//         });
//       }
//       const user = await register({ username, password });
//       if (!user) {
//         throw new FormError(
//           `Something went wrong trying to create a new user.`,
//           {
//             fields,
//           }
//         );
//       }
//       return createUserSession(`${user.id}`, redirectTo);
//     }
//     default: {
//       throw new FormError(`Login type invalid`, { fields });
//     }
//   }
// };

const Login = (): JSX.Element => {
  // const data = useRouteData<typeof routeData>();
  // const params = useParams();

  // const [loggingIn, { Form }] = createServerAction(action);

  return (
    <main>
      <SignIn />
    </main>
  );
};

export default Login;
