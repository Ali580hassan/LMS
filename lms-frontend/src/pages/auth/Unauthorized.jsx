import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext.jsx';
import { Button, Card, Badge } from '../../components/ui.jsx';
import {
    IoLockClosed,
    IoArrowBack,
    IoHome,
    IoKey,
    IoPersonCircleOutline
} from 'react-icons/io5';

export default function Unauthorized() {
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    return (
        <div className="relative min-h-[85vh] overflow-hidden bg-paper/50 px-4 py-16 sm:px-6 lg:px-8">
            {/* Background Warning Gradients */}
            <div className="pointer-events-none absolute -top-40 left-1/2 -z-10 h-[500px] w-[500px] -translate-x-1/2 rounded-full bg-red-500/10 blur-[120px]" />
            <div className="pointer-events-none absolute top-1/2 right-10 -z-10 h-[300px] w-[300px] rounded-full bg-amber-500/10 blur-[100px]" />

            <div className="mx-auto max-w-3xl text-center">
                {/* Status Badge */}
                <div className="mb-4 inline-flex items-center justify-center">
                    <Badge tone="danger" className="px-3.5 py-1 text-xs font-semibold uppercase tracking-wider">
                        Error Code: 403 Forbidden
                    </Badge>
                </div>

                {/* Security Lock Icon */}
                <div className="mx-auto my-6 flex h-20 w-20 items-center justify-center rounded-3xl bg-red-500/10 text-red-500 shadow-inner sm:h-24 sm:w-24">
                    <IoLockClosed className="text-4xl sm:text-5xl" />
                </div>

                {/* Header Title & Subtitle */}
                <h1 className="font-display text-3xl font-bold tracking-tight text-ink-900 sm:text-4xl">
                    Access Restricted
                </h1>
                <p className="mx-auto mt-3 max-w-lg text-sm text-ink-600 sm:text-base">
                    You do not have permission to view this page. This area is reserved for authorized user roles (such as Admins or Instructors).
                </p>

                {/* User Session Info Card */}
                {user && (
                    <div className="mx-auto mt-6 max-w-md rounded-2xl border border-ink-900/10 bg-white/80 p-4 shadow-sm backdrop-blur">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3 overflow-hidden">
                                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-brand-500/10 text-brand-500">
                                    <IoPersonCircleOutline className="text-2xl" />
                                </div>
                                <div className="text-left overflow-hidden">
                                    <p className="truncate text-xs font-semibold text-ink-900">
                                        {user.email}
                                    </p>
                                    <p className="text-[11px] text-ink-500">Currently Logged-in Account</p>
                                </div>
                            </div>
                            <Badge tone="brand" className="capitalize">
                                {user.role || 'User'}
                            </Badge>
                        </div>
                    </div>
                )}

                {/* Action Buttons */}
                <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
                    <Button
                        variant="outline"
                        onClick={() => navigate(-1)}
                        className="flex items-center gap-2 px-5 py-2.5 text-sm font-medium shadow-sm transition hover:shadow"
                    >
                        <IoArrowBack className="text-base" />
                        Go Back
                    </Button>

                    <Link to="/">
                        <Button
                            variant="accent"
                            className="flex items-center gap-2 px-6 py-2.5 text-sm font-medium shadow-md shadow-brand-500/20"
                        >
                            <IoHome className="text-base" />
                            Return Home
                        </Button>
                    </Link>
                </div>

                {/* Troubleshooting & Account Switch Section */}
                <div className="mt-16 border-t border-ink-900/10 pt-10">
                    <p className="mb-6 text-xs font-semibold uppercase tracking-wider text-ink-500">
                        Believe this is a mistake?
                    </p>

                    <div className="grid grid-cols-1 gap-4 text-left sm:grid-cols-2">
                        <Card className="p-4 transition hover:border-brand-500/40 hover:shadow-md">
                            <div className="mb-2 flex h-9 w-9 items-center justify-center rounded-xl bg-amber-500/10 text-amber-600">
                                <IoKey className="text-lg" />
                            </div>
                            <h2 className="text-sm font-semibold text-ink-900">Switch Account</h2>
                            <p className="mt-1 text-xs text-ink-500">
                                If you have another account with elevated privileges, log out and sign in with those credentials.
                            </p>
                            <button
                                type="button"
                                onClick={() => {
                                    logout();
                                    navigate('/login');
                                }}
                                className="mt-3 text-xs font-semibold text-brand-600 hover:underline"
                            >
                                Log out & Switch Account →
                            </button>
                        </Card>

                        <Card className="p-4 transition hover:border-brand-500/40 hover:shadow-md">
                            <div className="mb-2 flex h-9 w-9 items-center justify-center rounded-xl bg-brand-500/10 text-brand-600">
                                <IoLockClosed className="text-lg" />
                            </div>
                            <h2 className="text-sm font-semibold text-ink-900">Request Access</h2>
                            <p className="mt-1 text-xs text-ink-500">
                                If you require access to this section, please reach out to the platform administrator.
                            </p>
                            <Link to="/" className="mt-3 inline-block text-xs font-semibold text-brand-600 hover:underline">
                                Contact Support →
                            </Link>
                        </Card>
                    </div>
                </div>
            </div>
        </div>
    );
}