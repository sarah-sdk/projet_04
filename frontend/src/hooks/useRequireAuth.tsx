import { useAuth } from "../contexts/AuthContext";

export function useRequireAuth() {
  const auth = useAuth();

  if (!auth.user) {
    throw new Error(
      "useRequireAuth doit être utilisé avec un utilisateur connecté",
    );
  }

  return {
    ...auth,
    user: auth.user,
  };
}
