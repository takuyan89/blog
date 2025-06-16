'use client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useActionState } from 'react';
import { authenticate } from '@/lib/actions/authenticate';

export function LoginForm() {
  const [errorMessage, formAction] = useActionState(authenticate, undefined);
  return (
    <Card className='w-full max-w-md mx-auto'>
      <CardHeader>
        <CardTitle>ログイン</CardTitle>
      </CardHeader>
      <CardContent>
        <form action={formAction} className='space-y-4'>
          <div className='space-y-2'>
            <Label htmlFor='email'>メールアドレス</Label>
            <Input id='email' name='email' type='email' required />
          </div>
          <div className='space-y-2'>
            <Label htmlFor='password'>パスワード</Label>
            <Input id='password' name='password' type='password' required />
          </div>
          <Button type='submit' className='w-full'>
            ログイン
          </Button>
          {errorMessage && (
            <div>
              <p className='text-sm tex text-red-500'>{errorMessage}</p>
            </div>
          )}
        </form>
      </CardContent>
    </Card>
  );
}
