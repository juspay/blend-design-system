import Link from 'next/link'

export default function LaunchVideoSection() {
    return (
        <div className="flex items-center justify-center py-5 px-8 border-t border-gray-200 bg-gray-50">
            <Link
                href="#"
                className="inline-flex items-center gap-3 text-gray-500 hover:text-gray-800 transition-colors font-mono text-sm group"
            >
                <span>🎉</span>
                <span className="text-sm">Blend&apos;s Launch Video</span>
                <span className="text-gray-400">&rarr;</span>
                <svg
                    width="20"
                    height="14"
                    viewBox="0 0 20 14"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="text-red-600"
                >
                    <path
                        d="M19.543 2.15A2.506 2.506 0 0017.78.382C16.222 0 10 0 10 0S3.778 0 2.22.382A2.506 2.506 0 00.457 2.15C0 3.715 0 7 0 7s0 3.285.457 4.85a2.506 2.506 0 001.763 1.768C3.778 14 10 14 10 14s6.222 0 7.78-.382a2.506 2.506 0 001.763-1.768C20 10.285 20 7 20 7s0-3.285-.457-4.85z"
                        fill="currentColor"
                    />
                    <path d="M8 10l5.196-3L8 4v6z" fill="white" />
                </svg>
            </Link>
        </div>
    )
}
