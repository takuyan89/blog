'use client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useActionState } from 'react';
import { createUser } from '@/lib/actions/createUser';

export default function RegisterForm() {
  const [state, formAction] = useActionState(createUser, {
    success: false,
    errors: {},
  });
  return (
    <Card>
      <CardHeader>
        <CardTitle>ユーザー登録</CardTitle>
      </CardHeader>
      <CardContent>
        <form action={formAction} className='space-y-4'>
          <div className='space-y-2'>
            <Label htmlFor='name'>名前</Label>
            <Input id='name' type='text' name='name' required />
            {state.errors.name && <p className='text-sm text-red-500 mt-1'>{state.errors.name.join(',')}</p>}
          </div>
          <div className='space-y-2'>
            <Label htmlFor='email'>メールアドレス</Label>
            <Input id='email' type='text' name='email' required />
            {state.errors.email && <p className='text-sm text-red-500 mt-1'>{state.errors.email.join(',')}</p>}
          </div>
          <div className='space-y-2'>
            <Label htmlFor='password'>パスワード</Label>
            <Input id='password' type='password' name='password' required />
            {state.errors.password && <p className='text-sm text-red-500 mt-1'>{state.errors.password.join(',')}</p>}
          </div>
          <div className='space-y-2'>
            <Label htmlFor='confirmPassword'>パスワード（確認）</Label>
            <Input id='confirmPassword' type='password' name='confirmPassword' required />
            {state.errors.confirmPassword && (
              <p className='text-sm text-red-500 mt-1'>{state.errors.confirmPassword.join(',')}</p>
            )}
          </div>
          <Button type='submit' className='w-full'>
            登録
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
