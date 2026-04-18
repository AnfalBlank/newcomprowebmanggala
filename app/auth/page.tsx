'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { signIn, signUp, useSession, signOut } from '@/lib/auth-client'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { AlertCircle, CheckCircle2, UserCircle, LogOut, Loader2, ArrowRight } from 'lucide-react'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'

export default function AuthPage() {
  const router = useRouter()
  const { data: session, isPending: sessionPending } = useSession()
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const [loading, setLoading] = useState(false)
  const [roleWarning, setRoleWarning] = useState(false)

  // Clear errors when switching tabs
  const clearMessages = () => {
    setError('')
    setSuccess('')
    setRoleWarning(false)
  }

  // Handle redirect if already logged in as admin
  useEffect(() => {
    if (session?.user && session.user.role === 'admin') {
      router.push('/admin')
    }
  }, [session, router])

  // Sign Up handler
  const handleSignUp = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setError('')
    setSuccess('')
    setLoading(true)

    const formData = new FormData(e.currentTarget)
    const name = formData.get('name') as string
    const email = formData.get('email') as string
    const password = formData.get('password') as string

    try {
      const { data, error } = await signUp.email({
        name,
        email,
        password,
      })

      if (error) {
        setError(error.message || 'Gagal mendaftar. Silakan coba email lain.')
      } else {
        setSuccess('Akun berhasil dibuat! Silakan pindah ke tab "Sign In" untuk masuk.')
      }
    } catch (err) {
      setError('Terjadi kesalahan koneksi saat mendaftar')
    } finally {
      setLoading(false)
    }
  }

  // Sign In handler
  const handleSignIn = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setError('')
    setSuccess('')
    setRoleWarning(false)
    setLoading(true)

    const formData = new FormData(e.currentTarget)
    const email = formData.get('email') as string
    const password = formData.get('password') as string

    try {
      const { data, error } = await signIn.email({
        email,
        password,
      })

      if (error) {
        setError(error.message || 'Email atau password salah')
      } else {
        // Success login - but check role
        // The data might not have the session immediately, so we check the response if possible
        // Better Auth signIn returns the session data in the response
        const userRole = (data as any)?.user?.role || 'user'
        
        if (userRole === 'admin') {
          router.push('/admin')
          router.refresh()
        } else {
          setRoleWarning(true)
          setSuccess('Login Berhasil! Namun akun Anda belum memiliki hak akses Admin.')
        }
      }
    } catch (err) {
      setError('Gagal menghubungi server autentikasi')
    } finally {
      setLoading(false)
    }
  }

  if (sessionPending) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-muted/30">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    )
  }

  if (session?.user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-muted/30 px-4 py-12">
        <Card className="w-full max-w-md shadow-lg border-none text-center">
          <CardHeader>
            <div className="mx-auto mb-4 bg-primary/10 p-3 rounded-full">
              <UserCircle className="w-12 h-12 text-primary" />
            </div>
            <CardTitle className="text-2xl font-bold">Halo, {session.user.name}</CardTitle>
            <CardDescription>Anda sudah masuk sebagai <strong>{session.user.email}</strong></CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Alert className={session.user.role === 'admin' ? "bg-green-50 border-green-200" : "bg-orange-50 border-orange-200"}>
              <AlertDescription className="text-sm">
                Role Anda saat ini: <span className="font-bold uppercase">{session.user.role}</span>
              </AlertDescription>
            </Alert>
            
            {session.user.role === 'admin' ? (
              <Button onClick={() => router.push('/admin')} className="w-full">
                Masuk ke Dashboard <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
            ) : (
              <div className="space-y-4">
                <p className="text-sm text-muted-foreground italic">
                  Akun Anda belum memiliki akses Admin. Silakan gunakan tab <strong>Database</strong> di panel Yapi untuk memberikan role admin ke email Anda.
                </p>
                <Button variant="outline" onClick={() => router.push('/')} className="w-full">
                  Kembali ke Beranda
                </Button>
              </div>
            )}
            
            <Button variant="ghost" onClick={() => signOut()} className="w-full text-destructive">
              <LogOut className="mr-2 w-4 h-4" /> Sign Out
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-muted/30 px-4 py-12">
      <Card className="w-full max-w-md shadow-lg border-none">
        <CardHeader className="text-center space-y-1">
          <CardTitle className="text-2xl font-bold text-primary">PT. Manggala Utama Indonesia</CardTitle>
          <CardDescription>Pusat Autentikasi Staf & Admin</CardDescription>
        </CardHeader>
        <CardContent>
          {error && (
            <Alert variant="destructive" className="mb-6">
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>Error</AlertTitle>
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          {success && (
            <Alert className={`mb-6 ${roleWarning ? 'border-orange-500 text-orange-700 bg-orange-50' : 'border-green-500 text-green-700 bg-green-50'}`}>
              <CheckCircle2 className={`h-4 w-4 ${roleWarning ? 'text-orange-600' : 'text-green-600'}`} />
              <AlertTitle>{roleWarning ? 'Akses Terbatas' : 'Berhasil'}</AlertTitle>
              <AlertDescription>{success}</AlertDescription>
            </Alert>
          )}

          <Tabs defaultValue="signin" className="w-full" onValueChange={clearMessages}>
            <TabsList className="grid w-full grid-cols-2 mb-8">
              <TabsTrigger value="signin">Sign In</TabsTrigger>
              <TabsTrigger value="signup">Sign Up</TabsTrigger>
            </TabsList>

            <TabsContent value="signin" className="space-y-4">
              <form onSubmit={handleSignIn} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="signin-email">Email</Label>
                  <Input
                    id="signin-email"
                    name="email"
                    type="email"
                    placeholder="nama@perusahaan.com"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="signin-password">Password</Label>
                  <Input
                    id="signin-password"
                    name="password"
                    type="password"
                    placeholder="••••••••"
                    required
                  />
                </div>
                <Button type="submit" className="w-full font-bold" disabled={loading}>
                  {loading ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : null}
                  {loading ? 'Memproses...' : 'Sign In'}
                </Button>
              </form>
            </TabsContent>

            <TabsContent value="signup" className="space-y-4">
              <form onSubmit={handleSignUp} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="signup-name">Nama Lengkap</Label>
                  <Input
                    id="signup-name"
                    name="name"
                    type="text"
                    placeholder="John Doe"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="signup-email">Email Kerja</Label>
                  <Input
                    id="signup-email"
                    name="email"
                    type="email"
                    placeholder="nama@perusahaan.com"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="signup-password">Password</Label>
                  <Input
                    id="signup-password"
                    name="password"
                    type="password"
                    placeholder="Minimal 8 karakter"
                    required
                    minLength={8}
                  />
                </div>
                <Button type="submit" className="w-full font-bold" disabled={loading}>
                  {loading ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : null}
                  {loading ? 'Mendaftarkan...' : 'Daftar Akun'}
                </Button>
              </form>
              <div className="bg-muted p-3 rounded text-[11px] text-muted-foreground mt-4 italic leading-relaxed">
                <p><strong>PENTING:</strong> Akun baru otomatis memiliki role <strong>'user'</strong>. Untuk mengakses Dashboard Admin, Anda harus mengubah role menjadi <strong>'admin'</strong> melalui tab Database di panel Yapi preview.</p>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  )
}
