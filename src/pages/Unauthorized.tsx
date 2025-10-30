import React, { type FC } from 'react';
import { Lock, LogIn, HomeIcon } from 'lucide-react';
import { Link } from 'react-router';

// --- Types and Interfaces ---

interface ButtonProps {
    children: React.ReactNode;
    variant?: 'default' | 'outline' | 'secondary' | 'ghost' | 'link' | 'destructive';
    className?: string;
    disabled?: boolean;
    Icon?: FC<React.SVGProps<SVGSVGElement>>;
}

// --- Utility Components (Mimicking shadcn/ui style with a Blue Theme) ---

const Button: FC<ButtonProps> = ({
    children,

    variant = 'default',
    className = '',
    disabled = false,
    Icon
}) => {
    const baseStyles = 'inline-flex items-center justify-center rounded-lg text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none ring-offset-background h-10 px-6 py-2 shadow-sm';

    let variantStyles = '';
    switch (variant) {
        case 'outline':
            // Outline: White background, Indigo border, Indigo text
            variantStyles = 'border border-indigo-300 bg-white text-indigo-600 hover:bg-indigo-50 hover:border-indigo-400';
            break;
        case 'secondary':
            // Secondary: Light indigo background
            variantStyles = 'bg-indigo-100 text-indigo-800 hover:bg-indigo-200';
            break;
        case 'ghost':
            variantStyles = 'hover:bg-indigo-50 text-indigo-600';
            break;
        case 'destructive':
            variantStyles = 'bg-red-600 text-white hover:bg-red-700';
            break;
        case 'link':
            variantStyles = 'text-indigo-600 underline-offset-4 hover:underline';
            break;
        default:
            // Default (Primary): Dark Indigo background, White text
            variantStyles = 'bg-indigo-600 text-white hover:bg-indigo-700 shadow-md shadow-indigo-500/30';
    }

    return (
        <button
            className={`${baseStyles} ${variantStyles} ${className}`}
            disabled={disabled}
        >
            {Icon && <Icon className="w-4 h-4 mr-2" />}
            {children}
        </button>
    );
};

// --- Main Unauthorized App Component ---

export const Unauthorized: FC = () => {


    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 p-4 sm:p-6 font-sans">
            {/* Container Card */}
            <div className="w-full max-w-xl space-y-8 text-center p-8 sm:p-12 border border-gray-200 rounded-2xl shadow-xl bg-white transition-all duration-300">

                {/* Icon and Error Code Block */}
                <div className="flex flex-col items-center space-y-6">
                    <div className="p-5 bg-indigo-50 rounded-full text-indigo-600 border border-indigo-200">
                        <Lock className="w-10 h-10 sm:w-12 sm:h-12" />
                    </div>
                    <h1 className="text-8xl sm:text-9xl font-extrabold text-indigo-600/90 tracking-tighter">
                        401
                    </h1>
                </div>

                {/* Message Headings */}
                <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-gray-900">
                    Access Denied
                </h2>
                <p className="text-gray-600 text-lg">
                    It looks like you haven't been authorized to view this resource. Please ensure you are logged in with the correct credentials.
                </p>

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-4 justify-center pt-6">
                    <Link to={"/login"}>
                        <Button
                        >
                            <LogIn className='w-4 mr-2' />
                            Sign In Now
                        </Button>
                    </Link>

                    <Link to={"/"}>
                        <Button
                        >
                            <HomeIcon className='w-4 mr-2' />
                            Back to Homepage
                        </Button>
                    </Link>
                </div>
            </div>

            {/* Footer / App Name */}
            <p className="mt-10 text-sm text-gray-500">
                Security System v1.0 • Unauthorized Error
            </p>
        </div>
    );
};

