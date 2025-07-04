'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { FaSignInAlt } from 'react-icons/fa';

export default function LoginPage() {
  const router = useRouter();
  const [user, setUser] = useState({
    email: '',
    password: '',
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUser((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const res = await axios.post('/api/users/login', user);
      if (res.status === 200 && res.data.user?.id) {
        router.push(`/profile/${res.data.user.id}`);
      }
    } catch (err: unknown) {
      let msg = 'Login failed';
      if (
        err &&
        typeof err === 'object' &&
        'response' in err &&
        err.response &&
        typeof err.response === 'object' &&
        'data' in err.response &&
        err.response.data &&
        typeof err.response.data === 'object' &&
        'error' in err.response.data
      ) {
        msg = (err.response.data as { error?: string }).error || msg;
      } else if (err instanceof Error) {
        msg = err.message;
      }
      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 p-4">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="w-full max-w-md"
      >
        <Card className="bg-white/5 backdrop-blur-md border border-gray-700 shadow-2xl rounded-2xl">
          <CardHeader className="flex flex-col items-center gap-2">
            <span className="bg-blue-600 text-white rounded-full p-4 shadow-lg">
              <FaSignInAlt size={32} />
            </span>
            <CardTitle className="text-2xl font-extrabold text-white">Login</CardTitle>
            <p className="text-gray-300 text-sm">Welcome back! Please login to your account.</p>
          </CardHeader>
          <CardContent>
            {error && (
              <div className="mb-4 p-3 text-sm text-red-500 bg-red-500/10 rounded-lg" role="alert" tabIndex={-1} aria-live="assertive">
                {error}
              </div>
            )}
            <form onSubmit={handleLogin} className="space-y-6" noValidate>
              <div>
                <Input
                  type="email"
                  name="email"
                  value={user.email}
                  onChange={handleChange}
                  placeholder="Email"
                  required
                />
              </div>
              <div className="relative">
                <Input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={user.password}
                  onChange={handleChange}
                  placeholder="Password"
                  required
                  className="pr-10"
                />
                <button
                  type="button"
                  tabIndex={0}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 focus:outline-none"
                  onClick={() => setShowPassword((prev) => !prev)}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? <FaSignInAlt /> : <FaSignInAlt />}
                </button>
              </div>
              <motion.div
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
                className="w-full"
              >
                <Button
                  type="submit"
                  disabled={loading}
                  className="w-full py-3 text-lg font-semibold bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 shadow-lg"
                  aria-disabled={loading}
                >
                  {loading ? (
                    <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"></path>
                    </svg>
                  ) : (
                    "Login"
                  )}
                </Button>
              </motion.div>
            </form>
            <div className="mt-8 text-center text-sm">
              <p className="text-gray-400">
                Don&apos;t have an account?{' '}
                <Link href="/signup" className="text-blue-400 hover:text-blue-300 underline">
                  Signup here
                </Link>
              </p>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
