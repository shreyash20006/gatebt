import Image from "next/image";
import Link from "next/link";

interface LogoProps {
  h?: number;
  size?: 'sm' | 'md' | 'lg';
  showTagline?: boolean;
  onClick?: () => void;
}

export default function Logo({ h, size = 'md', showTagline, onClick }: LogoProps) {
  const height = h || (size === 'sm' ? 32 : size === 'lg' ? 48 : 40);
  return (
    <Link href="/" onClick={onClick} className="flex items-center gap-2 shrink-0">
      <Image
        src="https://res.cloudinary.com/dsqxboxoc/image/upload/v1784742553/file_000000006ac482079fec338c6f263639_vebrw3.png"
        alt="GateBT Prep"
        width={height * 3}
        height={height}
        style={{ height, width: "auto" }}
        priority
      />
    </Link>
  );
}
