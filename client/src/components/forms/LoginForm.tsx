// src/components/forms/LoginForm.tsx
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
// import { signIn } from 'next-auth/react';
import { Loader2 } from 'lucide-react';
import { authClient } from "@/lib/client-auth"; 

export default function LoginForm() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setError('');

    const formData = new FormData(e.currentTarget);
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;
    // const res = await authClient.login({
    //   email,
    //   password,
    // });
    try {
    const { data, error: apiError } = await authClient.signIn.email({
      email,
      password,
      // callbackURL: "/staff",
      /**
       * remember the user session after the browser is closed. 
       * @default true
       */
        rememberMe: false
      }, {
        //callbacks
      })
      console.log("this is role from Login Page :", data)

      const role = data?.user?.role;
     
      
      if (apiError) {
        setError(apiError.message || 'Sign in failed');
      } else if (data?.user) {
        // Success → redirect
        if (role === "admin") router.push("/admin");
        else if (role === "manager") router.push("/manager");
        else router.push("/staff");
        // router.push("/staff");
        // router.refresh();
      } else {
        setError('Sign in failed. Please try again.');
      }
    } catch (err) {
      console.error(err);
      setError('Network error. Please check your connection.');
    } finally {
      setLoading(false);
    }
  }
    // const result = await signIn('credentials', {
    //   email,
    //   password,
    //   redirect: false,
    // });

    // setLoading(false);

    // if (result?.error) {
    //   setError('Invalid email or password');
    // } else {
    //   router.push('/');
    //   router.refresh();
    // }
  

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      {/* Email */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Email Address
        </label>
        <input
          type="email"
          name="email"
          required
          // defaultValue="admin@company.com"
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
          placeholder="user@gmail.com"
        />
      </div>

      {/* Password */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Password
        </label>
        <input
          type="password"
          name="password"
          required
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
          placeholder="••••••••"
        />
      </div>

      {/* Remember + Forgot */}
      <div className="flex items-center justify-between text-sm">
        <label className="flex items-center gap-2 cursor-pointer">
          <input type="checkbox" className="w-4 h-4 text-blue-600 rounded" />
          <span className="text-gray-600">Remember me</span>
        </label>
        <a href="#" className="text-blue-600 hover:underline">
          Forgot password?
        </a>
      </div>

      {/* Error Message */}
      {error && (
        <div className="bg-red-50 text-red-600 px-4 py-3 rounded-lg text-sm text-center">
          {error}
        </div>
      )}

      {/* Submit Button */}
      <button
        type="submit"
        disabled={loading}
        className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold py-4 rounded-lg hover:shadow-lg transform hover:scale-[1.02] transition disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-3"
      >
        {loading ? (
          <>
            <Loader2 className="w-5 h-5 animate-spin" />
            Signing in...
          </>
        ) : (
          'Sign In'
        )}
      </button>
    </form>
  );
}