import { auth } from "@/lib/firebase/config";
import { LoginResponse, UserRole, UserStatus } from "@/types";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
  User,
} from "firebase/auth";
import { useRouter } from "next/navigation";
import { createContext, useContext, useEffect, useState } from "react";
import { authService } from "@/lib/api/auth.service";
import axiosInstance from "@/lib/api/axios";
import { DEMO_CREDENTIALS } from "@/lib/config";

const isDemoAccount = (email: string, password: string) =>
  Object.values(DEMO_CREDENTIALS).some(
    (demo) => demo.email === email && demo.password === password
  );

interface AuthContextType {
  user: User | null;
  loading: boolean;
  userRole: UserRole | null;
  userStatus: UserStatus | null;
  userData: LoginResponse | null;
  signup: (
    email: string,
    password: string,
    displayName: string
  ) => Promise<
    | {
        uid: string;
      }
    | undefined
  >;

  login: (email: string, password: string) => Promise<LoginResponse>;
  logout: () => Promise<void>;
  resetPassword: (email: string) => Promise<void>;
  resendVerificationEmail: () => Promise<void>;
  refreshUser: () => Promise<void>;
  refreshUserData: () => Promise<void>;
  updateUserStatus: (status: UserStatus) => void;
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
  const [userStatus, setUserStatus] = useState<UserStatus | null>(null);
  const [userRole, setUserRole] = useState<UserRole | null>(null);
  const [userData, setUserData] = useState<LoginResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  const fetchUserProfile = async () => {
    try {
      const profile = await authService.getUserProfile();
      const details = await authService.getUserDetails(profile.role);

      const fullUserData: LoginResponse = {
        uid: profile.uid,
        id: profile.userId,
        email: profile.email,
        role: profile.role,
        name: details?.name || "",
        status: details?.status,
        image: (details as any)?.image || (details as any)?.avatar,
      } as any;

      setUserData(fullUserData);
      setUserRole(profile.role);
      setUserStatus(details?.status || null);

      return fullUserData;
    } catch (error) {
      console.error("Error fetching user profile:", error);
      return null;
    }
  };

  useEffect(() => {
    const hasUnsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (!firebaseUser) {
        setUser(null);
        setUserData(null);
        setUserRole(null);
        setUserStatus(null);
        delete axiosInstance.defaults.headers.common["Authorization"];
        setLoading(false);
        return;
      }

      setUser(firebaseUser);

      const token = await firebaseUser.getIdToken();
      axiosInstance.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${token}`;

      if (firebaseUser.emailVerified) {
        await fetchUserProfile();
      }
      setLoading(false);
    });

    return hasUnsubscribe;
  }, []);

  const signup = async (
    email: string,
    password: string,
    displayName: string
  ): Promise<{ uid: string } | undefined> => {
    const userCredentials = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );

    if (userCredentials.user) {
      await updateProfile(userCredentials.user, { displayName });

      await authService.sendVerificationEmail(
        userCredentials.user.uid,
        email,
        displayName
      );

      return { uid: userCredentials.user.uid };
    }
  };

  const login = async (email: string, password: string) => {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );

    const demoAllowed = isDemoAccount(email, password);

    if (!userCredential.user.emailVerified && !demoAllowed) {
      await signOut(auth);
      throw new Error("Please verify your email before logging in");
    }

    const token = await userCredential.user.getIdToken();
    axiosInstance.defaults.headers.common["Authorization"] = `Bearer ${token}`;

    const response = await authService.login(email, password);

    setUserData(response);
    setUserRole(response.role);
    setUserStatus(response.status || null);

    return response;
  };

  const logout = async () => {
    await signOut(auth);
    setUser(null);
    setUserRole(null);
    setUserStatus(null);
    setUserData(null);

    delete axiosInstance.defaults.headers.common["Authorization"];

    router.replace("/login");
    router.refresh();
  };

  const resetPassword = async (email: string) => {
    try {
      await sendPasswordResetEmail(auth, email, {
        url: `${window.location.origin}/login`,
        handleCodeInApp: true,
      });
    } catch (error: any) {
      throw new Error(error.message);
    }
  };

  const resendVerificationEmail = async () => {
    if (user && !user.emailVerified) {
      try {
        await authService.resendVerification(user.email!, user.uid);
      } catch (error: any) {
        console.error("Resend verification email failed:", error.message);
        throw new Error("Failed to send verification email. Please try again.");
      }
    }
  };

  const refreshUser = async () => {
    if (auth.currentUser) {
      await auth.currentUser.reload();
      setUser({ ...auth.currentUser });
    }
  };

  const refreshUserData = async () => {
    if (user?.emailVerified) {
      await fetchUserProfile();
    }
  };

  const updateUserStatus = (status: UserStatus) => {
    setUserStatus(status);
    if (userData) {
      setUserData((prev) => (prev ? { ...prev, status } : prev));
    }
  };

  const value = {
    user,
    userRole,
    userStatus,
    userData,
    loading,
    login,
    signup,
    logout,
    resetPassword,
    resendVerificationEmail,
    refreshUser,
    refreshUserData,
    updateUserStatus,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
