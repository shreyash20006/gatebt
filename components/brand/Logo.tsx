import Image from "next/image";
import Link from "next/link";

export default function Logo({ h = 40 }: { h?: number }) {
  return (
    <Link href="/" className="flex items-center gap-2 shrink-0">
      <Image
        src="https://res.cloudinary.com/dsqxboxoc/image/upload/v1784742553/file_000000006ac482079fec338c6f263639_vebrw3.png"
        alt="GateBT Prep"
        width={h * 3}
        height={h}
        style={{ height: h, width: "auto" }}
        priority
      />
    </Link>
  );
}
