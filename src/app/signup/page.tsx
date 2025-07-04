'use client';

import Link from 'next/link';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import { FaEye, FaEyeSlash, FaUserPlus } from 'react-icons/fa';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

export default function SignupPage() {
  
  const [user, setUser] = useState({
    username: '',
    email: '',
    password: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [success, setSuccess] = useState('');
  const [touched, setTouched] = useState({ username: false, email: false, password: false });
  const router = useRouter();

  // Email validation regex
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  // Password strength
  const getPasswordStrength = (password: string) => {
    if (password.length < 6) return 'Weak';
    if (/^(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*]).{8,}$/.test(password)) return 'Strong';
    if (password.length >= 8) return 'Medium';
    return 'Weak';
  };
  const passwordStrength = getPasswordStrength(user.password);

  // Real-time validation
  const errors = {
    username: !user.username ? 'Username is required' : '',
    email: !user.email ? 'Email is required' : !emailRegex.test(user.email) ? 'Invalid email address' : '',
    password: !user.password
      ? 'Password is required'
      : user.password.length < 6
      ? 'Password must be at least 6 characters'
      : '',
  };
  const isFormValid = !errors.username && !errors.email && !errors.password;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUser((prev) => ({ ...prev, [name]: value }));
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    const { name } = e.target;
    setTouched((prev) => ({ ...prev, [name]: true }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');
    setTouched({ username: true, email: true, password: true });

    if (!isFormValid) {
      setLoading(false);
      return;
    }

    try {
      const response = await axios.post('/api/users/signup', user);
      if (response.status === 201) {
        setSuccess('Registration successful! Redirecting to login...');
        setTimeout(() => {
          router.push('/login?registered=true');
        }, 1500);
      }
    } catch (err: unknown) {
      let msg = 'Registration failed';
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
              <FaUserPlus size={32} />
            </span>
            <CardTitle className="text-2xl font-extrabold text-white">Create Account</CardTitle>
            <p className="text-gray-300 text-sm">Sign up to get started. It's quick and easy.</p>
          </CardHeader>
          <CardContent>
            {error && (
              <div className="mb-4 p-3 text-sm text-red-500 bg-red-500/10 rounded-lg" role="alert" tabIndex={-1} aria-live="assertive">
                {error}
              </div>
            )}
            {success && (
              <div className="mb-4 p-3 text-sm text-green-500 bg-green-500/10 rounded-lg flex items-center gap-2" role="status" tabIndex={-1} aria-live="polite">
                <FaUserPlus /> {success}
              </div>
            )}
            <form onSubmit={handleSubmit} className="space-y-6" noValidate>
              {/* Username */}
              <div>
                <Input
                  type="text"
                  id="username"
                  name="username"
                  value={user.username}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  placeholder="Username"
                  required
                  aria-invalid={!!(errors.username && touched.username)}
                  aria-describedby="username-error"
                  className={errors.username && touched.username ? "border-red-500" : ""}
                />
                {errors.username && touched.username && (
                  <span className="text-xs text-red-400 mt-1 block" id="username-error">
                    {errors.username}
                  </span>
                )}
              </div>
              {/* Email */}
              <div>
                <Input
                  type="email"
                  id="email"
                  name="email"
                  value={user.email}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  placeholder="Email"
                  required
                  aria-invalid={!!(errors.email && touched.email)}
                  aria-describedby="email-error"
                  className={errors.email && touched.email ? "border-red-500" : ""}
                />
                {errors.email && touched.email && (
                  <span className="text-xs text-red-400 mt-1 block" id="email-error">
                    {errors.email}
                  </span>
                )}
              </div>
              {/* Password */}
              <div className="relative">
                <Input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  name="password"
                  value={user.password}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  placeholder="Password"
                  required
                  aria-invalid={!!(errors.password && touched.password)}
                  aria-describedby="password-error password-strength"
                  className={errors.password && touched.password ? "border-red-500 pr-10" : "pr-10"}
                />
                <button
                  type="button"
                  tabIndex={0}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 focus:outline-none"
                  onClick={() => setShowPassword((prev) => !prev)}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
                {errors.password && touched.password && (
                  <span className="text-xs text-red-400 mt-1 block" id="password-error">
                    {errors.password}
                  </span>
                )}
                {user.password && (
                  <span
                    className={`text-xs mt-1 block ${
                      passwordStrength === "Strong"
                        ? "text-green-400"
                        : passwordStrength === "Medium"
                        ? "text-yellow-400"
                        : "text-red-400"
                    }`}
                    id="password-strength"
                  >
                    Password strength: {passwordStrength}
                  </span>
                )}
              </div>
              <motion.div
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
                className="w-full"
              >
                <Button
                  type="submit"
                  disabled={loading || !isFormValid}
                  className="w-full py-3 text-lg font-semibold bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 shadow-lg"
                  aria-disabled={loading || !isFormValid}
                >
                  {loading ? (
                    <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"></path>
                    </svg>
                  ) : (
                    "Sign Up"
                  )}
                </Button>
              </motion.div>
            </form>
            <div className="mt-8 text-center text-sm">
              <p className="text-gray-400">
                Don&apos;t have an account?{' '}
                <Link href="/login" className="text-blue-400 hover:text-blue-300 underline">
                  Login here
                </Link>
              </p>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
