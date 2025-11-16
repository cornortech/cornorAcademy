import { auth, db } from "@/lib/firebase/config";
import { UserRole } from "@/types";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  sendEmailVerification,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
  User,
} from "firebase/auth";
import { useRouter } from "next/navigation";
import { createContext, useContext, useEffect, useState } from "react";
import {} from "firebase/database";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { authService, UserProfile } from "@/lib/api/auth.service";

interface AuthContextType {
  user: User | null;
  userProfile: UserProfile | null;
  loading: boolean;
  userRole: UserRole | null;
  signup: (
    email: string,
    password: string,
    displayName: string,
    role: UserRole
  ) => Promise<
    | {
        uid: string;
      }
    | undefined
  >;

  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  resetPassword: (email: string) => Promise<void>;
  resendVerificationEmail: () => Promise<void>;
  refreshUser: () => Promise<void>;
  refreshUserProfile: () => Promise<void>;
  setIsRegistering: (value: boolean) => void;
}

const AuthContext = createContext<AuthContextType>({} as AuthContextType);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<User | null>(null);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [userRole, setUserRole] = useState<UserRole | null>(null);
  const [loading, setLoading] = useState(true);
  const [isRegistering, setIsRegistering] = useState(false);
  const router = useRouter();

  // const fetchUserRole = async (uid: string): Promise<UserRole> => {
  //   try {
  //     const ref = doc(db, "users", uid);
  //     const snapshot = await getDoc(ref);

  //     if (snapshot.exists()) {
  //       return snapshot.data().role as UserRole;
  //     }

  //     return "student";
  //   } catch (error) {
  //     console.error("Error fetching user role:", error);
  //     return "student";
  //   }
  // };

  const fetchUserProfile = async () => {
    try {
      const profile = await authService.getUserProfile();
      setUserProfile(profile);
      setUserRole(profile.role);
      return profile;
    } catch (error) {
      console.error("Error fetching user profile:", error);
      return null;
    }
  };

  useEffect(() => {
    const hasUnsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      setUser(firebaseUser);

      if (firebaseUser) {
        if (isRegistering) {
          console.log("🚧 Registration in progress, skipping profile fetch");
          setLoading(false);
          return;
        }

        const profile = await fetchUserProfile();

        // if (!profile) {
        //   const role = await fetchUserRole(firebaseUser.uid);
        //   setUserRole(role);
        // }
      } else {
        setUserRole(null);
        setUserProfile(null);
      }
      setLoading(false);
    });

    return hasUnsubscribe;
  }, [isRegistering]);

  const signup = async (
    email: string,
    password: string,
    displayName: string
    // role: UserRole
  ): Promise<{ uid: string } | undefined> => {
    try {
      setIsRegistering(true);
      const userCredentials = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      if (userCredentials.user) {
        await updateProfile(userCredentials.user, { displayName });
        // await sendEmailVerification(userCredentials.user);

        return {
          uid: userCredentials.user.uid,
        };
      }
    } catch (error: any) {
      setIsRegistering(false);
      throw new Error(error.message);
    }
  };

  const login = async (email: string, password: string) => {
    try {
      const userCredentials = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );

      await userCredentials.user.reload();

      // if (!userCredentials.user.emailVerified) {
      //   await signOut(auth);
      //   throw new Error(
      //     "Please verify your email before logging in. Check you inbox."
      //   );
      // }

      // const profile = await fetchUserProfile();
      // if (!profile) {
      //   const role = await fetchUserRole(userCredentials.user.uid);
      //   setUserRole(role);
      //   router.push(`/${role}`);
      // } else {
      //   router.push(`/${profile.role}`);
      // }
      router.push("/");
    } catch (error: any) {
      console.error("Login error:", error);
      throw new Error(error.message);
    }
  };

  const logout = async () => {
    try {
      await signOut(auth);
      setUserRole(null);
      setUserProfile(null);
      router.push("/login");
    } catch (error: any) {
      throw new Error(error.message);
    }
  };

  const resetPassword = async (email: string) => {
    try {
      await sendPasswordResetEmail(auth, email);
    } catch (error: any) {
      throw new Error(error.message);
    }
  };

  const resendVerificationEmail = async () => {
    if (user && !user.emailVerified) {
      await sendEmailVerification(user);
    }
  };

  const refreshUser = async () => {
    if (auth.currentUser) {
      await auth.currentUser.reload();
      setUser({ ...auth.currentUser });
    }
  };

  const refreshUserProfile = async () => {
    await fetchUserProfile();
  };

  const value = {
    user,
    userProfile,
    loading,
    userRole,
    signup,
    login,
    logout,
    resetPassword,
    resendVerificationEmail,
    refreshUser,
    refreshUserProfile,
    setIsRegistering,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
