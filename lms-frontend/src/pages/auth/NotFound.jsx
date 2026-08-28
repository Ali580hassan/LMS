import { Link, useNavigate } from 'react-router-dom';
import { Button, Card, Badge } from '../../components/ui.jsx';
import { IoArrowBack, IoHome, IoSearch, IoBook, IoHelpCircle } from 'react-icons/io5';

export default function NotFound() {
    const navigate = useNavigate();

    return (
        <div className="relative min-h-[85vh] overflow-hidden bg-paper/50 px-4 py-16 sm:px-6 lg:px-8">
            {/* Background Mesh Gradients */}
            <div className="pointer-events-none absolute -top-40 left-1/2 -z-10 h-[500px] w-[500px] -translate-x-1/2 rounded-full bg-brand-500/10 blur-[120px]" />
            <div className="pointer-events-none absolute top-1/2 right-10 -z-10 h-[300px] w-[300px] rounded-full bg-blue-500/10 blur-[100px]" />

            <div className="mx-auto max-w-3xl text-center">
                {/* Status Badge */}
                <div className="mb-4 inline-flex items-center justify-center">
                    <Badge tone="warning" className="px-3.5 py-1 text-xs font-semibold uppercase tracking-wider">
                        Error Code: 404
                    </Badge>
                </div>

                {/* Graphic Typography */}
                <div className="relative my-2 select-none">
                    <h1 className="font-display text-[7rem] font-black leading-none tracking-tight text-ink-900/10 sm:text-[11rem] md:text-[13rem]">
                        404
                    </h1>
                    <div className="absolute inset-0 flex items-center justify-center">
                        <span className="font-display text-2xl font-bold text-ink-900 sm:text-4xl md:text-5xl">
                            Lost in Space?
                        </span>
                    </div>
                </div>

                {/* Copywriting */}
                <p className="mx-auto -mt-2 max-w-lg text-sm font-normal text-ink-600 sm:text-base">
                    The page you are looking for might have been removed, renamed, or is temporarily unavailable.
                </p>

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
                            Back to Home
                        </Button>
                    </Link>
                </div>

                {/* Quick Links Navigation */}
                <div className="mt-16 border-t border-ink-900/10 pt-10">
                    <p className="mb-6 text-xs font-semibold uppercase tracking-wider text-ink-500">
                        Were you looking for one of these?
                    </p>

                    <div className="grid grid-cols-1 gap-4 text-left sm:grid-cols-3">
                        <Link to="/courses" className="group">
                            <Card className="h-full p-4 transition-all duration-200 hover:-translate-y-1 hover:border-brand-500/40 hover:shadow-md">
                                <div className="mb-2.5 flex h-9 w-9 items-center justify-center rounded-xl bg-brand-500/10 text-brand-600 transition group-hover:bg-brand-500 group-hover:text-white">
                                    <IoBook className="text-lg" />
                                </div>
                                <h2 className="text-sm font-semibold text-ink-900">Explore Courses</h2>
                                <p className="mt-1 text-xs text-ink-500">Browse through our full catalog of courses.</p>
                            </Card>
                        </Link>

                        <Link to="/courses" className="group">
                            <Card className="h-full p-4 transition-all duration-200 hover:-translate-y-1 hover:border-brand-500/40 hover:shadow-md">
                                <div className="mb-2.5 flex h-9 w-9 items-center justify-center rounded-xl bg-brand-500/10 text-brand-600 transition group-hover:bg-brand-500 group-hover:text-white">
                                    <IoSearch className="text-lg" />
                                </div>
                                <h2 className="text-sm font-semibold text-ink-900">Search Catalog</h2>
                                <p className="mt-1 text-xs text-ink-500">Find topics and programs tailored for you.</p>
                            </Card>
                        </Link>

                        <Link to="/" className="group">
                            <Card className="h-full p-4 transition-all duration-200 hover:-translate-y-1 hover:border-brand-500/40 hover:shadow-md">
                                <div className="mb-2.5 flex h-9 w-9 items-center justify-center rounded-xl bg-brand-500/10 text-brand-600 transition group-hover:bg-brand-500 group-hover:text-white">
                                    <IoHelpCircle className="text-lg" />
                                </div>
                                <h2 className="text-sm font-semibold text-ink-900">Help & Support</h2>
                                <p className="mt-1 text-xs text-ink-500">Get assistance if you're stuck or facing issues.</p>
                            </Card>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}