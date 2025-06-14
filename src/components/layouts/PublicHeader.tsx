import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from '@/components/ui/navigation-menu';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export default function PublicHeader() {
  return (
    <div>
      <header className='border-b bg-blue-200 w-full'>
        <div className='container mx-auto p-4 flex items-center justify-between'>
          <NavigationMenu>
            <NavigationMenuList>
              <NavigationMenuItem>
                <NavigationMenuLink asChild>
                  <Link href='/' className='font-bold text-xl'>
                    Blog
                  </Link>
                </NavigationMenuLink>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
          <div className='flex items-center gap-4'>
            <Input placeholder='記事を検索...' className='w-[200px] lg:w-[300px] bg-white' />
            <Button variant='outline' asChild>
              <Link href='/login'>ログイン</Link>
            </Button>
            <Button asChild>
              <Link href='register'>登録</Link>
            </Button>
          </div>
        </div>
      </header>
    </div>
  );
}
