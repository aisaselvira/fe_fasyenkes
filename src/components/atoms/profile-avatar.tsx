import Image from "next/image";

interface ProfileAvatarProps {
    imageUrl?: string;
    name: string;
}

export function ProfileAvatar({imageUrl, name}: ProfileAvatarProps) {
    const initials = name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);

    return (
        <div className="flex items-center justify-center">
            {imageUrl ? (
                <div className="relative h-24 w-24 rounded-full border-4 border-white shadow-md overflow-hidden">
                    <Image src={imageUrl} alt={name} fill className="object-cover rounded-full" />
                </div>
            ) : (
                <div className="h-24 w-24 rounded-full bg-blue-100 flex items-center justify-center text-blue-800 text-xl font-bold border-4 border-white shadow-md">
                    {initials}
                </div>
            )}
        </div>
    );
}
