import Image from "next/image";
import Display from './homer/page'
export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
<Display/>
    </main>
  );
}
