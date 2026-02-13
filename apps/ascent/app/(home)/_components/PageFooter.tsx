import Link from 'next/link'
import { EXTERNAL_LINKS } from './constants/links'

export default function PageFooter() {
    return (
        <footer className="w-full border-x border-b border-gray-200">
            <div className="px-6 lg:px-8 py-6">
                <div className="flex flex-col sm:flex-row justify-between items-center gap-4 text-sm text-gray-500">
                    {/* Copyright */}
                    <p>
                        Copyright &copy; 2024. Juspay Technologies. All rights
                        reserved
                    </p>

                    {/* Links */}
                    <div className="flex items-center gap-1.5">
                        <Link
                            href={EXTERNAL_LINKS.privacyPolicy}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="hover:text-gray-900 transition-colors"
                        >
                            Privacy Policy
                        </Link>
                        <span className="text-gray-300">&middot;</span>
                        <Link
                            href={EXTERNAL_LINKS.termsOfService}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="hover:text-gray-900 transition-colors"
                        >
                            Terms of Service
                        </Link>
                    </div>
                </div>
            </div>
        </footer>
    )
}
