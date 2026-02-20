import Link from 'next/link'
import { EXTERNAL_LINKS } from './constants/links'

export default function PageFooter() {
    return (
        <footer className="w-full border-x border-t border-gray-200">
            <div className="lg:px-78 px-3 py-5">
                <div className="flex flex-col-reverse lg:flex-row justify-between items-center gap-[20px] lg:gap-4 text-sm text-gray-500">
                    <p className="text-center lg:text-left leading-relaxed">
                        <span>Copyright &copy; 2024. Juspay Technologies.</span>
                        <br className="lg:hidden" />
                        <span>All rights reserved</span>
                    </p>

                    <div className="flex items-center gap-8">
                        <Link
                            href={EXTERNAL_LINKS.privacyPolicy}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="transition-colors"
                        >
                            Privacy Policy
                        </Link>
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
